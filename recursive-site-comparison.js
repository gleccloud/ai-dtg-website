const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });

    console.log('\n🔄 RECURSIVE SITE COMPARISON & IMPROVEMENT\n');
    console.log('='.repeat(80));

    // Open both sites
    const productionPage = await browser.newPage();
    const localPage = await browser.newPage();

    await productionPage.goto('https://dtg.glec.io/', { waitUntil: 'networkidle' });
    await localPage.goto('http://127.0.0.1:8093/index.html', { waitUntil: 'networkidle' });

    await productionPage.waitForTimeout(2000);
    await localPage.waitForTimeout(2000);

    const issues = [];
    const recommendations = [];

    // 1. Compare Navigation Structure
    console.log('\n📋 COMPARING NAVIGATION\n');
    console.log('='.repeat(80));

    const prodNav = await productionPage.evaluate(() => {
        const navLinks = Array.from(document.querySelectorAll('nav a'));
        return navLinks.map(link => ({
            text: link.textContent.trim(),
            href: link.getAttribute('href'),
            classes: link.className
        }));
    });

    const localNav = await localPage.evaluate(() => {
        const navLinks = Array.from(document.querySelectorAll('nav a'));
        return navLinks.map(link => ({
            text: link.textContent.trim(),
            href: link.getAttribute('href'),
            classes: link.className
        }));
    });

    console.log('Production Nav Items:', prodNav.length);
    prodNav.forEach((item, idx) => {
        console.log(`  ${idx + 1}. "${item.text}" → ${item.href}`);
    });

    console.log('\nLocal Nav Items:', localNav.length);
    localNav.forEach((item, idx) => {
        console.log(`  ${idx + 1}. "${item.text}" → ${item.href}`);
    });

    // Check for missing navigation items
    const prodNavTexts = prodNav.map(n => n.text);
    const localNavTexts = localNav.map(n => n.text);

    const missingInLocal = prodNavTexts.filter(text => !localNavTexts.includes(text));
    const extraInLocal = localNavTexts.filter(text => !prodNavTexts.includes(text));

    if (missingInLocal.length > 0) {
        issues.push({
            type: 'NAVIGATION',
            severity: 'HIGH',
            issue: `Missing navigation items in local: ${missingInLocal.join(', ')}`
        });
        console.log('\n❌ Missing in local:', missingInLocal);
    }

    if (extraInLocal.length > 0) {
        recommendations.push({
            type: 'NAVIGATION',
            recommendation: `Extra items in local (consider organizing): ${extraInLocal.join(', ')}`
        });
        console.log('\n⚠️  Extra in local:', extraInLocal);
    }

    // 2. Compare Section Structure
    console.log('\n\n📦 COMPARING SECTIONS\n');
    console.log('='.repeat(80));

    const prodSections = await productionPage.evaluate(() => {
        const sections = document.querySelectorAll('section[id]');
        return Array.from(sections).map(section => ({
            id: section.id,
            className: section.className,
            heading: section.querySelector('h1, h2, h3')?.textContent.trim() || '',
            height: section.getBoundingClientRect().height
        }));
    });

    const localSections = await localPage.evaluate(() => {
        const sections = document.querySelectorAll('section[id]');
        return Array.from(sections).map(section => ({
            id: section.id,
            className: section.className,
            heading: section.querySelector('h1, h2, h3')?.textContent.trim() || '',
            height: section.getBoundingClientRect().height
        }));
    });

    console.log('Production Sections:', prodSections.length);
    prodSections.forEach((section, idx) => {
        console.log(`  ${idx + 1}. #${section.id} - "${section.heading}"`);
    });

    console.log('\nLocal Sections:', localSections.length);
    localSections.forEach((section, idx) => {
        console.log(`  ${idx + 1}. #${section.id} - "${section.heading}"`);
    });

    const prodSectionIds = prodSections.map(s => s.id);
    const localSectionIds = localSections.map(s => s.id);

    const missingSections = prodSectionIds.filter(id => !localSectionIds.includes(id));
    const extraSections = localSectionIds.filter(id => !prodSectionIds.includes(id));

    if (extraSections.length > 0) {
        recommendations.push({
            type: 'ARCHITECTURE',
            recommendation: `New sections in local that should be organized under menus: ${extraSections.join(', ')}`
        });
        console.log('\n📌 New sections in local (need menu organization):', extraSections);
    }

    // 3. Visual Comparison
    console.log('\n\n📸 VISUAL COMPARISON\n');
    console.log('='.repeat(80));

    // Take screenshots of matching sections
    for (const prodSection of prodSections) {
        if (localSectionIds.includes(prodSection.id)) {
            try {
                const prodElement = await productionPage.$(`#${prodSection.id}`);
                const localElement = await localPage.$(`#${prodSection.id}`);

                if (prodElement && localElement) {
                    await prodElement.screenshot({
                        path: `screenshots/prod-${prodSection.id}.png`
                    });
                    await localElement.screenshot({
                        path: `screenshots/local-${prodSection.id}.png`
                    });
                    console.log(`✓ Compared #${prodSection.id}`);
                }
            } catch (e) {
                console.log(`✗ Could not compare #${prodSection.id}:`, e.message);
            }
        }
    }

    // 4. CSS Comparison
    console.log('\n\n🎨 CSS COMPARISON\n');
    console.log('='.repeat(80));

    const prodStyles = await productionPage.evaluate(() => {
        const body = document.body;
        const nav = document.querySelector('nav');
        const computedBody = window.getComputedStyle(body);
        const computedNav = nav ? window.getComputedStyle(nav) : null;

        return {
            body: {
                background: computedBody.backgroundColor,
                color: computedBody.color,
                font: computedBody.fontFamily
            },
            nav: computedNav ? {
                background: computedNav.backgroundColor,
                position: computedNav.position,
                height: computedNav.height,
                zIndex: computedNav.zIndex
            } : null
        };
    });

    const localStyles = await localPage.evaluate(() => {
        const body = document.body;
        const nav = document.querySelector('nav');
        const computedBody = window.getComputedStyle(body);
        const computedNav = nav ? window.getComputedStyle(nav) : null;

        return {
            body: {
                background: computedBody.backgroundColor,
                color: computedBody.color,
                font: computedBody.fontFamily
            },
            nav: computedNav ? {
                background: computedNav.backgroundColor,
                position: computedNav.position,
                height: computedNav.height,
                zIndex: computedNav.zIndex
            } : null
        };
    });

    console.log('Production Styles:');
    console.log(JSON.stringify(prodStyles, null, 2));
    console.log('\nLocal Styles:');
    console.log(JSON.stringify(localStyles, null, 2));

    // Check for style differences
    if (prodStyles.body.font !== localStyles.body.font) {
        issues.push({
            type: 'DESIGN',
            severity: 'MEDIUM',
            issue: `Font family mismatch - Production: ${prodStyles.body.font}, Local: ${localStyles.body.font}`
        });
    }

    // 5. Generate Improvement Recommendations
    console.log('\n\n💡 IMPROVEMENT RECOMMENDATIONS\n');
    console.log('='.repeat(80));

    // Recommend menu structure
    recommendations.push({
        type: 'MENU_STRUCTURE',
        recommendation: `Create "Our Solutions" dropdown menu with items:
  - AI Transformation (#transformation)
  - AI DTG (#ai-dtg)
  - AI Dashboard (#ai-dashboard)
  - Core Technology (#technology)`
    });

    recommendations.push({
        type: 'MENU_STRUCTURE',
        recommendation: `Create "Who We Are" dropdown menu with items:
  - Company Overview (#company-overview)
  - Team (#team)
  - Timeline (#timeline)
  - Certifications (#certifications)`
    });

    recommendations.push({
        type: 'MENU_STRUCTURE',
        recommendation: `Keep as standalone menu items:
  - Home (#home)
  - CES 2026 (#ces2026)
  - Contact (#cta)`
    });

    recommendations.forEach((rec, idx) => {
        console.log(`${idx + 1}. [${rec.type}] ${rec.recommendation}`);
    });

    // 6. Save Report
    const report = {
        timestamp: new Date().toISOString(),
        production: {
            url: 'https://dtg.glec.io/',
            sections: prodSections.length,
            navItems: prodNav.length
        },
        local: {
            url: 'http://127.0.0.1:8093/index.html',
            sections: localSections.length,
            navItems: localNav.length
        },
        issues,
        recommendations,
        sectionComparison: {
            prodSections: prodSectionIds,
            localSections: localSectionIds,
            missing: missingSections,
            extra: extraSections
        }
    };

    fs.writeFileSync('comparison-report.json', JSON.stringify(report, null, 2));
    console.log('\n\n✅ Report saved to: comparison-report.json');

    // 7. Summary
    console.log('\n\n📊 COMPARISON SUMMARY\n');
    console.log('='.repeat(80));
    console.log(`Issues Found: ${issues.length}`);
    console.log(`Recommendations: ${recommendations.length}`);
    console.log(`\nProduction: ${prodSections.length} sections, ${prodNav.length} nav items`);
    console.log(`Local: ${localSections.length} sections, ${localNav.length} nav items`);
    console.log(`\nExtra sections in local (need menu organization): ${extraSections.length}`);
    console.log(extraSections.join(', '));

    console.log('\n\n🎯 NEXT STEPS:\n');
    console.log('1. Create "Our Solutions" dropdown menu');
    console.log('2. Create "Who We Are" dropdown menu');
    console.log('3. Reorganize navigation to match production structure');
    console.log('4. Add dropdown menu interactions with hover/click');
    console.log('5. Ensure design consistency across all sections');
    console.log('6. Test multilingual support for new menu structure');

    await productionPage.waitForTimeout(3000);
    await browser.close();
})();
