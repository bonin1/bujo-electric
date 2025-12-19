# Schema Configuration Guide

This guide explains the updated schema markup configurations for your Next.js application.

## Overview

The schema configurations have been updated to follow specific rules for different page types. All schema functions are located in `lib/seo-config.ts` and exported through `lib/seo-metadata.ts`.

---

## Schema Types by Page

### 1. **Blog Posts** 
✅ **Article Schema** (always included)  
✅ **Organization Schema** (for publisher info)  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
import { generateDynamicStructuredData } from '@/lib/seo-metadata'

const schemas = generateDynamicStructuredData('/blog/garage-door-installation-guide/', {
  blogPostData: {
    title: "Complete Garage Door Installation Guide",
    slug: "garage-door-installation-guide",
    excerpt: "Learn the step-by-step process...",
    content: "Full article content...",
    author: { name: "John Doe", title: "Expert", avatar: "/avatar.jpg" },
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-02",
    featuredImage: "/blog-image.jpg",
    category: "Installation",
    tags: ["garage door", "installation"],
    readTime: "5 min read",
    seo: { metaTitle: "...", metaDescription: "...", keywords: "..." }
  },
  breadcrumbs: [
    { name: "Home", url: "https://example.com/" },
    { name: "Blog", url: "https://example.com/blog/" }
  ]
})
```

---

### 2. **City Pages**
⚠️ **IMPORTANT:** LocalBusiness schema **ONLY** applies to the actual city where your business is located!

#### For Business Location City:
✅ **LocalBusiness Schema** (requires `isBusinessLocation: true`)  
✅ **Website Schema**  
✅ **BreadcrumbList Schema**

#### For Service Area Cities:
✅ **Place Schema** (NOT LocalBusiness)  
✅ **Website Schema**  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
// Business location city
const businessCitySchemas = generateDynamicStructuredData('/austin-tx/', {
  cityData: {
    name: "Austin",
    state: "TX",
    description: "Professional services in Austin, TX",
    latitude: "30.2672",
    longitude: "-97.7431",
    servicesOffered: ["Garage Door Installation", "Repair", "Maintenance"],
    isBusinessLocation: true // ⭐ This is the key flag!
  },
  breadcrumbs: [...]
})

// Service area city (not business location)
const serviceAreaSchemas = generateDynamicStructuredData('/dallas-tx/', {
  cityData: {
    name: "Dallas",
    state: "TX",
    description: "We serve Dallas, TX with professional services",
    latitude: "32.7767",
    longitude: "-96.7970",
    isBusinessLocation: false // Will use Place schema instead
  },
  breadcrumbs: [...]
})
```

---

### 3. **Things to Do Pages**
❌ **NO TouristDestination Schema**  
✅ **City Schema** (with Place type)  
✅ **ItemList Schema** (with Place items, not TouristAttraction)  
✅ **Website Schema**  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
const thingsToDoSchemas = generateDynamicStructuredData('/things-to-do-in-austin/', {
  thingsToDoData: {
    cityName: "Austin",
    state: "TX",
    description: "Discover amazing things to do in Austin",
    url: "https://example.com/things-to-do-in-austin/",
    latitude: 30.2672,
    longitude: -97.7431,
    attractions: [
      {
        name: "State Capitol",
        address: "1100 Congress Ave",
        description: "Historic government building",
        type: "Museum",
        category: "History",
        mapUrl: "https://maps.google.com/..."
      }
    ],
    totalAttractions: 15
  },
  breadcrumbs: [...]
})
```

---

### 4. **Service Pages**
✅ **Service Schema**  
✅ **Website Schema**  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
const serviceSchemas = generateDynamicStructuredData('/garage-door-installation/', {
  serviceData: {
    name: "Garage Door Installation",
    description: "Professional garage door installation services",
    url: "https://example.com/garage-door-installation/",
    category: "Installation",
    serviceType: "Home Service",
    areaServed: ["Austin", "Dallas", "Houston"],
    price: "500"
  },
  breadcrumbs: [...]
})
```

---

### 5. **Homepage**
✅ **Website Schema**  
✅ **LocalBusiness Schema**  
✅ **HomeAndConstructionBusiness Schema**  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
const homepageSchemas = generateDynamicStructuredData('/', {
  isHomepage: true,
  breadcrumbs: [
    { name: "Home", url: "https://example.com/" }
  ]
})
```

---

### 6. **FAQ Pages**
✅ **FAQPage Schema**  
✅ **Website Schema**  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
const faqSchemas = generateDynamicStructuredData('/faqs/', {
  faqData: {
    questions: [
      {
        question: "How much does garage door installation cost?",
        answer: "Professional garage door installation typically costs between $500-$1500 depending on the door type and complexity."
      },
      {
        question: "How long does installation take?",
        answer: "Most installations can be completed in 4-6 hours."
      }
    ]
  },
  breadcrumbs: [...]
})
```

---

### 7. **Other Pages**
✅ **Website Schema** (NOT Organization)  
✅ **BreadcrumbList Schema**

**Usage Example:**
```tsx
const otherPageSchemas = generateDynamicStructuredData('/about/', {
  breadcrumbs: [
    { name: "Home", url: "https://example.com/" },
    { name: "About", url: "https://example.com/about/" }
  ]
})
```

---

## Quick Reference Table

| Page Type | Schema Types | Special Notes |
|-----------|-------------|---------------|
| **Blog Posts** | Article, Organization, Breadcrumb | Simple Article schema only |
| **City Pages (Business)** | LocalBusiness, Website, Breadcrumb | `isBusinessLocation: true` required |
| **City Pages (Service Area)** | Place, Website, Breadcrumb | `isBusinessLocation: false` or omit |
| **Things to Do** | City, ItemList (Places), Website, Breadcrumb | NO TouristDestination |
| **Service Pages** | Service, Website, Breadcrumb | - |
| **Homepage** | Website, LocalBusiness, HomeAndConstruction, Breadcrumb | `isHomepage: true` required |
| **FAQ Pages** | FAQPage, Website, Breadcrumb | Provide questions array |
| **Other Pages** | Website, Breadcrumb | Default for unlisted pages |

---

## Important Functions

### Available in `lib/seo-config.ts`:

1. `getOrganizationSchema()` - Organization/company info
2. `getLocalBusinessSchema()` - LocalBusiness for main location
3. `getWebsiteSchema()` - Website info with search action
4. `getServiceSchema(pathname)` - Service-specific schema
5. `getArticleSchema(postData)` - Article/blog post schema
6. `getHowToSchema(postData)` - HowTo instructional schema
7. `getCityLocalBusinessSchema(cityData)` - LocalBusiness for city (requires `isBusinessLocation: true`)
8. `getCityPlaceSchema(cityData)` - Place schema for service areas
9. `getThingsToDoSchema(thingsToDoData)` - City/Place schema for attractions
10. `getServicePageSchema(serviceData)` - Flexible service schema
11. `getFAQSchema(faqData)` - FAQ page schema
12. `getHomeAndConstructionSchema()` - HomeAndConstructionBusiness schema
13. `generateBreadcrumbSchema(breadcrumbs)` - Breadcrumb navigation

### Available in `lib/seo-metadata.ts`:

1. `generateMetadataFromConfig(pathname)` - Generate Next.js Metadata from SEO config
2. `generateStructuredData(pathname?, additionalData?)` - Simple schema generation for standard pages
3. `generateDynamicStructuredData(pathname, pageData?)` - Advanced schema generation with custom data
4. `generateCustomMetadata(pathname, overrides)` - Metadata with custom overrides
5. `generateDynamicMetadata(pathname, dynamicData)` - Metadata for dynamic routes

---

## Implementation Example

### In a Page Component:

```tsx
// app/services/page.tsx
import { Metadata } from 'next'
import { generateMetadataFromConfig } from '@/lib/seo-metadata'
import { siteConfig } from '@/lib/seo-config'

export const metadata: Metadata = generateMetadataFromConfig('/services/')

export default function ServicesPage() {
  // Generate structured data
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteConfig.name,
      // ... other fields
    }
  ]

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

      {/* Page content */}
      <div>...</div>
    </>
  )
}
```

---

## Testing Your Schema

Use these tools to validate your schema markup:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Check "Enhancements" section

---

## Notes

- All schema is rendered as JSON-LD in `<script type="application/ld+json">` tags
- Schema is placed at the component level (not in `<head>`)
- Breadcrumbs should always be included when available
- Use `isBusinessLocation: true` ONLY for your actual business city
- Blog posts use simple Article schema (no HowTo schema)
- FAQ schema requires structured question/answer data
- HowTo schema is available in `seo-config.ts` if you need it for manual implementation

---

## Migration Checklist

- [ ] Update homepage to use `isHomepage: true`
- [ ] Set `isBusinessLocation: true` ONLY for your business city
- [ ] Remove `isBusinessLocation` or set to `false` for service area cities
- [ ] Add FAQ schema to FAQ pages with structured data
- [ ] All blog posts use simple Article schema (no special handling needed)
- [ ] Replace Organization schema with Website schema on non-business pages
- [ ] Update Things to Do pages to remove TouristDestination schema

---

**Last Updated:** October 2025

