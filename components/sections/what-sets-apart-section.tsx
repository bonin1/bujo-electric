'use client';

import React from 'react';
import { Award, Shield, Users, Clock, MapPin, Zap, Heart, Star } from 'lucide-react';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

interface WhatSetsUsApartSectionProps {
  city?: string;
  cityData?: {
    sectionContent?: {
      whySetsApart?: {
        heading?: string;
        subheading?: string;
        features?: Array<{
          title: string;
          description: string;
        }>;
      };
    };
  };
}

const WhatSetsUsApartSection = ({ city, cityData }: WhatSetsUsApartSectionProps) => {
  const whySetsApartContent = cityData?.sectionContent?.whySetsApart;
  const heading = whySetsApartContent?.heading || `Çfarë e bën Bujo Electric të Veçantë${city ? ` në ${city}` : ''}`;
  const subheading = whySetsApartContent?.subheading || `Me mbi 15 vite përvojë, ne kemi ofruar shërbime elektrike të jashtëzakonshme që rrisin vlerën e pronës dhe tejkalojnë pritshmëritë. Ne kombinojmë ekspertizën teknike me materiale cilësore për të siguruar rezultate superiore në të gjithë Kosovën.`;

  const iconOptions = [
    <Award key="icon-0" className="w-8 h-8" />,
    <Shield key="icon-1" className="w-8 h-8" />,
    <Users key="icon-2" className="w-8 h-8" />,
    <Clock key="icon-3" className="w-8 h-8" />,
    <MapPin key="icon-4" className="w-8 h-8" />,
    <Zap key="icon-5" className="w-8 h-8" />,
    <Heart key="icon-6" className="w-8 h-8" />,
    <Star key="icon-7" className="w-8 h-8" />
  ];

  const defaultFeatures = [
    {
      title: "Përvojë 15 Vjeçare",
      description: `Të njohur për mjeshtëri të jashtëzakonshme dhe kënaqësi të klientit në të gjithë vendin.`
    },
    {
      title: "Korrektësi & Siguri",
      description: "Çdo projekt vjen me përkushtimin tonë për siguri maksimale dhe mbështetje të vazhdueshme."
    },
    {
      title: "Materiale Cilësore",
      description: "Ne përdorim teknikat më të fundit dhe materiale premium për çdo instalim."
    },
    {
      title: "Dorëzim në Kohë",
      description: "Ne respektojmë kohën dhe orarin tuaj me një menaxhim efikas të projektit."
    }
  ];

  const featureData = whySetsApartContent?.features || defaultFeatures;
  
  const features = featureData.map((feature, index) => ({
    icon: iconOptions[index] || <Award className="w-8 h-8" />,
    title: feature.title,
    description: feature.description
  }))

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 -skew-x-12 transform translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollRevealUp>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              {heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {subheading}
            </p>
          </div>
        </ScrollRevealUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollRevealScale
              key={feature.title}
              delay={0.1 * index}
            >
              <div className="h-full p-6 rounded-3xl bg-white border border-gray-100 flex flex-col items-center text-center overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                  {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollRevealScale>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApartSection;

