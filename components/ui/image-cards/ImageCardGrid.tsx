"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ImageCard, ImageCardProps } from "./ImageCard";

export interface ImageCardGridProps {
  cards: ImageCardProps[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const ImageCardGrid: React.FC<ImageCardGridProps> = ({
  cards,
  className,
  columns = 3,
}) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        gridCols[columns],
        className
      )}
    >
      {cards.map((card, index) => (
        <ImageCard
          key={index}
          {...card}
        />
      ))}
    </div>
  );
};

export { ImageCardGrid };
