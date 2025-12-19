"use client";

import React, { useState } from "react";
import Image from '@/components/ui/image';
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink } from "lucide-react";

export interface HoverImageCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  hoverData: {
    learnMoreText: string;
    features: string[];
    ctaText: string;
    ctaHref: string;
  };
  className?: string;
}

const HoverImageCard: React.FC<HoverImageCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  hoverData,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer",
        "hover:shadow-2xl hover:-translate-y-2",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500",
          isHovered 
            ? "bg-linear-to-t from-black/90 via-black/70 to-black/60" 
            : "bg-linear-to-t from-black/80 via-black/40 to-transparent"
        )} />
        
        {/* Content Container */}
        <div className="absolute inset-0 p-6">
          {/* Top Content - Title and Description */}
          <div className={cn(
            "space-y-3 transition-all duration-500",
            isHovered ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}>
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {title}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              {description}
            </p>
          </div>
          
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 transform",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="text-center space-y-6 max-w-sm">
              <div className="space-y-3">
                {hoverData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white/90 text-sm pl-4">
                    <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <p className="text-white/90 text-sm leading-relaxed">
                  {hoverData.learnMoreText}
                </p>
                
                <a
                  href={hoverData.ctaHref}
                  className="inline-flex items-center space-x-2 bg-white/25 backdrop-blur-sm text-white px-5 py-3 rounded-lg hover:bg-white/35 transition-all duration-200 border border-white/40 hover:border-white/60"
                >
                  <span className="text-sm font-semibold">{hoverData.ctaText}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Hover Indicator */}
          <div className={cn(
            "absolute top-4 right-4 transition-all duration-300",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Hover Background Overlay */}
          <div className={cn(
            "absolute inset-0 bg-black/20 transition-all duration-500 rounded-xl",
            isHovered ? "opacity-100" : "opacity-0"
          )} />
        </div>
      </div>
    </div>
  );
};

export { HoverImageCard };



