import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize module resolution and tree-shaking
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react', '@radix-ui/react-icons'],
    // Better tree-shaking for icon libraries
    optimizeCss: true,
  },

  images: {
    imageSizes: [16, 32, 48, 64, 96, 128],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 90, 95, 100, 85, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self "https://www.google.com" "https://maps.google.com" "https://*.googleapis.com")',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.google.com https://*.googleapis.com https://*.google.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.google.com https://*.google.com https://*.gstatic.com; img-src 'self' data: https: blob: https://*.google.com https://*.gstatic.com https://*.googleapis.com; connect-src 'self' https://www.google.com https://maps.google.com https://*.googleapis.com https://*.google.com https://*.gstatic.com; font-src 'self' https://fonts.gstatic.com https://*.google.com; frame-src 'self' https://www.google.com https://maps.google.com https://*.googleapis.com https://*.google.com;",
          },
          {
            key: 'Accept-Encoding',
            value: 'gzip, compress, br',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
