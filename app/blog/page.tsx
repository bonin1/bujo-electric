import React from 'react';
import { Metadata } from 'next';
import { generateMetadataFromConfig, generateStructuredData } from '@/lib/seo-metadata';
import BlogIndex from '@/components/blog/BlogIndex';
import blogData from '@/data/blog-posts.json';

export const metadata: Metadata = generateMetadataFromConfig('/blog/');

export default function BlogPage() {
  const { blogPosts, categories, tags } = blogData;
  const structuredData = generateStructuredData('/blog/');

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
      <BlogIndex 
        posts={blogPosts} 
        categories={categories} 
        tags={tags} 
      />
    </>
  );
}

