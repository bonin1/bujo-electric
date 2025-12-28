/**
 * City Data Utilities - Single Source of Truth
 * All city-related data comes from data/cities.json
 * This file provides convenient helper functions to access city data
 */

import citiesData from '@/data/cities.json';

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  description: string;
  content: string;
  population?: string;
  area?: string;
  timezone?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  services: string[];
  featuredImage: string;
  variationFactors?: {
    environmentalAngle?: string;
    technicalFocus?: string;
    toneArchetype?: string;
    localProof?: string;
  };
  sectionContent?: {
    services?: {
      heading: string;
      subheading: string;
      highlights: string[];
      cta: string;
    };
    process?: {
      heading: string;
      subheading: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    whySetsApart?: {
      heading: string;
      subheading: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    cta?: {
      heading: string;
      subheading: string;
      primaryCTA: string;
      secondaryCTA: string;
    };
  };
}

/**
 * Get all cities
 */
export const getAllCities = (): City[] => {
  return citiesData.cities as City[];
};

/**
 * Get city by slug
 */
export const getCityBySlug = (slug: string): City | undefined => {
  return citiesData.cities.find((city) => city.slug === slug) as City | undefined;
};

/**
 * Get city by name and state
 */
export const getCityByNameAndState = (name: string, state: string): City | undefined => {
  return citiesData.cities.find(
    (city) => 
      city.name.toLowerCase() === name.toLowerCase() && 
      city.state.toLowerCase() === state.toLowerCase()
  ) as City | undefined;
};

/**
 * Get top N cities (default 4)
 */
export const getTopCities = (count: number = 4): City[] => {
  return citiesData.cities.slice(0, count) as City[];
};

/**
 * Format city for display (e.g., "Austin, TX")
 */
export const formatCityDisplay = (city: City): string => {
  return `${city.name}, ${city.state}`;
};

/**
 * Format multiple cities as string (e.g., "Austin, TX, Dallas, TX")
 */
export const formatCitiesString = (cities: City[]): string => {
  return cities.map(formatCityDisplay).join(', ');
};

/**
 * Get cities formatted for navigation/footer
 * Returns array with city display name and href
 */
export const getCitiesForNavigation = (limit?: number): Array<{
  name: string;
  city: string;
  state: string;
  href: string;
}> => {
  const cities = limit ? citiesData.cities.slice(0, limit) : citiesData.cities;
  return cities.map((city) => ({
    name: `${city.name}, ${city.state}/`,
    city: city.name,
    state: city.state,
    href: `/${city.slug}/`,
  }));
};

/**
 * Get all city slugs (useful for generateStaticParams)
 */
export const getAllCitySlugs = (): string[] => {
  return citiesData.cities.map((city) => city.slug);
};

/**
 * Get city URLs for sitemap
 */
export const getCityUrls = (baseUrl: string): Array<{
  url: string;
  lastModified: Date;
  changeFrequency: 'weekly';
  priority: number;
}> => {
  return citiesData.cities.map((city) => ({
    url: `${baseUrl}/${city.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
};

/**
 * Check if a city is served by the business
 */
export const servesCity = (cityName: string, state?: string): boolean => {
  if (state) {
    return citiesData.cities.some(
      (city) =>
        city.name.toLowerCase() === cityName.toLowerCase() &&
        city.state.toLowerCase() === state.toLowerCase()
    );
  }
  return citiesData.cities.some(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
};

/**
 * Get total number of cities
 */
export const getCityCount = (): number => {
  return citiesData.cities.length;
};

/**
 * Get cities by state
 */
export const getCitiesByState = (state: string): City[] => {
  return citiesData.cities.filter(
    (city) => city.state.toLowerCase() === state.toLowerCase()
  ) as City[];
};

/**
 * Get unique states from all cities
 */
export const getUniqueStates = (): string[] => {
  const states = citiesData.cities.map((city) => city.state);
  return Array.from(new Set(states));
};

/**
 * Search cities by name (partial match)
 */
export const searchCities = (query: string): City[] => {
  const lowerQuery = query.toLowerCase();
  return citiesData.cities.filter((city) =>
    city.name.toLowerCase().includes(lowerQuery) ||
    city.state.toLowerCase().includes(lowerQuery)
  ) as City[];
};

/**
 * Get primary/first city (usually the main service area)
 */
export const getPrimaryCity = (): City => {
  return citiesData.cities[0] as City;
};

/**
 * Get city section content with proper typing
 */
type SectionContentType<T extends 'services' | 'process' | 'whySetsApart' | 'cta'> =
  T extends 'services' ? {
    heading: string;
    subheading: string;
    highlights: string[];
    cta: string;
  } | undefined :
  T extends 'process' ? {
    heading: string;
    subheading: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  } | undefined :
  T extends 'whySetsApart' ? {
    heading: string;
    subheading: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  } | undefined :
  T extends 'cta' ? {
    heading: string;
    subheading: string;
    primaryCTA: string;
    secondaryCTA: string;
  } | undefined : undefined;

export const getCitySectionContent = <T extends 'services' | 'process' | 'whySetsApart' | 'cta'>(
  city: City,
  section: T
): SectionContentType<T> => {
  return city.sectionContent?.[section] as SectionContentType<T>;
};

/**
 * Check if city has custom section content
 */
export const hasCitySectionContent = (
  city: City,
  section: 'services' | 'process' | 'whySetsApart' | 'cta'
): boolean => {
  return !!city.sectionContent?.[section];
};

