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
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <ScrollRevealScale key={project.id} delay={index * 0.1}> 
                <div className="group cursor-pointer h-full">
                  {/* Image Card */}
                  <div 
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleImageClick(project.id)}
                  >
                  <Image
                    src={project.image || '/assets/config/placeholder-image.png'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading="lazy"
                  />
                  
                  {/* Category Tag - Always Visible */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                      <Maximize2 className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>

                  {/* Hover Overlay with Title, Date, Location */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {project.title && (
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                      )}
                      <div className="flex items-center justify-between text-xs text-white/80">
                        {project.location && (
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {project.location}
                          </div>
                        )}
                        {project.date && (
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {project.date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeExpandedImage}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={closeExpandedImage}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative">
              {(() => {
                const project = projects.find(p => p.id === expandedImage);
                if (!project) return null;
                
                return (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-xl shadow-2xl"
                      sizes="90vw"
                    />
                    
                    {/* Project Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                      <div className="text-white">
                        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
                          {project.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {project.location}
                            </div>
                          )}
                          {project.date && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {project.date}
                            </div>
                          )}
                        </div>
                        <p className="text-white/90 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

