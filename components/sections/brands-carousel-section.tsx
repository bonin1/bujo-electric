"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedBrandLogo } from '@/components/ui/animations/animated-brand-logo';

const BrandsCarouselSection = () => {
  const brands = [
    {
      name: "Amarr",
      logo: "/assets/images/brands/amarr-logo.webp",
      alt: "Amarr Garage Doors Logo"
    },
    {
      name: "Clopay",
      logo: "/assets/images/brands/clopay-goldbar.webp",
      alt: "Clopay Garage Doors Logo"
    },
    {
      name: "LiftMaster",
      logo: "/assets/images/brands/liftmaster-garage-doors-Logo.webp",
      alt: "LiftMaster Garage Door Openers Logo"
    },
    {
      name: "CHI Overhead Doors",
      logo: "/assets/images/brands/chi-overhead-doors-logo.webp",
      alt: "CHI Overhead Doors Logo"
    },
    {
      name: "Wayne Dalton",
      logo: "/assets/images/brands/wayne-dalton-logo.webp",
      alt: "Wayne Dalton Garage Doors Logo"
    },
    {
      name: "Raynor",
      logo: "/assets/images/brands/raynor-garage-doors-logo.webp",
      alt: "Raynor Garage Doors Logo"
    },
    {
      name: "Genie",
      logo: "/assets/images/brands/genie-garage-door-logo.webp",
      alt: "Genie Garage Door Openers Logo"
    },
    {
      name: "Overhead Door",
      logo: "/assets/images/brands/overhead-door-logo.webp",
      alt: "Overhead Door Corporation Logo"
    },
    {
      name: "Guardian",
      logo: "/assets/images/brands/guardian-garage-door-logo.webp",
      alt: "Guardian Access and Door Hardware Logo"
    },
    {
      name: "Arrow Tru-Line",
      logo: "/assets/images/brands/arrow-tru-line-garage-doors-logo.webp",
      alt: "Arrow Tru-Line Garage Doors Logo"
    }
  ]

  return (
    <section className="py-16 px-4 bg-bg-secondary">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Trusted Brands We Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re proud to work with the industry&apos;s most respected partners and manufacturers.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-bg-secondary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-bg-secondary to-transparent z-10" />
          
          {/* Auto-scrolling brands - Using global CSS animation */}
          <div className="flex animate-brands-scroll">
            {/* First set of brands */}
            <div className="flex items-center space-x-16 shrink-0">
              {brands.map((brand, index) => (
                <AnimatedBrandLogo
                  key={`first-${index}`}
                  logo={brand.logo}
                  alt={brand.alt}
                  name={brand.name}
                />
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-16 shrink-0 ml-16">
              {brands.map((brand, index) => (
                <AnimatedBrandLogo
                  key={`second-${index}`}
                  logo={brand.logo}
                  alt={brand.alt}
                  name={brand.name}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsCarouselSection;

