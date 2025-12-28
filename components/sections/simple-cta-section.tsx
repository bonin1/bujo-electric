import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/buttons';
import Link from 'next/link';
import { BUSINESS_INFO, getPhoneDisplay, getPhoneTel } from '@/lib/business-config';

interface SimpleCTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function SimpleCTASection({
  title = "Ready to Get Started?",
  description = BUSINESS_INFO.ctaText,
  primaryButtonText = "Request Free Quote",
  primaryButtonHref = "/kontakti",
  secondaryButtonText = `Call Now: ${getPhoneDisplay()}`,
  secondaryButtonHref = `tel:${getPhoneTel()}`
}: SimpleCTASectionProps) {
  return (
    <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-xl p-8 sm:p-12 text-center shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-text-light mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href={primaryButtonHref} className="inline-flex items-center">
            {primaryButtonText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="bg-gray-700 text-text-light hover:bg-gray-600 border-white/30">
          <Link href={secondaryButtonHref} className="inline-flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            {secondaryButtonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}

