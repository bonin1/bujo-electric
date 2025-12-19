'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
}

/**
 * Base ScrollReveal - Fade up animation
 * - No flash on load (uses CSS initial state)
 * - SEO-friendly: Content rendered in HTML
 * - Zero re-renders (uses motion values)
 * - Smooth spring physics
 */
export function ScrollRevealUp({ 
  children, 
  delay = 0, 
  className = '',
  amount = 0.3
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const [isMounted, setIsMounted] = useState(false);
  
  // Motion values - Initialize to hidden state to match server render
  // This prevents hydration mismatch
  const opacity = useMotionValue(0);
  const y = useMotionValue(30);
  
  // Springs for smooth, natural motion
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  // Set mounted flag after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger animation when in view
  useEffect(() => {
    if (isInView && isMounted) {
      const timer = setTimeout(() => {
        opacity.set(1);  // Directly updates DOM - NO React re-render!
        y.set(0);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isMounted, delay, opacity, y]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity: smoothOpacity, 
        y: smoothY 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal from Left - Content slides in from left
 * Perfect for alternating section layouts
 * - Zero re-renders (uses motion values)
 */
export function ScrollRevealLeft({ 
  children, 
  delay = 0, 
  className = '',
  amount = 0.3
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const [isMounted, setIsMounted] = useState(false);
  
  // Motion values - Initialize to hidden state to prevent hydration mismatch
  const opacity = useMotionValue(0);
  const x = useMotionValue(-60);
  
  // Springs for smooth, natural motion
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      const timer = setTimeout(() => {
        opacity.set(1);
        x.set(0);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isMounted, delay, opacity, x]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity: smoothOpacity, 
        x: smoothX 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal from Right - Content slides in from right
 * Perfect for alternating section layouts
 * - Zero re-renders (uses motion values)
 */
export function ScrollRevealRight({ 
  children, 
  delay = 0, 
  className = '',
  amount = 0.3
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const [isMounted, setIsMounted] = useState(false);
  
  // Motion values - Initialize to hidden state to prevent hydration mismatch
  const opacity = useMotionValue(0);
  const x = useMotionValue(60);
  
  // Springs for smooth, natural motion
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      const timer = setTimeout(() => {
        opacity.set(1);
        x.set(0);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isMounted, delay, opacity, x]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity: smoothOpacity, 
        x: smoothX 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal Scale - Content scales up with fade
 * Great for cards and featured content
 * - Zero re-renders (uses motion values)
 */
export function ScrollRevealScale({ 
  children, 
  delay = 0, 
  className = '',
  amount = 0.3
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const [isMounted, setIsMounted] = useState(false);
  
  // Motion values - Initialize to hidden state to prevent hydration mismatch
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.9);
  
  // Springs for smooth, natural motion
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      const timer = setTimeout(() => {
        opacity.set(1);
        scale.set(1);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isMounted, delay, opacity, scale]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity: smoothOpacity, 
        scale: smoothScale 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollReveal Fade - Simple fade in
 * Subtle animation for text content
 * - Zero re-renders (uses motion values)
 */
export function ScrollRevealFade({ 
  children, 
  delay = 0, 
  className = '',
  amount = 0.3
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const [isMounted, setIsMounted] = useState(false);
  
  // Motion values - Initialize to hidden state to prevent hydration mismatch
  const opacity = useMotionValue(0);
  
  // Springs for smooth, natural motion
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      const timer = setTimeout(() => {
        opacity.set(1);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, isMounted, delay, opacity]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollStagger - Staggered animation for lists
 * Children animate in sequence
 */
export function ScrollStagger({ 
  children, 
  staggerDelay = 0.1,
  className = '',
  direction = 'up' as 'up' | 'left' | 'right' | 'scale'
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
}) {
  const Component = direction === 'left' ? ScrollRevealLeft 
    : direction === 'right' ? ScrollRevealRight
    : direction === 'scale' ? ScrollRevealScale
    : ScrollRevealUp;

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <Component delay={index * staggerDelay}>
          {child}
        </Component>
      ))}
    </div>
  );
}

/**
 * ScrollRevealContainer - For two-column layouts
 * Animates left and right content from opposite directions
 */
export function ScrollRevealContainer({ 
  leftContent, 
  rightContent,
  delay = 0,
  className = '',
  containerClassName = ''
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  delay?: number;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      <ScrollRevealLeft delay={delay} className={className}>
        {leftContent}
      </ScrollRevealLeft>
      <ScrollRevealRight delay={delay + 0.1} className={className}>
        {rightContent}
      </ScrollRevealRight>
    </div>
  );
}