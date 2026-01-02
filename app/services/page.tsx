import { Metadata } from 'next'
import Link from 'next/link'
import servicesData from '@/data/services.json'
import WhyChooseUsLocationsSection from '@/components/sections/why-choose-us-variants/why-choose-us-locations-section'
import { DynamicHeader } from '@/components/global/dynamic-header'
import { generateMetadataFromConfig } from '@/lib/seo-metadata'
import { getServicesPageSchema } from '@/lib/seo-config'
import { BUSINESS_INFO } from '@/lib/business-config'

export const metadata: Metadata = generateMetadataFromConfig('/services/')

interface Service {
  id: string
  name: string
  slug: string
  description: string
  content?: string
  contentSections?: {
    introduction?: {
      title: string
      paragraph: string
    }
    whyMatters?: {
      title: string
      paragraph: string
    }
    process?: {
      title: string
      steps?: Array<{
        number: string
        title: string
        description: string
      }>
    }
    challenges?: {
      title: string
      items?: string[]
    }
    whyChoose?: {
      title: string
      paragraph: string
    }
  }
  category: string
  duration: string
  priceRange: string
  isCore: boolean
  parentService: string | null
  features: string[]
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
  featuredImage: string
  gallery: string[]
  contentVariations?: {
    opening?: string
    whyChoose?: string
    closing?: string
  }
  uniqueFaqs?: Array<{
    question: string
    answer: string
  }>
}

export default function ServicesPage() {
  const services: Service[] = servicesData.services

  // Get all core services
  const coreServices = services.filter(service => service.isCore)

  // Generate structured data for services page using the centralized schema generator
  const structuredData = getServicesPageSchema(services)

  return (
    <>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      
      <DynamicHeader
        title={`${BUSINESS_INFO.name}: Shërbime Elektrike Profesionale`}
        subtitle="Njihuni me shërbimet tona"
        description="Zgjidhje të plota për instalim, riparim, mirëmbajtje dhe ndërrim të rrjetit elektrik"
        breadcrumbs={[{ label: 'Shërbimet', href: '/services/' }]}
      />

      {/* Introduction */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Zgjidhje Gjithëpërfshirëse Elektrike
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Ne jemi pika juaj e vetme për të gjitha nevojat elektrike. Nga instalimet e reja deri te riparimet emergjente, 
              mirëmbajtja rutinë deri te ndërrimi i plotë i paneleve, ne ofrojmë shërbim profesional 
              të cilit mund t&apos;i besoni. Me përvojën tonë të gjerë, ne e trajtojmë çdo projekt me kujdesin dhe vëmendjen që meriton.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Shërbimet Kryesore
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {coreServices.map((coreService) => (
              <Link
                key={coreService.id}
                href={`/${coreService.slug}`}
                className="block bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-block bg-gray-800 text-text-light px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  Shërbim Kryesor
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {coreService.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {coreService.description}
                </p>
                <div className="mt-4 flex items-center text-gray-700 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Mëso më shumë</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subservices Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Shërbime të Specializuara
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {services.filter(service => !service.isCore).map((subservice) => {
              // Find parent service
              const parentService = services.find(s => s.id === subservice.parentService)
              
              return (
                <Link
                  key={subservice.id}
                  href={`/${subservice.slug}`}
                  className="group bg-white rounded-lg border border-gray-200 hover:border-gray-400 p-6 transition-all duration-200 hover:shadow-md"
                >
                  {parentService && (
                    <div className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {parentService.name}
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {subservice.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {subservice.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsLocationsSection />
    </div>
    </>
  )
}

