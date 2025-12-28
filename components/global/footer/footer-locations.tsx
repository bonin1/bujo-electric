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
import { getCitiesForNavigation } from '@/lib/city-utils';

interface FooterLocationsProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  businessName?: string;
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
    phone: string;
    email: string;
    address: string;
  };
  services?: Array<{
    name: string;
    href: string;
  }>;
  companyLinks?: Array<{
    name: string;
    href: string;
  }>;
  locations?: Array<{
    city: string;
    state: string;
    href: string;
  }>;
}

// Business data from business-config.ts (generated from business.yaml)
const businessName = BUSINESS_INFO.name;
const businessDescription = `Professional ${BUSINESS_INFO.primaryKeyword} providing quality solutions and exceptional customer service across multiple locations.`;
const contactInfoDefault = {
  phone: CONTACT.phone,
  email: CONTACT.email,
  address: CONTACT.address
};

const defaultServices = getServicesForNavigation();
const defaultCompanyLinks = getCompanyLinks();
const defaultLocations = getCitiesForNavigation();

// Build social links from config
const socialIconMap: Record<string, React.ReactElement> = {
  facebook: getBrandIcon('facebook', { className: "w-4 h-4" }),
  instagram: getBrandIcon('instagram', { className: "w-4 h-4" }),
  linkedin: getBrandIcon('linkedin', { className: "w-4 h-4" }),
  twitter: getBrandIcon('twitter', { className: "w-4 h-4" }),
  pinterest: getBrandIcon('pinterest', { className: "w-4 h-4" }),
  yelp: getBrandIcon('yelp', { className: "w-4 h-4" }),
  youtube: getBrandIcon('youtube', { className: "w-4 h-4" }),
};

const defaultSocialLinks = Object.entries(ACTIVE_SOCIAL_MEDIA)
  .map(([key, href]) => ({
    icon: socialIconMap[key] || getBrandIcon('facebook', { className: "w-4 h-4" }),
    href: href as string,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

export const FooterLocations = ({
  logo = {
    url: "/",
    src: "/assets/config/logo.webp",
    alt: businessName,
    title: businessName,
  },
  businessName: footerBusinessName = businessName,
  description = businessDescription,
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
  contactInfo: footerContactInfo = contactInfoDefault,
  services = defaultServices,
  companyLinks = defaultCompanyLinks,
  locations = defaultLocations,
}: FooterLocationsProps) => {
  return (
    <footer className="bg-gray-900 text-text-light">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url}>
                <Image
                  alt={`${footerBusinessName} Logo`}
                  title={footerBusinessName}
                  loading="lazy"
                  width={128}
                  height={128}
                  style={{ height: 'auto', width: 'auto' }}
                  className="h-32 rounded-md"
                  src={logo.src}
                />
              </Link>
              <h2 className="text-xl font-semibold">{footerBusinessName}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-gray-200">
              {description}
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
              <h3 className="font-bold text-gray-200">Contact Us</h3>
              <Link
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label={`Call ${footerBusinessName}`}
                href={`tel:${formatPhoneTel(footerContactInfo.phone)}`}
              >
                <Phone className="size-5" />
                <span>{formatPhoneDisplay(footerContactInfo.phone)}</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label={`Email ${footerBusinessName}`}
                href={`mailto:${footerContactInfo.email}`}
              >
                <Mail className="size-5" />
                <span>{footerContactInfo.email}</span>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label={`View location of ${footerBusinessName}`}
                href={`https://maps.google.com/?q=${encodeURIComponent(footerContactInfo.address)}`}
              >
                <MapPin className="size-5" />
                <span>{footerContactInfo.address}</span>
              </Link>
            </div>
          </div>
          
          {/* Services and Company */}
          <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-20">
            {/* Services */}
            <div>
              <h3 className="mb-4 font-bold">Services</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                {services.map((service, index) => (
                  <li key={index} className="font-medium hover:text-primary">
                    <Link href={service.href}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                {companyLinks.map((link, index) => (
                  <li key={index} className="font-medium hover:text-primary">
                    <Link href={link.href}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Service Areas Section - Horizontal Layout */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="mb-6 font-bold flex items-center gap-2 text-center lg:text-left">
            <MapPin className="text-accent" />
            Service Areas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 text-sm">
            {locations.map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="text-gray-400 hover:text-primary transition-colors font-medium text-center py-2 px-3 rounded-md hover:bg-gray-800/50"
              >
                {location.city}, {location.state}
              </Link>
            ))}
          </div>
        </div>
        
        {/* DBLSEO Bottom Section */}
        <div className="mt-12 pb-12 border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-background/60 text-center sm:text-left">
              <p>{copyright}</p>
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
                  href="/terms/"
                >
                  Terms and Conditions
                </Link>
                <span className="text-background/40 hidden sm:inline">•</span>
                <Link 
                  className="hover:text-primary transition-colors" 
                  href="/privacy/"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
