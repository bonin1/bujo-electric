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
import ServiceAreasGrid from "@/components/sections/service-areas-grid";

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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <SimpleHero
        title={`${city.heroTitle}`}
        subtitle={`${city.description}`}
        cta1Text="Na Kontaktoni"
        cta1Link="/kontakti"
        cta2Text="Shiko Portofolin"
        cta2Link="/galeria-e-projekteve"
        backgroundImage={city.featuredImage || "/assets/config/placeholder-image.png"}
      />

      {/* Services Section */}
      <div className="bg-gray-50">
        <OurServicesSection city={cityName} cityData={city as any} />
      </div>

      {/* Process Steps */}
      <ProcessStepsSection city={cityName} cityData={city as any} />

      {/* What Sets Us Apart */}
      <div className="bg-gray-50">
        <WhatSetsUsApartSection city={cityName} cityData={city as any} />
      </div>

      {/* Simple About Us */}
      <AboutUsSimpleSection city={cityName} cityData={city as any} />

      {/* General CTA Section */}
      <CTASection city={cityName} cityData={city as any} />

      {/* Service Areas Grid */}
      <div className="border-t border-gray-100">
        <ServiceAreasGrid />
      </div>
    </main>
  );
};

export default CityPage;
