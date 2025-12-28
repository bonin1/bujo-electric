import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateDynamicMetadata, generateDynamicStructuredData } from '@/lib/seo-metadata';
import { siteConfig } from '@/lib/seo-config';

interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper function for parsing things-to-do routes
const parseThingsToDoSlug = (slug: string): { city: string } | null => {
  const match = slug.match(/^things-to-do-in-(.+)$/);
  if (!match) return null;
  const [, cityStatePart] = match;
  return { city: cityStatePart };
};

export async function generateStaticParams() {
    // Lazy load data only for static param generation
    const blogData = await import('@/data/blog-posts.json');
    const citiesData = await import('@/data/cities.json');
    const thingsToDoData = await import('@/data/things-to-do.json');
    const servicesData = await import('@/data/services.json');

    // Add blog category routes
    const blogCategoryParams = blogData.categories.map((category) => ({
        slug: category.slug,
    }));

    // Blog post routes are now handled by [slug]/[blog-slug] nested route

    // Add old blog post routes for redirects
    const oldBlogParams = blogData.blogPosts.map((post) => ({
        slug: post.slug,
    }));

    const cityParams = citiesData.cities.map((city) => ({
        slug: city.slug,
    }));

    // Add things-to-do routes
    const thingsToDoParams = Object.keys(thingsToDoData.thingsToDo).map(cityKey => {
      return {
        slug: `things-to-do-in-${cityKey}`,
      };
    });

    // Add service routes (all services: core + subservices)
    const serviceParams = servicesData.services.map((service) => ({
        slug: service.slug,
    }));

    return [...blogCategoryParams, ...oldBlogParams, ...cityParams, ...thingsToDoParams, ...serviceParams];
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
    const { slug } = await params;

    // Lazy load only the data needed for this route
    // Check for service routes first
    const servicesData = await import('@/data/services.json');
    const service = servicesData.services.find((s) => s.slug === slug);
    if (service) {
        const keywords = service.seo.keywords?.split(',').map(k => k.trim()) || service.features;
        return generateDynamicMetadata(`/${slug}/`, {
            title: service.seo.metaTitle,
            description: service.seo.metaDescription,
            content: service.description,
            keywords: keywords,
        });
    }

    // Check for things-to-do routes
    const thingsToDoMatch = parseThingsToDoSlug(slug);
    if (thingsToDoMatch) {
      const { city } = thingsToDoMatch;
      const thingsToDoData = await import('@/data/things-to-do.json');
      const cityData = thingsToDoData.thingsToDo[city as keyof typeof thingsToDoData.thingsToDo];
      
      if (cityData) {
        const keywords = cityData.seo.keywords?.split(',').map(k => k.trim()) || cityData.highlights;
        return generateDynamicMetadata(`/${slug}/`, {
          title: cityData.seo.metaTitle,
          description: cityData.seo.metaDescription,
          content: cityData.description,
          author: 'DBL Example',
          tags: cityData.highlights,
          keywords: keywords,
        });
      }
    }

    // Check for blog post routes directly at /{slug}/
    const blogData = await import('@/data/blog-posts.json');
    const blogPost = blogData.blogPosts.find((post) => post.slug === slug);
    if (blogPost) {
        // Ensure keywords is always a string array
        const keywords = Array.isArray(blogPost.keywords) 
            ? blogPost.keywords.map(k => typeof k === 'string' ? k : String(k))
            : [blogPost.category.name.toLowerCase(), 'blog', 'tips', 'guide'];
        
        return generateDynamicMetadata(`/${slug}/`, {
            title: blogPost.seo.metaTitle,
            description: blogPost.seo.metaDescription,
            content: blogPost.excerpt,
            keywords: keywords,
        });
    }

    const citiesData = await import('@/data/cities.json');
    const city = citiesData.cities.find((c) => c.slug === slug);
    if (city) {
        const keywords = city.seo.keywords?.split(',').map(k => k.trim()) || [city.name, 'services', 'professional services', 'local business'];
        return generateDynamicMetadata(`/${slug}/`, {
            title: city.seo.metaTitle,
            description: city.seo.metaDescription,
            content: city.description,
            keywords: keywords,
        });
    }

    return {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
    };
}

// Note: BlogCategoryIndex removed - blog posts are now directly at /{slug}/ not /{category}/{slug}/
// const BlogCategoryIndex = React.lazy(() => import('../../components/blog/BlogCategoryIndex'));
const CityPage = React.lazy(() => import('../../templates/cities/city-page'));
const ThingsToDoPage = React.lazy(() => import('../../components/things-to-do/ThingsToDoPage'));
const ServicePage = React.lazy(() => import('../../templates/services/service-page'));

const DynamicPage = async ({ params }: DynamicPageProps) => {
  const { slug } = await params;

  // Lazy load only the data needed for this specific route
  // Check for service routes first
  const servicesData = await import('@/data/services.json');
  const service = servicesData.services.find((s) => s.slug === slug);
  if (service) {
    // Generate FAQs for schema
    const faqs = [
      {
        question: `How long does ${service.name.toLowerCase()} take?`,
        answer: `Typically, our ${service.name.toLowerCase()} service takes ${service.duration}. However, the exact timeline depends on the specific requirements and complexity of your project.`
      },
      {
        question: "What is included in the service?",
        answer: `Our ${service.name.toLowerCase()} includes: ${service.features.slice(0, 3).join(', ')}, and more. We provide comprehensive solutions tailored to your needs.`
      },
      {
        question: "Do you offer warranties?",
        answer: "Yes, we stand behind our work with comprehensive warranties. All our services come with a satisfaction guarantee and quality workmanship warranty."
      },
      {
        question: "How do I get started?",
        answer: "Getting started is easy! Simply contact us for a free consultation. We'll discuss your needs, provide a detailed quote, and schedule your service at your convenience."
      }
    ];

    // Generate structured data for service page
    const structuredData = generateDynamicStructuredData(`/${slug}/`, {
      serviceData: {
        name: service.name,
        description: service.description,
        url: `${siteConfig.url}/${slug}/`,
        category: service.category,
        price: service.priceRange,
        serviceType: service.category,
        areaServed: ['Prishtinë', 'Prizren', 'Pejë', 'Gjakovë', 'Ferizaj', 'Gjilan', 'Mitrovicë'],
      },
      faqData: {
        questions: faqs
      },
      breadcrumbs: [
        { name: 'Ballina', url: siteConfig.url },
        { name: 'Shërbimet', url: `${siteConfig.url}/sherbime-elektrike/` },
        { name: service.name, url: `${siteConfig.url}/${slug}/` },
      ],
    });

    return (
      <>
        {/* Add structured data scripts */}
        {structuredData.map((script) => (
          <script
            key={script.id}
            type={script.type}
            dangerouslySetInnerHTML={{ __html: script.children }}
          />
        ))}
        
        <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service...</p>
          </div>
        </div>}>
          <ServicePage params={{ slug }} />
        </React.Suspense>
      </>
    );
  }

  // Check for things-to-do routes
  const thingsToDoMatch = parseThingsToDoSlug(slug);
  if (thingsToDoMatch) {
    const { city } = thingsToDoMatch;
    const thingsToDoData = await import('@/data/things-to-do.json');
    const cityData = thingsToDoData.thingsToDo[city as keyof typeof thingsToDoData.thingsToDo];
    
    if (cityData) {
      // Generate structured data for things-to-do page with TouristDestination and ItemList schemas
      const structuredData = generateDynamicStructuredData(`/${slug}/`, {
        thingsToDoData: {
          cityName: cityData.cityName,
          state: cityData.state,
          description: cityData.description,
          url: `${siteConfig.url}/${slug}/`,
          latitude: cityData.location?.coordinates?.latitude,
          longitude: cityData.location?.coordinates?.longitude,
          attractions: cityData.attractions.map(attraction => ({
            name: attraction.name,
            address: attraction.address,
            description: attraction.description,
            type: attraction.type,
            category: attraction.category,
            mapUrl: attraction.mapUrl,
          })),
          totalAttractions: cityData.totalAttractions,
        },
        breadcrumbs: [
          { name: 'Ballina', url: siteConfig.url },
          { name: `Gjërat për të bërë në ${cityData.cityName}, ${cityData.state}`, url: `${siteConfig.url}/${slug}/` },
        ],
      });

      return (
        <>
          {/* Add structured data scripts */}
          {structuredData.map((script) => (
            <script
              key={script.id}
              type={script.type}
              dangerouslySetInnerHTML={{ __html: script.children }}
            />
          ))}
          
          <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading things to do...</p>
            </div>
          </div>}>
            <ThingsToDoPage cityData={cityData} city={city} />
          </React.Suspense>
        </>
      );
    }
  }

  // Check for blog post routes directly at /{slug}/
  const blogData = await import('@/data/blog-posts.json');
  const blogPost = blogData.blogPosts.find((post) => post.slug === slug);
  if (blogPost) {
    // Lazy load BlogPost component
    const BlogPost = React.lazy(() => import('@/components/blog/BlogPost'));
    
    // Generate structured data for blog post
    const structuredData = generateDynamicStructuredData(`/${slug}/`, {
      blogPostData: {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        content: blogPost.content,
        author: {
          name: blogPost.author.name,
          title: blogPost.author.bio || 'Content Writer',
          avatar: blogPost.author.avatar,
        },
        publishedAt: blogPost.publishedAt,
        updatedAt: blogPost.updatedAt,
        featuredImage: blogPost.image?.url || '/assets/config/placeholder-image.png',
        category: blogPost.category.name,
        tags: blogPost.tags,
        readTime: blogPost.readTime,
        seo: blogPost.seo,
      },
      breadcrumbs: [
        { name: 'Ballina', url: siteConfig.url },
        { name: 'Blogu', url: `${siteConfig.url}/blog/` },
        { name: blogPost.title, url: `${siteConfig.url}/${slug}/` },
      ],
    });

    return (
      <>
        {/* Add structured data scripts */}
        {structuredData.map((script) => (
          <script
            key={script.id}
            type={script.type}
            dangerouslySetInnerHTML={{ __html: script.children }}
          />
        ))}
        
        <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>}>
          <BlogPost post={blogPost} />
        </React.Suspense>
      </>
    );
  }

  const citiesData = await import('@/data/cities.json');
  const city = citiesData.cities.find((c) => c.slug === slug);
  if (city) {
    // Generate structured data for city page with city-specific LocalBusiness schema
    const structuredData = generateDynamicStructuredData(`/${slug}/`, {
      cityData: {
        name: city.name,
        state: city.state,
        description: city.description,
        latitude: city.coordinates?.latitude?.toString() ?? "",
        longitude: city.coordinates?.longitude?.toString() ?? "",
        servicesOffered: city.services,
      },
      breadcrumbs: [
        { name: 'Ballina', url: siteConfig.url },
        { name: 'Zonat e Shërbimit', url: `${siteConfig.url}/zonat-e-sherbimit/` },
        { name: `${city.name}, ${city.state}`, url: `${siteConfig.url}/${slug}/` },
      ],
    });

    return (
      <>
        {/* Add structured data scripts */}
        {structuredData.map((script) => (
          <script
            key={script.id}
            type={script.type}
            dangerouslySetInnerHTML={{ __html: script.children }}
          />
        ))}
        
        <React.Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading city page...</p>
          </div>
        </div>}>
          <CityPage params={{ slug }} />
        </React.Suspense>
      </>
    );
  }

  notFound();
};

export default DynamicPage;
