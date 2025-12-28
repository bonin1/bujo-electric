'use client';

import React, { useState } from 'react';
import Image from '@/components/ui/image';
import { MapPin, Calendar, X, Maximize2 } from 'lucide-react';
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

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  const handleImageClick = (projectId: number) => {
    setExpandedImage(projectId);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <>
      {/* Portfolio Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ScrollRevealScale key={project.id} delay={index * 0.1}> 
                <div 
                  className="group cursor-pointer relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700"
                  onClick={() => handleImageClick(project.id)}
                >
                  <Image
                    src={project.image || '/assets/config/placeholder-image.png'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-4">
                      <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-white/70 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {project.location}
                        </div>
                      )}
                      {project.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {project.date}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expand Button */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </ScrollRevealScale>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-[200] flex items-center justify-center p-6 md:p-12"
          onClick={closeExpandedImage}
        >
          <button
            onClick={closeExpandedImage}
            className="absolute top-8 right-8 w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all z-10 border border-white/10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-6xl w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            {(() => {
              const project = projects.find(p => p.id === expandedImage);
              if (!project) return null;
              
              return (
                <>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Project Info Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20">
                    <div className="max-w-3xl">
                      <span className="bg-primary text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block">
                        {project.category}
                      </span>
                      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{project.title}</h2>
                      <div className="flex flex-wrap items-center gap-8 text-white/60 text-sm font-bold uppercase tracking-widest mb-8">
                        {project.location && (
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            {project.location}
                          </div>
                        )}
                        {project.date && (
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            {project.date}
                          </div>
                        )}
                      </div>
                      <p className="text-xl text-gray-300 leading-relaxed font-medium max-w-2xl">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}