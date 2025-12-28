"use client"

import React from 'react'
import Image from '@/components/ui/image'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons'
import { motion } from 'framer-motion'
import { Zap, Shield, Clock, Star, ArrowRight, Phone } from 'lucide-react'
import { getPhoneTel, getPhoneDisplay } from '@/lib/business-config'

interface ElectricianHeroProps {
  title: string
  subtitle: string
  cta1Text: string
  cta1Link: string
  cta2Text?: string
  cta2Link?: string
  backgroundImage?: string
}

export default function ElectricianHero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
}: ElectricianHeroProps) {
  const heroImage = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#042946]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Professional Electrician"
          fill
          className="object-cover opacity-30 scale-105 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#042946] via-[#042946]/90 to-[#042946]/40" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* Animated Electrical Lines (SVG) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M0,200 Q250,100 500,200 T1000,200"
            fill="none"
            stroke="#3270E4"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M0,800 Q250,700 500,800 T1000,800"
            fill="none"
            stroke="#3270E4"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
          />
          {/* Vertical "Power" Lines */}
          <motion.line 
            x1="20%" y1="0" x2="20%" y2="100%" 
            stroke="#3270E4" strokeWidth="0.5" strokeDasharray="10 10"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.line 
            x1="80%" y1="0" x2="80%" y2="100%" 
            stroke="#3270E4" strokeWidth="0.5" strokeDasharray="10 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 100 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Floating Particles/Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-7xl">
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-primary" : ""}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-7xl leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-7 text-lg rounded-xl shadow-xl shadow-primary/20 group">
              <Link href={cta1Link} className="flex items-center gap-2">
                {cta1Text}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/10 px-8 py-7 text-lg rounded-xl backdrop-blur-sm">
              <Link href={`tel:${getPhoneTel()}`} className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {getPhoneDisplay()}
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Të Licencuar</p>
                <p className="text-gray-400 text-xs">Siguri maksimale</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Përgjigje e Shpejtë</p>
                <p className="text-gray-400 text-xs">Brenda 60 minutave</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">5 Yje</p>
                <p className="text-gray-400 text-xs">Nga klientët tanë</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Ekspertizë</p>
                <p className="text-gray-400 text-xs">Mbi 10 vite përvojë</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-[#042946] to-transparent z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        </div>
      </div>
    </section>
  )
}
