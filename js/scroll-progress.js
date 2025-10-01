/**
 * GLEC Scroll Progress Indicator
 * 스크롤 진행률을 시각적으로 표시
 */

class GLECScrollProgress {
    constructor() {
        this.progressBar = null;
        this.init();
    }

    init() {
        this.progressBar = document.querySelector('.glec-scroll-progress-bar');
        if (this.progressBar) {
            this.setupScrollListener();
            console.log('GLEC Scroll Progress initialized');
        }
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
    }

    updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${scrollPercentage}%`;
        }
    }
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.glecScrollProgress = new GLECScrollProgress();
}); 