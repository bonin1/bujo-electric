import React from 'react';
import { Metadata } from 'next';
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata';
import TermsPage from '@/templates/legal/terms-page';

// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/terms/');
}

const page = () => {
  // Generate structured data for terms page
  const structuredData = generateStructuredData('/terms/');

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
      
      <TermsPage />
    </>
  );
};

export default page;
