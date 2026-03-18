'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Sparkles } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { blogContent } from '@/data/blogContent';
import { analytics } from '@/lib/analytics';
import { useEffect } from 'react';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) analytics.blogPostViewed(post.slug);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ge-gray-50 pt-20">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-ge-gray-900 mb-4">
            Bài viết không tìm thấy
          </h1>
          <Link href="/blog" className="text-ge-blue font-semibold hover:underline">
            ← Quay lại Blog
          </Link>
        </div>
      </div>
    );
  }

  const postContent = blogContent[post.slug];

  return (
    <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-ge-gray-600 hover:text-ge-navy transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Quay lại Blog
          </button>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="text-ge-blue font-semibold">{post.category}</span>
            <span className="text-ge-gray-300">•</span>
            <span className="text-ge-gray-500">{new Date(post.date).toLocaleDateString('vi-VN')}</span>
            <span className="text-ge-gray-300">•</span>
            <span className="text-ge-gray-500 flex items-center gap-1">
              <Clock size={14} /> {post.readTime} phút đọc
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-ge-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Featured image area */}
          <div className="aspect-[16/9] bg-gradient-to-br from-ge-blue/10 to-ge-blue-light/10 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-ge-gray-700 leading-relaxed space-y-6
            [&>h2]:font-heading [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:text-ge-gray-900 [&>h2]:mt-8 [&>h2]:mb-4
            [&>p]:mb-4 [&>p>strong]:text-ge-gray-900 [&>p>em]:text-ge-gray-500">
            {postContent ? (
              <div dangerouslySetInnerHTML={{ __html: postContent }} />
            ) : (
              <>
                <p className="text-lg font-medium text-ge-gray-800">{post.excerpt}</p>
                <p>Bài viết đang được cập nhật nội dung chi tiết. Vui lòng quay lại sau.</p>
              </>
            )}

            {/* CTA in article */}
            <div className="my-8 p-6 rounded-2xl gradient-quiz-bg border border-ge-blue/10 text-center">
              <h3 className="font-heading font-bold text-xl text-ge-gray-900 mb-2">
                🎯 Bạn đã biết mình phù hợp với ngành gì?
              </h3>
              <p className="text-ge-gray-600 mb-4">
                Làm bài trắc nghiệm RIASEC miễn phí, chỉ trong 30 phút
              </p>
              <Link
                href="/quiz"
                onClick={() => analytics.blogQuizCTAClicked()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles size={16} /> Làm quiz ngay
              </Link>
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-ge-gray-200">
            <span className="text-ge-gray-500 text-sm">Chia sẻ:</span>
            <button className="p-2 rounded-lg bg-ge-gray-100 text-ge-gray-600 hover:bg-ge-blue hover:text-white transition-all">
              <Share2 size={16} />
            </button>
          </div>
        </motion.article>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 gradient-hero rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">
            Sẵn sàng khám phá bản thân?
          </h2>
          <p className="text-white/80 mb-6">
            88 câu hỏi • 30 phút • Miễn phí 100%
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-cta text-white font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            <Sparkles size={18} /> Bắt đầu trắc nghiệm
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
