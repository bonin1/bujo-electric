import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata'
import ContactFormComponent from '@/components/contact/ContactFormComponent'
import ContactInfo from '@/components/contact/ContactInfo'
import { DynamicHeader } from '@/components/global/dynamic-header'
import { BUSINESS_INFO } from '@/lib/business-config'
import { getTopCities, formatCitiesString } from '@/lib/city-utils'

// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/kontakti/')
}

const page = () => {
  // Generate structured data for contact page
  const structuredData = generateStructuredData('/kontakti/');
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
          title="Na Kontaktoni"
          description={`Na kontaktoni për një konsultim dhe ofertë falas. Ne shërbejmë në ${topLocations} me shërbime profesionale të ${BUSINESS_INFO.primaryKeyword.toLowerCase()}.`}
          image="/assets/images/services/13.webp"
          breadcrumbs={[{ label: 'Kontakti', href: '/kontakti/' }]}
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
