"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface HouseMaskHeroProps {
  title: string
  subtitle: string
  cta1Text: string
  cta1Link: string
  cta2Text: string
  cta2Link: string
  roomImages: string[]
  imageAlt: string
  rooms: Array<{ id: string; name: string; icon: string; description: string }>
}

export default function HouseMaskHero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  rooms
}: HouseMaskHeroProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-text-dark mb-6">
            {title}
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="text-center p-6 bg-card rounded-lg">
              <div className="text-4xl mb-4">{room.icon}</div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {room.name}
              </h3>
              <p className="text-text-secondary">{room.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
