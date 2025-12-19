'use client';

import React, { useState, useMemo } from 'react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';
import { Calendar, Clock, User, Tag, Search, ArrowLeft } from 'lucide-react';

interface Author {
  name: string;
  bio: string;
  avatar: string;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
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

interface Tag {
  slug: string;
  name: string;
  count: number;
}

interface BlogCategoryIndexProps {
  category: Category;
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  regularPosts: BlogPost[];
  allCategories: Category[];
  allTags: Tag[];
}

const BlogCategoryIndex: React.FC<BlogCategoryIndexProps> = ({ 
  category, 
  posts, 
  featuredPosts, 
  allCategories, 
  allTags 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date');

  // Filter and sort posts based on search and filters
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
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
  }, [posts, searchQuery, selectedTags, sortBy]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-text-dark">
                    {category.name}
                  </h1>
                  <p className="text-text-secondary">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-text-muted text-sm">
                <span>{posts.length} articles</span>
                <span>•</span>
                <span>Updated {formatDate(posts[0]?.publishedAt || new Date().toISOString())}</span>
              </div>
            </div>

            {/* Search and Sort Controls */}
            <div className="mb-8 bg-secondary p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'readTime')}
                  className="px-4 py-3 border border-border rounded-lg bg-background text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="readTime">Sort by Read Time</option>
                </select>
              </div>
              
              {/* Active Filters */}
              {(searchQuery || selectedTags.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-text-muted text-sm">Active filters:</span>
                  {searchQuery && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedTags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-accent/20"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag} ×
                    </span>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-text-muted hover:text-text-dark text-sm underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-text-dark mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64 lg:h-80">
                        <Image
                          src={post.image.url}
                          alt={post.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-text-dark mb-4 line-clamp-2">
                          <Link href={`/${category.slug}/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-text-secondary mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-text-muted text-sm mb-6">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Link href={`/${category.slug}/${post.slug}`}>
                          <Button className="w-full">
                            Read Article
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              <h2 className="text-2xl font-bold text-text-dark mb-6">
                {featuredPosts.length > 0 ? 'All Articles' : 'Articles'}
              </h2>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48">
                        <Image
                          src={post.image.url}
                          alt={post.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-text-dark mb-3 line-clamp-2">
                          <Link href={`/${category.slug}/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-text-muted text-sm mb-4">
                          <span>{post.author.name}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Link href={`/${category.slug}/${post.slug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-text-muted text-lg">No articles found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:text-primary/80 underline mt-2"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        cat.slug === category.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-dark hover:bg-background'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Filter by Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag.slug}
                      onClick={() => handleTagToggle(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag.name)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent/10 text-accent hover:bg-accent/20'
                      }`}
                    >
                      {tag.name} ({tag.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Popular in {category.name}</h3>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`/${category.slug}/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={post.image.url}
                            alt={post.image.alt}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-text-dark group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-text-muted mt-1">
                            {post.readTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-primary p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  Need Help?
                </h3>
                <p className="text-primary-foreground/90 text-sm mb-4">
                  Our experts are here to help with your {category.name.toLowerCase()} needs.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" size="sm" className="w-full">
                    Get Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryIndex;
