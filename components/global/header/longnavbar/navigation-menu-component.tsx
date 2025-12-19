"use client"

import * as React from "react"

import Image from "@/components/ui/image"
import Link from "next/link"

import { 
  Wrench, 
  Users, 
  FileText,
  Settings,
  Hammer,
  Key,
  HouseIcon,
  ListCheck
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/global/header/better-navbar-basic/navigation-menu"
import servicesData from "@/data/services.json"

// Icon mapping for different service types
const serviceIcons = [
  <Settings className="h-4 w-4" key="icon-0" />,
  <Hammer className="h-4 w-4" key="icon-1" />,
  <Wrench className="h-4 w-4" key="icon-2" />,
  <Key className="h-4 w-4" key="icon-3" />,
  <HouseIcon className="h-4 w-4" key="icon-4" />,
]

// Get services from services.json
const services: { title: string; href: string; description: string; icon: React.ReactNode }[] = 
  servicesData.services
    .filter(service => service.isCore)
    .map((service, index) => ({
      title: service.name,
      href: `/${service.slug}`,
      description: service.features[0] || service.description,
      icon: serviceIcons[index % serviceIcons.length]
    }))

const aboutServices: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "Blogs",
    href: "/blog",
    description: "Read our latest insights and tips",
    icon: <FileText className="h-4 w-4" />
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Find answers to frequently asked questions",
    icon: <FileText className="h-4 w-4" />
  }
]



export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Service Areas */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/service-areas/"
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50 group text-sm font-600 tracking-wide uppercase transition-colors duration-200 text-[#f5f5f5] hover:bg-primary/90 hover:text-[#2B2B2B] data-[state=open]:bg-primary/90 data-[state=open]:text-[#2B2B2B]"
              )}
            >
              Service Areas
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "text-sm font-600 tracking-wide uppercase transition-colors duration-200","text-[#f5f5f5] hover:bg-primary/90 hover:text-[#2B2B2B] data-[state=open]:bg-primary/90 data-[state=open]:text-[#2B2B2B]"
          )}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[800px] lg:grid-cols-2 lg:grid-rows-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full hover:shadow-lg hover:scale-102 transition-all duration-200 select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md relative overflow-hidden"
                    href="/services/"
                  >
                    <div className="absolute inset-0 bg-black/80 z-0"></div>
                    <div className="relative z-10">
                      <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2 text-white">
                        <ListCheck className="h-5 w-5" />
                        All Services
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        View all our professional services and solutions.
                      </p>
                    </div>
                    <Image
                      src="/assets/config/placeholder-image.png"
                      alt="All Services"
                      fill
                      className="object-cover opacity-30 z-0"
                      loading="lazy"
                      fetchPriority="low"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                </NavigationMenuLink>
              </li>
              {services.map((service) => (
                <ListItem key={service.title} href={service.href} title={service.title} icon={service.icon}>
                  {service.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About Us */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "text-sm font-600 tracking-wide uppercase transition-colors duration-200","text-[#f5f5f5] hover:bg-primary/90 hover:text-[#2B2B2B] data-[state=open]:bg-primary/90 data-[state=open]:text-[#2B2B2B]"
          )}>
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full hover:shadow-lg hover:scale-102 transition-all duration-200 select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md relative overflow-hidden"
                    href="/about/"
                  >
                    <div className="absolute inset-0 bg-black/80 z-0"></div>
                    <div className="relative z-10">
                      <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2 text-white">
                        <Users className="h-5 w-5" />
                        About Us
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        Learn more about our company, team, and mission.
                      </p>
                    </div>
                    <Image
                      src="/assets/config/placeholder-image.png"
                      alt="About Us"
                      fill
                      className="object-cover opacity-30 z-0"
                      loading="lazy"
                      fetchPriority="low"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                </NavigationMenuLink>
              </li>
              {aboutServices.map((service) => (
                <ListItem key={service.title} href={service.href} title={service.title} icon={service.icon}>
                  {service.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Portfolio */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/portfolio"
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50 group text-sm font-600 tracking-wide uppercase transition-colors duration-200 text-[#f5f5f5] hover:bg-primary/90 hover:text-[#2B2B2B] data-[state=open]:bg-primary/90 data-[state=open]:text-[#2B2B2B]"
              )}
            >
              Portfolio
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Contact Us */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50 group text-sm font-600 tracking-wide uppercase transition-colors duration-200 text-[#f5f5f5] hover:bg-primary/90 hover:text-[#2B2B2B] data-[state=open]:bg-primary/90 data-[state=open]:text-[#2B2B2B]"
              )}
            >
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon?: React.ReactNode; liClassName?: string }
>(({ className, title, children, icon, liClassName, ...props }, ref) => {
  return (
    <li className={liClassName}>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center gap-2">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
