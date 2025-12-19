"use client"

import React from 'react'
import Image from '@/components/ui/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface LuxuriousHeroProps {
  title: string
  subtitle: string
  cta1Text: string
  cta1Link: string
  cta2Text: string
  cta2Link: string
  backgroundImage: string
}

export default function LuxuriousHero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  backgroundImage
}: LuxuriousHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Luxurious professional service"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href={cta1Link}>{cta1Text}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={cta2Link}>{cta2Text}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
