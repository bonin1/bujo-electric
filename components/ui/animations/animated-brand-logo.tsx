'use client';

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from '@/components/ui/image';

interface AnimatedBrandLogoProps {
  logo: string;
  alt: string;
  name: string;
}

/**
 * Animated brand logo with motion values for hover effect
 * Zero re-renders on hover
 */
export function AnimatedBrandLogo({ logo, alt }: AnimatedBrandLogoProps) {
  // Use motion values for hover effect - no re-renders
  const scale = useMotionValue(1);
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 20 });

  return (
    <motion.div
  className="flex items-center justify-center h-20 w-40 opacity-70 hover:opacity-100 transition-opacity duration-300 relative" // <-- Added 'relative'
  style={{ scale: smoothScale }}
  onHoverStart={() => scale.set(1.05)}
  onHoverEnd={() => scale.set(1)}
>
  <Image
    src={logo}
    alt={alt}
    width={160}
    height={64}
    className="h-auto w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
    sizes="(max-width: 768px) 120px, 160px"
    loading="lazy"
  />
</motion.div>
  );
}

