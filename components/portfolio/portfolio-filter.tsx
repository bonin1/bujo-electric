'use client';

import React from 'react';

interface PortfolioFilterProps {
  categories: Array<{ name: string; href: string }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function PortfolioFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: PortfolioFilterProps) {
  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => onCategoryChange(category.name)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={selectedCategory === category.name}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

