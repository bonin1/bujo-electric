'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import servicesData from '@/data/services.json';

interface ServiceItem {
  title: string;
  slug: string;
  children?: ServiceItem[];
}

interface ServicesSidebarProps {
  currentSlug?: string;
}

const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ currentSlug }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Get services structure from services.json
  const servicesStructure: ServiceItem[] = useMemo(() => {
    // Get all core services
    const coreServices = servicesData.services.filter(service => service.isCore);
    
    // Build hierarchical structure
    return coreServices.map(coreService => {
      // Get subservices for this core service
      const subservices = servicesData.services
        .filter(service => service.parentService === coreService.id)
        .map(subservice => ({
          title: subservice.name,
          slug: subservice.slug
        }));
      
      return {
        title: coreService.name,
        slug: coreService.slug,
        children: subservices.length > 0 ? subservices : undefined
      };
    });
  }, []);

  // Auto-expand main categories and show current path
  useEffect(() => {
    if (currentSlug) {
      const findParentSlugs = (items: ServiceItem[], targetSlug: string, parentSlugs: string[] = []): string[] => {
        for (const item of items) {
          if (item.slug === targetSlug) {
            return parentSlugs;
          }
          if (item.children) {
            const found = findParentSlugs(item.children, targetSlug, [...parentSlugs, item.slug]);
            if (found.length > 0) {
              return found;
            }
          }
        }
        return [];
      };
      
      const parentSlugs = findParentSlugs(servicesStructure, currentSlug);
      // Always keep main categories expanded + current path
      const mainCategories = servicesStructure.map(item => item.slug);
      setExpandedItems([...mainCategories, ...parentSlugs]);
    } else {
      // If no current slug, expand all main categories
      const mainCategories = servicesStructure.map(item => item.slug);
      setExpandedItems(mainCategories);
    }
  }, [currentSlug, servicesStructure]);

  const isActive = (slug: string) => currentSlug === slug;
  const isParentActive = (item: ServiceItem): boolean => {
    if (isActive(item.slug)) return true;
    if (item.children) {
      return item.children.some(child => isParentActive(child));
    }
    return false;
  };

  const toggleExpanded = (slug: string) => {
    setExpandedItems(prev => 
      prev.includes(slug) 
        ? prev.filter(item => item !== slug)
        : [...prev, slug]
    );
  };

  const renderServiceItem = (item: ServiceItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = expandedItems.includes(item.slug);
    const active = isActive(item.slug);
    const parentActive = isParentActive(item);

    return (
      <li key={item.slug} className="mb-1">
        <div className="flex items-center gap-1">
          {/* Clickable area for parent items with children */}
          {hasChildren ? (
            <>
              {/* Service Name - Clickable Link */}
              <Link
                href={`/${item.slug}`}
                className={`flex-1 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                  active
                    ? 'bg-primary text-primary-foreground font-medium shadow-md'
                    : parentActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : level === 0
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                } ${level > 0 ? 'ml-4' : ''}`}
              >
                {item.title}
              </Link>
              {/* Arrow Button - Controls Expand/Collapse */}
              <button
                onClick={() => toggleExpanded(item.slug)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={expanded ? `Collapse ${item.title}` : `Expand ${item.title}`}
              >
                <svg
                  className={`w-4 h-4 transition-all duration-300 text-gray-500 ${expanded ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : (
            <Link
              href={`/${item.slug}`}
              className={`flex-1 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                active
                  ? 'bg-primary text-primary-foreground font-medium shadow-md'
                  : parentActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : level === 0
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              } ${level > 0 ? 'ml-4' : ''}`}
            >
              {item.title}
            </Link>
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            hasChildren && expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {hasChildren && item.children && (
            <ul className="mt-2 space-y-1 ml-2 transform transition-all duration-300">
              {item.children.map(child => renderServiceItem(child, level + 1))}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Our Services
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
            aria-label={isExpanded ? "Collapse services" : "Expand services"}
          >
            <svg
              className={`w-4 h-4 transition-all duration-300 text-gray-500 hover:text-gray-700 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Services List */}
      <div className="p-4">
        <nav className="space-y-2">
          {isExpanded && (
            <ul className="space-y-2">
              {servicesStructure.map(item => renderServiceItem(item))}
            </ul>
          )}
        </nav>
      </div>
      
      {/* Call to Action */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Anything you need, we&apos;ve got you covered!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesSidebar;
