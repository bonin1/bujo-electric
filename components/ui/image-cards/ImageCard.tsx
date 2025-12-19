"use client";

import React from "react";
import Image from '@/components/ui/image';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons";

export interface ImageCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Bottom Content Container */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          {/* Title - Bottom Left */}
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">
            {title}
          </h3>
          
          {/* Button - Bottom Right */}
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 text-gray-900 hover:bg-white transition-all duration-200"
            asChild
          >
            <a href={buttonHref}>
              {buttonText}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ImageCard };
