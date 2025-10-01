const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('\n🔍 ANALYZING PRODUCTION SITE: https://dtg.glec.io/\n');
    console.log('='.repeat(80));

    await page.goto('https://dtg.glec.io/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // 1. Analyze Navigation Structure
    console.log('\n📋 NAVIGATION STRUCTURE\n');
    console.log('='.repeat(80));

    const navStructure = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        if (!nav) return null;

        const menuItems = [];
        const links = nav.querySelectorAll('a, button');

        links.forEach((link, idx) => {
            const text = link.textContent.trim();
            const href = link.getAttribute('href') || '';
            const hasDropdown = link.parentElement?.querySelector('.dropdown, [class*="dropdown"]');

            menuItems.push({
                index: idx + 1,
                text,
                href,
                hasDropdown: !!hasDropdown,
                className: link.className,
                tagName: link.tagName
            });
        });

        return {
            navHTML: nav.outerHTML,
            menuItems
        };
    });

    if (navStructure) {
        console.log('Navigation Menu Items:');
        navStructure.menuItems.forEach(item => {
            console.log(`${item.index}. "${item.text}" → ${item.href || 'no-href'}`);
            console.log(`   Tag: ${item.tagName}, Dropdown: ${item.hasDropdown ? 'YES' : 'NO'}`);
        });
    }

    // 2. Analyze All Sections
    console.log('\n\n📦 PAGE SECTIONS\n');
    console.log('='.repeat(80));

    const sections = await page.evaluate(() => {
        const allSections = document.querySelectorAll('section, [class*="section"]');
        return Array.from(allSections).map((section, idx) => {
            const id = section.id || 'no-id';
            const className = section.className;
            const heading = section.querySelector('h1, h2, h3, h4');
            const headingText = heading ? heading.textContent.trim() : 'No heading';
            const bounds = section.getBoundingClientRect();

            return {
                index: idx + 1,
                id,
                className,
                headingText,
                height: Math.round(bounds.height),
                visible: bounds.height > 0
            };
        });
    });

    sections.forEach(section => {
        console.log(`${section.index}. ID: #${section.id}`);
        console.log(`   Class: ${section.className}`);
        console.log(`   Heading: "${section.headingText}"`);
        console.log(`   Height: ${section.height}px, Visible: ${section.visible}`);
        console.log('');
    });

    // 3. Analyze CSS Styles
    console.log('\n🎨 CSS ANALYSIS\n');
    console.log('='.repeat(80));

    const cssAnalysis = await page.evaluate(() => {
        const styles = window.getComputedStyle(document.body);
        const nav = document.querySelector('nav');
        const navStyles = nav ? window.getComputedStyle(nav) : null;

        return {
            body: {
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                fontFamily: styles.fontFamily,
                fontSize: styles.fontSize
            },
            nav: navStyles ? {
                backgroundColor: navStyles.backgroundColor,
                position: navStyles.position,
                height: navStyles.height,
                zIndex: navStyles.zIndex
            } : null
        };
    });

    console.log('Body Styles:');
    console.log(JSON.stringify(cssAnalysis.body, null, 2));
    console.log('\nNav Styles:');
    console.log(JSON.stringify(cssAnalysis.nav, null, 2));

    // 4. Check for Dropdown Menus
    console.log('\n\n📂 DROPDOWN MENUS ANALYSIS\n');
    console.log('='.repeat(80));

    const dropdowns = await page.evaluate(() => {
        const dropdownElements = document.querySelectorAll('[class*="dropdown"], [class*="submenu"], [class*="menu"]');
        return Array.from(dropdownElements).map(el => ({
            className: el.className,
            tagName: el.tagName,
            childCount: el.children.length,
            innerHTML: el.innerHTML.substring(0, 200)
        }));
    });

    if (dropdowns.length > 0) {
        console.log(`Found ${dropdowns.length} potential dropdown elements:`);
        dropdowns.forEach((dd, idx) => {
            console.log(`${idx + 1}. ${dd.tagName}.${dd.className} (${dd.childCount} children)`);
        });
    } else {
        console.log('No dropdown menus found - navigation is likely flat/simple');
    }

    // 5. Extract Complete Navigation HTML
    console.log('\n\n📝 EXTRACTING NAVIGATION HTML\n');
    console.log('='.repeat(80));

    if (navStructure) {
        fs.writeFileSync('production-nav.html', navStructure.navHTML);
        console.log('✓ Saved to: production-nav.html');
    }

    // 6. Screenshot comparison points
    console.log('\n\n📸 TAKING SCREENSHOTS FOR COMPARISON\n');
    console.log('='.repeat(80));

    await page.screenshot({
        path: 'screenshots/production-full-page.png',
        fullPage: true
    });
    console.log('✓ Full page screenshot saved');

    // Screenshot navigation
    const navElement = await page.$('nav');
    if (navElement) {
        await navElement.screenshot({ path: 'screenshots/production-nav.png' });
        console.log('✓ Navigation screenshot saved');
    }

    // Screenshot each section
    for (let i = 0; i < Math.min(sections.length, 5); i++) {
        const section = sections[i];
        if (section.id && section.id !== 'no-id') {
            try {
                const sectionElement = await page.$(`#${section.id}`);
                if (sectionElement) {
                    await sectionElement.screenshot({
                        path: `screenshots/production-section-${section.id}.png`
                    });
                    console.log(`✓ Section screenshot saved: ${section.id}`);
                }
            } catch (e) {
                console.log(`✗ Could not screenshot section: ${section.id}`);
            }
        }
    }

    // 7. Extract all text content for comparison
    console.log('\n\n📄 EXTRACTING TEXT CONTENT\n');
    console.log('='.repeat(80));

    const textContent = await page.evaluate(() => {
        const sections = document.querySelectorAll('section, [class*="section"]');
        const content = {};

        sections.forEach((section, idx) => {
            const id = section.id || `section-${idx}`;
            content[id] = {
                heading: section.querySelector('h1, h2, h3, h4')?.textContent.trim() || '',
                paragraphs: Array.from(section.querySelectorAll('p')).map(p => p.textContent.trim()),
                buttons: Array.from(section.querySelectorAll('button, a.btn, [class*="btn"]')).map(btn => ({
                    text: btn.textContent.trim(),
                    href: btn.getAttribute('href') || ''
                }))
            };
        });

        return content;
    });

    fs.writeFileSync('production-content.json', JSON.stringify(textContent, null, 2));
    console.log('✓ Content saved to: production-content.json');

    // 8. Summary Report
    console.log('\n\n📊 ANALYSIS SUMMARY\n');
    console.log('='.repeat(80));
    console.log(`Total Sections: ${sections.length}`);
    console.log(`Navigation Items: ${navStructure?.menuItems.length || 0}`);
    console.log(`Dropdown Menus: ${dropdowns.length}`);
    console.log(`\nFiles Generated:`);
    console.log(`- production-nav.html`);
    console.log(`- production-content.json`);
    console.log(`- screenshots/production-*.png`);

    console.log('\n\n✅ ANALYSIS COMPLETE\n');
    console.log('='.repeat(80));

    await page.waitForTimeout(3000);
    await browser.close();
})();
