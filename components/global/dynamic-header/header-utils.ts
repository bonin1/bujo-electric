interface CTAButton {
  text: string;
  link: string;
  style: 'primary' | 'secondary' | 'outline';
  visible?: boolean;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeaderData {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badges?: string[];
  cta?: {
    primary?: CTAButton;
    secondary?: CTAButton;
  };
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Generate dynamic header data for service pages
 */
export const generateServiceHeader = (service: {
  name: string;
  slug: string;
  description: string;
  category?: string;
}): HeaderData => {
  return {
    id: service.slug,
    url: `/services/${service.slug}`,
    title: `${service.name} Services`,
    subtitle: `Professional ${service.name.toLowerCase()} solutions for your garage`,
    description: service.description,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: "Contact Us",
        link: "/contact",
        style: "primary"
      },
      secondary: {
        text: "Learn More",
        link: `/services/${service.slug}`,
        style: "outline"
      }
    },
    badges: [
      "Professional Service",
      "Quality Guaranteed",
      "Free Consultation"
    ],
    breadcrumbs: [
      {
        label: "Services",
        href: "/services/"
      },
      {
        label: service.name,
        href: `/services/${service.slug}`
      }
    ]
  };
};

/**
 * Generate dynamic header data for city pages
 */
export const generateCityHeader = (city: {
  name: string;
  state: string;
  slug: string;
  description: string;
}): HeaderData => {
  return {
    id: city.slug,
    url: `/service-areas/${city.slug}`,
    title: `Professional Garage Door Services in ${city.name}, ${city.state}`,
    subtitle: `Quality garage door services for ${city.name} residents`,
    description: city.description,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: `Get ${city.name} Quote`,
        link: "/contact",
        style: "primary"
      },
      secondary: {
        text: "View Local Work",
        link: "/portfolio",
        style: "outline"
      }
    },
    badges: [
      "Local Service",
      "Expert Solutions",
      "Free Consultation"
    ],
    breadcrumbs: [
      {
        label: "Service Areas",
        href: "/service-areas/"
      },
      {
        label: `${city.name}, ${city.state}`,
        href: `/service-areas/${city.slug}`
      }
    ]
  };
};

/**
 * Generate dynamic header data for blog posts
 */
export const generateBlogHeader = (post: {
  title: string;
  slug: string;
  excerpt: string;
  category?: {
    name: string;
    slug: string;
  };
}): HeaderData => {
  return {
    id: post.slug,
    url: `/blog/${post.slug}`,
    title: post.title,
    subtitle: post.excerpt,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: "Read Full Article",
        link: `#content`,
        style: "primary"
      },
      secondary: {
        text: "Get Garage Door Help",
        link: "/contact",
        style: "outline"
      }
    },
    badges: [
      "Expert Tips",
      "Professional Advice",
      "Free Resource"
    ],
    breadcrumbs: [
      {
        label: "Blog",
        href: "/blog"
      },
      ...(post.category ? [{
        label: post.category.name,
        href: `/blog/${post.category.slug}`
      }] : []),
      {
        label: post.title,
        href: `/blog/${post.slug}`
      }
    ]
  };
};

/**
 * Generate dynamic header data for about sub-pages
 */
export const generateAboutSubPageHeader = (page: {
  title: string;
  slug: string;
  description: string;
}): HeaderData => {
  return {
    id: page.slug,
    url: `/about/${page.slug}`,
    title: page.title,
    subtitle: `Learn more about ${page.title.toLowerCase()}`,
    description: page.description,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: "Contact Us",
        link: "/contact",
        style: "primary"
      }
    },
    badges: [
      "About Us",
      "Company Info",
      "Learn More"
    ],
    breadcrumbs: [
      {
        label: "About Us",
        href: "/about/"
      },
      {
        label: page.title,
        href: `/about/${page.slug}`
      }
    ]
  };
};

/**
 * Generate minimal header data for simple pages
 */
export const generateMinimalHeader = (page: {
  title: string;
  url: string;
  description?: string;
}): HeaderData => {
  return {
    id: page.url.replace(/\//g, '-'),
    url: page.url,
    title: page.title,
    description: page.description,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: "Get Started",
        link: "/contact",
        style: "primary"
      }
    }
  };
};
