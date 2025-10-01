/**
 * GLEC AI DTG Premium Showcase - Utility Functions
 * World-Class Commercial-Grade Helper Functions and Utilities
 */
/**
 * DOM Utilities
 */
export class DOMUtils {
    /**
     * Create element with attributes
     */
    static createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        // Set attributes
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        // Append children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
            else {
                element.appendChild(child);
            }
        });
        return element;
    }
    /**
     * Add event listener with cleanup
     */
    static addEventListenerWithCleanup(element, event, handler, options) {
        element.addEventListener(event, handler, options);
        return () => element.removeEventListener(event, handler, options);
    }
    /**
     * Wait for element to exist in DOM
     */
    static waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }
            const observer = new MutationObserver((mutations) => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }
    /**
     * Check if element is in viewport
     */
    static isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        return (rect.top <= windowHeight - threshold &&
            rect.bottom >= threshold &&
            rect.left <= windowWidth - threshold &&
            rect.right >= threshold);
    }
    /**
     * Get element's computed styles
     */
    static getComputedStyles(element) {
        return window.getComputedStyle(element);
    }
    /**
     * Set multiple CSS properties at once
     */
    static setStyles(element, styles) {
        Object.entries(styles).forEach(([property, value]) => {
            element.style.setProperty(property, value);
        });
    }
    /**
     * Add/remove CSS classes with animation
     */
    static toggleClassWithAnimation(element, className, duration = 300) {
        return new Promise((resolve) => {
            const hasClass = element.classList.contains(className);
            if (hasClass) {
                element.classList.remove(className);
            }
            else {
                element.classList.add(className);
            }
            setTimeout(resolve, duration);
        });
    }
}
/**
 * Animation Utilities
 */
export class AnimationUtils {
    /**
     * Animate element property
     */
    static animateProperty(element, property, from, to, duration = 1000, easing = 'easeInOutCubic', onUpdate, onComplete) {
        let startTime = null;
        let animationId;
        const animate = (currentTime) => {
            if (!startTime)
                startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = this.easing[easing](progress);
            const currentValue = from + (to - from) * easedProgress;
            element.style.setProperty(property, currentValue.toString());
            if (onUpdate) {
                onUpdate(currentValue);
            }
            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
            else {
                if (onComplete) {
                    onComplete();
                }
            }
        };
        animationId = requestAnimationFrame(animate);
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }
    /**
     * Stagger animation for multiple elements
     */
    static staggerAnimation(elements, animationFn, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                animationFn(element, index);
            }, index * delay);
        });
    }
    /**
     * Create intersection observer for animations
     */
    static createIntersectionObserver(callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        return new IntersectionObserver(callback, defaultOptions);
    }
}
/**
 * Easing functions
 */
AnimationUtils.easing = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)),
    easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
    easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 + 1
};
/**
 * Performance Utilities
 */
export class PerformanceUtils {
    /**
     * Measure FPS
     */
    static measureFPS() {
        this.frameCount++;
        const currentTime = performance.now();
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
        return this.fps;
    }
    /**
     * Debounce function
     */
    static debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
    /**
     * Throttle function
     */
    static throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    /**
     * Measure execution time
     */
    static measureExecutionTime(fn, label = 'Execution') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${label}: ${(end - start).toFixed(2)}ms`);
        return result;
    }
    /**
     * Check if device supports hardware acceleration
     */
    static supportsHardwareAcceleration() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            return false;
        }
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            return renderer.includes('GPU') || renderer.includes('Graphics');
        }
        return true;
    }
}
PerformanceUtils.frameCount = 0;
PerformanceUtils.lastTime = performance.now();
PerformanceUtils.fps = 60;
/**
 * Media Utilities
 */
export class MediaUtils {
    /**
     * Check if video format is supported
     */
    static isVideoFormatSupported(format) {
        const video = document.createElement('video');
        return video.canPlayType(`video/${format}`) !== '';
    }
    /**
     * Get video dimensions
     */
    static getVideoDimensions(video) {
        return new Promise((resolve) => {
            if (video.videoWidth && video.videoHeight) {
                resolve({ width: video.videoWidth, height: video.videoHeight });
            }
            else {
                video.addEventListener('loadedmetadata', () => {
                    resolve({ width: video.videoWidth, height: video.videoHeight });
                }, { once: true });
            }
        });
    }
    /**
     * Create video thumbnail
     */
    static createVideoThumbnail(video, time = 0, width = 320, height = 180) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }
            canvas.width = width;
            canvas.height = height;
            video.currentTime = time;
            video.addEventListener('seeked', () => {
                ctx.drawImage(video, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            }, { once: true });
            video.addEventListener('error', () => {
                reject(new Error('Failed to load video'));
            }, { once: true });
        });
    }
    /**
     * Preload media
     */
    static preloadMedia(urls, type = 'image') {
        const promises = urls.map(url => {
            return new Promise((resolve, reject) => {
                let element;
                switch (type) {
                    case 'image':
                        element = new Image();
                        break;
                    case 'video':
                        element = document.createElement('video');
                        element.preload = 'metadata';
                        break;
                    case 'audio':
                        element = document.createElement('audio');
                        element.preload = 'metadata';
                        break;
                }
                element.onload = () => resolve();
                element.onerror = () => reject(new Error(`Failed to load ${url}`));
                element.src = url;
            });
        });
        return Promise.all(promises);
    }
}
/**
 * Storage Utilities
 */
export class StorageUtils {
    /**
     * Save to localStorage with expiration
     */
    static setWithExpiry(key, value, ttl) {
        const item = {
            value,
            expiry: Date.now() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    /**
     * Get from localStorage with expiration check
     */
    static getWithExpiry(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }
    /**
     * Clear expired items
     */
    static clearExpired() {
        Object.keys(localStorage).forEach(key => {
            this.getWithExpiry(key); // This will automatically remove expired items
        });
    }
}
/**
 * Math Utilities
 */
export class MathUtils {
    /**
     * Clamp value between min and max
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    /**
     * Linear interpolation
     */
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    /**
     * Map value from one range to another
     */
    static map(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    /**
     * Convert degrees to radians
     */
    static degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }
    /**
     * Convert radians to degrees
     */
    static radToDeg(radians) {
        return radians * (180 / Math.PI);
    }
    /**
     * Generate random number between min and max
     */
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
    /**
     * Generate random integer between min and max
     */
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
/**
 * Color Utilities
 */
export class ColorUtils {
    /**
     * Convert hex to RGB
     */
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    /**
     * Convert RGB to hex
     */
    static rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    /**
     * Convert RGB to HSL
     */
    static rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
    /**
     * Convert HSL to RGB
     */
    static hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    /**
     * Generate complementary color
     */
    static getComplementaryColor(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb)
            return hex;
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.h = (hsl.h + 180) % 360;
        const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }
}
// Export all utilities as a single object
export const Utils = {
    DOM: DOMUtils,
    Animation: AnimationUtils,
    Performance: PerformanceUtils,
    Media: MediaUtils,
    Storage: StorageUtils,
    Math: MathUtils,
    Color: ColorUtils
};
