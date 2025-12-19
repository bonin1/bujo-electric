'use client';

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from '@/components/ui/image';
import { Eye } from 'lucide-react';

interface AnimatedPortfolioCardProps {
  item: {
    title: string;
    imageSrc: string;
    imageAlt: string;
  };
  index: number;
  onSelect: (index: number) => void;
}

/**
 * Animated portfolio card with motion values for hover effect
 * Zero re-renders on hover
 */
export function AnimatedPortfolioCard({ item, index, onSelect }: AnimatedPortfolioCardProps) {
  // Use motion values for smooth hover effects - no re-renders
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.button 
        onClick={() => onSelect(index)}
        className="group block w-full text-left cursor-pointer"
        aria-label={`View ${item.title} image`}
        style={{ y: smoothY }}
        onHoverStart={() => y.set(-4)}
        onHoverEnd={() => y.set(0)}
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Image */}
          <div className="relative h-80 overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Eye Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-full p-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            {/* Service Name */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

