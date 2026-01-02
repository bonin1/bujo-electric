'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { DynamicHeader } from '@/components/global/dynamic-header';
import faqData from '@/data/faq.json';
import { getPhoneDisplay, getPhoneTel } from '@/lib/business-config';
import Link from 'next/link';


export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Use only FAQs from faq.json - no service FAQs
  const allFAQs = faqData.faqs.map(faq => ({ ...faq, id: faq.id.toString() }));

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allFAQs.map(faq => faq.category)))];

  // Filter FAQs based on category and search term
  const filteredFAQs = allFAQs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string, question: string) => {
    const isCurrentlyExpanded = expandedItems.includes(id);
    
    setExpandedItems(prev => 
      isCurrentlyExpanded
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    
  };

  const isExpanded = (id: string) => expandedItems.includes(id);

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Header */}
      <DynamicHeader 
        title="Pyetjet e Shpeshta"
        description="Gjeni përgjigje për pyetjet e zakonshme rreth shërbimeve tona elektrike. Nuk e gjeni atë që kërkoni? Na kontaktoni për asistencë të personalizuar."
        image="/assets/images/services/19.webp"
        breadcrumbs={[
          { label: 'Pyetjet e Shpeshta', href: '/pyetje-te-shpeshta/' }
        ]}
      />

      {/* FAQ Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-1/3 h-full">
            <Image
              src="/assets/images/services/11.webp"
              alt="FAQ background"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <Image
              src="/assets/images/services/12.webp"
              alt="FAQ background"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          {/* Search and Filter */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gray-50 rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-sm">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Si mund t'ju ndihmojmë?</h2>
                <p className="text-lg text-gray-500 font-medium">Kërkoni në bazën tonë të njohurive ose zgjidhni një kategori më poshtë.</p>
              </div>

              {/* Search Bar */}
              <div className="relative mb-10 max-w-2xl mx-auto">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Kërko pyetje..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-8 py-6 bg-white border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-lg shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    {category === 'All' ? 'Të Gjitha' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-xl font-medium">
                  Nuk u gjet asnjë pyetje që përputhet me kërkimin tuaj.
                </p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Pastro kërkimin
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFAQs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className={`group border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-500 ${
                      isExpanded(faq.id) ? 'bg-white shadow-2xl shadow-gray-200/50 border-primary/20' : 'bg-gray-50 hover:bg-white hover:shadow-xl'
                    }`}
                  >
                    <button
                      onClick={() => toggleExpanded(faq.id, faq.question)}
                      className="w-full px-8 py-8 text-left transition-colors duration-300 flex items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className={`text-xl md:text-2xl font-black leading-tight transition-colors duration-300 ${
                          isExpanded(faq.id) ? 'text-primary' : 'text-gray-900'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isExpanded(faq.id) ? 'bg-primary text-white rotate-180' : 'bg-white text-gray-400 group-hover:text-primary'
                      }`}>
                        <ChevronDown className="w-6 h-6" />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded(faq.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-8 pb-8 pt-2">
                        <div className="h-px bg-gray-100 mb-8" />
                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-24">
            <div className="bg-gray-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                  Keni ende pyetje?
                </h3>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
                  Nëse nuk e gjetët përgjigjen që kërkoni, ne jemi të gatshëm t'ju ndihmojmë në çdo kohë.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/kontakti/"
                    className="inline-flex items-center justify-center bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                  >
                    Na Kontaktoni
                  </Link>
                  <Link
                    href={`tel:${getPhoneTel()}`}
                    className="inline-flex items-center justify-center bg-white/10 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-gray-900 transition-all"
                  >
                    Telefono {getPhoneDisplay()}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
