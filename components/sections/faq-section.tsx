'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Header */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Gjithçka që duhet të dini për shërbimet tona
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-7xl">
                Ne jemi këtu për t&apos;ju ndihmuar. Nëse nuk e gjeni përgjigjen që kërkoni, mos hezitoni të na kontaktoni direkt.
              </p>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Nuk gjetët atë që kërkonit?</h4>
                <p className="text-gray-600 mb-6">Ekipi ynë është i gatshëm t&apos;ju përgjigjet në çdo kohë.</p>
                <Link 
                  href="/kontakti/" 
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Na Kontaktoni
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`group rounded-2xl border transition-all duration-300 ${
                    activeIndex === index 
                      ? 'border-primary bg-primary/[0.02] shadow-md' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className={`text-lg font-bold transition-colors duration-300 ${
                      activeIndex === index ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 p-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className="h-px w-full bg-gray-100 mb-6" />
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


