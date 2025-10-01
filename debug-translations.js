const { chromium } = require('playwright');

async function debugTranslations() {
    console.log('🔍 Starting detailed translation debugging...\n');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const url = 'http://127.0.0.1:8093/index.html';

    try {
        await page.goto(url, { waitUntil: 'networkidle' });
        console.log('✅ Page loaded\n');
        await page.waitForTimeout(2000);

        // Check initial state
        console.log('📊 Initial state (English):');
        await checkTranslatableElements(page);

        // Switch to Korean
        console.log('\n🇰🇷 Switching to Korean...');
        await page.click('.language-button');
        await page.waitForTimeout(500);

        // Take screenshot before clicking
        await page.screenshot({ path: '/Users/kevin/Downloads/AI-DTG Website/debug-before-korean.png' });

        const koreanOption = await page.locator('.language-option:has-text("한국어")');
        const isVisible = await koreanOption.isVisible();
        console.log(`Korean option visible: ${isVisible}`);

        if (isVisible) {
            await koreanOption.click();
            await page.waitForTimeout(1000);

            // Take screenshot after clicking
            await page.screenshot({ path: '/Users/kevin/Downloads/AI-DTG Website/debug-after-korean.png' });

            console.log('\n📊 After switching to Korean:');
            await checkTranslatableElements(page);

            // Check if language actually changed
            const currentLang = await page.evaluate(() => window.currentLang);
            console.log(`\nCurrent language variable: ${currentLang}`);
        }

        // Check translation data
        console.log('\n📚 Checking translation data structure:');
        const translationKeys = await page.evaluate(() => {
            const keys = {
                en: Object.keys(translations.en || {}).length,
                ko: Object.keys(translations.ko || {}).length,
                zh: Object.keys(translations.zh || {}).length
            };
            return keys;
        });
        console.log('Translation keys count:', translationKeys);

        // Check specific translations
        console.log('\n🔑 Checking specific translation keys:');
        const specificKeys = await page.evaluate(() => {
            return {
                company_title_en: translations.en?.company_title,
                company_title_ko: translations.ko?.company_title,
                company_title_zh: translations.zh?.company_title
            };
        });
        console.log(specificKeys);

    } catch (error) {
        console.error('❌ Error:', error.message);
        await page.screenshot({ path: '/Users/kevin/Downloads/AI-DTG Website/debug-error.png' });
    } finally {
        // Keep browser open for manual inspection
        console.log('\n✋ Browser will stay open for manual inspection. Press Ctrl+C to close.');
        await page.waitForTimeout(60000); // Wait 60 seconds
        await browser.close();
    }
}

async function checkTranslatableElements(page) {
    const elements = await page.$$('[data-translate]');
    console.log(`  Found ${elements.length} translatable elements`);

    // Sample first 5 elements
    for (let i = 0; i < Math.min(5, elements.length); i++) {
        const key = await elements[i].getAttribute('data-translate');
        const text = await elements[i].textContent();
        console.log(`  [${i + 1}] ${key}: "${text.substring(0, 50)}..."`);
    }
}

debugTranslations();
