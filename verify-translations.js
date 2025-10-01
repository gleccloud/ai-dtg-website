const { chromium } = require('playwright');

async function verifyTranslations() {
    console.log('🚀 Starting translation verification...\n');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const url = 'http://127.0.0.1:8093/index.html';

    try {
        // Navigate to the page
        await page.goto(url, { waitUntil: 'networkidle' });
        console.log('✅ Page loaded successfully\n');

        // Wait for page to be fully rendered
        await page.waitForTimeout(2000);

        // Test English (default)
        console.log('📝 Testing English translation...');
        const englishSections = await checkSections(page, 'English');

        // Test Korean
        console.log('\n📝 Testing Korean translation...');
        await switchLanguage(page, '한국어');
        await page.waitForTimeout(1000);
        const koreanSections = await checkSections(page, 'Korean');

        // Test Chinese
        console.log('\n📝 Testing Chinese translation...');
        await switchLanguage(page, '中文');
        await page.waitForTimeout(1000);
        const chineseSections = await checkSections(page, 'Chinese');

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 VERIFICATION SUMMARY');
        console.log('='.repeat(60));
        console.log(`English: ${englishSections.visible}/${englishSections.total} sections visible`);
        console.log(`Korean:  ${koreanSections.visible}/${koreanSections.total} sections visible`);
        console.log(`Chinese: ${chineseSections.visible}/${chineseSections.total} sections visible`);

        if (englishSections.visible === englishSections.total &&
            koreanSections.visible === koreanSections.total &&
            chineseSections.visible === chineseSections.total) {
            console.log('\n✅ All translations verified successfully!');
        } else {
            console.log('\n⚠️  Some sections are missing or not translated properly');
            console.log('\nMissing sections:');
            console.log('English:', englishSections.missing);
            console.log('Korean:', koreanSections.missing);
            console.log('Chinese:', chineseSections.missing);
        }

    } catch (error) {
        console.error('❌ Error during verification:', error.message);
    } finally {
        await browser.close();
    }
}

async function switchLanguage(page, language) {
    // Click language button
    await page.click('.language-button');
    await page.waitForTimeout(300);

    // Click the specific language option
    const languageOption = page.locator('.language-option', { hasText: language });
    await languageOption.click();
    await page.waitForTimeout(500);

    console.log(`  ✓ Switched to ${language}`);
}

async function checkSections(page, language) {
    const sections = [
        { id: 'company-overview', name: 'Company Overview' },
        { id: 'solutions', name: 'Solutions & Development Status' },
        { id: 'certifications', name: 'Government Support & Certifications' },
        { id: 'timeline', name: 'Development Timeline' },
        { id: 'tech-differentiation', name: 'Technical Differentiation' },
        { id: 'team', name: 'Team Composition' }
    ];

    let visible = 0;
    const missing = [];

    for (const section of sections) {
        const sectionElement = await page.$(`#${section.id}`);

        if (sectionElement) {
            const isVisible = await sectionElement.isVisible();

            if (isVisible) {
                // Check if content is translated (not empty and has text)
                const textContent = await sectionElement.textContent();
                const hasContent = textContent && textContent.trim().length > 100;

                if (hasContent) {
                    console.log(`  ✓ ${section.name}: Found and translated`);
                    visible++;
                } else {
                    console.log(`  ✗ ${section.name}: Found but empty`);
                    missing.push(section.name);
                }
            } else {
                console.log(`  ✗ ${section.name}: Found but not visible`);
                missing.push(section.name);
            }
        } else {
            console.log(`  ✗ ${section.name}: Not found`);
            missing.push(section.name);
        }
    }

    return { visible, total: sections.length, missing };
}

// Run verification
verifyTranslations();
