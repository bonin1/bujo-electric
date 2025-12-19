import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import cities from '@/data/cities.json';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

const ServiceAreasThinSection = () => {

  // Only include Texas cities, and map to the expected structure
  const serviceAreas = cities.cities.map(city => ({
      name: city.name,
      state: city.state,
      href: `/${city.slug}/`
    }))

  return (
    <section className="py-12 px-4 bg-bg-secondary">
      <div className="container mx-auto max-w-7xl">
        <ScrollRevealUp>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                Our Service Areas
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Professional installation, repair, and maintenance services across all service areas
            </p>
          </div>
        </ScrollRevealUp>

        
          <div className="flex flex-wrap items-center justify-center gap-4">
            {serviceAreas.map((area, index) => (
              <ScrollRevealScale delay={0.2 * index} key={area.name}>
                <Link
                  href={area.href}
                  className="inline-flex items-center px-4 py-2 bg-card text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  {area.name}, {area.state}
                  </Link>
              </ScrollRevealScale>
            ))}
          </div>
        

        <ScrollRevealScale delay={0.4}>
          <div className="mt-6 text-center">
            <Link
              href="/service-areas/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover font-medium text-sm transition-colors duration-300"
            >
              View All Service Areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollRevealScale>
      </div>
    </section>
  );
};

export default ServiceAreasThinSection;

