'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight, Search, Sparkles } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import type { Metadata } from 'next';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter((post) => {
    const matchCategory = activeCategory === 'Tất cả' || post.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-ge-gray-900 mb-4">
            Blog Hướng nghiệp
          </h1>
          <p className="text-ge-gray-600 text-lg max-w-xl mx-auto">
            Thông tin hướng nghiệp, xu hướng ngành nghề, và lộ trình học tập cho học sinh
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ge-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-ge-gray-200 bg-white text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-ge-navy text-white'
                    : 'bg-white text-ge-gray-600 border border-ge-gray-200 hover:border-ge-blue/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-8">
                {featured.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-ge-gray-200/50 mb-6"
                    >
                      <div className="md:flex">
                        <div className="md:w-2/5 aspect-[4/3] md:aspect-auto bg-gradient-to-br from-ge-blue/10 to-ge-blue-light/10 flex items-center justify-center">
                          <span className="text-6xl">📚</span>
                        </div>
                        <div className="p-6 md:p-8 flex-1">
                          <span className="inline-block bg-ge-orange/10 text-ge-orange text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                            Featured
                          </span>
                          <h2 className="font-heading font-bold text-xl md:text-2xl text-ge-gray-900 mb-3 group-hover:text-ge-blue transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-ge-gray-600 leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-ge-gray-400 text-sm">
                            <span>{post.category}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {post.readTime} phút đọc
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Regular grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regular.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-ge-gray-200/50 h-full"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-ge-blue/5 to-ge-blue-light/5 flex items-center justify-center">
                      <span className="text-5xl">
                        {post.category === 'Kỹ năng'
                          ? '💪'
                          : post.category === 'Câu chuyện thật'
                          ? '💡'
                          : '🎯'}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-ge-blue text-xs font-semibold uppercase tracking-wide">
                        {post.category}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-ge-gray-900 mt-2 mb-2 group-hover:text-ge-blue transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-ge-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-1 text-ge-gray-400 text-sm">
                        <Clock size={14} /> {post.readTime} phút đọc
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-ge-gray-400">
                <p className="text-lg mb-2">Không tìm thấy bài viết</p>
                <p className="text-sm">Thử tìm với từ khóa khác hoặc chọn danh mục khác</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            {/* Quiz CTA */}
            <div className="bg-white rounded-2xl shadow-card p-6 border border-ge-gray-200/50 text-center">
              <div className="w-14 h-14 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-ge-gray-900 mb-2">
                Bạn đã biết ngành phù hợp?
              </h3>
              <p className="text-ge-gray-600 text-sm mb-4">
                Làm trắc nghiệm RIASEC miễn phí ngay
              </p>
              <Link
                href="/quiz"
                className="block w-full py-3 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Làm quiz ngay
              </Link>
            </div>

            {/* Popular posts */}
            <div className="bg-white rounded-2xl shadow-card p-6 border border-ge-gray-200/50">
              <h3 className="font-heading font-bold text-lg text-ge-gray-900 mb-4">
                Bài viết phổ biến
              </h3>
              <div className="space-y-3">
                {blogPosts.slice(0, 4).map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex gap-3 group"
                  >
                    <span className="text-ge-gray-400 font-heading font-bold text-lg shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-ge-gray-700 group-hover:text-ge-blue transition-colors line-clamp-2">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
