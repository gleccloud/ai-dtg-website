const { chromium } = require('playwright');
const path = require('path');

async function verifyProblemsSolutions() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const indexPath = path.join(__dirname, 'ai-dtg-premium-website', 'index.html');
    const fileUrl = `file://${indexPath}`;

    console.log('\n=== PROBLEMS & SOLUTIONS SECTIONS VERIFICATION ===\n');

    const languages = [
        { code: 'ko', name: 'Korean' },
        { code: 'en', name: 'English' },
        { code: 'zh', name: 'Chinese' }
    ];

    const results = {
        problems: { ko: false, en: false, zh: false },
        solutions: { ko: false, en: false, zh: false },
        icons: { ko: 0, en: 0, zh: 0 },
        translations: { ko: 0, en: 0, zh: 0 },
        screenshots: []
    };

    for (const lang of languages) {
        console.log(`\n--- Testing ${lang.name} (${lang.code}) ---`);

        await page.goto(fileUrl);
        await page.waitForTimeout(500);

        // Set language
        await page.evaluate((code) => {
            localStorage.setItem('preferredLanguage', code);
            location.reload();
        }, lang.code);

        await page.waitForTimeout(1000);

        // Check Problems Section
        const problemsSection = await page.locator('.problems-section').count();
        const problemCards = await page.locator('.problem-card').count();
        console.log(`Problems Section: ${problemsSection > 0 ? '✓' : '✗'} Found`);
        console.log(`Problem Cards: ${problemCards}/3`);

        results.problems[lang.code] = problemsSection > 0 && problemCards === 3;

        // Check Solutions Section
        const solutionsSection = await page.locator('.solutions-glec-section').count();
        const solutionCards = await page.locator('.solution-glec-card').count();
        console.log(`Solutions Section: ${solutionsSection > 0 ? '✓' : '✗'} Found`);
        console.log(`Solution Cards: ${solutionCards}/3`);

        results.solutions[lang.code] = solutionsSection > 0 && solutionCards === 3;

        // Check Icons
        const problemIcons = await page.locator('.problem-icon svg').count();
        const solutionIcons = await page.locator('.solution-glec-icon svg').count();
        const totalIcons = problemIcons + solutionIcons;
        console.log(`Icons: ${problemIcons} problem + ${solutionIcons} solution = ${totalIcons}/6`);

        results.icons[lang.code] = totalIcons;

        // Check Translations
        const problemsTitle = await page.locator('[data-translate="problems_title"]').textContent();
        const solutionsTitle = await page.locator('[data-translate="solutions_glec_title"]').textContent();
        const problem1Title = await page.locator('[data-translate="problem1_title"]').textContent();
        const solution1Title = await page.locator('[data-translate="solution1_title"]').textContent();

        console.log(`\nTranslations Sample:`);
        console.log(`  Problems Title: "${problemsTitle}"`);
        console.log(`  Solutions Title: "${solutionsTitle}"`);
        console.log(`  Problem 1: "${problem1Title}"`);
        console.log(`  Solution 1: "${solution1Title}"`);

        // Count translated elements
        const translatedElements = await page.locator('[data-translate]').count();
        results.translations[lang.code] = translatedElements;
        console.log(`\nTotal Translated Elements: ${translatedElements}`);

        // Check for specific content
        const problem1Desc = await page.locator('[data-translate="problem1_desc"]').textContent();
        const solution1Feature1 = await page.locator('[data-translate="solution1_feature1"]').textContent();

        console.log(`\nContent Verification:`);
        console.log(`  Problem 1 has description: ${problem1Desc.length > 20 ? '✓' : '✗'} (${problem1Desc.length} chars)`);
        console.log(`  Solution 1 has features: ${solution1Feature1.length > 10 ? '✓' : '✗'} (${solution1Feature1.length} chars)`);

        // Check hover effects
        const firstProblemCard = page.locator('.problem-card').first();
        const beforeHoverBox = await firstProblemCard.boundingBox();
        await firstProblemCard.hover();
        await page.waitForTimeout(500);
        const afterHoverBox = await firstProblemCard.boundingBox();

        const hasHoverEffect = beforeHoverBox && afterHoverBox &&
                              Math.abs(beforeHoverBox.y - afterHoverBox.y) > 5;
        console.log(`\nHover Effect: ${hasHoverEffect ? '✓' : '✗'} (Y moved ${beforeHoverBox ? Math.abs(beforeHoverBox.y - afterHoverBox.y).toFixed(1) : 0}px)`);

        // Take screenshot
        const screenshotPath = `screenshots/problems-solutions-${lang.code}.png`;
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });
        results.screenshots.push(screenshotPath);
        console.log(`Screenshot saved: ${screenshotPath}`);
    }

    // Summary Report
    console.log('\n\n=== VERIFICATION SUMMARY ===\n');

    console.log('Problems Section:');
    console.log(`  Korean: ${results.problems.ko ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`  English: ${results.problems.en ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`  Chinese: ${results.problems.zh ? '✓ PASS' : '✗ FAIL'}`);

    console.log('\nSolutions Section:');
    console.log(`  Korean: ${results.solutions.ko ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`  English: ${results.solutions.en ? '✓ PASS' : '✗ FAIL'}`);
    console.log(`  Chinese: ${results.solutions.zh ? '✓ PASS' : '✗ FAIL'}`);

    console.log('\nIcons:');
    console.log(`  Korean: ${results.icons.ko}/6 ${results.icons.ko === 6 ? '✓' : '✗'}`);
    console.log(`  English: ${results.icons.en}/6 ${results.icons.en === 6 ? '✓' : '✗'}`);
    console.log(`  Chinese: ${results.icons.zh}/6 ${results.icons.zh === 6 ? '✓' : '✗'}`);

    console.log('\nTranslated Elements:');
    console.log(`  Korean: ${results.translations.ko}`);
    console.log(`  English: ${results.translations.en}`);
    console.log(`  Chinese: ${results.translations.zh}`);

    const allProblemsPass = results.problems.ko && results.problems.en && results.problems.zh;
    const allSolutionsPass = results.solutions.ko && results.solutions.en && results.solutions.zh;
    const allIconsPass = results.icons.ko === 6 && results.icons.en === 6 && results.icons.zh === 6;

    console.log('\n=== FINAL RESULT ===');
    console.log(`Problems Section: ${allProblemsPass ? '✓ 100% SUCCESS' : '✗ FAILED'}`);
    console.log(`Solutions Section: ${allSolutionsPass ? '✓ 100% SUCCESS' : '✗ FAILED'}`);
    console.log(`Icons: ${allIconsPass ? '✓ 100% SUCCESS' : '✗ FAILED'}`);
    console.log(`Overall: ${allProblemsPass && allSolutionsPass && allIconsPass ? '✓ 100% SUCCESS' : '✗ FAILED'}`);

    await browser.close();
}

verifyProblemsSolutions().catch(console.error);
