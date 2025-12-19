'use client';

import React, { useState, useMemo } from 'react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/buttons';

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

const BlogIndex: React.FC<BlogIndexProps> = ({ posts, categories = [], tags = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date');

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category.slug === selectedCategory);
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
  }, [posts, searchQuery, selectedCategory, selectedTags, sortBy]);

  // Separate featured and regular posts from filtered results
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
    setSelectedCategory('');
    setSelectedTags([]);
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
              Professional Services Blog
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-8">
              Expert tips, guides, and insights for maintaining your property in Example City, North Town, South Town, and East Village.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg bg-background text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
              {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  <span className="text-text-muted text-sm">Active filters:</span>
                  {searchQuery && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Search: {searchQuery}
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Category: {categories.find(c => c.slug === selectedCategory)?.name}
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
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-text-dark mb-6 text-center">Browse by Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    className="bg-background p-6 rounded-lg hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Tag className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-text-dark mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-text-dark mb-12 text-center">Featured Articles</h2>
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
                    <div className="mb-4">
                      <Link
                        href={`/blog/category/${post.category.slug}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        {post.category.name}
                      </Link>
                    </div>
                    <h3 className="text-2xl font-bold text-text-dark mb-4 line-clamp-2">
                      <Link href={`/${post.category.slug}/${post.slug}`} className="hover:text-primary transition-colors">
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
                    <Link href={`/${post.category.slug}/${post.slug}`}>
                      <Button className="w-full">
                        Read Article
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-text-dark mb-12 text-center">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
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
                  <div className="mb-3">
                    <Link
                      href={`/blog/category/${post.category.slug}`}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      {post.category.name}
                    </Link>
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-3 line-clamp-2">
                    <Link href={`/${post.category.slug}/${post.slug}`} className="hover:text-primary transition-colors">
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
                  <Link href={`/${post.category.slug}/${post.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tags Section */}
      {tags.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-text-dark mb-12 text-center">Popular Tags</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag) => (
                <button
                  key={tag.slug}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedTags.includes(tag.name)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent/10 text-accent hover:bg-accent/20'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  {tag.name} ({tag.count})
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Put these expert tips into action with our professional installation and maintenance services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;
