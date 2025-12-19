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
  ACTIVE_SOCIAL_MEDIA,
  GOOGLE_MAPS,
  formatPhoneDisplay,
  formatPhoneTel,
  getBusinessName, 
  getBusinessDescription, 
  getContactInfo, 
  getDefaultAddresses,
  getCopyright
} from '@/lib/business-config';

interface FooterMinimalistProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  businessName?: string;
  description?: string;
  copyright?: string;
  essentialLinks?: Array<{
    name: string;
    href: string;
  }>;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  addresses?: Array<{
    location: string;
    address: string;
  }>;
  contactInfo?: {
    phone: string;
    email: string;
  };
}

// Business data from business-config.ts (generated from business.yaml)

const businessName = getBusinessName();
const businessDescription = getBusinessDescription();
const contactInfoDefault = getContactInfo();
const defaultAddresses = getDefaultAddresses();

const defaultEssentialLinks = [
  { name: "Services", href: "/services/" },
  { name: "About", href: "/about/" },
  { name: "Contact", href: "/contact/" },
  { name: "Service Areas", href: "/service-areas/" },
];

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

export const FooterMinimalist = ({
  logo = {
    url: "/",
    src: "/assets/config/logo.png",
    alt: businessName,
    title: businessName,
  },
  businessName: footerBusinessName = businessName,
  description = businessDescription,
  copyright = getCopyright(),
  essentialLinks = defaultEssentialLinks,
  socialLinks = defaultSocialLinks,
  addresses = defaultAddresses,
  contactInfo: footerContactInfo = contactInfoDefault,
}: FooterMinimalistProps) => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <Link href={logo.url} className="inline-flex items-center gap-3 mb-4">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={32}
                height={32}
                style={{ height: 'auto', width: 'auto' }}
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold">{footerBusinessName}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {description}
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="w-4 h-4 shrink-0" />
                <Link href={`tel:${formatPhoneTel(footerContactInfo.phone)}`} className="hover:text-foreground transition-colors">
                  {formatPhoneDisplay(footerContactInfo.phone)}
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="w-4 h-4 shrink-0" />
                <Link href={`mailto:${footerContactInfo.email}`} className="hover:text-foreground transition-colors">
                  {footerContactInfo.email}
                </Link>
              </div>
              {addresses.map((address, index) => (
                <div key={index} className="flex items-start justify-center gap-2 md:justify-start">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">{address.location}</div>
                    <div className="text-xs">{address.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation & Social */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="mb-6">
              <ul className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                {essentialLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 md:justify-start">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <h3 className="text-lg font-semibold mb-4 text-center">Visit Our Location</h3>
          <div className="w-full h-64 rounded-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: GOOGLE_MAPS.embedCode }} />
        </div>
        
        {/* DBLSEO Bottom Section */}
        <div className="mt-12 pb-12 border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground text-center sm:text-left">
              <p>{copyright}</p>
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <Link 
                  className="hover:text-secondary text-muted-foreground transition-colors" 
                  href="/terms/"
                >
                  Terms and Conditions
                </Link>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <Link 
                  className="hover:text-primary text-muted-foreground transition-colors" 
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
