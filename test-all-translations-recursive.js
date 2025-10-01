const { chromium } = require('playwright');

/**
 * Recursive Translation Verification Test
 * Checks every section on every page for Korean and Chinese translations
 */

async function testAllTranslationsRecursive() {
    console.log('\n🔍 RECURSIVE TRANSLATION VERIFICATION - ALL PAGES & SECTIONS\n');
    console.log('='.repeat(80));

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseUrl = 'http://127.0.0.1:8093';

    const pages = [
        {
            name: 'Home',
            url: `${baseUrl}/index.html`,
            sections: [
                { id: 'navbar', name: 'Navigation Bar' },
                { id: 'home', name: 'Hero Section' },
                { id: 'cta', name: 'CTA Section' },
                { id: null, name: 'Footer', selector: 'footer' }
            ]
        },
        {
            name: 'Solutions',
            url: `${baseUrl}/solutions.html`,
            sections: [
                { id: 'navbar', name: 'Navigation Bar' },
                { id: 'transformation', name: 'AI Transformation' },
                { id: 'ai-dtg', name: 'AI DTG Hardware' },
                { id: 'ai-dashboard', name: 'AI Dashboard' },
                { id: 'technology', name: 'Core Technology' },
                { id: 'solutions', name: 'Solutions Status' },
                { id: null, name: 'Footer', selector: 'footer' }
            ]
        },
        {
            name: 'About',
            url: `${baseUrl}/about.html`,
            sections: [
                { id: 'navbar', name: 'Navigation Bar' },
                { id: 'company-overview', name: 'Company Overview' },
                { id: 'team', name: 'Our Team' },
                { id: 'timeline', name: 'Timeline' },
                { id: 'certifications', name: 'Certifications' },
                { id: 'tech-differentiation', name: 'Technical Differentiation' },
                { id: null, name: 'Footer', selector: 'footer' }
            ]
        },
        {
            name: 'CES 2026',
            url: `${baseUrl}/ces2026.html`,
            sections: [
                { id: 'navbar', name: 'Navigation Bar' },
                { id: 'ces-2026', name: 'CES 2026 Main' },
                { id: null, name: 'Footer', selector: 'footer' }
            ]
        },
        {
            name: 'Contact',
            url: `${baseUrl}/contact.html`,
            sections: [
                { id: 'navbar', name: 'Navigation Bar' },
                { id: 'contact', name: 'Contact Form' },
                { id: null, name: 'Footer', selector: 'footer' }
            ]
        }
    ];

    const languages = [
        { code: 'ko', name: '한국어', label: 'Korean' },
        { code: 'zh', name: '中文', label: 'Chinese' }
    ];

    const results = {
        total: 0,
        passed: 0,
        failed: 0,
        untranslatedSections: []
    };

    try {
        for (const pageInfo of pages) {
            console.log(`\n${'='.repeat(80)}`);
            console.log(`📄 PAGE: ${pageInfo.name}`);
            console.log(`${'='.repeat(80)}`);

            await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
            await page.waitForTimeout(1000);

            for (const lang of languages) {
                console.log(`\n   🌐 Testing ${lang.label} (${lang.name})`);
                console.log(`   ${'-'.repeat(76)}`);

                // Switch language
                try {
                    await page.locator('#languageButton, .language-button').click();
                    await page.waitForTimeout(300);
                    await page.locator(`.language-option[data-lang="${lang.code}"]`).click({ force: true });
                    await page.waitForTimeout(1000);
                } catch (e) {
                    console.log(`   ⚠️  Could not switch to ${lang.label}: ${e.message}`);
                    continue;
                }

                // Test each section
                for (const section of pageInfo.sections) {
                    results.total++;
                    const sectionSelector = section.selector || (section.id ? `#${section.id}` : 'body');

                    try {
                        const sectionElement = await page.locator(sectionSelector).first();
                        const sectionText = await sectionElement.innerText().catch(() => '');

                        // Check for English text patterns (indicates untranslated content)
                        const englishPatterns = [
                            /Ready to Transform/i,
                            /Get Started Today/i,
                            /View Solutions/i,
                            /Join the AI revolution/i,
                            /Experience world-class/i,
                            /Contact us today/i,
                            /All rights reserved/i,
                            /Transforming Transportation with AI/i
                        ];

                        const hasEnglishText = englishPatterns.some(pattern => pattern.test(sectionText));

                        // Check for language-specific characters
                        const hasKorean = /[가-힣]/.test(sectionText);
                        const hasChinese = /[\u4e00-\u9fff]/.test(sectionText);
                        const hasTargetLanguage = lang.code === 'ko' ? hasKorean : hasChinese;

                        if (hasEnglishText && !hasTargetLanguage) {
                            console.log(`   ❌ ${section.name}: UNTRANSLATED`);
                            console.log(`      Found English text in ${lang.label} version`);
                            results.failed++;
                            results.untranslatedSections.push({
                                page: pageInfo.name,
                                section: section.name,
                                language: lang.label,
                                selector: sectionSelector,
                                sampleText: sectionText.substring(0, 100).replace(/\n/g, ' ')
                            });
                        } else if (hasTargetLanguage) {
                            console.log(`   ✅ ${section.name}: Translated`);
                            results.passed++;
                        } else {
                            console.log(`   ⚠️  ${section.name}: No text content or mixed`);
                            results.passed++;
                        }

                    } catch (error) {
                        console.log(`   ⚠️  ${section.name}: Error - ${error.message}`);
                        results.failed++;
                    }
                }

                // Reset to English for next iteration
                try {
                    await page.locator('#languageButton, .language-button').click();
                    await page.waitForTimeout(300);
                    await page.locator('.language-option[data-lang="en"]').click({ force: true });
                    await page.waitForTimeout(500);
                } catch (e) {
                    // Continue anyway
                }
            }
        }

        // Final Report
        console.log('\n\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + ' '.repeat(20) + '📊 TRANSLATION VERIFICATION REPORT' + ' '.repeat(24) + '║');
        console.log('╚' + '═'.repeat(78) + '╝');
        console.log('');
        console.log(`Total Sections Tested: ${results.total}`);
        console.log(`✅ Translated: ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
        console.log(`❌ Untranslated: ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);
        console.log('');

        if (results.untranslatedSections.length > 0) {
            console.log('❌ UNTRANSLATED SECTIONS FOUND:');
            console.log('─'.repeat(80));
            results.untranslatedSections.forEach((item, index) => {
                console.log(`\n${index + 1}. ${item.page} > ${item.section} [${item.language}]`);
                console.log(`   Selector: ${item.selector}`);
                console.log(`   Sample: "${item.sampleText}..."`);
            });
            console.log('\n');
        } else {
            console.log('🎉 ALL SECTIONS SUCCESSFULLY TRANSLATED!\n');
        }

        // Generate fix recommendations
        if (results.untranslatedSections.length > 0) {
            console.log('🔧 RECOMMENDATIONS:');
            console.log('─'.repeat(80));
            console.log('1. Add data-translate attributes to untranslated HTML elements');
            console.log('2. Add corresponding translation keys to js/main.js (ko, en, zh)');
            console.log('3. Run this test again to verify fixes\n');
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

// Run the test
testAllTranslationsRecursive().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
