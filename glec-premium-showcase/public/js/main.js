/**
 * GLEC AI DTG Premium Showcase - Main JavaScript
 * World-Class Commercial-Grade Interactive Features
 */

class GLECShowcase {
    constructor() {
        this.currentSection = 'hero';
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeScrollEffects();
        this.initializeVideoPlayers();
        this.setupNavigation();
        this.setupFrameIndicators();
        this.hideLoadingScreen();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Window scroll event
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.updateScrollProgress();
                this.updateActiveSection();
                this.updateFrameIndicators();
            }
        });

        // Window resize event
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    /**
     * Initialize scroll effects
     */
    initializeScrollEffects() {
        // Add scroll animations to elements
        const scrollElements = document.querySelectorAll('.glec-scroll-animate');
        scrollElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            // Stagger animation delay
            setTimeout(() => {
                this.observeElement(element);
            }, index * 100);
        });
    }

    /**
     * Observe element for scroll animations
     */
    observeElement(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(element);
    }

    /**
     * Initialize video players
     */
    initializeVideoPlayers() {
        // Setup video play functionality
        window.playVideo = (videoId) => {
            const video = document.getElementById(videoId);
            if (video) {
                video.play();
                video.parentElement.querySelector('.glec-play-overlay').style.display = 'none';
            }
        };

        // Add video event listeners
        document.querySelectorAll('video').forEach(video => {
            video.addEventListener('ended', () => {
                const overlay = video.parentElement.querySelector('.glec-play-overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            });

            video.addEventListener('pause', () => {
                const overlay = video.parentElement.querySelector('.glec-play-overlay');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            });
        });
    }

    /**
     * Setup navigation
     */
    setupNavigation() {
        const nav = document.getElementById('mainNav');
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    nav.classList.add('glec-nav-scrolled');
                } else {
                    nav.classList.remove('glec-nav-scrolled');
                }
            });
        }
    }

    /**
     * Setup frame indicators
     */
    setupFrameIndicators() {
        const indicators = document.querySelectorAll('.glec-frame-indicator');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const targetFrame = indicator.dataset.frame;
                const targetSection = document.getElementById(targetFrame);
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                }
            });
        });
    }

    /**
     * Update scroll progress
     */
    updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgressBar');
        if (scrollProgress) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    /**
     * Update active section
     */
    updateActiveSection() {
        const sections = ['hero', 'products', 'technology', 'videos', 'gallery', 'contact'];
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.currentSection = sectionId;
                    this.updateNavigationActive(sectionId);
                }
            }
        });
    }

    /**
     * Update navigation active state
     */
    updateNavigationActive(sectionId) {
        document.querySelectorAll('.glec-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Update frame indicators
     */
    updateFrameIndicators() {
        document.querySelectorAll('.glec-frame-indicator').forEach(indicator => {
            indicator.classList.remove('active');
            if (indicator.dataset.frame === this.currentSection) {
                indicator.classList.add('active');
            }
        });
    }

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        this.isScrolling = true;
        const targetPosition = element.offsetTop - 80; // Account for fixed nav
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, 1000);
            
            window.scrollTo(0, run);
            
            if (timeElapsed < 1000) {
                requestAnimationFrame(animation);
            } else {
                this.isScrolling = false;
            }
        };

        requestAnimationFrame(animation);
    }

    /**
     * Easing function
     */
    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Update any responsive elements
        this.updateScrollProgress();
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.glecShowcase.smoothScrollTo(section);
    }
}

function showProductDetail(productId) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    const productData = {
        'dtg-device': {
            title: 'AI 기반 디지털운행기록장치',
            description: '운전자 안전과 수송 탄소 감축을 위한 AI 기반 디지털운행기록장치입니다.',
            features: ['AI 안전 추론', '실시간 데이터 분석', '고정밀 센싱', '확장 가능한 아키텍처']
        },
        'sensor-array': {
            title: '안전 추론 AI 시스템',
            description: '다중 센서 퓨전 기술을 활용한 실시간 안전 추론 AI 시스템입니다.',
            features: ['다중 센서 퓨전', '고정밀 모니터링', '실시간 안전 분석', '환경 적응형 시스템']
        },
        'truck-integration': {
            title: 'VCP IoT 플랫폼',
            description: '차량 중심 프로토콜(VCP) 기반 IoT 플랫폼입니다.',
            features: ['차량 통합', '텔레메트리 시스템', '실시간 모니터링', '플릿 관리']
        }
    };
    
    const product = productData[productId];
    if (product) {
        title.textContent = product.title;
        body.innerHTML = `
            <p>${product.description}</p>
            <h4>주요 특징:</h4>
            <ul>
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        modal.classList.add('open');
    }
}

function showImageDetail(imageType) {
    const modal = document.getElementById('imageModal');
    const title = document.getElementById('imageModalTitle');
    const body = document.getElementById('imageModalBody');
    
    const imageData = {
        'hardware': {
            title: '하드웨어 구성요소',
            description: '하드웨어 구성요소와 사양에 대한 상세한 정보입니다.',
            content: '하드웨어 구성요소는 고성능 프로세서, 센서, 통신 모듈을 포함하며, 까다로운 환경에서 최적의 성능을 위해 설계되었습니다.'
        },
        'dashboard': {
            title: '대시보드 인터페이스',
            description: '사용자 인터페이스 및 제어 시스템 개요입니다.',
            content: '우리의 대시보드는 직관적인 제어 및 모니터링 기능을 제공하며, 실시간 데이터 시각화 및 분석 도구를 포함합니다.'
        }
    };
    
    const data = imageData[imageType];
    if (data) {
        title.textContent = data.title;
        body.innerHTML = `
            <p>${data.description}</p>
            <p>${data.content}</p>
        `;
        modal.classList.add('open');
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
}

function view3DModel(productId) {
    // 3D 모델 뷰어 기능 (향후 구현 예정)
    console.log('3D 모델 뷰어 요청:', productId);
    alert('3D 모델 뷰어 기능이 곧 추가될 예정입니다!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.glecShowcase = new GLECShowcase();
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('glec-modal')) {
        e.target.classList.remove('open');
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.glec-modal').forEach(modal => {
            modal.classList.remove('open');
        });
    }
}); 