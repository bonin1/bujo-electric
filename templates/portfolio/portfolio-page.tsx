import React from 'react';
import Image from 'next/image';
import { DynamicHeader } from '@/components/global/dynamic-header';
import portfolioData from '@/data/portfolio.json';
import { getLocationsForNavigation, getServicesForNavigation } from '@/lib/business-config';
import PortfolioClientWrapper from '@/components/portfolio/portfolio-client-wrapper';
import CTASection from '@/components/global/call-to-action/cta-section';
import { ScrollRevealScale, ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

export default function PortfolioPage() {
  // Server-side data preparation
  const categories = [
    { name: "Të Gjitha", href: "/galeria-e-projekteve/" },
    ...getServicesForNavigation()
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Header */}
      <DynamicHeader 
        title="Galeria e Projekteve Tona"
        description="Eksploroni projektet tona të përfunduara në mbarë Kosovën. Shihni cilësinë dhe profesionalizmin që na dallon në shërbimet elektrike."
        image="/assets/images/services/18.webp"
        breadcrumbs={[
          { label: 'Galeria e Projekteve', href: '/galeria-e-projekteve/' }
        ]}
      />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Background decorative images */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-1/4 h-full">
            <Image
              src="/assets/images/services/9.webp"
              alt="Portfolio background"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          <div className="absolute top-0 right-0 w-1/4 h-full">
            <Image
              src="/assets/images/services/10.webp"
              alt="Portfolio background"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioData.stats.totalProjects && (
             <ScrollRevealScale delay={0.4}>
             <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {portfolioData.stats.totalProjects}+
              </div>
              <div className="text-gray-600">Projekte të Përfunduara</div>
            </div>
            </ScrollRevealScale>
            )}
            {portfolioData.stats.happyClients && (
            <ScrollRevealScale delay={0.6}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {portfolioData.stats.happyClients}+
              </div>
              <div className="text-gray-600">Klientë të Kënaqur</div>
            </div>
            </ScrollRevealScale>
            )}
            {portfolioData.stats.yearsExperience && (
            <ScrollRevealScale delay={0.8}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {portfolioData.stats.yearsExperience}+
              </div>
              <div className="text-gray-600">Vite Përvojë</div>
            </div>
            </ScrollRevealScale>
            )}
            {getLocationsForNavigation().length > 0 && (
            <ScrollRevealScale delay={1}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {getLocationsForNavigation().length}
              </div>
              <div className="text-gray-600">Zonat e Shërbimit</div>
            </div>
            </ScrollRevealScale>
            )}
          </div>
        </div>
      </section>

      {/* Client-side interactive components */}
      <PortfolioClientWrapper 
        initialProjects={portfolioData.projects}
        categories={categories}
      />

      <CTASection />
    </div>
  );
}
