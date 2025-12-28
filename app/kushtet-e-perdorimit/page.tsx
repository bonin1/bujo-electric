import React from 'react';
import { Metadata } from 'next';
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata';
import TermsPage from '@/templates/legal/terms-page';

// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/kushtet-e-perdorimit/');
}

const page = () => {
  // Generate structured data for terms page
  const structuredData = generateStructuredData('/kushtet-e-perdorimit/');

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
