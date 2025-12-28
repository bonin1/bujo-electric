'use client';

import React, { useState, useMemo } from 'react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { Calendar, Clock, User, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/buttons';
import { DynamicHeader } from '@/components/global/dynamic-header';
import { ScrollRevealUp } from '@/components/ui/animations/scroll-reveal';

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

interface BlogIndexProps {
  posts: BlogPost[];
  categories?: Array<{
    id: string;
    slug: string;
    name: string;
    description: string;
    color: string;
    icon: string;
  }>;
  tags?: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts, categories = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date');

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sq-AL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter and sort posts based on search and filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category.slug === selectedCategory);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'readTime':
          return parseInt(a.readTime) - parseInt(b.readTime);
        case 'date':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicHeader 
        title="Blogu & Lajmet" 
        description="Këshilla ekspertësh, udhëzues dhe informacione për mirëmbajtjen e rrjetit tuaj elektrik." 
        image="/assets/images/services/8.webp"
        breadcrumbs={[{ label: 'Blogu', href: '/blog/' }]} 
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-16">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Kërko artikuj..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 lg:flex-none px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Të Gjitha Kategoritë</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                  className="flex-1 lg:flex-none px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="date">Më të fundit</option>
                  <option value="title">Sipas Titullit</option>
                  <option value="readTime">Koha e leximit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post, index) => (
                <ScrollRevealUp key={post.id} delay={index * 0.1}>
                  <Link href={`/${post.slug}/`} className="group block h-full">
                    <article className="h-full bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col">
                      <div className="relative h-72 overflow-hidden">
                        <Image
                          src={post.image.url}
                          alt={post.image.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                            {post.category.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-10 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-500 text-base line-clamp-3 mb-8 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                              BE
                            </div>
                            <span className="text-sm font-bold text-gray-900">Bujo Electric</span>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollRevealUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Nuk u gjet asnjë artikull</h3>
              <p className="text-gray-500">Provoni të kërkoni me terma të tjerë ose pastroni filtrat.</p>
              <Button 
                variant="outline" 
                className="mt-8 rounded-full px-8"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
              >
                Pastro Filtrat
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;

