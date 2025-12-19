"use client";

import { MenuIcon, Phone, Facebook, Instagram, Twitter, Youtube, Linkedin, Wrench, Droplets, Palette, Leaf, MapPin, Users, FileText, Home, Info, HelpCircle, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from '@/components/ui/image';
import Link from "next/link";

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

export const TopBarNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for sticky navbar
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

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen]);

  const services = [
    {
      title: "Service 1",
      description: "Professional service 1 description",
      href: "/service-1",
      icon: <Wrench className="h-5 w-5 text-primary" />,
    },
    {
      title: "Service 2", 
      description: "Professional service 2 description",
      href: "/service-2",
      icon: <Droplets className="h-5 w-5 text-primary" />,
    },
    {
      title: "Service 3",
      description: "Professional service 3 description",
      href: "/service-3",
      icon: <Palette className="h-5 w-5 text-primary" />,
    },
    {
      title: "Service 4",
      description: "Professional service 4 description",
      href: "/service-4",
      icon: <Leaf className="h-5 w-5 text-primary" />,
    },
    {
      title: "Service 5",
      description: "Professional service 5 description",
      href: "/service-5",
      icon: <Wrench className="h-5 w-5 text-primary" />,
    },
  ];


  const company = [
    {
      title: "Team",
      description: "Meet our expert team of professionals",
      href: "/about/team",
      icon: <Users className="h-4 w-4 text-accent" />,
    },
    {
      title: "Blogs",
      description: "Read our latest insights and tips",
      href: "/blog",
      icon: <FileText className="h-4 w-4 text-accent" />,
    },
    {
      title: "FAQ",
      description: "Find answers to frequently asked questions",
      href: "/FAQ",
      icon: <HelpCircle className="h-4 w-4 text-accent" />,
    },
  ];


  const socialLinks = [
    { icon: <Facebook className="h-4 w-4" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Youtube className="h-4 w-4" />, href: "https://youtube.com", label: "YouTube" },
    { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Top Bar with Phone and Social Icons */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Call Now: (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Follow Us:</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Sticky */}
      <section className={`py-4 w-full flex justify-center transition-all duration-300 ease-in-out z-[100] ${
        isScrolled ? 'fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-background border-b border-border'
      }`}>
        <div className="container max-w-7xl">
          <nav className="flex items-center">
            {/* Logo - Left side */}
            <div className="shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <Image
                  src="/assets/config/logo.png"
                  width={40}
                  height={40}
                  style={{ height: 'auto', width: 'auto' }}
                  className="max-h-10"
                  alt="Example Company Logo"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-text-dark">
                    Example Company
                  </span>
                  <span className="text-xs text-text-muted -mt-1">Professional Services</span>
                </div>
              </Link>
            </div>

            {/* Navigation Menu - Center */}
            <div className="flex-1 flex justify-center">
              <NavigationMenu className="hidden lg:block">
                <NavigationMenuList className="gap-6">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/service-areas/"
                      className={navigationMenuTriggerStyle()}
                    >
                      Service Areas
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[500px] grid-cols-2 p-4 gap-3">
                        <NavigationMenuLink
                          href="/services/"
                          className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 group-hover:scale-110 transition-transform">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                All Services
                              </p>
                              <p className="text-sm text-muted-foreground">
                                View all our professional services
                              </p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                        {services.map((service, index) => (
                          <NavigationMenuLink
                            href={service.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 group-hover:scale-110 transition-transform">
                                {service.icon}
                              </div>
                              <div>
                                <p className="mb-1 font-semibold text-foreground">
                                  {service.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[500px] grid-cols-2 p-4 gap-3">
                        <NavigationMenuLink
                          href="/about/"
                          className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 group-hover:scale-110 transition-transform">
                              <Info className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                About Us
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Learn about our company and mission
                              </p>
                            </div>
                          </div>
                        </NavigationMenuLink>
                        {company.map((item, index) => (
                          <NavigationMenuLink
                            href={item.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 group-hover:scale-110 transition-transform">
                                {item.icon}
                              </div>
                              <div>
                                <p className="mb-1 font-semibold text-foreground">
                                  {item.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/portfolio"
                      className={navigationMenuTriggerStyle()}
                    >
                      Portfolio
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/contact"
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact Us
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Buttons - Right side */}
            <div className="hidden items-center gap-4 lg:flex shrink-0">
              <Button>Get Free Quote</Button>
            </div>
            
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 rounded-md hover:bg-muted/70 transition-colors"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-background border-l border-border shadow-lg transform transition-transform duration-700 ease-in-out z-50 overflow-y-auto ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/assets/config/logo.png"
                    width={40}
                    height={40}
                    style={{ height: 'auto', width: 'auto' }}
                    className="max-h-10"
                    alt="Example Company Logo"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-text-dark">
                      Example Company
                    </span>
                    <span className="text-xs text-text-muted -mt-1">Professional Services</span>
                  </div>
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-3 rounded-md hover:bg-muted/70 transition-colors"
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
                      <Wrench className="h-5 w-5 mr-3" />
                      Services
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto ml-8">
                        <Link
                          href="/services/"
                          className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 group-hover:scale-110 transition-transform">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                All Services
                              </p>
                              <p className="text-sm text-muted-foreground">
                                View all our professional services
                              </p>
                            </div>
                          </div>
                        </Link>
                        {services.map((service, index) => (
                          <Link
                            href={service.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 group-hover:scale-110 transition-transform">
                                {service.icon}
                              </div>
                              <div>
                                <p className="mb-1 font-semibold text-foreground">
                                  {service.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {service.description}
                                </p>
                              </div>
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
                          <div className="flex items-start gap-3">
                            <div className="mt-1 group-hover:scale-110 transition-transform">
                              <Info className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                About Us
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Learn about our company and mission
                              </p>
                            </div>
                          </div>
                        </Link>
                        {company.map((item, index) => (
                          <Link
                            href={item.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 group-hover:scale-110 transition-transform">
                                {item.icon}
                              </div>
                              <div>
                                <p className="mb-1 font-semibold text-foreground">
                                  {item.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
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
                  <Button className="w-full">Get Free Quote</Button>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    {socialLinks.map((social, index) => (
                      <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-muted/70 transition-colors"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </div>
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
    </div>
  );
};
