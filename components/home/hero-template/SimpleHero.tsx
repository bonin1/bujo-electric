import React from 'react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

interface SimpleHeroProps {
  title: string
  subtitle: string
  cta1Text: string
  cta1Link: string
  cta2Text: string
  cta2Link: string
  backgroundImage: string
}

export default function SimpleHero({
  title,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  backgroundImage
}: SimpleHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <ScrollRevealUp delay={0.2}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
        </ScrollRevealUp>
        
        <ScrollRevealUp delay={0.4}>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </ScrollRevealUp>
        
        <ScrollRevealUp delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={cta1Link}>{cta1Text}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={cta2Link}>{cta2Text}</Link>
            </Button>
          </div>
        </ScrollRevealUp>
      </div>
    </section>
  );
}
