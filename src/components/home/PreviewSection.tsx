'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';

export default function PreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-ge-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-ge-gray-900 mb-6">
              Kết quả chi tiết,{' '}
              <span className="text-ge-blue">cá nhân hóa</span> cho riêng bạn
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                'Phân tích tính cách & xu hướng nghề nghiệp',
                'Gợi ý 3-5 ngành phù hợp nhất',
                'Biểu đồ điểm mạnh / cần cải thiện',
                'Lộ trình học tập được thiết kế riêng',
                'Chia sẻ kết quả lên mạng xã hội',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-ge-green/20 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-ge-green" />
                  </span>
                  <span className="text-ge-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Nhận kết quả miễn phí
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-card-xl overflow-hidden border border-ge-gray-200/50">
              {/* Mock Profile Card */}
              <div className="p-1">
                <div className="rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-archetype-social to-emerald-600 p-8 pb-12 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                        🌟
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Kết quả của bạn</p>
                        <h3 className="font-heading font-bold text-xl">Người Truyền Cảm Hứng</h3>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Bạn là người ấm áp, giỏi giao tiếp và có khả năng kết nối con người tuyệt vời...
                    </p>
                  </div>

                  {/* Stats preview */}
                  <div className="p-6 space-y-3">
                    {[
                      { label: 'Social', pct: 85, color: 'bg-archetype-social' },
                      { label: 'Artistic', pct: 70, color: 'bg-archetype-artistic' },
                      { label: 'Enterprising', pct: 60, color: 'bg-archetype-enterprising' },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-ge-gray-600 font-medium">{bar.label}</span>
                          <span className="text-ge-gray-400">{bar.pct}%</span>
                        </div>
                        <div className="h-2.5 bg-ge-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${bar.color} rounded-full`}
                            style={{ width: `${bar.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blur overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-3xl">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-ge-navy/10 flex items-center justify-center mx-auto mb-4">
                    <Lock size={28} className="text-ge-navy" />
                  </div>
                  <p className="font-heading font-bold text-lg text-ge-gray-900 mb-2">
                    Làm quiz để xem kết quả của bạn
                  </p>
                  <p className="text-ge-gray-500 text-sm">88 câu hỏi • 30 phút • Miễn phí</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-ge-coral text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-soft">
              🔥 Hot
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
