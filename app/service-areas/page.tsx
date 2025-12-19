import React from 'react'
import { Metadata } from 'next'
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata'
import DynamicHeader from "@/components/global/dynamic-header/dynamic-header"
import ServiceAreasSection from "@/components/sections/service-areas-section"
import CTASection from "@/components/global/call-to-action/cta-section"

export const metadata: Metadata = generateMetadataFromConfig('/service-areas/');

const page = () => {
  // Generate structured data for service areas page
  const structuredData = generateStructuredData('/service-areas/');

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
        <DynamicHeader title="Service Areas" description="Serving the entire state of Texas"  />
        <div className="py-4">
          <ServiceAreasSection />
        </div>
        <CTASection />
      </div>
    </>
  )
}
  
export default page