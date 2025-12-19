import React from 'react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface BentoGridItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  variant: 'default' | 'featured' | 'minimal';
  icon?: React.ReactNode;
}

interface DynamicBentoGridProps {
  items: BentoGridItem[];
  className?: string;
}

const DynamicBentoGrid: React.FC<DynamicBentoGridProps> = ({ items, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-6",
      "auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px] xl:auto-rows-[220px]",
      className
    )}>
      {items.map((item, index) => {
        const isLarge = item.size === 'large';
        const isMedium = item.size === 'medium';
        const isSmall = item.size === 'small';
        const isWide = item.size === 'wide';
        const isTall = item.size === 'tall';
        const isFeatured = item.variant === 'featured';
        
        return (
          <Link
            key={index}
            href={item.buttonHref}
            className={cn(
              "group relative overflow-hidden rounded-2xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-1",
              "bg-white border border-gray-200 shadow-lg",
              "hover:border-gray-300 hover:shadow-xl cursor-pointer block",
              {
                // Dynamic Grid positioning for diverse layout
                // Large cards (2x2)
                'md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2 lg:row-span-2 xl:row-span-2': isLarge,
                
                // Wide cards (2x1)
                'md:col-span-1 lg:col-span-2 xl:col-span-2 md:row-span-2 lg:row-span-1 xl:row-span-1': isWide,
                
                // Tall cards (1x2)
                'md:col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 md:row-span-2 lg:row-span-2 xl:row-span-2': isTall,
                
                // Medium and Small cards (1x1) 
                'md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-1 lg:row-span-1 xl:row-span-1': isMedium || isSmall,
                
                // Featured styling
                'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5': isFeatured,
                'hover:ring-primary/40': isFeatured,
              }
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 "
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Enhanced Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
            </div>
            
            {/* Content Container */}
            <div className="relative h-full p-3 md:p-4 flex flex-col justify-between">
              {/* Top Section */}
              <div className="space-y-2">
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-primary-foreground/80" />
                        <span className="text-xs font-bold text-primary-foreground/80">Featured</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Title */}
                <h3 className={cn(
                  "font-bold text-primary-foreground drop-shadow-lg leading-tight",
                  {
                    'text-base md:text-lg': isSmall,
                    'text-lg md:text-xl': isMedium || isTall,
                    'text-xl md:text-2xl lg:text-3xl': isLarge,
                    'text-lg md:text-xl lg:text-2xl': isWide,
                  }
                )}>
                  {item.title}
                </h3>
                
                {/* Description - Show for medium, large, and tall cards (hidden on mobile and wide cards) */}
                {(isMedium || isLarge || isTall || isWide || isSmall) && (
                  <p className={cn(
                    "text-primary-foreground/80 leading-relaxed drop-shadow-md hidden md:block lg:hidden xl:block",
                    {
                      'text-xs md:text-sm max-w-xs': isMedium || isTall,
                      'text-sm md:text-base max-w-md lg:max-w-lg': isLarge,
                      'text-xs md:text-sm max-w-lg lg:text-xs': isWide,
                      'text-xs md:text-sm max-w-xs md:hidden': isSmall,
                    }
                  )}>
                    {item.description}
                  </p>
                )}
                 {/* Service Features for Large and Wide Cards (hidden on mobile) */}
                 {(isLarge || isWide) && (
                  <div className="hidden md:flex flex-wrap gap-2">
                    {isLarge && ['Custom Design', 'Professional Installation', 'Warranty Included'].map((feature, idx) => (
                      <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
                        <span className="text-xs font-medium text-white">{feature}</span>
                      </div>
                    ))}
                    {isWide && ['Expert Team', 'Quality Materials', 'Timely Service'].map((feature, idx) => (
                      <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 border border-white/30">
                        <span className="text-xs font-medium text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Bottom Section - Hover Indicator */}
              <div className="flex justify-end items-end">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 group-hover:scale-110">
                  <ArrowRight className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export { DynamicBentoGrid };
