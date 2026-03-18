'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPreviewSection() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-ge-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-ge-gray-900 mb-3">
              Blog Hướng nghiệp
            </h2>
            <p className="text-ge-gray-600 text-lg">
              Kiến thức hướng nghiệp bổ ích, cập nhật liên tục
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1 text-ge-blue font-semibold hover:gap-2 transition-all"
          >
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-ge-gray-200/50 h-full"
              >
                {/* Blog image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-ge-blue/10 to-ge-blue-light/10 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <span className="text-ge-blue text-xs font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-ge-gray-900 mt-2 mb-3 group-hover:text-ge-blue transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-ge-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-ge-gray-400 text-sm">
                    <Clock size={14} />
                    <span>{post.readTime} phút đọc</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-ge-blue font-semibold"
          >
            Xem tất cả bài viết <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
