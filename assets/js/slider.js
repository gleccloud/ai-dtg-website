/**
 * SK hynix Rhye Theme Slider System
 * Perfect clone of the original slider functionality
 */

(function($) {
    'use strict';
    
    var SliderImages = {
        init: function() {
            this.sliders = $('.js-slider-images__slider');
            this.initSliders();
        },
        
        initSliders: function() {
            var self = this;
            
            this.sliders.each(function() {
                var $slider = $(this);
                var config = self.getSliderConfig($slider);
                
                var swiper = new Swiper($slider[0], {
                    // Core settings
                    slidesPerView: config.slidesPerView || 4,
                    spaceBetween: config.spaceBetween || 50,
                    centeredSlides: config.centeredSlides || true,
                    loop: true,
                    
                    // Responsive breakpoints
                    breakpoints: {
                        320: {
                            slidesPerView: config.slidesPerViewMobile || 1.33,
                            spaceBetween: config.spaceBetweenMobile || 20,
                            centeredSlides: config.centeredSlidesMobile || 1
                        },
                        768: {
                            slidesPerView: config.slidesPerViewTablet || 1.33,
                            spaceBetween: config.spaceBetweenTablet || 40,
                            centeredSlides: config.centeredSlidesTablet || 1
                        },
                        1024: {
                            slidesPerView: config.slidesPerView || 4,
                            spaceBetween: config.spaceBetween || 50,
                            centeredSlides: config.centeredSlides || true
                        }
                    },
                    
                    // Navigation
                    navigation: {
                        nextEl: $slider.find('.swiper-button-next')[0],
                        prevEl: $slider.find('.swiper-button-prev')[0]
                    },
                    
                    // Pagination
                    pagination: {
                        el: $slider.find('.swiper-pagination')[0],
                        clickable: true,
                        type: 'bullets'
                    },
                    
                    // Autoplay
                    autoplay: config.autoplayEnabled ? {
                        delay: config.autoplayDelay || 2500,
                        disableOnInteraction: false
                    } : false,
                    
                    // Effects
                    effect: 'slide',
                    speed: config.speed || 500,
                    
                    // Touch and mouse
                    touchRatio: config.touchRatio || 3,
                    grabCursor: config.dragMouse || true,
                    
                    // Auto height
                    autoHeight: config.autoHeight || true,
                    
                    // Events
                    on: {
                        init: function() {
                            self.onSliderInit($slider, this);
                        },
                        slideChange: function() {
                            self.onSlideChange($slider, this);
                        },
                        touchStart: function() {
                            self.onTouchStart($slider);
                        },
                        touchEnd: function() {
                            self.onTouchEnd($slider);
                        }
                    }
                });
                
                // Store swiper instance
                $slider.data('swiper', swiper);
            });
        },
        
        getSliderConfig: function($slider) {
            return {
                speed: parseInt($slider.data('speed')) || 500,
                slidesPerView: parseFloat($slider.data('slides-per-view')) || 4,
                slidesPerViewTablet: parseFloat($slider.data('slides-per-view-tablet')) || 1.33,
                slidesPerViewMobile: parseFloat($slider.data('slides-per-view-mobile')) || 1.33,
                spaceBetween: parseInt($slider.data('space-between')) || 50,
                spaceBetweenTablet: parseInt($slider.data('space-between-tablet')) || 40,
                spaceBetweenMobile: parseInt($slider.data('space-between-mobile')) || 20,
                centeredSlides: $slider.data('centered-slides') === 'yes',
                centeredSlidesTablet: parseInt($slider.data('centered-slides-tablet')) || 1,
                centeredSlidesMobile: parseInt($slider.data('centered-slides-mobile')) || 1,
                touchRatio: parseFloat($slider.data('touch-ratio')) || 3,
                autoHeight: $slider.data('auto-height') === 'true',
                autoplayEnabled: $slider.data('autoplay-enabled') === 'true',
                autoplayDelay: parseInt($slider.data('autoplay-delay')) || 2500,
                dragMouse: $slider.data('drag-mouse') === 'true',
                dragCursor: $slider.data('drag-cursor') === 'true',
                dragClass: $slider.data('drag-class') || 'slider-images_touched'
            };
        },
        
        onSliderInit: function($slider, swiper) {
            $slider.addClass('swiper-container-initialized');
            
            // Initialize lazy loading
            this.initLazyLoading($slider);
            
            // Add drag class
            if ($slider.data('drag-cursor') === 'true') {
                $slider.addClass('slider-images_draggable');
            }
        },
        
        onSlideChange: function($slider, swiper) {
            // Update active slide
            $slider.find('.swiper-slide').removeClass('swiper-slide-active');
            $slider.find('.swiper-slide').eq(swiper.activeIndex).addClass('swiper-slide-active');
            
            // Trigger custom event
            $slider.trigger('slideChange', [swiper]);
        },
        
        onTouchStart: function($slider) {
            $slider.addClass('slider-images_touched');
        },
        
        onTouchEnd: function($slider) {
            setTimeout(function() {
                $slider.removeClass('slider-images_touched');
            }, 300);
        },
        
        initLazyLoading: function($slider) {
            $slider.find('.swiper-lazy').each(function() {
                var $img = $(this);
                var src = $img.data('src') || $img.attr('src');
                
                if (src) {
                    var img = new Image();
                    img.onload = function() {
                        $img.attr('src', src).addClass('swiper-lazy-loaded');
                    };
                    img.src = src;
                }
            });
        }
    };
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        SliderImages.init();
    });
    
})(jQuery); 