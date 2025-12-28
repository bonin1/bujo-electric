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
    <div className={`w-full max-w-7xl mx-auto px-4 py-12 ${className}`}>
      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
          Zonat tona të shërbimit
        </h2>
        <p className="text-lg text-gray-600 max-w-7xl mx-auto leading-relaxed mb-10">
          Ne ofrojmë shërbime profesionale elektrike në të gjitha qytetet kryesore të Kosovës. Gjeni qytetin tuaj më poshtë.
        </p>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Kërko qytetin tuaj..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-8 py-5 pl-14 text-lg border border-gray-200 rounded-2xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 bg-white shadow-sm"
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </motion.div>

      {/* Cities Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCities.map((city) => (
            <motion.div
              key={city.id}
              variants={itemVariants}
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <Link 
                href={`/${city.slug}`}
                className="block h-full"
              >
                <div className="p-6 rounded-2xl transition-all duration-300 bg-white border border-gray-100 hover:border-primary hover:shadow-xl hover:shadow-primary/5 group-hover:-translate-y-1 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg">
                      {city.name}
                    </h5>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
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
      {filteredCities.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 font-medium">
            Duke treguar <span className="text-gray-900 font-bold">{filteredCities.length}</span> zona shërbimi
          </p>
        </motion.div>
      )}

      {filteredCities.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16 py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"
        >
          <p className="text-gray-500 text-lg">Nuk u gjet asnjë qytet me këtë emër.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-primary font-bold hover:underline"
          >
            Pastro kërkimin
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceAreasGrid;
