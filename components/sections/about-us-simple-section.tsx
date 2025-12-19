import React from 'react';
import Image from '@/components/ui/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { BUSINESS_INFO } from '@/lib/business-config';
import { ScrollRevealLeft, ScrollRevealRight } from '@/components/ui/animations/scroll-reveal';

interface AboutUsSimpleSectionProps {
  city?: string;
  cityData?: {
    content?: string;
  };  
}

const AboutUsSimpleSection = ({ city, cityData }: AboutUsSimpleSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-x-hidden">
          {/* Content - Server-rendered with animation */}
          <ScrollRevealLeft>
            <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {city ? `About ${BUSINESS_INFO.name} in ${city}` : 'About Us'}
              </h2>
              <div className="section-divider" />
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {cityData?.content || `Established in 2010, ${BUSINESS_INFO.name} has been delivering premium-quality services to discerning property owners. Our certified professionals specialize in enhancing property value through superior craftsmanship and precision installations that meet the highest industry standards.`}
            </p>


            {/* Key points */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-foreground mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Certified Expertise:</strong> IDEA-certified professionals with 15+ years of combined experience delivering exceptional results
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-foreground mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Comprehensive Warranty:</strong> Industry-leading 5-year labor warranty and lifetime hardware guarantee for complete peace of mind
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-foreground mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Licensed & Insured:</strong> Fully licensed, bonded, and insured with $2M liability coverage for your protection
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-foreground mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Verified Excellence:</strong> A+ BBB rating with 98% customer satisfaction across 1,200+ completed projects{city ? ` in ${city} and surrounding areas` : ''}
                </p>
              </div>
            </div>

            {/* CTA */}
            <Button size="lg" asChild>
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            </div>
          </ScrollRevealLeft>

          {/* Image - Server-rendered with animation */}
          <ScrollRevealRight delay={0.2}>
            <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-sm overflow-hidden shadow-geometric-lg border-2 border-primary/20">
              <Image
                src="/assets/config/placeholder-image.png"
                alt={`${BUSINESS_INFO.name} team working on installation`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
            </div>
          </ScrollRevealRight>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSimpleSection;

