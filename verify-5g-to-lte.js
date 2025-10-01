const { chromium } = require('playwright');

/**
 * Verify all 5G references have been changed to LTE
 * across all language versions
 */

async function verify5GtoLTE() {
    console.log('\n🔍 VERIFYING 5G → LTE CONVERSION\n');
    console.log('='.repeat(80));

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseUrl = 'http://127.0.0.1:8093';
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' }
    ];

    const results = {
        total: 0,
        passed: 0,
        failed: 0,
        found5G: []
    };

    try {
        for (const lang of languages) {
            console.log(`\n${'='.repeat(80)}`);
            console.log(`🌐 Checking ${lang.name} Version`);
            console.log(`${'='.repeat(80)}`);

            // Check Solutions page
            await page.goto(`${baseUrl}/solutions.html`, { waitUntil: 'networkidle' });
            await page.waitForTimeout(1000);

            // Switch language if not English
            if (lang.code !== 'en') {
                try {
                    await page.locator('#languageButton, .language-button').click();
                    await page.waitForTimeout(300);
                    await page.locator(`.language-option[data-lang="${lang.code}"]`).click({ force: true });
                    await page.waitForTimeout(1000);
                } catch (e) {
                    console.log(`⚠️  Could not switch to ${lang.name}`);
                }
            }

            // Get all visible text
            const bodyText = await page.locator('body').innerText();

            // Check for 5G references (excluding "5G/LTE" which might be acceptable)
            const has5G = bodyText.includes('5G ') ||
                         bodyText.includes('5G연결') ||
                         bodyText.includes('5G网络') ||
                         bodyText.includes('5G連') ||
                         /5G[^/]/.test(bodyText);

            results.total++;

            if (has5G) {
                console.log('❌ Found "5G" references on Solutions page');
                results.failed++;

                // Find specific occurrences
                const lines = bodyText.split('\n');
                lines.forEach((line, index) => {
                    if (line.includes('5G') && !line.includes('5G/LTE')) {
                        console.log(`   Line ${index + 1}: "${line.trim().substring(0, 100)}"`);
                        results.found5G.push({
                            language: lang.name,
                            page: 'Solutions',
                            text: line.trim().substring(0, 200)
                        });
                    }
                });
            } else {
                console.log('✅ No standalone "5G" references found on Solutions page');
                results.passed++;
            }

            // Check if LTE is present
            const hasLTE = bodyText.includes('LTE');
            if (hasLTE) {
                console.log('✅ Confirmed "LTE" is present');
            } else {
                console.log('⚠️  Warning: "LTE" not found');
            }

            // Check About page
            await page.goto(`${baseUrl}/about.html`, { waitUntil: 'networkidle' });
            await page.waitForTimeout(1000);

            // Switch language again if needed
            if (lang.code !== 'en') {
                try {
                    await page.locator('#languageButton, .language-button').click();
                    await page.waitForTimeout(300);
                    await page.locator(`.language-option[data-lang="${lang.code}"]`).click({ force: true });
                    await page.waitForTimeout(1000);
                } catch (e) {
                    // Continue
                }
            }

            const aboutText = await page.locator('body').innerText();
            const aboutHas5G = aboutText.includes('5G ') ||
                              aboutText.includes('5G연결') ||
                              aboutText.includes('5G网络') ||
                              /5G[^/]/.test(aboutText);

            results.total++;

            if (aboutHas5G) {
                console.log('❌ Found "5G" references on About page');
                results.failed++;

                const lines = aboutText.split('\n');
                lines.forEach((line, index) => {
                    if (line.includes('5G') && !line.includes('5G/LTE')) {
                        console.log(`   Line ${index + 1}: "${line.trim().substring(0, 100)}"`);
                        results.found5G.push({
                            language: lang.name,
                            page: 'About',
                            text: line.trim().substring(0, 200)
                        });
                    }
                });
            } else {
                console.log('✅ No standalone "5G" references found on About page');
                results.passed++;
            }

            // Take screenshot
            await page.screenshot({
                path: `screenshots/lte-verification-${lang.code}.png`,
                fullPage: false
            });
        }

        // Final Report
        console.log('\n\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + ' '.repeat(20) + '📊 5G → LTE CONVERSION REPORT' + ' '.repeat(28) + '║');
        console.log('╚' + '═'.repeat(78) + '╝');
        console.log('');
        console.log(`Total Checks: ${results.total}`);
        console.log(`✅ Passed: ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
        console.log(`❌ Failed: ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);
        console.log('');

        if (results.found5G.length > 0) {
            console.log('❌ REMAINING 5G REFERENCES FOUND:');
            console.log('─'.repeat(80));
            results.found5G.forEach((item, index) => {
                console.log(`\n${index + 1}. ${item.language} - ${item.page}:`);
                console.log(`   "${item.text}"`);
            });
            console.log('\n');
        } else {
            console.log('🎉 SUCCESS! All "5G" references have been replaced with "LTE"\n');
        }

    } catch (error) {
        console.error('\n❌ Test Error:', error.message);
        console.error(error.stack);
    } finally {
        await browser.close();
        console.log('✅ Browser closed\n');
    }

    return results;
}

// Run verification
verify5GtoLTE().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
