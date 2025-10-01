# GLEC AI DTG Premium Showcase - Figma Design System

## 🎨 디자인 철학
**"World-Class Commercial-Grade Product Showcase"**
- SK Hynix 수준의 미러급 복제 품질
- 상용화 가능한 최고 수준의 UX/UI
- 검정 배경 기반의 프리미엄 느낌
- 마우스 스크롤 인터랙티브 애니메이션

## 🌈 컬러 시스템

### Primary Colors
```css
--glec-black: #000000
--glec-dark-gray: #0a0a0a
--glec-charcoal: #1a1a1a
--glec-steel: #2d2d2d
```

### Accent Colors
```css
--glec-gold: #FFD700
--glec-silver: #C0C0C0
--glec-bronze: #CD7F32
--glec-platinum: #E5E4E2
```

### Gradient System
```css
--glec-gradient-primary: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)
--glec-gradient-accent: linear-gradient(135deg, #FFD700 0%, #FFA500 100%)
--glec-gradient-metal: linear-gradient(135deg, #C0C0C0 0%, #E5E4E2 100%)
--glec-gradient-glow: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)
```

### Glassmorphism
```css
--glec-glass-bg: rgba(255, 255, 255, 0.05)
--glec-glass-border: rgba(255, 255, 255, 0.1)
--glec-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
```

## 🔤 타이포그래피

### Font Hierarchy
```css
--glec-font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
--glec-font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
--glec-font-mono: 'JetBrains Mono', 'Fira Code', monospace
```

### Font Sizes
```css
--glec-text-xs: 0.75rem    /* 12px */
--glec-text-sm: 0.875rem   /* 14px */
--glec-text-base: 1rem     /* 16px */
--glec-text-lg: 1.125rem   /* 18px */
--glec-text-xl: 1.25rem    /* 20px */
--glec-text-2xl: 1.5rem    /* 24px */
--glec-text-3xl: 1.875rem  /* 30px */
--glec-text-4xl: 2.25rem   /* 36px */
--glec-text-5xl: 3rem      /* 48px */
--glec-text-6xl: 3.75rem   /* 60px */
```

### Font Weights
```css
--glec-font-light: 300
--glec-font-normal: 400
--glec-font-medium: 500
--glec-font-semibold: 600
--glec-font-bold: 700
--glec-font-extrabold: 800
```

## 📏 스페이싱 시스템

### Base Spacing
```css
--glec-space-0: 0px
--glec-space-1: 0.25rem   /* 4px */
--glec-space-2: 0.5rem    /* 8px */
--glec-space-3: 0.75rem   /* 12px */
--glec-space-4: 1rem      /* 16px */
--glec-space-5: 1.25rem   /* 20px */
--glec-space-6: 1.5rem    /* 24px */
--glec-space-8: 2rem      /* 32px */
--glec-space-10: 2.5rem   /* 40px */
--glec-space-12: 3rem     /* 48px */
--glec-space-16: 4rem     /* 64px */
--glec-space-20: 5rem     /* 80px */
--glec-space-24: 6rem     /* 96px */
--glec-space-32: 8rem     /* 128px */
--glec-space-40: 10rem    /* 160px */
--glec-space-48: 12rem    /* 192px */
--glec-space-56: 14rem    /* 224px */
--glec-space-64: 16rem    /* 256px */
```

## 🎭 애니메이션 시스템

### Easing Functions
```css
--glec-ease-linear: cubic-bezier(0, 0, 1, 1)
--glec-ease-in: cubic-bezier(0.4, 0, 1, 1)
--glec-ease-out: cubic-bezier(0, 0, 0.2, 1)
--glec-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--glec-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
--glec-ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

### Animation Durations
```css
--glec-duration-75: 75ms
--glec-duration-100: 100ms
--glec-duration-150: 150ms
--glec-duration-200: 200ms
--glec-duration-300: 300ms
--glec-duration-500: 500ms
--glec-duration-700: 700ms
--glec-duration-1000: 1000ms
```

### Scroll-Based Animations
```css
--glec-scroll-fade-in: fadeIn 0.6s ease-out
--glec-scroll-slide-up: slideUp 0.8s ease-out
--glec-scroll-scale-in: scaleIn 0.6s ease-out
--glec-scroll-rotate-in: rotateIn 0.8s ease-out
```

## 🧩 컴포넌트 시스템

### Button Components
```css
/* Primary Button */
.glec-btn-primary {
  background: var(--glec-gradient-accent);
  color: var(--glec-black);
  padding: var(--glec-space-3) var(--glec-space-6);
  border-radius: var(--glec-border-radius-lg);
  font-weight: var(--glec-font-semibold);
  transition: all var(--glec-duration-200) var(--glec-ease-out);
}

/* Secondary Button */
.glec-btn-secondary {
  background: var(--glec-glass-bg);
  color: var(--glec-gold);
  border: 1px solid var(--glec-glass-border);
  padding: var(--glec-space-3) var(--glec-space-6);
  border-radius: var(--glec-border-radius-lg);
  font-weight: var(--glec-font-medium);
  transition: all var(--glec-duration-200) var(--glec-ease-out);
}
```

### Card Components
```css
/* Product Card */
.glec-product-card {
  background: var(--glec-glass-bg);
  border: 1px solid var(--glec-glass-border);
  border-radius: var(--glec-border-radius-xl);
  padding: var(--glec-space-6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all var(--glec-duration-300) var(--glec-ease-out);
}

/* Video Card */
.glec-video-card {
  background: var(--glec-gradient-primary);
  border-radius: var(--glec-border-radius-lg);
  overflow: hidden;
  position: relative;
  transition: all var(--glec-duration-300) var(--glec-ease-out);
}
```

### Navigation Components
```css
/* Main Navigation */
.glec-nav {
  background: var(--glec-glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glec-glass-border);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--glec-z-nav);
}

/* Frame Indicators */
.glec-frame-indicators {
  position: fixed;
  right: var(--glec-space-6);
  top: 50%;
  transform: translateY(-50%);
  z-index: var(--glec-z-indicators);
}
```

## 📱 반응형 브레이크포인트

### Breakpoint System
```css
--glec-bp-sm: 640px
--glec-bp-md: 768px
--glec-bp-lg: 1024px
--glec-bp-xl: 1280px
--glec-bp-2xl: 1536px
```

### Container Max Widths
```css
--glec-container-sm: 640px
--glec-container-md: 768px
--glec-container-lg: 1024px
--glec-container-xl: 1280px
--glec-container-2xl: 1536px
```

## 🎯 Z-Index 시스템

### Layer Management
```css
--glec-z-base: 1
--glec-z-dropdown: 1000
--glec-z-sticky: 1020
--glec-z-fixed: 1030
--glec-z-modal-backdrop: 1040
--glec-z-modal: 1050
--glec-z-popover: 1060
--glec-z-tooltip: 1070
--glec-z-nav: 1080
--glec-z-indicators: 1090
--glec-z-overlay: 1100
```

## 🔧 유틸리티 클래스

### Display Utilities
```css
.glec-hidden { display: none; }
.glec-block { display: block; }
.glec-inline-block { display: inline-block; }
.glec-inline { display: inline; }
.glec-flex { display: flex; }
.glec-inline-flex { display: inline-flex; }
.glec-grid { display: grid; }
.glec-inline-grid { display: inline-grid; }
```

### Flexbox Utilities
```css
.glec-flex-row { flex-direction: row; }
.glec-flex-col { flex-direction: column; }
.glec-flex-wrap { flex-wrap: wrap; }
.glec-flex-nowrap { flex-wrap: nowrap; }
.glec-items-start { align-items: flex-start; }
.glec-items-center { align-items: center; }
.glec-items-end { align-items: flex-end; }
.glec-justify-start { justify-content: flex-start; }
.glec-justify-center { justify-content: center; }
.glec-justify-end { justify-content: flex-end; }
.glec-justify-between { justify-content: space-between; }
.glec-justify-around { justify-content: space-around; }
```

### Spacing Utilities
```css
.glec-p-0 { padding: var(--glec-space-0); }
.glec-p-1 { padding: var(--glec-space-1); }
.glec-p-2 { padding: var(--glec-space-2); }
.glec-p-4 { padding: var(--glec-space-4); }
.glec-p-6 { padding: var(--glec-space-6); }
.glec-p-8 { padding: var(--glec-space-8); }

.glec-m-0 { margin: var(--glec-space-0); }
.glec-m-1 { margin: var(--glec-space-1); }
.glec-m-2 { margin: var(--glec-space-2); }
.glec-m-4 { margin: var(--glec-space-4); }
.glec-m-6 { margin: var(--glec-space-6); }
.glec-m-8 { margin: var(--glec-space-8); }
```

## 🎨 Figma 컴포넌트 구조

### 1. Atoms (기본 요소)
- Buttons
- Inputs
- Icons
- Typography
- Colors

### 2. Molecules (분자)
- Form Fields
- Search Bars
- Navigation Items
- Product Badges

### 3. Organisms (유기체)
- Navigation Bars
- Product Cards
- Video Players
- Contact Forms

### 4. Templates (템플릿)
- Page Layouts
- Section Layouts
- Grid Systems

### 5. Pages (페이지)
- Home Page
- Product Showcase
- Video Gallery
- Contact Page

## 🚀 구현 가이드라인

### 1. 성능 최적화
- CSS-in-JS 사용 금지
- Critical CSS 인라인화
- 이미지 lazy loading
- 코드 스플리팅

### 2. 접근성
- WCAG 2.1 AA 준수
- 키보드 네비게이션
- 스크린 리더 지원
- 고대비 모드 지원

### 3. SEO 최적화
- Semantic HTML 구조
- Meta 태그 최적화
- Open Graph 태그
- Schema.org 마크업

### 4. 크로스 브라우저
- Modern CSS 지원
- Fallback 스타일
- Progressive Enhancement
- Graceful Degradation

이 디자인 시스템을 기반으로 세계 최고 수준의 상용화 가능한 제품 쇼케이스 웹사이트를 구현하겠습니다. 