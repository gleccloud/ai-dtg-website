const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });

    console.log('\n🧪 TESTING MULTI-PAGE WEBSITE STRUCTURE\n');
    console.log('='.repeat(80));

    const pages = [
        { name: 'Home', file: 'index.html', expectedSections: 2 },
        { name: 'Solutions', file: 'solutions.html', expectedSections: 5 },
        { name: 'About', file: 'about.html', expectedSections: 5 },
        { name: 'CES 2026', file: 'ces2026.html', expectedSections: 2 },
        { name: 'Contact', file: 'contact.html', expectedSections: 2 }
    ];

    const baseUrl = 'http://127.0.0.1:8093/';
    const results = {
        passed: 0,
        failed: 0,
        details: []
    };

    // Test 1: Check all pages load
    console.log('\n📄 Test 1: Page Load Verification\n');
    console.log('='.repeat(80));

    for (const pageInfo of pages) {
        const page = await browser.newPage();
        const url = baseUrl + pageInfo.file;

        try {
            await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });

            const title = await page.title();
            const sections = await page.$$('section');

            console.log(`✓ ${pageInfo.name.padEnd(12)} - ${title}`);
            console.log(`  URL: ${pageInfo.file}`);
            console.log(`  Sections: ${sections.length} (expected: ${pageInfo.expectedSections})`);

            if (sections.length >= pageInfo.expectedSections) {
                results.passed++;
                results.details.push({ page: pageInfo.name, status: 'PASS', test: 'Load' });
            } else {
                results.failed++;
                results.details.push({ page: pageInfo.name, status: 'FAIL', test: 'Load', issue: `Only ${sections.length} sections` });
            }

        } catch (e) {
            console.log(`✗ ${pageInfo.name} - FAILED TO LOAD`);
            console.log(`  Error: ${e.message}`);
            results.failed++;
            results.details.push({ page: pageInfo.name, status: 'FAIL', test: 'Load', issue: e.message });
        }

        await page.close();
        console.log('');
    }

    // Test 2: Navigation Links
    console.log('\n🔗 Test 2: Cross-Page Navigation\n');
    console.log('='.repeat(80));

    const page = await browser.newPage();
    await page.goto(baseUrl + 'index.html');

    const navLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('nav a'));
        return links.map(link => ({
            text: link.textContent.trim(),
            href: link.getAttribute('href')
        })).filter(link => link.href && !link.href.startsWith('#'));
    });

    console.log(`Found ${navLinks.length} navigation links:`);
    navLinks.forEach((link, idx) => {
        console.log(`  ${idx + 1}. "${link.text}" → ${link.href}`);
    });

    // Test navigation to each page
    console.log('\nTesting navigation:');
    for (const link of navLinks.slice(0, 5)) {
        if (link.href && !link.href.startsWith('#')) {
            const fileName = link.href.split('#')[0];
            try {
                const testPage = await browser.newPage();
                await testPage.goto(baseUrl + fileName, { waitUntil: 'networkidle', timeout: 5000 });
                console.log(`  ✓ ${fileName} - loads correctly`);
                results.passed++;
                await testPage.close();
            } catch (e) {
                console.log(`  ✗ ${fileName} - failed to load`);
                results.failed++;
            }
        }
    }

    // Test 3: Dropdown Menus
    console.log('\n\n📂 Test 3: Dropdown Menu Functionality\n');
    console.log('='.repeat(80));

    await page.goto(baseUrl + 'index.html');
    await page.waitForTimeout(1000);

    const dropdowns = await page.$$('.nav-dropdown');
    console.log(`Found ${dropdowns.length} dropdown menus\n`);

    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        const heading = await dropdown.$eval('.dropdown-toggle', el => el.textContent.trim());

        await dropdown.hover();
        await page.waitForTimeout(500);

        const visible = await dropdown.$eval('.dropdown-menu', el => {
            const styles = window.getComputedStyle(el);
            return styles.opacity !== '0' && styles.visibility !== 'hidden';
        });

        console.log(`${i + 1}. "${heading}"`);
        console.log(`   Hover: ${visible ? '✓ Visible' : '✗ Hidden'}`);

        if (visible) {
            const links = await dropdown.$$eval('.dropdown-link', links =>
                links.map(l => ({ text: l.textContent.trim(), href: l.getAttribute('href') }))
            );
            links.forEach(link => {
                console.log(`   - ${link.text} → ${link.href}`);
            });
            results.passed++;
        } else {
            results.failed++;
        }
        console.log('');
    }

    // Test 4: Language Switching
    console.log('\n🌐 Test 4: Multi-Language Support\n');
    console.log('='.repeat(80));

    const testPages = ['index.html', 'solutions.html', 'about.html'];

    for (const testFile of testPages) {
        const langPage = await browser.newPage();
        await langPage.goto(baseUrl + testFile);
        await langPage.waitForTimeout(1000);

        console.log(`\nTesting ${testFile}:`);

        // Test Korean
        await langPage.click('#languageButton');
        await langPage.waitForTimeout(300);
        await langPage.click('[data-lang="ko"]');
        await langPage.waitForTimeout(500);

        const koText = await langPage.$eval('.nav-menu', el => el.textContent);
        const hasKorean = /한국어|솔루션|회사/.test(koText);
        console.log(`  Korean: ${hasKorean ? '✓' : '✗'} ${hasKorean ? 'Translation working' : 'Translation failed'}`);

        // Test English
        await langPage.click('#languageButton');
        await langPage.waitForTimeout(300);
        await langPage.click('[data-lang="en"]');
        await langPage.waitForTimeout(500);

        const enText = await langPage.$eval('.nav-menu', el => el.textContent);
        const hasEnglish = /Solutions|About|Contact/.test(enText);
        console.log(`  English: ${hasEnglish ? '✓' : '✗'} ${hasEnglish ? 'Translation working' : 'Translation failed'}`);

        if (hasKorean && hasEnglish) {
            results.passed++;
        } else {
            results.failed++;
        }

        await langPage.close();
    }

    // Test 5: Shared Resources
    console.log('\n\n📦 Test 5: Shared CSS & JS Loading\n');
    console.log('='.repeat(80));

    for (const pageInfo of pages) {
        const resPage = await browser.newPage();
        await resPage.goto(baseUrl + pageInfo.file);

        const cssLoaded = await resPage.evaluate(() => {
            const link = document.querySelector('link[href="css/shared-styles.css"]');
            return !!link;
        });

        const jsLoaded = await resPage.evaluate(() => {
            const script = document.querySelector('script[src="js/main.js"]');
            return !!script;
        });

        console.log(`${pageInfo.name.padEnd(12)} - CSS: ${cssLoaded ? '✓' : '✗'}, JS: ${jsLoaded ? '✓' : '✗'}`);

        if (cssLoaded && jsLoaded) {
            results.passed++;
        } else {
            results.failed++;
        }

        await resPage.close();
    }

    // Test 6: Forms
    console.log('\n\n📝 Test 6: Form Validation\n');
    console.log('='.repeat(80));

    // Test CES form
    const cesPage = await browser.newPage();
    await cesPage.goto(baseUrl + 'ces2026.html');
    const cesFormExists = await cesPage.$('#cesInvitationForm');
    console.log(`CES Invitation Form: ${cesFormExists ? '✓ Found' : '✗ Not found'}`);

    // Test Contact form
    const contactPage = await browser.newPage();
    await contactPage.goto(baseUrl + 'contact.html');
    const contactFormExists = await contactPage.$('#contactForm');
    console.log(`Contact Form: ${contactFormExists ? '✓ Found' : '✗ Not found'}`);

    if (cesFormExists) results.passed++;
    else results.failed++;

    if (contactFormExists) results.passed++;
    else results.failed++;

    await cesPage.close();
    await contactPage.close();

    // Test 7: Screenshots
    console.log('\n\n📸 Test 7: Taking Screenshots\n');
    console.log('='.repeat(80));

    for (const pageInfo of pages) {
        const screenshotPage = await browser.newPage();
        await screenshotPage.goto(baseUrl + pageInfo.file);
        await screenshotPage.waitForTimeout(1000);

        await screenshotPage.screenshot({
            path: `screenshots/multipage-${pageInfo.file.replace('.html', '')}.png`,
            fullPage: true
        });

        console.log(`✓ Screenshot saved: multipage-${pageInfo.file.replace('.html', '')}.png`);
        await screenshotPage.close();
    }

    // Summary Report
    console.log('\n\n📊 TEST SUMMARY\n');
    console.log('='.repeat(80));
    console.log(`Total Tests: ${results.passed + results.failed}`);
    console.log(`Passed: ${results.passed} ✓`);
    console.log(`Failed: ${results.failed} ✗`);
    console.log(`Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);

    console.log('\n\nDetailed Results:');
    results.details.forEach(detail => {
        const status = detail.status === 'PASS' ? '✓' : '✗';
        console.log(`  ${status} ${detail.page} - ${detail.test} ${detail.issue ? '(' + detail.issue + ')' : ''}`);
    });

    // Save report
    fs.writeFileSync('multipage-test-report.json', JSON.stringify(results, null, 2));
    console.log('\n✅ Test report saved: multipage-test-report.json');

    console.log('\n\n✨ TESTING COMPLETE!\n');

    await page.close();
    await browser.close();
})();
