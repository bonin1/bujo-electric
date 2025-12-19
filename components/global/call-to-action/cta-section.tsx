import React from 'react';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { getPhoneTel } from '@/lib/business-config';
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
  // Get city-specific CTA content or use defaults
  const ctaContent = cityData?.sectionContent?.cta;
  const heading = ctaContent?.heading || `Ready to Start Your Project${city ? ` in ${city}` : ''}?`;
  const subheading = ctaContent?.subheading || (city 
    ? `Join hundreds of satisfied ${city} customers who trust us with their most important projects. Get your free consultation today and experience the difference local expertise makes.`
    : `Get your free consultation today and let's bring your vision to life with professional expertise you can trust.`
  );
  const primaryCTA = ctaContent?.primaryCTA || 'Call Now';
  const secondaryCTA = ctaContent?.secondaryCTA || 'Free Consultation';
  return (
    <section className="py-24 px-4 bg-primary relative overflow-hidden">
      {/* Background decorative elements - Static (no animation) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Server-rendered CTA with animation */}
        <ScrollRevealUp>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {heading}
            </h2>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-12">
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group bg-secondary text-secondary-foreground hover:bg-secondary-hover">
              <Link href={`tel:${getPhoneTel()}`}>
                <Phone className="w-4 h-4 mr-2" />
                {primaryCTA}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Calendar className="w-4 h-4 mr-2" />
                {secondaryCTA}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
