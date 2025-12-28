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
  url: BUSINESS_INFO.websiteUrl || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bujoelectric.com'),
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
    country: "Kosovë"
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
    title: `${BUSINESS_INFO.name} - Ekspertët e Energjisë dhe Sigurisë Elektrike në Kosovë`,
    description: `Shërbime elektrike profesionale 24/7 në Prishtinë dhe mbarë Kosovën. Instalime, riparime dhe mirëmbajtje elektrike me standarde evropiane.`,
    keywords: ["elektricist", "sherbime elektrike", "prishtine", "kosove", "instalime elektrike", "riparime elektrike", "bujo electric"],
    canonical: `${siteConfig.url}/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `${BUSINESS_INFO.name} - Ekspertët e Energjisë Elektrike`,
    linkedinDescription: `Shërbime elektrike profesionale me standarde evropiane në Prishtinë dhe mbarë Kosovën.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `${BUSINESS_INFO.name} - Shërbime Elektrike Profesionale`,
    socialDescription: `Instalime, riparime dhe mirëmbajtje elektrike 24/7. Na kontaktoni për një konsultim falas!`,
    socialImage: "/assets/config/og.png",
    articleSection: BUSINESS_INFO.primaryKeyword,
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url }
    ]
  },

  "/rreth-nesh/": {
    title: `Rreth Nesh - ${BUSINESS_INFO.name} | Ekspertët Elektrikë në Kosovë`,
    description: `Mësoni më shumë rreth ${BUSINESS_INFO.name}, partneri juaj i besuar për shërbime elektrike në Kosovë. Profesionistë të certifikuar me përvojë të gjatë.`,
    keywords: ["rreth nesh", BUSINESS_INFO.name, CONTACT.city, "elektricist i certifikuar", "pervoja elektrike"],
    canonical: `${siteConfig.url}/rreth-nesh/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Rreth ${BUSINESS_INFO.name} - Historia dhe Misioni ynë`,
    linkedinDescription: `Zbuloni historinë tonë, vlerat dhe përkushtimin tonë ndaj përsosmërisë në shërbimet elektrike.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Njihuni me ekipin e ${BUSINESS_INFO.name}`,
    socialDescription: `Profesionistë të përkushtuar për sigurinë tuaj elektrike që nga fillimi ynë.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Rreth Kompanisë",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Rreth Nesh", url: `${siteConfig.url}/rreth-nesh/` }
    ]
  },

  "/kontakti/": {
    title: `Kontakti - ${BUSINESS_INFO.name} | Na Kontaktoni 24/7`,
    description: `Na kontaktoni në ${BUSINESS_INFO.name} për çdo nevojë elektrike në Prishtinë dhe Kosovë. Konsultim falas dhe shërbim i shpejtë 24/7.`,
    keywords: ["kontakti", BUSINESS_INFO.name, CONTACT.city, "konsultim falas", "elektricist 24/7"],
    canonical: `${siteConfig.url}/kontakti/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Kontaktoni ${BUSINESS_INFO.name} - Ekspertët Elektrikë`,
    linkedinDescription: `Gati për të siguruar rrjetin tuaj elektrik? Na kontaktoni për një konsultim falas me profesionistët tanë.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Merrni Konsultimin Tuaj Falas Sot",
    socialDescription: `Shërbime elektrike profesionale në Kosovë. Na kontaktoni për asistencë të menjëhershme.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Informacioni i Kontaktit",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Kontakti", url: `${siteConfig.url}/kontakti/` }
    ]
  },

  "/zonat-e-sherbimit/": {
    title: `Zonat e Shërbimit - ${BUSINESS_INFO.name} Shërben në mbarë Kosovën`,
    description: `${BUSINESS_INFO.name} shërben me krenari klientët në ${getLocationsString(5)} dhe rrethinë. Ekspertizë lokale dhe shërbim cilësor.`,
    keywords: ["zonat e sherbimit", "lokacionet", BUSINESS_INFO.name, "elektricist kosove", CONTACT.state],
    canonical: `${siteConfig.url}/zonat-e-sherbimit/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Zonat e Shërbimit - Lokacionet e ${BUSINESS_INFO.name}`,
    linkedinDescription: `Duke shërbyer në lokacione të shumta në mbarë Kosovën me shërbime elektrike profesionale.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Gjeni ${BUSINESS_INFO.name} Pranë Jush`,
    socialDescription: `Shërbime elektrike në mbarë Kosovën. Ekspertizë lokale e dëshmuar.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Zonat e Shërbimit",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Zonat e Shërbimit", url: `${siteConfig.url}/zonat-e-sherbimit/` }
    ]
  },

  "/sherbime-elektrike/": {
    title: `Shërbimet Tona - ${BUSINESS_INFO.name} | Zgjidhje Elektrike Komplet`,
    description: `Shërbime elektrike gjithëpërfshirëse duke përfshirë ${CORE_SERVICE_NAMES.slice(0, 3).join(', ')}. Ekspertizë për shtëpi dhe biznese. ${BUSINESS_INFO.ctaText}`,
    keywords: ["sherbime elektrike", ...CORE_SERVICE_NAMES.map(s => s.toLowerCase()), CONTACT.city, CONTACT.state],
    canonical: `${siteConfig.url}/sherbime-elektrike/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Shërbimet Tona - ${BUSINESS_INFO.name}`,
    linkedinDescription: `Shërbime elektrike profesionale me teknikë ekspertë dhe cilësi të lartë.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Shërbime Elektrike Profesionale`,
    socialDescription: `Zgjidhje të plota për shtëpi dhe biznese. Merrni shërbimin e ekspertëve sot!`,
    socialImage: "/assets/config/og.png",
    articleSection: "Shërbimet",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Shërbimet", url: `${siteConfig.url}/sherbime-elektrike/` }
    ]
  },

  "/blog/": {
    title: `Blogu - Këshilla dhe Informacione nga ${BUSINESS_INFO.name}`,
    description: `Lexoni artikujt tanë të fundit mbi sigurinë elektrike, kursimin e energjisë, mirëmbajtjen dhe teknologjinë Smart Home. Qëndroni të informuar me ${BUSINESS_INFO.name}.`,
    keywords: ["blog elektrik", "keshilla sigurie", "kursim energjie", "smart home kosove", "mirembajtje elektrike"],
    canonical: `${siteConfig.url}/blog/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Blogu i ${BUSINESS_INFO.name} - Këshilla Ekspertësh`,
    linkedinDescription: `Qëndroni të informuar me blogun tonë gjithëpërfshirës mbi mirëmbajtjen elektrike dhe kursimin e energjisë.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Këshilla Ekspertësh dhe Informacione mbi Energjinë",
    socialDescription: `Lexoni artikujt tanë të fundit mbi sigurinë elektrike dhe kursimin e energjisë.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Blogu",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Blogu", url: `${siteConfig.url}/blog/` }
    ]
  },

  "/galeria-e-projekteve/": {
    title: `Portofolio - Projektet e Përfunduara nga ${BUSINESS_INFO.name}`,
    description: `Eksploroni projektet tona të përfunduara në mbarë Kosovën. Shihni cilësinë dhe profesionalizmin që na dallon në shërbimet elektrike.`,
    keywords: ["portofolio elektrik", "projekte te perfunduara", "galeri punimesh", ...LOCATIONS.slice(0, 4).map(l => `${l.city} ${l.state}`)],
    canonical: `${siteConfig.url}/galeria-e-projekteve/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Portofolio - Galeria e Projekteve të ${BUSINESS_INFO.name}`,
    linkedinDescription: `Shikoni projektet tona të përfunduara që tregojnë shërbimin tonë profesional në mbarë Kosovën.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Portofolio - Projektet tona Elektrike`,
    socialDescription: `Eksploroni punët tona në mbarë Kosovën. Shërbim profesional me rezultate të dëshmuara.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Portofolio",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Portofolio", url: `${siteConfig.url}/galeria-e-projekteve/` }
    ]
  },
  "/pyetje-te-shpeshta/": {
    title: `Pyetjet e Shpeshta (FAQ) - ${BUSINESS_INFO.name}`,
    description: `Gjeni përgjigje për pyetjet e shpeshta rreth shërbimeve tona elektrike në Kosovë. Informacione mbi instalimet, riparimet dhe më shumë.`,
    keywords: ["faq elektrik", "pyetje te shpeshta", ...CORE_SERVICE_NAMES.map(s => s.toLowerCase())],
    canonical: `${siteConfig.url}/pyetje-te-shpeshta/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Pyetjet e Shpeshta - ${BUSINESS_INFO.name}`,
    linkedinDescription: `Merrni përgjigje për pyetjet e zakonshme rreth shërbimeve elektrike në mbarë Kosovën.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `FAQ - Pyetje dhe Përgjigje mbi Energjinë Elektrike`,
    socialDescription: `Gjeni përgjigje për pyetjet e shpeshta rreth shërbimeve tona në mbarë Kosovën.`,
    socialImage: "/assets/config/og.png",
    articleSection: "FAQ",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "FAQ", url: `${siteConfig.url}/pyetje-te-shpeshta/` }
    ]
  },
  "/kushtet-e-perdorimit/": {
    title: `Kushtet e Përdorimit - ${BUSINESS_INFO.name}`,
    description: `Lexoni kushtet e përdorimit për shërbimet elektrike nga ${BUSINESS_INFO.name}. Marrëveshjet e shërbimit, garancitë dhe përgjegjësitë.`,
    keywords: ["kushtet e perdorimit", "marreveshja e sherbimit", "garancia elektrike"],
    canonical: `${siteConfig.url}/kushtet-e-perdorimit/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Kushtet e Përdorimit - ${BUSINESS_INFO.name}`,
    linkedinDescription: `Kushtet e përdorimit për shërbimet tona profesionale elektrike në mbarë Kosovën.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: `Kushtet e Përdorimit - ${BUSINESS_INFO.name}`,
    socialDescription: `Kushtet e shërbimit për punët tona elektrike në mbarë Kosovën.`,
    socialImage: "/assets/config/og.png",
    articleSection: "Ligjore",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Kushtet e Përdorimit", url: `${siteConfig.url}/kushtet-e-perdorimit/` }
    ]
  },
  "/politika-e-privatesise/": {
    title: `Politika e Privatësisë - ${BUSINESS_INFO.name}`,
    description: `Politika jonë e privatësisë shpjegon se si mbledhim, përdorim dhe mbrojmë informacionin tuaj personal kur përdorni shërbimet tona.`,
    keywords: ["politika e privatësisë", "mbrojtja e te dhenave", "privatesia"],
    canonical: `${siteConfig.url}/politika-e-privatesise/`,
    ogImage: "/assets/config/og.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "sq-AL",
    geoRegion: `AL`,
    geoPosition: `${GOOGLE_MAPS.latitude};${GOOGLE_MAPS.longitude}`,
    geoPlacename: `${CONTACT.city}, ${CONTACT.state}`,
    linkedinTitle: `Politika e Privatësisë - ${BUSINESS_INFO.name}`,
    linkedinDescription: `Mësoni se si e mbrojmë privatësinë tuaj dhe informacionin tuaj personal.`,
    linkedinImage: "/assets/config/og.png",
    linkedinAuthor: BUSINESS_INFO.name,
    facebookAppId: siteConfig.social.facebookAppId,
    socialTitle: "Politika e Privatësisë - Mbrojtja e të Dhënave",
    socialDescription: "Angazhimi ynë për mbrojtjen e privatësisë dhe informacionit tuaj personal.",
    socialImage: "/assets/config/og.png",
    articleSection: "Ligjore",
    breadcrumbs: [
      { name: "Ballina", url: siteConfig.url },
      { name: "Politika e Privatësisë", url: `${siteConfig.url}/politika-e-privatesise/` }
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
    { name: "Ballina", url: siteConfig.url }
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
      "availableLanguage": "Albanian"
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
      "latitude": "42.6629",
      "longitude": "21.1655"
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
        "Prishtinë", "Prizren", "Pejë", "Gjakovë", "Ferizaj", "Gjilan", "Mitrovicë", "Fushë Kosovë", "Obiliq", "Podujevë", "Vushtrri", "Lipjan", "Suharekë"
      ],
      "url": seoConfig.canonical
    },
    "serviceType": serviceType,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.6629,
        "longitude": 21.1655
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
      "addressCountry": "Kosovë"
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
      "addressCountry": "Kosovë"
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
      "addressCountry": "Kosovë"
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
        "addressCountry": "Kosovë"
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
            "addressCountry": "Kosovë"
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
        "url": `${baseUrl}/logo.webp`
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
    "inLanguage": "sq-AL",
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
  } catch {
    // Fall back to LocalBusiness if import fails
    defaultBusinessType = "LocalBusiness";
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
        "availableLanguage": "Albanian"
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
          "name": "Ballina",
          "item": siteConfig.url
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Shërbimet",
          "item": `${siteConfig.url}/sherbime-elektrike/`
        }
      ]
    }
  ];
}