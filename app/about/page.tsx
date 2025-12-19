import React from 'react'
import { Metadata } from 'next'
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata'
import OurStorySection from '@/components/about/our-story-section'
import StatsSection from '@/components/about/stats-section'
import MissionValuesSection from '@/components/about/mission-values-section'
import CTASection from '@/components/global/call-to-action/cta-section'
import ServiceAreasThinSection from '@/components/sections/service-areas-thin-section'
import DynamicHeader from '@/components/global/dynamic-header/dynamic-header'

export const metadata: Metadata = generateMetadataFromConfig('/about/');

const page = () => {
  // Generate structured data for about page
  const structuredData = generateStructuredData('/about/');

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
        <DynamicHeader title="About Example Project" description="Because we want you to know us" badges={["Local Expertise", "Free Consultation", "Satisfaction Guaranteed"]} breadcrumbs={[{ label: 'About', href: '/about/' }]} />
        <OurStorySection />
        <StatsSection />
        <MissionValuesSection />
        <ServiceAreasThinSection />
        <CTASection />
      </div>
    </>
  )
}

export default page