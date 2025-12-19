'use client';

import React, { useState } from 'react';
import PortfolioFilter from './portfolio-filter';
import PortfolioGrid from './portfolio-grid';
import { ScrollRevealScale } from '../ui/animations/scroll-reveal';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  location: string;
  description: string;
  features?: string[];
  client?: string;
  duration?: string;
  tags?: string[];
}

interface Category {
  name: string;
  href: string;
}

interface PortfolioClientWrapperProps {
  initialProjects: Project[];
  categories: Category[];
}

export default function PortfolioClientWrapper({ 
  initialProjects, 
  categories 
}: PortfolioClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");

  const filteredProjects = selectedCategory === "All Projects" 
    ? initialProjects 
    : initialProjects.filter(project => project.category === selectedCategory);

  return (
    <>
      <ScrollRevealScale delay={1.2}>
      <PortfolioFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      </ScrollRevealScale>
      <PortfolioGrid projects={filteredProjects} />
    </>
  );
}

