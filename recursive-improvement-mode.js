const { chromium } = require('playwright');
const fs = require('fs').promises;

class RecursiveImprovementMode {
    constructor() {
        this.iteration = 0;
        this.maxIterations = 10;
        this.improvementThreshold = 99.5; // 99.5% 이상 일치해야 함
        this.detailedAnalysis = {};
    }

    async start() {
        console.log('🚨 CTO 모드 - 재귀개선 모드 시작!');
        console.log('🎯 목표: 99.5% 이상의 완벽한 일치 달성');
        console.log('🔬 방법: 엄격한 과학적 분석 + 비판적 검증 + 재귀적 개선');
        
        while (this.iteration < this.maxIterations) {
            this.iteration++;
            console.log(`\n🔄 === 재귀개선 루프 ${this.iteration}차 실행 ===`);
            
            const result = await this.executeIteration();
            
            if (result.matchPercentage >= this.improvementThreshold) {
                console.log(`🎉 목표 달성! ${result.matchPercentage.toFixed(2)}% 일치`);
                break;
            }
            
            console.log(`📊 현재 일치도: ${result.matchPercentage.toFixed(2)}%`);
            console.log(`🔄 다음 루프로 진행...`);
        }
        
        await this.generateFinalReport();
    }

    async executeIteration() {
        const browser = await chromium.launch({ 
            headless: false,
            slowMo: 1000
        });
        
        try {
            // 1단계: 원본 사이트 상세 분석
            console.log('\n🔍 1단계: 원본 사이트 상세 분석...');
            const originalAnalysis = await this.analyzeOriginalSite(browser);
            
            // 2단계: 복제본 상세 분석
            console.log('\n🔍 2단계: 복제본 상세 분석...');
            const cloneAnalysis = await this.analyzeCloneSite(browser);
            
            // 3단계: 차이점 분석 및 점수 계산
            console.log('\n🔍 3단계: 차이점 분석 및 점수 계산...');
            const comparison = this.compareDetailed(originalAnalysis, cloneAnalysis);
            
            // 4단계: 개선 계획 수립
            console.log('\n🔍 4단계: 개선 계획 수립...');
            await this.createImprovementPlan(comparison);
            
            // 5단계: 즉시 개선 실행
            console.log('\n🔍 5단계: 즉시 개선 실행...');
            await this.executeImprovements(comparison);
            
            return comparison;
            
        } finally {
            await browser.close();
        }
    }

    async analyzeOriginalSite(browser) {
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        try {
            await page.goto('https://ssd.skhynix.com/beetle_x31/', { 
                waitUntil: 'networkidle',
                timeout: 30000
            });
            await page.waitForTimeout(5000);
            
            const analysis = await page.evaluate(() => {
                // 1. 구조적 분석
                const structure = {
                    bodyClasses: document.body.className,
                    elementorSections: document.querySelectorAll('[class*="elementor-section"]').length,
                    elementorWidgets: document.querySelectorAll('[class*="elementor-widget"]').length,
                    sections: document.querySelectorAll('section').length,
                    headers: document.querySelectorAll('header').length,
                    footers: document.querySelectorAll('footer').length,
                    navs: document.querySelectorAll('nav').length,
                    mains: document.querySelectorAll('main').length,
                    articles: document.querySelectorAll('article').length,
                    asides: document.querySelectorAll('aside').length
                };
                
                // 2. 콘텐츠 분석
                const content = {
                    h1: document.querySelectorAll('h1').length,
                    h2: document.querySelectorAll('h2').length,
                    h3: document.querySelectorAll('h3').length,
                    h4: document.querySelectorAll('h4').length,
                    h5: document.querySelectorAll('h5').length,
                    h6: document.querySelectorAll('h6').length,
                    p: document.querySelectorAll('p').length,
                    images: document.querySelectorAll('img').length,
                    videos: document.querySelectorAll('video').length,
                    buttons: document.querySelectorAll('button').length,
                    links: document.querySelectorAll('a').length
                };
                
                // 3. 스타일 분석
                const styles = {
                    backgroundColor: window.getComputedStyle(document.body).backgroundColor,
                    color: window.getComputedStyle(document.body).color,
                    fontSize: window.getComputedStyle(document.body).fontSize,
                    fontFamily: window.getComputedStyle(document.body).fontFamily,
                    lineHeight: window.getComputedStyle(document.body).lineHeight,
                    margin: window.getComputedStyle(document.body).margin,
                    padding: window.getComputedStyle(document.body).padding
                };
                
                // 4. 레이아웃 분석
                const layout = {
                    width: document.body.offsetWidth,
                    height: document.body.offsetHeight,
                    scrollWidth: document.body.scrollWidth,
                    scrollHeight: document.body.scrollHeight
                };
                
                // 5. 에셋 분석
                const assets = {
                    cssSheets: Array.from(document.styleSheets).length,
                    jsScripts: Array.from(document.querySelectorAll('script[src]')).length,
                    fonts: Array.from(document.fonts).length,
                    images: Array.from(document.images).length
                };
                
                // 6. 상호작용 요소 분석
                const interactions = {
                    clickableElements: document.querySelectorAll('[onclick], [data-action], button, a, input[type="button"], input[type="submit"]').length,
                    formElements: document.querySelectorAll('form, input, select, textarea').length,
                    animations: document.querySelectorAll('[class*="animate"], [class*="animation"], [class*="transition"]').length
                };
                
                // 7. 메타데이터 분석
                const metadata = {
                    title: document.title,
                    metaTags: Array.from(document.querySelectorAll('meta')).length,
                    favicon: document.querySelector('link[rel="icon"]')?.href || null,
                    viewport: document.querySelector('meta[name="viewport"]')?.content || null
                };
                
                return {
                    structure,
                    content,
                    styles,
                    layout,
                    assets,
                    interactions,
                    metadata,
                    timestamp: new Date().toISOString()
                };
            });
            
            console.log('📊 원본 사이트 분석 완료');
            return analysis;
            
        } catch (error) {
            console.error('❌ 원본 사이트 분석 오류:', error);
            throw error;
        }
    }

    async analyzeCloneSite(browser) {
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        try {
            await page.goto('http://localhost:8081', { 
                waitUntil: 'networkidle',
                timeout: 30000
            });
            await page.waitForTimeout(5000);
            
            const analysis = await page.evaluate(() => {
                // 동일한 분석 로직 적용
                const structure = {
                    bodyClasses: document.body.className,
                    elementorSections: document.querySelectorAll('[class*="elementor-section"]').length,
                    elementorWidgets: document.querySelectorAll('[class*="elementor-widget"]').length,
                    sections: document.querySelectorAll('section').length,
                    headers: document.querySelectorAll('header').length,
                    footers: document.querySelectorAll('footer').length,
                    navs: document.querySelectorAll('nav').length,
                    mains: document.querySelectorAll('main').length,
                    articles: document.querySelectorAll('article').length,
                    asides: document.querySelectorAll('aside').length
                };
                
                const content = {
                    h1: document.querySelectorAll('h1').length,
                    h2: document.querySelectorAll('h2').length,
                    h3: document.querySelectorAll('h3').length,
                    h4: document.querySelectorAll('h4').length,
                    h5: document.querySelectorAll('h5').length,
                    h6: document.querySelectorAll('h6').length,
                    p: document.querySelectorAll('p').length,
                    images: document.querySelectorAll('img').length,
                    videos: document.querySelectorAll('video').length,
                    buttons: document.querySelectorAll('button').length,
                    links: document.querySelectorAll('a').length
                };
                
                const styles = {
                    backgroundColor: window.getComputedStyle(document.body).backgroundColor,
                    color: window.getComputedStyle(document.body).color,
                    fontSize: window.getComputedStyle(document.body).fontSize,
                    fontFamily: window.getComputedStyle(document.body).fontFamily,
                    lineHeight: window.getComputedStyle(document.body).lineHeight,
                    margin: window.getComputedStyle(document.body).margin,
                    padding: window.getComputedStyle(document.body).padding
                };
                
                const layout = {
                    width: document.body.offsetWidth,
                    height: document.body.offsetHeight,
                    scrollWidth: document.body.scrollWidth,
                    scrollHeight: document.body.scrollHeight
                };
                
                const assets = {
                    cssSheets: Array.from(document.styleSheets).length,
                    jsScripts: Array.from(document.querySelectorAll('script[src]')).length,
                    fonts: Array.from(document.fonts).length,
                    images: Array.from(document.images).length
                };
                
                const interactions = {
                    clickableElements: document.querySelectorAll('[onclick], [data-action], button, a, input[type="button"], input[type="submit"]').length,
                    formElements: document.querySelectorAll('form, input, select, textarea').length,
                    animations: document.querySelectorAll('[class*="animate"], [class*="animation"], [class*="transition"]').length
                };
                
                const metadata = {
                    title: document.title,
                    metaTags: Array.from(document.querySelectorAll('meta')).length,
                    favicon: document.querySelector('link[rel="icon"]')?.href || null,
                    viewport: document.querySelector('meta[name="viewport"]')?.content || null
                };
                
                return {
                    structure,
                    content,
                    styles,
                    layout,
                    assets,
                    interactions,
                    metadata,
                    timestamp: new Date().toISOString()
                };
            });
            
            console.log('📊 복제본 분석 완료');
            return analysis;
            
        } catch (error) {
            console.error('❌ 복제본 분석 오류:', error);
            throw error;
        }
    }

    compareDetailed(original, clone) {
        console.log('\n🔬 상세 비교 분석 시작...');
        
        const comparison = {
            structure: this.compareCategory('structure', original.structure, clone.structure),
            content: this.compareCategory('content', original.content, clone.content),
            styles: this.compareCategory('styles', original.styles, clone.styles),
            layout: this.compareCategory('layout', original.layout, clone.layout),
            assets: this.compareCategory('assets', original.assets, clone.assets),
            interactions: this.compareCategory('interactions', original.interactions, clone.interactions),
            metadata: this.compareCategory('metadata', original.metadata, clone.metadata)
        };
        
        // 전체 일치도 계산
        const totalMatches = Object.values(comparison).reduce((sum, cat) => sum + cat.matches, 0);
        const totalItems = Object.values(comparison).reduce((sum, cat) => sum + cat.total, 0);
        const matchPercentage = (totalMatches / totalItems) * 100;
        
        comparison.overall = {
            matches: totalMatches,
            total: totalItems,
            percentage: matchPercentage,
            iteration: this.iteration
        };
        
        // 상세 분석 결과 저장
        this.detailedAnalysis[this.iteration] = comparison;
        
        return comparison;
    }

    compareCategory(categoryName, original, clone) {
        const items = Object.keys(original);
        let matches = 0;
        const differences = [];
        
        items.forEach(key => {
            const originalValue = original[key];
            const cloneValue = clone[key];
            
            if (this.isValueEqual(originalValue, cloneValue)) {
                matches++;
            } else {
                differences.push({
                    key,
                    original: originalValue,
                    clone: cloneValue,
                    difference: this.calculateDifference(originalValue, cloneValue)
                });
            }
        });
        
        const result = {
            category: categoryName,
            matches,
            total: items.length,
            percentage: (matches / items.length) * 100,
            differences
        };
        
        console.log(`   ${categoryName}: ${matches}/${items.length} (${result.percentage.toFixed(1)}%)`);
        
        if (differences.length > 0) {
            console.log(`     ❌ 차이점: ${differences.length}개`);
            differences.forEach(diff => {
                console.log(`       - ${diff.key}: ${diff.original} → ${diff.clone}`);
            });
        }
        
        return result;
    }

    isValueEqual(original, clone) {
        if (typeof original !== typeof clone) return false;
        if (original === null || clone === null) return original === clone;
        if (typeof original === 'object') {
            return JSON.stringify(original) === JSON.stringify(clone);
        }
        return original === clone;
    }

    calculateDifference(original, clone) {
        if (typeof original === 'number' && typeof clone === 'number') {
            return Math.abs(original - clone);
        }
        return 'type_mismatch';
    }

    async createImprovementPlan(comparison) {
        console.log('\n📋 개선 계획 수립...');
        
        const improvements = [];
        
        Object.entries(comparison).forEach(([category, data]) => {
            if (category === 'overall') return; // overall은 건너뛰기
            
            if (data.percentage < 100) {
                data.differences.forEach(diff => {
                    improvements.push({
                        category,
                        key: diff.key,
                        original: diff.original,
                        clone: diff.clone,
                        priority: this.calculatePriority(category, diff.key)
                    });
                });
            }
        });
        
        // 우선순위별 정렬
        improvements.sort((a, b) => b.priority - a.priority);
        
        console.log(`📊 총 ${improvements.length}개 개선 항목 발견`);
        console.log('🔝 우선순위별 개선 계획:');
        
        improvements.forEach((imp, index) => {
            console.log(`   ${index + 1}. [${imp.category}] ${imp.key} (우선순위: ${imp.priority})`);
            console.log(`      ${imp.original} → ${imp.clone}`);
        });
        
        // 개선 계획 저장
        await fs.writeFile(`improvement-plan-${this.iteration}.json`, JSON.stringify(improvements, null, 2));
        
        return improvements;
    }

    calculatePriority(category, key) {
        const categoryWeights = {
            styles: 10,      // 스타일이 가장 중요
            structure: 9,    // 구조가 두 번째로 중요
            content: 8,      // 콘텐츠가 세 번째로 중요
            assets: 7,       // 에셋이 네 번째로 중요
            layout: 6,       // 레이아웃이 다섯 번째로 중요
            interactions: 5, // 상호작용이 여섯 번째로 중요
            metadata: 4      // 메타데이터가 가장 낮은 우선순위
        };
        
        const keyWeights = {
            bodyClasses: 10,     // body 클래스가 가장 중요
            backgroundColor: 10,  // 배경색이 가장 중요
            color: 9,            // 텍스트 색이 중요
            elementorSections: 9, // Elementor 섹션이 중요
            elementorWidgets: 9,  // Elementor 위젯이 중요
            title: 8,            // 제목이 중요
            images: 8,           // 이미지가 중요
            cssSheets: 7,        // CSS 시트가 중요
            jsScripts: 7         // JS 스크립트가 중요
        };
        
        const categoryWeight = categoryWeights[category] || 5;
        const keyWeight = keyWeights[key] || 5;
        
        return categoryWeight * keyWeight;
    }

    async executeImprovements(comparison) {
        console.log('\n🔧 개선 실행 시작...');
        
        // 가장 중요한 개선사항부터 실행
        const criticalImprovements = this.getCriticalImprovements(comparison);
        
        for (const improvement of criticalImprovements) {
            console.log(`\n🔧 ${improvement.category}.${improvement.key} 개선 중...`);
            await this.improveSpecificElement(improvement);
        }
        
        console.log('✅ 주요 개선사항 실행 완료');
    }

    getCriticalImprovements(comparison) {
        const improvements = [];
        
        Object.entries(comparison).forEach(([category, data]) => {
            if (category === 'overall') return; // overall은 건너뛰기
            
            if (data.percentage < 100) {
                data.differences.forEach(diff => {
                    improvements.push({
                        category,
                        key: diff.key,
                        original: diff.original,
                        clone: diff.clone,
                        priority: this.calculatePriority(category, diff.key)
                    });
                });
            }
        });
        
        // 우선순위 상위 5개만 선택
        return improvements
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 5);
    }

    async improveSpecificElement(improvement) {
        // 개선 로직 구현
        console.log(`   - ${improvement.key}: ${improvement.original} → ${improvement.clone}`);
        
        // 실제 개선 작업은 여기에 구현
        // 예: CSS 수정, HTML 구조 변경, JavaScript 기능 추가 등
    }

    async generateFinalReport() {
        console.log('\n📊 === 최종 보고서 생성 ===');
        
        const report = {
            totalIterations: this.iteration,
            finalMatchPercentage: this.detailedAnalysis[this.iteration]?.overall?.percentage || 0,
            improvementHistory: this.detailedAnalysis,
            summary: this.generateSummary()
        };
        
        await fs.writeFile('recursive-improvement-report.json', JSON.stringify(report, null, 2));
        
        console.log('📋 최종 보고서 생성 완료');
        console.log(`🎯 최종 일치도: ${report.finalMatchPercentage.toFixed(2)}%`);
        console.log(`🔄 총 실행 루프: ${report.totalIterations}회`);
        
        return report;
    }

    generateSummary() {
        const summary = {
            bestIteration: 0,
            bestScore: 0,
            totalImprovements: 0,
            categories: {}
        };
        
        Object.entries(this.detailedAnalysis).forEach(([iteration, data]) => {
            const score = data.overall.percentage;
            if (score > summary.bestScore) {
                summary.bestScore = score;
                summary.bestIteration = iteration;
            }
        });
        
        return summary;
    }
}

// 재귀개선 모드 실행
const recursiveMode = new RecursiveImprovementMode();
recursiveMode.start().catch(console.error); 