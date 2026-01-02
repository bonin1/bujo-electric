import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ElectricianHero } from "@/components/home/hero-template";
import { generateMetadataFromConfig, generateStructuredData } from "@/lib/seo-metadata";
import faqData from "@/data/faq.json";

// Import above-the-fold sections (static - render immediately)
import OurServicesSection from "@/components/sections/services-section";
import ProcessStepsSection from "@/components/sections/process-steps-section";
import WhatSetsUsApartSection from "@/components/sections/what-sets-apart-section";

// Lazy load below-the-fold sections (dynamic import)
const AboutUsSimpleSection = dynamic(() => import("@/components/sections/about-us-simple-section"), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
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

const FAQSection = dynamic(() => import("@/components/sections/faq-section"), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
});

const CTASection = dynamic(() => import("@/components/global/call-to-action/cta-section"), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />
});

// Generate metadata using the hybrid approach
export const metadata: Metadata = generateMetadataFromConfig('/');

export default function Home() {

  // Generate structured data for homepage (LocalBusiness and Breadcrumbs removed as requested)
  const structuredData = generateStructuredData('/', { isHomepage: true });
  const allSchemas = structuredData.map(script => JSON.parse(script.children));

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

        
        {/* Hero Section */}
        <ElectricianHero
          title="Zgjidhje Elektrike Profesionale në mbarë Kosovën"
          subtitle="Shërbime profesionale elektrike 24/7 në të gjithë Kosovën. Me mbi 15 vite përvojë, ne garantojmë performancë maksimale dhe siguri të plotë për rrjetin tuaj elektrik."
          cta1Text="Merrni një Konsultë Falas"
          cta1Link="/kontakti/"
          cta2Text="Eksploro Shërbimet"
          cta2Link="/sherbime-elektrike/"
          backgroundImage="/assets/images/services/15.webp"
        />

        
        {/* Services Section */}
        <OurServicesSection />

        {/* Process Steps */}
        <ProcessStepsSection />

        {/* What Sets Us Apart */}
        <WhatSetsUsApartSection />

        {/* Simple About Us */}
        <AboutUsSimpleSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Service Areas (Thin) */}
        <ServiceAreasThinSection />

        {/* Portfolio Section */}
        <OurPortfolioSection />
          
        {/* Blog Section */}
        <RecentBlogsSection />
        
        {/* FAQ Section */}
        <FAQSection faqs={faqData.faqs.slice(0, 5)} />
        
        {/* General CTA Section */}
        <CTASection />
      </div>
    </>
  );
}
