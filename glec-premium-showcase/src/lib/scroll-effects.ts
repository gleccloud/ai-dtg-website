/**
 * GLEC AI DTG Premium Showcase - Scroll Effects System
 * World-Class Commercial-Grade Scroll-Based Interactions
 */

export interface ScrollEffectConfig {
  element: HTMLElement;
  effect: 'parallax' | 'fade' | 'slide' | 'scale' | 'rotate' | 'sticky';
  intensity?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  duration?: number;
  easing?: string;
}

export interface ParallaxConfig {
  element: HTMLElement;
  speed: number;
  direction: 'vertical' | 'horizontal' | 'both';
  offset?: number;
}

export class GLECScrollEffects {
  private effects: ScrollEffectConfig[] = [];
  private parallaxElements: ParallaxConfig[] = [];
  private stickyElements: Set<HTMLElement> = new Set();
  private isInitialized = false;
  private scrollY = 0;
  private scrollX = 0;
  private ticking = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (this.isInitialized) return;
    
    this.setupEventListeners();
    this.setupResizeObserver();
    this.isInitialized = true;
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset;
      this.scrollX = window.pageXOffset;
      this.requestTick();
    });

    window.addEventListener('resize', () => {
      this.updateElementPositions();
    });
  }

  /**
   * Setup resize observer for dynamic content
   */
  private setupResizeObserver(): void {
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        this.updateElementPositions();
      });

      // Observe body for content changes
      resizeObserver.observe(document.body);
    }
  }

  /**
   * Request animation frame for performance
   */
  private requestTick(): void {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateEffects();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  /**
   * Add scroll effect
   */
  addEffect(config: ScrollEffectConfig): void {
    this.effects.push(config);
    
    // Apply initial state
    this.applyInitialState(config);
    
    // Add to appropriate effect arrays
    if (config.effect === 'parallax') {
      this.parallaxElements.push({
        element: config.element,
        speed: config.intensity || 0.5,
        direction: 'vertical',
        offset: 0
      });
    } else if (config.effect === 'sticky') {
      this.stickyElements.add(config.element);
    }
  }

  /**
   * Remove scroll effect
   */
  removeEffect(element: HTMLElement): void {
    const index = this.effects.findIndex(effect => effect.element === element);
    if (index !== -1) {
      this.effects.splice(index, 1);
    }

    // Remove from parallax elements
    const parallaxIndex = this.parallaxElements.findIndex(p => p.element === element);
    if (parallaxIndex !== -1) {
      this.parallaxElements.splice(parallaxIndex, 1);
    }

    // Remove from sticky elements
    this.stickyElements.delete(element);
  }

  /**
   * Apply initial state to element
   */
  private applyInitialState(config: ScrollEffectConfig): void {
    const element = config.element;
    
    switch (config.effect) {
      case 'fade':
        element.style.opacity = '0';
        element.style.transition = `opacity ${config.duration || 500}ms ${config.easing || 'ease-out'}`;
        break;
      case 'slide':
        const direction = config.direction || 'up';
        const transform = this.getSlideTransform(direction);
        element.style.transform = transform;
        element.style.transition = `transform ${config.duration || 500}ms ${config.easing || 'ease-out'}`;
        break;
      case 'scale':
        element.style.transform = 'scale(0.8)';
        element.style.transition = `transform ${config.duration || 500}ms ${config.easing || 'ease-out'}`;
        break;
      case 'rotate':
        element.style.transform = 'rotate(-10deg)';
        element.style.transition = `transform ${config.duration || 500}ms ${config.easing || 'ease-out'}`;
        break;
    }
  }

  /**
   * Get slide transform based on direction
   */
  private getSlideTransform(direction: string): string {
    switch (direction) {
      case 'up':
        return 'translateY(50px)';
      case 'down':
        return 'translateY(-50px)';
      case 'left':
        return 'translateX(50px)';
      case 'right':
        return 'translateX(-50px)';
      default:
        return 'translateY(50px)';
    }
  }

  /**
   * Update all scroll effects
   */
  private updateEffects(): void {
    this.updateParallaxEffects();
    this.updateStickyEffects();
    this.updateScrollAnimations();
  }

  /**
   * Update parallax effects
   */
  private updateParallaxEffects(): void {
    this.parallaxElements.forEach(config => {
      const element = config.element;
      const rect = element.getBoundingClientRect();
      const speed = config.speed;
      
      if (config.direction === 'vertical' || config.direction === 'both') {
        const yOffset = this.scrollY * speed;
        element.style.transform = `translateY(${yOffset}px)`;
      }
      
      if (config.direction === 'horizontal' || config.direction === 'both') {
        const xOffset = this.scrollX * speed;
        element.style.transform = `translateX(${xOffset}px)`;
      }
    });
  }

  /**
   * Update sticky effects
   */
  private updateStickyEffects(): void {
    this.stickyElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const parentRect = element.parentElement?.getBoundingClientRect();
      
      if (parentRect) {
        if (this.scrollY >= parentRect.top) {
          element.style.position = 'fixed';
          element.style.top = '0';
          element.style.zIndex = '1000';
        } else {
          element.style.position = 'relative';
          element.style.top = 'auto';
        }
      }
    });
  }

  /**
   * Update scroll-based animations
   */
  private updateScrollAnimations(): void {
    this.effects.forEach(config => {
      if (config.effect === 'fade' || config.effect === 'slide' || config.effect === 'scale' || config.effect === 'rotate') {
        this.updateScrollAnimation(config);
      }
    });
  }

  /**
   * Update individual scroll animation
   */
  private updateScrollAnimation(config: ScrollEffectConfig): void {
    const element = config.element;
    const rect = element.getBoundingClientRect();
    const threshold = config.threshold || 0.1;
    
    // Check if element is in viewport
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      const progress = this.calculateProgress(rect, threshold);
      this.applyAnimationProgress(config, progress);
    }
  }

  /**
   * Calculate animation progress based on scroll position
   */
  private calculateProgress(rect: DOMRect, threshold: number): number {
    const viewportHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;
    
    const start = viewportHeight * threshold;
    const end = viewportHeight - (elementHeight * threshold);
    
    if (elementTop <= start) {
      return 1; // Fully visible
    } else if (elementTop >= end) {
      return 0; // Not visible
    } else {
      return 1 - ((elementTop - start) / (end - start));
    }
  }

  /**
   * Apply animation progress
   */
  private applyAnimationProgress(config: ScrollEffectConfig, progress: number): void {
    const element = config.element;
    
    switch (config.effect) {
      case 'fade':
        element.style.opacity = progress.toString();
        break;
      case 'slide':
        const direction = config.direction || 'up';
        const transform = this.getSlideTransformWithProgress(direction, progress);
        element.style.transform = transform;
        break;
      case 'scale':
        const scale = 0.8 + (0.2 * progress);
        element.style.transform = `scale(${scale})`;
        break;
      case 'rotate':
        const rotation = -10 + (10 * progress);
        element.style.transform = `rotate(${rotation}deg)`;
        break;
    }
  }

  /**
   * Get slide transform with progress
   */
  private getSlideTransformWithProgress(direction: string, progress: number): string {
    const distance = 50 * (1 - progress);
    
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  }

  /**
   * Update element positions after resize
   */
  private updateElementPositions(): void {
    this.effects.forEach(config => {
      this.applyInitialState(config);
    });
  }

  /**
   * Add smooth scroll to element
   */
  smoothScrollTo(element: HTMLElement, duration: number = 1000): void {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  /**
   * Easing function for smooth scrolling
   */
  private easeInOutCubic(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  /**
   * Get scroll progress percentage
   */
  getScrollProgress(): number {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
  }

  /**
   * Check if element is in viewport
   */
  isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }

  /**
   * Cleanup all effects
   */
  dispose(): void {
    this.effects = [];
    this.parallaxElements = [];
    this.stickyElements.clear();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const glecScrollEffects = new GLECScrollEffects();

// Export utility functions
export const addScrollEffect = (config: ScrollEffectConfig) => 
  glecScrollEffects.addEffect(config);

export const removeScrollEffect = (element: HTMLElement) => 
  glecScrollEffects.removeEffect(element);

export const smoothScrollTo = (element: HTMLElement, duration?: number) => 
  glecScrollEffects.smoothScrollTo(element, duration);

export const getScrollProgress = () => 
  glecScrollEffects.getScrollProgress();

export const isElementInViewport = (element: HTMLElement) => 
  glecScrollEffects.isElementInViewport(element); 