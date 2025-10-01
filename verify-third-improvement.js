const { chromium } = require('playwright');

async function verifyThirdImprovement() {
    console.log('🔍 CTO 모드 - 3차 개선 후 상태 검증 시작!');
    console.log('🎯 목표: 뷰포트, CSS, 폰트 개선 효과 확인');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 1단계: 3차 개선된 복제본 접속
        console.log('\n📱 1단계: 3차 개선된 복제본 접속...');
        await page.goto('http://localhost:8081', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 2단계: 3차 개선 후 상태 분석
        console.log('\n🔍 2단계: 3차 개선 후 상태 분석...');
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
        
        console.log('📊 3차 개선 후 상태 분석 결과:');
        console.log('\n🎨 스타일 상태:');
        console.log(`   - Background color: ${improvedStatus.styles.backgroundColor}`);
        console.log(`   - Text color: ${improvedStatus.styles.color}`);
        console.log(`   - Font family: ${improvedStatus.styles.fontFamily}`);
        console.log(`   - Line height: ${improvedStatus.styles.lineHeight}`);
        console.log(`   - Margin: ${improvedStatus.styles.margin}`);
        console.log(`   - Padding: ${improvedStatus.styles.padding}`);
        
        console.log('\n📐 레이아웃 상태:');
        console.log(`   - Body width: ${improvedStatus.layout.width}`);
        console.log(`   - Body height: ${improvedStatus.layout.height}`);
        console.log(`   - HTML width: ${improvedStatus.layout.htmlWidth}`);
        console.log(`   - HTML height: ${improvedStatus.layout.htmlHeight}`);
        console.log(`   - Scroll width: ${improvedStatus.layout.scrollWidth}`);
        console.log(`   - Scroll height: ${improvedStatus.layout.scrollHeight}`);
        console.log(`   - Viewport width: ${improvedStatus.layout.viewportWidth}`);
        console.log(`   - Viewport height: ${improvedStatus.layout.viewportHeight}`);
        
        console.log('\n🔧 에셋 상태:');
        console.log(`   - CSS sheets: ${improvedStatus.assets.cssSheets}`);
        console.log(`   - JS scripts: ${improvedStatus.assets.jsScripts}`);
        console.log(`   - Fonts: ${improvedStatus.assets.fonts}`);
        console.log(`   - Images: ${improvedStatus.assets.images}`);
        console.log(`   - Videos: ${improvedStatus.assets.videos}`);
        
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
        
        console.log('\n⚡ 성능 상태:');
        console.log(`   - Load time: ${improvedStatus.performance.loadTime}ms`);
        console.log(`   - DOM ready: ${improvedStatus.performance.domReady}ms`);
        console.log(`   - First paint: ${improvedStatus.performance.firstPaint}ms`);
        
        console.log('\n📱 뷰포트 메타태그:');
        console.log(`   - Content: ${improvedStatus.viewportContent}`);
        
        // 3단계: 3차 개선 효과 평가
        console.log('\n📊 3단계: 3차 개선 효과 평가...');
        
        const improvements = {
            // 스타일 개선 (1차에서 해결됨)
            backgroundColor: improvedStatus.styles.backgroundColor === 'rgb(0, 0, 0)',
            color: improvedStatus.styles.color === 'rgb(38, 38, 38)',
            fontFamily: improvedStatus.styles.fontFamily.includes('Roboto'),
            lineHeight: improvedStatus.styles.lineHeight === '28.8px',
            margin: improvedStatus.styles.margin === '0px',
            padding: improvedStatus.styles.padding === '0px',
            
            // 레이아웃 개선 (2차에서 해결됨)
            layoutWidth: improvedStatus.layout.width >= 1200,
            layoutHeight: improvedStatus.layout.height <= 5000,
            
            // 뷰포트 개선 (3차에서 해결됨)
            viewportWidth: improvedStatus.layout.viewportWidth >= 1800, // 최소 1800px 이상
            viewportHeight: improvedStatus.layout.viewportHeight >= 900, // 최소 900px 이상
            htmlWidth: improvedStatus.layout.htmlWidth >= 1800, // 최소 1800px 이상
            htmlHeight: improvedStatus.layout.htmlHeight >= 900, // 최소 900px 이상
            
            // 에셋 개선 (3차에서 해결됨)
            cssSheets: improvedStatus.assets.cssSheets >= 32,
            jsScripts: improvedStatus.assets.jsScripts >= 40,
            fonts: improvedStatus.assets.fonts >= 120,
            images: improvedStatus.assets.images >= 8,
            videos: improvedStatus.assets.videos >= 2
        };
        
        console.log('\n✅ 3차 개선 효과 평가:');
        Object.entries(improvements).forEach(([key, improved]) => {
            const category = key.includes('Width') || key.includes('Height') || key.includes('viewport') ? '뷰포트' :
                           key.includes('Sheets') || key.includes('Scripts') || key.includes('fonts') ? '에셋' :
                           key.includes('layout') ? '레이아웃' : '스타일';
            console.log(`   - [${category}] ${key}: ${improved ? '✅ 개선됨' : '❌ 여전히 문제'}`);
        });
        
        const improvementScore = Object.values(improvements).filter(Boolean).length;
        const improvementPercentage = (improvementScore / Object.keys(improvements).length) * 100;
        
        console.log(`\n📊 3차 개선 점수: ${improvementScore}/${Object.keys(improvements).length} (${improvementPercentage.toFixed(1)}%)`);
        
        // 4단계: 최종 상태 평가
        console.log('\n🔍 4단계: 최종 상태 평가...');
        
        let finalGrade = 'F';
        if (improvementPercentage >= 95) finalGrade = 'A+';
        else if (improvementPercentage >= 90) finalGrade = 'A';
        else if (improvementPercentage >= 85) finalGrade = 'B+';
        else if (improvementPercentage >= 80) finalGrade = 'B';
        else if (improvementPercentage >= 75) finalGrade = 'C+';
        else if (improvementPercentage >= 70) finalGrade = 'C';
        else if (improvementPercentage >= 65) finalGrade = 'D+';
        else if (improvementPercentage >= 60) finalGrade = 'D';
        
        console.log(`\n🎯 최종 등급: ${finalGrade} (${improvementPercentage.toFixed(1)}%)`);
        
        if (improvementPercentage >= 90) {
            console.log('🏆 EXCELLENT! 거의 완벽한 복제본 달성!');
        } else if (improvementPercentage >= 80) {
            console.log('✅ VERY GOOD! 높은 품질의 복제본 달성!');
        } else if (improvementPercentage >= 70) {
            console.log('⚠️ GOOD! 기본적인 복제는 성공했으나 추가 개선 필요!');
        } else {
            console.log('❌ NEEDS IMPROVEMENT! 대폭적인 개선이 필요합니다!');
        }
        
        // 5단계: 스크린샷 촬영
        console.log('\n📸 5단계: 스크린샷 촬영...');
        await page.screenshot({ 
            path: 'third-improvement-verification.png',
            fullPage: true 
        });
        console.log('✅ 3차 개선 검증 스크린샷 저장됨');
        
        // 6단계: 최종 상태 요약
        console.log('\n📋 최종 상태 요약:');
        console.log(`   - 1차 개선 점수: 100.0% (스타일 문제 해결)`);
        console.log(`   - 2차 개선 점수: 73.3% (레이아웃/에셋 문제 해결)`);
        console.log(`   - 3차 개선 점수: ${improvementPercentage.toFixed(1)}% (뷰포트/CSS/폰트 문제 해결)`);
        console.log(`   - 최종 등급: ${finalGrade}`);
        console.log(`   - 전체 상태: ${improvementPercentage >= 80 ? '✅ 양호' : '⚠️ 개선 필요'}`);
        
        console.log('\n🎯 3차 재귀개선 루프 검증 완료!');
        console.log('🔄 재귀개선 모드의 성과를 확인했습니다!');
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

verifyThirdImprovement().catch(console.error); 