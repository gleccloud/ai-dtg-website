const { chromium } = require('playwright');

async function finalVerification() {
    console.log('🎯 Starting FINAL comprehensive verification...\n');

    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const context = await browser.newContext();

    try {
        const page = await context.newPage();
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForLoadState('networkidle');

        const sections = [
            { id: 'company-overview', name: 'Company Overview', minChars: 200 },
            { id: 'solutions', name: 'Solutions', minChars: 300 },
            { id: 'certifications', name: 'Certifications', minChars: 200 },
            { id: 'timeline', name: 'Timeline', minChars: 300 },
            { id: 'tech-differentiation', name: 'Technical Differentiation', minChars: 400 },
            { id: 'team', name: 'Team', minChars: 300 }
        ];

        const results = { total: 0, passed: 0, issues: [] };

        console.log('='.repeat(70));
        console.log('🔍 Testing All Sections');
        console.log('='.repeat(70) + '\n');

        for (const section of sections) {
            results.total++;
            
            const element = await page.$(`#${section.id}`);
            if (!element) {
                results.issues.push({ section: section.name, issue: 'Not found' });
                console.log(`❌ ${section.name}: NOT FOUND`);
                continue;
            }

            await element.scrollIntoViewIfNeeded();
            await page.waitForTimeout(200);

            const text = await element.textContent();
            const length = text.trim().length;

            if (length < section.minChars) {
                results.issues.push({ section: section.name, issue: `Too short (${length}/${section.minChars})` });
                console.log(`⚠️  ${section.name}: SHORT (${length} chars)`);
            } else {
                results.passed++;
                console.log(`✅ ${section.name}: OK (${length} chars)`);
            }
        }

        await page.screenshot({
            path: '/Users/kevin/Downloads/AI-DTG Website/screenshots/final-check.png',
            fullPage: true
        });

        console.log('\n' + '='.repeat(70));
        console.log('📊 FINAL RESULTS');
        console.log('='.repeat(70));
        console.log(`Total: ${results.total} | Passed: ${results.passed} | Issues: ${results.issues.length}`);
        console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);

        if (results.issues.length === 0) {
            console.log('\n🎉 ALL SECTIONS PERFECT!');
        } else {
            console.log('\n⚠️  Issues:');
            results.issues.forEach(i => console.log(`   - ${i.section}: ${i.issue}`));
        }

        console.log('='.repeat(70));

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

finalVerification();
