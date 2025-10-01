const { chromium } = require('playwright');

async function testLanguageSelector() {
    console.log('🔍 Testing language selector functionality...\n');

    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForLoadState('networkidle');
        console.log('✅ Page loaded\n');

        // Check if language selector exists
        const selector = await page.$('.language-selector');
        if (!selector) {
            console.log('❌ Language selector not found!');
            return;
        }
        console.log('✅ Language selector found\n');

        // Get initial language
        const initialLang = await page.textContent('#currentLanguage');
        console.log(`Initial language: ${initialLang}\n`);

        // Test 1: Click language button
        console.log('Test 1: Clicking language button...');
        await page.click('#languageButton');
        await page.waitForTimeout(500);

        const dropdownVisible = await page.isVisible('#languageDropdown.active');
        console.log(`Dropdown visible: ${dropdownVisible ? '✅ YES' : '❌ NO'}\n`);

        // Test 2: Check if Korean option is clickable
        console.log('Test 2: Checking Korean option...');
        const koreanOption = await page.$('.language-option[data-lang="ko"]');
        if (koreanOption) {
            const isVisible = await koreanOption.isVisible();
            const isEnabled = await koreanOption.isEnabled();
            console.log(`Korean option visible: ${isVisible ? '✅' : '❌'}`);
            console.log(`Korean option enabled: ${isEnabled ? '✅' : '❌'}\n`);

            // Try to click Korean
            console.log('Attempting to click Korean option...');
            try {
                await koreanOption.click({ force: true });
                await page.waitForTimeout(1000);

                const newLang = await page.textContent('#currentLanguage');
                console.log(`Language after click: ${newLang}`);

                if (newLang === '한국어') {
                    console.log('✅ Korean selection WORKS!\n');
                } else {
                    console.log('❌ Korean selection FAILED\n');
                }
            } catch (error) {
                console.log(`❌ Error clicking Korean: ${error.message}\n`);
            }
        }

        // Test 3: Check content translation
        console.log('Test 3: Checking if content translated...');
        const companyTitle = await page.textContent('[data-translate="company_title"]');
        console.log(`Company title: ${companyTitle}`);

        if (companyTitle && companyTitle.includes('회사')) {
            console.log('✅ Content is translated to Korean!\n');
        } else {
            console.log('⚠️  Content may not be translated\n');
        }

        // Test 4: Try Chinese
        console.log('Test 4: Testing Chinese...');
        await page.click('#languageButton');
        await page.waitForTimeout(500);

        const chineseOption = await page.$('.language-option[data-lang="zh"]');
        if (chineseOption) {
            await chineseOption.click({ force: true });
            await page.waitForTimeout(1000);

            const newLang = await page.textContent('#currentLanguage');
            console.log(`Language after click: ${newLang}`);

            if (newLang === '中文') {
                console.log('✅ Chinese selection WORKS!\n');
            } else {
                console.log('❌ Chinese selection FAILED\n');
            }
        }

        // Screenshot
        await page.screenshot({
            path: '/Users/kevin/Downloads/AI-DTG Website/screenshots/language-test.png',
            fullPage: false
        });
        console.log('📸 Screenshot saved: language-test.png');

        await page.waitForTimeout(2000);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

testLanguageSelector();
