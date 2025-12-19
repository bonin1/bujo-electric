"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, MapPin } from 'lucide-react'

export default function MissionValuesSection() {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-primary" aria-hidden="true" />,
      title: "Quality Craftsmanship",
      description: "We use premium materials and proven techniques to ensure every project meets our high standards."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" aria-hidden="true" />,
      title: "Expert Team",
      description: "Our certified professionals bring years of experience and specialized knowledge to every project."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" aria-hidden="true" />,
      title: "Local Expertise",
      description: "We understand local climate and conditions, ensuring your property thrives year-round."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission &amp; Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re committed to creating sustainable, beautiful solutions while providing exceptional 
            service to our community.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

