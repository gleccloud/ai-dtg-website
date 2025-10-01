const { chromium } = require('playwright');

async function testWebsite() {
    console.log('🚀 Starting website validation with Playwright...');
    
    const browser = await chromium.launch({ 
        headless: false, // 브라우저를 보이게 실행
        slowMo: 1000 // 각 동작 사이에 1초 지연
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    try {
        console.log('📱 Navigating to website...');
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
        
        // 페이지 로딩 대기
        await page.waitForTimeout(3000);
        
        console.log('📸 Taking screenshot...');
        await page.screenshot({ 
            path: 'website-screenshot.png',
            fullPage: true 
        });
        
        // 기본 요소들이 로드되었는지 확인
        console.log('🔍 Checking page elements...');
        
        // Hero section 확인
        const heroSection = await page.locator('.section-masthead');
        if (await heroSection.count() > 0) {
            console.log('✅ Hero section found');
        } else {
            console.log('❌ Hero section not found');
        }
        
        // 제목 확인
        const title = await page.locator('h1');
        if (await title.count() > 0) {
            const titleText = await title.textContent();
            console.log(`✅ Title found: "${titleText}"`);
        } else {
            console.log('❌ Title not found');
        }
        
        // 슬라이더 확인
        const slider = await page.locator('.swiper-container');
        if (await slider.count() > 0) {
            console.log('✅ Slider found');
        } else {
            console.log('❌ Slider not found');
        }
        
        // 이미지 확인
        const images = await page.locator('img');
        const imageCount = await images.count();
        console.log(`📷 Found ${imageCount} images`);
        
        // CSS 로딩 확인
        console.log('🎨 Checking CSS loading...');
        const styles = await page.locator('link[rel="stylesheet"]');
        const styleCount = await styles.count();
        console.log(`🎨 Found ${styleCount} stylesheets`);
        
        // JavaScript 로딩 확인
        console.log('⚡ Checking JavaScript loading...');
        const scripts = await page.locator('script[src]');
        const scriptCount = await scripts.count();
        console.log(`⚡ Found ${scriptCount} scripts`);
        
        // 콘솔 에러 확인
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        await page.waitForTimeout(2000);
        
        if (consoleErrors.length > 0) {
            console.log('⚠️ Console errors found:');
            consoleErrors.forEach(error => console.log(`   - ${error}`));
        } else {
            console.log('✅ No console errors');
        }
        
        // 페이지 성능 메트릭
        const performance = await page.evaluate(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
            };
        });
        
        console.log('📊 Performance metrics:');
        console.log(`   - Load time: ${performance.loadTime}ms`);
        console.log(`   - DOM Content Loaded: ${performance.domContentLoaded}ms`);
        console.log(`   - First Paint: ${performance.firstPaint}ms`);
        
        // 반응형 테스트
        console.log('📱 Testing responsive design...');
        
        // 모바일 뷰포트
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'mobile-view.png' });
        console.log('📱 Mobile screenshot saved');
        
        // 태블릿 뷰포트
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'tablet-view.png' });
        console.log('📱 Tablet screenshot saved');
        
        // 데스크톱 뷰포트로 복원
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        console.log('🎯 Website validation completed!');
        
    } catch (error) {
        console.error('❌ Error during validation:', error);
    } finally {
        await browser.close();
    }
}

// 스크립트 실행
testWebsite().catch(console.error); 