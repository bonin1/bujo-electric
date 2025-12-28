"use client"

import React from 'react'
import Image from '@/components/ui/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface ImageFocusedHeroProps {
  title: string
  subtitle: string
  cta1Text: string
  cta1Link: string
  cta2Text: string
  cta2Link: string
  mainImage: string
  imageAlt: string
}

export default function ImageFocusedHero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  mainImage,
  imageAlt
}: ImageFocusedHeroProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark mb-6">
              {title}
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={cta1Link}>{cta1Text}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={cta2Link}>{cta2Text}</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src={mainImage}
              alt={imageAlt}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
