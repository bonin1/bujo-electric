import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { ModernNavbar } from "@/components/global/header/modern-navbar/navbar";
import {FooterMaps} from "@/components/global/footer/footer-maps";
import { siteConfig } from '@/lib/seo-config';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

// Simple layout metadata - let pages handle their own SEO
export const metadata: Metadata = {
  
  // Favicon configuration
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },
  
  // Additional layout-specific metadata
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
  
  // Resource hints for performance
  other: {
    'dns-prefetch': 'https://www.google.com https://maps.google.com https://maps.googleapis.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen overflow-x-hidden`}>
        <ModernNavbar />
        <main className="grow">
          {children}
        </main>
        <FooterMaps />
      </body>
    </html>
  );
}
