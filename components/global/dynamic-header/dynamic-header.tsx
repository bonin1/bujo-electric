import React from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/buttons';
import { ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

interface CTAButton {
  text: string;
  link: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface DynamicHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badges?: string[];
  cta?: {
    primary?: CTAButton;
    secondary?: CTAButton;
  };
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

const DynamicHeader: React.FC<DynamicHeaderProps> = ({ 
  title,
  subtitle,
  description,
  image = "/assets/config/placeholder-image.png",
  badges,
  cta,
  breadcrumbs,
  className = ""
}) => {

  return (
    <div className={`relative min-h-[60vh] flex justify-center align-center pt-20 items-center bg-linear-to-br from-primary via-primary-hover to-accent overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={image} 
          alt={title}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary/70 via-primary-hover/70 to-accent/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="text-center max-w-4xl mx-auto">
            
           {/* Subtitle */}
            {subtitle && (
              <ScrollRevealUp delay={0.4}>
                <h2 className="text-xl md:text-2xl text-text-light/90 mb-2 font-medium">
                  {subtitle}
                </h2>
              </ScrollRevealUp>
            )}

            
            
            {/* Title */}
            <ScrollRevealUp delay={0.3}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-text-light">
                {title}
              </h1>
            </ScrollRevealUp>

            

            {/* Description */}
            {description && (
              <ScrollRevealUp delay={0.2}>
                <p className="text-lg text-text-light/80 mb-1 leading-relaxed max-w-3xl mx-auto">
                  {description}
                </p>
              </ScrollRevealUp>
            )}


            

            {/* CTA Buttons */}
            {cta && (
              <ScrollRevealUp delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-8 justify-center mb-8">
                {cta.primary && (
                  <Button
                    asChild
                    variant={cta.primary.variant || 'default'}
                    size={cta.primary.size || 'lg'}
                  >
                    <Link href={cta.primary.link}>
                      {cta.primary.text}
                    </Link>
                  </Button>
                )}
                {cta.secondary && (
                  <Button
                    asChild
                    variant={cta.secondary.variant || 'outline'}
                    size={cta.secondary.size || 'lg'}
                  >
                    <Link href={cta.secondary.link}>
                      {cta.secondary.text}
                    </Link>
                  </Button>
                )}
                </div>
              </ScrollRevealUp>
            )}
             {/* Breadcrumbs */}
             {breadcrumbs && breadcrumbs.length > 0 && (
              <ScrollRevealUp delay={0.1}>
                <nav className="flex items-center justify-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
                  <Link href="/" className="flex items-center gap-1 text-text-light/70 hover:text-text-light transition-colors">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                      <ChevronRight className="w-4 h-4 text-text-light/40" />
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-text-light font-medium">{crumb.label}</span>
                      ) : (
                        <Link href={crumb.href} className="text-text-light/70 hover:text-text-light transition-colors">
                          {crumb.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              </ScrollRevealUp>
            )}
            {/* Badges */}
            {badges && badges.length > 0 && (
              <ScrollRevealUp delay={0.5}>
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm text-text-light rounded-full text-sm font-medium border border-white/20"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </ScrollRevealUp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicHeader;
