/**
 * Performance Utilities
 * Helper functions for performance optimization
 */

/**
 * Lazy load images below the fold
 * Use this utility to determine if an image should have loading="lazy"
 */
export function shouldLazyLoadImage(aboveFold: boolean = false): 'lazy' | 'eager' {
  return aboveFold ? 'eager' : 'lazy';
}

/**
 * Determine if an image should have priority flag
 * Above-the-fold images should have priority={true}
 */
export function shouldPrioritizeImage(aboveFold: boolean = false): boolean {
  return aboveFold;
}

/**
 * Optimize image quality based on usage
 */
export function getImageQuality(usage: 'hero' | 'thumbnail' | 'gallery' | 'avatar' | 'default'): number {
  const qualityMap = {
    hero: 90,
    thumbnail: 75,
    gallery: 85,
    avatar: 80,
    default: 85,
  };
  
  return qualityMap[usage];
}

/**
 * Get appropriate sizes attribute for responsive images
 */
export function getImageSizes(breakpoint: 'full' | 'half' | 'third' | 'quarter' | 'hero'): string {
  const sizesMap = {
    full: '100vw',
    half: '(max-width: 768px) 100vw, 50vw',
    third: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quarter: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw',
    hero: '100vw',
  };
  
  return sizesMap[breakpoint];
}



