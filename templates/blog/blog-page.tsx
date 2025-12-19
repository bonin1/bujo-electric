import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import blogData from '@/data/blog-posts.json';
import { BUSINESS_INFO } from '@/lib/business-config';
import DynamicHeader from '@/components/global/dynamic-header/dynamic-header';
import Image from '@/components/ui/image';

export const metadata: Metadata = {
  title: `${BUSINESS_INFO.primaryKeyword} Blog | Expert Tips & Guides | ${BUSINESS_INFO.name}`,
  description: `Expert tips, guides, and insights for ${BUSINESS_INFO.primaryKeyword.toLowerCase()}. Learn from our professional team.`,
  keywords: `${BUSINESS_INFO.primaryKeyword.toLowerCase()} blog, tips, guides, expert advice`,
  openGraph: {
    title: `${BUSINESS_INFO.primaryKeyword} Blog | ${BUSINESS_INFO.name}`,
    description: `Expert tips and guides for ${BUSINESS_INFO.primaryKeyword.toLowerCase()}.`,
    type: 'website',
  },
};

const BlogPage = () => {
  const { blogPosts, categories } = blogData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DynamicHeader title={BUSINESS_INFO.primaryKeyword} description={`Expert tips, guides, and insights for ${BUSINESS_INFO.primaryKeyword.toLowerCase()}`} />

      {/* Note: Category filtering is handled in app/blog/page.tsx with interactive filters */}

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Article</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image 
                  src={blogPosts[0].image.url} 
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category.name}
                  </span>
                  <span className="text-gray-500 text-sm">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={blogPosts[0].author.avatar} 
                      alt={blogPosts[0].author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{blogPosts[0].author.name}</p>
                      <p className="text-sm text-gray-500">{blogPosts[0].author.bio}</p>
                    </div>
                  </div>
                  <Link 
                    href={`/${blogPosts[0].slug}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={post.image.url} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category.name}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/${post.slug}/`}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest {BUSINESS_INFO.primaryKeyword.toLowerCase()} tips, expert guides, and insights delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
