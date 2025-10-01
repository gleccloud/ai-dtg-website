const { chromium } = require('playwright');

async function verifyImprovements() {
    console.log('🔍 CTO 모드 - 1차 개선 후 상태 검증 시작!');
    console.log('🎯 목표: 개선된 스타일 상태 확인 및 추가 개선점 발견');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 1단계: 개선된 복제본 접속
        console.log('\n📱 1단계: 개선된 복제본 접속...');
        await page.goto('http://localhost:8081', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 2단계: 개선된 상태 분석
        console.log('\n🔍 2단계: 개선된 상태 분석...');
        const improvedStatus = await page.evaluate(() => {
            // 스타일 상태 확인
            const computedStyles = window.getComputedStyle(document.body);
            const styles = {
                backgroundColor: computedStyles.backgroundColor,
                color: computedStyles.color,
                fontFamily: computedStyles.fontFamily,
                lineHeight: computedStyles.lineHeight,
                margin: computedStyles.margin,
                padding: computedStyles.padding
            };
            
            // 레이아웃 상태 확인
            const layout = {
                width: document.body.offsetWidth,
                height: document.body.offsetHeight,
                scrollWidth: document.body.scrollWidth,
                scrollHeight: document.body.scrollHeight
            };
            
            // 에셋 상태 확인
            const assets = {
                cssSheets: Array.from(document.styleSheets).length,
                jsScripts: Array.from(document.querySelectorAll('script[src]')).length,
                fonts: Array.from(document.fonts).length,
                images: Array.from(document.images).length
            };
            
            // 구조 상태 확인
            const structure = {
                elementorSections: document.querySelectorAll('[class*="elementor-section"]').length,
                elementorWidgets: document.querySelectorAll('[class*="elementor-widget"]').length,
                sections: document.querySelectorAll('section').length,
                headers: document.querySelectorAll('header').length,
                footers: document.querySelectorAll('footer').length
            };
            
            // 콘텐츠 상태 확인
            const content = {
                h1: document.querySelectorAll('h1').length,
                h2: document.querySelectorAll('h2').length,
                h3: document.querySelectorAll('h3').length,
                h4: document.querySelectorAll('h4').length,
                p: document.querySelectorAll('p').length,
                images: document.querySelectorAll('img').length,
                videos: document.querySelectorAll('video').length
            };
            
            return {
                styles,
                layout,
                assets,
                structure,
                content
            };
        });
        
        console.log('📊 개선된 상태 분석 결과:');
        console.log('\n🎨 스타일 상태:');
        console.log(`   - Background color: ${improvedStatus.styles.backgroundColor}`);
        console.log(`   - Text color: ${improvedStatus.styles.color}`);
        console.log(`   - Font family: ${improvedStatus.styles.fontFamily}`);
        console.log(`   - Line height: ${improvedStatus.styles.lineHeight}`);
        console.log(`   - Margin: ${improvedStatus.styles.margin}`);
        console.log(`   - Padding: ${improvedStatus.styles.padding}`);
        
        console.log('\n📐 레이아웃 상태:');
        console.log(`   - Width: ${improvedStatus.layout.width}`);
        console.log(`   - Height: ${improvedStatus.layout.height}`);
        console.log(`   - Scroll width: ${improvedStatus.layout.scrollWidth}`);
        console.log(`   - Scroll height: ${improvedStatus.layout.scrollHeight}`);
        
        console.log('\n🔧 에셋 상태:');
        console.log(`   - CSS sheets: ${improvedStatus.assets.cssSheets}`);
        console.log(`   - JS scripts: ${improvedStatus.assets.jsScripts}`);
        console.log(`   - Fonts: ${improvedStatus.assets.fonts}`);
        console.log(`   - Images: ${improvedStatus.assets.images}`);
        
        console.log('\n🏗️ 구조 상태:');
        console.log(`   - Elementor sections: ${improvedStatus.structure.elementorSections}`);
        console.log(`   - Elementor widgets: ${improvedStatus.structure.elementorWidgets}`);
        console.log(`   - Sections: ${improvedStatus.structure.sections}`);
        console.log(`   - Headers: ${improvedStatus.structure.headers}`);
        console.log(`   - Footers: ${improvedStatus.structure.footers}`);
        
        console.log('\n📝 콘텐츠 상태:');
        console.log(`   - H1: ${improvedStatus.content.h1}`);
        console.log(`   - H2: ${improvedStatus.content.h2}`);
        console.log(`   - H3: ${improvedStatus.content.h3}`);
        console.log(`   - H4: ${improvedStatus.content.h4}`);
        console.log(`   - Paragraphs: ${improvedStatus.content.p}`);
        console.log(`   - Images: ${improvedStatus.content.images}`);
        console.log(`   - Videos: ${improvedStatus.content.videos}`);
        
        // 3단계: 개선 효과 평가
        console.log('\n📊 3단계: 개선 효과 평가...');
        
        const improvements = {
            backgroundColor: improvedStatus.styles.backgroundColor === 'rgb(0, 0, 0)',
            color: improvedStatus.styles.color === 'rgb(38, 38, 38)',
            fontFamily: improvedStatus.styles.fontFamily.includes('Roboto'),
            lineHeight: improvedStatus.styles.lineHeight === '28.8px',
            margin: improvedStatus.styles.margin === '0px',
            padding: improvedStatus.styles.padding === '0px'
        };
        
        console.log('\n✅ 개선 효과 평가:');
        Object.entries(improvements).forEach(([key, improved]) => {
            console.log(`   - ${key}: ${improved ? '✅ 개선됨' : '❌ 여전히 문제'}`);
        });
        
        const improvementScore = Object.values(improvements).filter(Boolean).length;
        const improvementPercentage = (improvementScore / Object.keys(improvements).length) * 100;
        
        console.log(`\n📊 개선 점수: ${improvementScore}/${Object.keys(improvements).length} (${improvementPercentage.toFixed(1)}%)`);
        
        // 4단계: 추가 개선점 발견
        console.log('\n🔍 4단계: 추가 개선점 발견...');
        
        const additionalIssues = [];
        
        // 레이아웃 문제 확인
        if (improvedStatus.layout.width !== 1920) {
            additionalIssues.push(`레이아웃 너비 불일치: ${improvedStatus.layout.width} (기대값: 1920)`);
        }
        if (improvedStatus.layout.height > 2000) {
            additionalIssues.push(`레이아웃 높이 과도: ${improvedStatus.layout.height} (기대값: ~1080)`);
        }
        
        // 에셋 문제 확인
        if (improvedStatus.assets.cssSheets < 30) {
            additionalIssues.push(`CSS 시트 부족: ${improvedStatus.assets.cssSheets} (기대값: ≥30)`);
        }
        if (improvedStatus.assets.fonts < 200) {
            additionalIssues.push(`폰트 부족: ${improvedStatus.assets.fonts} (기대값: ≥200)`);
        }
        
        if (additionalIssues.length > 0) {
            console.log('\n⚠️ 추가 개선점 발견:');
            additionalIssues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue}`);
            });
        } else {
            console.log('\n✅ 추가 개선점 없음 - 모든 주요 문제 해결됨!');
        }
        
        // 5단계: 스크린샷 촬영
        console.log('\n📸 5단계: 스크린샷 촬영...');
        await page.screenshot({ 
            path: 'improved-clone-status.png',
            fullPage: true 
        });
        console.log('✅ 개선된 복제본 스크린샷 저장됨');
        
        // 6단계: 최종 상태 요약
        console.log('\n📋 최종 상태 요약:');
        console.log(`   - 개선 점수: ${improvementPercentage.toFixed(1)}%`);
        console.log(`   - 추가 개선점: ${additionalIssues.length}개`);
        console.log(`   - 전체 상태: ${improvementPercentage >= 80 ? '✅ 양호' : '⚠️ 개선 필요'}`);
        
        if (improvementPercentage >= 80) {
            console.log('\n🎉 1차 개선 성공! 주요 스타일 문제들이 해결되었습니다!');
        } else {
            console.log('\n🔄 추가 개선이 필요합니다. 2차 재귀개선 루프를 실행하세요.');
        }
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

verifyImprovements().catch(console.error); 