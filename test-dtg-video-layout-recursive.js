const { chromium } = require('playwright');

/**
 * Recursive verification of DTG video layout improvements
 * Tests video sizes and center alignment across all language versions
 */

async function testDTGVideoLayoutRecursive() {
    console.log('\n📐 RECURSIVE DTG VIDEO LAYOUT VERIFICATION\n');
    console.log('='.repeat(80));

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    const baseUrl = 'http://127.0.0.1:8093';
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: 'Korean (한국어)' },
        { code: 'zh', name: 'Chinese (中文)' }
    ];

    const results = {
        total: 0,
        passed: 0,
        failed: 0,
        details: []
    };

    try {
        for (const lang of languages) {
            console.log(`\n${'='.repeat(80)}`);
            console.log(`🌐 Testing ${lang.name} Version`);
            console.log(`${'='.repeat(80)}`);

            // Navigate to solutions page
            await page.goto(`${baseUrl}/solutions.html`, { waitUntil: 'networkidle' });
            await page.waitForTimeout(1000);

            // Switch language if not English
            if (lang.code !== 'en') {
                try {
                    await page.locator('#languageButton, .language-button').click();
                    await page.waitForTimeout(300);
                    await page.locator(`.language-option[data-lang="${lang.code}"]`).click({ force: true });
                    await page.waitForTimeout(1000);
                    console.log(`✓ Switched to ${lang.name}`);
                } catch (e) {
                    console.log(`⚠️  Could not switch to ${lang.name}: ${e.message}`);
                }
            }

            // Scroll to AI DTG section
            await page.locator('#ai-dtg').scrollIntoViewIfNeeded();
            await page.waitForTimeout(1500);

            // Get video measurements
            const videos = await page.locator('.dtg-videos-container .dtg-video').all();
            console.log(`\n📹 Found ${videos.length} video(s)`);

            if (videos.length !== 2) {
                console.log(`❌ Expected 2 videos, found ${videos.length}`);
                results.failed++;
                results.total++;
                continue;
            }

            const video1Box = await videos[0].boundingBox();
            const video2Box = await videos[1].boundingBox();

            if (!video1Box || !video2Box) {
                console.log('❌ Could not get video bounding boxes');
                results.failed++;
                results.total++;
                continue;
            }

            console.log(`\n📐 Video 1 Measurements:`);
            console.log(`   Size: ${Math.round(video1Box.width)}×${Math.round(video1Box.height)}px`);
            console.log(`   Position: (${Math.round(video1Box.x)}, ${Math.round(video1Box.y)})`);
            console.log(`   Aspect Ratio: ${(video1Box.width / video1Box.height).toFixed(2)}`);
            console.log(`   Center: (${Math.round(video1Box.x + video1Box.width/2)}, ${Math.round(video1Box.y + video1Box.height/2)})`);

            console.log(`\n📐 Video 2 Measurements:`);
            console.log(`   Size: ${Math.round(video2Box.width)}×${Math.round(video2Box.height)}px`);
            console.log(`   Position: (${Math.round(video2Box.x)}, ${Math.round(video2Box.y)})`);
            console.log(`   Aspect Ratio: ${(video2Box.width / video2Box.height).toFixed(2)}`);
            console.log(`   Center: (${Math.round(video2Box.x + video2Box.width/2)}, ${Math.round(video2Box.y + video2Box.height/2)})`);

            // Test 1: Video sizes are reasonable (not too small)
            results.total++;
            const minWidth = 400;
            const minHeight = 200;

            if (video1Box.width >= minWidth && video1Box.height >= minHeight &&
                video2Box.width >= minWidth && video2Box.height >= minHeight) {
                console.log(`\n✅ Test 1: Video sizes are adequate (>=${minWidth}×${minHeight}px)`);
                results.passed++;
            } else {
                console.log(`\n❌ Test 1: Videos are too small (<${minWidth}×${minHeight}px)`);
                results.failed++;
                results.details.push({
                    language: lang.name,
                    test: 'Video sizes',
                    status: 'FAILED',
                    video1Size: `${Math.round(video1Box.width)}×${Math.round(video1Box.height)}`,
                    video2Size: `${Math.round(video2Box.width)}×${Math.round(video2Box.height)}`
                });
            }

            // Test 2: Aspect ratios are reasonable (not too wide/narrow)
            results.total++;
            const ratio1 = video1Box.width / video1Box.height;
            const ratio2 = video2Box.width / video2Box.height;
            const minRatio = 1.3;
            const maxRatio = 2.0;

            if (ratio1 >= minRatio && ratio1 <= maxRatio && ratio2 >= minRatio && ratio2 <= maxRatio) {
                console.log(`✅ Test 2: Aspect ratios are good (${minRatio}-${maxRatio})`);
                results.passed++;
            } else {
                console.log(`❌ Test 2: Aspect ratios are outside ideal range`);
                results.failed++;
                results.details.push({
                    language: lang.name,
                    test: 'Aspect ratios',
                    status: 'FAILED',
                    video1Ratio: ratio1.toFixed(2),
                    video2Ratio: ratio2.toFixed(2),
                    idealRange: `${minRatio}-${maxRatio}`
                });
            }

            // Test 3: Vertical alignment (Y positions should be similar)
            results.total++;
            const yDiff = Math.abs(video1Box.y - video2Box.y);
            const alignmentTolerance = 10;

            if (yDiff <= alignmentTolerance) {
                console.log(`✅ Test 3: Videos are vertically aligned (Y diff: ${Math.round(yDiff)}px)`);
                results.passed++;
            } else {
                console.log(`❌ Test 3: Videos are NOT aligned (Y diff: ${Math.round(yDiff)}px)`);
                results.failed++;
                results.details.push({
                    language: lang.name,
                    test: 'Vertical alignment',
                    status: 'FAILED',
                    yDifference: `${Math.round(yDiff)}px`,
                    tolerance: `${alignmentTolerance}px`
                });
            }

            // Test 4: Horizontal center alignment (videos centered in their containers)
            results.total++;
            const video1Center = video1Box.x + video1Box.width / 2;
            const video2Center = video2Box.x + video2Box.width / 2;
            const expectedHalfway = (video1Box.x + video2Box.x + video2Box.width) / 2;
            const centerDiff = Math.abs((video1Center + video2Center) / 2 - expectedHalfway);

            if (centerDiff <= 20) {
                console.log(`✅ Test 4: Videos are horizontally centered`);
                results.passed++;
            } else {
                console.log(`❌ Test 4: Videos may not be properly centered`);
                results.failed++;
            }

            // Test 5: Similar sizes (videos should be same size)
            results.total++;
            const widthDiff = Math.abs(video1Box.width - video2Box.width);
            const heightDiff = Math.abs(video1Box.height - video2Box.height);
            const sizeTolerance = 20;

            if (widthDiff <= sizeTolerance && heightDiff <= sizeTolerance) {
                console.log(`✅ Test 5: Videos have consistent sizes (diff: ${Math.round(widthDiff)}×${Math.round(heightDiff)}px)`);
                results.passed++;
            } else {
                console.log(`❌ Test 5: Videos have inconsistent sizes (diff: ${Math.round(widthDiff)}×${Math.round(heightDiff)}px)`);
                results.failed++;
                results.details.push({
                    language: lang.name,
                    test: 'Size consistency',
                    status: 'FAILED',
                    widthDiff: `${Math.round(widthDiff)}px`,
                    heightDiff: `${Math.round(heightDiff)}px`
                });
            }

            // Take screenshot
            const screenshotPath = `screenshots/dtg-layout-${lang.code}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: false });
            console.log(`\n📸 Screenshot: ${screenshotPath}`);
        }

        // Final Report
        console.log('\n\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + ' '.repeat(18) + '📊 DTG VIDEO LAYOUT TEST REPORT' + ' '.repeat(27) + '║');
        console.log('╚' + '═'.repeat(78) + '╝');
        console.log('');
        console.log(`Total Tests: ${results.total}`);
        console.log(`✅ Passed: ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
        console.log(`❌ Failed: ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);
        console.log('');

        if (results.details.length > 0) {
            console.log('❌ FAILED TESTS:');
            console.log('─'.repeat(80));
            results.details.forEach((detail, index) => {
                console.log(`\n${index + 1}. ${detail.language} - ${detail.test}: ${detail.status}`);
                Object.keys(detail).forEach(key => {
                    if (!['language', 'test', 'status'].includes(key)) {
                        console.log(`   ${key}: ${detail[key]}`);
                    }
                });
            });
            console.log('\n');
        } else {
            console.log('🎉 ALL TESTS PASSED!\n');
        }

    } catch (error) {
        console.error('\n❌ Test Error:', error.message);
        console.error(error.stack);
    } finally {
        await browser.close();
        console.log('✅ Browser closed\n');
    }

    return results;
}

// Run test
testDTGVideoLayoutRecursive().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
