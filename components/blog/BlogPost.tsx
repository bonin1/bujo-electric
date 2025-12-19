"use client";
import React, { useState, useEffect } from 'react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import {  Copy, Check, Share2 } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/business-config';
import { BrandX } from '@/components/ui/icons/brand-icons';
import DynamicHeading from '@/components/global/dynamic-header/dynamic-header';


interface Author {
  name: string;
  bio: string;
  avatar: string;
}

interface Category {
  slug: string;
  name: string;
  description: string;
}

interface ImageData {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface Keyword {
  text: string;
  url: string;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonical: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
  tags: string[];
  image: ImageData;
  readTime: string;
  featured: boolean;
  status: string;
  seo: SEO;
  highlights: string[];
  keywords: Keyword[];
  interlinking: string[];
  relatedPosts: string[];
}

interface BlogPostProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, relatedPosts = [] }) => {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // Check if Web Share API is supported AND we're on a mobile device
  // Only check on client-side to prevent hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasShareAPI = 'share' in navigator;
    setCanShare(hasShareAPI && isMobile);
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Modern share function using Web Share API (W3C standard)
  const handleNativeShare = async () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }
    const shareData = {
      title: post.title,
      text: `Check out ${BUSINESS_INFO.name} article: ${post.title}`,
      url: window.location.href,
    };

    // Check if Web Share API is supported and data is shareable
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  // Share functions that open in new tabs
  const shareToTwitter = () => {
    if (typeof window === 'undefined') {
      return;
    }
    const text = `Check out ${BUSINESS_INFO.name} article: ${post.title}`;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyUrl = async () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // Convert markdown-style content to JSX (basic conversion)
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl md:text-2xl font-semibold text-foreground mb-4 mt-6">{line.substring(4)}</h3>;
        }
        if (line.startsWith('* ') && !line.startsWith('* *')) {
          return <li key={index} className="text-muted-foreground mb-2 ml-4">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        if (line.trim() !== '') {
          return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{line}</p>;
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>  
      <DynamicHeading title={post.title} image={post.image.url} breadcrumbs={[{ label: 'Blog', href: '/blog' }]} />
      {/* Article Content */}
      <article className="bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Author, Date, and Share Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 pb-8 border-b border-border">
            {/* Author and Date */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              
              {/* Native Share Button - Only shown if Web Share API is supported */}
              {canShare && (
                <button
                  onClick={handleNativeShare}
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={shareToTwitter}
                className="p-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                aria-label="Share on Twitter"
              >
                <BrandX className="w-4 h-4" />
              </button>
              <button
                onClick={copyUrl}
                className={`p-2 rounded-lg transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted-hover'
                }`}
                aria-label="Copy URL"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* More Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-bg-secondary py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/${relatedPost.category.slug}/${relatedPost.slug}`}
                  className="group block"
                >
                  <article className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image.url}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category.name}
                        </span>
                        <span className="text-muted-foreground text-sm">{relatedPost.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPost;