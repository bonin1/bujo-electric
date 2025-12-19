"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HoverImageCard, HoverImageCardProps } from "./HoverImageCard";

export interface HoverImageGridProps {
  cards: HoverImageCardProps[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const HoverImageGrid: React.FC<HoverImageGridProps> = ({
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
        "grid gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16",
        gridCols[columns],
        className
      )}
    >
      {cards.map((card, index) => (
        <HoverImageCard
          key={index}
          {...card}
        />
      ))}
    </div>
  );
};

export { HoverImageGrid };

