import React from "react";
import Image from '@/components/ui/image';
import Link from "next/link";
import { 
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { getBrandIcon } from "@/components/ui/icons/brand-icons";
import { 
  BUSINESS_INFO, 
  CONTACT, 
  ACTIVE_SOCIAL_MEDIA,
  formatPhoneDisplay,
  formatPhoneTel,
  getServicesForNavigation, 
  getCompanyLinks
} from '@/lib/business-config';

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
  contactInfo?: {
    address: string;
    phone: string;
    email: string;
  };
  businessInfo?: {
    name: string;
    description: string;
    contact: {
      address: string;
      phone: string;
      email: string;
    };
  };
}

// Business data from business-config.ts (generated from business.yaml)
const businessName = BUSINESS_INFO.name;
const businessDescription = `Shërbime elektrike profesionale me përvojë 15 vjeçare, duke ofruar zgjidhje cilësore dhe siguri maksimale për klientët tanë.`;
const contactInfoDefault = {
  address: CONTACT.address,
  phone: CONTACT.phone,
  email: CONTACT.email
};

// Build social links from config
const socialIconMap: Record<string, React.ReactElement> = {
  facebook: getBrandIcon('facebook', { className: "w-5 h-5" }),
  instagram: getBrandIcon('instagram', { className: "w-5 h-5" }),
  linkedin: getBrandIcon('linkedin', { className: "w-5 h-5" }),
  twitter: getBrandIcon('twitter', { className: "w-5 h-5" }),
  pinterest: getBrandIcon('pinterest', { className: "w-5 h-5" }),
  yelp: getBrandIcon('yelp', { className: "w-5 h-5" }),
  youtube: getBrandIcon('youtube', { className: "w-5 h-5" }),
};

const defaultSocialLinks = Object.entries(ACTIVE_SOCIAL_MEDIA)
  .map(([key, href]) => ({
    icon: socialIconMap[key] || getBrandIcon('facebook', { className: "w-5 h-5" }),
    href: href as string,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

const defaultSections = [
  {
    title: "Shërbimet",
    links: getServicesForNavigation(),
  },
  {
    title: "Kompania",
    links: getCompanyLinks(),
  },
];

const Footer: React.FC<FooterProps> = ({
  logo = {
    url: "/",
    src: "/assets/config/logo.webp",
    alt: businessName,
    title: businessName,
  },
  sections = defaultSections,
  description,
  socialLinks = defaultSocialLinks,
  copyright,
  contactInfo: footerContactInfo,
  businessInfo,
}) => {
  // Use businessInfo if provided, otherwise fall back to defaults from config
  const businessNameFinal = businessInfo?.name || businessName;
  const businessDescriptionFinal = description || businessInfo?.description || businessDescription;
  const contactInfoFinal = footerContactInfo || businessInfo?.contact || contactInfoDefault;
  const copyrightFinal = copyright || `© ${new Date().getFullYear()} ${businessNameFinal}. All rights reserved.`;
  
  // Update logo alt and title if businessInfo is provided
  const logoFinal = {
    ...logo,
    alt: businessInfo?.name || logo.alt,
    title: businessInfo?.name || logo.title,
  };
  return (
    <section className="pt-20 px-4 bg-gray-900 text-gray-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logoFinal.url}>
                <Image
                  alt={`${businessNameFinal} Logo`}
                  title={businessNameFinal}
                  loading="lazy"
                  width={128}
                  height={128}
                  style={{ height: 'auto', width: 'auto' }}
                  className="h-32 rounded-md"
                  src={logoFinal.src}
                />
              </Link>
              <h2 className="text-xl font-semibold">{businessNameFinal}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-gray-200">
              {businessDescriptionFinal}
            </p>
            <ul className="flex items-center space-x-6 text-gray-200">
              {socialLinks.map((social, index) => (
                <li key={index} className="font-medium hover:text-primary">
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4 text-gray-400">
              <h3 className="font-bold text-gray-200">Na Kontaktoni</h3>
              <Link
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label={`Call ${businessNameFinal}`}
                href={`tel:${formatPhoneTel(contactInfoFinal.phone)}`}
              >
                <Phone className="size-5" />
                <span>{formatPhoneDisplay(contactInfoFinal.phone)}</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label={`Email ${businessNameFinal}`}
                href={`mailto:${contactInfoFinal.email}`}
              >
                <Mail className="size-5" />
                <span>{contactInfoFinal.email}</span>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label={`View location of ${businessNameFinal}`}
                href={`https://maps.google.com/?q=${encodeURIComponent(contactInfoFinal.address)}`}
              >
                <MapPin className="size-5" />
                <span>{contactInfoFinal.address}</span>
              </Link>
            </div>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="font-medium hover:text-primary">
                      <Link href={link.href}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pb-12 border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-background/60 text-center sm:text-left">
              <p>{copyrightFinal}</p>
              <span className="text-background/40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1 text-xs text-background/40">
                <span>Website Design &amp; SEO by</span>
                <Link 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 transition-colors hover:text-primary" 
                  href="https://dblseo.com/"
                >
                  <Image 
                    alt="DBLSEO Logo" 
                    loading="lazy" 
                    width={30} 
                    height={30} 
                    className="object-contain" 
                    src="/assets/config/dblseo-logo.webp"
                  />
                  <span className="font-semibold">DBLSEO.</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-background/60">
              <div className="flex items-center gap-4">
                <Link 
                  className="hover:text-secondary transition-colors" 
                  href="/kushtet-e-perdorimit/"
                >
                  Kushtet e Përdorimit
                </Link>
                <span className="text-background/40 hidden sm:inline">•</span>
                <Link 
                  className="hover:text-primary transition-colors" 
                  href="/politika-e-privatesise/"
                >
                  Politika e Privatësisë
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
