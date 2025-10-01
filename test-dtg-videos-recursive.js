const { chromium } = require('playwright');

/**
 * Recursive verification test for DTG videos
 * Checks if two videos are displayed horizontally across all language versions
 */

async function testDTGVideosRecursive() {
    console.log('\n🎥 RECURSIVE DTG VIDEOS VERIFICATION TEST\n');
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

            // Test 1: Check if DTG videos container exists
            results.total++;
            const container = page.locator('.dtg-videos-container');
            const containerExists = await container.count() > 0;

            if (containerExists) {
                console.log('\n✅ Test 1: DTG videos container exists');
                results.passed++;
            } else {
                console.log('\n❌ Test 1: DTG videos container NOT found');
                results.failed++;
                results.details.push({
                    language: lang.name,
                    test: 'Container exists',
                    status: 'FAILED',
                    reason: 'dtg-videos-container not found'
                });
            }

            // Test 2: Check number of videos
            results.total++;
            const videos = await page.locator('.dtg-videos-container .dtg-video').all();
            console.log(`\n📹 Found ${videos.length} video(s) in DTG section`);

            if (videos.length === 2) {
                console.log('✅ Test 2: Correct number of videos (2)');
                results.passed++;
            } else {
                console.log(`❌ Test 2: Expected 2 videos, found ${videos.length}`);
                results.failed++;
                results.details.push({
                    language: lang.name,
                    test: 'Number of videos',
                    status: 'FAILED',
                    expected: 2,
                    actual: videos.length
                });
            }

            // Test 3: Check video sources
            if (videos.length >= 2) {
                results.total++;
                const video1Src = await videos[0].locator('source').first().getAttribute('src');
                const video2Src = await videos[1].locator('source').first().getAttribute('src');

                console.log(`\n📂 Video sources:`);
                console.log(`   Video 1: ${video1Src}`);
                console.log(`   Video 2: ${video2Src}`);

                const expectedSrc1 = 'assets/videos/dtg1.mp4';
                const expectedSrc2 = 'assets/videos/dtg2.mp4';

                if (video1Src === expectedSrc1 && video2Src === expectedSrc2) {
                    console.log('✅ Test 3: Video sources correct (dtg1.mp4, dtg2.mp4)');
                    results.passed++;
                } else {
                    console.log('❌ Test 3: Video sources incorrect');
                    results.failed++;
                    results.details.push({
                        language: lang.name,
                        test: 'Video sources',
                        status: 'FAILED',
                        expected: `${expectedSrc1}, ${expectedSrc2}`,
                        actual: `${video1Src}, ${video2Src}`
                    });
                }
            }

            // Test 4: Check horizontal layout (side by side)
            if (videos.length === 2) {
                results.total++;
                const box1 = await videos[0].boundingBox();
                const box2 = await videos[1].boundingBox();

                if (box1 && box2) {
                    console.log(`\n📐 Video positions:`);
                    console.log(`   Video 1: x=${Math.round(box1.x)}, y=${Math.round(box1.y)}, w=${Math.round(box1.width)}px, h=${Math.round(box1.height)}px`);
                    console.log(`   Video 2: x=${Math.round(box2.x)}, y=${Math.round(box2.y)}, w=${Math.round(box2.width)}px, h=${Math.round(box2.height)}px`);

                    // Check if videos are side by side (horizontal layout)
                    const isSideBySide = Math.abs(box1.y - box2.y) < 50; // Y positions are similar
                    const video1OnLeft = box1.x < box2.x; // Video 1 is on the left

                    if (isSideBySide && video1OnLeft) {
                        console.log('✅ Test 4: Videos are arranged horizontally (side by side)');
                        results.passed++;
                    } else {
                        console.log('❌ Test 4: Videos are NOT arranged horizontally');
                        results.failed++;
                        results.details.push({
                            language: lang.name,
                            test: 'Horizontal layout',
                            status: 'FAILED',
                            reason: `Side by side: ${isSideBySide}, Video1 on left: ${video1OnLeft}`
                        });
                    }

                    // Test 5: Check video sizes are similar
                    results.total++;
                    const widthDiff = Math.abs(box1.width - box2.width);
                    const heightDiff = Math.abs(box1.height - box2.height);
                    const sizeTolerance = 20; // 20px tolerance

                    if (widthDiff < sizeTolerance && heightDiff < sizeTolerance) {
                        console.log('✅ Test 5: Videos have similar sizes');
                        results.passed++;
                    } else {
                        console.log(`❌ Test 5: Videos have different sizes (diff: w=${widthDiff}px, h=${heightDiff}px)`);
                        results.failed++;
                        results.details.push({
                            language: lang.name,
                            test: 'Video sizes',
                            status: 'FAILED',
                            widthDiff,
                            heightDiff
                        });
                    }
                }
            }

            // Take screenshot
            const screenshotPath = `screenshots/dtg-videos-${lang.code}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: false });
            console.log(`\n📸 Screenshot: ${screenshotPath}`);
        }

        // Final Report
        console.log('\n\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + ' '.repeat(22) + '📊 DTG VIDEOS TEST REPORT' + ' '.repeat(31) + '║');
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

// Run the test
testDTGVideosRecursive().then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
