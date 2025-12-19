import { MetadataRoute } from 'next';
import { seoConfigs, siteConfig } from '@/lib/seo-config';
import blogData from '@/data/blog-posts.json';
import servicesData from '@/data/services.json';
import { getCityUrls } from '@/lib/city-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const routes = Object.entries(seoConfigs).map(([path]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.8,
  }));

  // Add blog post routes with new structure
  const blogPostRoutes = blogData.blogPosts.map((post) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Add service routes
  const serviceRoutes = servicesData.services.map((service) => ({
    url: `${baseUrl}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: service.isCore ? 0.9 : 0.7,
  }));

  // Add city routes using centralized city utilities
  const cityRoutes = getCityUrls(baseUrl);



  return [...routes, ...blogPostRoutes, ...serviceRoutes, ...cityRoutes];
}
