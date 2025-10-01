const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('📊 TIMELINE LAYOUT ANALYSIS - Checking Year/Card Overlap\n');
    console.log('=' .repeat(80));

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: 'Korean (한국어)' },
        { code: 'zh', name: 'Chinese (中文)' }
    ];

    const results = [];

    for (const lang of languages) {
        console.log(`\n🌐 Testing ${lang.name} Version`);
        console.log('=' .repeat(80));

        await page.goto('http://localhost:8093/about.html');
        await page.waitForTimeout(1000);

        // Switch language if not English
        if (lang.code !== 'en') {
            await page.click('#languageButton, .language-button');
            await page.waitForTimeout(300);
            await page.click(`.language-option[data-lang="${lang.code}"]`);
            await page.waitForTimeout(1000);
            console.log(`✓ Switched to ${lang.name}`);
        }

        // Scroll to timeline section
        await page.evaluate(() => {
            document.querySelector('#timeline').scrollIntoView({ behavior: 'smooth' });
        });
        await page.waitForTimeout(1500);

        // Get all timeline items
        const timelineItems = await page.locator('.timeline-item').all();
        console.log(`\n📋 Found ${timelineItems.length} timeline items\n`);

        for (let i = 0; i < timelineItems.length; i++) {
            const item = timelineItems[i];

            // Get year element
            const yearEl = item.locator('.timeline-year');
            const yearBox = await yearEl.boundingBox();
            const yearText = await yearEl.textContent();

            // Get content element
            const contentEl = item.locator('.timeline-content');
            const contentBox = await contentEl.boundingBox();

            if (yearBox && contentBox) {
                // Check if year overlaps with content
                const yearRight = yearBox.x + yearBox.width;
                const yearLeft = yearBox.x;
                const contentRight = contentBox.x + contentBox.width;
                const contentLeft = contentBox.x;

                // Calculate overlap
                const horizontalOverlap = Math.max(0, Math.min(yearRight, contentRight) - Math.max(yearLeft, contentLeft));
                const verticalOverlap = Math.max(0, Math.min(yearBox.y + yearBox.height, contentBox.y + contentBox.height) - Math.max(yearBox.y, contentBox.y));

                const hasOverlap = horizontalOverlap > 0 && verticalOverlap > 0;

                // Determine card position (left or right)
                const isOddItem = (i % 2 === 0); // 0-indexed, so even index = odd nth-child
                const cardPosition = isOddItem ? 'RIGHT' : 'LEFT';

                // Calculate gaps
                const gapToYear = isOddItem
                    ? contentBox.x - yearRight  // Right-side card: gap from year's right edge
                    : yearLeft - (contentBox.x + contentBox.width); // Left-side card: gap from year's left edge

                console.log(`📅 ${yearText.trim()}:`);
                console.log(`   Year position: (${Math.round(yearBox.x)}, ${Math.round(yearBox.y)}) - ${Math.round(yearBox.width)}×${Math.round(yearBox.height)}px`);
                console.log(`   Card position: (${Math.round(contentBox.x)}, ${Math.round(contentBox.y)}) - ${Math.round(contentBox.width)}×${Math.round(contentBox.height)}px`);
                console.log(`   Card side: ${cardPosition}`);
                console.log(`   Gap to year: ${Math.round(gapToYear)}px`);
                console.log(`   Horizontal overlap: ${Math.round(horizontalOverlap)}px`);
                console.log(`   Vertical overlap: ${Math.round(verticalOverlap)}px`);
                console.log(`   ${hasOverlap ? '❌ OVERLAP DETECTED' : '✅ No overlap'}`);
                console.log('');

                results.push({
                    language: lang.name,
                    year: yearText.trim(),
                    cardPosition,
                    gapToYear: Math.round(gapToYear),
                    horizontalOverlap: Math.round(horizontalOverlap),
                    hasOverlap
                });
            }
        }

        // Take screenshot
        await page.screenshot({
            path: `screenshots/timeline-${lang.code}.png`,
            fullPage: false
        });
        console.log(`📸 Screenshot saved: screenshots/timeline-${lang.code}.png`);
    }

    // Summary report
    console.log('\n');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + ' '.repeat(25) + '📊 OVERLAP SUMMARY REPORT' + ' '.repeat(28) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    console.log('');

    const overlapCount = results.filter(r => r.hasOverlap).length;
    const totalCount = results.length;

    console.log(`Total timeline items checked: ${totalCount}`);
    console.log(`Items with overlap: ${overlapCount} (${Math.round(overlapCount/totalCount*100)}%)`);
    console.log(`Items without overlap: ${totalCount - overlapCount} (${Math.round((totalCount-overlapCount)/totalCount*100)}%)`);
    console.log('');

    if (overlapCount > 0) {
        console.log('❌ ISSUES FOUND:\n');
        results.filter(r => r.hasOverlap).forEach(r => {
            console.log(`   • ${r.language} - ${r.year} (${r.cardPosition} side): ${r.horizontalOverlap}px overlap, gap: ${r.gapToYear}px`);
        });
        console.log('');
        console.log('💡 RECOMMENDATIONS:');
        console.log('   - Increase margin-right for RIGHT-side cards (.timeline-item:nth-child(odd) .timeline-content)');
        console.log('   - Increase margin-left for LEFT-side cards (.timeline-item:nth-child(even) .timeline-content)');
        console.log('   - Current values appear to need +50-100px additional margin');
    } else {
        console.log('🎉 NO OVERLAPS DETECTED - All timeline items properly spaced!\n');
    }

    await browser.close();
    console.log('\n✅ Analysis complete');
})();
