import React from 'react';
import { Award, Shield, Users, Clock, MapPin, Zap, Heart, Star } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/business-config';
import { getPrimaryCity } from '@/lib/city-utils';
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
  // Get city-specific content or fallback to defaults
  const whySetsApartContent = cityData?.sectionContent?.whySetsApart;
  const primaryCity = getPrimaryCity();
  const heading = whySetsApartContent?.heading || `What Sets ${BUSINESS_INFO.name} Apart${city ? ` in ${city}` : ''}`;
  const subheading = whySetsApartContent?.subheading || `Since our establishment in 2010, we have delivered exceptional ${BUSINESS_INFO.primaryKeyword.toLowerCase()} that enhance property value and exceed expectations. Our certified professionals combine technical expertise with premium materials to ensure superior results across ${primaryCity.state}.`;

  // Icon options for features
  const iconOptions = [
    <Award key="icon-0" className="w-8 h-8 text-primary" />,
    <Shield key="icon-1" className="w-8 h-8 text-primary" />,
    <Users key="icon-2" className="w-8 h-8 text-primary" />,
    <Clock key="icon-3" className="w-8 h-8 text-primary" />,
    <MapPin key="icon-4" className="w-8 h-8 text-primary" />,
    <Zap key="icon-5" className="w-8 h-8 text-primary" />,
    <Heart key="icon-6" className="w-8 h-8 text-primary" />,
    <Star key="icon-7" className="w-8 h-8 text-primary" />
  ];

  // Default features if no city-specific data
  const defaultFeatures = [
    {
      title: "Award-Winning Excellence",
      description: `Recognized for outstanding craftsmanship and customer satisfaction across ${primaryCity.state}.`
    },
    {
      title: "Quality Guarantee",
      description: "Every project comes with our comprehensive warranty and ongoing support."
    },
    {
      title: "Expert Team",
      description: "Our certified professionals are trained in the latest techniques and use premium materials."
    },
    {
      title: "Timely Delivery",
      description: "We respect your time and schedule with efficient project management."
    }
  ];

  // Use city-specific features or defaults
  const featureData = whySetsApartContent?.features || defaultFeatures;
  
  // Combine feature data with icons
  const features = featureData.map((feature, index) => ({
    icon: iconOptions[index] || <Award className="w-8 h-8 text-primary" />,
    title: feature.title,
    description: feature.description
  }))

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:px-8">
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Server-rendered with animation */}
        <ScrollRevealUp>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              {heading}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subheading}
            </p>
          </div>
        </ScrollRevealUp>

        <div className="h-[100%] grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <ScrollRevealScale
              key={feature.title}
              delay={0.1 * index}
            >
              <div className="bg-card items-center justify-center flex flex-col rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-center border border-border"
              >
              {/* Icon */}
              <div className="mb-1 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <div className="w-20 h-auto bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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

