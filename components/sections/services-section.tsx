import React from 'react';
import Link from 'next/link';
import { DynamicBentoGrid } from '../ui/bento-grid/dynamic-bento-grid';
import { Button } from '@/components/ui/buttons/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CORE_SERVICES, BUSINESS_INFO } from '@/lib/business-config';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

interface OurServicesSectionProps {
  city?: string;
  cityData?: {
    sectionContent?: {
      services?: {
        heading?: string;
        subheading?: string;
        highlights?: string[];
        cta?: string;
      };
    };
  };
}

const OurServicesSection = ({ city, cityData }: OurServicesSectionProps) => {
  // Get city-specific content or fallback to defaults
  const servicesContent = cityData?.sectionContent?.services;
  const heading = servicesContent?.heading || `Our Services${city ? ` in ${city}` : ''}`;
  const subheading = servicesContent?.subheading || null;
  const highlights = servicesContent?.highlights || [];
  const ctaText = servicesContent?.cta || "Get Free Quote";

  // Define sizes for bento grid layout
  const sizes = ["large", "wide", "tall", "tall", "small"] as const;
  const variants = ["featured", "featured", "default", "featured", "default"] as const;

  // Service cards for the services section with dynamic bento grid
  const bentoGridItems = CORE_SERVICES.slice(0, 5).map((service, index) => ({
    title: service.name,
    imageSrc: "/assets/config/placeholder-image.png",
    imageAlt: city 
      ? `Professional ${service.name} services in ${city}`
      : `Professional ${service.name} services in ${BUSINESS_INFO.name} service areas`,
    buttonText: "Learn More",
    buttonHref: service.url,
    size: sizes[index] || "small",
    variant: variants[index] || "default",
    description: city
      ? `Expert ${service.name.toLowerCase()} for ${city} homes and businesses`
      : `Expert ${service.name.toLowerCase()} services`
  }));

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header - Server-rendered with animation */}
          <ScrollRevealUp className="text-center mb-16 md:mb-20 lg:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 md:mb-8">
              {heading}
            </h2>
          </ScrollRevealUp>
            {subheading && (
              <ScrollRevealUp delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                  {subheading}
                </p>
              </ScrollRevealUp>
            )}
            {highlights.length > 0 && (
              <div className="max-w-2xl mx-auto mt-8 space-y-3">
                {highlights.map((highlight, index) => (
                  <ScrollRevealScale delay={0.2 * index} key={highlight}>
                  <div
                    key={highlight}
                    className="flex items-start gap-3 text-left"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                  </ScrollRevealScale>
                ))}
              </div>
            )}
        
        
        {/* Services Grid - Server-rendered with animation */}
        <ScrollRevealScale delay={0.2}>
        <DynamicBentoGrid items={bentoGridItems} className="max-w-6xl mx-auto" />
        </ScrollRevealScale>
        
        {/* Services CTA - Server-rendered with animation */}
        <ScrollRevealScale delay={0.4}>
          <div className="text-center mt-16 md:mt-20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact/">
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services/">
                View All Services
              </Link>
            </Button>
          </div>
          </div>
        </ScrollRevealScale>
      </div>
    </section>
  );
};

export default OurServicesSection;
