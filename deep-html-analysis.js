const { chromium } = require('playwright');

async function deepHtmlAnalysis() {
    console.log('🔍 Deep HTML structure analysis...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    try {
        await page.goto('https://ssd.skhynix.com/beetle_x31/', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        await page.waitForTimeout(5000);
        
        // 실제 HTML 구조 분석
        console.log('🔍 Analyzing actual HTML structure...');
        const htmlStructure = await page.evaluate(() => {
            // 메인 컨테이너 찾기
            const mainContainer = document.querySelector('main, .main, #main');
            const body = document.body;
            
            // 첫 번째 섹션의 실제 구조
            const firstSection = document.querySelector('section, .section, [class*="section"]');
            
            // Hero 영역 찾기
            const heroSection = document.querySelector('.section-masthead, .hero, [class*="hero"], [class*="masthead"]');
            
            // 슬라이더 영역 찾기
            const sliderSection = document.querySelector('[class*="slider"], [class*="swiper"], [class*="carousel"]');
            
            // 커서 관련 요소
            const cursorElement = document.querySelector('[class*="cursor"], [class*="mouse"]');
            
            return {
                bodyClasses: body.className,
                mainContainer: mainContainer ? {
                    tagName: mainContainer.tagName,
                    className: mainContainer.className,
                    id: mainContainer.id
                } : null,
                firstSection: firstSection ? {
                    tagName: firstSection.tagName,
                    className: firstSection.className,
                    id: firstSection.id,
                    innerHTML: firstSection.innerHTML.substring(0, 500) + '...'
                } : null,
                heroSection: heroSection ? {
                    tagName: heroSection.tagName,
                    className: heroSection.className,
                    id: heroSection.id,
                    innerHTML: heroSection.innerHTML.substring(0, 500) + '...'
                } : null,
                sliderSection: sliderSection ? {
                    tagName: sliderSection.tagName,
                    className: sliderSection.className,
                    id: sliderSection.id,
                    innerHTML: sliderSection.innerHTML.substring(0, 500) + '...'
                } : null,
                cursorElement: cursorElement ? {
                    tagName: cursorElement.tagName,
                    className: cursorElement.className,
                    id: cursorElement.id
                } : null
            };
        });
        
        console.log('📊 HTML Structure Analysis:');
        console.log(`   - Body classes: "${htmlStructure.bodyClasses}"`);
        
        if (htmlStructure.mainContainer) {
            console.log(`   - Main container: ${htmlStructure.mainContainer.tagName}.${htmlStructure.mainContainer.className}#${htmlStructure.mainContainer.id}`);
        }
        
        if (htmlStructure.firstSection) {
            console.log(`   - First section: ${htmlStructure.firstSection.tagName}.${htmlStructure.firstSection.className}`);
            console.log(`     Content preview: ${htmlStructure.firstSection.innerHTML.substring(0, 100)}...`);
        }
        
        if (htmlStructure.heroSection) {
            console.log(`   - Hero section: ${htmlStructure.heroSection.tagName}.${htmlStructure.heroSection.className}`);
            console.log(`     Content preview: ${htmlStructure.heroSection.innerHTML.substring(0, 100)}...`);
        }
        
        if (htmlStructure.sliderSection) {
            console.log(`   - Slider section: ${htmlStructure.sliderSection.tagName}.${htmlStructure.sliderSection.className}`);
            console.log(`     Content preview: ${htmlStructure.sliderSection.innerHTML.substring(0, 100)}...`);
        }
        
        if (htmlStructure.cursorElement) {
            console.log(`   - Cursor element: ${htmlStructure.cursorElement.tagName}.${htmlStructure.cursorElement.className}`);
        }
        
        // 실제 사용되는 CSS 클래스들
        console.log('🎨 Analyzing actual CSS usage...');
        const actualCssUsage = await page.evaluate(() => {
            const sections = document.querySelectorAll('section, .section, [class*="section"]');
            const sectionClasses = [];
            
            sections.forEach((section, index) => {
                if (index < 5) { // 처음 5개 섹션만 분석
                    sectionClasses.push({
                        index: index + 1,
                        tagName: section.tagName,
                        className: section.className,
                        id: section.id,
                        children: section.children.length,
                        elementorWidgets: section.querySelectorAll('[class*="elementor-widget"]').length
                    });
                }
            });
            
            return sectionClasses;
        });
        
        console.log('📋 Section Analysis (First 5):');
        actualCssUsage.forEach(section => {
            console.log(`   ${section.index}. ${section.tagName}.${section.className} (${section.children} children, ${section.elementorWidgets} widgets)`);
        });
        
        // 실제 이미지 슬라이더 구조
        console.log('🖼️ Analyzing image slider structure...');
        const sliderStructure = await page.evaluate(() => {
            const slider = document.querySelector('[class*="slider"], [class*="swiper"], [class*="carousel"]');
            if (!slider) return null;
            
            const slides = slider.querySelectorAll('[class*="slide"], [class*="swiper-slide"]');
            const images = slider.querySelectorAll('img');
            
            return {
                sliderClass: slider.className,
                slideCount: slides.length,
                imageCount: images.length,
                images: Array.from(images).map(img => ({
                    src: img.src,
                    alt: img.alt,
                    className: img.className
                }))
            };
        });
        
        if (sliderStructure) {
            console.log('🖼️ Slider Structure:');
            console.log(`   - Slider class: ${sliderStructure.sliderClass}`);
            console.log(`   - Slide count: ${sliderStructure.slideCount}`);
            console.log(`   - Image count: ${sliderStructure.imageCount}`);
            console.log(`   - Images: ${sliderStructure.images.map(img => img.src.split('/').pop()).join(', ')}`);
        }
        
        // 스크린샷 저장
        await page.screenshot({ 
            path: 'deep-analysis-result.png',
            fullPage: true 
        });
        console.log('📸 Deep analysis screenshot saved');
        
        console.log('🎯 Deep HTML analysis completed!');
        
    } catch (error) {
        console.error('❌ Error during deep analysis:', error);
    } finally {
        await browser.close();
    }
}

deepHtmlAnalysis().catch(console.error); 