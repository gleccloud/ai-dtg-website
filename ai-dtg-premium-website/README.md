# GLEC AI DTG Premium Website

**세계 최고 수준의 사이버펑크 스타일 AI-DTG 웹사이트**

## 🚀 프로젝트 개요

GLEC AI DTG는 노후 화물차를 첨단 AI 차량으로 변환하는 세계 최고의 통합 솔루션입니다. 이 웹사이트는 사이버펑크 스타일의 프리미엄 디자인으로 구현된 제품 쇼케이스 사이트입니다.

## ✨ 주요 특징

### 🎨 **사이버펑크 디자인 시스템**
- **네온 컬러 팔레트**: 시안(#00ffff), 마젠타(#ff00ff), 옐로우(#ffff00)
- **그라데이션 효과**: 동적 사이버펑크 그라데이션 애니메이션
- **글래스모피즘**: 블러 효과와 투명도를 활용한 모던 UI
- **네온 글로우**: 호버 시 네온 발광 효과

### 🎭 **인터랙티브 애니메이션**
- **로딩 화면**: 펄스 애니메이션이 적용된 로고
- **히어로 섹션**: 풀스크린 사이버펑크 배경 비디오
- **스크롤 애니메이션**: Intersection Observer 기반 요소별 애니메이션
- **비디오 모달**: 제품 비디오 전체화면 재생

### 📱 **반응형 디자인**
- 모바일, 태블릿, 데스크톱 완벽 지원
- 유연한 그리드 시스템
- 터치 인터랙션 최적화

### ⚡ **성능 최적화**
- Critical CSS 인라인화
- 이미지 및 비디오 지연 로딩
- GPU 가속 애니메이션
- 웹 폰트 사전 로딩

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS Variables, Grid, Flexbox, Animations
- **JavaScript ES6+**: 모던 JavaScript 기능
- **Web APIs**: Intersection Observer, RequestAnimationFrame
- **Fonts**: Orbitron, Inter, JetBrains Mono

## 📁 프로젝트 구조

```
ai-dtg-premium-website/
├── index.html              # 메인 HTML 파일
├── assets/                  # 에셋 디렉토리
│   ├── videos/             # 비디오 파일들
│   │   ├── KakaoTalk_20250814_145521290.mp4    # 히어로 배경 비디오
│   │   ├── KakaoTalk_20250814_145511097.mp4    # AI 변환 비디오
│   │   ├── 0819.mp4                            # DTG 제품 비디오
│   │   └── 화면 기록 2025-08-14 오후 5.51.51.mov  # 대시보드 비디오
│   └── hardware/           # 하드웨어 이미지들
│       ├── beetle_x31_1080.jpg      # AI DTG 제품 이미지
│       └── beetle_x31_B_1080.jpg    # 대시보드 제품 이미지
├── README.md               # 프로젝트 문서
└── package.json            # 프로젝트 설정
```

## 🚀 빠른 시작

### 로컬 서버 실행

```bash
# HTTP 서버 실행 (포트 3000)
npx http-server . -p 3000 --cors

# 또는 Python 서버 (포트 8000)
python3 -m http.server 8000
```

브라우저에서 `http://localhost:3000` 또는 `http://localhost:8000`으로 접속

## 🎯 섹션별 기능

### 1. **히어로 섹션**
- 전체화면 사이버펑크 배경 비디오
- 동적 그라데이션 텍스트 애니메이션
- CTA 버튼 (Explore Products, AI Transformation)

### 2. **AI Transformation 섹션**
- 제품 변환 과정 비디오
- 핵심 기능 카드들 (안전 향상, 탄소 감축)
- 호버 인터랙션 효과

### 3. **Products 섹션**
- GLEC AI DTG 하드웨어 제품
- GLEC AI Dashboard 소프트웨어 제품
- 비디오 오버레이 및 모달 재생

### 4. **네비게이션**
- 고정 네비게이션 바
- 스크롤 시 배경 투명도 변화
- 부드러운 스크롤 네비게이션

## 🔧 커스터마이징

### 컬러 테마 변경
CSS Variables를 통해 쉽게 컬러 테마를 변경할 수 있습니다:

```css
:root {
    --glec-cyan: #00ffff;        /* 메인 시안 컬러 */
    --glec-magenta: #ff00ff;     /* 메인 마젠타 컬러 */
    --glec-yellow: #ffff00;      /* 메인 옐로우 컬러 */
}
```

### 애니메이션 속도 조정

```css
:root {
    --duration-fast: 200ms;      /* 빠른 애니메이션 */
    --duration-normal: 400ms;    /* 일반 애니메이션 */
    --duration-slow: 600ms;      /* 느린 애니메이션 */
}
```

## 📊 성능 메트릭

- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3초

## 🌐 브라우저 지원

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📝 라이선스

이 프로젝트는 GLEC의 독점 소유입니다.

---

**개발**: GLEC AI DTG Team  
**버전**: 1.0.0  
**업데이트**: 2024-08-19