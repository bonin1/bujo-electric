import React from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { Button } from "@/components/ui/buttons";
import { MapPin, ExternalLink, Eye } from 'lucide-react';

interface Attraction {
  name: string;
  address: string;
  description: string;
  mapUrl: string;
  iframeSrc: string;
  type: string;
  category: string;
  keywords: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

interface CityData {
  cityName: string;
  citySlug: string;
  state: string;
  description: string;
  highlights: string[];
  attractions: Attraction[];
  totalAttractions: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  location: {
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  featuredImage: string;
  gallery: string[];
}

interface ThingsToDoPageProps {
  cityData: CityData;
  city: string;
}

const ThingsToDoPage: React.FC<ThingsToDoPageProps> = ({ cityData, city }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[55dvh] pt-40 h-[55dvh] sm:min-h-[70vh] lg:h-[55vh] xl:h-[50vh] flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-primary overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none brightness-50">
          <div className="w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-primary">
            <Image
              src={cityData.featuredImage}
              alt={`Things to do in ${cityData.cityName}, ${cityData.state}`}
              fill
              sizes="100vw"
              className="object-cover opacity-60"
              priority
            />
          </div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Things to do in {cityData.cityName}, {cityData.state}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the best attractions, activities, and local gems that make {cityData.cityName} a wonderful place to live and visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact/">
              <Button size="lg" variant="default">
                Plan Your Visit
              </Button>
            </Link>
            <Link href={`/services`}>
              <Button variant="outline" size="lg">
                Services in {cityData.cityName}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* City Overview Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-8">
              About {cityData.cityName}, {cityData.state}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-4xl mx-auto">
              <strong><Link href={`/cities/${city}`} className="text-accent-foreground/70 hover:text-accent-foreground/90">{cityData.cityName}, {cityData.state}</Link></strong>, {cityData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-8">
              Popular Activities
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {cityData.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="cursor-default bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-accent-foreground/20 transition-colors"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section - Alternating Layout */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Top Attractions in {cityData.cityName}
            </h2>
            <p className="text-lg text-text-secondary">
              Discover {cityData.totalAttractions} amazing places to visit
            </p>
          </div>
          
          <div className="space-y-16">
            {cityData.attractions.map((attraction, index) => (
              <div key={index}>
                {/* Attraction Content */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'lg:grid-flow-dense'}`}>
                  {/* Text Content */}
                  <div className={`space-y-4 p-6 bg-secondary rounded-lg ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {attraction.category}
                      </span>
                      <span className="text-sm text-text-muted">
                        {attraction.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-text-dark">
                      {attraction.name}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-sm font-semibold text-text-dark">
                      <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>{attraction.address}</span>
                    </div>
                    
                    <p className="text-text-secondary leading-relaxed">
                      {attraction.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={attraction.mapUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-foreground hover:text-primary/80 underline font-medium primary-foreground"
                      >
                        <MapPin className="w-4 h-4" />
                        View on Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    
                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {attraction.keywords.slice(0, 5).map((keyword, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="bg-accent/10 text-accent px-2 py-1 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Map */}
                  <div className={`${index % 2 === 0 ? '' : 'lg:col-start-1'}`}>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <iframe 
                        src={attraction.iframeSrc}
                        width="100%" 
                        height="450" 
                        style={{border: 0}} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-[450px]"
                        title={`${attraction.name} Map`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {cityData.gallery && cityData.gallery.length > 0 && (
        <section className="py-16 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Explore {cityData.cityName}
              </h2>
              <p className="text-lg text-text-secondary">
                Beautiful moments and places in {cityData.cityName}, {cityData.state}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cityData.gallery.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                  <Image
                    src={image}
                    alt={`${cityData.cityName} attraction ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Planning to Visit {cityData.cityName}?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Let us help you create your dream outdoor space in this wonderful city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact/">
                <Button size="lg" variant="secondary">
                  Get a Free Consultation
                </Button>
              </Link>
              <Link href={`/services/`}>
                <Button variant="outline" size="lg">
                  Services in {cityData.cityName}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThingsToDoPage;
