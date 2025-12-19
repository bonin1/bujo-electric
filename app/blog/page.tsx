"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { Clock, ArrowRight, Search, Filter, Loader2 } from 'lucide-react';
import blogData from '@/data/blog-posts.json';
import DynamicHeader from '@/components/global/dynamic-header/dynamic-header';
import CTASection from '@/components/global/call-to-action/cta-section';
import { generateStructuredData } from '@/lib/seo-metadata';

// Note: Metadata export moved to separate file due to "use client" directive
// export const metadata: Metadata = generateMetadataFromConfig('/blog');

export default function BlogPage() {
  const { blogPosts, categories } = blogData;
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const POSTS_PER_PAGE = 5;
  const SEARCH_DEBOUNCE_DELAY = 500; // Increased for better performance

  // Debounce search term to reduce filtering operations
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchTerm]);

    // Generate structured data for the blog page
    const structuredData = useMemo(() => {
      return generateStructuredData('/blog/');
    }, []);

  // Memoized filtered blogs for better performance
  const filteredBlogs = useMemo(() => {
    setIsLoading(true);
    
    let filtered = blogPosts;

    // Filter by search term (debounced)
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category.slug === selectedCategory);
    }

    // Sort by published date (newest first)
    filtered = filtered.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    setIsLoading(false);
    return filtered;
  }, [blogPosts, debouncedSearchTerm, selectedCategory]);

  // Memoized paginated blogs
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredBlogs.slice(startIndex, endIndex);
  }, [filteredBlogs, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('all');
  }, []);

  return (
    <>
    {structuredData.map((script) => (
      <script
        key={script.id}
        type={script.type}
        dangerouslySetInnerHTML={{ __html: script.children }}
      />
    ))}
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DynamicHeader title="Feature Blog"  />

      {/* Main Content */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Search & Filters - Left Sidebar */}
            <div className="col-span-1 order-2 lg:order-1">
              <div className="bg-card rounded-2xl shadow-lg p-4 sm:p-6 sticky top-8 border border-border">
                
                {/* Search */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-primary" />
                    Search Articles
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by title, content, or tags..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-3 bg-muted border border-border text-foreground placeholder-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      aria-label="Search articles"
                    />
                    {searchTerm && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-primary" />
                    Categories
                  </h3>
                  <div className="space-y-2 flex flex-row flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`w-auto text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                      }`}
                      aria-pressed={selectedCategory === 'all'}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`w-auto text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                          selectedCategory === category.slug
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                        }`}
                        aria-pressed={selectedCategory === category.slug}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Articles */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Featured Articles</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((blog) => (
                      <Link
                        key={blog.id}
                        href={`/${blog.slug}/`}
                        className="block group p-3 rounded-lg hover:bg-muted transition-all duration-200"
                        aria-label={`Read ${blog.title}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={blog.image?.url || '/assets/config/placeholder-image.png'}
                              alt={blog.title}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              priority={false}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1" suppressHydrationWarning>{formatDate(blog.publishedAt)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Articles - Right Side */}
            <div className="col-span-1 lg:col-span-2 order-1 lg:order-2">
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {filteredBlogs.length} Article{filteredBlogs.length !== 1 ? 's' : ''} Found
                    </h2>
                    <p className="text-muted-foreground">
                      Showing {paginatedBlogs.length} of {filteredBlogs.length} articles
                      {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                    </p>
                  </div>
                  
                  {/* Performance Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Optimized for {blogPosts.length}+ posts</span>
                    </div>
                    {searchTerm && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Searching...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-8">
                  {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                    <div key={index} className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden animate-pulse">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="h-48 md:h-full bg-muted"></div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="h-6 w-20 bg-muted rounded-full"></div>
                            <div className="h-4 w-16 bg-muted rounded"></div>
                          </div>
                          <div className="h-6 w-3/4 bg-muted rounded mb-3"></div>
                          <div className="space-y-2 mb-4">
                            <div className="h-4 w-full bg-muted rounded"></div>
                            <div className="h-4 w-5/6 bg-muted rounded"></div>
                            <div className="h-4 w-4/6 bg-muted rounded"></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="h-4 w-24 bg-muted rounded"></div>
                            <div className="h-4 w-20 bg-muted rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedBlogs.length > 0 ? (
                <div className="space-y-8">
                  {paginatedBlogs.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/${blog.slug}/`}
                      className="group block"
                      aria-label={`Read ${blog.title}`}
                    >
                      <article className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <div className="relative h-48 md:h-full overflow-hidden">
                              <Image
                                src={blog.image?.url || '/assets/config/placeholder-image.png'}
                                alt={blog.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                priority={false}
                              />
                            </div>
                          </div>

                          <div className="md:w-2/3 p-6">
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                              <span className="bg-secondary px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground">
                                {blog.category.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{blog.readTime}</span>
                              </div>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {blog.title}
                            </h3>

                            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground" suppressHydrationWarning>{formatDate(blog.publishedAt)}</span>
                              <div className="flex items-center text-primary font-semibold text-sm group-hover:text-primary/80 transition-colors">
                                <span>Read More</span>
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : null}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <nav className="flex justify-center items-center space-x-2 mt-12" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                            currentPage === pageNum
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                          }`}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}

              {filteredBlogs.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-muted-foreground mb-6">
                    <Search className="w-20 h-20 mx-auto opacity-50" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">No articles found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your search terms or category filter to find what you&apos;re looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all duration-200 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
    </>
  );
}
