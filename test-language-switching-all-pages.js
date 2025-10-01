const { chromium } = require('playwright');

/**
 * Comprehensive Language Switching Test for All Pages
 * Tests Korean and Chinese translations across all 5 pages
 */

async function testLanguageSwitchingAllPages() {
    console.log('\n🌐 TESTING LANGUAGE SWITCHING ACROSS ALL PAGES\n');
    console.log('='.repeat(80));

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseUrl = 'http://127.0.0.1:8093';
    const pages = [
        { name: 'Home', url: `${baseUrl}/index.html`, testKey: 'hero_description' },
        { name: 'Solutions', url: `${baseUrl}/solutions.html`, testKey: 'transformation_description' },
        { name: 'About', url: `${baseUrl}/about.html`, testKey: 'company_title' },
        { name: 'CES 2026', url: `${baseUrl}/ces2026.html`, testKey: 'ces_title' },
        { name: 'Contact', url: `${baseUrl}/contact.html`, testKey: 'contact_title' }
    ];

    const languages = [
        { code: 'ko', name: '한국어', label: 'Korean' },
        { code: 'zh', name: '中文', label: 'Chinese' }
    ];

    const results = {
        total: pages.length * languages.length,
        passed: 0,
        failed: 0,
        details: []
    };

    try {
        for (const pageInfo of pages) {
            console.log(`\n📄 Testing: ${pageInfo.name}`);
            console.log('-'.repeat(80));

            await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
            await page.waitForTimeout(1000);

            // Get English version first (baseline)
            const englishText = await page.locator(`[data-translate="${pageInfo.testKey}"]`).first().innerText().catch(() => 'NOT FOUND');
            console.log(`   📌 English baseline: "${englishText.substring(0, 50)}..."`);

            for (const lang of languages) {
                console.log(`\n   🔄 Switching to ${lang.label} (${lang.name})...`);

                try {
                    // Method 1: Click the language button to open dropdown
                    const langButton = page.locator('#languageButton, .language-button');
                    await langButton.waitFor({ state: 'visible', timeout: 5000 });
                    await langButton.click();
                    console.log('      ✓ Language dropdown opened');

                    // Wait for dropdown to be visible
                    await page.waitForTimeout(500);

                    // Method 2: Click the language option (with force if needed)
                    const langOption = page.locator(`.language-option[data-lang="${lang.code}"]`);
                    await langOption.waitFor({ state: 'attached', timeout: 5000 });

                    // Force click to bypass visibility issues
                    await langOption.click({ force: true });
                    console.log(`      ✓ Clicked ${lang.label} option`);

                    // Wait for translation to apply
                    await page.waitForTimeout(1000);

                    // Verify translation changed
                    const translatedText = await page.locator(`[data-translate="${pageInfo.testKey}"]`).first().innerText().catch(() => 'NOT FOUND');

                    // Check if text changed from English
                    const translationWorked = translatedText !== englishText && translatedText !== 'NOT FOUND';

                    if (translationWorked) {
                        console.log(`      ✅ ${lang.label} translation SUCCESS`);
                        console.log(`         "${translatedText.substring(0, 50)}..."`);
                        results.passed++;
                    } else {
                        console.log(`      ❌ ${lang.label} translation FAILED`);
                        console.log(`         Expected: Different from English`);
                        console.log(`         Got: "${translatedText.substring(0, 50)}..."`);
                        results.failed++;
                    }

                    // Take screenshot
                    const screenshotPath = `screenshots/lang-${lang.code}-${pageInfo.name.toLowerCase().replace(/\s+/g, '-')}.png`;
                    await page.screenshot({ path: screenshotPath, fullPage: true });
                    console.log(`      📸 Screenshot: ${screenshotPath}`);

                    results.details.push({
                        page: pageInfo.name,
                        language: lang.label,
                        success: translationWorked,
                        englishText: englishText.substring(0, 100),
                        translatedText: translatedText.substring(0, 100)
                    });

                } catch (error) {
                    console.log(`      ❌ Error testing ${lang.label}: ${error.message}`);
                    results.failed++;
                    results.details.push({
                        page: pageInfo.name,
                        language: lang.label,
                        success: false,
                        error: error.message
                    });
                }

                // Reset to English for next test
                try {
                    await page.locator('#languageButton, .language-button').click();
                    await page.waitForTimeout(300);
                    await page.locator('.language-option[data-lang="en"]').click({ force: true });
                    await page.waitForTimeout(500);
                } catch (e) {
                    console.log('      ⚠️ Could not reset to English, continuing...');
                }
            }
        }

        // Test language persistence across page navigation
        console.log('\n\n🔗 Testing Language Persistence Across Pages');
        console.log('='.repeat(80));

        await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Switch to Korean
        console.log('   🔄 Setting language to Korean on Home page...');
        await page.locator('#languageButton, .language-button').click();
        await page.waitForTimeout(300);
        await page.locator('.language-option[data-lang="ko"]').click({ force: true });
        await page.waitForTimeout(1000);

        // Navigate to Solutions page
        console.log('   🔄 Navigating to Solutions page...');
        await page.goto(`${baseUrl}/solutions.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Check if Korean is still active
        const currentLangDisplay = await page.locator('#currentLanguage').innerText();
        const isPersisted = currentLangDisplay.includes('한국어');

        if (isPersisted) {
            console.log('   ✅ Language preference PERSISTED across pages');
            console.log(`      Current language display: "${currentLangDisplay}"`);
        } else {
            console.log('   ❌ Language preference NOT persisted');
            console.log(`      Current language display: "${currentLangDisplay}" (expected: 한국어)`);
        }

        // Final Summary
        console.log('\n\n📊 TEST SUMMARY');
        console.log('='.repeat(80));
        console.log(`Total Tests: ${results.total}`);
        console.log(`✅ Passed: ${results.passed}`);
        console.log(`❌ Failed: ${results.failed}`);
        console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);

        if (isPersisted) {
            console.log('✅ Language Persistence: WORKING');
        } else {
            console.log('❌ Language Persistence: FAILED');
        }

        console.log('\n📄 Detailed Results:');
        results.details.forEach((detail, index) => {
            console.log(`\n${index + 1}. ${detail.page} - ${detail.language}: ${detail.success ? '✅ PASS' : '❌ FAIL'}`);
            if (detail.error) {
                console.log(`   Error: ${detail.error}`);
            } else {
                console.log(`   English: "${detail.englishText}"`);
                console.log(`   Translated: "${detail.translatedText}"`);
            }
        });

    } catch (error) {
        console.error('\n❌ Test Error:', error.message);
        console.error(error.stack);
    } finally {
        await browser.close();
        console.log('\n✅ Browser closed');
    }
}

// Run the test
testLanguageSwitchingAllPages().catch(console.error);
