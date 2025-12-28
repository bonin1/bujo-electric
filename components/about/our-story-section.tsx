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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Historia Jonë</h2>
            <p className="text-lg text-gray-700 mb-6">
              Bujo Electric u themelua me një mision të thjeshtë: të ofrojë shërbime elektrike të besueshme dhe profesionale 
              që rrisin sigurinë dhe vlerën e pronave të klientëve tanë.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Me përvojë të gjatë në tregun e Kosovës, ne kemi ndërtuar reputacionin tonë mbi cilësinë e punës, 
              instalimet e sakta dhe shërbimin e jashtëzakonshëm ndaj klientit. Ekipi ynë i profesionistëve të certifikuar 
              sjell ekspertizë në instalime, riparime, mirëmbajtje dhe mbështetje teknike gjithëpërfshirëse.
            </p>
            <p className="text-lg text-gray-700">
              Jemi krenarë që shërbejmë në Prishtinë, Prizren, Ferizaj dhe në të gjithë Kosovën, 
              duke ofruar zgjidhje që janë të sigurta, efikase dhe të ndërtuara për të zgjatur.
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
              alt="Ekipi i Bujo Electric duke punuar"
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

