import React from 'react';
import { Metadata } from 'next';
import { generateMetadataFromConfig, generateDynamicStructuredData } from '@/lib/seo-metadata';
import FAQPage from '@/templates/faq/faq-page';
import faqData from '@/data/faq.json';
import { siteConfig } from '@/lib/seo-config';

// Generate metadata using the hybrid approach
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromConfig('/faq/');
}

const page = () => {
  // Use only FAQs from faq.json - no service FAQs
  const allFAQs = faqData.faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  // Generate structured data for FAQ page
  const structuredData = generateDynamicStructuredData('/faq/', {
    faqData: {
      questions: allFAQs
    },
    breadcrumbs: [
      { name: 'Home', url: siteConfig.url },
      { name: 'FAQ', url: `${siteConfig.url}/faq/` }
    ]
  });

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
      
      <FAQPage />
    </>
  );
};

export default page;
