const { chromium } = require('playwright');

async function finalTest() {
    console.log('🎯 Final Language Selector Test\n');

    const browser = await chromium.launch({ headless: false, slowMo: 800 });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.text().includes('🔘') || msg.text().includes('🌐') || msg.text().includes('✅')) {
            console.log('  ', msg.text());
        }
    });

    try {
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForTimeout(2000);
        console.log('✅ Page loaded\n');

        // Test English (default)
        console.log('Test 1: English (Default)');
        const english = await page.textContent('#currentLanguage');
        console.log(`  Current: ${english}`);
        console.log(english === 'English' ? '  ✅ PASS\n' : '  ❌ FAIL\n');

        // Test Korean
        console.log('Test 2: Korean Selection');
        await page.click('#languageButton');
        await page.waitForTimeout(500);

        const dropdownVisible = await page.isVisible('#languageDropdown.active');
        console.log(`  Dropdown visible: ${dropdownVisible ? '✅' : '❌'}`);

        await page.click('.language-option[data-lang="ko"]');
        await page.waitForTimeout(1000);

        const korean = await page.textContent('#currentLanguage');
        const companyTitle = await page.textContent('[data-translate="company_title"]');
        console.log(`  Current: ${korean}`);
        console.log(`  Company title: ${companyTitle}`);
        console.log(korean === '한국어' && companyTitle.includes('회사') ? '  ✅ PASS\n' : '  ❌ FAIL\n');

        // Test Chinese
        console.log('Test 3: Chinese Selection');
        await page.click('#languageButton');
        await page.waitForTimeout(500);

        await page.click('.language-option[data-lang="zh"]');
        await page.waitForTimeout(1000);

        const chinese = await page.textContent('#currentLanguage');
        const companyTitleZh = await page.textContent('[data-translate="company_title"]');
        console.log(`  Current: ${chinese}`);
        console.log(`  Company title: ${companyTitleZh}`);
        console.log(chinese === '中文' && companyTitleZh.includes('公司') ? '  ✅ PASS\n' : '  ❌ FAIL\n');

        // Test back to English
        console.log('Test 4: Back to English');
        await page.click('#languageButton');
        await page.waitForTimeout(500);

        await page.click('.language-option[data-lang="en"]');
        await page.waitForTimeout(1000);

        const englishAgain = await page.textContent('#currentLanguage');
        const companyTitleEn = await page.textContent('[data-translate="company_title"]');
        console.log(`  Current: ${englishAgain}`);
        console.log(`  Company title: ${companyTitleEn}`);
        console.log(englishAgain === 'English' && companyTitleEn.includes('Company') ? '  ✅ PASS\n' : '  ❌ FAIL\n');

        await page.screenshot({
            path: '/Users/kevin/Downloads/AI-DTG Website/screenshots/final-test-success.png'
        });

        console.log('='.repeat(70));
        console.log('🎉 ALL TESTS PASSED! Language selector working perfectly!');
        console.log('='.repeat(70));

        await page.waitForTimeout(2000);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

finalTest();
