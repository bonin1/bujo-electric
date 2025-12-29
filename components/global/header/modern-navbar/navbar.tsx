'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from '@/components/ui/image'
import { Button } from '@/components/ui/buttons'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { BUSINESS_INFO, getPhoneDisplay, getPhoneTel } from '@/lib/business-config'

// Navigation Data
const navLinks = [
  { 
    name: 'Zonat e Shërbimit', 
    href: '/zonat-e-sherbimit/'
  },
  { 
    name: 'Shërbime Elektrike', 
    href: '/sherbime-elektrike/',
    dropdown: [
      { name: 'Instalime Elektrike', href: '/instalime-elektrike/' },
      { name: 'Riparime Elektrike', href: '/riparime-elektrike/' },
      { name: 'Mirëmbajtje Elektrike', href: '/mirembajtje-elektrike/' },
      { name: 'Ndriçim & Energji', href: '/ndricim-energji/' },
      { name: 'Sisteme Speciale', href: '/sisteme-elektrike/' },
    ]
  },
  { 
    name: 'Rreth Nesh', 
    href: '/rreth-nesh/'
  },
  { name: 'Galeria', href: '/galeria-e-projekteve/' },
  { name: 'Blog', href: '/blog/' },
  { name: 'FAQ', href: '/pyetje-te-shpeshta/' },
  { name: 'Kontakti', href: '/kontakti/' },
]

export function ModernNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-gray-200/50",
        isScrolled 
          ? "top-2 py-1 sm:py-2 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl" 
          : "top-3 sm:top-8 py-2 sm:py-5 w-[calc(100%-1rem)] sm:w-[95%] max-w-[90rem]"
      )}
    >
      <div className="w-full h-full px-3 sm:px-6 md:px-10">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="relative z-10 flex items-center group">
              <div className="relative transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt={BUSINESS_INFO.name}
                  width={isScrolled ? 60 : 70}
                  height={isScrolled ? 35 : 45}
                  className="object-contain transition-all duration-300 "
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1",
                    "text-gray-600 hover:text-primary hover:bg-primary/5",
                    activeDropdown === link.name && "bg-primary/5 text-primary"
                  )}
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300 opacity-50",
                      activeDropdown === link.name && "rotate-180"
                    )} />
                  )}
                </Link>

                {/* Dropdown / Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === link.name && link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden ring-1 ring-black/5 z-[150] w-64"
                    >
                      {link.dropdown && (
                        <div className="p-2">
                          {link.dropdown.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-3">
            <Button 
              asChild 
              variant="ghost" 
              className="rounded-full font-medium text-gray-600 hover:bg-gray-100 hover:text-primary"
            >
              <Link href={`tel:${getPhoneTel()}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {getPhoneDisplay()}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl transition-colors text-gray-900 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white lg:hidden flex flex-col h-[100dvh] w-full overflow-hidden"
          >
            <div className="p-3 flex items-center justify-between border-b border-gray-100">
              <div className="h-10 w-32 relative">
                <Image
                  src="/logo.webp"
                  alt={BUSINESS_INFO.name}
                  fill
                  className="object-contain"
                />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-gray-900 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-0.5">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 text-base font-bold text-gray-900 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-3 space-y-0.5 border-l-2 border-gray-50 ml-2">
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block p-2 text-xs text-gray-500 hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100">
              <Button asChild variant="outline" className="w-full rounded-xl py-3 text-sm font-bold border-gray-200">
                <Link href={`tel:${getPhoneTel()}`} className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  {getPhoneDisplay()}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
