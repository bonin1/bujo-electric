'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { DynamicHeader } from '@/components/global/dynamic-header';
import faqData from '@/data/faq.json';

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
        title="Frequently Asked Questions"
        description="Find answers to common questions about our garage door services. Can't find what you're looking for? Contact us for personalized assistance."
        image="/assets/config/placeholder-image.png"
        breadcrumbs={[
          { label: 'FAQ', href: '/faq/' }
        ]}
      />

      {/* FAQ Section */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {selectedCategory === 'All' ? 'All Questions' : `${selectedCategory} Questions`}
                {searchTerm && ` - "${searchTerm}"`}
              </h2>

              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No FAQs found matching your criteria. Try adjusting your search or category filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleExpanded(faq.id, faq.question)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 leading-relaxed pr-4">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="shrink-0">
                          {isExpanded(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 py-4 bg-white">
                          <p className="text-gray-600 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our team is here to help with any questions about our garage door services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact/"
                  className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="tel:(555)123-4567"
                  className="inline-flex items-center bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Call (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
