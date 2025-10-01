const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');

async function downloadVideos() {
    console.log('🎥 Downloading original videos...');
    
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
        
        // 비디오 URL 추출
        console.log('🔍 Extracting video URLs...');
        const videoUrls = await page.evaluate(() => {
            const videos = document.querySelectorAll('video');
            return Array.from(videos).map(video => ({
                src: video.src,
                className: video.className
            }));
        });
        
        console.log('📹 Found videos:', videoUrls);
        
        // 비디오 다운로드
        for (const video of videoUrls) {
            if (video.src) {
                const filename = video.src.split('/').pop();
                const filepath = `assets/videos/${filename}`;
                
                console.log(`⬇️ Downloading ${filename}...`);
                
                try {
                    await downloadFile(video.src, filepath);
                    console.log(`✅ Downloaded ${filename}`);
                } catch (error) {
                    console.error(`❌ Failed to download ${filename}:`, error.message);
                }
            }
        }
        
        console.log('🎯 Video download completed!');
        
    } catch (error) {
        console.error('❌ Error during video download:', error);
    } finally {
        await browser.close();
    }
}

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error(`HTTP ${response.statusCode}`));
            }
        }).on('error', (error) => {
            reject(error);
        });
    });
}

downloadVideos().catch(console.error); 