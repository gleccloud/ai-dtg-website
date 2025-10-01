const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('✅ HOME PAGE IMPROVEMENTS VERIFICATION\n');
    console.log('=' .repeat(80));

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: 'Korean (한국어)' },
        { code: 'zh', name: 'Chinese (中文)' }
    ];

    const results = [];

    for (const lang of languages) {
        console.log(`\n🌐 Testing ${lang.name} Version`);
        console.log('=' .repeat(80));

        await page.goto('http://localhost:8093/index.html');
        await page.waitForTimeout(1500);

        // Switch language if not English
        if (lang.code !== 'en') {
            await page.click('#languageButton, .language-button');
            await page.waitForTimeout(300);
            await page.click(`.language-option[data-lang="${lang.code}"]`);
            await page.waitForTimeout(1500);
            console.log(`✓ Switched to ${lang.name}`);
        }

        // Check CTA section design
        const ctaSection = page.locator('.cta-section').first();
        const ctaBorder = await ctaSection.evaluate(el => window.getComputedStyle(el).border);
        const ctaBorderRadius = await ctaSection.evaluate(el => window.getComputedStyle(el).borderRadius);
        const ctaBoxShadow = await ctaSection.evaluate(el => window.getComputedStyle(el).boxShadow);

        console.log('\n📦 CTA Section Design:');
        console.log(`   Border: ${ctaBorder}`);
        console.log(`   Border Radius: ${ctaBorderRadius}`);
        console.log(`   Box Shadow: ${ctaBoxShadow !== 'none' ? '✅ Present' : '❌ Missing'}`);

        const ctaHasBorder = ctaBorder.includes('2px');
        const ctaHasRadius = parseFloat(ctaBorderRadius) >= 20;
        const ctaHasShadow = ctaBoxShadow !== 'none';

        // Check Footer content
        const footerContent = await page.locator('.footer').textContent();

        const hasEmail = footerContent.includes('admin@glec.io');
        const hasBusinessNum = footerContent.includes('459-86-02830');
        const hasIncheon = footerContent.includes('인천') ||
                          footerContent.includes('Incheon') ||
                          footerContent.includes('仁川');

        console.log('\n📧 Footer Contact Information:');
        console.log(`   Email (admin@glec.io): ${hasEmail ? '✅' : '❌'}`);
        console.log(`   Business Number (459-86-02830): ${hasBusinessNum ? '✅' : '❌'}`);
        console.log(`   Address (contains Incheon): ${hasIncheon ? '✅' : '❌'}`);

        // Get footer labels to verify translations
        const emailLabel = await page.locator('.footer-label').first().textContent();
        console.log(`   Footer Label Example: "${emailLabel}"`);

        const allPassed = ctaHasBorder && ctaHasRadius && ctaHasShadow &&
                         hasEmail && hasBusinessNum && hasIncheon;

        results.push({
            language: lang.name,
            ctaDesign: ctaHasBorder && ctaHasRadius && ctaHasShadow,
            footerInfo: hasEmail && hasBusinessNum && hasIncheon,
            allPassed
        });

        // Take screenshot
        await page.screenshot({
            path: `screenshots/home-verified-${lang.code}.png`,
            fullPage: true
        });
        console.log(`\n📸 Screenshot: screenshots/home-verified-${lang.code}.png`);
    }

    // Summary
    console.log('\n');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + ' '.repeat(25) + '📊 VERIFICATION SUMMARY' + ' '.repeat(30) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    console.log('');

    const passedCount = results.filter(r => r.allPassed).length;
    console.log(`Total Languages Tested: ${results.length}`);
    console.log(`✅ Fully Passed: ${passedCount}`);
    console.log(`❌ Failed: ${results.length - passedCount}\n`);

    results.forEach(r => {
        const status = r.allPassed ? '✅' : '❌';
        console.log(`${status} ${r.language}:`);
        console.log(`   CTA Design: ${r.ctaDesign ? '✅' : '❌'}`);
        console.log(`   Footer Info: ${r.footerInfo ? '✅' : '❌'}`);
    });

    if (passedCount === results.length) {
        console.log('\n🎉 ALL IMPROVEMENTS VERIFIED - HOME page is fully enhanced!\n');
    } else {
        console.log('\n⚠️  Some issues remain - please review the failed items above\n');
    }

    await browser.close();
    console.log('✅ Verification complete');
})();
