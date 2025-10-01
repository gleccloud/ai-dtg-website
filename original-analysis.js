const { chromium } = require('playwright');

async function analyzeOriginal() {
    console.log('🔍 Analyzing original SK hynix website...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    try {
        // 원본 사이트 접속
        console.log('📱 Navigating to original SK hynix site...');
        await page.goto('https://ssd.skhynix.com/beetle_x31/', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        await page.waitForTimeout(5000);
        
        // 전체 페이지 스크린샷
        console.log('📸 Taking full page screenshot...');
        await page.screenshot({ 
            path: 'original-sk-hynix-full.png',
            fullPage: true 
        });
        
        // DOM 구조 분석
        console.log('🔍 Analyzing DOM structure...');
        const domAnalysis = await page.evaluate(() => {
            // 전체 섹션 수
            const sections = document.querySelectorAll('section, .section');
            
            // Elementor 구조
            const elementorSections = document.querySelectorAll('[class*="elementor"]');
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]');
            
            // 애니메이션 요소
            const animatedElements = document.querySelectorAll('[class*="animate"], [class*="animation"]');
            const dataElements = document.querySelectorAll('[data-arts-os-animation], [data-arts-cursor]');
            
            // 이미지 슬라이더
            const sliders = document.querySelectorAll('[class*="slider"], [class*="swiper"], [class*="carousel"]');
            
            // 커서 관련
            const cursorElements = document.querySelectorAll('[class*="cursor"], [class*="mouse"]');
            
            // GSAP 관련
            const gsapElements = document.querySelectorAll('[data-gsap]');
            
            return {
                totalSections: sections.length,
                elementorSections: elementorSections.length,
                elementorWidgets: elementorWidgets.length,
                animatedElements: animatedElements.length + dataElements.length,
                sliders: sliders.length,
                cursorElements: cursorElements.length,
                gsapElements: gsapElements.length,
                sections: Array.from(sections).map(section => ({
                    className: section.className,
                    id: section.id,
                    tagName: section.tagName
                }))
            };
        });
        
        console.log('📊 Original Site DOM Analysis:');
        console.log(`   - Total sections: ${domAnalysis.totalSections}`);
        console.log(`   - Elementor sections: ${domAnalysis.elementorSections}`);
        console.log(`   - Elementor widgets: ${domAnalysis.elementorWidgets}`);
        console.log(`   - Animated elements: ${domAnalysis.animatedElements}`);
        console.log(`   - Sliders: ${domAnalysis.sliders}`);
        console.log(`   - Cursor elements: ${domAnalysis.cursorElements}`);
        console.log(`   - GSAP elements: ${domAnalysis.gsapElements}`);
        
        // CSS 클래스 분석
        console.log('🎨 Analyzing CSS classes...');
        const cssAnalysis = await page.evaluate(() => {
            const allElements = document.querySelectorAll('*');
            const classes = new Set();
            
            allElements.forEach(el => {
                if (el.className && typeof el.className === 'string') {
                    el.className.split(' ').forEach(cls => {
                        if (cls.trim()) classes.add(cls.trim());
                    });
                }
            });
            
            return Array.from(classes).sort();
        });
        
        console.log(`🎨 Total unique CSS classes: ${cssAnalysis.length}`);
        
        // 주요 클래스들 저장
        const fs = require('fs');
        fs.writeFileSync('original-css-classes.json', JSON.stringify(cssAnalysis, null, 2));
        console.log('💾 CSS classes saved to original-css-classes.json');
        
        // JavaScript 라이브러리 확인
        console.log('⚡ Checking JavaScript libraries...');
        const jsLibraries = await page.evaluate(() => {
            return {
                jquery: typeof $ !== 'undefined',
                gsap: typeof gsap !== 'undefined',
                swiper: typeof Swiper !== 'undefined',
                scrollTrigger: typeof ScrollTrigger !== 'undefined',
                waypoints: typeof Waypoint !== 'undefined',
                lottie: typeof lottie !== 'undefined'
            };
        });
        
        console.log('⚡ JavaScript Libraries:');
        Object.entries(jsLibraries).forEach(([lib, loaded]) => {
            console.log(`   - ${lib}: ${loaded ? '✅ Loaded' : '❌ Not loaded'}`);
        });
        
        // 페이지 성능 메트릭
        const performance = await page.evaluate(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
                resourceCount: performance.getEntriesByType('resource').length
            };
        });
        
        console.log('📊 Performance Metrics:');
        console.log(`   - Load time: ${performance.loadTime}ms`);
        console.log(`   - DOM Content Loaded: ${performance.domContentLoaded}ms`);
        console.log(`   - First Paint: ${performance.firstPaint}ms`);
        console.log(`   - Resource count: ${performance.resourceCount}`);
        
        // 반응형 테스트
        console.log('📱 Testing responsive design...');
        
        // 모바일 뷰포트
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'original-mobile.png' });
        
        // 태블릿 뷰포트
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'original-tablet.png' });
        
        // 데스크톱으로 복원
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        console.log('🎯 Original site analysis completed!');
        
    } catch (error) {
        console.error('❌ Error during analysis:', error);
    } finally {
        await browser.close();
    }
}

analyzeOriginal().catch(console.error); 