# 🚀 Centralized SEO System Documentation

This project implements a comprehensive, centralized SEO system that automatically handles metadata, Open Graph tags, Twitter Cards, structured data, and more across all routes.

## 📁 File Structure

```
lib/
├── seo-config.ts          # Centralized SEO configuration
├── breadcrumb-utils.ts    # Breadcrumb generation utilities
components/seo/
├── SEOHead.tsx            # Dynamic SEO component (client-side)
app/
├── layout.tsx             # Root layout
├── sitemap.ts             # Dynamic sitemap generator
├── globals.css            # Tailwind CSS imports
public/
├── manifest.json          # PWA manifest
├── browserconfig.xml      # Windows tile configuration
├── robots.txt             # Search engine directives
tailwind.config.ts         # Tailwind CSS configuration
```

## 🌐 URL Structure Rules

• Core services: `/service-one/`, `/service-two/`, `/service-three/`, `/service-four/`  
• Supporting pages: nested under their silo, e.g. `/service-one/supporting-topic/`  
• Locations: `/example-city/`  
• Blog: `/blog/`

### Next.js Configuration

The project is configured with `trailingSlash: true` in `next.config.ts` to ensure all URLs maintain trailing slashes for consistency and SEO benefits.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  trailingSlash: true,
  // ... other config
};
```

### Automatic Redirects

The system automatically redirects URLs without trailing slashes to their proper format:
- `/service-one` → `/service-one/` (301 redirect)
- `/about` → `/about/` (301 redirect)
- `/contact` → `/contact/` (301 redirect)

## 🎯 Key Features

### ✅ Core SEO Tags
- **Title**: Automatically generated per route (60-70 characters)
- **Meta Description**: Route-specific descriptions (150-160 characters)
- **Keywords**: Targeted keywords per page
- **Canonical URLs**: Prevents duplicate content issues
- **Language & Geo-targeting**: Local SEO optimization

### ✅ Open Graph (OG) Tags
- `og:title` - Page title for social sharing
- `og:description` - Page description for social sharing
- `og:type` - Content type (website/article)
- `og:url` - Canonical URL
- `og:image` - Social sharing image (1200x630px)
- `og:site_name` - Brand name
- `og:locale` - Language/locale setting

### ✅ Twitter Card Tags
- `twitter:card` - Card type (summary/summary_large_image)
- `twitter:title` - Twitter-specific title
- `twitter:description` - Twitter-specific description
- `twitter:image` - Twitter image
- `twitter:site` - Twitter handle
- `twitter:creator` - Content creator

### ✅ Structured Data (Schema.org)
- **Organization Schema**: Company information
- **Local Business Schema**: Location and services
- **WebSite Schema**: Site search functionality
- **Breadcrumb Schema**: Navigation hierarchy

### ✅ Security & Performance
- **Content Security Policy**: XSS protection
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer Policy**: Privacy control
- **Cache Control**: Performance optimization

### ✅ Mobile & PWA
- **Theme Color**: Mobile browser theming
- **Viewport**: Responsive design support
- **App Icons**: iOS, Android, Windows tiles
- **Manifest**: Progressive Web App support
- **Apple Touch Icons**: iOS home screen

## 🎨 Tailwind CSS Setup

### Configuration

The project uses Tailwind CSS v4 with a custom configuration:

```typescript
// tailwind.config.ts
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* custom color palette */ }
      },
      // ... other customizations
    },
  },
};
```

### CSS Imports

```css
/* app/globals.css */
@import "tailwindcss";

@layer base {
  html { font-family: system-ui, sans-serif; }
  body { @apply bg-white text-gray-900; }
}

@layer components {
  .btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors; }
  .container-custom { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
}
```

### Custom Components

Pre-built utility classes for common patterns:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling  
- `.container-custom` - Responsive container with proper padding

## 🚀 Quick Start

### 1. Basic Usage

Add the SEO component to any page:

```tsx
import SEOHead from "@/components/seo/SEOHead";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead />
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Page Title
        </h1>
        {/* Your page content */}
      </div>
    </div>
  );
}
```

### 2. Custom SEO Override

Override default SEO settings for specific pages:

```tsx
<SEOHead
  customTitle="Custom Page Title"
  customDescription="Custom page description for this specific page"
  customKeywords={["custom", "keywords"]}
  customOgImage="/custom-og-image.jpg"
  noIndex={false}
  noFollow={false}
/>
```

### 3. Route-Based Configuration

Add new routes to `lib/seo-config.ts`:

```typescript
export const seoConfigs: Record<string, SEOConfig> = {
  "/new-service/": {
    title: "New Service - Example Company",
    description: "Description of the new service...",
    keywords: ["new service", "example company"],
    canonical: `${siteConfig.url}/new-service/`,
    ogImage: `${siteConfig.url}/og-new-service.jpg`,
    ogType: "website",
    twitterCard: "summary_large_image",
    language: "en-US",
    geoRegion: "US-CA",
    geoPosition: "34.0522;-118.2437",
    geoPlacename: "Example City, CA"
  },
  // ... other routes
};
```

## ⚙️ Configuration

### Site Configuration

Update `lib/seo-config.ts` with your business information:

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Company Name",
  url: "https://yourdomain.com",
  description: "Your company description",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  themeColor: "#your-brand-color",
  author: "Your Company Name",
  copyright: "© 2024 Your Company. All rights reserved.",
  social: {
    facebook: "https://facebook.com/yourcompany",
    twitter: "https://twitter.com/yourcompany",
    // ... other social links
  },
  contact: {
    phone: "+1-555-000-0000",
    email: "info@yourcompany.com",
    address: "123 Main Street",
    city: "Your City",
    state: "ST",
    zipCode: "12345",
    country: "USA"
  },
  businessHours: "Monday - Friday: 9:00 AM - 6:00 PM",
  services: ["Service One", "Service Two", "Service Three"]
};
```

### Meta Description Rules

- **Length**: 150-160 characters
- **Content**: Include primary keyword + location + CTA
- **Format**: Start with action phrase, end with call-to-action

**Examples:**
```
✅ "Dominate local results with professional SEO services. Proven strategies to grow traffic & leads in Example City. Schedule your free consultation today."

✅ "Need more customers? Our digital marketing solutions deliver real results fast. Serving Example City and surrounding areas. Contact us now to get started."
```

### Title Tag Rules

- **Length**: 60-70 characters
- **Format**: "Primary Service - Company Name in Location"
- **Keywords**: Include main service and location

**Examples:**
```
✅ "SEO Services - Example Company in Example City"
✅ "Digital Marketing - Professional Solutions in Example City"
```

## 🔗 Internal Linking

### Automatic Internal Links

The system automatically generates internal linking suggestions:

```typescript
import { getSiblingPages, getParentPageUrl } from '@/lib/breadcrumb-utils';

// Get sibling pages for internal linking
const siblingPages = getSiblingPages('/service-one/', Object.keys(seoConfigs));

// Get parent page for breadcrumb navigation
const parentPage = getParentPageUrl('/service-one/supporting-topic/');
```

### Breadcrumb Navigation

Generate breadcrumbs automatically:

```typescript
import { getBreadcrumbProps } from '@/lib/breadcrumb-utils';

const { breadcrumbs, schema, currentPage } = getBreadcrumbProps('/service-one/supporting-topic/');
```

## 📱 PWA & Mobile Optimization

### Manifest Configuration

Update `public/manifest.json` with your app details:

```json
{
  "name": "Your Company - Professional Services",
  "short_name": "Your Company",
  "description": "Your company description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#your-brand-color"
}
```

### Icon Requirements

Ensure you have these icon files in your `public/` directory:

- `favicon.ico` (16x16, 32x32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `mstile-150x150.png`

## 🔍 Search Engine Optimization

### Robots.txt

The `robots.txt` file is automatically configured to:

- Allow crawling of important pages
- Disallow admin and private areas
- Point to your sitemap
- Set appropriate crawl delays

### Sitemap Generation

The system automatically generates a `sitemap.xml` file that includes:

- All configured routes
- Proper priorities (home = 1.0, others = 0.8)
- Change frequencies
- Last modified dates

### Structured Data

Automatic generation of:

- **Organization Schema**: Company details, contact info, social links
- **Local Business Schema**: Location, services, business hours
- **WebSite Schema**: Search functionality
- **Breadcrumb Schema**: Navigation hierarchy

## 🚨 Security Features

### Content Security Policy

```typescript
"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
```

### Security Headers

- **X-Content-Type-Options**: `nosniff`
- **X-Frame-Options**: `SAMEORIGIN`
- **X-XSS-Protection**: `1; mode=block`
- **Permissions-Policy**: Restricts camera, microphone, geolocation

## 📊 Analytics & Tracking

### Google Search Console

Add your verification code to `app/layout.tsx`:

```typescript
verification: {
  google: "your-google-verification-code",
  // ... other search engines
}
```

### Meta Tags for Analytics

The system automatically includes:

- **Generator**: "Next.js"
- **Distribution**: "global"
- **Rating**: "general"
- **Revisit-after**: "7 days"

## 🎨 Customization

### Adding New Routes

1. Add route configuration to `seoConfigs` (with trailing slash)
2. Create the page component
3. Include `<SEOHead />` component
4. Add to sitemap (automatic)

### Custom Meta Tags

Extend the `SEOConfig` interface:

```typescript
export interface SEOConfig {
  // ... existing properties
  customMeta?: Record<string, string>;
  customLinks?: Array<{ rel: string; href: string }>;
}
```

### Custom Structured Data

Add new schema types to the configuration:

```typescript
export function getCustomSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "YourCustomType",
    // ... your schema properties
  };
}
```

## 🧪 Testing

### Meta Tag Validation

Use these tools to validate your SEO implementation:

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Google PageSpeed Insights**: https://pagespeed.web.dev/

### Local Development

1. Run `npm run dev`
2. Navigate to different routes
3. View page source to verify meta tags
4. Check browser developer tools for structured data

## 📈 Performance Tips

### Image Optimization

- Use WebP format for OG images
- Optimize images to 1200x630px for social sharing
- Implement lazy loading for non-critical images

### Font Optimization

- Preload critical fonts
- Use `font-display: swap` for better performance
- Limit font variants to essential weights

### Caching Strategy

- Set appropriate cache headers for static assets
- Use CDN for global content delivery
- Implement service worker for offline functionality

## 🆘 Troubleshooting

### Common Issues

1. **Meta tags not updating**: Ensure `SEOHead` component is included
2. **Structured data errors**: Check JSON-LD syntax in browser console
3. **Social sharing not working**: Verify OG image URLs are absolute
4. **Sitemap not generating**: Check `app/sitemap.ts` configuration
5. **Tailwind not working**: Ensure `@import "tailwindcss"` is in `globals.css`

### Debug Mode

Enable debug logging by setting environment variable:

```bash
NEXT_PUBLIC_SEO_DEBUG=true
```

## 📚 Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data)

---

**Need help?** Check the code comments or create an issue in the repository.
