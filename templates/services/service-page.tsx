import Link from 'next/link';
import Image from '@/components/ui/image';
import { CheckCircle, ArrowRight, Star, Shield, Clock, Award, Users, Wrench, Zap, Lightbulb, Settings, CheckCircle2, MessageCircle, Palette, Hammer } from 'lucide-react';
import servicesData from '@/data/services.json';
import { DynamicHeader } from '@/components/global/dynamic-header';
import FAQSection from '@/components/sections/faq-section';
import CTASection from '@/components/global/call-to-action/cta-section';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { parseMarkdownContent } from '@/lib/markdown-utils';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  const service = servicesData.services.find((s) => s.slug === slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  const hasContentSections = service.contentSections && typeof service.contentSections === 'object';
  const parsedContent = !hasContentSections && service.contentSections ? parseMarkdownContent(service.contentSections.introduction.paragraph) : null;

  const relatedServices = service.isCore
    ? servicesData.services.filter(s => s.parentService === service.id).slice(0, 4)
    : servicesData.services.filter(s => s.parentService === service.parentService && s.id !== service.id).slice(0, 4);

  const faqs = service?.uniqueFaqs || [
    {
      question: `Sa kohë zgjat ${service.name.toLowerCase()}?`,
      answer: `Zakonisht, shërbimi ynë për ${service.name.toLowerCase()} zgjat ${service.duration}. Megjithatë, koha e saktë varet nga kërkesat specifike dhe kompleksiteti i projektit tuaj.`
    },
    {
      question: "Çfarë përfshihet në shërbim?",
      answer: `Shërbimi ynë për ${service.name.toLowerCase()} përfshin: ${service.features.slice(0, 3).join(', ')}, dhe më shumë. Ne ofrojmë zgjidhje gjithëpërfshirëse të përshtatura për nevojat tuaja.`
    },
    {
      question: "A ofroni garanci?",
      answer: "Po, ne qëndrojmë prapa punës sonë me garanci gjithëpërfshirëse. Të gjitha shërbimet tona vijnë me garanci kënaqësie dhe garanci për cilësinë e punës."
    },
    {
      question: "Si të filloj?",
      answer: "Fillimi është i lehtë! Thjesht na kontaktoni për një konsultim falas. Ne do të diskutojmë nevojat tuaja, do të ofrojmë një ofertë të detajuar dhe do të planifikojmë shërbimin tuaj në kohën që ju përshtatet."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Dynamic Header */}
      <DynamicHeader 
        title={service.name} 
        description={service.description} 
        image={service.featuredImage} 
        breadcrumbs={[
          { label: 'Shërbimet', href: '/sherbime-elektrike/' }, 
          { label: service.name, href: `/${service.slug}` }
        ]} 
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-[20%] left-[-10%] w-[40rem] h-[40rem] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50rem] h-[50rem] bg-secondary rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* 1. Hero Intro Section - Large Rounded Card */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealUp>
              <div className="bg-linear-to-br from-white via-gray-50 to-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-gray-100 overflow-hidden relative group">
                {/* Decorative blob */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
                
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider">
                      <Zap className="w-4 h-4" />
                      Shërbim Profesional
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1]">
                      {service.contentSections?.introduction?.title || service.name}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                      {service.contentSections?.introduction?.paragraph || service.description}
                    </p>
                    <div className="flex flex-wrap gap-6 pt-4">
                      <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">Kohëzgjatja</p>
                          <p className="font-bold text-gray-900">{service.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase">Siguria</p>
                          <p className="font-bold text-gray-900">Garanci e Plotë</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="relative h-[400px] sm:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                      <Image
                        src={service.featuredImage || "/assets/config/placeholder-image.png"}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                              <Award className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold text-lg">Ekspertë të Certifikuar</p>
                              <p className="text-white/80 text-sm">Mbi 10 vite përvojë në Kosovë</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-2xl -z-10 animate-pulse" />
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
                  </div>
                </div>
              </div>
            </ScrollRevealUp>
          </div>
        </section>

        {/* 2. Why Choose Us - Modern Grid */}
        {service.contentSections?.whyChoose && (
          <section className="py-16 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    Pse të zgjidhni shërbimin tonë?
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.contentSections?.whyChoose?.paragraph}
                  </p>
                  <div className="pt-4">
                    <Link href="/kontakti" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                      Na kontaktoni sot <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Siguri Maksimale", desc: "Ndjekim standardet më të larta të sigurisë elektrike.", icon: <Shield /> },
                    { title: "Ekspertizë Teknike", desc: "Ekip i kualifikuar me pajisjet më moderne.", icon: <Wrench /> },
                    { title: "Transparencë", desc: "Çmime të qarta dhe pa kosto të fshehura.", icon: <Zap /> },
                    { title: "Mbështetje 24/7", desc: "Gati për çdo emergjencë në çdo kohë.", icon: <Clock /> }
                  ].map((item, i) => (
                    <ScrollRevealScale key={i} delay={i * 0.1}>
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </ScrollRevealScale>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Process Section - Horizontal Timeline */}
        {service.contentSections?.process && (
          <section className="py-24 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                  {service.contentSections.process.title}
                </h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {service.contentSections.process.steps?.map((step, index) => (
                  <ScrollRevealUp key={index} delay={index * 0.1}>
                    <div className="relative group">
                      {/* Connecting line for desktop */}
                      {index < (service.contentSections?.process?.steps?.length || 0) - 1 && (
                        <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-white/10 z-0" />
                      )}
                      
                      <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-white text-2xl font-black mb-8 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-2xl">
                          {step.number || index + 1}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollRevealUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Challenges & Solutions */}
        {service.contentSections?.challenges && (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-linear-to-br from-primary/5 to-secondary/5 rounded-[3rem] p-8 sm:p-16 border border-primary/10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
                      {service.contentSections.challenges.title}
                    </h2>
                    <div className="space-y-6">
                      {service.contentSections.challenges.items?.map((item, index) => (
                        <ScrollRevealUp key={index} delay={index * 0.05}>
                          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                          </div>
                        </ScrollRevealUp>
                      ))}
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="aspect-square bg-white rounded-[2rem] shadow-2xl p-8 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent" />
                      <div className="relative z-10 text-center space-y-6">
                        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto">
                          <Lightbulb className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Zgjidhje Inteligjente</h3>
                        <p className="text-gray-600">Ne ofrojmë zgjidhje të personalizuara për çdo sfidë elektrike që mund të keni.</p>
                      </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Features Grid - Clean & Professional */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                Karakteristikat Kryesore
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Zbuloni çfarë e bën shërbimin tonë për {service.name.toLowerCase()} të veçantë dhe pse jemi lider në treg.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <ScrollRevealScale key={index} delay={index * 0.05}>
                  <div className="group bg-gray-50 hover:bg-white p-8 rounded-[2rem] border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-primary/10 flex items-center justify-center text-primary shadow-sm transition-colors">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">{feature}</span>
                    </div>
                  </div>
                </ScrollRevealScale>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Related Services - Sticky-style Cards */}
        {relatedServices.length > 0 && (
          <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                    {service.isCore ? 'Shërbime të Specializuara' : 'Shërbime të Ngjashme'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    Eksploroni shërbimet tona të tjera që mund t'ju ndihmojnë në projektin tuaj.
                  </p>
                </div>
                <Link href="/sherbime-elektrike" className="bg-white px-8 py-4 rounded-2xl font-bold text-gray-900 border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                  Të gjitha shërbimet
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedServices.map((related, i) => (
                  <ScrollRevealUp key={related.id} delay={i * 0.1}>
                    <Link href={`/${related.slug}`} className="group block h-full">
                      <div className={cn(
                        "relative h-full rounded-[2rem] p-8 border border-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col overflow-hidden",
                        i % 2 === 0 ? "bg-primary text-white" : "bg-secondary text-white"
                      )}>
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Wrench className="w-7 h-7" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4">{related.name}</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-8 line-clamp-3">
                          {related.description}
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2 font-bold text-sm">
                          <span>Mësoni më shumë</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollRevealUp>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. FAQ Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection faqs={faqs} />
          </div>
        </section>
      </div>
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

