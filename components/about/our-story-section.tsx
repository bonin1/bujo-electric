"use client"

import React from 'react'
import Image from '@/components/ui/image'
import { motion } from 'framer-motion'

export default function OurStorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Example Company was founded with a simple mission: to provide reliable, professional 
              services that enhance our clients&apos; properties and increase their value.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With over 15 years of experience, we&apos;ve built our reputation on quality 
              craftsmanship, expert installations, and exceptional customer service. Our team of certified 
              professionals brings expertise in installation, repair, maintenance, 
              and comprehensive support services.
            </p>
            <p className="text-lg text-gray-700">
              We&apos;re proud to serve Example City, North Town, South Town, East Village, and surrounding communities, 
              providing solutions that are reliable, secure, and built to last.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative h-96 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/assets/config/placeholder-image.png"
              alt="Example Company team at work"
              fill
              className="object-cover w-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

