const { chromium } = require('playwright');

async function debugLanguage() {
    console.log('🔧 Debugging language selector...\n');

    const browser = await chromium.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();

    // Listen to console logs
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

    try {
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForLoadState('networkidle');
        console.log('✅ Page loaded\n');

        // Wait for page to be ready
        await page.waitForTimeout(2000);

        // Check if functions exist
        const functionsExist = await page.evaluate(() => {
            return {
                toggleExists: typeof window.toggleLanguageDropdown === 'function',
                selectExists: typeof window.selectLanguage === 'function'
            };
        });
        console.log('Functions check:', functionsExist);

        // Try to click button manually via evaluate
        console.log('\nAttempting to toggle dropdown via evaluate...');
        await page.evaluate(() => {
            const button = document.getElementById('languageButton');
            console.log('Button found:', !!button);
            if (button) {
                button.click();
            }
        });

        await page.waitForTimeout(1000);

        // Check dropdown state
        const dropdownState = await page.evaluate(() => {
            const dropdown = document.getElementById('languageDropdown');
            return {
                exists: !!dropdown,
                hasActiveClass: dropdown?.classList.contains('active'),
                computedOpacity: dropdown ? window.getComputedStyle(dropdown).opacity : null,
                computedVisibility: dropdown ? window.getComputedStyle(dropdown).visibility : null
            };
        });
        console.log('Dropdown state after toggle:', dropdownState);

        // Try to select Korean directly via evaluate
        console.log('\nAttempting to select Korean via evaluate...');
        const selectResult = await page.evaluate(() => {
            if (typeof window.selectLanguage === 'function') {
                window.selectLanguage('ko', '한국어');
                return { success: true, currentLang: document.getElementById('currentLanguage').textContent };
            }
            return { success: false };
        });
        console.log('Select result:', selectResult);

        await page.waitForTimeout(2000);

        // Check if content translated
        const contentCheck = await page.evaluate(() => {
            const companyTitle = document.querySelector('[data-translate="company_title"]');
            return {
                text: companyTitle?.textContent,
                hasKorean: companyTitle?.textContent.includes('회사')
            };
        });
        console.log('Content after translation:', contentCheck);

        // Take screenshot
        await page.screenshot({
            path: '/Users/kevin/Downloads/AI-DTG Website/screenshots/debug-language.png',
            fullPage: false
        });
        console.log('\n📸 Screenshot saved');

        await page.waitForTimeout(3000);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

debugLanguage();
