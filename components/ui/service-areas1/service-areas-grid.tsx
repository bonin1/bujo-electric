"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Search } from 'lucide-react';
import { getAllCities, type City } from '@/lib/city-utils';

interface ServiceAreasGridProps {
  className?: string;
}

const ServiceAreasGrid: React.FC<ServiceAreasGridProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get cities from centralized utilities
  const allCities: City[] = React.useMemo(() => getAllCities(), []);
  
  // Initialize filtered cities - will be updated by search effect
  const [filteredCities, setFilteredCities] = useState<City[]>(allCities);

  useEffect(() => {
    const filtered = allCities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm, allCities]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-6 ${className}`}>
      

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <p className="text-lg text-center text-text-secondary max-w-2xl mx-auto leading-relaxed mb-2">
            Find out our service areas near you
          </p>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-12 text-lg border-2 border-border rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow-md bg-card"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-text-secondary" />
          </div>
        </div>
      </motion.div>

      

      {/* Cities Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence>
          {filteredCities.map((city) => (
            <motion.div
              key={city.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <Link 
                href={`/${city.slug}`}
                className="block"
              >
                <div className="p-5 rounded-xl transition-all duration-300 bg-card border-2 border-border hover:border-primary/50 shadow-sm hover:shadow-md group-hover:-translate-y-1">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all">
                        <MapPin className="w-5 h-5" />
                      </div>
                    </div>
                    <h5 className="font-semibold text-base text-card-foreground group-hover:text-primary transition-colors mb-1">
                      {city.name}
                    </h5>
                    <p className="text-sm text-text-secondary">
                      {city.state}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-card border-2 border-border rounded-full">
          <p className="text-text-secondary font-medium">
            Showing <span className="text-primary font-bold">{filteredCities.length}</span> of <span className="text-primary font-bold">{allCities.length}</span> cities
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceAreasGrid;
