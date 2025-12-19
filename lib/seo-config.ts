import { 
  BUSINESS_CATEGORIES, 
  BUSINESS_INFO, 
  CONTACT, 
  SOCIAL_MEDIA, 
  GOOGLE_MAPS, 
  BUSINESS_HOURS_SCHEMA,
  CORE_SERVICE_NAMES,
  LOCATIONS,
  getCopyright,
  getLocationsString
} from "./business-config";

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
  language?: string;
  geoRegion?: string;
  geoPosition?: string;
  geoPlacename?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  // LinkedIn specific fields
  linkedinTitle?: string;
  linkedinDescription?: string;
  linkedinImage?: string;
  linkedinAuthor?: string;
  // Facebook specific fields
  facebookAppId?: string;
  facebookAdmins?: string[];
  // Additional social media fields
  socialImage?: string; // Alternative social sharing image
  socialTitle?: string; // Alternative social sharing title
  socialDescription?: string; // Alternative social sharing description
  // Schema.org fields
  articleSection?: string;
  articleTag?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  logo: string;
  favicon: string;
  themeColor: string;
  author: string;
  copyright: string;
  social: {
    facebook?: string;
    facebookAppId?: string;
    twitter?: string;
    twitterHandle?: string; // Just the handle without @
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
    tiktok?: string;
    pinterest?: string;
    snapchat?: string;
    telegram?: string;
    nextdoor?: string;
    yelp?: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: string;
  services: string[];
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}

/*
Note from SEB: When doing the seo config make sure to change the url to match our website url this way the og image will reference the correct image on build
Remember on localhost the url will be http://localhost:3000 but in production it will be another one.
*/

// Import from business config for dynamic values
export const siteConfig: SiteConfig = {
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.websiteUrl || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://example.com'),
  description: `Expert ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${CONTACT.city}, ${CONTACT.state}. Quality solutions and customer satisfaction guaranteed. ${BUSINESS_INFO.ctaText}`,
  logo: BUSINESS_INFO.logoUrl || "/assets/config/logo.png",
  favicon: "/assets/config/favicon.ico",
  themeColor: "#3B82F6",
  author: BUSINESS_INFO.name,
  copyright: getCopyright(),
  social: {
    facebook: SOCIAL_MEDIA.facebook,
    twitter: SOCIAL_MEDIA.twitter,
    twitterHandle: SOCIAL_MEDIA.twitter?.split('/').pop(),
    instagram: SOCIAL_MEDIA.instagram,
    linkedin: SOCIAL_MEDIA.linkedin,
    pinterest: SOCIAL_MEDIA.pinterest,
    yelp: SOCIAL_MEDIA.yelp,
    nextdoor: SOCIAL_MEDIA.nextdoor
  },
  contact: {
    phone: CONTACT.phone,
    email: CONTACT.email,
    address: CONTACT.street,
    city: CONTACT.city,
    state: CONTACT.state,
    zipCode: CONTACT.zip,
    country: "USA"
  },
  businessHours: BUSINESS_HOURS_SCHEMA,
  services: CORE_SERVICE_NAMES,
  coordinates: {
    latitude: GOOGLE_MAPS.latitude,
    longitude: GOOGLE_MAPS.longitude
  }
};

export const seoConfigs: Record<string, SEOConfig> = {
  "/": {
    title: `${BUSINESS_INFO.name} - Premium ${BUSINESS_INFO.primaryKeyword} | ${CONTACT.city}, ${CONTACT.state}`,
    description: `Transform your property with premium ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${CONTACT.city}, ${CONTACT.state}. Certified professionals, industry-leading warranties, A+ BBB rating. Get your free quote today!`,
    keywords: [BUSINESS_INFO.primaryKeyword.toLowerCase(), `${CONTACT.city} ${CONTACT.state}`, "certified professionals", "premium services", "quality solutions"],
    canonical: `${siteConfig.url}/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `${BUSINESS_INFO.name} - Premium ${BUSINESS_INFO.primaryKeyword}`,
    linkedinDescription: `Transform your property with certified professionals. Industry-leading warranties, A+ BBB rating, and exceptional service in ${CONTACT.city}.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `${BUSINESS_INFO.name} - Premium Service & Exceptional Value`,
    socialDescription: `Certified professionals delivering superior ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${CONTACT.city}. Get your free quote today!`,
    socialImage: "/assets/config/og.png",
    articleSection: BUSINESS_INFO.primaryKeyword,
    breadcrumbs: [
      { name: "Home", url: siteConfig.url }
    ]
  },

  "/about/": {
    title: `About Us - ${BUSINESS_INFO.name} in ${CONTACT.city}`,
    description: `Learn about ${BUSINESS_INFO.name}, your trusted partner for ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${CONTACT.city}. Established in 2010 with certified professionals and proven results.`,
    keywords: ["about us", BUSINESS_INFO.name, CONTACT.city, BUSINESS_INFO.primaryKeyword.toLowerCase(), "certified professionals"],
    canonical: `${siteConfig.url}/about/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `About ${BUSINESS_INFO.name} - Your Trusted Business Partner`,
    linkedinDescription: `Discover our story, values, and commitment to excellence in ${BUSINESS_INFO.primaryKeyword.toLowerCase()}.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Meet the Team Behind ${BUSINESS_INFO.name}`,
    socialDescription: `Established in 2010 with proven results in ${BUSINESS_INFO.primaryKeyword.toLowerCase()}.`,
    socialImage: "/assets/config/og.png",
    articleSection: "About Company",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "About", url: `${siteConfig.url}/about/` }
    ]
  },

  "/contact/": {
    title: `Contact Us - ${BUSINESS_INFO.name} in ${CONTACT.city}`,
    description: `Get in touch with ${BUSINESS_INFO.name} for ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${CONTACT.city}. Free consultation and expert advice available.`,
    keywords: ["contact us", BUSINESS_INFO.name, CONTACT.city, "free consultation", BUSINESS_INFO.primaryKeyword.toLowerCase()],
    canonical: `${siteConfig.url}/contact/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Contact ${BUSINESS_INFO.name} - Get Expert ${BUSINESS_INFO.primaryKeyword}`,
    linkedinDescription: `Ready to transform your property? Get in touch for a free consultation with our certified professionals.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Get Your Free Consultation Today",
    socialDescription: `Expert ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${CONTACT.city}. Contact us for immediate assistance.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Contact Information",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Contact", url: `${siteConfig.url}/contact/` }
    ]
  },

  "/service-areas/": {
    title: `Service Areas - ${BUSINESS_INFO.name} Serving ${CONTACT.state}`,
    description: `${BUSINESS_INFO.name} proudly serves clients across ${getLocationsString(5)} with comprehensive ${BUSINESS_INFO.primaryKeyword.toLowerCase()}. Expert craftsmanship and local knowledge.`,
    keywords: ["service areas", "locations", BUSINESS_INFO.name, BUSINESS_INFO.primaryKeyword.toLowerCase(), CONTACT.state],
    canonical: `${siteConfig.url}/service-areas/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Service Areas - ${BUSINESS_INFO.name} Locations`,
    linkedinDescription: `Serving multiple locations across ${CONTACT.state} with expert ${BUSINESS_INFO.primaryKeyword.toLowerCase()}. Local knowledge and proven results.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Find ${BUSINESS_INFO.name} Near You`,
    socialDescription: `${BUSINESS_INFO.primaryKeyword} across ${CONTACT.state}. Expert local knowledge.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Service Areas",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Service Areas", url: `${siteConfig.url}/service-areas/` }
    ]
  },

  "/services/": {
    title: `Our Services - ${BUSINESS_INFO.primaryKeyword}`,
    description: `Comprehensive ${BUSINESS_INFO.primaryKeyword.toLowerCase()} including ${CORE_SERVICE_NAMES.slice(0, 3).join(', ')}. Expert service for residential and commercial properties. ${BUSINESS_INFO.ctaText}`,
    keywords: [BUSINESS_INFO.primaryKeyword.toLowerCase(), ...CORE_SERVICE_NAMES.map(s => s.toLowerCase()), CONTACT.city, CONTACT.state],
    canonical: `${siteConfig.url}/services/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Our Services - ${BUSINESS_INFO.primaryKeyword}`,
    linkedinDescription: `Professional ${BUSINESS_INFO.primaryKeyword.toLowerCase()} with expert technicians and quality service.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Professional ${BUSINESS_INFO.primaryKeyword}`,
    socialDescription: `Complete solutions for residential and commercial properties. Get expert service today!`,
    socialImage: "/assets/config/og.png",
    articleSection: "Services",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Services", url: `${siteConfig.url}/services/` }
    ]
  },

  "/blog/": {
    title: `Blog - Expert ${BUSINESS_INFO.primaryKeyword} Tips & Insights`,
    description: `Read our latest articles on ${BUSINESS_INFO.primaryKeyword.toLowerCase()}, maintenance tips, installation guides, industry news, and expert advice. Stay informed with our comprehensive blog. ${BUSINESS_INFO.ctaText}`,
    keywords: [BUSINESS_INFO.primaryKeyword.toLowerCase(), "maintenance tips", "installation guide", "industry news", "expert advice", "how-to guides"],
    canonical: `${siteConfig.url}/blog/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Blog - Expert ${BUSINESS_INFO.primaryKeyword} Tips & Industry Insights`,
    linkedinDescription: `Stay informed with our comprehensive blog featuring ${BUSINESS_INFO.primaryKeyword.toLowerCase()} maintenance tips, installation guides, and expert advice.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Expert Tips & Industry Insights",
    socialDescription: `Read our latest articles on ${BUSINESS_INFO.primaryKeyword.toLowerCase()}, maintenance tips, and expert advice.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Blog",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Blog", url: `${siteConfig.url}/blog/` }
    ]
  },

  "/portfolio/": {
    title: `Our Portfolio - Completed ${BUSINESS_INFO.primaryKeyword} Projects`,
    description: `Explore our completed ${BUSINESS_INFO.primaryKeyword.toLowerCase()} projects across ${getLocationsString(4)}. See the quality and craftsmanship that sets us apart. Professional service with proven results.`,
    keywords: [`${BUSINESS_INFO.primaryKeyword.toLowerCase()} portfolio`, "completed projects", "installation examples", ...LOCATIONS.slice(0, 4).map(l => `${l.city} ${l.state}`)],
    canonical: `${siteConfig.url}/portfolio/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Our Portfolio - ${BUSINESS_INFO.primaryKeyword} Projects Gallery`,
    linkedinDescription: `View our completed ${BUSINESS_INFO.primaryKeyword.toLowerCase()} projects showcasing professional service across ${CONTACT.state}.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Our Portfolio - Completed ${BUSINESS_INFO.primaryKeyword} Projects`,
    socialDescription: `Explore our completed ${BUSINESS_INFO.primaryKeyword.toLowerCase()} projects across ${CONTACT.state}. Professional service with proven results.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Portfolio",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Portfolio", url: `${siteConfig.url}/portfolio/` }
    ]
  },
  "/faq/": {
    title: `Frequently Asked Questions - ${BUSINESS_INFO.primaryKeyword} FAQ`,
    description: `Find answers to common questions about our ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${getLocationsString(4)}. ${CORE_SERVICE_NAMES.slice(0, 3).join(', ')}, and more.`,
    keywords: [`${BUSINESS_INFO.primaryKeyword.toLowerCase()} FAQ`, "frequently asked questions", ...CORE_SERVICE_NAMES.map(s => s.toLowerCase()), ...LOCATIONS.slice(0, 4).map(l => `${l.city} ${l.state}`)],
    canonical: `${siteConfig.url}/faq/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Frequently Asked Questions - ${BUSINESS_INFO.primaryKeyword}`,
    linkedinDescription: `Get answers to common questions about ${BUSINESS_INFO.primaryKeyword.toLowerCase()} across ${CONTACT.state}.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `FAQ - ${BUSINESS_INFO.primaryKeyword} Questions & Answers`,
    socialDescription: `Find answers to frequently asked questions about our ${BUSINESS_INFO.primaryKeyword.toLowerCase()} across ${CONTACT.state}.`,
    socialImage: "/assets/config/og.png",
    articleSection: "FAQ",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "FAQ", url: `${siteConfig.url}/faq/` }
    ]
  },
  "/terms/": {
    title: `Terms & Conditions - ${BUSINESS_INFO.name}`,
    description: `Read our terms and conditions for ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${getLocationsString(4)}. Service agreements, warranties, and customer responsibilities.`,
    keywords: ["terms and conditions", "service agreement", `${BUSINESS_INFO.primaryKeyword.toLowerCase()} terms`, "warranty terms", ...LOCATIONS.slice(0, 4).map(l => `${l.city} ${l.state}`)],
    canonical: `${siteConfig.url}/terms/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Terms & Conditions - ${BUSINESS_INFO.name}`,
    linkedinDescription: `Terms and conditions for our professional ${BUSINESS_INFO.primaryKeyword.toLowerCase()} across ${CONTACT.state}.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Terms & Conditions - ${BUSINESS_INFO.name}`,
    socialDescription: `Service terms and conditions for our ${BUSINESS_INFO.primaryKeyword.toLowerCase()} across ${CONTACT.state}.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Legal",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Terms & Conditions", url: `${siteConfig.url}/terms/` }
    ]
  },
  "/privacy-policy/": {
    title: `Privacy Policy - ${BUSINESS_INFO.name}`,
    description: `Our privacy policy explains how we collect, use, and protect your personal information when you use our ${BUSINESS_INFO.primaryKeyword.toLowerCase()} in ${getLocationsString(4)}.`,
    keywords: ["privacy policy", "data protection", "personal information", "privacy rights", ...LOCATIONS.slice(0, 4).map(l => `${l.city} ${l.state}`)],
    canonical: `${siteConfig.url}/privacy-policy/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: `US-${CONTACT.state}`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Privacy Policy - ${BUSINESS_INFO.name}`,
    linkedinDescription: `Learn how we protect your privacy and personal information when using our ${BUSINESS_INFO.primaryKeyword.toLowerCase()}.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Privacy Policy - Data Protection & Privacy Rights",
    socialDescription: "Our commitment to protecting your privacy and personal information.",
    socialImage: "/assets/config/og.png",
    articleSection: "Legal",
    breadcrumbs: [
      { name: "Home", url: siteConfig.url },
      { name: "Privacy Policy", url: `${siteConfig.url}/privacy-policy/` }
    ]
  }
};

export const defaultSEO: SEOConfig = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["professional services", "business solutions"],
  canonical: siteConfig.url,
  ogImage: `${siteConfig.url}/assets/config/og.png`,
  ogType: "website",
  twitterCard: "summary",
  language: "en-US",
  linkedinTitle: siteConfig.name,
  linkedinDescription: siteConfig.description,
  linkedinImage: `${siteConfig.url}/assets/config/og.png`,
  linkedinAuthor: siteConfig.author,
  facebookAppId: siteConfig.social.facebookAppId,
  socialTitle: siteConfig.name,
  socialDescription: siteConfig.description,
  socialImage: `${siteConfig.url}/assets/config/og.png`,
  articleSection: "General",
  breadcrumbs: [
    { name: "Home", url: siteConfig.url }
  ]
};

export function getSEOConfig(pathname: string): SEOConfig {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return seoConfigs[normalizedPath] || defaultSEO;
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "Customer Support",
      "areaServed": siteConfig.contact.country,
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0522",
      "longitude": "-118.2437"
    },
    "openingHours": siteConfig.businessHours,
    "areaServed": {
      "@type": "City",
      "name": siteConfig.contact.city
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    }
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
  };
}

export function getServiceSchema(pathname: string) {
  const seoConfig = getSEOConfig(pathname);
  
  // Map pathnames to service types
  const serviceMap: { [key: string]: string } = {
      "service1": "Service One",
      "service2": "Service Two",
      "service3": "Service Three",
      "service4": "Service Four"
  };

  const serviceType = serviceMap[pathname];
  if (!serviceType) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceType} Services`,
    "description": seoConfig.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "areaServed": [
        "Sausalito", "Mill Valley", "Tiburon", "Belvedere", "Corte Madera", 
        "Larkspur", "Kentfield", "Ross", "San Anselmo", "San Rafael", 
        "Paradise Cay", "Strawberry", "Marin City", "Greenbrae", 
        "Tamalpais Valley", "Muir Beach", "Golden Gate Heights", 
        "Sea Cliff", "Presidio Heights", "Pacific Heights"
      ],
      "url": seoConfig.canonical
    },
    "serviceType": serviceType,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 37.8591,
        "longitude": -122.4853
      },
      "geoRadius": "50000"
    },
    "offers": {
      "@type": "Offer",
      "description": `Professional ${serviceType.toLowerCase()} services with free consultation`,
      "priceCurrency": "USD"
    }
  };
}

/**
 * Generate LocalBusiness schema for city/location pages
 * ONLY applies to the actual city where the business is located, NOT for service areas
 * For service areas, use getCityPlaceSchema instead
 */
export function getCityLocalBusinessSchema(cityData: {
  name: string;
  state: string;
  description: string;
  latitude?: string;
  longitude?: string;
  servicesOffered?: string[];
  isBusinessLocation?: boolean; // New flag to indicate if this is the actual business location
}) {
  // Only return LocalBusiness schema if this is the actual business location
  if (!cityData.isBusinessLocation) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${siteConfig.name} - ${cityData.name}, ${cityData.state}`,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": cityData.description || `Professional services in ${cityData.name}, ${cityData.state}`,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "USA"
    },
    ...(cityData.latitude && cityData.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    }),
    "openingHours": siteConfig.businessHours,
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "USA"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services in ${cityData.name}`,
      "itemListElement": (cityData.servicesOffered || siteConfig.services).map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "areaServed": {
            "@type": "City",
            "name": cityData.name
          }
        }
      }))
    },
    "priceRange": "$$",
  };
}

/**
 * Generate City/Place schema for service area pages (not business location)
 * Use this for cities that are service areas, not where the business is located
 */
export function getCityPlaceSchema(cityData: {
  name: string;
  state: string;
  description: string;
  latitude?: string;
  longitude?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${cityData.name}, ${cityData.state}`,
    "description": cityData.description || `${siteConfig.name} serves ${cityData.name}, ${cityData.state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.name,
      "addressRegion": cityData.state,
      "addressCountry": "USA"
    },
    ...(cityData.latitude && cityData.longitude && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    }),
    "additionalType": "City"
  };
}

/**
 * Generate City/Place schema for "Things to Do" pages
 * NO TouristDestination schema - use City/Place schema instead
 */
export function getThingsToDoSchema(thingsToDoData: {
  cityName: string;
  state: string;
  description: string;
  url: string;
  latitude?: number;
  longitude?: number;
  attractions: Array<{
    name: string;
    address: string;
    description: string;
    type: string;
    category: string;
    mapUrl?: string;
  }>;
  totalAttractions?: number;
}) {
  return [
    // City/Place schema for the city
    {
      "@context": "https://schema.org",
      "@type": "City",
      "name": `${thingsToDoData.cityName}`,
      "description": thingsToDoData.description,
      "url": thingsToDoData.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": thingsToDoData.cityName,
        "addressRegion": thingsToDoData.state,
        "addressCountry": "USA"
      },
      ...(thingsToDoData.latitude && thingsToDoData.longitude && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": thingsToDoData.latitude,
          "longitude": thingsToDoData.longitude
        }
      }),
      "containedInPlace": {
        "@type": "State",
        "name": thingsToDoData.state
      }
    },
    // ItemList schema with all attractions
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Things to Do in ${thingsToDoData.cityName}, ${thingsToDoData.state}`,
      "description": `Top attractions and activities in ${thingsToDoData.cityName}`,
      "numberOfItems": thingsToDoData.totalAttractions || thingsToDoData.attractions.length,
      "itemListElement": thingsToDoData.attractions.map((attraction, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Place",
          "name": attraction.name,
          "description": attraction.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": attraction.address,
            "addressLocality": thingsToDoData.cityName,
            "addressRegion": thingsToDoData.state,
            "addressCountry": "USA"
          },
          "additionalType": attraction.type,
          ...(attraction.mapUrl && {
            "hasMap": attraction.mapUrl
          })
        }
      }))
    }
  ];
}

/**
 * Generate Service schema for individual service pages
 * More flexible than the existing getServiceSchema
 */
export function getServicePageSchema(serviceData: {
  name: string;
  description: string;
  url: string;
  category?: string;
  price?: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.name,
    "description": serviceData.description,
    "url": serviceData.url,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "areaServed": serviceData.areaServed || [
        {
          "@type": "City",
          "name": siteConfig.contact.city,
          "addressRegion": siteConfig.contact.state
        }
      ],
    },
    "serviceType": serviceData.serviceType || serviceData.category || serviceData.name,
    "category": serviceData.category,
    "areaServed": serviceData.areaServed || [
      {
        "@type": "City",
        "name": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state
      }
    ],
    "offers": {
      "@type": "Offer",
      "description": `Professional ${serviceData.name.toLowerCase()} with free consultation`,
      "priceCurrency": "USD",
      "price": serviceData.price || "0",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": serviceData.price || "0"
      },
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    },
    "image": `${siteConfig.url}${siteConfig.logo}`
  };
}

export function getArticleSchema(postData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: { name: string; title: string; avatar: string };
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: string;
  seo: { metaTitle: string; metaDescription: string; keywords: string };
}) {
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${postData.category.toLowerCase().replace(/\s+/g, '-')}/${postData.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postData.seo.metaTitle || postData.title,
    "description": postData.seo.metaDescription || postData.excerpt,
    "image": postData.featuredImage ? `${baseUrl}${postData.featuredImage}` : undefined,
    "author": {
      "@type": "Person",
      "name": postData.author.name,
      "jobTitle": postData.author.title,
      "image": postData.author.avatar ? `${baseUrl}${postData.author.avatar}` : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": postData.publishedAt,
    "dateModified": postData.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,
    "articleSection": postData.category,
    "keywords": postData.seo.keywords || postData.tags.join(', '),
    "wordCount": postData.content.split(' ').length,
    "timeRequired": postData.readTime,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "name": `${siteConfig.name} Blog`,
      "url": `${baseUrl}/blog`
    }
  };
}

/**
 * Generate HowTo schema for blog posts with "How to" in the title
 * Use this in addition to Article schema for instructional content
 */
export function getHowToSchema(postData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  featuredImage?: string;
  steps?: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${postData.category.toLowerCase().replace(/\s+/g, '-')}/${postData.slug}`;
  
  // Extract steps from content if not provided
  const steps = postData.steps || [];
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": postData.title,
    "description": postData.excerpt,
    "image": postData.featuredImage ? `${baseUrl}${postData.featuredImage}` : undefined,
    "url": articleUrl,
    "datePublished": postData.publishedAt,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": `${baseUrl}${step.image}`
      })
    })),
    "totalTime": "PT30M",
    "supply": [],
    "tool": []
  };
}

/**
 * Generate FAQ schema for FAQ pages
 * Use this for pages with frequently asked questions
 */
export function getFAQSchema(faqData: {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.questions.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function getPortfolioSchema(portfolioData: {
  name: string;
  description: string;
  url: string;
  projects: Array<{
    id: number;
    title: string;
    category: string;
    image: string;
    date?: string;
    location?: string;
    description: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": portfolioData.name,
    "description": portfolioData.description,
    "url": portfolioData.url,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`
    }
  };
}

/**
 * Valid Schema.org business types for local businesses
 * Choose the one that best matches your business type
 */
/**
 * Generate dynamic business schema for homepage
 * @param businessType - The Schema.org business type (defaults to value from business config)
 * @param options - Optional configuration for rating, price range, etc.
 */
export function getBusinessSchema(
  businessType?: string
) {
  // Import business config dynamically to avoid circular dependency
  let defaultBusinessType: string = "LocalBusiness";
  try {
    defaultBusinessType = BUSINESS_CATEGORIES.primary as string;
  } catch (e) {
    // Fall back to LocalBusiness if import fails
    console.warn('Could not load BUSINESS_CATEGORIES from business-config, using LocalBusiness as default');
  }

  return {
    "@context": "https://schema.org",
    "@type": businessType || defaultBusinessType,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}${siteConfig.logo}`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address,
      "addressLocality": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state,
      "postalCode": siteConfig.contact.zipCode,
      "addressCountry": siteConfig.contact.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.coordinates?.latitude,
      "longitude": siteConfig.coordinates?.longitude
    },
    "openingHours": siteConfig.businessHours,
    "areaServed": siteConfig.services.map(() => ({
      "@type": "City",
      "name": siteConfig.contact.city,
      "addressRegion": siteConfig.contact.state
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": siteConfig.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
    },
    "sameAs": Object.values(siteConfig.social).filter(Boolean)
  };
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate schema for the services page
 * Includes Organization, Service Catalog (ItemList), and Breadcrumb schemas
 */
export function getServicesPageSchema(services: Array<{
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  isCore: boolean;
}>) {
  const coreServices = services.filter(service => service.isCore);
  
  return [
    // Organization schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}${siteConfig.logo}`,
      "description": siteConfig.description,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteConfig.contact.phone,
        "contactType": "Customer Support",
        "areaServed": siteConfig.contact.country,
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.contact.address,
        "addressLocality": siteConfig.contact.city,
        "addressRegion": siteConfig.contact.state,
        "postalCode": siteConfig.contact.zipCode,
        "addressCountry": siteConfig.contact.country
      },
      "sameAs": Object.values(siteConfig.social).filter(Boolean)
    },
    // Service catalog schema (ItemList)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${siteConfig.name} Services`,
      "description": `Comprehensive services offered by ${siteConfig.name}`,
      "numberOfItems": coreServices.length,
      "itemListElement": coreServices.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": `${siteConfig.url}/${service.slug}`,
          "provider": {
            "@type": "Organization",
            "name": siteConfig.name,
            "url": siteConfig.url
          },
          "serviceType": service.category,
          "offers": {
            "@type": "Offer",
            "description": service.description,
            "priceCurrency": "USD"
          }
        }
      }))
    },
    // Breadcrumb schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": `${siteConfig.url}/services/`
        }
      ]
    }
  ];
}