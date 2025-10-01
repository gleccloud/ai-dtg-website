const fs = require('fs');
const https = require('https');
const path = require('path');

async function downloadAssets() {
    console.log('🚀 에셋 다운로드 시작...');
    
    const downloadPlan = JSON.parse(fs.readFileSync('download-plan.json', 'utf8'));
    
    // 디렉토리 생성
    ['assets/css', 'assets/js', 'assets/images', 'assets/videos'].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
    
    // 다운로드 함수
    async function downloadFile(url, filename) {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filename);
            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✅ ${filename}`);
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(filename, () => {});
                console.log(`❌ ${filename}: ${err.message}`);
                reject(err);
            });
        });
    }
    
    // CSS 파일 다운로드
    console.log('\n📥 CSS 파일 다운로드 중...');
    for (const css of downloadPlan.css) {
        try {
            await downloadFile(css.url, css.filename);
        } catch (error) {
            console.log(`CSS 다운로드 실패: ${css.filename}`);
        }
    }
    
    // JS 파일 다운로드
    console.log('\n📥 JavaScript 파일 다운로드 중...');
    for (const js of downloadPlan.js) {
        try {
            await downloadFile(js.url, js.filename);
        } catch (error) {
            console.log(`JS 다운로드 실패: ${js.filename}`);
        }
    }
    
    // 이미지 파일 다운로드
    console.log('\n📥 이미지 파일 다운로드 중...');
    for (const img of downloadPlan.images) {
        try {
            await downloadFile(img.url, img.filename);
        } catch (error) {
            console.log(`이미지 다운로드 실패: ${img.filename}`);
        }
    }
    
    // 비디오 파일 다운로드
    console.log('\n📥 비디오 파일 다운로드 중...');
    for (const video of downloadPlan.videos) {
        try {
            await downloadFile(video.url, video.filename);
        } catch (error) {
            console.log(`비디오 다운로드 실패: ${video.filename}`);
        }
    }
    
    console.log('\n🎉 모든 에셋 다운로드 완료!');
}

downloadAssets().catch(console.error);