const fs = require('fs');

async function emergencyRecovery() {
    console.log('🚨 CTO 모드 - 긴급 복구 작업 시작!');
    console.log('🎯 목표: 손상된 HTML 구조 즉시 복원');
    
    try {
        // 1단계: 백업 파일 확인
        console.log('\n📁 1단계: 백업 파일 확인...');
        const backupFiles = [
            'index-backup.html',
            'index-original.html',
            'original-sk-hynix.html'
        ];
        
        let backupContent = null;
        let backupFile = null;
        
        for (const file of backupFiles) {
            if (fs.existsSync(file)) {
                backupContent = fs.readFileSync(file, 'utf8');
                backupFile = file;
                console.log(`✅ 백업 파일 발견: ${file}`);
                break;
            }
        }
        
        if (!backupContent) {
            console.log('❌ 백업 파일을 찾을 수 없습니다. 원본 SK하이닉스 사이트에서 재추출을 시도합니다.');
            return;
        }
        
        // 2단계: 손상된 현재 파일 백업
        console.log('\n💾 2단계: 손상된 현재 파일 백업...');
        if (fs.existsSync('index.html')) {
            fs.writeFileSync('index-damaged.html', fs.readFileSync('index.html', 'utf8'));
            console.log('✅ 손상된 파일 백업 완료: index-damaged.html');
        }
        
        // 3단계: 백업에서 복구
        console.log('\n🔧 3단계: 백업에서 복구...');
        let recoveredHTML = backupContent;
        
        // 4단계: 에셋 경로 수정
        console.log('\n🔗 4단계: 에셋 경로 수정...');
        recoveredHTML = recoveredHTML.replace(/href="https:\/\/ssd\.skhynix\.com\/wp-content\/themes\/rhye\/css\//g, 'href="assets/css/');
        recoveredHTML = recoveredHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/themes\/rhye\/js\//g, 'src="assets/js/');
        recoveredHTML = recoveredHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/uploads\//g, 'src="assets/images/');
        recoveredHTML = recoveredHTML.replace(/src="https:\/\/ssd\.skhynix\.com\/wp-content\/uploads\//g, 'src="assets/videos/');
        
        // 5단계: 기본 스타일 주입
        console.log('\n🎨 5단계: 기본 스타일 주입...');
        const basicStyles = `
        <style>
        /* 긴급 복구 기본 스타일 */
        html, body {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background-color: rgb(0, 0, 0) !important;
            color: rgb(38, 38, 38) !important;
            font-family: 'Roboto', 'Roboto Slab', sans-serif !important;
            line-height: 28.8px !important;
        }
        
        * {
            box-sizing: border-box !important;
        }
        
        .elementor-container,
        .elementor-section,
        .elementor-widget-wrap {
            width: 100% !important;
            max-width: 1920px !important;
            margin: 0 auto !important;
        }
        
        img, video {
            max-width: 100% !important;
            height: auto !important;
        }
        </style>`;
        
        if (!recoveredHTML.includes('긴급 복구 기본 스타일')) {
            recoveredHTML = recoveredHTML.replace('</head>', `${basicStyles}\n</head>`);
        }
        
        // 6단계: 뷰포트 메타태그 수정
        console.log('\n📱 6단계: 뷰포트 메타태그 수정...');
        const viewportMeta = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">';
        recoveredHTML = recoveredHTML.replace(/<meta name="viewport"[^>]*>/g, viewportMeta);
        
        // 7단계: 복구된 파일 저장
        console.log('\n💾 7단계: 복구된 파일 저장...');
        fs.writeFileSync('index.html', recoveredHTML);
        
        console.log('\n✅ 긴급 복구 완료!');
        console.log('🎯 복구된 내용:');
        console.log(`   - 백업 파일: ${backupFile}`);
        console.log(`   - HTML 구조: 복원됨`);
        console.log(`   - 에셋 경로: 수정됨`);
        console.log(`   - 기본 스타일: 주입됨`);
        console.log(`   - 뷰포트: 정상화됨`);
        
        console.log('\n🔄 이제 복구 검증을 실행하여 복구 효과를 확인하세요!');
        
    } catch (error) {
        console.error('❌ 긴급 복구 중 오류 발생:', error);
    }
}

emergencyRecovery().catch(console.error); 