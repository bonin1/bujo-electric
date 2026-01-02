import React from 'react';
import { MessageCircle, Palette, Hammer, CheckCircle2 } from 'lucide-react';
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
  const processContent = cityData?.sectionContent?.process;
  const heading = processContent?.heading || `Procesi ynë i thjeshtë${city ? ` në ${city}` : ''}`;
  const subheading = processContent?.subheading || "Ne ndjekim një proces të strukturuar për të siguruar që çdo projekt të përfundojë me sukses dhe në kohë.";

  const defaultSteps = [
    {
      number: "01",
      title: "Konsulta Fillestare",
      description: "Diskutojmë kërkesat tuaja dhe bëjmë një vlerësim të detajuar të projektit pa asnjë kosto.",
      icon: <MessageCircle className="w-10 h-10" />
    },
    {
      number: "02", 
      title: "Planifikimi & Dizajni",
      description: "Krijojmë një plan të detajuar dhe ofrojmë një ofertë transparente bazuar në nevojat tuaja.",
      icon: <Palette className="w-10 h-10" />
    },
    {
      number: "03",
      title: "Realizimi i Punimeve",
      description: "Ne kryejmë instalimet me profesionalizëm dhe kujdes maksimal.",
      icon: <Hammer className="w-10 h-10" />
    },
    {
      number: "04",
      title: "Testimi & Dorëzimi",
      description: "Sigurohemi që gjithçka funksionon në mënyrë perfekte dhe dorëzojmë projektin e përfunduar.",
      icon: <CheckCircle2 className="w-10 h-10" />
    }
  ];

  const icons = [
    <MessageCircle key="1" className="w-10 h-10" />,
    <Palette key="2" className="w-10 h-10" />,
    <Hammer key="3" className="w-10 h-10" />,
    <CheckCircle2 key="4" className="w-10 h-10" />
  ];

  const steps = processContent?.steps
    ? processContent.steps.map((step, index) => ({
        number: `0${index + 1}`,
        title: step.title,
        description: step.description,
        icon: icons[index] || <Hammer key={index} className="w-10 h-10" />
      }))
    : defaultSteps;

  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollRevealUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              {heading}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {subheading}
            </p>
          </div>
        </ScrollRevealUp>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-white/10">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollRevealScale
                key={step.number}
                delay={0.1 * index}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-secondary border-2 border-white/10 group-hover:border-primary transition-all duration-500 flex items-center justify-center relative z-10 shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                      <div className="text-gray-400 group-hover:text-primary transition-colors duration-500 scale-75">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </ScrollRevealScale>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessStepsSection;

