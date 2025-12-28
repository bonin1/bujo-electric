'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Wrench, Zap } from 'lucide-react';

import servicesData from '@/data/services.json';
import { Button } from '@/components/ui/buttons/Button';
import { ScrollRevealScale, ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';
import { cn } from '@/lib/utils';

type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: string;
  isCore?: boolean;
  parentService?: string | null;
};

export default function ServicesGrid() {
  const allServices = useMemo(() => (servicesData as { services: ServiceItem[] }).services ?? [], []);
  const coreServices = useMemo(() => allServices.filter((s) => s.isCore), [allServices]);

  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredAll = useMemo(() => {
    if (!normalizedQuery) return allServices;
    return allServices.filter((s) => {
      const haystack = `${s.name} ${s.description} ${s.category ?? ''}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [allServices, normalizedQuery]);

  return (
    <section className="relative bg-white py-24">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50rem] w-[50rem] rounded-full bg-secondary blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <ScrollRevealUp delay={0.1}>
            <h2 className="text-5xl font-black tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Shërbimet Tona <span className="text-primary">Elektrike</span>
            </h2>
          </ScrollRevealUp>

          <ScrollRevealUp delay={0.2}>
            <p className="mt-8 text-xl leading-relaxed text-gray-600 md:text-2xl font-medium max-w-3xl mx-auto">
              Zgjidhje të sigurta, moderne dhe të garantuara për çdo sfidë elektrike në shtëpinë ose biznesin tuaj.
            </p>
          </ScrollRevealUp>
        </div>

        {/* Featured Core Services */}
        <div className="mb-24">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <ScrollRevealUp>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Shërbimet Kryesore</h3>
            </ScrollRevealUp>
            <ScrollRevealUp delay={0.1}>
              <Button asChild size="lg" className="rounded-xl bg-primary px-8 py-6 text-lg text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-1">
                <Link href="/kontakti/">
                  Kërko Ofertë Falas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollRevealUp>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {coreServices.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <ScrollRevealScale key={service.slug} delay={index * 0.06}>
                  <div
                    className={cn(
                      'group relative overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl',
                      isEven ? 'bg-primary' : 'bg-secondary'
                    )}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex flex-col items-start gap-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-lg transition-all duration-500 group-hover:scale-110 shadow-lg">
                          <Zap className="h-7 w-7" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-white tracking-tight leading-tight">{service.name}</h4>
                          <p className="mt-3 text-base leading-relaxed text-white/80 font-medium line-clamp-3">
                            {service.description || `Shërbim profesional për ${service.name.toLowerCase()} me standarde të larta sigurie.`}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center gap-3 text-lg font-black text-white transition-all">
                        <Link href={`/${service.slug}/`} className="inline-flex items-center gap-3 group/link">
                          <span className="border-b-2 border-white/20 transition-all group-hover/link:border-white">Detajet</span>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all group-hover/link:bg-white group-hover/link:text-primary group-hover/link:scale-110">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollRevealScale>
              );
            })}
          </div>
        </div>

        {/* All Services Search Grid */}
        <div className="rounded-[3rem] border border-gray-100 bg-gray-50/30 p-8 shadow-xl md:p-12">
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <ScrollRevealUp>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Të gjitha shërbimet</h3>
              </ScrollRevealUp>
              <ScrollRevealUp delay={0.1}>
                <p className="mt-4 text-lg text-gray-600 font-medium leading-relaxed">
                  Kërkoni shërbimin specifik që ju nevojitet.
                </p>
              </ScrollRevealUp>
            </div>

            <ScrollRevealUp delay={0.15}>
              <div className="relative w-full lg:w-[400px]">
                <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Kërko shërbimin..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-14 pr-6 text-lg text-gray-900 shadow-lg outline-none transition-all focus:border-primary/40 focus:ring-4 focus:ring-primary/5"
                />
              </div>
            </ScrollRevealUp>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAll.map((service, index) => (
              <ScrollRevealScale key={service.slug} delay={Math.min(index * 0.02, 0.25)}>
                <Link
                  href={`/${service.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white shadow-sm">
                      {service.isCore ? <Zap className="h-6 w-6" /> : <Wrench className="h-6 w-6" />}
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-gray-900 transition-colors group-hover:text-primary tracking-tight">
                    {service.name}
                  </h4>
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-gray-600 font-medium">
                    {service.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-3 text-sm font-black text-gray-900 transition-all group-hover:text-primary">
                    <span className="border-b-2 border-gray-100 pb-0.5 transition-all group-hover:border-primary">Hap detajet</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollRevealScale>
            ))}
          </div>

          {filteredAll.length === 0 && (
            <div className="mt-20 text-center text-2xl font-bold text-gray-400">
              Nuk u gjet asnjë shërbim për kërkimin tuaj.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <ScrollRevealUp>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Button asChild size="lg" className="rounded-2xl bg-primary px-12 py-8 text-xl text-white shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-1">
                <Link href="/kontakti/">
                  Na Kontaktoni
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl border-gray-200 px-12 py-8 text-xl hover:bg-gray-50 transition-all hover:-translate-y-1">
                <Link href="/zonat-e-sherbimit/">Zonat e Shërbimit</Link>
              </Button>
            </div>
          </ScrollRevealUp>
        </div>
      </div>
    </section>
  );
}

