import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/static/',
          '/404',
          '/500',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
