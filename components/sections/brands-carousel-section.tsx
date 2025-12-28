"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedBrandLogo } from '@/components/ui/animations/animated-brand-logo';

const BrandsCarouselSection = () => {
  const brands = [
    {
      name: "Google",
      logo: "/assets/images/brands/google-logo.webp",
      alt: "Google Logo"
    },
    {
      name: "Facebook",
      logo: "/assets/images/brands/facebook.webp",
      alt: "Facebook Logo"
    },
    {
      name: "Apple",
      logo: "/assets/images/brands/apple.webp",
      alt: "Apple Logo"
    },
    {
      name: "BBB",
      logo: "/assets/images/brands/bbb.webp",
      alt: "BBB Logo"
    },
    {
      name: "Home Advisor",
      logo: "/assets/images/brands/home-advisor.webp",
      alt: "Home Advisor Logo"
    },
    {
      name: "Yelp",
      logo: "/assets/images/brands/yelp-logo.webp",
      alt: "Yelp Logo"
    }
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Brendet që ne Besojmë
          </h2>
          <p className="text-xl text-gray-600 max-w-7xl mx-auto leading-relaxed">
            Ne punojmë vetëm me prodhuesit më të njohur botërorë për të siguruar cilësi dhe siguri maksimale.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10" />
          
          {/* Auto-scrolling brands */}
          <div className="flex animate-brands-scroll">
            <div className="flex items-center space-x-24 shrink-0">
              {brands.map((brand, index) => (
                <div key={`first-${index}`} className="grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100">
                  <AnimatedBrandLogo
                    logo={brand.logo}
                    alt={brand.alt}
                    name={brand.name}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-24 shrink-0 ml-24">
              {brands.map((brand, index) => (
                <div key={`second-${index}`} className="grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100">
                  <AnimatedBrandLogo
                    logo={brand.logo}
                    alt={brand.alt}
                    name={brand.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsCarouselSection;

