import React from 'react';
import { notFound } from 'next/navigation';
import citiesData from '@/data/cities.json';
import { SimpleHero } from "@/components/home/hero-template";
import BrandsCarouselSection from "@/components/sections/brands-carousel-section";
import OurServicesSection from "@/components/sections/services-section";
import ProcessStepsSection from "@/components/sections/process-steps-section";
import WhatSetsUsApartSection from "@/components/sections/what-sets-apart-section";
import AboutUsSimpleSection from "@/components/sections/about-us-simple-section";
import CTASection from "@/components/global/call-to-action/cta-section";
import ServiceAreasThinSection from "@/components/sections/service-areas-thin-section";

interface CityPageProps {
  params: {
    slug: string;
  };
}

const CityPage = ({ params }: CityPageProps) => {
  const city = citiesData.cities.find((c) => c.slug === params.slug);

  if (!city) {
    notFound();
  }

  const cityName = `${city.name}, ${city.state}`;

  return (
    <div>
      {/* Hero Section */}
      <SimpleHero
        title={`${city.heroTitle}`}
        subtitle={`${city.description}`}
        cta1Text="Get Free Quote"
        cta1Link="/contact"
        cta2Text="View Our Work"
        cta2Link="/portfolio"
        backgroundImage="/assets/config/placeholder-image.png"
      />

      {/* Brands Carousel */}
      <BrandsCarouselSection />

      {/* Services Section */}
      <OurServicesSection city={cityName} cityData={city as any} />

      {/* Process Steps */}
      <ProcessStepsSection city={cityName} cityData={city as any} />

      {/* What Sets Us Apart */}
      <WhatSetsUsApartSection city={cityName} cityData={city as any} />

      {/* Simple About Us */}
      <AboutUsSimpleSection city={cityName} cityData={city as any} />

      {/* General CTA Section */}
      <CTASection city={cityName} cityData={city as any} />



      {/* Service Areas (Thin) */}
      <ServiceAreasThinSection />
    </div>
  );
};

export default CityPage;
