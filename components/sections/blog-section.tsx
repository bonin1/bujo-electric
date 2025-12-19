import React from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import blogData from '@/data/blog-posts.json';
import { ScrollRevealUp, ScrollRevealScale } from '@/components/ui/animations/scroll-reveal';

interface RecentBlogsSectionProps {
  city?: string;
}

const RecentBlogsSection = ({ city }: RecentBlogsSectionProps) => {
  // Server-side data preparation - sorted and sliced for FREE!
  const recentPosts = blogData.blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Server-rendered with animation */}
        <ScrollRevealUp>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Recent Blog Posts{city ? ` from ${city}` : ''}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {city
                ? `Stay informed with our latest insights on maintenance, installation tips, and industry trends specific to ${city} properties. Our expert team shares valuable local knowledge to help you maintain safe, functional systems.`
                : `Stay informed with our latest insights on maintenance, installation tips, and industry trends. Our expert team shares valuable tips and techniques to help you maintain safe, functional systems.`
              }
            </p>
          </div>
        </ScrollRevealUp>

        {/* Blog Grid - Server-rendered with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {recentPosts.map((post, index) => (
            <ScrollRevealScale key={post.id} delay={0.1 * index}>
              <Link href={`/${post.slug}/`} className="group block">
                <article className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {post.category.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </ScrollRevealScale>
          ))}
        </div>

        {/* CTA Button - Server-rendered with animation */}
        <ScrollRevealUp delay={0.4}>
          <div className="text-center">
            <Button size="lg" asChild className="group">
              <Link href="/blog/">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Blog Posts
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </ScrollRevealUp>
      </div>
    </section>
  );
};

export default RecentBlogsSection;
