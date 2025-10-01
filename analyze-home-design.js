const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('🎨 HOME PAGE DESIGN CONSISTENCY ANALYSIS\n');
    console.log('=' .repeat(80));

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: 'Korean (한국어)' },
        { code: 'zh', name: 'Chinese (中文)' }
    ];

    const designIssues = [];

    for (const lang of languages) {
        console.log(`\n🌐 Analyzing ${lang.name} Version`);
        console.log('=' .repeat(80));

        await page.goto('http://localhost:8093/index.html');
        await page.waitForTimeout(1000);

        // Switch language if not English
        if (lang.code !== 'en') {
            await page.click('#languageButton, .language-button');
            await page.waitForTimeout(300);
            await page.click(`.language-option[data-lang="${lang.code}"]`);
            await page.waitForTimeout(1000);
            console.log(`✓ Switched to ${lang.name}`);
        }

        // Check sections
        const sections = [
            { selector: '.hero-section', name: 'Hero Section' },
            { selector: '.cta-section', name: 'CTA Section' },
            { selector: '.footer', name: 'Footer' }
        ];

        console.log('\n📋 Sections Analysis:\n');

        for (const section of sections) {
            const sectionEl = page.locator(section.selector).first();
            const exists = await sectionEl.count() > 0;

            if (exists) {
                const box = await sectionEl.boundingBox();
                const bgColor = await sectionEl.evaluate(el => {
                    return window.getComputedStyle(el).backgroundColor;
                });
                const padding = await sectionEl.evaluate(el => {
                    const style = window.getComputedStyle(el);
                    return `${style.paddingTop} ${style.paddingBottom}`;
                });

                console.log(`✅ ${section.name}:`);
                console.log(`   Size: ${Math.round(box.width)}×${Math.round(box.height)}px`);
                console.log(`   Background: ${bgColor}`);
                console.log(`   Padding: ${padding}`);

                // Check for consistency issues
                if (section.name === 'CTA Section') {
                    // Check if CTA has proper styling
                    const border = await sectionEl.evaluate(el => {
                        return window.getComputedStyle(el).border;
                    });
                    const borderRadius = await sectionEl.evaluate(el => {
                        return window.getComputedStyle(el).borderRadius;
                    });

                    console.log(`   Border: ${border}`);
                    console.log(`   Border Radius: ${borderRadius}`);

                    // Check if it matches other sections' design pattern
                    if (!borderRadius || borderRadius === '0px') {
                        designIssues.push({
                            language: lang.name,
                            section: section.name,
                            issue: 'Missing border-radius for design consistency'
                        });
                    }
                }

                // Check footer
                if (section.name === 'Footer') {
                    const footerContent = await sectionEl.textContent();
                    const hasEmail = footerContent.includes('admin@glec.io');
                    const hasBusinessNum = footerContent.includes('459-86-02830');
                    const hasAddress = footerContent.includes('인천') || footerContent.includes('Incheon');

                    console.log(`   Has Email: ${hasEmail ? '✅' : '❌'}`);
                    console.log(`   Has Business Number: ${hasBusinessNum ? '✅' : '❌'}`);
                    console.log(`   Has Address: ${hasAddress ? '✅' : '❌'}`);

                    if (!hasEmail || !hasBusinessNum || !hasAddress) {
                        designIssues.push({
                            language: lang.name,
                            section: section.name,
                            issue: 'Missing contact information (email, business number, or address)'
                        });
                    }
                }
            } else {
                console.log(`❌ ${section.name}: NOT FOUND`);
                designIssues.push({
                    language: lang.name,
                    section: section.name,
                    issue: 'Section not found'
                });
            }
        }

        // Take screenshot
        await page.screenshot({
            path: `screenshots/home-design-${lang.code}.png`,
            fullPage: true
        });
        console.log(`\n📸 Screenshot saved: screenshots/home-design-${lang.code}.png`);
    }

    // Summary report
    console.log('\n');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + ' '.repeat(22) + '📊 DESIGN CONSISTENCY REPORT' + ' '.repeat(27) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    console.log('');

    if (designIssues.length > 0) {
        console.log(`❌ Found ${designIssues.length} design consistency issues:\n`);
        designIssues.forEach((issue, index) => {
            console.log(`${index + 1}. [${issue.language}] ${issue.section}`);
            console.log(`   Issue: ${issue.issue}\n`);
        });

        console.log('💡 RECOMMENDATIONS:');
        console.log('   1. Add border-radius and consistent styling to CTA section');
        console.log('   2. Add footer contact information: email, business number, address');
        console.log('   3. Ensure all sections follow the same design patterns');
        console.log('   4. Apply gradient backgrounds consistently across sections');
    } else {
        console.log('🎉 NO DESIGN ISSUES DETECTED - All sections properly styled!\n');
    }

    await browser.close();
    console.log('\n✅ Analysis complete');
})();
