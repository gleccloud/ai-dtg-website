const { chromium } = require('playwright');

async function verifyRecovery() {
    console.log('🔍 CTO 모드 - 긴급 복구 검증 시작!');
    console.log('🎯 목표: 복구된 HTML 구조 및 에셋 상태 확인');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 1단계: 복구된 복제본 접속
        console.log('\n📱 1단계: 복구된 복제본 접속...');
        await page.goto('http://localhost:8081', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 2단계: 복구 후 상태 분석
        console.log('\n🔍 2단계: 복구 후 상태 분석...');
        const recoveredStatus = await page.evaluate(() => {
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
                scrollHeight: document.body.scrollHeight,
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                htmlWidth: document.documentElement.offsetWidth,
                htmlHeight: document.documentElement.offsetHeight
            };
            
            // 에셋 상태 확인
            const assets = {
                cssSheets: Array.from(document.styleSheets).length,
                jsScripts: Array.from(document.querySelectorAll('script[src]')).length,
                fonts: Array.from(document.fonts).length,
                images: Array.from(document.images).length,
                videos: Array.from(document.querySelectorAll('video')).length
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
            
            // 성능 상태 확인
            const performance = {
                loadTime: window.performance && window.performance.timing ? 
                    (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) : 0,
                domReady: window.performance && window.performance.timing ? 
                    (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) : 0,
                firstPaint: window.performance && window.performance.getEntriesByType ? 
                    (window.performance.getEntriesByType('paint')[0]?.startTime || 0) : 0
            };
            
            // 뷰포트 메타태그 확인
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            const viewportContent = viewportMeta ? viewportMeta.getAttribute('content') : '';
            
            return {
                styles,
                layout,
                assets,
                structure,
                content,
                performance,
                viewportContent
            };
        });
        
        console.log('📊 복구 후 상태 분석 결과:');
        console.log('\n🎨 스타일 상태:');
        console.log(`   - Background color: ${recoveredStatus.styles.backgroundColor}`);
        console.log(`   - Text color: ${recoveredStatus.styles.color}`);
        console.log(`   - Font family: ${recoveredStatus.styles.fontFamily}`);
        console.log(`   - Line height: ${recoveredStatus.styles.lineHeight}`);
        console.log(`   - Margin: ${recoveredStatus.styles.margin}`);
        console.log(`   - Padding: ${recoveredStatus.styles.padding}`);
        
        console.log('\n📐 레이아웃 상태:');
        console.log(`   - Body width: ${recoveredStatus.layout.width}`);
        console.log(`   - Body height: ${recoveredStatus.layout.height}`);
        console.log(`   - HTML width: ${recoveredStatus.layout.htmlWidth}`);
        console.log(`   - HTML height: ${recoveredStatus.layout.htmlHeight}`);
        console.log(`   - Scroll width: ${recoveredStatus.layout.scrollWidth}`);
        console.log(`   - Scroll height: ${recoveredStatus.layout.scrollHeight}`);
        console.log(`   - Viewport width: ${recoveredStatus.layout.viewportWidth}`);
        console.log(`   - Viewport height: ${recoveredStatus.layout.viewportHeight}`);
        
        console.log('\n🔧 에셋 상태:');
        console.log(`   - CSS sheets: ${recoveredStatus.assets.cssSheets}`);
        console.log(`   - JS scripts: ${recoveredStatus.assets.jsScripts}`);
        console.log(`   - Fonts: ${recoveredStatus.assets.fonts}`);
        console.log(`   - Images: ${recoveredStatus.assets.images}`);
        console.log(`   - Videos: ${recoveredStatus.assets.videos}`);
        
        console.log('\n🏗️ 구조 상태:');
        console.log(`   - Elementor sections: ${recoveredStatus.structure.elementorSections}`);
        console.log(`   - Elementor widgets: ${recoveredStatus.structure.elementorWidgets}`);
        console.log(`   - Sections: ${recoveredStatus.structure.sections}`);
        console.log(`   - Headers: ${recoveredStatus.structure.headers}`);
        console.log(`   - Footers: ${recoveredStatus.structure.footers}`);
        
        console.log('\n📝 콘텐츠 상태:');
        console.log(`   - H1: ${recoveredStatus.content.h1}`);
        console.log(`   - H2: ${recoveredStatus.content.h2}`);
        console.log(`   - H3: ${recoveredStatus.content.h3}`);
        console.log(`   - H4: ${recoveredStatus.content.h4}`);
        console.log(`   - Paragraphs: ${recoveredStatus.content.p}`);
        console.log(`   - Images: ${recoveredStatus.content.images}`);
        console.log(`   - Videos: ${recoveredStatus.content.videos}`);
        
        console.log('\n⚡ 성능 상태:');
        console.log(`   - Load time: ${recoveredStatus.performance.loadTime}ms`);
        console.log(`   - DOM ready: ${recoveredStatus.performance.domReady}ms`);
        console.log(`   - First paint: ${recoveredStatus.performance.firstPaint}ms`);
        
        console.log('\n📱 뷰포트 메타태그:');
        console.log(`   - Content: ${recoveredStatus.viewportContent}`);
        
        // 3단계: 복구 효과 평가
        console.log('\n📊 3단계: 복구 효과 평가...');
        
        const recoveryChecks = {
            // 기본 구조 복구 확인
            htmlStructure: recoveredStatus.structure.elementorSections > 0,
            contentElements: recoveredStatus.content.h2 > 0 || recoveredStatus.content.p > 0,
            images: recoveredStatus.content.images > 0,
            videos: recoveredStatus.content.videos > 0,
            
            // 에셋 복구 확인
            cssFiles: recoveredStatus.assets.cssSheets > 0,
            jsFiles: recoveredStatus.assets.jsScripts > 0,
            fonts: recoveredStatus.assets.fonts > 0,
            
            // 레이아웃 복구 확인
            bodyWidth: recoveredStatus.layout.width > 0,
            bodyHeight: recoveredStatus.layout.height > 0,
            scrollContent: recoveredStatus.layout.scrollHeight > 1000
        };
        
        console.log('\n✅ 복구 효과 평가:');
        Object.entries(recoveryChecks).forEach(([key, recovered]) => {
            const category = key.includes('Structure') || key.includes('Elements') ? '구조' :
                           key.includes('Files') || key.includes('fonts') ? '에셋' :
                           key.includes('Width') || key.includes('Height') || key.includes('scroll') ? '레이아웃' : '콘텐츠';
            console.log(`   - [${category}] ${key}: ${recovered ? '✅ 복구됨' : '❌ 복구 안됨'}`);
        });
        
        const recoveryScore = Object.values(recoveryChecks).filter(Boolean).length;
        const recoveryPercentage = (recoveryScore / Object.keys(recoveryChecks).length) * 100;
        
        console.log(`\n📊 복구 점수: ${recoveryScore}/${Object.keys(recoveryChecks).length} (${recoveryPercentage.toFixed(1)}%)`);
        
        // 4단계: 복구 상태 평가
        console.log('\n🔍 4단계: 복구 상태 평가...');
        
        let recoveryGrade = 'F';
        if (recoveryPercentage >= 95) recoveryGrade = 'A+';
        else if (recoveryPercentage >= 90) recoveryGrade = 'A';
        else if (recoveryPercentage >= 85) recoveryGrade = 'B+';
        else if (recoveryPercentage >= 80) recoveryGrade = 'B';
        else if (recoveryPercentage >= 75) recoveryGrade = 'C+';
        else if (recoveryPercentage >= 70) recoveryGrade = 'C';
        else if (recoveryPercentage >= 65) recoveryGrade = 'D+';
        else if (recoveryPercentage >= 60) recoveryGrade = 'D';
        
        console.log(`\n🎯 복구 등급: ${recoveryGrade} (${recoveryPercentage.toFixed(1)}%)`);
        
        if (recoveryPercentage >= 90) {
            console.log('🏆 EXCELLENT! 완벽한 복구 달성!');
        } else if (recoveryPercentage >= 80) {
            console.log('✅ VERY GOOD! 높은 품질의 복구 달성!');
        } else if (recoveryPercentage >= 70) {
            console.log('⚠️ GOOD! 기본적인 복구는 성공했으나 추가 작업 필요!');
        } else {
            console.log('❌ NEEDS IMPROVEMENT! 대폭적인 복구 작업이 필요합니다!');
        }
        
        // 5단계: 스크린샷 촬영
        console.log('\n📸 5단계: 스크린샷 촬영...');
        await page.screenshot({ 
            path: 'recovery-verification.png',
            fullPage: true 
        });
        console.log('✅ 복구 검증 스크린샷 저장됨');
        
        // 6단계: 복구 상태 요약
        console.log('\n📋 복구 상태 요약:');
        console.log(`   - 복구 전 상태: 40.0% (심각한 손상)`);
        console.log(`   - 복구 후 점수: ${recoveryPercentage.toFixed(1)}%`);
        console.log(`   - 복구 등급: ${recoveryGrade}`);
        console.log(`   - 전체 상태: ${recoveryPercentage >= 80 ? '✅ 양호' : '⚠️ 추가 작업 필요'}`);
        
        console.log('\n🎯 긴급 복구 검증 완료!');
        console.log('🔄 복구 효과를 확인했습니다!');
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

verifyRecovery().catch(console.error); 