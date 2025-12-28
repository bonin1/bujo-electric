"use client"

import React from 'react'
import { motion } from 'framer-motion'
import  ServiceAreasGrid  from '@/components/ui/service-areas1/service-areas-grid'

const ServiceAreasSection = () => {

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          
          <ServiceAreasGrid />
        </motion.div>

        
      </div>
    </section>
  )
}

export default ServiceAreasSection
