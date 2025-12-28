"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface StatsHeroProps {
  title: string
  subtitle: string
  cta1Text: string
  cta1Link: string
  cta2Text: string
  cta2Link: string
  stats: Array<{ number: string; label: string }>
}

export default function StatsHero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  stats
}: StatsHeroProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-text-dark mb-6">
          {title}
        </h1>
        <p className="text-xl text-text-secondary mb-12 max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
        
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
