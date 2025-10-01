// SK 하이닉스 컴포넌트 - 완벽 복제 버전

(function($) {
    'use strict';
    
    // 페이지 로드 완료 후 실행
    $(document).ready(function() {
        initSKHynixComponents();
    });
    
    // SK 하이닉스 컴포넌트 초기화
    function initSKHynixComponents() {
        console.log('SK 하이닉스 컴포넌트 초기화 시작');
        
        // 커튼 애니메이션 초기화
        initCurtainAnimation();
        
        // 스피너 초기화
        initSpinner();
        
        // Elementor 섹션 애니메이션 초기화
        initElementorAnimations();
        
        // Lottie 애니메이션 초기화
        initLottieAnimations();
        
        // 커스텀 커서 초기화
        initCustomCursor();
        
        // 스크롤 이벤트 초기화
        initScrollEvents();
        
        console.log('SK 하이닉스 컴포넌트 초기화 완료');
    }
    
    // 커튼 애니메이션 초기화
    function initCurtainAnimation() {
        const transitionCurtain = $('#js-page-transition-curtain');
        const headerCurtain = $('#js-header-curtain');
        
        if (transitionCurtain.length) {
            // 페이지 전환 커튼 애니메이션
            setTimeout(function() {
                transitionCurtain.addClass('curtain--hidden');
            }, 1000);
        }
        
        if (headerCurtain.length) {
            // 헤더 커튼 애니메이션
            $(window).on('scroll', function() {
                const scrollTop = $(window).scrollTop();
                if (scrollTop > 100) {
                    headerCurtain.addClass('curtain--hidden');
                } else {
                    headerCurtain.removeClass('curtain--hidden');
                }
            });
        }
    }
    
    // 스피너 초기화
    function initSpinner() {
        const spinner = $('#js-spinner');
        
        if (spinner.length) {
            // 페이지 로드 완료 후 스피너 숨김
            $(window).on('load', function() {
                setTimeout(function() {
                    spinner.fadeOut(500);
                }, 500);
            });
        }
    }
    
    // Elementor 섹션 애니메이션 초기화
    function initElementorAnimations() {
        const sections = $('.elementor-section');
        
        if (sections.length) {
            // Intersection Observer를 사용한 스크롤 애니메이션
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        entry.target.classList.remove('animate-out');
                    } else {
                        entry.target.classList.add('animate-out');
                        entry.target.classList.remove('animate-in');
                    }
                });
            }, observerOptions);
            
            sections.each(function() {
                observer.observe(this);
            });
        }
    }
    
    // Lottie 애니메이션 초기화
    function initLottieAnimations() {
        const lottieWrappers = $('.jbafes-lotties-animation-wrapper');
        
        if (lottieWrappers.length) {
            lottieWrappers.each(function() {
                const wrapper = $(this);
                const dataPath = wrapper.attr('data-path');
                const playAction = wrapper.attr('data-play_action');
                const scrollBased = wrapper.attr('data-la_scrollbased');
                
                if (dataPath && playAction === 'parallax_effect') {
                    initParallaxLottie(wrapper, dataPath);
                }
                
                if (scrollBased === 'la_custom') {
                    initScrollBasedLottie(wrapper);
                }
            });
        }
    }
    
    // 패럴랙스 Lottie 애니메이션 초기화
    function initParallaxLottie(wrapper, dataPath) {
        // Lottie 애니메이션 로드 및 패럴랙스 효과 적용
        if (typeof lottie !== 'undefined') {
            const animation = lottie.loadAnimation({
                container: wrapper[0],
                renderer: 'svg',
                loop: true,
                autoplay: false,
                path: dataPath
            });
            
            // 스크롤 기반 프레임 제어
            $(window).on('scroll', function() {
                const scrollTop = $(window).scrollTop();
                const wrapperTop = wrapper.offset().top;
                const wrapperHeight = wrapper.height();
                const windowHeight = $(window).height();
                
                if (scrollTop + windowHeight > wrapperTop && scrollTop < wrapperTop + wrapperHeight) {
                    const progress = (scrollTop + windowHeight - wrapperTop) / (windowHeight + wrapperHeight);
                    const frame = Math.floor(progress * animation.totalFrames);
                    animation.goToAndStop(frame, true);
                }
            });
        }
    }
    
    // 스크롤 기반 Lottie 애니메이션 초기화
    function initScrollBasedLottie(wrapper) {
        const sectionDuration = parseInt(wrapper.attr('data-la_section_duration')) || 500;
        const sectionOffset = parseInt(wrapper.attr('data-la_section_offset')) || 300;
        
        $(window).on('scroll', function() {
            const scrollTop = $(window).scrollTop();
            const wrapperTop = wrapper.offset().top;
            const windowHeight = $(window).height();
            
            if (scrollTop + windowHeight > wrapperTop - sectionOffset) {
                const progress = Math.min((scrollTop + windowHeight - wrapperTop + sectionOffset) / sectionDuration, 1);
                wrapper.css('transform', `translateY(${30 * (1 - progress)}px)`);
                wrapper.css('opacity', progress);
            }
        });
    }
    
    // 커스텀 커서 초기화
    function initCustomCursor() {
        if ($('body').hasClass('custom-cursor-enabled')) {
            const cursor = $('<div class="custom-cursor"></div>');
            $('body').append(cursor);
            
            $(document).on('mousemove', function(e) {
                cursor.css({
                    left: e.clientX - 10,
                    top: e.clientY - 10
                });
            });
            
            $('a, button, .elementor-widget').on('mouseenter', function() {
                cursor.addClass('cursor-hover');
            }).on('mouseleave', function() {
                cursor.removeClass('cursor-hover');
            });
        }
    }
    
    // 스크롤 이벤트 초기화
    function initScrollEvents() {
        let ticking = false;
        
        function updateScroll() {
            // 스크롤 기반 애니메이션 업데이트
            updateScrollAnimations();
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }
        
        $(window).on('scroll', requestTick);
    }
    
    // 스크롤 애니메이션 업데이트
    function updateScrollAnimations() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        // 배경 모션 효과 적용
        $('[data-background_motion_fx_motion_fx_scrolling="yes"]').each(function() {
            const element = $(this);
            const speed = 0.5;
            const yPos = -(scrollTop * speed);
            element.css('transform', `translateY(${yPos}px)`);
        });
    }
    
    // 유틸리티 함수들
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // 전역 함수로 노출
    window.SKHynixComponents = {
        init: initSKHynixComponents,
        initCurtainAnimation: initCurtainAnimation,
        initSpinner: initSpinner,
        initElementorAnimations: initElementorAnimations,
        initLottieAnimations: initLottieAnimations,
        initCustomCursor: initCustomCursor
    };
    
})(jQuery); 