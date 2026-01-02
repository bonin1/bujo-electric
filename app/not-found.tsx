import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';
import { Home, Phone, Zap, AlertTriangle } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/business-config';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#042946] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />
      
      {/* Electrical Lines Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 20 Q 25 10 50 20 T 100 20" fill="none" stroke="white" strokeWidth="0.1" />
          <path d="M0 50 Q 25 40 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.1" />
          <path d="M0 80 Q 25 70 50 80 T 100 80" fill="none" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 px-4 text-center">
        {/* 404 Icon */}
        <div className="mb-8 relative inline-block">
          <div className="text-[12rem] md:text-[16rem] font-black text-white/5 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 rotate-12 animate-bounce">
              <Zap className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Lidhja u Shkëput!
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Faqja që po kërkoni duket se ka pësuar një &quot;shkurtim elektrik&quot;. 
          Mos u shqetësoni, {BUSINESS_INFO.name} është këtu për t&apos;ju rikthyer dritën!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-primary/20 group">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Kthehu në Ballinë
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl backdrop-blur-sm">
            <Link href="/kontakti/" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Na Kontaktoni
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            Nëse mendoni se ky është një gabim teknik, ju lutem na njoftoni.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
