'use client';

import React from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import blogData from '@/data/blog-posts.json';
import { ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

interface RecentBlogsSectionProps {
  city?: string;
}

const RecentBlogsSection = ({ city }: RecentBlogsSectionProps) => {
  const recentPosts = blogData.blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-7xl">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Lajmet e Fundit{city ? ` nga ${city}` : ''}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Qëndroni të informuar me këshillat tona më të fundit mbi sigurinë elektrike dhe teknologjinë.
            </p>
          </div>
          <Button size="lg" asChild className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-10 py-7 rounded-2xl shadow-sm group shrink-0">
            <Link href="/blog/">
              Shiko të gjitha Lajmet
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <ScrollRevealScale key={post.id} delay={0.1 * index}>
              <Link href={`/${post.slug}/`} className="group block h-full">
                <article className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(post.publishedAt).toLocaleDateString('sq-AL', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-200" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <span className="text-xs">Bujo Electric</span>
                      </div>
                      <div className="text-primary font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                        Lexo më shumë <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollRevealScale>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogsSection;
