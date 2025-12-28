'use client';

import React, { useState, useEffect } from 'react';
import Image from '@/components/ui/image';
import { ArrowRight, CheckCircle, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { BUSINESS_INFO } from '@/lib/business-config';
import { ScrollRevealLeft, ScrollRevealRight } from '@/components/ui/animations/scroll-reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { parseMarkdownContent } from '@/lib/markdown-utils';

interface AboutUsSimpleSectionProps {
  city?: string;
  cityData?: {
    content?: string;
  };  
}

const carouselImages = [
  "/assets/images/services/30.webp",
  "/assets/images/services/31.webp",
  "/assets/images/services/32.webp"
];

const AboutUsSimpleSection = ({ city, cityData }: AboutUsSimpleSectionProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content - Server-rendered with animation */}
          <ScrollRevealLeft>
            <div className="relative z-10">
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                {city ? `Rreth ${BUSINESS_INFO.name} në ${city}` : 'Ekspertë në Shërbime Elektrike'}
              </h2>
              
              <div className="text-xl text-gray-600 leading-relaxed mb-10 max-w-7xl">
                {cityData?.content ? parseMarkdownContent(cityData.content) : (
                  <div className="space-y-4">
                    <p>{BUSINESS_INFO.name} është lider në ofrimin e shërbimeve elektrike profesionale në mbarë Kosovën. Me një përvojë mbi 10-vjeçare, ne jemi të përkushtuar të ofrojmë siguri, cilësi dhe efikasitet për çdo projekt, qoftë ai rezidencial, komercial apo industrial.</p>
                    <p>Ekipi ynë i elektricistëve të certifikuar përdor teknologjinë më të fundit dhe materialet më cilësore për të siguruar që rrjeti juaj elektrik të jetë i sigurt dhe i qëndrueshëm. Ne kuptojmë rëndësinë e energjisë elektrike në jetën tuaj të përditshme, prandaj ofrojmë mbështetje 24/7 për çdo emergjencë.</p>
                  </div>
                )}
              </div>

              {/* Key points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Ekspertizë e Certifikuar</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Teknikë të kualifikuar dhe me përvojë shumëvjeçare.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Shield className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Garanci 5-Vjeçare</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Siguri e plotë dhe garanci për çdo punim tonin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Zap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Licencuar & Siguruar</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Punojmë sipas standardeve më të larta ndërkombëtare.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Users className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Mbështetje 24/7</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Gati për t&apos;ju ndihmuar në çdo kohë, 7 ditë të javës.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-2xl shadow-lg shadow-primary/20">
                <Link href="/rreth-nesh/">
                  Mëso më shumë rreth nesh
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollRevealLeft>

          {/* Image Carousel */}
          <ScrollRevealRight delay={0.2}>
            <div className="relative">
              {/* Decorative background for image */}
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary/20 rounded-3xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-secondary/5 rounded-3xl -z-10" />
              
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={carouselImages[currentImage]}
                      alt={`${BUSINESS_INFO.name} duke punuar`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentImage === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                      10+
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">Vite Përvojë</p>
                      <p className="text-gray-600 text-sm">Në tregun e Kosovës</p>
                    </div>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 right-8 flex gap-2 z-30">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentImage ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollRevealRight>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSimpleSection;

