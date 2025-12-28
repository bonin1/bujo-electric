import React from 'react';
import { Metadata } from 'next';
import { generateMetadataFromConfig, generateDynamicStructuredData } from '@/lib/seo-metadata';
import PortfolioPage from '@/templates/portfolio/portfolio-page';

// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/galeria-e-projekteve/');
}

const page = () => {
  // Generate structured data for portfolio page with custom portfolio schema
  const structuredData = generateDynamicStructuredData('/galeria-e-projekteve/');

  return (
    <>
      {/* Add structured data scripts */}
      {structuredData.map((script) => (
        <script
          key={script.id}
          type={script.type}
          dangerouslySetInnerHTML={{ __html: script.children }}
        />
      ))}
      
      <PortfolioPage />
    </>
  );
};

export default page;
