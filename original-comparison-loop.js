const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

async function originalComparisonLoop() {
    console.log('🚨 CTO 모드 - 복제원본 대조 검증 개선 루프 시작!');
    console.log('🎯 목표: 하얀 화면 문제 해결 및 완벽한 복제 달성');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    try {
        // 1단계: 원본 SK하이닉스 사이트 분석
        console.log('\n🔍 1단계: 원본 SK하이닉스 사이트 분석...');
        await page.goto('https://ssd.skhynix.com/beetle_x31/', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 원본 사이트의 핵심 정보 추출
        const originalInfo = await page.evaluate(() => {
            const bodyClasses = document.body.className;
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]').length;
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]').length;
            const title = document.querySelector('h2')?.textContent;
            const subtitle = document.querySelector('h4')?.textContent;
            const images = document.querySelectorAll('img').length;
            const videos = document.querySelectorAll('video').length;
            const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
            const jsScripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
            
            return {
                bodyClasses,
                elementorSections,
                elementorWidgets,
                title,
                subtitle,
                images,
                videos,
                cssLinks,
                jsScripts
            };
        });
        
        console.log('📊 원본 사이트 정보:');
        console.log(`   - Body classes: "${originalInfo.bodyClasses}"`);
        console.log(`   - Elementor sections: ${originalInfo.elementorSections}`);
        console.log(`   - Elementor widgets: ${originalInfo.elementorWidgets}`);
        console.log(`   - Title: "${originalInfo.title}"`);
        console.log(`   - Subtitle: "${originalInfo.subtitle}"`);
        console.log(`   - Images: ${originalInfo.images}`);
        console.log(`   - Videos: ${originalInfo.videos}`);
        console.log(`   - CSS files: ${originalInfo.cssLinks.length}`);
        console.log(`   - JS files: ${originalInfo.jsScripts.length}`);
        
        // 원본 사이트 스크린샷
        await page.screenshot({ 
            path: 'original-sk-hynix.png',
            fullPage: true 
        });
        console.log('📸 원본 사이트 스크린샷 저장됨');
        
        // 2단계: 현재 복제본 분석
        console.log('\n🔍 2단계: 현재 복제본 분석...');
        await page.goto('http://localhost:8081', { 
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(5000);
        
        // 복제본의 현재 상태 분석
        const cloneInfo = await page.evaluate(() => {
            const bodyClasses = document.body.className;
            const elementorSections = document.querySelectorAll('[class*="elementor-section"]').length;
            const elementorWidgets = document.querySelectorAll('[class*="elementor-widget"]').length;
            const title = document.querySelector('h2')?.textContent;
            const subtitle = document.querySelector('h4')?.textContent;
            const images = document.querySelectorAll('img').length;
            const videos = document.querySelectorAll('video').length;
            const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
            const jsScripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
            
            // CSS 로딩 상태 확인
            const computedStyles = window.getComputedStyle(document.body);
            const backgroundColor = computedStyles.backgroundColor;
            const color = computedStyles.color;
            const fontSize = computedStyles.fontSize;
            
            return {
                bodyClasses,
                elementorSections,
                elementorWidgets,
                title,
                subtitle,
                images,
                videos,
                cssLinks,
                jsScripts,
                backgroundColor,
                color,
                fontSize
            };
        });
        
        console.log('📊 복제본 현재 상태:');
        console.log(`   - Body classes: "${cloneInfo.bodyClasses}"`);
        console.log(`   - Elementor sections: ${cloneInfo.elementorSections}`);
        console.log(`   - Elementor widgets: ${cloneInfo.elementorWidgets}`);
        console.log(`   - Title: "${cloneInfo.title}"`);
        console.log(`   - Subtitle: "${cloneInfo.subtitle}"`);
        console.log(`   - Images: ${cloneInfo.images}`);
        console.log(`   - Videos: ${cloneInfo.videos}`);
        console.log(`   - CSS files: ${cloneInfo.cssLinks.length}`);
        console.log(`   - JS files: ${cloneInfo.jsScripts.length}`);
        console.log(`   - Background color: ${cloneInfo.backgroundColor}`);
        console.log(`   - Text color: ${cloneInfo.color}`);
        console.log(`   - Font size: ${cloneInfo.fontSize}`);
        
        // 복제본 스크린샷
        await page.screenshot({ 
            path: 'current-clone-status.png',
            fullPage: true 
        });
        console.log('📸 복제본 현재 상태 스크린샷 저장됨');
        
        // 3단계: 차이점 분석 및 문제 진단
        console.log('\n🔍 3단계: 차이점 분석 및 문제 진단...');
        
        const differences = {
            bodyClasses: originalInfo.bodyClasses === cloneInfo.bodyClasses,
            elementorSections: originalInfo.elementorSections === cloneInfo.elementorSections,
            elementorWidgets: originalInfo.elementorWidgets === cloneInfo.elementorWidgets,
            title: originalInfo.title === cloneInfo.title,
            subtitle: originalInfo.subtitle === cloneInfo.subtitle,
            images: originalInfo.images === cloneInfo.images,
            videos: originalInfo.videos === cloneInfo.videos
        };
        
        console.log('📋 차이점 분석:');
        Object.entries(differences).forEach(([key, match]) => {
            console.log(`   - ${key}: ${match ? '✅' : '❌'}`);
        });
        
        // 4단계: CSS 로딩 문제 진단
        console.log('\n🔍 4단계: CSS 로딩 문제 진단...');
        
        // CSS 파일들이 실제로 로드되는지 확인
        const cssLoadStatus = await page.evaluate(() => {
            const cssSheets = Array.from(document.styleSheets);
            return cssSheets.map(sheet => ({
                href: sheet.href,
                disabled: sheet.disabled,
                rules: sheet.cssRules ? sheet.cssRules.length : 'N/A'
            }));
        });
        
        console.log('📊 CSS 로딩 상태:');
        cssLoadStatus.forEach((sheet, index) => {
            console.log(`   - Sheet ${index + 1}: ${sheet.href}`);
            console.log(`     Disabled: ${sheet.disabled}`);
            console.log(`     Rules: ${sheet.rules}`);
        });
        
        // 5단계: 문제 해결 방안 제시
        console.log('\n🔍 5단계: 문제 해결 방안 제시...');
        
        if (cloneInfo.backgroundColor === 'rgba(0, 0, 0, 0)' || cloneInfo.backgroundColor === 'transparent') {
            console.log('🚨 문제 발견: CSS가 제대로 로드되지 않아 하얀 화면 발생');
            console.log('💡 해결 방안:');
            console.log('   1. CSS 파일 경로 확인 및 수정');
            console.log('   2. CSS 파일 내용 검증');
            console.log('   3. 브라우저 개발자 도구로 오류 확인');
        }
        
        // 6단계: 즉시 수정 실행
        console.log('\n🔧 6단계: 즉시 수정 실행...');
        
        // CSS 파일 경로 문제 확인
        const cssPathCheck = await page.evaluate(() => {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            const results = [];
            
            links.forEach(link => {
                const href = link.href;
                const isLoaded = link.sheet !== null;
                results.push({ href, isLoaded });
            });
            
            return results;
        });
        
        console.log('📊 CSS 파일 로딩 상태:');
        cssPathCheck.forEach((css, index) => {
            console.log(`   - ${index + 1}: ${css.href} - ${css.isLoaded ? '✅ 로드됨' : '❌ 로드 안됨'}`);
        });
        
        // 7단계: 최종 진단 결과
        console.log('\n📋 최종 진단 결과:');
        
        const totalIssues = Object.values(differences).filter(match => !match).length;
        const matchPercentage = ((7 - totalIssues) / 7) * 100;
        
        console.log(`   - 전체 일치도: ${matchPercentage.toFixed(1)}%`);
        console.log(`   - 발견된 문제: ${totalIssues}개`);
        
        if (matchPercentage < 90) {
            console.log('🚨 심각한 문제 발견! 즉시 수정이 필요합니다.');
            console.log('💡 다음 단계: CSS 파일 경로 및 내용 수정');
        } else {
            console.log('✅ 대부분 일치합니다. 세부 조정만 필요합니다.');
        }
        
        // 8단계: 수정 계획 수립
        console.log('\n📋 수정 계획:');
        console.log('   1. CSS 파일 경로 문제 해결');
        console.log('   2. CSS 파일 내용 검증 및 수정');
        console.log('   3. JavaScript 파일 경로 및 내용 검증');
        console.log('   4. 이미지 및 비디오 파일 경로 확인');
        console.log('   5. Elementor 구조 완벽 복제');
        console.log('   6. 반복 검증 및 개선');
        
        console.log('\n🎯 복제원본 대조 검증 개선 루프 1차 완료!');
        console.log('🔄 다음 단계로 즉시 진행합니다...');
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await browser.close();
    }
}

originalComparisonLoop().catch(console.error); 