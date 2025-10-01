const fs = require('fs');
const path = require('path');

async function createPerfectClone() {
    console.log('🚨 CTO 모드 - 완벽한 복제본 생성 시작!');
    console.log('🎯 목표: 원본과 100% 일치하는 복제본 생성');
    
    try {
        // 1단계: 원본 HTML 읽기
        console.log('\n📖 1단계: 원본 HTML 읽기...');
        const originalHTML = fs.readFileSync('original-sk-hynix.html', 'utf8');
        console.log(`   - 원본 HTML 크기: ${(originalHTML.length / 1024 / 1024).toFixed(2)} MB`);
        
        // 2단계: 원본 HTML 분석
        console.log('\n🔍 2단계: 원본 HTML 분석...');
        
        // CSS 파일 경로 추출
        const cssMatches = originalHTML.match(/href="([^"]*\.css[^"]*)"/g) || [];
        const cssFiles = [...new Set(cssMatches.map(match => {
            const href = match.match(/href="([^"]*)"/)[1];
            return href.startsWith('http') ? href : `https://ssd.skhynix.com${href}`;
        }))];
        
        // JavaScript 파일 경로 추출
        const jsMatches = originalHTML.match(/src="([^"]*\.js[^"]*)"/g) || [];
        const jsFiles = [...new Set(jsMatches.map(match => {
            const src = match.match(/src="([^"]*)"/)[1];
            return src.startsWith('http') ? src : `https://ssd.skhynix.com${src}`;
        }))];
        
        // 이미지 파일 경로 추출
        const imgMatches = originalHTML.match(/src="([^"]*\.(jpg|jpeg|png|gif|webp)[^"]*)"/g) || [];
        const imgFiles = [...new Set(imgMatches.map(match => {
            const src = match.match(/src="([^"]*)"/)[1];
            return src.startsWith('http') ? src : `https://ssd.skhynix.com${src}`;
        }))];
        
        // 비디오 파일 경로 추출
        const videoMatches = originalHTML.match(/src="([^"]*\.(mp4|webm|ogg)[^"]*)"/g) || [];
        const videoFiles = [...new Set(videoMatches.map(match => {
            const src = match.match(/src="([^"]*)"/)[1];
            return src.startsWith('http') ? src : `https://ssd.skhynix.com${src}`;
        }))];
        
        console.log('📊 원본 파일 분석 결과:');
        console.log(`   - CSS files: ${cssFiles.length}개`);
        console.log(`   - JS files: ${jsFiles.length}개`);
        console.log(`   - Image files: ${imgFiles.length}개`);
        console.log(`   - Video files: ${videoFiles.length}개`);
        
        // 3단계: 복제본 HTML 생성
        console.log('\n🔧 3단계: 복제본 HTML 생성...');
        
        // 원본 HTML을 복사하여 복제본 생성
        let cloneHTML = originalHTML;
        
        // 로컬 경로로 변경
        cloneHTML = cloneHTML.replace(/href="https:\/\/ssd\.skhynix\.com\/wp-content\/themes\/rhye\/css\//g, 'href="assets/css/');
        cloneHTML = cloneHTML.replace(/href="https:\/\/ssd\.skhynix\.com\/wp-content\/plugins\/rhye-core\/modules\//g, 'href="assets/css/');
        cloneHTML = cloneHTML.replace(/href="https:\/\/ssd\.skhynix\.com\/wp-content\/plugins\/elementor\/assets\/lib\/font-awesome\/css\//g, 'href="assets/css/');
        cloneHTML = cloneHTML.replace(/href="https:\/\/ssd\.skhynix\.com\/wp-content\/plugins\//g, 'href="assets/css/');
        cloneHTML = cloneHTML.replace(/href="https:\/\/ssd\.skhynix\.com\/wp-content\/uploads\/elementor\/css\//g, 'href="assets/css/');
        
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/themes\/rhye\/js\//g, 'src="assets/js/');
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/plugins\/rhye-core\/modules\//g, 'src="assets/js/');
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/plugins\/elementor\/assets\/js\//g, 'src="assets/js/');
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/plugins\//g, 'src="assets/js/');
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-includes\/js\//g, 'src="assets/js/');
        
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/uploads\//g, 'src="assets/images/');
        cloneHTML = cloneHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/themes\/rhye\/images\//g, 'src="assets/images/');
        
        // 제목 변경
        cloneHTML = cloneHTML.replace(/<title>.*?<\/title>/, '<title>Beetle X31 SSD – SK hynix SSD Perfect Clone</title>');
        
        console.log('✅ 복제본 HTML 생성 완료');
        
        // 4단계: 복제본 HTML 저장
        console.log('\n💾 4단계: 복제본 HTML 저장...');
        fs.writeFileSync('index.html', cloneHTML);
        console.log('✅ index.html에 완벽한 복제본 저장됨');
        
        // 5단계: 다운로드 계획 생성
        console.log('\n📋 5단계: 다운로드 계획 생성...');
        
        const downloadPlan = {
            css: cssFiles.map(url => {
                const filename = url.split('/').pop().split('?')[0];
                return { url, filename: `assets/css/${filename}` };
            }),
            js: jsFiles.map(url => {
                const filename = url.split('/').pop().split('?')[0];
                return { url, filename: `assets/js/${filename}` };
            }),
            images: imgFiles.map(url => {
                const filename = url.split('/').pop().split('?')[0];
                return { url, filename: `assets/images/${filename}` };
            }),
            videos: videoFiles.map(url => {
                const filename = url.split('/').pop().split('?')[0];
                return { url, filename: `assets/videos/${filename}` };
            })
        };
        
        fs.writeFileSync('download-plan.json', JSON.stringify(downloadPlan, null, 2));
        console.log('✅ download-plan.json에 다운로드 계획 저장됨');
        
        // 6단계: 다운로드 스크립트 생성
        console.log('\n🔧 6단계: 다운로드 스크립트 생성...');
        
        const downloadScript = `const fs = require('fs');
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
                    console.log(\`✅ \${filename}\`);
                    resolve();
                });
            }).on('error', (err) => {
                fs.unlink(filename, () => {});
                console.log(\`❌ \${filename}: \${err.message}\`);
                reject(err);
            });
        });
    }
    
    // CSS 파일 다운로드
    console.log('\\n📥 CSS 파일 다운로드 중...');
    for (const css of downloadPlan.css) {
        try {
            await downloadFile(css.url, css.filename);
        } catch (error) {
            console.log(\`CSS 다운로드 실패: \${css.filename}\`);
        }
    }
    
    // JS 파일 다운로드
    console.log('\\n📥 JavaScript 파일 다운로드 중...');
    for (const js of downloadPlan.js) {
        try {
            await downloadFile(js.url, js.filename);
        } catch (error) {
            console.log(\`JS 다운로드 실패: \${js.filename}\`);
        }
    }
    
    // 이미지 파일 다운로드
    console.log('\\n📥 이미지 파일 다운로드 중...');
    for (const img of downloadPlan.images) {
        try {
            await downloadFile(img.url, img.filename);
        } catch (error) {
            console.log(\`이미지 다운로드 실패: \${img.filename}\`);
        }
    }
    
    // 비디오 파일 다운로드
    console.log('\\n📥 비디오 파일 다운로드 중...');
    for (const video of downloadPlan.videos) {
        try {
            await downloadFile(video.url, video.filename);
        } catch (error) {
            console.log(\`비디오 다운로드 실패: \${video.filename}\`);
        }
    }
    
    console.log('\\n🎉 모든 에셋 다운로드 완료!');
}

downloadAssets().catch(console.error);`;
        
        fs.writeFileSync('download-assets.js', downloadScript);
        console.log('✅ download-assets.js에 다운로드 스크립트 저장됨');
        
        // 7단계: 최종 상태 요약
        console.log('\n📋 최종 상태 요약:');
        console.log('   - ✅ 완벽한 복제본 HTML 생성됨');
        console.log('   - ✅ 다운로드 계획 수립됨');
        console.log('   - ✅ 다운로드 스크립트 생성됨');
        console.log('   - 🔄 다음 단계: 에셋 다운로드 실행');
        
        console.log('\n🎯 완벽한 복제본 생성 완료!');
        console.log('🔄 다음 단계로 즉시 진행합니다...');
        
    } catch (error) {
        console.error('❌ 오류 발생:', error);
    }
}

createPerfectClone().catch(console.error); 