import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import servicesData from '@/data/services.json'
import WhyChooseUsLocationsSection from '@/components/sections/why-choose-us-variants/why-choose-us-locations-section'
import { DynamicHeader } from '@/components/global/dynamic-header'
import { generateMetadataFromConfig } from '@/lib/seo-metadata'
import { getServicesPageSchema } from '@/lib/seo-config'
import { getPhoneTel } from '@/lib/business-config'
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal'
import ProcessStepsSection from '@/components/sections/process-steps-section'
import BrandsCarouselSection from '@/components/sections/brands-carousel-section'
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/buttons'

export const metadata: Metadata = generateMetadataFromConfig('/sherbime-elektrike/')

interface Service {
  id: string
  name: string
  slug: string
  description: string
  category: string
  isCore: boolean
  featuredImage: string
}

export default function ServicesPage() {
  const services: Service[] = servicesData.services
  const coreServices = services.filter(service => service.isCore)
  const specializedServices = services.filter(service => !service.isCore)

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

      <div className="min-h-screen bg-white">
        <DynamicHeader
          title="Shërbime Elektrike Profesionale"
          subtitle="Ekspertizë dhe Siguri"
          description="Zgjidhje të plota për instalim, riparim dhe mirëmbajtje elektrike në të gjithë Kosovën."
          breadcrumbs={[{ label: 'Shërbimet', href: '/sherbime-elektrike/' }]}
        />

        {/* Core Services Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Shërbimet tona Kryesore</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ne ofrojmë një gamë të gjerë shërbimesh elektrike për shtëpi dhe biznese, duke garantuar cilësi dhe siguri maksimale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <ScrollRevealUp key={service.id} delay={index * 0.1}>
                  <Link href={`/${service.slug}/`} className="group block h-full">
                    <div className="h-full bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col relative overflow-hidden">
                      {/* Service Image Background */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <Image
                          src={`/assets/images/services/${(index % 20) + 1}.webp`}
                          alt={service.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      {/* Decorative background element */}
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                      
                      <div className="relative z-10 flex-grow flex flex-col">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                          <Zap className="w-8 h-8" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                          {service.name}
                        </h3>
                        
                        <p className="text-gray-500 text-lg line-clamp-3 mb-10 flex-grow leading-relaxed font-medium">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-3 text-primary font-bold text-lg group-hover:gap-5 transition-all">
                          <span>Mëso më shumë</span>
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollRevealUp>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Shërbime të Specializuara</h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Përveç shërbimeve tona kryesore, ne ofrojmë zgjidhje të specializuara për çdo nevojë specifike elektrike.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializedServices.map((service, index) => (
                <ScrollRevealScale key={service.id} delay={index * 0.05}>
                  <Link href={`/${service.slug}/`} className="group">
                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-primary hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </ScrollRevealScale>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ProcessStepsSection />

        {/* Brands Section */}
        <BrandsCarouselSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsLocationsSection />

        {/* Final CTA */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Gati për të filluar projektin tuaj?</h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Na kontaktoni sot për një konsultë falas dhe një vlerësim të detajuar për nevojat tuaja elektrike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="rounded-full px-10 font-bold text-primary">
                  <Link href="/kontakti/">Na Kontaktoni</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full px-10 font-bold border-white text-white hover:bg-white hover:text-primary">
                  <Link href={`tel:${getPhoneTel()}`}>Telefono Tani</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}


