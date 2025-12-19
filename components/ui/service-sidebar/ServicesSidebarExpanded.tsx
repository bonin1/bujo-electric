'use client';
import React from 'react';
import Link from 'next/link';

interface ServiceItem {
  title: string;
  slug: string;
  children?: ServiceItem[];
}

interface ServicesSidebarProps {
  currentSlug?: string;
}

const ServicesSidebarExpanded: React.FC<ServicesSidebarProps> = ({ currentSlug }) => {
  const servicesData: ServiceItem[] = [
    {
      title: "Garage Door Services",
      slug: "garage-door-installation",
      children: [
        { title: "Garage Door Installation", slug: "garage-door-installation" },
        { title: "Garage Door Repair", slug: "garage-door-repair" },
        { title: "Garage Door Maintenance", slug: "garage-door-maintenance" }
      ]
    },
    {
      title: "Garage Door Openers",
      slug: "garage-door-openers",
      children: [
        { title: "Garage Door Opener Installation", slug: "garage-door-opener-installation" },
        { title: "Garage Door Opener Repair", slug: "garage-door-opener-repair" }
      ]
    },
    {
      title: "Garage Door Replacement",
      slug: "garage-door-replacement",
      children: [
        { title: "Steel Garage Doors", slug: "steel-garage-doors" },
        { title: "Wooden Garage Doors", slug: "wooden-garage-doors" },
        { title: "Glass & Aluminum Garage Doors", slug: "glass-aluminum-garage-doors" },
        { title: "Insulated Garage Doors", slug: "insulated-garage-doors" }
      ]
    }
  ];

  const isActive = (slug: string) => currentSlug === slug;
  const isParentActive = (item: ServiceItem): boolean => {
    if (isActive(item.slug)) return true;
    if (item.children) {
      return item.children.some(child => isParentActive(child));
    }
    return false;
  };

  const renderServiceItem = (item: ServiceItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.slug);
    const parentActive = isParentActive(item);

    return (
      <li key={item.slug} className="mb-1">
        <Link
          href={`/${item.slug}`}
          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
            active
              ? 'bg-gray-800 text-white font-semibold shadow-md'
              : parentActive
              ? 'bg-gray-100 text-gray-800 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          } ${level > 0 ? 'ml-4' : ''}`}
        >
          {item.title}
        </Link>
        {hasChildren && item.children && (
          <ul className="mt-1 space-y-1 ml-2">
            {item.children.map(child => renderServiceItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h5 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        Our Services
      </h5>
      <nav className="space-y-1">
        <ul className="space-y-1">
          {servicesData.map(item => renderServiceItem(item))}
        </ul>
      </nav>
      
      {/* Call to Action */}
      <div className="mt-8 p-4 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg text-white">
        <h3 className="text-lg font-semibold mb-2">
          Transform your space, inspire your life!
        </h3>
        <Link
          href="/contact-us"
          className="inline-block bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          Call Now
        </Link>
      </div>
    </div>
  );
};

export default ServicesSidebarExpanded;
