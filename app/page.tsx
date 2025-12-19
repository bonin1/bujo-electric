import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SimpleHero } from "@/components/home/hero-template";
import { generateMetadataFromConfig, generateStructuredData } from "@/lib/seo-metadata";
import { BUSINESS_INFO } from "@/lib/business-config";
import { getTopCities, formatCitiesString } from "@/lib/city-utils";

// Import above-the-fold sections (static - render immediately)
import OurServicesSection from "@/components/sections/services-section";
import ProcessStepsSection from "@/components/sections/process-steps-section";
import WhatSetsUsApartSection from "@/components/sections/what-sets-apart-section";

// Lazy load below-the-fold sections (dynamic import)
const AboutUsSimpleSection = dynamic(() => import("@/components/sections/about-us-simple-section"), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
});

const BrandsCarouselSection = dynamic(() => import("@/components/sections/brands-carousel-section"), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />
});

const TestimonialsSection = dynamic(() => import("@/components/sections/testimonial-section/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
});

const ServiceAreasThinSection = dynamic(() => import("@/components/sections/service-areas-thin-section"), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />
});

const OurPortfolioSection = dynamic(() => import("@/components/sections/potfolio-section"), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
});

const RecentBlogsSection = dynamic(() => import("@/components/sections/blog-section"), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
});

const CTASection = dynamic(() => import("@/components/global/call-to-action/cta-section"), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />
});

// Generate metadata using the hybrid approach
export const metadata: Metadata = generateMetadataFromConfig('/');

export default function Home() {

  // Generate structured data for homepage
  const structuredData = generateStructuredData('/');
  const allSchemas = structuredData.map(script => JSON.parse(script.children));

  
  // Get dynamic content from business config and city data
  const primaryKeyword = BUSINESS_INFO.primaryKeyword;
  const topCities = getTopCities(4);
  const topLocations = formatCitiesString(topCities);

  return (
    <>
      {/* Add structured data scripts */}
      {structuredData.map((script) => (
        <script
          key={script.id}
          type={script.type}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas, null, 2) }}
          />
      ))}
      
      <div>

        
        {/* Hero Section (Change it to hardcoded content if you want, rn it has dynamic content based on the keywords*/}
        <SimpleHero
          title={`Premium ${primaryKeyword} in ${topCities[0].name}, ${topCities[0].state}`}
          subtitle={`Transform your property with certified professionals delivering exceptional ${primaryKeyword.toLowerCase()}. Industry-certified experts, comprehensive warranties, and A+ BBB rating serving ${topLocations}.`}
          cta1Text="Get Free Quote"
          cta1Link="/contact"
          cta2Text="View Our Work"
          cta2Link="/portfolio"
          backgroundImage="/assets/config/placeholder-image.png"
        />

        
        {/* Services Section */}
        <OurServicesSection />

        {/* Process Steps */}
        <ProcessStepsSection />

        {/* What Sets Us Apart */}
        <WhatSetsUsApartSection />

        {/* Simple About Us */}
        <AboutUsSimpleSection />

        {/* Brands Carousel */}
        <BrandsCarouselSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Service Areas (Thin) */}
        <ServiceAreasThinSection />

        {/* Portfolio Section */}
        <OurPortfolioSection />
          
        {/* Blog Section */}
        <RecentBlogsSection />
        
        {/* General CTA Section */}
        <CTASection />
      </div>
    </>
  );
}
