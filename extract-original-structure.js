const { chromium } = require('playwright');

async function extractOriginalStructure() {
    console.log('🔍 원본 SK하이닉스 사이트 구조 추출 시작...');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 원본 사이트 접속
        console.log('📱 원본 사이트 접속 중...');
        await page.goto('https://ssd.skhynix.com/beetle_x31/', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 전체 HTML 구조 추출
        console.log('🔍 HTML 구조 추출 중...');
        const originalStructure = await page.evaluate(() => {
            // 전체 HTML
            const fullHTML = document.documentElement.outerHTML;
            
            // Body 내용
            const bodyContent = document.body.innerHTML;
            
            // Head 내용
            const headContent = document.head.innerHTML;
            
            // Elementor 섹션들
            const elementorSections = Array.from(document.querySelectorAll('[class*="elementor-section"]')).map(section => {
                const sectionClasses = section.className;
                const sectionId = section.getAttribute('data-id');
                const sectionType = section.getAttribute('data-element_type');
                const sectionContent = section.innerHTML.substring(0, 500); // 처음 500자만
                
                return {
                    classes: sectionClasses,
                    id: sectionId,
                    type: sectionType,
                    content: sectionContent
                };
            });
            
            // Elementor 위젯들
            const elementorWidgets = Array.from(document.querySelectorAll('[class*="elementor-widget"]')).map(widget => {
                const widgetClasses = widget.className;
                const widgetId = widget.getAttribute('data-id');
                const widgetType = widget.getAttribute('data-widget_type');
                const widgetContent = widget.innerHTML.substring(0, 300); // 처음 300자만
                
                return {
                    classes: widgetClasses,
                    id: widgetId,
                    type: widgetType,
                    content: widgetContent
                };
            });
            
            // CSS 파일들
            const cssFiles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => ({
                href: link.href,
                media: link.media,
                type: link.type
            }));
            
            // JavaScript 파일들
            const jsFiles = Array.from(document.querySelectorAll('script[src]')).map(script => ({
                src: script.src,
                type: script.type,
                async: script.async,
                defer: script.defer
            }));
            
            // 메타 태그들
            const metaTags = Array.from(document.querySelectorAll('meta')).map(meta => ({
                name: meta.getAttribute('name'),
                content: meta.getAttribute('content'),
                property: meta.getAttribute('property')
            }));
            
            return {
                fullHTML,
                bodyContent,
                headContent,
                elementorSections,
                elementorWidgets,
                cssFiles,
                jsFiles,
                metaTags
            };
        });
        
        console.log('📊 원본 구조 분석 결과:');
        console.log(`   - Elementor sections: ${originalStructure.elementorSections.length}개`);
        console.log(`   - Elementor widgets: ${originalStructure.elementorWidgets.length}개`);
        console.log(`   - CSS files: ${originalStructure.cssFiles.length}개`);
        console.log(`   - JS files: ${originalStructure.jsFiles.length}개`);
        console.log(`   - Meta tags: ${originalStructure.metaTags.length}개`);
        
        // 상세 분석
        console.log('\n🔍 Elementor Sections 상세 분석:');
        originalStructure.elementorSections.forEach((section, index) => {
            console.log(`   ${index + 1}. ID: ${section.id}, Type: ${section.type}`);
            console.log(`      Classes: ${section.classes}`);
            console.log(`      Content preview: ${section.content.substring(0, 100)}...`);
        });
        
        console.log('\n🔍 Elementor Widgets 상세 분석:');
        originalStructure.elementorWidgets.forEach((widget, index) => {
            console.log(`   ${index + 1}. ID: ${widget.id}, Type: ${widget.type}`);
            console.log(`      Classes: ${widget.classes}`);
            console.log(`      Content preview: ${widget.content.substring(0, 100)}...`);
        });
        
        console.log('\n🔍 CSS Files 상세 분석:');
        originalStructure.cssFiles.forEach((css, index) => {
            console.log(`   ${index + 1}. ${css.href}`);
            console.log(`      Media: ${css.media || 'all'}, Type: ${css.type || 'text/css'}`);
        });
        
        console.log('\n🔍 JavaScript Files 상세 분석:');
        originalStructure.jsFiles.forEach((js, index) => {
            console.log(`   ${index + 1}. ${js.src}`);
            console.log(`      Type: ${js.type || 'text/javascript'}, Async: ${js.async}, Defer: ${js.defer}`);
        });
        
        // 파일로 저장
        const fs = require('fs');
        fs.writeFileSync('original-structure-analysis.json', JSON.stringify(originalStructure, null, 2));
        console.log('\n💾 원본 구조 분석 결과가 original-structure-analysis.json에 저장되었습니다.');
        
        // HTML 파일로도 저장
        fs.writeFileSync('original-sk-hynix.html', originalStructure.fullHTML);
        console.log('💾 원본 HTML이 original-sk-hynix.html에 저장되었습니다.');
        
        console.log('\n🎯 원본 구조 추출 완료!');
        console.log('🔄 다음 단계: 완벽한 복제본 생성');
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

extractOriginalStructure().catch(console.error); 