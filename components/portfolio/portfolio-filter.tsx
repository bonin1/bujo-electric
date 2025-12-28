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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => onCategoryChange(category.name)}
              className={`px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'
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

