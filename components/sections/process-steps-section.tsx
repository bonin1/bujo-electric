import React from 'react';
import { MessageCircle, Palette, Hammer, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

interface ProcessStepsSectionProps {
  city?: string;
  cityData?: {
    sectionContent?: {
      process?: {
        heading?: string;
        subheading?: string;
        steps?: Array<{
          title: string;
          description: string;
        }>;
      };
    };
  };
}

const ProcessStepsSection = ({ city, cityData }: ProcessStepsSectionProps) => {
  // Get city-specific process content or use defaults
  const processContent = cityData?.sectionContent?.process;
  const heading = processContent?.heading || `Our Simple Process${city ? ` in ${city}` : ''}`;
  const subheading = processContent?.subheading || (city
    ? `From initial consultation to ongoing maintenance, we make bringing your vision to life simple and stress-free. Our ${city}-based team ensures fast response times and personalized service every step of the way.`
    : `From initial consultation to ongoing maintenance, we make bringing your vision to life simple and stress-free.`
  );

  // Default steps
  const defaultSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We start with a free consultation to understand your vision, assess your space, and discuss your project goals.",
      icon: <MessageCircle className="w-8 h-8 text-primary" />
    },
    {
      number: "02", 
      title: "Custom Design",
      description: "Our expert team creates a detailed plan tailored to your space, budget, and preferences with professional renderings.",
      icon: <Palette className="w-8 h-8 text-primary" />
    },
    {
      number: "03",
      title: "Professional Installation",
      description: "Our skilled team handles the complete installation process with minimal disruption to your daily routine.",
      icon: <Hammer className="w-8 h-8 text-primary" />
    },
    {
      number: "04",
      title: "Ongoing Support",
      description: "We provide comprehensive maintenance services and support to keep your investment protected year-round.",
      icon: <Wrench className="w-8 h-8 text-primary" />
    }
  ];

  // Icon array
  const icons = [
    <MessageCircle key="1" className="w-8 h-8 text-primary" />,
    <Palette key="2" className="w-8 h-8 text-primary" />,
    <Hammer key="3" className="w-8 h-8 text-primary" />,
    <Wrench key="4" className="w-8 h-8 text-primary" />
  ];

  // Use city-specific steps if available, otherwise use defaults
  const steps = processContent?.steps
    ? processContent.steps.map((step, index) => ({
        number: `0${index + 1}`,
        title: step.title,
        description: step.description,
        icon: icons[index] || <Hammer key={index} className="w-8 h-8 text-primary" />
      }))
    : defaultSteps;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header - Server-rendered with animation */}
        <ScrollRevealUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {heading}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subheading}
            </p>
          </div>
        </ScrollRevealUp>

        <div className="relative">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <ScrollRevealScale
                key={step.number}
                delay={0.1 * index}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 border border-border/50 hover:border-primary/20 group">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-6">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}
              </ScrollRevealScale>
            ))}
          </div>
        </div>

        {/* Bottom CTA - Server-rendered with animation */}
        <ScrollRevealUp delay={0.4}>
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              {city 
                ? `Ready to start your project in ${city}? Our local team is standing by to help.`
                : `Ready to start your project journey?`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </ScrollRevealUp>
      </div>
    </section>
  );
};

export default ProcessStepsSection;

