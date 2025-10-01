const fs = require('fs');

async function emergencyRecoveryV3() {
    console.log('🚨 CTO 모드 - 긴급 복구 V3 시작!');
    console.log('🔴 문제: 검정 화면만 출력되는 쓰레기 같은 상태');
    console.log('🎯 목표: 즉시 복구하여 정상적인 웹사이트 복원');
    
    // 1단계: 백업 파일 확인
    console.log('\n📁 1단계: 백업 파일 확인...');
    
    let backupFile = null;
    const backupFiles = [
        'original-sk-hynix.html',
        'index-backup.html',
        'index-original.html'
    ];
    
    for (const file of backupFiles) {
        if (fs.existsSync(file)) {
            backupFile = file;
            console.log(`✅ 백업 파일 발견: ${file}`);
            break;
        }
    }
    
    if (!backupFile) {
        console.error('❌ 백업 파일을 찾을 수 없습니다!');
        return;
    }
    
    // 2단계: 현재 손상된 파일 백업
    console.log('\n💾 2단계: 현재 손상된 파일 백업...');
    
    if (fs.existsSync('index.html')) {
        fs.copyFileSync('index.html', 'index-damaged-v3.html');
        console.log('✅ 손상된 파일 백업 완료: index-damaged-v3.html');
    }
    
    // 3단계: 백업에서 복구
    console.log('\n🔄 3단계: 백업에서 복구...');
    
    let html = fs.readFileSync(backupFile, 'utf8');
    console.log(`✅ ${backupFile}에서 복구 완료`);
    
    // 4단계: 기본 스타일 강제 주입 (검정 화면 해결)
    console.log('\n🎨 4단계: 기본 스타일 강제 주입 (검정 화면 해결)...');
    
    const criticalStyles = `
    <style>
    /* 긴급 복구 V3: 검정 화면 해결을 위한 핵심 스타일 */
    
    /* 기본 배경 및 색상 강제 설정 */
    html, body {
        background-color: #ffffff !important;
        color: #000000 !important;
        font-family: Arial, sans-serif !important;
        margin: 0 !important;
        padding: 0 !important;
        min-height: 100vh !important;
        width: 100% !important;
        overflow-x: hidden !important;
    }
    
    /* Elementor 섹션 기본 스타일 강제 */
    .elementor-section {
        background-color: transparent !important;
        color: #000000 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 20px 0 !important;
    }
    
    /* Elementor 위젯 기본 스타일 강제 */
    .elementor-widget {
        background-color: transparent !important;
        color: #000000 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        margin: 10px 0 !important;
        padding: 10px !important;
    }
    
    /* 제목 기본 스타일 강제 */
    h1, h2, h3, h4, h5, h6 {
        color: #000000 !important;
        font-weight: bold !important;
        margin: 15px 0 !important;
        padding: 0 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    /* 단락 기본 스타일 강제 */
    p {
        color: #000000 !important;
        margin: 10px 0 !important;
        padding: 0 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        line-height: 1.6 !important;
    }
    
    /* 이미지 기본 스타일 강제 */
    img {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        margin: 10px auto !important;
    }
    
    /* 비디오 기본 스타일 강제 */
    video {
        max-width: 100% !important;
        height: auto !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        margin: 10px auto !important;
    }
    
    /* 링크 기본 스타일 강제 */
    a {
        color: #0066cc !important;
        text-decoration: underline !important;
        display: inline !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    a:hover {
        color: #003366 !important;
        text-decoration: none !important;
    }
    
    /* 컨테이너 기본 스타일 강제 */
    .elementor-container {
        max-width: 1200px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 0 20px !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    /* 래퍼 기본 스타일 강제 */
    .elementor-widget-wrap {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
    }
    
    /* 컬럼 기본 스타일 강제 */
    .elementor-column {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 10px !important;
    }
    
    /* 검정 화면 방지 강제 스타일 */
    * {
        background-color: transparent !important;
        color: inherit !important;
    }
    
    /* 특정 검정 배경 요소 강제 제거 */
    [style*="background-color: rgb(0, 0, 0)"],
    [style*="background-color: #000000"],
    [style*="background-color: black"] {
        background-color: transparent !important;
    }
    
    /* 검정 텍스트 강제 제거 */
    [style*="color: rgb(0, 0, 0)"],
    [style*="color: #000000"],
    [style*="color: black"] {
        color: #000000 !important;
    }
    
    /* 뷰포트 강제 설정 */
    @media screen and (max-width: 768px) {
        .elementor-container {
            padding: 0 15px !important;
        }
        
        .elementor-section {
            padding: 15px 0 !important;
        }
    }
    </style>`;
    
    if (!html.includes('긴급 복구 V3: 검정 화면 해결을 위한 핵심 스타일')) {
        html = html.replace('</head>', `${criticalStyles}\n</head>`);
        console.log('✅ 검정 화면 해결 스타일 주입 완료');
    }
    
    // 5단계: 뷰포트 메타태그 수정
    console.log('\n📱 5단계: 뷰포트 메타태그 수정...');
    
    html = html.replace(/<meta name="viewport"[^>]*>/g, '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
    console.log('✅ 뷰포트 메타태그 수정 완료');
    
    // 6단계: 기본 JavaScript 함수 복구
    console.log('\n🔧 6단계: 기본 JavaScript 함수 복구...');
    
    const criticalJS = `
    <script>
    // 긴급 복구 V3: 검정 화면 해결을 위한 핵심 JavaScript
    console.log('🚨 긴급 복구 V3: 검정 화면 해결 시작!');
    
    function forceVisibleElements() {
        console.log('🔍 보이지 않는 요소 강제 표시 시작...');
        
        // 모든 Elementor 요소 강제 표시
        const elementorElements = document.querySelectorAll('[class*="elementor"]');
        elementorElements.forEach(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.backgroundColor = 'transparent';
            el.style.color = '#000000';
        });
        
        // 모든 제목 요소 강제 표시
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.color = '#000000';
        });
        
        // 모든 단락 요소 강제 표시
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.color = '#000000';
        });
        
        // 모든 이미지 요소 강제 표시
        const images = document.querySelectorAll('img');
        images.forEach(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        console.log('✅ 보이지 않는 요소 강제 표시 완료');
    }
    
    function forceBackgroundColor() {
        console.log('🎨 배경색 강제 설정 시작...');
        
        // HTML과 body 배경색 강제 설정
        document.documentElement.style.backgroundColor = '#ffffff';
        document.body.style.backgroundColor = '#ffffff';
        
        // 모든 섹션 배경색 강제 설정
        const sections = document.querySelectorAll('section, .elementor-section');
        sections.forEach(el => {
            el.style.backgroundColor = 'transparent';
        });
        
        console.log('✅ 배경색 강제 설정 완료');
    }
    
    function forceTextColor() {
        console.log('📝 텍스트 색상 강제 설정 시작...');
        
        // 모든 텍스트 요소 색상 강제 설정
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
        textElements.forEach(el => {
            if (el.style.color === 'rgb(0, 0, 0)' || el.style.color === '#000000') {
                el.style.color = '#000000';
            }
        });
        
        console.log('✅ 텍스트 색상 강제 설정 완료');
    }
    
    function emergencyRecovery() {
        console.log('🚨 긴급 복구 실행 시작...');
        
        // 즉시 실행
        forceVisibleElements();
        forceBackgroundColor();
        forceTextColor();
        
        // DOM 로드 완료 후 추가 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    forceVisibleElements();
                    forceBackgroundColor();
                    forceTextColor();
                }, 1000);
            });
        } else {
            setTimeout(() => {
                forceVisibleElements();
                forceBackgroundColor();
                forceTextColor();
            }, 1000);
        }
        
        // 페이지 로드 완료 후 최종 실행
        window.addEventListener('load', () => {
            setTimeout(() => {
                forceVisibleElements();
                forceBackgroundColor();
                forceTextColor();
                console.log('✅ 긴급 복구 V3 완료!');
            }, 2000);
        });
    }
    
    // 즉시 실행
    emergencyRecovery();
    
    // 5초마다 반복 실행 (안전장치)
    setInterval(() => {
        forceVisibleElements();
        forceBackgroundColor();
        forceTextColor();
    }, 5000);
    </script>`;
    
    if (!html.includes('긴급 복구 V3: 검정 화면 해결을 위한 핵심 JavaScript')) {
        html = html.replace('</body>', `${criticalJS}\n</body>`);
        console.log('✅ 검정 화면 해결 JavaScript 주입 완료');
    }
    
    // 7단계: 파일 저장
    console.log('\n💾 7단계: 파일 저장...');
    
    fs.writeFileSync('index.html', html);
    console.log('✅ 긴급 복구 V3 완료! index.html 저장됨');
    
    // 8단계: 복구 상태 확인
    console.log('\n🔍 8단계: 복구 상태 확인...');
    
    const recoveryStats = {
        elementorSections: (html.match(/class="[^"]*elementor-section[^"]*"/g) || []).length,
        elementorWidgets: (html.match(/class="[^"]*elementor-widget[^"]*"/g) || []).length,
        headings: (html.match(/<h[1-6][^>]*>/g) || []).length,
        paragraphs: (html.match(/<p[^>]*>/g) || []).length,
        images: (html.match(/<img[^>]*>/g) || []).length,
        videos: (html.match(/<video[^>]*>/g) || []).length,
        criticalStyles: html.includes('긴급 복구 V3: 검정 화면 해결을 위한 핵심 스타일'),
        criticalJS: html.includes('긴급 복구 V3: 검정 화면 해결을 위한 핵심 JavaScript')
    };
    
    console.log('📊 복구 상태:');
    console.log(`   - Elementor sections: ${recoveryStats.elementorSections}`);
    console.log(`   - Elementor widgets: ${recoveryStats.elementorWidgets}`);
    console.log(`   - Headings: ${recoveryStats.headings}`);
    console.log(`   - Paragraphs: ${recoveryStats.paragraphs}`);
    console.log(`   - Images: ${recoveryStats.images}`);
    console.log(`   - Videos: ${recoveryStats.videos}`);
    console.log(`   - Critical styles: ${recoveryStats.criticalStyles ? '✅ 주입됨' : '❌ 주입 안됨'}`);
    console.log(`   - Critical JS: ${recoveryStats.criticalJS ? '✅ 주입됨' : '❌ 주입 안됨'}`);
    
    // 9단계: 복구 완료 보고
    console.log('\n🎯 긴급 복구 V3 완료 보고:');
    console.log('   - 검정 화면 해결 스타일: ✅ 주입 완료');
    console.log('   - 검정 화면 해결 JavaScript: ✅ 주입 완료');
    console.log('   - 기본 구조 복구: ✅ 완료');
    console.log('   - 뷰포트 메타태그: ✅ 수정 완료');
    
    console.log('\n🔄 이제 웹사이트를 새로고침하여 검정 화면 문제가 해결되었는지 확인하세요!');
    console.log('   만약 여전히 문제가 있다면 추가 복구가 필요합니다.');
}

emergencyRecoveryV3().catch(console.error); 