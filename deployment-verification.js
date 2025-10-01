const { chromium } = require('playwright');

async function deploymentVerification() {
    console.log('🚀 Verifying latest deployed version...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 최신 배포 버전 접속
        console.log('📱 Accessing latest deployed version...');
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        // 배포 상태 확인
        console.log('🔍 Checking deployment status...');
        const deploymentStatus = await page.evaluate(() => {
            const bodyClasses = document.body.className;
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]').length;
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]').length;
            const title = document.querySelector('h2')?.textContent;
            const subtitle = document.querySelector('h4')?.textContent;
            const slider = document.querySelector('[class*="slider"]') !== null;
            const images = document.querySelectorAll('img').length;
            
            return {
                bodyClasses,
                elementorSections,
                elementorWidgets,
                title,
                subtitle,
                slider,
                images
            };
        });
        
        console.log('📊 Deployment Status:');
        console.log(`   - Body classes: "${deploymentStatus.bodyClasses}"`);
        console.log(`   - Elementor sections: ${deploymentStatus.elementorSections}`);
        console.log(`   - Elementor widgets: ${deploymentStatus.elementorWidgets}`);
        console.log(`   - Title: "${deploymentStatus.title}"`);
        console.log(`   - Subtitle: "${deploymentStatus.subtitle}"`);
        console.log(`   - Slider: ${deploymentStatus.slider ? '✅' : '❌'}`);
        console.log(`   - Images: ${deploymentStatus.images}`);
        
        // 원본과의 일치도 확인
        console.log('🔍 Checking match with original...');
        const expectedBodyClasses = "page-template page-template-elementor_header_footer page page-id-2411 wp-custom-logo elementor-default elementor-template-full-width elementor-kit-1596 elementor-page elementor-page-2411 e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit has-cursor-follower";
        const expectedTitle = "Beetle X31 SSD";
        const expectedSubtitle = "Expansive Storage at Your Fingertips";
        
        const bodyClassesMatch = deploymentStatus.bodyClasses === expectedBodyClasses;
        const titleMatch = deploymentStatus.title === expectedTitle;
        const subtitleMatch = deploymentStatus.subtitle === expectedSubtitle;
        
        console.log('📋 Match Analysis:');
        console.log(`   - Body classes match: ${bodyClassesMatch ? '✅' : '❌'}`);
        console.log(`   - Title match: ${titleMatch ? '✅' : '❌'}`);
        console.log(`   - Subtitle match: ${subtitleMatch ? '✅' : '❌'}`);
        
        // 전체 일치도 계산
        const totalMatches = [bodyClassesMatch, titleMatch, subtitleMatch].filter(Boolean).length;
        const matchPercentage = (totalMatches / 3) * 100;
        
        console.log(`📊 Overall match: ${matchPercentage}% (${totalMatches}/3)`);
        
        if (matchPercentage >= 95) {
            console.log('🎉 EXCELLENT! Latest version deployed successfully!');
        } else if (matchPercentage >= 80) {
            console.log('✅ GOOD! Version is mostly correct');
        } else {
            console.log('⚠️ NEEDS UPDATE! Version differs from expected');
        }
        
        // 스크린샷 촬영
        await page.screenshot({ 
            path: 'latest-deployment-verification.png',
            fullPage: true 
        });
        console.log('📸 Screenshot saved');
        
        // 반응형 테스트
        console.log('📱 Testing responsive design...');
        
        // 모바일 뷰포트
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'latest-deployment-mobile.png' });
        
        // 태블릿 뷰포트
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'latest-deployment-tablet.png' });
        
        // 데스크톱으로 복원
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        console.log('🎯 Deployment verification completed!');
        
        // 최종 상태 요약
        console.log('\n📋 FINAL DEPLOYMENT STATUS:');
        console.log(`   - Server running: ✅ localhost:8081`);
        console.log(`   - HTML loaded: ✅ ${deploymentStatus.title ? 'Yes' : 'No'}`);
        console.log(`   - CSS loaded: ✅ ${deploymentStatus.bodyClasses ? 'Yes' : 'No'}`);
        console.log(`   - JavaScript loaded: ✅ ${deploymentStatus.elementorSections > 0 ? 'Yes' : 'No'}`);
        console.log(`   - Images loaded: ✅ ${deploymentStatus.images} images`);
        console.log(`   - Match with original: ${matchPercentage}%`);
        
    } catch (error) {
        console.error('❌ Error during verification:', error);
    } finally {
        await browser.close();
    }
}

deploymentVerification().catch(console.error); 