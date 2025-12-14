// Performance optimization utilities
export const performanceUtils = {
  // Throttle function to limit how often a function can run
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any) {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },

  // Debounce function to delay execution until after a pause
  debounce: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function(this: any) {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    }
  },

  // Check if device has reduced motion preference
  prefersReducedMotion: (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },

  // Check if device performance is low
  isLowPerformanceDevice: (): boolean => {
    if (typeof navigator !== 'undefined') {
      // Check for touch devices which might have lower performance
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Check for memory constraints
      const deviceMemory = (navigator as any).deviceMemory || 4; // Default to 4GB if not available
      return isTouchDevice && deviceMemory < 4;
    }
    return false;
  },

  // Get performance-based settings for animations
  getAnimationSettings: () => {
    const reducedMotion = performanceUtils.prefersReducedMotion();
    const lowPerformance = performanceUtils.isLowPerformanceDevice();
    
    if (reducedMotion || lowPerformance) {
      return {
        animationsEnabled: false,
        particleDensity: 0.3, // Lower density
        fpsLimit: 30, // Lower frame rate
        effectsEnabled: false
      };
    }
    
    return {
      animationsEnabled: true,
      particleDensity: 1.0,
      fpsLimit: 60,
      effectsEnabled: true
    };
  }
};

// Animation frame manager to control render frequency
export class AnimationManager {
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  private fps: number = 60;
  private frameInterval: number;

  constructor(fps: number = 60) {
    this.fps = fps;
    this.frameInterval = 1000 / fps;
  }

  public animate = (callback: (deltaTime: number) => void) => {
    const animateFn = (timestamp: number) => {
      if (timestamp - this.lastTime >= this.frameInterval) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        callback(deltaTime);
      }
      this.animationFrameId = requestAnimationFrame(animateFn);
    };

    this.animationFrameId = requestAnimationFrame(animateFn);
  };

  public stop = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  };
};

// Performance-aware Galaxy component wrapper
export const shouldRenderGalaxy = (): boolean => {
  const settings = performanceUtils.getAnimationSettings();
  return settings.animationsEnabled;
};