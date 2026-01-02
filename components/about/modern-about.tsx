"use client"

import React, { useRef } from 'react'
import Image from '@/components/ui/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Award, Zap, Shield, Target } from 'lucide-react'

export default function ModernAbout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Parallax transforms
  const imageY = useTransform(smoothProgress, [0, 1], [0, -150])
  const textY = useTransform(smoothProgress, [0, 1], [0, 50])
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.1])

  const values = [
    {
      title: "Integriteti",
      description: "Ne veprojmë me ndershmëri dhe transparencë në çdo projekt, duke ndërtuar besim afatgjatë me klientët tanë.",
      icon: <Shield className="w-8 h-8 text-primary" />,
      color: "bg-blue-50"
    },
    {
      title: "Inovacioni",
      description: "Përdorim teknologjitë më të fundit dhe metodat më efikase për të ofruar zgjidhje moderne elektrike.",
      icon: <Zap className="w-8 h-8 text-primary" />,
      color: "bg-yellow-50"
    },
    {
      title: "Cilësia",
      description: "Nuk bëjmë kompromise me cilësinë. Çdo instalim kryhet me precizitet dhe vëmendje ndaj detajeve.",
      icon: <Award className="w-8 h-8 text-primary" />,
      color: "bg-green-50"
    }
  ]

  return (
    <div ref={containerRef} className="bg-white relative">
      {/* Story Section with Parallax */}
      <section className="py-32 overflow-hidden relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              style={{ y: textY }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-10 leading-[1.1]">
                Mbi 15 vite <span className="text-primary">ekspertizë</span> në energji
              </h2>
              <div className="space-y-8 text-xl text-gray-600 leading-relaxed font-medium">
                <p>
                  Bujo Electric nisi si një vizion i vogël për të sjellë standarde evropiane në shërbimet elektrike në Kosovë. 
                  Sot, ne jemi një nga emrat më të besuar në industri, duke shërbyer qindra shtëpi dhe biznese me përkushtim.
                </p>
                <p className="border-l-4 border-primary pl-8 italic text-gray-500">
                  &ldquo;Udhëtimi ynë është ndërtuar mbi parimin se siguria elektrike nuk është luks, por një domosdoshmëri.&rdquo;
                </p>
              </div>
            </motion.div>

            <div className="relative">
              <motion.div 
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5]"
                style={{ y: imageY, scale }}
              >
                <Image
                  src="/assets/images/services/6.webp"
                  alt="Bujo Electric Work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
              
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Reveal Effect */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">Vlerat që na udhëheqin</h2>
              <p className="text-xl text-gray-600 font-medium">
                Suksesi ynë nuk matet vetëm me numrin e projekteve, por me mënyrën se si i realizojmë ato.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-20 h-20 rounded-3xl ${value.color} flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6`}>
                  {React.cloneElement(value.icon as React.ReactElement<{ className?: string }>, { 
                    className: "w-10 h-10 transition-colors duration-500 group-hover:text-white" 
                  })}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">{value.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  {value.description}
                </p>
                
                {/* Decorative background number */}
                <span className="absolute -bottom-10 -right-10 text-[12rem] font-black text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - Full Width Image with Text Overlay */}
      <section className="py-32 relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/services/7.webp"
            alt="Misioni ynë"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-primary font-black uppercase tracking-[0.3em]">Misioni Ynë</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-tight">
                Ndriçojmë të <span className="text-primary">ardhmen</span> e Kosovës.
              </h2>
              <p className="text-2xl text-gray-300 leading-relaxed font-medium mb-12">
                Misioni ynë është të ofrojmë siguri dhe inovacion në çdo shtëpi dhe biznes, duke u bërë partneri juaj i besuar për çdo nevojë elektrike. Ne besojmë në një të ardhme ku energjia është e sigurt, e pastër dhe e aksesueshme për të gjithë.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}

