const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('\n🔍 VERIFYING ALL SECTIONS IN PREMIUM VERSION\n');
    console.log('=' .repeat(80));

    await page.goto('http://127.0.0.1:8093/index.html');
    await page.waitForLoadState('networkidle');

    // Get all sections
    const sections = await page.$$eval('section', sections => {
        return sections.map((section, index) => {
            const id = section.id || 'no-id';
            const className = section.className;
            const heading = section.querySelector('h1, h2, h3');
            const headingText = heading ? heading.textContent.trim() : 'No heading';

            return {
                index: index + 1,
                id,
                className,
                headingText
            };
        });
    });

    console.log(`\n📊 Total Sections Found: ${sections.length}\n`);

    sections.forEach(section => {
        console.log(`${section.index}. ID: #${section.id}`);
        console.log(`   Class: ${section.className}`);
        console.log(`   Heading: "${section.headingText}"`);
        console.log('');
    });

    console.log('=' .repeat(80));

    // Test language switching
    console.log('\n🌐 TESTING LANGUAGE SWITCHING\n');
    console.log('=' .repeat(80));

    // Click language button
    await page.click('#languageButton');
    await page.waitForTimeout(500);

    console.log('✓ Language dropdown opened');

    // Switch to Korean
    await page.click('[data-lang="ko"]');
    await page.waitForTimeout(1000);

    const koreanHeading = await page.$eval('section h2', el => el.textContent);
    console.log(`✓ Korean selected: "${koreanHeading}"`);

    // Switch to Chinese
    await page.click('#languageButton');
    await page.waitForTimeout(500);
    await page.click('[data-lang="zh"]');
    await page.waitForTimeout(1000);

    const chineseHeading = await page.$eval('section h2', el => el.textContent);
    console.log(`✓ Chinese selected: "${chineseHeading}"`);

    // Switch back to English
    await page.click('#languageButton');
    await page.waitForTimeout(500);
    await page.click('[data-lang="en"]');
    await page.waitForTimeout(1000);

    const englishHeading = await page.$eval('section h2', el => el.textContent);
    console.log(`✓ English selected: "${englishHeading}"`);

    console.log('\n=' .repeat(80));

    // Check for JavaScript errors
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    if (errors.length > 0) {
        console.log('\n❌ JavaScript Errors Found:');
        errors.forEach(err => console.log(`   - ${err}`));
    } else {
        console.log('\n✅ No JavaScript Errors');
    }

    // Check videos
    console.log('\n🎥 CHECKING VIDEOS\n');
    console.log('=' .repeat(80));

    const videos = await page.$$eval('video', videos => {
        return videos.map(v => ({
            id: v.id,
            src: v.querySelector('source')?.src || v.src,
            autoplay: v.autoplay,
            muted: v.muted,
            paused: v.paused
        }));
    });

    console.log(`Total videos: ${videos.length}`);
    videos.forEach((video, idx) => {
        console.log(`${idx + 1}. ID: ${video.id || 'no-id'}`);
        console.log(`   Source: ${video.src}`);
        console.log(`   Autoplay: ${video.autoplay}, Muted: ${video.muted}, Paused: ${video.paused}`);
        console.log('');
    });

    console.log('=' .repeat(80));
    console.log('\n✅ VERIFICATION COMPLETE\n');

    await page.waitForTimeout(3000);
    await browser.close();
})();
