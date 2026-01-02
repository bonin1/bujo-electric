"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, MapPin } from 'lucide-react'

export default function MissionValuesSection() {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-primary" aria-hidden="true" />,
      title: "Punë Cilësore",
      description: "Ne përdorim materiale premium dhe teknika të dëshmuara për të siguruar që çdo projekt të përmbushë standardet tona të larta."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" aria-hidden="true" />,
      title: "Përvojë 15 Vjeçare",
      description: "Ne sjellim mbi 15 vite përvojë dhe njohuri të specializuara në çdo projekt elektrik."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" aria-hidden="true" />,
      title: "Ekspertizë Lokale",
      description: "Ne njohim mirë rrjetin dhe kërkesat specifike të Kosovës, duke siguruar që instalimet tuaja të jenë të sigurta dhe efikase."
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Misioni dhe Vlerat Tona</h2>
          <p className="text-xl text-gray-600 max-w-7xl mx-auto">
            Ne jemi të përkushtuar për të krijuar zgjidhje të sigurta dhe efikase, duke ofruar shërbim 
            të jashtëzakonshëm për komunitetin tonë në mbarë Kosovën.
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

