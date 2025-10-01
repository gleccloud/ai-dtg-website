const fs = require('fs');

async function emergencyRecoveryV2() {
    console.log('🚨 CTO 모드 - 긴급 복구 V2 시작!');
    console.log('🎯 목표: 7차 개선 손상 복구 및 안전한 상태 복원');
    
    // 1단계: 백업 파일 확인
    console.log('\n🔍 1단계: 백업 파일 확인...');
    const backupFiles = [
        'original-sk-hynix.html',
        'index-backup.html',
        'index-original.html'
    ];
    
    let backupFile = null;
    for (const file of backupFiles) {
        if (fs.existsSync(file)) {
            backupFile = file;
            console.log(`   - 백업 파일 발견: ${file}`);
            break;
        }
    }
    
    if (!backupFile) {
        console.log('❌ 백업 파일을 찾을 수 없습니다. 수동 복구가 필요합니다.');
        return;
    }
    
    // 2단계: 현재 손상된 파일 백업
    console.log('\n💾 2단계: 현재 손상된 파일 백업...');
    if (fs.existsSync('index.html')) {
        fs.copyFileSync('index.html', 'index-damaged-v2.html');
        console.log('   - 손상된 파일 백업: index-damaged-v2.html');
    }
    
    // 3단계: 백업에서 복구
    console.log('\n🔄 3단계: 백업에서 복구...');
    let html = fs.readFileSync(backupFile, 'utf8');
    console.log(`   - ${backupFile}에서 복구 완료`);
    
    // 4단계: 기본 스타일 주입
    console.log('\n🎨 4단계: 기본 스타일 주입...');
    const basicStyles = `
    <style>
    /* 긴급 복구 V2: 기본 스타일 */
    html, body {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: rgb(0, 0, 0) !important;
        color: rgb(38, 38, 38) !important;
        font-family: 'Roboto', 'Roboto Slab', sans-serif !important;
        line-height: 28.8px !important;
        box-sizing: border-box !important;
    }
    
    .elementor-section {
        background-color: transparent !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
    }
    
    .elementor-widget {
        color: rgb(38, 38, 38) !important;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Roboto', 'Roboto Slab', sans-serif !important;
        color: rgb(38, 38, 38) !important;
    }
    
    p {
        font-family: 'Roboto', 'Roboto Slab', sans-serif !important;
        color: rgb(38, 38, 38) !important;
        line-height: 28.8px !important;
    }
    
    img, video {
        max-width: 100% !important;
        height: auto !important;
    }
    
    .elementor-container {
        max-width: 1920px !important;
        width: 100% !important;
        margin: 0 auto !important;
    }
    </style>`;
    
    if (!html.includes('긴급 복구 V2: 기본 스타일')) {
        html = html.replace('</head>', `${basicStyles}\n</head>`);
    }
    
    // 5단계: 뷰포트 메타태그 수정
    console.log('\n📱 5단계: 뷰포트 메타태그 수정...');
    html = html.replace(
        /<meta name="viewport"[^>]*>/g,
        '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">'
    );
    
    // 6단계: 기본 JavaScript 함수 복구
    console.log('\n🔧 6단계: 기본 JavaScript 함수 복구...');
    const basicJS = `
    <script>
    // 긴급 복구 V2: 기본 JavaScript 함수
    console.log('긴급 복구 V2: 기본 JavaScript 함수 로드됨');
    
    // 기본 뷰포트 설정
    function setBasicViewport() {
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';
        console.log('긴급 복구 V2: 기본 뷰포트 설정 완료');
    }
    
    // DOM 로드 완료 후 실행
    document.addEventListener('DOMContentLoaded', function() {
        console.log('긴급 복구 V2: DOM 로드 완료');
        setBasicViewport();
    });
    
    // 페이지 로드 완료 후 실행
    window.addEventListener('load', function() {
        console.log('긴급 복구 V2: 페이지 로드 완료');
        setBasicViewport();
    });
    </script>`;
    
    if (!html.includes('긴급 복구 V2: 기본 JavaScript 함수')) {
        html = html.replace('</body>', `${basicJS}\n</body>`);
    }
    
    // 7단계: 파일 저장
    console.log('\n💾 7단계: 복구된 파일 저장...');
    fs.writeFileSync('index.html', html);
    
    // 8단계: 복구 상태 확인
    console.log('\n🔍 8단계: 복구 상태 확인...');
    
    // CSS 파일 수 확인
    const cssFileCount = (html.match(/<link[^>]*\.css[^>]*>/g) || []).length;
    console.log(`   - CSS 파일 수: ${cssFileCount}개`);
    
    // JavaScript 파일 수 확인
    const jsFileCount = (html.match(/<script[^>]*src[^>]*>/g) || []).length;
    console.log(`   - JavaScript 파일 수: ${jsFileCount}개`);
    
    // Elementor 요소 수 확인
    const elementorSections = (html.match(/elementor-section/g) || []).length;
    const elementorWidgets = (html.match(/elementor-widget/g) || []).length;
    console.log(`   - Elementor sections: ${elementorSections}개`);
    console.log(`   - Elementor widgets: ${elementorWidgets}개`);
    
    // 이미지 및 비디오 수 확인
    const images = (html.match(/<img/g) || []).length;
    const videos = (html.match(/<video/g) || []).length;
    console.log(`   - Images: ${images}개`);
    console.log(`   - Videos: ${videos}개`);
    
    // 9단계: 복구 완료 보고
    console.log('\n🎯 긴급 복구 V2 완료!');
    
    if (cssFileCount > 0 && jsFileCount > 0 && elementorSections > 0) {
        console.log('✅ 복구 성공: 기본 구조가 복원되었습니다.');
        console.log('🔄 이제 안전한 8차 재귀개선을 진행할 수 있습니다.');
    } else {
        console.log('⚠️ 부분 복구: 일부 요소만 복원되었습니다.');
        console.log('🔄 추가 복구가 필요할 수 있습니다.');
    }
    
    console.log('\n📊 복구 상태 요약:');
    console.log(`   - CSS 파일: ${cssFileCount}개`);
    console.log(`   - JavaScript 파일: ${jsFileCount}개`);
    console.log(`   - Elementor sections: ${elementorSections}개`);
    console.log(`   - Elementor widgets: ${elementorWidgets}개`);
    console.log(`   - Images: ${images}개`);
    console.log(`   - Videos: ${videos}개`);
    console.log(`   - 복구 등급: ${cssFileCount > 0 && jsFileCount > 0 ? '✅ 성공' : '⚠️ 부분 성공'}`);
}

emergencyRecoveryV2().catch(console.error); 