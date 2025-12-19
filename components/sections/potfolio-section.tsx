"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { AnimatedPortfolioCard } from '@/components/ui/animations/animated-portfolio-card';
import portfolioData from '@/data/portfolio.json';

interface OurPortfolioSectionProps {
  city?: string;
}

const OurPortfolioSection = ({ city }: OurPortfolioSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Get first 3 items from portfolio.json
  const portfolioItems = portfolioData.projects.slice(0, 3).map((project) => ({
    title: project.title,
    imageSrc: project.image,
    imageAlt: project.description || `${project.title} Portfolio Example`,
  }));

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? portfolioItems.length - 1 : selectedImage - 1);
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === portfolioItems.length - 1 ? 0 : selectedImage + 1);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Our Portfolio{city ? ` in ${city}` : ''}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to see what we can create together? Let&apos;s start with a free consultation 
            that&apos;s completely tailored to your unique space. Here are some of our recent projects 
            that showcase our expertise and attention to detail.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {portfolioItems.map((item, index) => (
            <AnimatedPortfolioCard
              key={item.title}
              item={item}
              index={index}
              onSelect={setSelectedImage}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link href="/portfolio">
                <Eye className="w-4 h-4 mr-2" />
                View Full Portfolio
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Start Your Project
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={portfolioItems[selectedImage].imageSrc}
                  alt={portfolioItems[selectedImage].imageAlt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  quality={90}
                />
              </div>
              
              {/* Image Title */}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {portfolioItems[selectedImage].title}
                </h3>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                <p className="text-white text-sm">
                  {selectedImage + 1} / {portfolioItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default OurPortfolioSection
