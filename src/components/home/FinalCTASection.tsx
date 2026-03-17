'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative gradient-hero rounded-3xl p-8 md:p-16 text-center overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-ge-blue-light/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-ge-yellow" />
              <span className="text-white/90 text-sm font-medium">Miễn phí hoàn toàn</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-6">
              Sẵn sàng khám phá <br className="hidden md:block" />
              con đường của bạn?
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
              50.000+ học sinh đã tìm được hướng đi. Bạn là người tiếp theo.
            </p>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full gradient-cta text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
            >
              Bắt đầu ngay
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
