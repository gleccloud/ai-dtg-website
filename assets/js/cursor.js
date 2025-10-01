/**
 * SK hynix Rhye Theme Cursor System
 * Perfect clone of the original cursor follower functionality
 */

(function($) {
    'use strict';
    
    var CursorFollower = {
        init: function() {
            this.cursor = $('[data-arts-cursor-follower]');
            this.cursorInner = this.cursor.find('.arts-cursor-follower__inner');
            this.cursorCircle = this.cursor.find('.arts-cursor-follower__circle');
            this.cursorArrow = this.cursor.find('.arts-cursor-follower__arrow');
            
            this.isVisible = false;
            this.isHovering = false;
            this.mouseX = 0;
            this.mouseY = 0;
            this.cursorX = 0;
            this.cursorY = 0;
            
            this.initEvents();
            this.animate();
        },
        
        initEvents: function() {
            var self = this;
            
            // Mouse move
            $(document).on('mousemove', function(e) {
                self.mouseX = e.clientX;
                self.mouseY = e.clientY;
                
                if (!self.isVisible) {
                    self.show();
                }
            });
            
            // Mouse leave
            $(document).on('mouseleave', function() {
                self.hide();
            });
            
            // Hover effects
            $('a, button, .swiper-slide, .slider-images__item').on('mouseenter', function() {
                self.hoverIn();
            }).on('mouseleave', function() {
                self.hoverOut();
            });
            
            // Slider drag
            $('.swiper-container').on('mousedown', function() {
                self.dragStart();
            }).on('mouseup mouseleave', function() {
                self.dragEnd();
            });
        },
        
        show: function() {
            this.isVisible = true;
            this.cursor.addClass('is-visible');
        },
        
        hide: function() {
            this.isVisible = false;
            this.cursor.removeClass('is-visible');
        },
        
        hoverIn: function() {
            this.isHovering = true;
            this.cursor.addClass('is-hovering');
        },
        
        hoverOut: function() {
            this.isHovering = false;
            this.cursor.removeClass('is-hovering');
        },
        
        dragStart: function() {
            this.cursor.addClass('is-dragging');
        },
        
        dragEnd: function() {
            this.cursor.removeClass('is-dragging');
        },
        
        animate: function() {
            var self = this;
            
            function update() {
                // Smooth cursor following
                self.cursorX += (self.mouseX - self.cursorX) * 0.1;
                self.cursorY += (self.mouseY - self.cursorY) * 0.1;
                
                // Apply transforms
                self.cursor.css({
                    transform: 'translate3d(' + self.cursorX + 'px, ' + self.cursorY + 'px, 0)'
                });
                
                requestAnimationFrame(update);
            }
            
            update();
        }
    };
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        CursorFollower.init();
    });
    
})(jQuery); 