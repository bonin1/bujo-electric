import { Metadata } from 'next';
import { generateMetadataFromConfig } from '@/lib/seo-metadata';

export const metadata: Metadata = generateMetadataFromConfig('/blog');

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
