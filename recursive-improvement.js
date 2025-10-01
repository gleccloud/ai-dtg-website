const { chromium } = require('playwright');

async function recursiveImprovement() {
    console.log('🔄 Starting recursive improvement with Playwright...\n');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForLoadState('networkidle');
        console.log('✅ Page loaded\n');

        const languages = [
            { code: 'en', name: 'English', button: 'English' },
            { code: 'ko', name: 'Korean', button: '한국어' },
            { code: 'zh', name: 'Chinese', button: '中文' }
        ];

        const sections = [
            { id: 'company-overview', name: 'Company Overview', minLength: 200 },
            { id: 'solutions', name: 'Solutions', minLength: 300 },
            { id: 'certifications', name: 'Certifications', minLength: 200 },
            { id: 'timeline', name: 'Timeline', minLength: 300 },
            { id: 'tech-differentiation', name: 'Technical Differentiation', minLength: 400 },
            { id: 'team', name: 'Team', minLength: 300 }
        ];

        const issues = [];
        let totalTests = 0;
        let passedTests = 0;

        for (const lang of languages) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`📝 Testing ${lang.name} (${lang.code})`);
            console.log('='.repeat(60));

            // Switch language
            if (lang.code !== 'en') {
                // Click the language button directly
                try {
                    await page.click('.language-current');
                    await page.waitForTimeout(300);
                    await page.click(`.language-option[data-lang="${lang.code}"]`);
                    await page.waitForTimeout(800);
                    console.log(`✓ Switched to ${lang.name}\n`);
                } catch (error) {
                    console.log(`⚠️  Could not switch language: ${error.message}`);
                }
            }

            // Test each section
            for (const section of sections) {
                totalTests++;
                console.log(`Testing: ${section.name}...`);

                // Check if section exists
                const sectionElement = await page.$(`#${section.id}`);
                if (!sectionElement) {
                    issues.push({
                        language: lang.name,
                        section: section.name,
                        issue: 'Section not found in DOM',
                        severity: 'CRITICAL'
                    });
                    console.log(`  ❌ CRITICAL: Section not found`);
                    continue;
                }

                // Check visibility
                const isVisible = await sectionElement.isVisible();
                if (!isVisible) {
                    issues.push({
                        language: lang.name,
                        section: section.name,
                        issue: 'Section exists but not visible',
                        severity: 'HIGH'
                    });
                    console.log(`  ❌ HIGH: Not visible`);
                    continue;
                }

                // Check content length
                const textContent = await sectionElement.textContent();
                const contentLength = textContent.trim().length;

                if (contentLength < section.minLength) {
                    issues.push({
                        language: lang.name,
                        section: section.name,
                        issue: `Content too short (${contentLength} chars, expected ${section.minLength}+)`,
                        severity: 'MEDIUM'
                    });
                    console.log(`  ⚠️  MEDIUM: Content too short (${contentLength} chars)`);
                    continue;
                }

                // Check for translation placeholders or untranslated keys
                const hasPlaceholders = /data-translate|PLACEHOLDER|TODO|undefined|null/i.test(textContent);
                if (hasPlaceholders) {
                    issues.push({
                        language: lang.name,
                        section: section.name,
                        issue: 'Contains untranslated keys or placeholders',
                        severity: 'MEDIUM'
                    });
                    console.log(`  ⚠️  MEDIUM: Contains placeholders`);
                    continue;
                }

                // Check for broken images
                const images = await sectionElement.$$('img');
                for (let i = 0; i < images.length; i++) {
                    const naturalWidth = await images[i].evaluate(img => img.naturalWidth);
                    if (naturalWidth === 0) {
                        issues.push({
                            language: lang.name,
                            section: section.name,
                            issue: `Broken image found (index ${i})`,
                            severity: 'LOW'
                        });
                        console.log(`  ⚠️  LOW: Broken image at index ${i}`);
                    }
                }

                // Check for interactive elements (buttons, links)
                const buttons = await sectionElement.$$('button, a[href], .clickable');
                const buttonStates = [];
                for (const button of buttons) {
                    const isButtonVisible = await button.isVisible();
                    const isEnabled = await button.isEnabled();
                    if (!isButtonVisible || !isEnabled) {
                        buttonStates.push('inactive');
                    }
                }

                if (buttonStates.length > 0 && buttonStates.every(state => state === 'inactive')) {
                    issues.push({
                        language: lang.name,
                        section: section.name,
                        issue: 'All interactive elements are inactive',
                        severity: 'LOW'
                    });
                    console.log(`  ⚠️  LOW: Interactive elements inactive`);
                }

                // Scroll into view and check animations
                await sectionElement.scrollIntoViewIfNeeded();
                await page.waitForTimeout(300);

                // Check if section has proper styling
                const computedStyle = await sectionElement.evaluate(el => {
                    const style = window.getComputedStyle(el);
                    return {
                        display: style.display,
                        opacity: style.opacity,
                        visibility: style.visibility
                    };
                });

                if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || parseFloat(computedStyle.opacity) < 0.1) {
                    issues.push({
                        language: lang.name,
                        section: section.name,
                        issue: 'Section has visibility issues in CSS',
                        severity: 'HIGH'
                    });
                    console.log(`  ❌ HIGH: CSS visibility issues`);
                    continue;
                }

                passedTests++;
                console.log(`  ✅ PASSED (${contentLength} chars)`);
            }

            // Take screenshot for this language
            await page.screenshot({
                path: `/Users/kevin/Downloads/AI-DTG Website/screenshots/verification-${lang.code}.png`,
                fullPage: true
            });
            console.log(`📸 Screenshot saved: verification-${lang.code}.png`);
        }

        // Print summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 RECURSIVE IMPROVEMENT SUMMARY');
        console.log('='.repeat(60));
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests} (${((passedTests/totalTests)*100).toFixed(1)}%)`);
        console.log(`Failed: ${totalTests - passedTests}\n`);

        if (issues.length === 0) {
            console.log('✅ NO ISSUES FOUND - All sections working perfectly!\n');
        } else {
            console.log(`⚠️  ${issues.length} ISSUES FOUND:\n`);

            // Group by severity
            const critical = issues.filter(i => i.severity === 'CRITICAL');
            const high = issues.filter(i => i.severity === 'HIGH');
            const medium = issues.filter(i => i.severity === 'MEDIUM');
            const low = issues.filter(i => i.severity === 'LOW');

            if (critical.length > 0) {
                console.log('🔴 CRITICAL ISSUES:');
                critical.forEach(issue => {
                    console.log(`   - [${issue.language}] ${issue.section}: ${issue.issue}`);
                });
                console.log('');
            }

            if (high.length > 0) {
                console.log('🟠 HIGH PRIORITY:');
                high.forEach(issue => {
                    console.log(`   - [${issue.language}] ${issue.section}: ${issue.issue}`);
                });
                console.log('');
            }

            if (medium.length > 0) {
                console.log('🟡 MEDIUM PRIORITY:');
                medium.forEach(issue => {
                    console.log(`   - [${issue.language}] ${issue.section}: ${issue.issue}`);
                });
                console.log('');
            }

            if (low.length > 0) {
                console.log('🟢 LOW PRIORITY:');
                low.forEach(issue => {
                    console.log(`   - [${issue.language}] ${issue.section}: ${issue.issue}`);
                });
                console.log('');
            }
        }

        // Performance checks
        console.log('⚡ PERFORMANCE CHECKS:\n');

        // Check page load metrics
        const metrics = await page.evaluate(() => {
            const perfData = window.performance.timing;
            const navigationStart = perfData.navigationStart;
            return {
                pageLoad: perfData.loadEventEnd - navigationStart,
                domReady: perfData.domContentLoadedEventEnd - navigationStart,
                responseTime: perfData.responseEnd - perfData.requestStart
            };
        });

        console.log(`Page Load Time: ${metrics.pageLoad}ms`);
        console.log(`DOM Ready Time: ${metrics.domReady}ms`);
        console.log(`Response Time: ${metrics.responseTime}ms`);

        if (metrics.pageLoad > 3000) {
            console.log('⚠️  Page load time is high (>3s)');
        } else {
            console.log('✅ Page load time is optimal');
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ Recursive improvement check complete!');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.error('❌ Error during recursive improvement:', error);
    } finally {
        await browser.close();
    }
}

recursiveImprovement();
