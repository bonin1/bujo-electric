'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/buttons/Button';
import { ArrowRight, Zap, Shield, Clock, Lightbulb, Settings } from 'lucide-react';
import { CORE_SERVICES } from '@/lib/business-config';
import { ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

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

const serviceIcons = [
  <Zap key="zap" className="w-8 h-8" />,
  <Shield key="shield" className="w-8 h-8" />,
  <Clock key="clock" className="w-8 h-8" />,
  <Lightbulb key="lightbulb" className="w-8 h-8" />,
  <Settings key="settings" className="w-8 h-8" />,
];

const OurServicesSection = ({ city, cityData }: OurServicesSectionProps) => {
  const servicesContent = cityData?.sectionContent?.services;
  const heading = servicesContent?.heading || `Shërbimet Tona Profesionale${city ? ` në ${city}` : ''}`;
  const subheading = servicesContent?.subheading || "Ne ofrojmë një gamë të gjerë shërbimesh elektrike me cilësi të lartë dhe siguri maksimale për shtëpinë dhe biznesin tuaj.";
  const ctaText = servicesContent?.cta || "Kërko Ofertë Falas";

  // Service images mapping
  const serviceImages = [
    '/assets/images/services/1.webp',
    '/assets/images/services/2.webp',
    '/assets/images/services/3.webp',
    '/assets/images/services/4.webp',
    '/assets/images/services/5.webp',
  ];

  return (
    <section className="bg-white relative py-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="px-4 max-w-7xl mx-auto relative z-10 text-center mb-20">
        <ScrollRevealUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {heading}
          </h2>
        </ScrollRevealUp>
        <ScrollRevealUp delay={0.2}>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </ScrollRevealUp>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {CORE_SERVICES.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={service.name} 
              className="sticky mb-8 last:mb-0"
              style={{ top: `${140 + index * 30}px` }}
            >
              <Link href={service.url} className="group block">
                <div className={`relative rounded-[2rem] p-8 md:p-12 shadow-xl border border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col md:flex-row gap-8 items-center overflow-hidden ${isEven ? 'bg-primary' : 'bg-secondary'}`}>
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                    <Image
                      src={serviceImages[index] || serviceImages[0]}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  </div>

                  {/* Minimal Decorative Element */}
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image on the right */}
                  <div className="hidden md:block relative w-64 h-64 flex-shrink-0 rounded-2xl overflow-hidden z-10 order-last">
                    <Image
                      src={serviceImages[index] || serviceImages[0]}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="256px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-center relative text-center md:text-left z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 flex-shrink-0">
                        {serviceIcons[index] || <Zap className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-3">
                          {service.name}
                        </h3>
                        <p className="text-lg text-white leading-relaxed">
                          {service.description || `Shërbime profesionale të ${service.name.toLowerCase()} me standarde të larta sigurie.`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start text-white font-bold text-lg group-hover:gap-3 transition-all mt-4 md:pl-[5.5rem]">
                      <span className="border-b-2 border-white/30 group-hover:border-white transition-all">Mëso më shumë</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all ml-2">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center relative z-10">
        <ScrollRevealUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg rounded-2xl shadow-lg shadow-primary/20">
              <Link href="/kontakti/">
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-gray-200 hover:bg-gray-50 px-10 py-7 text-lg rounded-2xl">
              <Link href="/sherbime-elektrike/">
                Të gjitha shërbimet
              </Link>
            </Button>
          </div>
        </ScrollRevealUp>
      </div>
    </section>
  );
};

export default OurServicesSection;
