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
    url: `/sherbime-elektrike/${service.slug}`,
    title: `${service.name}`,
    subtitle: `Zgjidhje profesionale për ${service.name.toLowerCase()}`,
    description: service.description,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: "Na Kontaktoni",
        link: "/kontakti",
        style: "primary"
      },
      secondary: {
        text: "Mëso Më Shumë",
        link: `/sherbime-elektrike/${service.slug}`,
        style: "outline"
      }
    },
    breadcrumbs: [
      {
        label: "Shërbimet",
        href: "/sherbime-elektrike/"
      },
      {
        label: service.name,
        href: `/sherbime-elektrike/${service.slug}`
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
    url: `/zonat-e-sherbimit/${city.slug}`,
    title: `Shërbime Elektrike Profesionale në ${city.name}, ${city.state}`,
    subtitle: `Shërbime cilësore elektrike për banorët e ${city.name}`,
    description: city.description,
    image: "/assets/config/placeholder-image.png",
    cta: {
      primary: {
        text: `Merr një Ofertë për ${city.name}`,
        link: "/kontakti",
        style: "primary"
      },
      secondary: {
        text: "Shiko Punët Tona",
        link: "/galeria-e-projekteve",
        style: "outline"
      }
    },
    breadcrumbs: [
      {
        label: "Zonat e Shërbimit",
        href: "/zonat-e-sherbimit/"
      },
      {
        label: `${city.name}, ${city.state}`,
        href: `/zonat-e-sherbimit/${city.slug}`
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
    url: `/rreth-nesh/${page.slug}`,
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
    breadcrumbs: [
      {
        label: "About Us",
        href: "/rreth-nesh/"
      },
      {
        label: page.title,
        href: `/rreth-nesh/${page.slug}`
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
