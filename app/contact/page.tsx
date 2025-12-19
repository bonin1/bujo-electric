import React from 'react'
import { Metadata } from 'next'
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata'
import ContactFormComponent from '@/components/contact/ContactFormComponent'
import ContactInfo from '@/components/contact/ContactInfo'
import { DynamicHeader } from '@/components/global/dynamic-header'
import { BUSINESS_INFO } from '@/lib/business-config'
import { getTopCities, formatCitiesString } from '@/lib/city-utils'
// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/contact/')
}

const page = () => {
  // Generate structured data for contact page
  const structuredData = generateStructuredData('/contact/');
  const topCities = getTopCities(4);
  const topLocations = formatCitiesString(topCities);

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
      
      <div>
        <DynamicHeader
          title="Contact Us"
          description={`Get in touch for a free consultation and quote. We serve ${topLocations} with professional ${BUSINESS_INFO.primaryKeyword.toLowerCase()}.`}
          image="/assets/config/placeholder-image.png"
          breadcrumbs={[{ label: 'Contact', href: '/contact/' }]}
        />
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactFormComponent />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default page