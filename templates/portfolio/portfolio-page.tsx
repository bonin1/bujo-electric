import React from 'react';
import { DynamicHeader } from '@/components/global/dynamic-header';
import portfolioData from '@/data/portfolio.json';
import { getLocationsForNavigation, getServicesForNavigation } from '@/lib/business-config';
import PortfolioClientWrapper from '@/components/portfolio/portfolio-client-wrapper';
import CTASection from '@/components/global/call-to-action/cta-section';
import { ScrollRevealScale, ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

export default function PortfolioPage() {
  // Server-side data preparation
  const categories = [
    { name: "All Projects", href: "/portfolio/" },
    ...getServicesForNavigation()
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Header */}
      <DynamicHeader 
        title="Our Portfolio"
        description="Explore our completed garage door projects across Austin, Dallas, Houston, and San Antonio. See the quality and craftsmanship that sets us apart."
        image="/assets/config/placeholder-image.png"
        breadcrumbs={[
          { label: 'Portfolio', href: '/portfolio/' }
        ]}
      />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioData.stats.totalProjects && (
             <ScrollRevealScale delay={0.4}>
             <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {portfolioData.stats.totalProjects}+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            </ScrollRevealScale>
            )}
            {portfolioData.stats.happyClients && (
            <ScrollRevealScale delay={0.6}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {portfolioData.stats.happyClients}+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            </ScrollRevealScale>
            )}
            {portfolioData.stats.yearsExperience && (
            <ScrollRevealScale delay={0.8}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {portfolioData.stats.yearsExperience}+
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            </ScrollRevealScale>
            )}
            {getLocationsForNavigation().length > 0 && (
            <ScrollRevealScale delay={1}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {getLocationsForNavigation().length}
              </div>
              <div className="text-gray-600">Service Areas</div>
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
