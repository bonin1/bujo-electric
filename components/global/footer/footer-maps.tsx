"use client";
import React from "react";
import Image from '@/components/ui/image'
import Link from "next/link";
import { 
  Phone,
  Mail,
  Clock
} from "lucide-react";


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
  getCopyright
} from '@/lib/business-config';

// Business data from business-config.ts (generated from business.yaml)
const businessName = getBusinessName();
const businessDescription = getBusinessDescription();
const contactInfoDefault = getContactInfo();

  // Get core services from business config
const defaultServices = [
  { name: "Të Gjitha Shërbimet", href: "/sherbime-elektrike/" },
  ...getServicesForNavigation()
];

const defaultCompanyLinks = getCompanyLinks();

export const FooterMaps = ({
  logo = {
    url: "/",
    src: "/logo.svg",
    alt: businessName,
    title: businessName,
  },
  businessName: footerBusinessName = businessName,
  description = businessDescription,
  copyright = getCopyright(),
  contactInfo: footerContactInfo = contactInfoDefault,
  services = defaultServices,
  companyLinks = defaultCompanyLinks,
  legalLinks = [
    { name: "Politika e Privatësisë", href: "/politika-e-privatesise/" },
    { name: "Kushtet e Shërbimit", href: "/kushtet-e-perdorimit/" },
  ],
}: FooterMapsProps) => {

  return (
    <section className="pb-16 bg-white border-t border-gray-100 pt-16">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start lg:text-left text-center lg:text-left">
          {/* Business Info */}
          <div className="flex w-full lg:max-w-md flex-col gap-6 items-center lg:items-start">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Link href={logo.url}>
                <Image
                  alt={`${footerBusinessName} Logo`}
                  title={footerBusinessName}
                  width={180}
                  height={72}
                  className="h-24 w-auto"
                  src={logo.src}
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto lg:mx-0">
              {description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-500 flex flex-col items-center lg:items-start">
              <p className="flex items-center gap-3 justify-center lg:justify-start">
                <Phone className="text-primary w-4 h-4" />
                <Link href={`tel:${formatPhoneTel(footerContactInfo.phone)}`} className="hover:text-primary transition-colors text-gray-900 font-bold">
                  {formatPhoneDisplay(footerContactInfo.phone)}
                </Link>
              </p>
              <p className="flex items-center gap-3 justify-center lg:justify-start">
                <Mail className="text-primary w-4 h-4" />
                <Link href={`mailto:${footerContactInfo.email}`} className="hover:text-primary transition-colors text-gray-600">
                  {footerContactInfo.email}
                </Link>
              </p>
              <p className="flex items-center gap-3 justify-center lg:justify-start mt-4">
                <Clock className="text-primary w-4 h-4" />
                <span className="text-gray-600 font-medium">{BUSINESS_HOURS.monday}</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid w-full gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-2xl">
            {/* Services */}
            <div className="flex flex-col items-center lg:items-start">
              <p className="mb-6 font-black text-gray-900 text-xs uppercase tracking-[0.2em]">Shërbimet</p>
              <ul className="space-y-3 text-sm text-gray-500">
                {services.map((service, index) => (
                  <li key={index} className="hover:text-primary transition-colors">
                    <Link href={service.href}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col items-center lg:items-start">
              <p className="mb-6 font-black text-gray-900 text-xs uppercase tracking-[0.2em]">Kompania</p>
              <ul className="space-y-3 text-sm text-gray-500">
                {companyLinks.map((link, index) => (
                  <li key={index} className="hover:text-primary transition-colors">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* TEBOTRONIC Bottom Section */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <p>{copyright}</p>
              <span className="hidden sm:inline text-gray-300">•</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>Dizajni i Uebfaqes &amp; SEO nga</span>
                <Link 
                  href="https://www.tebotronic.com/"  
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Image 
                    alt="TEBOTRONIC Logo" 
                    loading="lazy" 
                    width={20} 
                    height={20} 
                    className="object-contain" 
                    src="/tb.png"
                  />
                  <span className="font-semibold">TEBOTRONIC</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
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
