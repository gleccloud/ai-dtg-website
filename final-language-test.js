const { chromium } = require('playwright');

async function finalLanguageTest() {
    console.log('🎯 Final language selector test...\n');

    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    // Listen to console
    page.on('console', msg => {
        if (msg.type() === 'log') {
            console.log('  🌐', msg.text());
        }
    });

    try {
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000); // Wait for all scripts to load
        console.log('✅ Page fully loaded\n');

        // Test 1: Check button exists and is clickable
        console.log('Test 1: Button functionality');
        const button = await page.$('#languageButton');
        if (button) {
            console.log('  ✅ Button found');
            await button.click();
            await page.waitForTimeout(1000);

            const dropdown = await page.$('#languageDropdown.active');
            if (dropdown) {
                console.log('  ✅ Dropdown opened!\n');
            } else {
                console.log('  ❌ Dropdown did not open\n');
            }
        }

        // Test 2: Try Korean
        console.log('Test 2: Korean selection');
        const koOption = await page.$('.language-option[data-lang="ko"]');
        if (koOption) {
            const isVisible = await koOption.isVisible();
            console.log(`  Korean option visible: ${isVisible ? '✅' : '❌'}`);

            if (isVisible) {
                await koOption.click();
                await page.waitForTimeout(1500);

                const currentLang = await page.textContent('#currentLanguage');
                const translated = await page.textContent('[data-translate="company_title"]');

                console.log(`  Current language display: ${currentLang}`);
                console.log(`  Company title: ${translated}`);

                if (currentLang === '한국어' && translated.includes('회사')) {
                    console.log('  ✅ KOREAN WORKS!\n');
                } else if (currentLang === '한국어') {
                    console.log('  ⚠️  Language changed but translation may not be applied\n');
                } else {
                    console.log('  ❌ Korean failed\n');
                }
            }
        }

        // Test 3: Try Chinese
        console.log('Test 3: Chinese selection');
        await page.click('#languageButton');
        await page.waitForTimeout(500);

        const zhOption = await page.$('.language-option[data-lang="zh"]');
        if (zhOption) {
            const isVisible = await zhOption.isVisible();
            console.log(`  Chinese option visible: ${isVisible ? '✅' : '❌'}`);

            if (isVisible) {
                await zhOption.click();
                await page.waitForTimeout(1500);

                const currentLang = await page.textContent('#currentLanguage');
                const translated = await page.textContent('[data-translate="company_title"]');

                console.log(`  Current language display: ${currentLang}`);
                console.log(`  Company title: ${translated}`);

                if (currentLang === '中文' && translated.includes('公司')) {
                    console.log('  ✅ CHINESE WORKS!\n');
                } else if (currentLang === '中文') {
                    console.log('  ⚠️  Language changed but translation may not be applied\n');
                } else {
                    console.log('  ❌ Chinese failed\n');
                }
            }
        }

        await page.screenshot({
            path: '/Users/kevin/Downloads/AI-DTG Website/screenshots/final-lang-test.png'
        });
        console.log('📸 Screenshot saved\n');

        await page.waitForTimeout(2000);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

finalLanguageTest();
