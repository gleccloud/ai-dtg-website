const { chromium } = require('playwright');

/**
 * Compare DTG video layout between production (dtg.glec.io) and local
 * Analyze video sizes and alignment for recursive improvement
 */

async function compareDTGVideoLayout() {
    console.log('\n📐 COMPARING DTG VIDEO LAYOUT: PRODUCTION vs LOCAL\n');
    console.log('='.repeat(80));

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    const measurements = {
        production: null,
        local: null
    };

    try {
        // ===== ANALYZE PRODUCTION SITE =====
        console.log('\n📍 PRODUCTION: https://dtg.glec.io/');
        console.log('-'.repeat(80));

        const prodPage = await context.newPage();
        await prodPage.goto('https://dtg.glec.io/', { waitUntil: 'networkidle', timeout: 30000 });
        await prodPage.waitForTimeout(2000);

        // Find AI DTG section
        const prodDtgSection = await prodPage.locator('#ai-dtg, section:has-text("GLEC AI DTG")').first();

        if (await prodDtgSection.count() > 0) {
            await prodDtgSection.scrollIntoViewIfNeeded();
            await prodPage.waitForTimeout(1000);

            // Get all videos
            const prodVideos = await prodDtgSection.locator('video').all();
            console.log(`\n📹 Found ${prodVideos.length} video(s) in DTG section`);

            measurements.production = {
                videoCount: prodVideos.length,
                videos: []
            };

            for (let i = 0; i < prodVideos.length; i++) {
                const video = prodVideos[i];
                const box = await video.boundingBox();
                const parent = video.locator('xpath=..');
                const parentBox = await parent.boundingBox();

                if (box) {
                    const videoData = {
                        index: i + 1,
                        width: Math.round(box.width),
                        height: Math.round(box.height),
                        x: Math.round(box.x),
                        y: Math.round(box.y),
                        aspectRatio: (box.width / box.height).toFixed(2),
                        parentWidth: parentBox ? Math.round(parentBox.width) : null,
                        parentHeight: parentBox ? Math.round(parentBox.height) : null,
                        horizontalCenter: Math.round(box.x + box.width / 2),
                        verticalCenter: Math.round(box.y + box.height / 2)
                    };

                    measurements.production.videos.push(videoData);

                    console.log(`\n  Video ${i + 1}:`);
                    console.log(`    Size: ${videoData.width}×${videoData.height}px`);
                    console.log(`    Position: (${videoData.x}, ${videoData.y})`);
                    console.log(`    Aspect Ratio: ${videoData.aspectRatio}`);
                    console.log(`    Center Point: (${videoData.horizontalCenter}, ${videoData.verticalCenter})`);
                    if (parentBox) {
                        console.log(`    Parent Container: ${videoData.parentWidth}×${videoData.parentHeight}px`);
                    }
                }
            }

            // Take screenshot
            await prodPage.screenshot({
                path: 'screenshots/production-dtg-layout.png',
                fullPage: false
            });
            console.log('\n📸 Screenshot: screenshots/production-dtg-layout.png');
        }

        // ===== ANALYZE LOCAL SITE =====
        console.log('\n\n📍 LOCAL: http://127.0.0.1:8093/solutions.html');
        console.log('-'.repeat(80));

        const localPage = await context.newPage();
        await localPage.goto('http://127.0.0.1:8093/solutions.html', { waitUntil: 'networkidle' });
        await localPage.waitForTimeout(2000);

        // Scroll to AI DTG section
        const localDtgSection = await localPage.locator('#ai-dtg');
        await localDtgSection.scrollIntoViewIfNeeded();
        await localPage.waitForTimeout(1000);

        const localVideos = await localDtgSection.locator('.dtg-video').all();
        console.log(`\n📹 Found ${localVideos.length} video(s) in DTG section`);

        measurements.local = {
            videoCount: localVideos.length,
            videos: []
        };

        for (let i = 0; i < localVideos.length; i++) {
            const video = localVideos[i];
            const box = await video.boundingBox();
            const parent = video.locator('xpath=..');
            const parentBox = await parent.boundingBox();

            if (box) {
                const videoData = {
                    index: i + 1,
                    width: Math.round(box.width),
                    height: Math.round(box.height),
                    x: Math.round(box.x),
                    y: Math.round(box.y),
                    aspectRatio: (box.width / box.height).toFixed(2),
                    parentWidth: parentBox ? Math.round(parentBox.width) : null,
                    parentHeight: parentBox ? Math.round(parentBox.height) : null,
                    horizontalCenter: Math.round(box.x + box.width / 2),
                    verticalCenter: Math.round(box.y + box.height / 2)
                };

                measurements.local.videos.push(videoData);

                console.log(`\n  Video ${i + 1}:`);
                console.log(`    Size: ${videoData.width}×${videoData.height}px`);
                console.log(`    Position: (${videoData.x}, ${videoData.y})`);
                console.log(`    Aspect Ratio: ${videoData.aspectRatio}`);
                console.log(`    Center Point: (${videoData.horizontalCenter}, ${videoData.verticalCenter})`);
                if (parentBox) {
                    console.log(`    Parent Container: ${videoData.parentWidth}×${videoData.parentHeight}px`);
                }
            }
        }

        // Take screenshot
        await localPage.screenshot({
            path: 'screenshots/local-dtg-layout.png',
            fullPage: false
        });
        console.log('\n📸 Screenshot: screenshots/local-dtg-layout.png');

        // ===== COMPARISON ANALYSIS =====
        console.log('\n\n' + '='.repeat(80));
        console.log('📊 COMPARISON ANALYSIS');
        console.log('='.repeat(80));

        if (measurements.local.videoCount === 2) {
            const local1 = measurements.local.videos[0];
            const local2 = measurements.local.videos[1];

            console.log('\n🔍 Video 1 Analysis:');
            console.log(`  Current Size: ${local1.width}×${local1.height}px`);
            console.log(`  Current Aspect Ratio: ${local1.aspectRatio}`);

            console.log('\n🔍 Video 2 Analysis:');
            console.log(`  Current Size: ${local2.width}×${local2.height}px`);
            console.log(`  Current Aspect Ratio: ${local2.aspectRatio}`);
            console.log(`  Current Center: (${local2.horizontalCenter}, ${local2.verticalCenter})`);

            // Check alignment
            const yDiff = Math.abs(local1.y - local2.y);
            const centersDiff = Math.abs(local1.verticalCenter - local2.verticalCenter);

            console.log('\n📏 Alignment Analysis:');
            console.log(`  Y-position difference: ${yDiff}px`);
            console.log(`  Vertical centers difference: ${centersDiff}px`);

            if (yDiff <= 5) {
                console.log('  ✅ Videos are horizontally aligned');
            } else {
                console.log(`  ⚠️  Videos are NOT well aligned (${yDiff}px difference)`);
            }

            if (centersDiff <= 5) {
                console.log('  ✅ Videos are vertically centered together');
            } else {
                console.log(`  ⚠️  Videos are NOT vertically centered (${centersDiff}px difference)`);
            }

            // Size comparison
            const sizeDiff = Math.abs(local1.width - local2.width);
            console.log(`\n📦 Size Comparison:`);
            console.log(`  Width difference: ${sizeDiff}px`);

            if (sizeDiff <= 20) {
                console.log('  ✅ Videos have similar widths');
            } else {
                console.log(`  ⚠️  Videos have different widths (${sizeDiff}px difference)`);
            }

            // Recommendations
            console.log('\n\n💡 RECOMMENDATIONS:');
            console.log('-'.repeat(80));

            if (yDiff > 5 || centersDiff > 5) {
                console.log('1. ⚠️  Improve vertical alignment between videos');
                console.log('   → Add align-items: center to .dtg-videos-container');
                console.log('   → Ensure both videos have consistent height or use object-fit');
            }

            if (sizeDiff > 20) {
                console.log('2. ⚠️  Adjust video sizes for consistency');
                console.log('   → Consider setting max-height or aspect-ratio on videos');
            }

            console.log('3. ✓ Verify responsive behavior on different screen sizes');
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error(error.stack);
    } finally {
        await browser.close();
        console.log('\n✅ Analysis complete\n');
    }

    return measurements;
}

// Run comparison
compareDTGVideoLayout().catch(console.error);
