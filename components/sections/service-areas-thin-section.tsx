'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Zap, ChevronDown } from 'lucide-react';
import cities from '@/data/cities.json';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

const ServiceAreasThinSection = () => {
  const router = useRouter();
  const serviceAreas = cities.cities.map(city => ({
      name: city.name,
      state: city.state,
      href: `/${city.slug}/`
    }))

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="lg:col-span-5">
            <ScrollRevealUp>
              
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                Zonat tona të Shërbimit
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-7xl">
                Ne ofrojmë shërbime elektrike profesionale në të gjithë Kosovën, me fokus të veçantë në rajonin e Rrafshit të Dukagjinit. Ekipi ynë është i gatshëm të ndërhyjë shpejt në çdo lokacion.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Ndërhyrje e Shpejtë</h4>
                    <p className="text-gray-500">Brenda 60 minutave në zonat urbane.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Mbulim i Plotë</h4>
                    <p className="text-gray-500">Nga Prishtina deri në qytetin më të largët.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/zonat-e-sherbimit/"
                className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl hover:bg-primary/90 font-bold transition-all duration-300 shadow-xl shadow-primary/20 group"
              >
                Shiko të gjitha zonat
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollRevealUp>
          </div>

          {/* Right Side: Map & Dropdown */}
          <div className="lg:col-span-7">
            <ScrollRevealScale>
              {/* Map Container */}
              <div className="relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 mb-8 group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377316.4629976498!2d20.1!3d42.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1352f00000000001%3A0x0!2zUnJhZnNoaSBpIER1a2FnamluaXQ!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  title="Harta e Rrafshit të Dukagjinit"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="font-bold text-gray-900">Rrafshi i Dukagjinit</p>
                      <p className="text-xs text-gray-500">Zonë e Mbuluar 100%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                <label className="block text-gray-900 font-bold mb-4 text-lg">Zgjidhni Qytetin Tuaj</label>
                <div className="relative group">
                  <select 
                    className="w-full p-5 pr-12 rounded-2xl border border-gray-200 bg-white text-gray-900 font-medium appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer shadow-sm hover:border-primary/50"
                    onChange={(e) => {
                      if (e.target.value) router.push(e.target.value);
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Zgjidhni një qytet...</option>
                    {serviceAreas.map(area => (
                      <option key={area.name} value={area.href}>{area.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </ScrollRevealScale>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasThinSection;

