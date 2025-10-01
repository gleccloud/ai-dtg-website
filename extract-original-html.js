const { chromium } = require('playwright');
const fs = require('fs');

async function extractOriginalHtml() {
    console.log('🔍 Extracting original HTML structure...');
    
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
        
        // 전체 HTML 추출
        console.log('📄 Extracting full HTML...');
        const fullHtml = await page.content();
        
        // HTML 파일로 저장
        fs.writeFileSync('original-sk-hynix.html', fullHtml);
        console.log('💾 Full HTML saved to original-sk-hynix.html');
        
        // 주요 섹션들 추출
        console.log('🔍 Extracting key sections...');
        const sections = await page.evaluate(() => {
            const sections = document.querySelectorAll('section, .section, [class*="section"]');
            const extractedSections = [];
            
            sections.forEach((section, index) => {
                if (index < 10) { // 처음 10개 섹션만
                    extractedSections.push({
                        index: index + 1,
                        tagName: section.tagName,
                        className: section.className,
                        id: section.id,
                        innerHTML: section.outerHTML,
                        children: section.children.length
                    });
                }
            });
            
            return extractedSections;
        });
        
        // 섹션별로 파일 저장
        sections.forEach((section, index) => {
            const filename = `section-${index + 1}-${section.tagName.toLowerCase()}.html`;
            fs.writeFileSync(filename, section.innerHTML);
            console.log(`💾 Section ${index + 1} saved to ${filename}`);
        });
        
        // Elementor 구조 분석
        console.log('🏗️ Analyzing Elementor structure...');
        const elementorStructure = await page.evaluate(() => {
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]');
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]');
            
            return {
                sections: Array.from(elementorSections).map(section => ({
                    className: section.className,
                    id: section.id,
                    children: section.children.length
                })),
                widgets: Array.from(elementorWidgets).map(widget => ({
                    className: widget.className,
                    id: widget.id,
                    type: widget.querySelector('[class*="elementor-widget-"]')?.className || 'unknown'
                }))
            };
        });
        
        // Elementor 구조 저장
        fs.writeFileSync('elementor-structure.json', JSON.stringify(elementorStructure, null, 2));
        console.log('💾 Elementor structure saved to elementor-structure.json');
        
        // CSS 스타일 추출
        console.log('🎨 Extracting CSS styles...');
        const cssStyles = await page.evaluate(() => {
            const styles = document.querySelectorAll('link[rel="stylesheet"], style');
            const cssData = [];
            
            styles.forEach((style, index) => {
                if (style.tagName === 'LINK') {
                    cssData.push({
                        type: 'external',
                        href: style.href,
                        index: index
                    });
                } else if (style.tagName === 'STYLE') {
                    cssData.push({
                        type: 'inline',
                        content: style.textContent.substring(0, 200) + '...',
                        index: index
                    });
                }
            });
            
            return cssData;
        });
        
        // CSS 정보 저장
        fs.writeFileSync('css-styles.json', JSON.stringify(cssStyles, null, 2));
        console.log('💾 CSS styles info saved to css-styles.json');
        
        // JavaScript 파일들 추출
        console.log('⚡ Extracting JavaScript files...');
        const jsFiles = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script[src]');
            return Array.from(scripts).map(script => ({
                src: script.src,
                type: script.type || 'text/javascript'
            }));
        });
        
        // JavaScript 정보 저장
        fs.writeFileSync('javascript-files.json', JSON.stringify(jsFiles, null, 2));
        console.log('💾 JavaScript files info saved to javascript-files.json');
        
        console.log('🎯 HTML extraction completed!');
        
    } catch (error) {
        console.error('❌ Error during extraction:', error);
    } finally {
        await browser.close();
    }
}

extractOriginalHtml().catch(console.error); 