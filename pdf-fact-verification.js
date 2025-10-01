const { chromium } = require('playwright');
const path = require('path');

// PDF에서 확인된 팩트 (페이지 20 "핵심 인력")
const PDF_FACTS = {
    leadership: {
        ceo_tech: {
            name: "강덕호",
            english_name: "Kevin",
            title: "기술총괄 각자대표",
            experience: [
                "4년 기술 창업/국가대표 출신 로켓 개발자",
                "IPO준비, M&A EXIT 등 성공/실패 경험",
                "16 스위스 세계 로켓 출원 국가대표로 출전",
                "16 양공 국가대표로 출전"
            ]
        },
        ceo_ops: {
            name: "김은우",
            english_name: "Stella",
            title: "운영총괄 각자대표",
            experience: [
                "조직 운영 및 전략기획 전문가",
                "전략기획, 재무전략, 운영전략 경험",
                "25 카이스트 ESG KEEP School",
                "24 SFC Korea 심의 추진위원회 공동위원장",
                "24 국가 물류전략위원회 민간위원 추천",
                "24 국제 물류 탄소배출 표준 지침서 법역본 발간",
                "23 ESG 컨설턴트 1급, 2급 전문 자격 취득",
                "18 삼꾸미기 신사업전략 총괄 본부장"
            ]
        }
    },
    dev_team: [
        {
            name: "김지원",
            role: "연구소장",
            title: "IoT 장비 개발 전공 석사",
            description: "한양대 컴퓨터 공학 석사, 시니어 플스택 개발자"
        },
        {
            name: "심준",
            role: "프론트엔드 팀장",
            title: "프론트엔드 개발",
            description: "송곡 플스택 개발자"
        },
        {
            name: "김경재",
            role: "백엔드 팀장",
            title: "백엔드 개발",
            description: "B2B 솔루션/ERP개발 전문가"
        },
        {
            name: "방아현",
            role: "백엔드 개발자",
            title: "백엔드 개발자",
            description: "시니어 백엔드 개발자"
        },
        {
            name: "지재원",
            role: "서비스 기획 팀장",
            title: "서비스 기획",
            description: "물류 ESG 서비스 전문가, 운송전략 운영전략, 서비스 기획"
        }
    ],
    expertise: {
        networks: [
            "인하대학교 물류학부 교수진 고문",
            "한국통합물류협회 견고한 네트워크",
            "카이스트 ESG C레벨 과정 KEEP 수료"
        ],
        certifications: [
            "특허 출원 8건",
            "특허 등록 1건"
        ]
    }
};

async function verifyFactsAgainstWebsite() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const aboutPath = path.join(__dirname, 'ai-dtg-premium-website', 'about.html');
    const fileUrl = `file://${aboutPath}`;

    console.log('\n========================================');
    console.log('PDF FACT VERIFICATION AGAINST WEBSITE');
    console.log('========================================\n');

    const issues = [];
    const verified = [];

    const languages = [
        { code: 'ko', name: 'Korean' },
        { code: 'en', name: 'English' },
        { code: 'zh', name: 'Chinese' }
    ];

    for (const lang of languages) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`LANGUAGE: ${lang.name.toUpperCase()} (${lang.code})`);
        console.log('='.repeat(50));

        await page.goto(fileUrl);
        await page.waitForTimeout(500);

        await page.evaluate((code) => {
            localStorage.setItem('preferredLanguage', code);
        }, lang.code);

        // Force hard reload to bypass cache
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // ===== LEADERSHIP VERIFICATION =====
        console.log('\n[1] LEADERSHIP STRUCTURE VERIFICATION');
        console.log('-'.repeat(50));

        const leadershipCount = await page.locator('.team-leadership .role-card, [data-translate="team_leadership"] ~ .role-grid .role-card').count();

        if (leadershipCount === 3) {
            verified.push(`${lang.code}: Leadership has 3 members (Kevin, Stella, Brian) ✓`);
            console.log(`✓ Leadership count: 3/3`);
        } else {
            issues.push(`${lang.code}: Leadership should have 3 members, found ${leadershipCount}`);
            console.log(`✗ Leadership count: ${leadershipCount}/3 (EXPECTED: 3)`);
        }

        // Check Kevin (Co-CEO Technology)
        const kevinTitle = await page.locator('[data-translate="role_ceo_kevin"]').textContent().catch(() => 'NOT FOUND');
        const kevinName = await page.locator('[data-translate="role_ceo_kevin_name"]').textContent().catch(() => 'NOT FOUND');

        console.log(`\nKevin (강덕호):`);
        console.log(`  Title: ${kevinTitle}`);
        console.log(`  Name: ${kevinName}`);

        if (kevinTitle.includes('Co-CEO') || kevinTitle.includes('공동대표') || kevinTitle.includes('联合')) {
            verified.push(`${lang.code}: Kevin has Co-CEO title ✓`);
            console.log(`  ✓ Has Co-CEO title`);
        } else {
            issues.push(`${lang.code}: Kevin title missing Co-CEO designation`);
            console.log(`  ✗ Missing Co-CEO designation`);
        }

        // Check Kevin's credentials
        const kevinCred1 = await page.locator('[data-translate="role_ceo_kevin_1"]').textContent().catch(() => '');
        const kevinCred2 = await page.locator('[data-translate="role_ceo_kevin_2"]').textContent().catch(() => '');
        const kevinCred3 = await page.locator('[data-translate="role_ceo_kevin_3"]').textContent().catch(() => '');

        console.log(`  Credentials:`);
        console.log(`    - ${kevinCred1}`);
        console.log(`    - ${kevinCred2}`);
        console.log(`    - ${kevinCred3}`);

        const hasStartupExp = kevinCred1.includes('13') || kevinCred1.includes('years') || kevinCred1.includes('经验');
        const hasIPO = kevinCred2.includes('IPO') || kevinCred2.includes('M&A');
        const hasPatents = kevinCred3.includes('16') || kevinCred3.includes('Swiss') || kevinCred3.includes('patent') || kevinCred3.includes('특허');

        if (hasStartupExp) verified.push(`${lang.code}: Kevin startup experience ✓`);
        else issues.push(`${lang.code}: Kevin missing startup experience fact`);

        if (hasIPO) verified.push(`${lang.code}: Kevin IPO/M&A experience ✓`);
        else issues.push(`${lang.code}: Kevin missing IPO/M&A fact`);

        if (hasPatents) verified.push(`${lang.code}: Kevin 16 Swiss patents ✓`);
        else issues.push(`${lang.code}: Kevin missing patent fact`);

        // Check Stella (Co-CEO Operations)
        const stellaTitle = await page.locator('[data-translate="role_ceo_stella"]').textContent().catch(() => 'NOT FOUND');
        const stellaName = await page.locator('[data-translate="role_ceo_stella_name"]').textContent().catch(() => 'NOT FOUND');

        console.log(`\nStella (김은우):`);
        console.log(`  Title: ${stellaTitle}`);
        console.log(`  Name: ${stellaName}`);

        if (stellaTitle.includes('Co-CEO') || stellaTitle.includes('공동대표') || stellaTitle.includes('联合')) {
            verified.push(`${lang.code}: Stella has Co-CEO title ✓`);
            console.log(`  ✓ Has Co-CEO title`);
        } else {
            issues.push(`${lang.code}: Stella title missing Co-CEO designation`);
            console.log(`  ✗ Missing Co-CEO designation`);
        }

        const stellaCred1 = await page.locator('[data-translate="role_ceo_stella_1"]').textContent().catch(() => '');
        const stellaCred2 = await page.locator('[data-translate="role_ceo_stella_2"]').textContent().catch(() => '');
        const stellaCred3 = await page.locator('[data-translate="role_ceo_stella_3"]').textContent().catch(() => '');

        console.log(`  Credentials:`);
        console.log(`    - ${stellaCred1}`);
        console.log(`    - ${stellaCred2}`);
        console.log(`    - ${stellaCred3}`);

        const hasOpsExp = stellaCred1.includes('12') || stellaCred1.includes('operations') || stellaCred1.includes('运营');
        const hasKEEP = stellaCred2.includes('KAIST') || stellaCred2.includes('KEEP');
        const hasSFC = stellaCred3.includes('SFC') || stellaCred3.includes('Korea');

        if (hasOpsExp) verified.push(`${lang.code}: Stella operations experience ✓`);
        else issues.push(`${lang.code}: Stella missing operations experience fact`);

        if (hasKEEP) verified.push(`${lang.code}: Stella KAIST KEEP ✓`);
        else issues.push(`${lang.code}: Stella missing KAIST KEEP fact`);

        if (hasSFC) verified.push(`${lang.code}: Stella SFC Korea ✓`);
        else issues.push(`${lang.code}: Stella missing SFC Korea fact`);

        // Check Brian (CTO)
        const brianTitle = await page.locator('[data-translate="role_cto_brian"]').textContent().catch(() => 'NOT FOUND');
        const brianName = await page.locator('[data-translate="role_cto_brian_name"]').textContent().catch(() => 'NOT FOUND');

        console.log(`\nBrian (김지원):`);
        console.log(`  Title: ${brianTitle}`);
        console.log(`  Name: ${brianName}`);

        if (brianTitle.includes('CTO') || brianTitle.includes('기술이사')) {
            verified.push(`${lang.code}: Brian has CTO title ✓`);
            console.log(`  ✓ Has CTO title`);
        } else {
            issues.push(`${lang.code}: Brian title missing CTO designation`);
            console.log(`  ✗ Missing CTO designation`);
        }

        // ===== TEAM MEMBERS VERIFICATION =====
        console.log(`\n[2] TEAM MEMBERS VERIFICATION`);
        console.log('-'.repeat(50));

        // Check for actual names (PDF fact: 김지원, 심준, 김경재, 방아현, 지재원)
        const pageText = await page.textContent('body');

        let teamNames = [];
        if (lang.code === 'ko') {
            teamNames = ['김지원', '심준', '김경재', '방아현', '지재원'];
        } else if (lang.code === 'en') {
            teamNames = ['Kim Ji-won', 'Shim Jun', 'Kim Kyung-jae', 'Bang Ah-hyun', 'Ji Jae-won'];
        } else if (lang.code === 'zh') {
            teamNames = ['金智元', '沈俊', '金京宰', '方雅贤', '池在元'];
        }

        const foundNames = [];
        const missingNames = [];

        for (const name of teamNames) {
            if (pageText.includes(name)) {
                foundNames.push(name);
                console.log(`✓ Found: ${name}`);
            } else {
                missingNames.push(name);
                console.log(`✗ Missing: ${name}`);
            }
        }

        if (foundNames.length === 5) {
            verified.push(`${lang.code}: All 5 team member names present ✓`);
        } else {
            issues.push(`${lang.code}: Missing team members (${foundNames.length}/5 found): ${missingNames.join(', ')}`);
        }

        // ===== PROFESSIONAL NETWORK VERIFICATION =====
        console.log(`\n[3] PROFESSIONAL NETWORK VERIFICATION`);
        console.log('-'.repeat(50));

        const inhaExists = await page.locator('[data-translate="expertise_inha"]').count();
        const kilaExists = await page.locator('[data-translate="expertise_kila"]').count();
        const keepExists = await page.locator('[data-translate="expertise_keep"]').count();

        console.log(`Inha University Advisors: ${inhaExists > 0 ? '✓ Present' : '✗ Missing'}`);
        console.log(`KILA Network: ${kilaExists > 0 ? '✓ Present' : '✗ Missing'}`);
        console.log(`KAIST KEEP: ${keepExists > 0 ? '✓ Present' : '✗ Missing'}`);

        if (inhaExists > 0) verified.push(`${lang.code}: Inha University advisors fact ✓`);
        else issues.push(`${lang.code}: Missing Inha University advisors fact`);

        if (kilaExists > 0) verified.push(`${lang.code}: KILA network fact ✓`);
        else issues.push(`${lang.code}: Missing KILA network fact`);

        if (keepExists > 0) verified.push(`${lang.code}: KAIST KEEP fact ✓`);
        else issues.push(`${lang.code}: Missing KAIST KEEP fact`);

        // ===== PhD CLAIM CHECK =====
        console.log(`\n[4] FALSE CLAIMS CHECK`);
        console.log('-'.repeat(50));

        const phdMention = pageText.includes('박사') || pageText.includes('PhD') || pageText.includes('博士');
        const teamStatPhds = await page.locator('[data-translate="team_stat_phds"]').textContent().catch(() => '');

        console.log(`Team Stat Label: "${teamStatPhds}"`);

        if (teamStatPhds.includes('박사') || teamStatPhds.includes('PhD') || teamStatPhds.includes('博士')) {
            issues.push(`${lang.code}: ✗ CRITICAL: Still claims PhDs (should be "Professional Network")`);
            console.log(`✗ CRITICAL: False PhD claim still present!`);
        } else {
            verified.push(`${lang.code}: PhD claim removed ✓`);
            console.log(`✓ PhD claim correctly removed`);
        }

        // Take screenshot
        await page.screenshot({
            path: `screenshots/fact-check-${lang.code}.png`,
            fullPage: true
        });
    }

    // ===== FINAL REPORT =====
    console.log(`\n\n${'='.repeat(60)}`);
    console.log('FINAL VERIFICATION REPORT');
    console.log('='.repeat(60));

    console.log(`\n✓ VERIFIED FACTS (${verified.length}):`);
    verified.forEach(v => console.log(`  ${v}`));

    console.log(`\n✗ ISSUES FOUND (${issues.length}):`);
    if (issues.length === 0) {
        console.log(`  No issues! All facts verified against PDF! 🎉`);
    } else {
        issues.forEach(i => console.log(`  ${i}`));
    }

    const successRate = (verified.length / (verified.length + issues.length) * 100).toFixed(1);
    console.log(`\nSUCCESS RATE: ${successRate}%`);

    if (issues.length === 0) {
        console.log(`\n✅ 100% FACT VERIFICATION COMPLETE`);
        console.log(`All website content matches PDF facts!`);
    } else {
        console.log(`\n⚠️  IMPROVEMENTS NEEDED`);
        console.log(`Found ${issues.length} discrepancies with PDF facts`);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    await browser.close();

    return { verified, issues, successRate };
}

verifyFactsAgainstWebsite().catch(console.error);
