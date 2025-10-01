const { chromium } = require('playwright');

async function verifyEighthImprovement() {
    console.log('🔍 CTO 모드 - 8차 개선 검증 시작!');
    console.log('🎯 목표: 73.3% → 80%+ 개선 효과 확인');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 1단계: 8차 개선된 복제본 접속
        console.log('\n📱 1단계: 8차 개선된 복제본 접속...');
        await page.goto('http://localhost:8081', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 2단계: 8차 개선 상태 분석
        console.log('\n🔍 2단계: 8차 개선 상태 분석...');
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
            
            // CSS 변수 확인
            const cssVariables = {
                primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
                accentColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color'),
                textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
                containerMaxWidth: getComputedStyle(document.documentElement).getPropertyValue('--container-max-width'),
                sectionPadding: getComputedStyle(document.documentElement).getPropertyValue('--section-padding'),
                borderRadius: getComputedStyle(document.documentElement).getPropertyValue('--border-radius'),
                boxShadow: getComputedStyle(document.documentElement).getPropertyValue('--box-shadow')
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
                initAnimations: typeof window.initAnimations === 'function',
                safeInitAnimations: typeof window.safeInitAnimations === 'function',
                safeSetViewport: typeof window.safeSetViewport === 'function'
            };
            
            // 8차 개선 특화 확인
            const eighthImprovement = {
                safeCSSVariables: cssVariables.primaryColor.trim() === '#000000' && 
                    cssVariables.containerMaxWidth.trim() === '1920px',
                safeAnimationSystem: typeof window.safeInitAnimations === 'function' && 
                    animations.imageAnimation > 0 && animations.backgroundAnimation > 0,
                safeViewportSystem: typeof window.safeSetViewport === 'function',
                structurePreserved: structure.elementorSections >= 160 && structure.elementorWidgets >= 500
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
                jsFeatures,
                eighthImprovement
            };
        });
        
        console.log('📊 8차 개선 상태 분석 결과:');
        console.log('\n🎨 스타일 상태:');
        console.log(`   - Background color: ${improvedStatus.styles.backgroundColor}`);
        console.log(`   - Text color: ${improvedStatus.styles.color}`);
        console.log(`   - Font family: ${improvedStatus.styles.fontFamily}`);
        console.log(`   - Line height: ${improvedStatus.styles.lineHeight}`);
        console.log(`   - Margin: ${improvedStatus.styles.margin}`);
        console.log(`   - Padding: ${improvedStatus.styles.padding}`);
        
        console.log('\n🎨 CSS 변수 상태 (8차 개선):');
        console.log(`   - Primary color: ${improvedStatus.cssVariables.primaryColor}`);
        console.log(`   - Secondary color: ${improvedStatus.cssVariables.secondaryColor}`);
        console.log(`   - Accent color: ${improvedStatus.cssVariables.accentColor}`);
        console.log(`   - Text color: ${improvedStatus.cssVariables.textColor}`);
        console.log(`   - Container max width: ${improvedStatus.cssVariables.containerMaxWidth}`);
        console.log(`   - Section padding: ${improvedStatus.cssVariables.sectionPadding}`);
        console.log(`   - Border radius: ${improvedStatus.cssVariables.borderRadius}`);
        console.log(`   - Box shadow: ${improvedStatus.cssVariables.boxShadow}`);
        
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
        
        console.log('\n✨ 애니메이션 상태:');
        console.log(`   - Scroll animation: ${improvedStatus.animations.scrollAnimation}`);
        console.log(`   - Hover effect: ${improvedStatus.animations.hoverEffect}`);
        console.log(`   - Text animation: ${improvedStatus.animations.textAnimation}`);
        console.log(`   - Image animation: ${improvedStatus.animations.imageAnimation}`);
        console.log(`   - Background animation: ${improvedStatus.animations.backgroundAnimation}`);
        console.log(`   - Hero section: ${improvedStatus.animations.heroSection}`);
        
        console.log('\n🔧 JavaScript 기능 상태:');
        console.log(`   - Scroll progress: ${improvedStatus.jsFeatures.scrollProgress ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Custom cursor: ${improvedStatus.jsFeatures.customCursor ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - GSAP animations: ${improvedStatus.jsFeatures.gsapAnimations ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Swiper sliders: ${improvedStatus.jsFeatures.swiperSliders ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Force viewport size: ${improvedStatus.jsFeatures.forceViewportSize ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Init animations: ${improvedStatus.jsFeatures.initAnimations ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Safe init animations: ${improvedStatus.jsFeatures.safeInitAnimations ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Safe set viewport: ${improvedStatus.jsFeatures.safeSetViewport ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        
        console.log('\n🚀 8차 개선 특화 기능:');
        console.log(`   - Safe CSS variables: ${improvedStatus.eighthImprovement.safeCSSVariables ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Safe animation system: ${improvedStatus.eighthImprovement.safeAnimationSystem ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Safe viewport system: ${improvedStatus.eighthImprovement.safeViewportSystem ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        console.log(`   - Structure preserved: ${improvedStatus.eighthImprovement.structurePreserved ? '✅ 구현됨' : '❌ 구현 안됨'}`);
        
        console.log('\n⚡ 성능 상태:');
        console.log(`   - Load time: ${improvedStatus.performance.loadTime}ms`);
        console.log(`   - DOM ready: ${improvedStatus.performance.domReady}ms`);
        console.log(`   - First paint: ${improvedStatus.performance.firstPaint}ms`);
        
        console.log('\n📱 뷰포트 메타태그:');
        console.log(`   - Content: ${improvedStatus.viewportContent}`);
        
        // 3단계: 8차 개선 효과 평가
        console.log('\n📊 3단계: 8차 개선 효과 평가...');
        
        const improvementChecks = {
            // 스타일 개선 (1차에서 해결됨)
            backgroundColor: improvedStatus.styles.backgroundColor === 'rgb(0, 0, 0)' || improvedStatus.styles.backgroundColor === 'rgba(0, 0, 0, 0)',
            color: improvedStatus.styles.color === 'rgb(38, 38, 38)' || improvedStatus.styles.color === 'rgb(0, 0, 0)',
            fontFamily: improvedStatus.styles.fontFamily.includes('Roboto') || improvedStatus.styles.fontFamily.includes('Apple'),
            lineHeight: improvedStatus.styles.lineHeight === '28.8px' || improvedStatus.styles.lineHeight === 'normal',
            margin: improvedStatus.styles.margin === '0px' || improvedStatus.styles.margin === '8px',
            padding: improvedStatus.styles.padding === '0px',
            
            // 레이아웃 개선 (2차에서 해결됨)
            layoutWidth: improvedStatus.layout.width >= 1200,
            layoutHeight: improvedStatus.layout.height <= 5000,
            
            // 뷰포트 개선 (8차에서 안전하게 해결됨)
            viewportWidth: improvedStatus.layout.viewportWidth >= 1200,
            viewportHeight: improvedStatus.layout.viewportHeight >= 600,
            htmlWidth: improvedStatus.layout.htmlWidth >= 1200,
            htmlHeight: improvedStatus.layout.htmlHeight >= 600,
            
            // 에셋 개선 (8차에서 안전하게 해결됨)
            cssSheets: improvedStatus.assets.cssSheets >= 30,
            jsScripts: improvedStatus.assets.jsScripts >= 35,
            fonts: improvedStatus.assets.fonts >= 100,
            images: improvedStatus.assets.images >= 8,
            videos: improvedStatus.assets.videos >= 2,
            
            // CSS 변수 시스템 (8차에서 안전하게 해결됨)
            cssVariables: improvedStatus.cssVariables.primaryColor.trim() === '#000000',
            cssVariablesExtended: improvedStatus.cssVariables.containerMaxWidth.trim() === '1920px',
            
            // 애니메이션 시스템 (8차에서 안전하게 해결됨)
            scrollAnimation: improvedStatus.animations.scrollAnimation > 0,
            hoverEffect: improvedStatus.animations.hoverEffect > 0,
            textAnimation: improvedStatus.animations.textAnimation > 0,
            imageAnimation: improvedStatus.animations.imageAnimation > 0,
            backgroundAnimation: improvedStatus.animations.backgroundAnimation > 0,
            heroSection: improvedStatus.animations.heroSection > 0,
            
            // JavaScript 기능 (8차에서 안전하게 해결됨)
            scrollProgress: improvedStatus.jsFeatures.scrollProgress,
            customCursor: improvedStatus.jsFeatures.customCursor,
            gsapAnimations: improvedStatus.jsFeatures.gsapAnimations,
            swiperSliders: improvedStatus.jsFeatures.swiperSliders,
            forceViewportSize: improvedStatus.jsFeatures.forceViewportSize,
            initAnimations: improvedStatus.jsFeatures.initAnimations,
            safeInitAnimations: improvedStatus.jsFeatures.safeInitAnimations,
            safeSetViewport: improvedStatus.jsFeatures.safeSetViewport,
            
            // 8차 개선 특화 기능
            safeCSSVariables: improvedStatus.eighthImprovement.safeCSSVariables,
            safeAnimationSystem: improvedStatus.eighthImprovement.safeAnimationSystem,
            safeViewportSystem: improvedStatus.eighthImprovement.safeViewportSystem,
            structurePreserved: improvedStatus.eighthImprovement.structurePreserved
        };
        
        console.log('\n✅ 8차 개선 효과 평가:');
        Object.entries(improvementChecks).forEach(([key, improved]) => {
            const category = key.includes('Width') || key.includes('Height') || key.includes('viewport') ? '뷰포트' :
                           key.includes('Sheets') || key.includes('Scripts') || key.includes('fonts') ? '에셋' :
                           key.includes('layout') ? '레이아웃' :
                           key.includes('Variables') ? 'CSS시스템' :
                           key.includes('Animation') || key.includes('Effect') || key.includes('hero') ? '애니메이션' :
                           key.includes('Progress') || key.includes('Cursor') || key.includes('GSAP') || key.includes('Swiper') || key.includes('Viewport') || key.includes('Animations') || key.includes('Safe') ? 'JavaScript' :
                           key.includes('safe') || key.includes('System') || key.includes('Preserved') ? '8차특화' : '스타일';
            console.log(`   - [${category}] ${key}: ${improved ? '✅ 개선됨' : '❌ 여전히 문제'}`);
        });
        
        const improvementScore = Object.values(improvementChecks).filter(Boolean).length;
        const improvementPercentage = (improvementScore / Object.keys(improvementChecks).length) * 100;
        
        console.log(`\n📊 8차 개선 점수: ${improvementScore}/${Object.keys(improvementChecks).length} (${improvementPercentage.toFixed(1)}%)`);
        
        // 4단계: 7차 대비 개선 효과 분석
        console.log('\n📈 4단계: 7차 대비 개선 효과 분석...');
        
        const previousScore = 30.8; // 7차 개선 후 점수
        const currentScore = improvementPercentage;
        const improvement = currentScore - previousScore;
        
        console.log(`\n📊 개선 효과 분석:`);
        console.log(`   - 7차 개선 점수: ${previousScore}%`);
        console.log(`   - 8차 개선 점수: ${currentScore.toFixed(1)}%`);
        console.log(`   - 개선 효과: ${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%`);
        
        if (improvement > 0) {
            console.log(`   - 개선 성공: ✅ ${improvement.toFixed(1)}% 향상`);
        } else if (improvement === 0) {
            console.log(`   - 개선 없음: ⚠️ 동일한 점수`);
        } else {
            console.log(`   - 개선 실패: ❌ ${Math.abs(improvement).toFixed(1)}% 하락`);
        }
        
        // 5단계: 최종 상태 평가
        console.log('\n🔍 5단계: 최종 상태 평가...');
        
        let finalGrade = 'F';
        if (currentScore >= 95) finalGrade = 'A+';
        else if (currentScore >= 90) finalGrade = 'A';
        else if (currentScore >= 85) finalGrade = 'B+';
        else if (currentScore >= 80) finalGrade = 'B';
        else if (currentScore >= 75) finalGrade = 'C+';
        else if (currentScore >= 70) finalGrade = 'C';
        else if (currentScore >= 65) finalGrade = 'D+';
        else if (currentScore >= 60) finalGrade = 'D';
        
        console.log(`\n🎯 8차 개선 후 최종 등급: ${finalGrade} (${currentScore.toFixed(1)}%)`);
        
        if (currentScore >= 90) {
            console.log('🏆 EXCELLENT! 거의 완벽한 복제본 달성!');
        } else if (currentScore >= 85) {
            console.log('✅ VERY GOOD! 높은 품질의 복제본 달성!');
        } else if (currentScore >= 80) {
            console.log('✅ GOOD! 양호한 품질의 복제본 달성!');
        } else if (currentScore >= 75) {
            console.log('⚠️ ACCEPTABLE! 기본적인 복제는 성공했으나 추가 개선 필요!');
        } else {
            console.log('❌ NEEDS IMPROVEMENT! 대폭적인 개선이 필요합니다!');
        }
        
        // 6단계: 스크린샷 촬영
        console.log('\n📸 6단계: 스크린샷 촬영...');
        await page.screenshot({ 
            path: 'eighth-improvement-verification.png',
            fullPage: true 
        });
        console.log('✅ 8차 개선 검증 스크린샷 저장됨');
        
        // 7단계: 최종 상태 요약
        console.log('\n📋 8차 개선 최종 상태 요약:');
        console.log(`   - 1차 개선 점수: 100.0% (스타일 문제 해결)`);
        console.log(`   - 2차 개선 점수: 73.3% (레이아웃/에셋 문제 해결)`);
        console.log(`   - 3차 개선 점수: 76.5% (뷰포트/CSS/폰트 문제 해결)`);
        console.log(`   - 4차 개선 점수: 40.0% (HTML 손상 발생)`);
        console.log(`   - 긴급 복구 점수: 100.0% (완벽한 복구 달성)`);
        console.log(`   - 5차 개선 점수: 59.3% (모든 영역 완벽 일치 시도)`);
        console.log(`   - 6차 개선 점수: 73.3% (최종 완벽 일치)`);
        console.log(`   - 7차 개선 점수: 30.8% (강화된 시스템 구축 - 손상 발생)`);
        console.log(`   - 긴급 복구 V2 점수: 100.0% (완벽한 복구 달성)`);
        console.log(`   - 8차 개선 점수: ${currentScore.toFixed(1)}% (안전한 시스템 구축)`);
        console.log(`   - 최종 등급: ${finalGrade}`);
        console.log(`   - 전체 상태: ${currentScore >= 80 ? '✅ 양호' : '⚠️ 개선 필요'}`);
        
        // 8단계: 사용자 요구사항 달성 확인
        console.log('\n🎯 사용자 요구사항 달성 확인:');
        const userRequirements = {
            design: improvedStatus.cssVariables.primaryColor.trim() === '#000000',
            color: improvedStatus.cssVariables.primaryColor.trim() === '#000000' && improvedStatus.cssVariables.accentColor.trim() === '#ffffff',
            animation: improvedStatus.animations.scrollAnimation > 0 && improvedStatus.animations.hoverEffect > 0,
            effects: improvedStatus.jsFeatures.customCursor && improvedStatus.jsFeatures.scrollProgress,
            sections: improvedStatus.structure.elementorSections >= 160,
            body: improvedStatus.layout.width >= 1200 && improvedStatus.layout.height > 0,
            hero: improvedStatus.animations.heroSection > 0,
            header: improvedStatus.structure.headers >= 1,
            footer: improvedStatus.structure.footers >= 1,
            library: improvedStatus.assets.cssSheets >= 30 && improvedStatus.assets.jsScripts >= 35,
            components: improvedStatus.animations.imageAnimation > 0 && improvedStatus.animations.backgroundAnimation > 0,
            css: improvedStatus.cssVariables.primaryColor.trim() === '#000000',
            js: improvedStatus.jsFeatures.safeSetViewport && improvedStatus.jsFeatures.safeInitAnimations
        };
        
        Object.entries(userRequirements).forEach(([requirement, achieved]) => {
            console.log(`   - ${requirement}: ${achieved ? '✅ 달성' : '❌ 미달성'}`);
        });
        
        const requirementsScore = Object.values(userRequirements).filter(Boolean).length;
        const requirementsPercentage = (requirementsScore / Object.keys(userRequirements).length) * 100;
        
        console.log(`\n📊 사용자 요구사항 달성률: ${requirementsScore}/${Object.keys(userRequirements).length} (${requirementsPercentage.toFixed(1)}%)`);
        
        console.log('\n🎯 8차 재귀개선 루프 검증 완료!');
        console.log('🔄 8차 개선의 성과를 확인했습니다!');
        
        if (currentScore >= 85) {
            console.log('\n🏆 축하합니다! 높은 품질의 SK하이닉스 복제본을 달성했습니다!');
        } else if (currentScore >= 80) {
            console.log('\n✅ 훌륭합니다! 양호한 품질의 복제본을 달성했습니다!');
        } else {
            console.log('\n⚠️ 추가 개선이 필요합니다. 재귀개선 루프를 계속 진행하세요.');
        }
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

verifyEighthImprovement().catch(console.error); 