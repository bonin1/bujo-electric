import React from 'react'
import { Metadata } from 'next'
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata'
import DynamicHeader from "@/components/global/dynamic-header/dynamic-header"
import ServiceAreasGrid from "@/components/sections/service-areas-grid"
import CTASection from "@/components/global/call-to-action/cta-section"

export const metadata: Metadata = generateMetadataFromConfig('/zonat-e-sherbimit/');

const page = () => {
  // Generate structured data for service areas page
  const structuredData = generateStructuredData('/zonat-e-sherbimit/');

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
        <DynamicHeader title="Zonat e Shërbimit" description="Shërbime elektrike profesionale në Prishtinë dhe në të gjithë Kosovën"  />
        <ServiceAreasGrid />
        <CTASection />
      </div>
    </>
  )
}
  
export default page