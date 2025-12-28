import React from 'react'
import { Metadata } from 'next'
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata'
import ModernAbout from '@/components/about/modern-about'
import CTASection from '@/components/global/call-to-action/cta-section'
import ServiceAreasThinSection from '@/components/sections/service-areas-thin-section'
import DynamicHeader from '@/components/global/dynamic-header/dynamic-header'
import { TestimonialsSection } from '@/components/sections/testimonial-section/testimonials-section'

export const metadata: Metadata = generateMetadataFromConfig('/rreth-nesh/');

const page = () => {
  // Generate structured data for about page
  const structuredData = generateStructuredData('/rreth-nesh/');

  return (
    <>
      {/* Add structured data scripts */}
      {structuredData.map((script) => (
        <script
          key={script.id}
          type={script.type}
          dangerouslySetInnerHTML={{ __html: script.children }}
        />
      ))}
      
      <div className="min-h-screen">
        <DynamicHeader 
          title="Rreth Nesh" 
          description="Historia jonë, misioni dhe përkushtimi ndaj sigurisë elektrike në Kosovë" 
          breadcrumbs={[{ label: 'Rreth Nesh', href: '/rreth-nesh/' }]} 
        />
        
        <ModernAbout />

        <div id="testimonials">
          <TestimonialsSection />
        </div>
        
        <ServiceAreasThinSection />
        <CTASection />
      </div>
    </>
  )
}

export default page