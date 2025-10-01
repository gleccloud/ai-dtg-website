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
  static createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    attributes: Record<string, string> = {},
    children: (string | Node)[] = []
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    
    // Append children
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    
    return element;
  }

  /**
   * Add event listener with cleanup
   */
  static addEventListenerWithCleanup(
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): () => void {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  }

  /**
   * Wait for element to exist in DOM
   */
  static waitForElement(selector: string, timeout: number = 5000): Promise<Element> {
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
  static isInViewport(element: Element, threshold: number = 0): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top <= windowHeight - threshold &&
      rect.bottom >= threshold &&
      rect.left <= windowWidth - threshold &&
      rect.right >= threshold
    );
  }

  /**
   * Get element's computed styles
   */
  static getComputedStyles(element: Element): CSSStyleDeclaration {
    return window.getComputedStyle(element);
  }

  /**
   * Set multiple CSS properties at once
   */
  static setStyles(element: HTMLElement, styles: Record<string, string>): void {
    Object.entries(styles).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
  }

  /**
   * Add/remove CSS classes with animation
   */
  static toggleClassWithAnimation(
    element: HTMLElement,
    className: string,
    duration: number = 300
  ): Promise<void> {
    return new Promise((resolve) => {
      const hasClass = element.classList.contains(className);
      
      if (hasClass) {
        element.classList.remove(className);
      } else {
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
   * Easing functions
   */
  static easing = {
    linear: (t: number): number => t,
    easeInQuad: (t: number): number => t * t,
    easeOutQuad: (t: number): number => t * (2 - t),
    easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t: number): number => t * t * t,
    easeOutCubic: (t: number): number => (--t) * t * t + 1,
    easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInElastic: (t: number): number => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)),
    easeOutElastic: (t: number): number => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
    easeInOutElastic: (t: number): number => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 + 1
  };

  /**
   * Animate element property
   */
  static animateProperty(
    element: HTMLElement,
    property: string,
    from: number,
    to: number,
    duration: number = 1000,
    easing: keyof typeof AnimationUtils.easing = 'easeInOutCubic',
    onUpdate?: (value: number) => void,
    onComplete?: () => void
  ): () => void {
    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
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
      } else {
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
  static staggerAnimation(
    elements: HTMLElement[],
    animationFn: (element: HTMLElement, index: number) => void,
    delay: number = 100
  ): void {
    elements.forEach((element, index) => {
      setTimeout(() => {
        animationFn(element, index);
      }, index * delay);
    });
  }

  /**
   * Create intersection observer for animations
   */
  static createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }
}

/**
 * Performance Utilities
 */
export class PerformanceUtils {
  private static frameCount = 0;
  private static lastTime = performance.now();
  private static fps = 60;

  /**
   * Measure FPS
   */
  static measureFPS(): number {
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
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
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
  static measureExecutionTime<T>(fn: () => T, label: string = 'Execution'): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${label}: ${(end - start).toFixed(2)}ms`);
    return result;
  }

  /**
   * Check if device supports hardware acceleration
   */
  static supportsHardwareAcceleration(): boolean {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    
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

/**
 * Media Utilities
 */
export class MediaUtils {
  /**
   * Check if video format is supported
   */
  static isVideoFormatSupported(format: string): boolean {
    const video = document.createElement('video');
    return video.canPlayType(`video/${format}`) !== '';
  }

  /**
   * Get video dimensions
   */
  static getVideoDimensions(video: HTMLVideoElement): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      if (video.videoWidth && video.videoHeight) {
        resolve({ width: video.videoWidth, height: video.videoHeight });
      } else {
        video.addEventListener('loadedmetadata', () => {
          resolve({ width: video.videoWidth, height: video.videoHeight });
        }, { once: true });
      }
    });
  }

  /**
   * Create video thumbnail
   */
  static createVideoThumbnail(
    video: HTMLVideoElement,
    time: number = 0,
    width: number = 320,
    height: number = 180
  ): Promise<string> {
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
  static preloadMedia(urls: string[], type: 'image' | 'video' | 'audio' = 'image'): Promise<void[]> {
    const promises = urls.map(url => {
      return new Promise<void>((resolve, reject) => {
        let element: HTMLImageElement | HTMLVideoElement | HTMLAudioElement;

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
  static setWithExpiry(key: string, value: any, ttl: number): void {
    const item = {
      value,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Get from localStorage with expiration check
   */
  static getWithExpiry(key: string): any | null {
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
  static clearExpired(): void {
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
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Linear interpolation
   */
  static lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  /**
   * Map value from one range to another
   */
  static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /**
   * Convert degrees to radians
   */
  static degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Convert radians to degrees
   */
  static radToDeg(radians: number): number {
    return radians * (180 / Math.PI);
  }

  /**
   * Generate random number between min and max
   */
  static random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generate random integer between min and max
   */
  static randomInt(min: number, max: number): number {
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
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
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
  static rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * Convert RGB to HSL
   */
  static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
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
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  /**
   * Convert HSL to RGB
   */
  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
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
  static getComplementaryColor(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    
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