const { chromium } = require('playwright');

async function finalComparison() {
    console.log('🔍 Final comparison: Original vs Perfect Clone...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    try {
        // 원본 사이트 분석
        console.log('📱 Analyzing original site...');
        await page.goto('https://ssd.skhynix.com/beetle_x31/', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        await page.waitForTimeout(5000);
        
        const originalData = await page.evaluate(() => {
            const bodyClasses = document.body.className;
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]').length;
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]').length;
            const title = document.querySelector('h2')?.textContent;
            const subtitle = document.querySelector('h4')?.textContent;
            const slider = document.querySelector('[class*="slider"]') !== null;
            
            return {
                bodyClasses,
                elementorSections,
                elementorWidgets,
                title,
                subtitle,
                slider
            };
        });
        
        console.log('📊 Original site data:');
        console.log(`   - Body classes: "${originalData.bodyClasses}"`);
        console.log(`   - Elementor sections: ${originalData.elementorSections}`);
        console.log(`   - Elementor widgets: ${originalData.elementorWidgets}`);
        console.log(`   - Title: "${originalData.title}"`);
        console.log(`   - Subtitle: "${originalData.subtitle}"`);
        console.log(`   - Slider: ${originalData.slider ? '✅' : '❌'}`);
        
        // 원본 스크린샷
        await page.screenshot({ 
            path: 'original-final.png',
            fullPage: true 
        });
        console.log('📸 Original screenshot saved');
        
        // 완벽한 복제본 분석
        console.log('📱 Analyzing perfect clone...');
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        const cloneData = await page.evaluate(() => {
            const bodyClasses = document.body.className;
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]').length;
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]').length;
            const title = document.querySelector('h2')?.textContent;
            const subtitle = document.querySelector('h4')?.textContent;
            const slider = document.querySelector('[class*="slider"]') !== null;
            
            return {
                bodyClasses,
                elementorSections,
                elementorWidgets,
                title,
                subtitle,
                slider
            };
        });
        
        console.log('📊 Perfect clone data:');
        console.log(`   - Body classes: "${cloneData.bodyClasses}"`);
        console.log(`   - Elementor sections: ${cloneData.elementorSections}`);
        console.log(`   - Elementor widgets: ${cloneData.elementorWidgets}`);
        console.log(`   - Title: "${cloneData.title}"`);
        console.log(`   - Subtitle: "${cloneData.subtitle}"`);
        console.log(`   - Slider: ${cloneData.slider ? '✅' : '❌'}`);
        
        // 복제본 스크린샷
        await page.screenshot({ 
            path: 'clone-final.png',
            fullPage: true 
        });
        console.log('📸 Clone screenshot saved');
        
        // 비교 분석
        console.log('🔍 Comparison Analysis:');
        
        const bodyClassesMatch = originalData.bodyClasses === cloneData.bodyClasses;
        const titleMatch = originalData.title === cloneData.title;
        const subtitleMatch = originalData.subtitle === cloneData.subtitle;
        const sliderMatch = originalData.slider === cloneData.slider;
        
        console.log(`   - Body classes match: ${bodyClassesMatch ? '✅' : '❌'}`);
        console.log(`   - Title match: ${titleMatch ? '✅' : '❌'}`);
        console.log(`   - Subtitle match: ${subtitleMatch ? '✅' : '❌'}`);
        console.log(`   - Slider match: ${sliderMatch ? '✅' : '❌'}`);
        
        // 전체 일치도 계산
        const totalMatches = [bodyClassesMatch, titleMatch, subtitleMatch, sliderMatch].filter(Boolean).length;
        const matchPercentage = (totalMatches / 4) * 100;
        
        console.log(`📊 Overall match: ${matchPercentage}% (${totalMatches}/4)`);
        
        if (matchPercentage >= 95) {
            console.log('🎉 EXCELLENT! Perfect clone achieved!');
        } else if (matchPercentage >= 80) {
            console.log('✅ GOOD! Clone is very close to original');
        } else {
            console.log('⚠️ NEEDS IMPROVEMENT! Clone differs significantly from original');
        }
        
        console.log('🎯 Final comparison completed!');
        
    } catch (error) {
        console.error('❌ Error during comparison:', error);
    } finally {
        await browser.close();
    }
}

finalComparison().catch(console.error); 