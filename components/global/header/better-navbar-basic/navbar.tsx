"use client";

import { MenuIcon, Home, Info, MapPin, FileText, HelpCircle, Image as ImageIcon, Phone } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from '@/components/ui/image';
import servicesData from "@/data/services.json";
import { getPhoneDisplay, getPhoneTel } from "@/lib/business-config";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/global/header/better-navbar-basic/accordion";
import { Button } from "@/components/ui/buttons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/global/header/better-navbar-basic/navigation-menu";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for transparent navbar
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen]);

  // Get core services from services.json
  const coreServices = servicesData.services
    .filter(service => service.isCore)
    .map(service => ({
      title: service.name,
      description: service.features[0] || service.description, // Use first feature as description
      href: `/${service.slug}`,
    }));

  // About Us dropdown items
  const aboutItems = [
    {
      title: "Team",
      description: "Meet our expert team of professionals",
      href: "/about/team",
    },
    {
      title: "Blogs",
      description: "Read our latest insights and tips",
      href: "/our-blog",
    },
    {
      title: "FAQ",
      description: "Find answers to frequently asked questions",
      href: "/faqs",
    },
  ];


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <section className={`py-4 w-full flex justify-center fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-[100] ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className=" w-full px-4">
        <nav className="flex items-center px-4">
          {/* Logo - Left side */}
          <div className="shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src="/favicon.svg"
                width={64}
                height={64}
                style={{ height: 'auto', width: 'auto' }}
                className="max-h-16 rounded-md w-auto"
                alt="Example Company Logo"
              />
              <span className={`text-lg font-semibold tracking-tighter transition-colors duration-300 ${
                isScrolled ? 'text-text-dark' : 'text-text-dark'
              }`}>
                Example Company
              </span>
            </Link>
          </div>

          {/* Navigation Menu - Center */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/service-areas/"
                    className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'bg-background' : 'text-text-dark hover:text-text-dark bg-transparent'}`}
                  >
                    Service Areas
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={isScrolled ? 'bg-background' : 'text-text-dark hover:text-text-dark bg-transparent'}>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-3 p-3">
                      <NavigationMenuLink
                        href="/services/"
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            All Services
                          </p>
                          <p className="text-sm text-muted-foreground">
                            View all our professional services
                          </p>
                        </div>
                      </NavigationMenuLink>
                      {coreServices.map((service, index) => (
                        <NavigationMenuLink
                          href={service.href}
                          key={index}
                          className="rounded-md p-3 transition-colors hover:bg-muted/70"
                        >
                          <div key={service.title}>
                            <p className="mb-1 font-semibold text-foreground">
                              {service.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={isScrolled ? 'bg-background' : 'text-text-dark hover:text-text-dark bg-transparent'}>About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 p-3">
                      <NavigationMenuLink
                        href="/about/"
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            About Us
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Learn about our company and mission
                          </p>
                        </div>
                      </NavigationMenuLink>
                      {aboutItems.map((item, index) => (
                        <NavigationMenuLink
                          href={item.href}
                          key={index}
                          className="rounded-md p-3 transition-colors hover:bg-muted/70"
                        >
                          <div key={item.title}>
                            <p className="mb-1 font-semibold text-foreground">
                              {item.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/portfolio"
                    className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'bg-background' : 'text-text-dark hover:text-text-dark bg-transparent'}`}
                  >
                    Portfolio
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/contact"
                    className={`${navigationMenuTriggerStyle()} ${isScrolled ? 'bg-background' : 'text-text-dark hover:text-text-dark bg-transparent'}`}
                  >
                    Contact Us
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Buttons - Right side */}
          <div className="hidden items-center gap-4 lg:flex shrink-0">
            <Button asChild variant="outline">
              <Link href={`tel:${getPhoneTel()}`} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {getPhoneDisplay()}
              </Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Get Free Quote</Link>
            </Button>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-3 rounded-md hover:bg-muted/70 transition-colors ${
              isScrolled ? '' : 'text-text-dark hover:text-text-dark'
            }`}
            aria-label="Menu Button"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </nav>

        <div
          className={`lg:hidden fixed top-0 right-0 h-screen w-80 bg-background border-l border-border shadow-lg transform transition-transform duration-700 ease-in-out z-50 overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Image
                  src="/favicon.svg"
                  width={64}
                  height={64}
                  style={{ height: 'auto', width: 'auto' }}
                  className="max-h-16 rounded-md w-auto"
                  alt="Example Company Logo"
                />
                <span className="text-lg font-semibold tracking-tighter">
                  Example Company
                </span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-3 rounded-md hover:bg-muted/70 transition-colors"
                aria-label="Menu Button"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <Link href="/" className="flex items-center font-medium py-2 hover:text-primary transition-colors">
                <Home className="h-5 w-5 mr-3" />
                Home
              </Link>

              <Link href="/service-areas/" className="flex items-center font-medium py-2 hover:text-primary transition-colors">
                <MapPin className="h-5 w-5 mr-3" />
                Service Areas
              </Link>

              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="services" className="border-none">
                  <AccordionTrigger className="text-base hover:no-underline flex items-center">
                    <FileText className="h-5 w-5 mr-3" />
                    Services
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto ml-8">
                      <Link
                        href="/services/"
                        className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            All Services
                          </p>
                          <p className="text-sm text-muted-foreground">
                            View all our professional services
                          </p>
                        </div>
                      </Link>
                      {coreServices.map((service, index) => (
                        <Link
                          href={service.href}
                          key={index}
                          className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div>
                            <p className="mb-1 font-semibold text-foreground">
                              {service.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="about" className="border-none">
                  <AccordionTrigger className="text-base hover:no-underline flex items-center">
                    <Info className="h-5 w-5 mr-3" />
                    About Us
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto ml-8">
                      <Link
                        href="/about/"
                        className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            About Us
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Learn about our company and mission
                          </p>
                        </div>
                      </Link>
                      {aboutItems.map((item, index) => (
                        <Link
                          href={item.href}
                          key={index}
                          className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div>
                            <p className="mb-1 font-semibold text-foreground">
                              {item.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link href="/portfolio" className="flex items-center font-medium py-2 hover:text-primary transition-colors">
                <ImageIcon className="h-5 w-5 mr-3" />
                Portfolio
              </Link>

              <Link href="/contact" className="flex items-center font-medium py-2 hover:text-primary transition-colors">
                <HelpCircle className="h-5 w-5 mr-3" />
                Contact Us
              </Link>

              <div className="pt-6 space-y-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`tel:${getPhoneTel()}`} className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    {getPhoneDisplay()}
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact">Get Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-700"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </section>
  );
};
