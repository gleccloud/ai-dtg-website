const { chromium } = require('playwright');

async function detailedTest() {
    console.log('🔍 Starting detailed website validation...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    try {
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        console.log('🔍 Detailed element analysis...');
        
        // DOM 구조 분석
        const domStructure = await page.evaluate(() => {
            const hero = document.querySelector('.section-masthead');
            const h1 = document.querySelector('h1');
            const slider = document.querySelector('.swiper-container');
            
            return {
                heroExists: !!hero,
                heroVisible: hero ? window.getComputedStyle(hero).display !== 'none' : false,
                h1Exists: !!h1,
                h1Visible: h1 ? window.getComputedStyle(h1).display !== 'none' : false,
                h1Text: h1 ? h1.textContent : null,
                h1Styles: h1 ? {
                    fontSize: window.getComputedStyle(h1).fontSize,
                    color: window.getComputedStyle(h1).color,
                    display: window.getComputedStyle(h1).display,
                    visibility: window.getComputedStyle(h1).visibility,
                    opacity: window.getComputedStyle(h1).opacity
                } : null,
                sliderExists: !!slider,
                sliderVisible: slider ? window.getComputedStyle(slider).display !== 'none' : false
            };
        });
        
        console.log('📊 DOM Structure Analysis:');
        console.log(`   - Hero section exists: ${domStructure.heroExists}`);
        console.log(`   - Hero section visible: ${domStructure.heroVisible}`);
        console.log(`   - H1 exists: ${domStructure.h1Exists}`);
        console.log(`   - H1 visible: ${domStructure.h1Visible}`);
        console.log(`   - H1 text: "${domStructure.h1Text}"`);
        
        if (domStructure.h1Styles) {
            console.log('   - H1 computed styles:');
            console.log(`     * Font size: ${domStructure.h1Styles.fontSize}`);
            console.log(`     * Color: ${domStructure.h1Styles.color}`);
            console.log(`     * Display: ${domStructure.h1Styles.display}`);
            console.log(`     * Visibility: ${domStructure.h1Styles.visibility}`);
            console.log(`     * Opacity: ${domStructure.h1Styles.opacity}`);
        }
        
        console.log(`   - Slider exists: ${domStructure.sliderExists}`);
        console.log(`   - Slider visible: ${domStructure.sliderVisible}`);
        
        // CSS 로딩 상태 확인
        const cssStatus = await page.evaluate(() => {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            const status = [];
            
            links.forEach(link => {
                const sheet = link.sheet;
                status.push({
                    href: link.href,
                    loaded: !!sheet,
                    rules: sheet ? sheet.cssRules.length : 0
                });
            });
            
            return status;
        });
        
        console.log('🎨 CSS Loading Status:');
        cssStatus.forEach((css, index) => {
            console.log(`   ${index + 1}. ${css.href.split('/').pop()}: ${css.loaded ? '✅ Loaded' : '❌ Failed'} (${css.rules} rules)`);
        });
        
        // JavaScript 실행 상태 확인
        const jsStatus = await page.evaluate(() => {
            return {
                jquery: typeof $ !== 'undefined',
                gsap: typeof gsap !== 'undefined',
                swiper: typeof Swiper !== 'undefined',
                scrollTrigger: typeof ScrollTrigger !== 'undefined'
            };
        });
        
        console.log('⚡ JavaScript Status:');
        console.log(`   - jQuery: ${jsStatus.jquery ? '✅ Loaded' : '❌ Not loaded'}`);
        console.log(`   - GSAP: ${jsStatus.gsap ? '✅ Loaded' : '❌ Not loaded'}`);
        console.log(`   - Swiper: ${jsStatus.swiper ? '✅ Loaded' : '❌ Not loaded'}`);
        console.log(`   - ScrollTrigger: ${jsStatus.scrollTrigger ? '✅ Loaded' : '❌ Not loaded'}`);
        
        // 실제 렌더링 확인
        const rendering = await page.evaluate(() => {
            const h1 = document.querySelector('h1');
            if (!h1) return { rendered: false, reason: 'Element not found' };
            
            const rect = h1.getBoundingClientRect();
            const styles = window.getComputedStyle(h1);
            
            return {
                rendered: true,
                dimensions: {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left
                },
                styles: {
                    fontSize: styles.fontSize,
                    color: styles.color,
                    backgroundColor: styles.backgroundColor,
                    display: styles.display,
                    visibility: styles.visibility,
                    opacity: styles.opacity,
                    position: styles.position,
                    zIndex: styles.zIndex
                }
            };
        });
        
        if (rendering.rendered) {
            console.log('🎯 H1 Rendering Details:');
            console.log(`   - Dimensions: ${rendering.dimensions.width}x${rendering.dimensions.height}`);
            console.log(`   - Position: (${rendering.dimensions.left}, ${rendering.dimensions.top})`);
            console.log(`   - Styles: ${rendering.styles.fontSize}, ${rendering.styles.color}`);
        } else {
            console.log(`❌ H1 not rendered: ${rendering.reason}`);
        }
        
        // 스크린샷 촬영
        await page.screenshot({ 
            path: 'detailed-analysis.png',
            fullPage: true 
        });
        console.log('📸 Detailed analysis screenshot saved');
        
        console.log('🎯 Detailed validation completed!');
        
    } catch (error) {
        console.error('❌ Error during detailed validation:', error);
    } finally {
        await browser.close();
    }
}

detailedTest().catch(console.error); 