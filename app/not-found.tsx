import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons/Button';
import { Home, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/business-config';

const NotFound = () => {
  return (
    <div className="h-min-screen flex items-center py-12 justify-center bg-background relative overflow-hidden">

      
      <div className="container py-12 mx-auto max-w-4xl relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Illustration */}
        <div className="mb-6">
          <div className="text-8xl md:text-9xl font-bold text-primary mb-8">404</div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          The page you&apos;re looking for seems to have vanished into the digital void. 
          Let&apos;s get you back on track with {BUSINESS_INFO.name}!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Link>
          </Button>
        </div>

        
      </div>
    </div>
  );
};

export default NotFound;
