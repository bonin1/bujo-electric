'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from '@/components/ui/image'
import { Button } from '@/components/ui/buttons'
import { Menu, X, ChevronRight, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavigationMenuDemo } from './navigation-menu-component'
import servicesData from '@/data/services.json'
import { BUSINESS_INFO, getPhoneDisplay, getPhoneTel } from '@/lib/business-config'
import { motion, AnimatePresence, Variants } from 'framer-motion'

export function LongNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [expandedSections, setExpandedSections] = useState<string[]>([])
    const [isMounted, setIsMounted] = useState(false)

    // Get core services from services.json
    const coreServices = servicesData.services.filter(service => service.isCore)

    // Ensure client-side only rendering for mobile menu to prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Animation variants for dropdown - performance optimized
    const dropdownVariants: Variants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] as [number, number, number, number] },
                opacity: { duration: 0.2 }
            }
        },
        open: {
            height: 'auto',
            opacity: 1,
            transition: {
                height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] as [number, number, number, number] },
                opacity: { duration: 0.25, delay: 0.1 }
            }
        }
    }

    const itemVariants: Variants = {
        closed: { 
            opacity: 0,
            x: -10
        },
        open: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.05,
                duration: 0.2,
                ease: 'easeOut' as const
            }
        })
    }

    const toggleSection = (section: string) => {
        setExpandedSections(prev => 
            prev.includes(section) 
                ? prev.filter(s => s !== section)
                : [...prev, section]
        )
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setExpandedSections([])
    }

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (typeof document === 'undefined') {
            return;
        }
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = 'unset'
            }
        }
    }, [isMobileMenuOpen])

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300","bg-black/80 backdrop-blur-md shadow-lg border-b border-border/50" 
        )}>
            <div className="mx-auto flex max-w-8xl items-center justify-between px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
                <Link href="/" className="flex items-center space-x-2" aria-label={`${BUSINESS_INFO.name} Home`}>
                    <Image
                        src="/assets/config/logo.webp"
                        alt={`${BUSINESS_INFO.name} - Professional Services`}
                        width={160}
                        height={64}
                        className="h-12 sm:h-16 lg:h-20 w-auto"
                        priority
                        sizes="(max-width: 768px) 80px, 160px"
                    />
                </Link>
                
                {/* Desktop Navigation with Dropdown Menu */}
                <nav className="hidden xl:block" role="navigation" aria-label="Main navigation">
                    <NavigationMenuDemo />
                </nav>
                
                <div className="hidden md:flex md:items-center md:gap-2 lg:gap-3">
                    <Button asChild variant="outline" size="sm" className="text-xs lg:text-sm px-2 py-1 lg:px-3 lg:py-2">
                        <Link href={`tel:${getPhoneTel()}`} className="flex items-center gap-1 lg:gap-2" aria-label={`Telefononi në ${getPhoneDisplay()}`}>
                            <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                            <span className="hidden lg:inline">Telefono Tani!</span>
                            <span className="lg:hidden">{getPhoneDisplay()}</span>
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="text-xs lg:text-sm px-2 py-1 lg:px-3 lg:py-2">
                        <Link href="/kontakti" aria-label={`Merrni një konsultë falas për shërbimet ${BUSINESS_INFO.primaryKeyword}`}>
                            Konsultë
                        </Link>
                    </Button>
                    
                </div>
                
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                        "md:hidden p-2 transition-colors duration-200","text-[#f5f5f5] hover:bg-[#f5f5f5]/10"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMounted && isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-55" onClick={closeMobileMenu} />
            )}

            {/* Mobile Menu Sidebar */}
            {isMounted && (
            <div 
                className={cn(
                    "md:hidden fixed top-0 right-0 h-screen w-72 max-w-[85vw] bg-black shadow-2xl transform transition-transform duration-300 ease-in-out z-60",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
                role="dialog"
                aria-modal={isMobileMenuOpen ? "true" : "false"}
                aria-label="Mobile navigation menu"
            >
                <div className="flex flex-col h-full">
                    {/* Header - Fixed */}
                    <div className="flex items-center justify-between p-3 border-b border-white/20 bg-black/95 backdrop-blur-sm">
                        <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-2">
                            <Image
                                src="/assets/config/logo.webp"
                                alt={`${BUSINESS_INFO.name} - Professional Services`}
                                width={160}
                                height={64}
                                className="h-12 w-auto"
                                priority
                                fetchPriority="high"
                                sizes="100px"
                            />
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={closeMobileMenu}
                            className="p-3 text-white hover:bg-white/10 rounded-lg"
                            aria-label="Close mobile navigation menu"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Scrollable Navigation Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <nav className="p-4 space-y-2" role="navigation" aria-label="Mobile navigation menu">
                            {/* Service Areas - Direct Link */}
                            <Link 
                                href="/zonat-e-sherbimit/" 
                                className="flex items-center w-full text-left text-sm font-semibold text-white uppercase tracking-wide py-4 px-2 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={closeMobileMenu}
                            >
                                Zonat e Shërbimit
                            </Link>

                            {/* Services Section */}
                            <div className="space-y-1">
                                <button
                                    onClick={() => toggleSection('services')}
                                    className="flex items-center justify-between w-full text-left text-sm font-semibold text-white uppercase tracking-wide py-4 px-2 rounded-lg hover:bg-white/5 transition-colors"
                                    aria-expanded={expandedSections.includes('services')}
                                    aria-controls="services-section"
                                    aria-label="Toggle services section"
                                >
                                    <span>Shërbimet</span>
                                    <motion.div
                                        animate={{ rotate: expandedSections.includes('services') ? 90 : 0 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >
                                        <ChevronRight className="h-4 w-4 text-white/60" />
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {expandedSections.includes('services') && (
                                        <motion.div 
                                            id="services-section" 
                                            className="ml-4 border-l-2 border-primary/40 pl-4 overflow-hidden" 
                                            role="region" 
                                            aria-label="Services section navigation"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={dropdownVariants}
                                        >
                                            <div className="space-y-1">
                                                <motion.div
                                                    custom={0}
                                                    variants={itemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                >
                                                    <Link 
                                                        href="/sherbime-elektrike/" 
                                                        className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        Të gjitha Shërbimet
                                                    </Link>
                                                </motion.div>
                                                {coreServices.map((service, index) => (
                                                    <motion.div
                                                        key={service.id}
                                                        custom={index + 1}
                                                        variants={itemVariants}
                                                        initial="closed"
                                                        animate="open"
                                                    >
                                                        <Link 
                                                            href={`/${service.slug}`} 
                                                            className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5"
                                                            onClick={closeMobileMenu}
                                                        >
                                                            {service.name}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* About Us Section */}
                            <div className="space-y-1">
                                <button
                                    onClick={() => toggleSection('about')}
                                    className="flex items-center justify-between w-full text-left text-sm font-semibold text-white uppercase tracking-wide py-4 px-2 rounded-lg hover:bg-white/5 transition-colors"
                                    aria-expanded={expandedSections.includes('about')}
                                    aria-controls="about-section"
                                    aria-label="Toggle about section"
                                >
                                    <span>Rreth Nesh</span>
                                    <motion.div
                                        animate={{ rotate: expandedSections.includes('about') ? 90 : 0 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >
                                        <ChevronRight className="h-4 w-4 text-white/60" />
                                    </motion.div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {expandedSections.includes('about') && (
                                        <motion.div 
                                            id="about-section" 
                                            className="ml-4 border-l-2 border-primary/40 pl-4 overflow-hidden" 
                                            role="region" 
                                            aria-label="About section navigation"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={dropdownVariants}
                                        >
                                            <div className="space-y-1">
                                                <motion.div
                                                    custom={0}
                                                    variants={itemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                >
                                                    <Link 
                                                        href="/rreth-nesh/" 
                                                        className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        Rreth Nesh
                                                    </Link>
                                                </motion.div>
                                                <motion.div
                                                    custom={1}
                                                    variants={itemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                >
                                                    <Link 
                                                        href="/blog/" 
                                                        className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        Blogu
                                                    </Link>
                                                </motion.div>
                                                <motion.div
                                                    custom={2}
                                                    variants={itemVariants}
                                                    initial="closed"
                                                    animate="open"
                                                >
                                                    <Link 
                                                        href="/pyetje-te-shpeshta/" 
                                                        className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-3 rounded-lg hover:bg-white/5"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        Pyetje të Shpeshta
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Direct Links */}
                            <div className="space-y-1 pt-4 border-t border-white/20 mt-4">
                                <Link 
                                    href="/galeria-e-projekteve/" 
                                    className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-white/5"
                                    onClick={closeMobileMenu}
                                >
                                    Galeria
                                </Link>
                                <Link 
                                    href="/kontakti/" 
                                    className="block text-sm font-medium text-white/90 hover:text-primary transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-white/5"
                                    onClick={closeMobileMenu}
                                >
                                    Kontakti
                                </Link>
                            </div>
                        </nav>
                    </div>

                    {/* Action Buttons - Fixed at Bottom */}
                    <div className="p-3 border-t border-white/20 bg-black/95 backdrop-blur-sm">
                        <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm" className="flex-1 text-xs font-medium border-white/20 text-[#2E2E2E] hover:bg-white/10 hover:border-white/30 px-2 py-2">
                                <Link href={`tel:${getPhoneTel()}`} className="flex items-center justify-center gap-1" onClick={closeMobileMenu} aria-label={`Telefononi në ${getPhoneDisplay()}`}>
                                    <Phone className="h-3 w-3" />
                                    <span className="whitespace-nowrap">Telefono</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex-1 text-xs font-medium border-white/20 text-[#2E2E2E] hover:bg-white/10 hover:border-white/30 px-2 py-2">
                                <Link href="/kontakti/" onClick={closeMobileMenu} aria-label="Kërkoni konsultë falas">
                                    <span className="whitespace-nowrap">Konsultë</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </header>
    )
}
