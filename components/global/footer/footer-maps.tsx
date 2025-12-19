"use client";
import React from "react";
import Image from '@/components/ui/image'
import Link from "next/link";
import { 
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";
import { getBrandIcon } from "@/components/ui/icons/brand-icons";


interface FooterMapsProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  businessName?: string;
  description?: string;
  copyright?: string;
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
  };
  locations?: Array<{
    id: string;
    name: string;
    address: string;
    mapEmbed: string;
    mapTitle: string;
    isMain?: boolean;
  }>;
  services?: Array<{
    name: string;
    href: string;
  }>;
  companyLinks?: Array<{
    name: string;
    href: string;
  }>;
  socialLinks?: Array<{
    name: string;
    href: string;
    icon: React.ReactElement;
  }>;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

// Import business data from centralized config
import { 
  BUSINESS_HOURS,
  formatPhoneDisplay,
  formatPhoneTel,
  getServicesForNavigation,
  getCompanyLinks,
  getBusinessName,
  getBusinessDescription,
  getContactInfo,
  getDefaultMapLocation,
  getCopyright,
  ACTIVE_SOCIAL_MEDIA,
  BUSINESS_INFO
} from '@/lib/business-config';

// Business data from business-config.ts (generated from business.yaml)
const businessName = getBusinessName();
const businessDescription = getBusinessDescription();
const contactInfoDefault = getContactInfo();
const defaultLocations = [getDefaultMapLocation()];

// Get core services from business config
const defaultServices = [
  { name: "All Services", href: "/services/" },
  ...getServicesForNavigation()
];

const defaultCompanyLinks = getCompanyLinks();

// Build social links from config
const socialIconMap: Record<string, React.ReactElement> = {
  facebook: getBrandIcon('facebook', { className: "size-5" }),
  instagram: getBrandIcon('instagram', { className: "size-5" }),
  linkedin: getBrandIcon('linkedin', { className: "size-5" }),
  twitter: getBrandIcon('twitter', { className: "size-5" }),
  pinterest: getBrandIcon('pinterest', { className: "size-5" }),
  yelp: getBrandIcon('yelp', { className: "size-5" }),
  youtube: getBrandIcon('youtube', { className: "size-5" }),
};

const defaultSocialLinks = Object.entries(ACTIVE_SOCIAL_MEDIA)
  .map(([key, href]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    href: href as string,
    icon: socialIconMap[key] || getBrandIcon('facebook', { className: "size-5" }),
  }));

export const FooterMaps = ({
  logo = {
    url: "/",
    src: "/assets/config/logo.png",
    alt: businessName,
    title: businessName,
  },
  businessName: footerBusinessName = businessName,
  description = businessDescription,
  copyright = getCopyright(),
  contactInfo: footerContactInfo = contactInfoDefault,
  locations = defaultLocations,
  services = defaultServices,
  companyLinks = defaultCompanyLinks,
  socialLinks = defaultSocialLinks,
  legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy/" },
    { name: "Terms of Service", href: "/terms/" },
  ],
}: FooterMapsProps) => {
  // Get the main location or first location
  const mainLocation = locations.find(loc => loc.isMain) || locations[0];

  return (
    <section className="pb-16 bg-neutral-900">
      {/* Location Header */}
      <div className="bg-neutral-800 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="text-lg font-semibold mb-1 text-white">Visit Our Location</p>
            <p className="text-gray-300 text-sm">{mainLocation.address}</p>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <iframe
        src={mainLocation.mapEmbed}
        width="100%"
        height="300"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[300px] mb-4 border-0"
        style={{ border: 0 }}
        title={mainLocation.mapTitle}
      />

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start lg:text-left">
          {/* Business Info */}
          <div className="flex w-full lg:max-w-md flex-col gap-4 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url}>
                <Image
                  alt={`${footerBusinessName} Logo`}
                  title={footerBusinessName}
                  width={160}
                  height={64}
                  className="h-20 w-auto"
                  src={logo.src}
                  // Removed style to rely on className for sizing
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="text-sm footer-text-secondary leading-relaxed">
              {description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm footer-text-muted">
              <p className="flex items-center gap-2">
                <Phone className="footer-text-muted w-4 h-4" />
                <Link href={`tel:${formatPhoneTel(footerContactInfo.phone)}`} className="hover:text-primary transition-colors footer-text-secondary">
                  {formatPhoneDisplay(footerContactInfo.phone)}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="footer-text-muted w-4 h-4" />
                <Link href={`mailto:${footerContactInfo.email}`} className="hover:text-primary transition-colors footer-text-secondary">
                  {footerContactInfo.email}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="footer-text-muted w-4 h-4" />
                <span className=" footer-text-secondary">Locations:</span>
              </p>
              <div className="ml-6 space-y-1">
                {locations.map((location, index) => (
                  <div key={index}>
                    <p className="text-xs footer-text-secondary ">
                      {location.isMain ? "Headquarters" : location.name}
                    </p>
                    <Link
                      href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-primary transition-colors text-xs footer-text-muted"
                    >
                      {location.address}
                    </Link>
                  </div>
                ))}
              </div>
              <p className="flex items-center gap-2">
                <Clock className="footer-text-muted w-4 h-4" />
                <span className="footer-text-muted">{BUSINESS_HOURS.monday}</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid w-full gap-8 md:grid-cols-3 lg:gap-12">
            {/* Services */}
            <div>
              <p className="mb-4 font-bold footer-text-primary text-lg">Services</p>
              <ul className="space-y-2 text-sm footer-text-muted">
                {services.map((service, index) => (
                  <li key={index} className="hover:text-primary text-footer-primary/80 transition-colors">
                    <Link href={service.href}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-4 font-bold footer-text-primary text-lg">Company</p>
              <ul className="space-y-2 text-sm footer-text-muted">
                {companyLinks.map((link, index) => (
                  <li key={index} className="hover:text-primary text-footer-primary/80 transition-colors">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <p className="mb-4 font-bold footer-text-primary text-lg">Find Us</p>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    aria-label={social.name}
                    className="flex items-center gap-1 text-sm footer-text-muted hover:text-primary transition-colors group"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full footer-text-subtle group-hover:text-primary transition-all duration-300">
                      {social.icon}
                    </span>
                    <span  >{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DBLSEO Bottom Section */}
        <div className="mt-12 border-t border-background/20 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-background/60">
              <p>{copyright}</p>
              <span className="hidden sm:inline text-background/40">•</span>
              <div className="flex items-center gap-1 text-xs text-background/40">
                <span>Website Design &amp; SEO by</span>
                <Link 
                  href="https://dblseo.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Image 
                    alt="DBLSEO Logo" 
                    loading="lazy" 
                    width={20} 
                    height={20} 
                    className="object-contain" 
                    src="/assets/config/dblseo-logo.webp"
                  />
                  <span className="font-semibold">DBLSEO.</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-background/60">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  className="hover:text-primary transition-colors"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export alias for backward compatibility
export const Footer3 = FooterMaps;
