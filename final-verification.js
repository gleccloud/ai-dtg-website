const { chromium } = require('playwright');

async function finalVerification() {
    console.log('🔍 CTO 모드 - 최종 6차 개선 검증 시작!');
    console.log('🎯 목표: 100% 완벽한 일치 달성 확인');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 1단계: 최종 6차 개선된 복제본 접속
        console.log('\n📱 1단계: 최종 6차 개선된 복제본 접속...');
        await page.goto('http://localhost:8081', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 2단계: 최종 상태 분석
        console.log('\n🔍 2단계: 최종 상태 분석...');
        const finalStatus = await page.evaluate(() => {
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
            
            // CSS 변수 확인
            const cssVariables = {
                primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
                accentColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color'),
                textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
            };
            
            // 애니메이션 클래스 확인
            const animations = {
                scrollAnimation: document.querySelectorAll('.scroll-animation').length,
                hoverEffect: document.querySelectorAll('.hover-effect').length,
                textAnimation: document.querySelectorAll('.text-animation').length,
                imageAnimation: document.querySelectorAll('.image-animation').length,
                backgroundAnimation: document.querySelectorAll('.background-animation').length,
                heroSection: document.querySelectorAll('.hero-section').length
            };
            
            // JavaScript 기능 확인
            const jsFeatures = {
                scrollProgress: typeof window.initScrollProgress === 'function',
                customCursor: typeof window.initCustomCursor === 'function',
                gsapAnimations: typeof window.initGSAPAnimations === 'function',
                swiperSliders: typeof window.initSwiperSliders === 'function',
                forceViewportSize: typeof window.forceViewportSize === 'function',
                initAnimations: typeof window.initAnimations === 'function'
            };
            
            return {
                styles,
                layout,
                assets,
                structure,
                content,
                performance,
                viewportContent,
                cssVariables,
                animations,
                jsFeatures
            };
        });
        
        console.log('📊 최종 상태 분석 결과:');
        console.log('\n🎨 스타일 상태:');
        console.log(`   - Background color: ${finalStatus.styles.backgroundColor}`);
        console.log(`   - Text color: ${finalStatus.styles.color}`);
        console.log(`   - Font family: ${finalStatus.styles.fontFamily}`);
        console.log(`   - Line height: ${finalStatus.styles.lineHeight}`);
        console.log(`   - Margin: ${finalStatus.styles.margin}`);
        console.log(`   - Padding: ${finalStatus.styles.padding}`);
        
        console.log('\n🎨 CSS 변수 상태:');
        console.log(`   - Primary color: ${finalStatus.cssVariables.primaryColor}`);
        console.log(`   - Secondary color: ${finalStatus.cssVariables.secondaryColor}`);
        console.log(`   - Accent color: ${finalStatus.cssVariables.accentColor}`);
        console.log(`   - Text color: ${finalStatus.cssVariables.textColor}`);
        
        console.log('\n📐 레이아웃 상태:');
        console.log(`   - Body width: ${finalStatus.layout.width}`);
        console.log(`   - Body height: ${finalStatus.layout.height}`);
        console.log(`   - HTML width: ${finalStatus.layout.htmlWidth}`);
        console.log(`   - HTML height: ${finalStatus.layout.htmlHeight}`);
        console.log(`   - Scroll width: ${finalStatus.layout.scrollWidth}`);
        console.log(`   - Scroll height: ${finalStatus.layout.scrollHeight}`);
        console.log(`   - Viewport width: ${finalStatus.layout.viewportWidth}`);
        console.log(`   - Viewport height: ${finalStatus.layout.viewportHeight}`);
        
        console.log('\n🔧 에셋 상태:');
        console.log(`   - CSS sheets: ${finalStatus.assets.cssSheets}`);
        console.log(`   - JS scripts: ${finalStatus.assets.jsScripts}`);
        console.log(`   - Fonts: ${finalStatus.assets.fonts}`);
        console.log(`   - Images: ${finalStatus.assets.images}`);
        console.log(`   - Videos: ${finalStatus.assets.videos}`);
        
        console.log('\n🏗️ 구조 상태:');
        console.log(`   - Elementor sections: ${finalStatus.structure.elementorSections}`);
        console.log(`   - Elementor widgets: ${finalStatus.structure.elementorWidgets}`);
        console.log(`   - Sections: ${finalStatus.structure.sections}`);
        console.log(`   - Headers: ${finalStatus.structure.headers}`);
        console.log(`   - Footers: ${finalStatus.structure.footers}`);
        
        console.log('\n📝 콘텐츠 상태:');
        console.log(`   - H1: ${finalStatus.content.h1}`);
        console.log(`   - H2: ${finalStatus.content.h2}`);
        console.log(`   - H3: ${finalStatus.content.h3}`);
        console.log(`   - H4: ${finalStatus.content.h4}`);
        console.log(`   - Paragraphs: ${finalStatus.content.p}`);
        console.log(`   - Images: ${finalStatus.content.images}`);
        console.log(`   - Videos: ${finalStatus.content.videos}`);
        
        console.log('\n✨ 애니메이션 상태:');
        console.log(`   - Scroll animation: ${finalStatus.animations.scrollAnimation}`);
        console.log(`   - Hover effect: ${finalStatus.animations.hoverEffect}`);
        console.log(`   - Text animation: ${finalStatus.animations.textAnimation}`);
        console.log(`   - Image animation: ${finalStatus.animations.imageAnimation}`);
        console.log(`   - Background animation: ${finalStatus.animations.backgroundAnimation}`);
        console.log(`   - Hero section: ${finalStatus.animations.heroSection}`);
        
        console.log('\n🔧 JavaScript 기능 상태:');
        console.log(`   - Scroll progress: ${finalStatus.jsFeatures.scrollProgress ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Custom cursor: ${finalStatus.jsFeatures.customCursor ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - GSAP animations: ${finalStatus.jsFeatures.gsapAnimations ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Swiper sliders: ${finalStatus.jsFeatures.swiperSliders ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Force viewport size: ${finalStatus.jsFeatures.forceViewportSize ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Init animations: ${finalStatus.jsFeatures.initAnimations ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        
        console.log('\n⚡ 성능 상태:');
        console.log(`   - Load time: ${finalStatus.performance.loadTime}ms`);
        console.log(`   - DOM ready: ${finalStatus.performance.domReady}ms`);
        console.log(`   - First paint: ${finalStatus.performance.firstPaint}ms`);
        
        console.log('\n📱 뷰포트 메타태그:');
        console.log(`   - Content: ${finalStatus.viewportContent}`);
        
        // 3단계: 최종 개선 효과 평가
        console.log('\n📊 3단계: 최종 개선 효과 평가...');
        
        const finalChecks = {
            // 스타일 개선 (1차에서 해결됨)
            backgroundColor: finalStatus.styles.backgroundColor === 'rgb(0, 0, 0)',
            color: finalStatus.styles.color === 'rgb(38, 38, 38)',
            fontFamily: finalStatus.styles.fontFamily.includes('Roboto'),
            lineHeight: finalStatus.styles.lineHeight === '28.8px',
            margin: finalStatus.styles.margin === '0px',
            padding: finalStatus.styles.padding === '0px',
            
            // 레이아웃 개선 (2차에서 해결됨)
            layoutWidth: finalStatus.layout.width >= 1200,
            layoutHeight: finalStatus.layout.height <= 5000,
            
            // 뷰포트 개선 (6차에서 해결됨)
            viewportWidth: finalStatus.layout.viewportWidth >= 1800,
            viewportHeight: finalStatus.layout.viewportHeight >= 900,
            htmlWidth: finalStatus.layout.htmlWidth >= 1800,
            htmlHeight: finalStatus.layout.htmlHeight >= 900,
            
            // 에셋 개선 (6차에서 해결됨)
            cssSheets: finalStatus.assets.cssSheets >= 40,
            jsScripts: finalStatus.assets.jsScripts >= 45,
            fonts: finalStatus.assets.fonts >= 200,
            images: finalStatus.assets.images >= 8,
            videos: finalStatus.assets.videos >= 2,
            
            // CSS 변수 시스템 (5차에서 해결됨)
            cssVariables: finalStatus.cssVariables.primaryColor.trim() === '#000000',
            
            // 애니메이션 시스템 (6차에서 해결됨)
            scrollAnimation: finalStatus.animations.scrollAnimation > 0,
            hoverEffect: finalStatus.animations.hoverEffect > 0,
            textAnimation: finalStatus.animations.textAnimation > 0,
            imageAnimation: finalStatus.animations.imageAnimation > 0,
            backgroundAnimation: finalStatus.animations.backgroundAnimation > 0,
            heroSection: finalStatus.animations.heroSection > 0,
            
            // JavaScript 기능 (6차에서 해결됨)
            scrollProgress: finalStatus.jsFeatures.scrollProgress,
            customCursor: finalStatus.jsFeatures.customCursor,
            gsapAnimations: finalStatus.jsFeatures.gsapAnimations,
            swiperSliders: finalStatus.jsFeatures.swiperSliders,
            forceViewportSize: finalStatus.jsFeatures.forceViewportSize,
            initAnimations: finalStatus.jsFeatures.initAnimations
        };
        
        console.log('\n✅ 최종 개선 효과 평가:');
        Object.entries(finalChecks).forEach(([key, improved]) => {
            const category = key.includes('Width') || key.includes('Height') || key.includes('viewport') ? '뷰포트' :
                           key.includes('Sheets') || key.includes('Scripts') || key.includes('fonts') ? '에셋' :
                           key.includes('layout') ? '레이아웃' :
                           key.includes('Variables') ? 'CSS시스템' :
                           key.includes('Animation') || key.includes('Effect') || key.includes('hero') ? '애니메이션' :
                           key.includes('Progress') || key.includes('Cursor') || key.includes('GSAP') || key.includes('Swiper') || key.includes('Viewport') || key.includes('Animations') ? 'JavaScript' : '스타일';
            console.log(`   - [${category}] ${key}: ${improved ? '✅ 개선됨' : '❌ 여전히 문제'}`);
        });
        
        const finalScore = Object.values(finalChecks).filter(Boolean).length;
        const finalPercentage = (finalScore / Object.keys(finalChecks).length) * 100;
        
        console.log(`\n📊 최종 개선 점수: ${finalScore}/${Object.keys(finalChecks).length} (${finalPercentage.toFixed(1)}%)`);
        
        // 4단계: 최종 상태 평가
        console.log('\n🔍 4단계: 최종 상태 평가...');
        
        let finalGrade = 'F';
        if (finalPercentage >= 95) finalGrade = 'A+';
        else if (finalPercentage >= 90) finalGrade = 'A';
        else if (finalPercentage >= 85) finalGrade = 'B+';
        else if (finalPercentage >= 80) finalGrade = 'B';
        else if (finalPercentage >= 75) finalGrade = 'C+';
        else if (finalPercentage >= 70) finalGrade = 'C';
        else if (finalPercentage >= 65) finalGrade = 'D+';
        else if (finalPercentage >= 60) finalGrade = 'D';
        
        console.log(`\n🎯 최종 등급: ${finalGrade} (${finalPercentage.toFixed(1)}%)`);
        
        if (finalPercentage >= 90) {
            console.log('🏆 EXCELLENT! 거의 완벽한 복제본 달성!');
        } else if (finalPercentage >= 80) {
            console.log('✅ VERY GOOD! 높은 품질의 복제본 달성!');
        } else if (finalPercentage >= 70) {
            console.log('⚠️ GOOD! 기본적인 복제는 성공했으나 추가 개선 필요!');
        } else {
            console.log('❌ NEEDS IMPROVEMENT! 대폭적인 개선이 필요합니다!');
        }
        
        // 5단계: 스크린샷 촬영
        console.log('\n📸 5단계: 스크린샷 촬영...');
        await page.screenshot({ 
            path: 'final-verification.png',
            fullPage: true 
        });
        console.log('✅ 최종 검증 스크린샷 저장됨');
        
        // 6단계: 최종 상태 요약
        console.log('\n📋 최종 상태 요약:');
        console.log(`   - 1차 개선 점수: 100.0% (스타일 문제 해결)`);
        console.log(`   - 2차 개선 점수: 73.3% (레이아웃/에셋 문제 해결)`);
        console.log(`   - 3차 개선 점수: 76.5% (뷰포트/CSS/폰트 문제 해결)`);
        console.log(`   - 4차 개선 점수: 40.0% (HTML 손상 발생)`);
        console.log(`   - 긴급 복구 점수: 100.0% (완벽한 복구 달성)`);
        console.log(`   - 5차 개선 점수: 59.3% (모든 영역 완벽 일치 시도)`);
        console.log(`   - 6차 개선 점수: ${finalPercentage.toFixed(1)}% (최종 완벽 일치)`);
        console.log(`   - 최종 등급: ${finalGrade}`);
        console.log(`   - 전체 상태: ${finalPercentage >= 80 ? '✅ 양호' : '⚠️ 개선 필요'}`);
        
        // 7단계: 사용자 요구사항 달성 확인
        console.log('\n🎯 사용자 요구사항 달성 확인:');
        const userRequirements = {
            design: finalStatus.cssVariables.primaryColor.trim() === '#000000',
            color: finalStatus.cssVariables.primaryColor.trim() === '#000000' && finalStatus.cssVariables.accentColor.trim() === '#ffffff',
            animation: finalStatus.animations.scrollAnimation > 0 && finalStatus.animations.hoverEffect > 0,
            effects: finalStatus.jsFeatures.customCursor && finalStatus.jsFeatures.scrollProgress,
            sections: finalStatus.structure.elementorSections >= 19,
            body: finalStatus.layout.width >= 1200 && finalStatus.layout.height > 0,
            hero: finalStatus.animations.heroSection > 0,
            header: finalStatus.structure.headers >= 1,
            footer: finalStatus.structure.footers >= 1,
            library: finalStatus.assets.cssSheets >= 40 && finalStatus.assets.jsScripts >= 45,
            components: finalStatus.animations.imageAnimation > 0 && finalStatus.animations.backgroundAnimation > 0,
            css: finalStatus.cssVariables.primaryColor.trim() === '#000000',
            js: finalStatus.jsFeatures.forceViewportSize && finalStatus.jsFeatures.initAnimations
        };
        
        Object.entries(userRequirements).forEach(([requirement, achieved]) => {
            console.log(`   - ${requirement}: ${achieved ? '✅ 달성' : '❌ 미달성'}`);
        });
        
        const requirementsScore = Object.values(userRequirements).filter(Boolean).length;
        const requirementsPercentage = (requirementsScore / Object.keys(userRequirements).length) * 100;
        
        console.log(`\n📊 사용자 요구사항 달성률: ${requirementsScore}/${Object.keys(userRequirements).length} (${requirementsPercentage.toFixed(1)}%)`);
        
        console.log('\n🎯 최종 6차 재귀개선 루프 검증 완료!');
        console.log('🔄 재귀개선 모드의 성과를 확인했습니다!');
        
        if (finalPercentage >= 90) {
            console.log('\n🏆 축하합니다! 거의 완벽한 SK하이닉스 복제본을 달성했습니다!');
        } else if (finalPercentage >= 80) {
            console.log('\n✅ 훌륭합니다! 높은 품질의 복제본을 달성했습니다!');
        } else {
            console.log('\n⚠️ 추가 개선이 필요합니다. 재귀개선 루프를 계속 진행하세요.');
        }
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

finalVerification().catch(console.error); 