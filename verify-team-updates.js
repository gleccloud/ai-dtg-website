const { chromium } = require('playwright');
const path = require('path');

async function verifyTeamUpdates() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const aboutPath = path.join(__dirname, 'ai-dtg-premium-website', 'about.html');
    const fileUrl = `file://${aboutPath}`;

    console.log('\n=== TEAM SECTION FACT-BASED VERIFICATION ===\n');

    const languages = [
        { code: 'ko', name: 'Korean' }
    ];

    for (const lang of languages) {
        console.log(`\n--- Testing ${lang.name} (${lang.code}) ---`);

        await page.goto(fileUrl);
        await page.waitForTimeout(500);

        // Set language
        await page.evaluate((code) => {
            localStorage.setItem('preferredLanguage', code);
            location.reload();
        }, lang.code);

        await page.waitForTimeout(1500);

        // Check Leadership Section
        const leadershipCards = await page.locator('.team-leadership .role-card').count();
        console.log(`\nLeadership Cards: ${leadershipCards}/3 (Should be 3: Kevin, Stella, Brian)`);

        // Check for Co-CEO structure
        const kevinTitle = await page.locator('[data-translate="role_ceo_kevin"]').textContent();
        const stellaTitle = await page.locator('[data-translate="role_ceo_stella"]').textContent();
        const brianTitle = await page.locator('[data-translate="role_cto_brian"]').textContent();

        console.log(`\nLeadership Titles:`);
        console.log(`  Kevin: "${kevinTitle}"`);
        console.log(`  Stella: "${stellaTitle}"`);
        console.log(`  Brian: "${brianTitle}"`);

        // Check for names
        const kevinName = await page.locator('[data-translate="role_ceo_kevin_name"]').textContent();
        const stellaName = await page.locator('[data-translate="role_ceo_stella_name"]').textContent();
        const brianName = await page.locator('[data-translate="role_cto_brian_name"]').textContent();

        console.log(`\nLeadership Names:`);
        console.log(`  ${kevinName}`);
        console.log(`  ${stellaName}`);
        console.log(`  ${brianName}`);

        // Check for credentials
        const kevinCred1 = await page.locator('[data-translate="role_ceo_kevin_1"]').textContent();
        const stellaCred1 = await page.locator('[data-translate="role_ceo_stella_1"]').textContent();
        const brianCred1 = await page.locator('[data-translate="role_cto_brian_1"]').textContent();

        console.log(`\nCredentials Sample:`);
        console.log(`  Kevin: ${kevinCred1}`);
        console.log(`  Stella: ${stellaCred1}`);
        console.log(`  Brian: ${brianCred1}`);

        // Check R&D Team
        const rdCards = await page.locator('.team-rd .role-card').count();
        console.log(`\nR&D Team Cards: ${rdCards}/3`);

        const rdMember1 = await page.locator('.team-rd .role-card').nth(0).locator('.role-name').textContent();
        const rdMember2 = await page.locator('.team-rd .role-card').nth(1).locator('.role-name').textContent();
        const rdMember3 = await page.locator('.team-rd .role-card').nth(2).locator('.role-name').textContent();

        console.log(`\nR&D Team Members:`);
        console.log(`  1. ${rdMember1}`);
        console.log(`  2. ${rdMember2}`);
        console.log(`  3. ${rdMember3}`);

        // Check Additional Team
        const additionalCards = await page.locator('.team-additional .role-card').count();
        console.log(`\nAdditional Team Cards: ${additionalCards}/2`);

        if (additionalCards > 0) {
            const addMember1 = await page.locator('.team-additional .role-card').nth(0).locator('.role-name').textContent();
            const addMember2 = await page.locator('.team-additional .role-card').nth(1).locator('.role-name').textContent();

            console.log(`\nAdditional Team Members:`);
            console.log(`  1. ${addMember1}`);
            console.log(`  2. ${addMember2}`);
        }

        // Check Professional Network
        const expertiseTitle = await page.locator('[data-translate="team_expertise_title"]').textContent();
        console.log(`\nExpertise Section: "${expertiseTitle}"`);

        const inhaTag = await page.locator('[data-translate="expertise_inha"]').count();
        const kilaTag = await page.locator('[data-translate="expertise_kila"]').count();
        const keepTag = await page.locator('[data-translate="expertise_keep"]').count();

        console.log(`\nNetwork Tags:`);
        console.log(`  Inha University: ${inhaTag > 0 ? '✓' : '✗'}`);
        console.log(`  KILA Network: ${kilaTag > 0 ? '✓' : '✗'}`);
        console.log(`  KAIST KEEP: ${keepTag > 0 ? '✓' : '✗'}`);

        // Take screenshot
        const screenshotPath = `screenshots/team-factcheck-${lang.code}.png`;
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });
        console.log(`\nScreenshot saved: ${screenshotPath}`);
    }

    console.log('\n\n=== VERIFICATION COMPLETE ===\n');

    await browser.close();
}

verifyTeamUpdates().catch(console.error);
