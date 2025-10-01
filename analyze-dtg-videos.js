const { chromium } = require('playwright');

/**
 * Analyze AI DTG section video layout on production site
 * Compare with local implementation
 */

async function analyzeDTGVideos() {
    console.log('\n🎥 ANALYZING AI DTG VIDEO LAYOUT\n');
    console.log('='.repeat(80));

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    try {
        // Analyze production site
        console.log('\n📍 PRODUCTION SITE: https://dtg.glec.io/');
        console.log('-'.repeat(80));

        const prodPage = await context.newPage();
        await prodPage.goto('https://dtg.glec.io/', { waitUntil: 'networkidle', timeout: 30000 });
        await prodPage.waitForTimeout(2000);

        // Find AI DTG section
        const dtgSection = await prodPage.locator('#ai-dtg, [id*="dtg"], section:has-text("GLEC AI DTG")').first();

        if (await dtgSection.count() > 0) {
            console.log('✅ Found AI DTG section on production');

            // Find all videos in the section
            const videos = await dtgSection.locator('video').all();
            console.log(`\n📹 Number of videos found: ${videos.length}`);

            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];
                const src = await video.getAttribute('src').catch(() => 'N/A');
                const sources = await video.locator('source').all();

                console.log(`\nVideo ${i + 1}:`);
                console.log(`  - Direct src: ${src}`);

                if (sources.length > 0) {
                    console.log(`  - Source elements: ${sources.length}`);
                    for (let j = 0; j < sources.length; j++) {
                        const srcAttr = await sources[j].getAttribute('src');
                        const type = await sources[j].getAttribute('type');
                        console.log(`    ${j + 1}. ${srcAttr} (${type})`);
                    }
                }

                // Get video container styles
                const container = video.locator('xpath=..'); // parent element
                const containerClass = await container.getAttribute('class').catch(() => 'N/A');
                console.log(`  - Container class: ${containerClass}`);

                // Get bounding box
                const box = await video.boundingBox();
                if (box) {
                    console.log(`  - Size: ${Math.round(box.width)}x${Math.round(box.height)}px`);
                    console.log(`  - Position: (${Math.round(box.x)}, ${Math.round(box.y)})`);
                }
            }

            // Check layout structure
            const videoContainers = await dtgSection.locator('[class*="video"], .dtg-video-container, .video-container').all();
            console.log(`\n📦 Video containers found: ${videoContainers.length}`);

            for (let i = 0; i < videoContainers.length; i++) {
                const container = videoContainers[i];
                const className = await container.getAttribute('class');
                const box = await container.boundingBox();
                console.log(`\nContainer ${i + 1}:`);
                console.log(`  - Class: ${className}`);
                if (box) {
                    console.log(`  - Size: ${Math.round(box.width)}x${Math.round(box.height)}px`);
                }
            }

            // Take screenshot
            await prodPage.screenshot({
                path: 'screenshots/production-dtg-videos.png',
                fullPage: false
            });
            console.log('\n📸 Screenshot saved: screenshots/production-dtg-videos.png');

        } else {
            console.log('❌ Could not find AI DTG section on production');
        }

        // Analyze local site
        console.log('\n\n📍 LOCAL SITE: http://127.0.0.1:8093/solutions.html');
        console.log('-'.repeat(80));

        const localPage = await context.newPage();
        await localPage.goto('http://127.0.0.1:8093/solutions.html', { waitUntil: 'networkidle' });
        await localPage.waitForTimeout(2000);

        // Scroll to AI DTG section
        await localPage.locator('#ai-dtg').scrollIntoViewIfNeeded();
        await localPage.waitForTimeout(1000);

        const localDtgSection = await localPage.locator('#ai-dtg');

        if (await localDtgSection.count() > 0) {
            console.log('✅ Found AI DTG section on local');

            // Find all videos
            const localVideos = await localDtgSection.locator('video').all();
            console.log(`\n📹 Number of videos found: ${localVideos.length}`);

            for (let i = 0; i < localVideos.length; i++) {
                const video = localVideos[i];
                const src = await video.getAttribute('src').catch(() => 'N/A');
                const sources = await video.locator('source').all();

                console.log(`\nVideo ${i + 1}:`);
                console.log(`  - Direct src: ${src}`);

                if (sources.length > 0) {
                    console.log(`  - Source elements: ${sources.length}`);
                    for (let j = 0; j < sources.length; j++) {
                        const srcAttr = await sources[j].getAttribute('src');
                        const type = await sources[j].getAttribute('type');
                        console.log(`    ${j + 1}. ${srcAttr} (${type})`);
                    }
                }

                const box = await video.boundingBox();
                if (box) {
                    console.log(`  - Size: ${Math.round(box.width)}x${Math.round(box.height)}px`);
                    console.log(`  - Position: (${Math.round(box.x)}, ${Math.round(box.y)})`);
                }
            }

            // Take screenshot
            await localPage.screenshot({
                path: 'screenshots/local-dtg-videos.png',
                fullPage: false
            });
            console.log('\n📸 Screenshot saved: screenshots/local-dtg-videos.png');

        } else {
            console.log('❌ Could not find AI DTG section on local');
        }

        // Check available video assets
        console.log('\n\n📂 CHECKING LOCAL VIDEO ASSETS');
        console.log('-'.repeat(80));

        const assetPage = await context.newPage();
        await assetPage.goto('http://127.0.0.1:8093/assets/videos/', { waitUntil: 'networkidle' }).catch(() => {
            console.log('Directory listing not available');
        });

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    } finally {
        await browser.close();
        console.log('\n✅ Analysis complete\n');
    }
}

analyzeDTGVideos().catch(console.error);
