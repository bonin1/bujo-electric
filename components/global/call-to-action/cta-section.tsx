import React from 'react';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { getPhoneTel, getPhoneDisplay } from '@/lib/business-config';
import { ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

interface CTASectionProps {
  city?: string;
  cityData?: {
    sectionContent?: {
      cta?: {
        heading?: string;
        subheading?: string;
        primaryCTA?: string;
        secondaryCTA?: string;
      };
    };
  };
}

const CTASection = ({ city, cityData }: CTASectionProps) => {
  const ctaContent = cityData?.sectionContent?.cta;
  const heading = ctaContent?.heading || `Gati për të filluar projektin tuaj${city ? ` në ${city}` : ''}?`;
  const subheading = ctaContent?.subheading || (city 
    ? `Bashkohuni me qindra klientë të kënaqur në ${city} që na besojnë projektet e tyre më të rëndësishme. Merrni një konsultë falas sot!`
    : `Merrni një konsultë falas sot dhe le t'i japim jetë vizionit tuaj me ekspertizë profesionale që mund t'i besoni.`
  );
  const secondaryCTA = ctaContent?.secondaryCTA || 'Konsultë Falas';

  return (
    <section className="py-24 px-4 bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        
        {/* Animated electrical lines (simplified for CTA) */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 Q 25 45, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.1" />
          <path d="M0 60 Q 25 55, 50 60 T 100 60" fill="none" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollRevealUp>
          <div className="text-center max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
              {heading}
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 px-10 py-8 rounded-2xl text-xl font-bold shadow-2xl group">
                <Link href={`tel:${getPhoneTel()}`}>
                  <Phone className="w-6 h-6 mr-3" />
                  {getPhoneDisplay()}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 px-10 py-8 rounded-2xl text-xl font-bold backdrop-blur-sm group">
                <Link href="/kontakti/">
                  <Calendar className="w-6 h-6 mr-3" />
                  {secondaryCTA}
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollRevealUp>
      </div>
    </section>
  );
};

export default CTASection;
