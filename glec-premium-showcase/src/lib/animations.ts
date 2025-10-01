/**
 * GLEC AI DTG Premium Showcase - Animation System
 * World-Class Commercial-Grade Animation Management
 */

export interface AnimationConfig {
  element: HTMLElement;
  animation: string;
  duration?: number;
  delay?: number;
  easing?: string;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
}

export interface ScrollAnimationConfig {
  element: HTMLElement;
  trigger: 'scroll' | 'intersection' | 'parallax';
  animation: 'fadeIn' | 'slideUp' | 'scaleIn' | 'rotateIn';
  threshold: number;
  duration: number;
  easing: string;
  delay?: number;
}

export class GLECAnimationSystem {
  private animations: Map<string, Animation> = new Map();
  private scrollEffects: ScrollAnimationConfig[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (this.isInitialized) return;
    
    this.setupIntersectionObserver();
    this.setupScrollEffects();
    this.isInitialized = true;
  }

  /**
   * Create and play a CSS animation
   */
  createAnimation(config: AnimationConfig): Animation {
    const keyframes = this.getKeyframes(config.animation);
    const options: KeyframeAnimationOptions = {
      duration: config.duration || 500,
      easing: config.easing || 'ease-out',
      fill: config.fillMode || 'both',
      iterations: typeof config.iterationCount === 'number' ? config.iterationCount : 1,
      delay: config.delay || 0
    };

    const animation = config.element.animate(keyframes, options);
    const animationId = `animation_${Date.now()}_${Math.random()}`;
    
    this.animations.set(animationId, animation);
    
    animation.onfinish = () => {
      this.animations.delete(animationId);
    };

    return animation;
  }

  /**
   * Play a specific animation by ID
   */
  playAnimation(animationId: string): void {
    const animation = this.animations.get(animationId);
    if (animation) {
      animation.play();
    }
  }

  /**
   * Pause a specific animation by ID
   */
  pauseAnimation(animationId: string): void {
    const animation = this.animations.get(animationId);
    if (animation) {
      animation.pause();
    }
  }

  /**
   * Stop a specific animation by ID
   */
  stopAnimation(animationId: string): void {
    const animation = this.animations.get(animationId);
    if (animation) {
      animation.cancel();
      this.animations.delete(animationId);
    }
  }

  /**
   * Add scroll-based animation effect
   */
  addScrollEffect(config: ScrollAnimationConfig): void {
    this.scrollEffects.push(config);
    this.applyScrollEffect(config);
  }

  /**
   * Remove scroll-based animation effect
   */
  removeScrollEffect(element: HTMLElement): void {
    const index = this.scrollEffects.findIndex(effect => effect.element === element);
    if (index !== -1) {
      this.scrollEffects.splice(index, 1);
    }
  }

  /**
   * Setup intersection observer for scroll animations
   */
  private setupIntersectionObserver(): void {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerScrollAnimation(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    document.querySelectorAll('.glec-scroll-animate').forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Setup scroll effects
   */
  private setupScrollEffects(): void {
    window.addEventListener('scroll', () => {
      this.updateScrollEffects();
    });
  }

  /**
   * Update scroll effects on scroll
   */
  private updateScrollEffects(): void {
    this.scrollEffects.forEach(effect => {
      if (effect.trigger === 'parallax') {
        this.updateParallaxEffect(effect);
      }
    });
  }

  /**
   * Apply scroll effect to element
   */
  private applyScrollEffect(config: ScrollAnimationConfig): void {
    const element = config.element;
    
    // Add initial state
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(config.animation);
    element.style.transition = `all ${config.duration}ms ${config.easing}`;
    
    if (config.delay) {
      element.style.transitionDelay = `${config.delay}ms`;
    }
  }

  /**
   * Trigger scroll animation when element comes into view
   */
  private triggerScrollAnimation(element: Element): void {
    const elementConfig = this.scrollEffects.find(effect => effect.element === element);
    
    if (elementConfig && element instanceof HTMLElement) {
      element.classList.add('animate-in');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    }
  }

  /**
   * Update parallax effect
   */
  private updateParallaxEffect(config: ScrollAnimationConfig): void {
    const element = config.element;
    const rect = element.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (element instanceof HTMLElement) {
      element.style.transform = `translateY(${rate}px)`;
    }
  }

  /**
   * Get keyframes for animation
   */
  private getKeyframes(animationType: string): Keyframe[] {
    const keyframes: { [key: string]: Keyframe[] } = {
      fadeIn: [
        { opacity: '0', transform: 'translateY(20px)' },
        { opacity: '1', transform: 'translateY(0)' }
      ],
      slideUp: [
        { transform: 'translateY(100%)' },
        { transform: 'translateY(0)' }
      ],
      scaleIn: [
        { opacity: '0', transform: 'scale(0.8)' },
        { opacity: '1', transform: 'scale(1)' }
      ],
      rotateIn: [
        { opacity: '0', transform: 'rotate(-180deg) scale(0.8)' },
        { opacity: '1', transform: 'rotate(0deg) scale(1)' }
      ]
    };

    return keyframes[animationType] || keyframes.fadeIn;
  }

  /**
   * Get initial transform for scroll animation
   */
  private getInitialTransform(animationType: string): string {
    const transforms: { [key: string]: string } = {
      fadeIn: 'translateY(20px)',
      slideUp: 'translateY(100%)',
      scaleIn: 'scale(0.8)',
      rotateIn: 'rotate(-10deg) scale(0.9)'
    };

    return transforms[animationType] || 'translateY(20px)';
  }

  /**
   * Create staggered animation for multiple elements
   */
  createStaggeredAnimation(
    elements: HTMLElement[],
    config: Omit<AnimationConfig, 'element'>,
    staggerDelay: number = 100
  ): void {
    elements.forEach((element, index) => {
      const elementConfig: AnimationConfig = {
        ...config,
        element,
        delay: (config.delay || 0) + (index * staggerDelay)
      };
      
      this.createAnimation(elementConfig);
    });
  }

  /**
   * Create timeline animation
   */
  createTimelineAnimation(animations: AnimationConfig[]): void {
    let currentDelay = 0;
    
    animations.forEach(config => {
      const elementConfig: AnimationConfig = {
        ...config,
        delay: currentDelay
      };
      
      this.createAnimation(elementConfig);
      currentDelay += (config.duration || 500) + (config.delay || 0);
    });
  }

  /**
   * Add hover animation
   */
  addHoverAnimation(
    element: HTMLElement,
    hoverConfig: Partial<AnimationConfig>,
    leaveConfig?: Partial<AnimationConfig>
  ): void {
    const defaultHoverConfig: AnimationConfig = {
      element,
      animation: 'scaleIn',
      duration: 200,
      easing: 'ease-out'
    };

    const defaultLeaveConfig: AnimationConfig = {
      element,
      animation: 'scaleOut',
      duration: 200,
      easing: 'ease-out'
    };

    element.addEventListener('mouseenter', () => {
      this.createAnimation({ ...defaultHoverConfig, ...hoverConfig });
    });

    element.addEventListener('mouseleave', () => {
      this.createAnimation({ ...defaultLeaveConfig, ...leaveConfig });
    });
  }

  /**
   * Cleanup all animations
   */
  dispose(): void {
    this.animations.forEach(animation => {
      animation.cancel();
    });
    this.animations.clear();
    this.scrollEffects = [];
  }
}

// Export singleton instance
export const glecAnimationSystem = new GLECAnimationSystem();

// Export utility functions
export const createAnimation = (config: AnimationConfig) => 
  glecAnimationSystem.createAnimation(config);

export const addScrollEffect = (config: ScrollAnimationConfig) => 
  glecAnimationSystem.addScrollEffect(config);

export const createStaggeredAnimation = (
  elements: HTMLElement[],
  config: Omit<AnimationConfig, 'element'>,
  staggerDelay?: number
) => glecAnimationSystem.createStaggeredAnimation(elements, config, staggerDelay);

export const addHoverAnimation = (
  element: HTMLElement,
  hoverConfig: Partial<AnimationConfig>,
  leaveConfig?: Partial<AnimationConfig>
) => glecAnimationSystem.addHoverAnimation(element, hoverConfig, leaveConfig); 