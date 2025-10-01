const { chromium } = require('playwright');

async function testPerfectClone() {
    console.log('🚀 Testing perfect SK hynix clone...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        console.log('🔍 Testing perfect clone elements...');
        
        // Body classes 확인
        const bodyClasses = await page.evaluate(() => {
            return document.body.className;
        });
        
        console.log(`📋 Body classes: "${bodyClasses}"`);
        
        // Elementor 구조 확인
        const elementorStructure = await page.evaluate(() => {
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]');
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]');
            
            return {
                sections: elementorSections.length,
                widgets: elementorWidgets.length
            };
        });
        
        console.log(`🏗️ Elementor structure: ${elementorStructure.sections} sections, ${elementorStructure.widgets} widgets`);
        
        // Hero 섹션 확인
        const heroSection = await page.evaluate(() => {
            const hero = document.querySelector('[class*="elementor-element-3f7988f6"]');
            const video = document.querySelector('video');
            const title = document.querySelector('h2');
            const subtitle = document.querySelector('h4');
            
            return {
                exists: !!hero,
                video: !!video,
                title: title ? title.textContent : null,
                subtitle: subtitle ? subtitle.textContent : null
            };
        });
        
        console.log('🎯 Hero section:');
        console.log(`   - Exists: ${heroSection.exists ? '✅' : '❌'}`);
        console.log(`   - Video: ${heroSection.video ? '✅' : '❌'}`);
        console.log(`   - Title: "${heroSection.title}"`);
        console.log(`   - Subtitle: "${heroSection.subtitle}"`);
        
        // 슬라이더 확인
        const sliderSection = await page.evaluate(() => {
            const slider = document.querySelector('[class*="elementor-element-35193397"]');
            const swiper = document.querySelector('.swiper-container');
            const images = document.querySelectorAll('img');
            
            return {
                exists: !!slider,
                swiper: !!swiper,
                imageCount: images.length
            };
        });
        
        console.log('🖼️ Slider section:');
        console.log(`   - Exists: ${sliderSection.exists ? '✅' : '❌'}`);
        console.log(`   - Swiper: ${sliderSection.swiper ? '✅' : '❌'}`);
        console.log(`   - Images: ${sliderSection.imageCount}`);
        
        // PC/모바일 버전 확인
        const responsiveVersions = await page.evaluate(() => {
            const pc = document.querySelector('.pc');
            const mobile = document.querySelector('.mobile');
            
            return {
                pc: !!pc,
                mobile: !!mobile
            };
        });
        
        console.log('📱 Responsive versions:');
        console.log(`   - PC: ${responsiveVersions.pc ? '✅' : '❌'}`);
        console.log(`   - Mobile: ${responsiveVersions.mobile ? '✅' : '❌'}`);
        
        // 스크린샷 촬영
        await page.screenshot({ 
            path: 'perfect-clone-test.png',
            fullPage: true 
        });
        console.log('📸 Screenshot saved');
        
        // 반응형 테스트
        console.log('📱 Testing responsive design...');
        
        // 모바일 뷰포트
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'perfect-clone-mobile.png' });
        
        // 태블릿 뷰포트
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'perfect-clone-tablet.png' });
        
        // 데스크톱으로 복원
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        console.log('🎯 Perfect clone test completed!');
        
    } catch (error) {
        console.error('❌ Error during test:', error);
    } finally {
        await browser.close();
    }
}

testPerfectClone().catch(console.error); 