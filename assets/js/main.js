/**
 * SK hynix Rhye Theme Main JavaScript
 * Perfect clone of the original animation and interaction system
 */

(function($) {
    'use strict';
    
    var RhyeTheme = {
        init: function() {
            this.initGSAP();
            this.initScrollAnimations();
            this.initSmoothScroll();
            this.initSplitText();
            this.initLazyLoading();
            this.initMobileOptimizations();
        },
        
        initGSAP: function() {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Set default ScrollTrigger settings
            ScrollTrigger.config({
                ignoreMobileResize: true
            });
            
            // Refresh ScrollTrigger on window resize
            $(window).on('resize', function() {
                ScrollTrigger.refresh();
            });
        },
        
        initScrollAnimations: function() {
            var self = this;
            
            // Animate sections on scroll
            $('[data-arts-os-animation="animated"]').each(function() {
                var $element = $(this);
                var animation = $element.data('arts-os-animation') || 'fadeInUp';
                var delay = $element.data('arts-os-animation-delay') || 0;
                var duration = $element.data('arts-os-animation-duration') || 1;
                
                gsap.fromTo($element, {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: duration,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: $element,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });
            
            // Hero section animations
            this.initHeroAnimations();
            
            // Slider animations
            this.initSliderAnimations();
        },
        
        initHeroAnimations: function() {
            var $hero = $('.section-masthead');
            var $heading = $hero.find('.section-content__heading');
            var $text = $hero.find('.section-content__text');
            
            // Stagger animation for hero elements
            gsap.fromTo([$heading, $text], {
                opacity: 0,
                y: 100
            }, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: $hero,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                }
            });
        },
        
        initSliderAnimations: function() {
            var $slider = $('.slider-images');
            var $slides = $slider.find('.swiper-slide');
            
            // Animate slides on change
            $slider.on('slideChange', function() {
                var activeSlide = $slides.eq($(this).data('swiper').activeIndex);
                
                gsap.fromTo(activeSlide, {
                    opacity: 0,
                    scale: 0.8
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            });
        },
        
        initSmoothScroll: function() {
            // Smooth scroll for anchor links
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                
                var target = $(this.getAttribute('href'));
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800, 'easeInOutQuart');
                }
            });
        },
        
        initSplitText: function() {
            // Split text animations - preserve original HTML structure
            $('.split-text').each(function() {
                var $text = $(this);
                var originalHTML = $text.html();
                var text = $text.text().trim();
                
                if (text && text.length > 0) {
                    var words = text.split(' ');
                    
                    // Create wrapper for animation
                    var $wrapper = $('<div class="split-text-wrapper"></div>');
                    $text.append($wrapper);
                    
                    words.forEach(function(word, index) {
                        var $word = $('<span>').text(word + ' ').addClass('split-word');
                        $wrapper.append($word);
                        
                        // Animate each word
                        gsap.fromTo($word, {
                            opacity: 0,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: $word,
                                start: 'top 90%',
                                toggleActions: 'play none none reverse'
                            }
                        });
                    });
                }
            });
        },
        
        initLazyLoading: function() {
            // Lazy load images
            $('img[loading="lazy"]').each(function() {
                var $img = $(this);
                var src = $img.data('src') || $img.attr('src');
                
                if (src) {
                    var img = new Image();
                    img.onload = function() {
                        $img.attr('src', src).addClass('lazy-loaded');
                    };
                    img.src = src;
                }
            });
        },
        
        initMobileOptimizations: function() {
            // Mobile-specific optimizations
            if (window.innerWidth < 768) {
                // Reduce animation complexity on mobile
                gsap.globalTimeline.timeScale(0.8);
                
                // Adjust ScrollTrigger settings for mobile
                ScrollTrigger.config({
                    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
                });
            }
        }
    };
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        RhyeTheme.init();
    });
    
    // Initialize on window load
    $(window).on('load', function() {
        // Refresh ScrollTrigger after all images are loaded
        ScrollTrigger.refresh();
    });
    
})(jQuery); 