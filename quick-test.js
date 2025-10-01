const { chromium } = require('playwright');

async function quickTest() {
    console.log('🚀 Quick website validation...');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        await page.goto('http://localhost:8081', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);
        
        // H1 존재 여부 확인
        const h1 = await page.locator('h1');
        const h1Count = await h1.count();
        const h1Text = h1Count > 0 ? await h1.textContent() : 'NOT FOUND';
        
        console.log(`🔍 H1 Status: ${h1Count > 0 ? '✅ Found' : '❌ Not found'}`);
        console.log(`📝 H1 Text: "${h1Text}"`);
        
        // 스크린샷
        await page.screenshot({ path: 'quick-test-result.png' });
        console.log('📸 Screenshot saved');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

quickTest(); 