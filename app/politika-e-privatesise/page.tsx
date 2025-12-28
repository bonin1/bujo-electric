import React from 'react';
import { Metadata } from 'next';
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata';
import PrivacyPage from '@/templates/legal/privacy-page';

// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/politika-e-privatesise/');
}

const page = () => {
  // Generate structured data for privacy policy page
  const structuredData = generateStructuredData('/politika-e-privatesise/');

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
      
      <PrivacyPage />
    </>
  );
};

export default page;
