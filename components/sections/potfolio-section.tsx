"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import portfolioData from '@/data/portfolio.json';

interface OurPortfolioSectionProps {
  city?: string;
}

const OurPortfolioSection = ({ city }: OurPortfolioSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Get first 3 items from portfolio.json
  const portfolioItems = portfolioData.projects.slice(0, 3).map((project) => ({
    title: project.title,
    category: project.category || "Instalime Elektrike",
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

  return (
    <section className="py-12 bg-[#042946] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div className="max-w-7xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Portofoli i Punëve{city ? ` në ${city}` : ''}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Një vështrim në projektet tona më të fundit ku cilësia dhe siguria elektrike janë prioriteti ynë kryesor.
            </p>
          </div>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-10 py-7 rounded-2xl shadow-xl shadow-primary/20 group shrink-0">
            <Link href="/galeria-e-projekteve/">
              Shiko të gjithë Galerinë
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer bg-white/5"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042946] via-[#042946]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 overflow-hidden">
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex items-center text-white/70 text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Shiko projektin <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>

              {/* Subtle Border Overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-[#042946]/95 z-[100] flex items-center justify-center p-4 backdrop-blur-xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative max-w-7xl w-full aspect-video rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={portfolioItems[selectedImage].imageSrc}
                alt={portfolioItems[selectedImage].imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-12">
                <p className="text-primary font-bold mb-2">{portfolioItems[selectedImage].category}</p>
                <h3 className="text-4xl font-black text-white">{portfolioItems[selectedImage].title}</h3>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default OurPortfolioSection
