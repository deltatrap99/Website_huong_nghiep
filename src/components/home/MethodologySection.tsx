'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const mbtiTypes = [
  { code: 'E/I', label: 'Hướng ngoại / Nội', color: 'bg-purple-100 text-purple-700' },
  { code: 'S/N', label: 'Thực tế / Trực giác', color: 'bg-indigo-100 text-indigo-700' },
  { code: 'T/F', label: 'Lý trí / Cảm xúc', color: 'bg-violet-100 text-violet-700' },
  { code: 'J/P', label: 'Nguyên tắc / Linh hoạt', color: 'bg-blue-100 text-blue-700' },
];

const riasecTypes = [
  { letter: 'R', name: 'Realistic', vi: 'Thực tế', color: 'from-orange-400 to-amber-500', desc: 'Kỹ sư, kiến trúc, kỹ thuật' },
  { letter: 'I', name: 'Investigative', vi: 'Nghiên cứu', color: 'from-blue-500 to-cyan-500', desc: 'Khoa học, y tế, lập trình' },
  { letter: 'A', name: 'Artistic', vi: 'Nghệ thuật', color: 'from-pink-500 to-rose-500', desc: 'Thiết kế, âm nhạc, viết lách' },
  { letter: 'S', name: 'Social', vi: 'Xã hội', color: 'from-green-500 to-emerald-500', desc: 'Giáo dục, tư vấn, y tế cộng đồng' },
  { letter: 'E', name: 'Enterprising', vi: 'Lãnh đạo', color: 'from-red-500 to-orange-500', desc: 'Kinh doanh, quản lý, luật' },
  { letter: 'C', name: 'Conventional', vi: 'Hệ thống', color: 'from-slate-500 to-gray-600', desc: 'Kế toán, ngân hàng, hành chính' },
];

export default function MethodologySection() {
  return (
    <section className="py-20 md:py-28 bg-ge-gray-50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-18"
        >
          <div className="inline-flex items-center gap-2 bg-ge-blue/5 border border-ge-blue/10 rounded-full px-5 py-2 mb-5">
            <Sparkles size={14} className="text-ge-blue" />
            <span className="text-ge-navy text-sm font-semibold">Phương pháp khoa học</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-ge-gray-900 mb-4">
            Kết hợp{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">MBTI</span>
            {' '}+{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">HOLLAND RIASEC</span>
          </h2>
          <p className="text-ge-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Hai framework hướng nghiệp hàng đầu thế giới, bổ trợ nhau để cho kết quả{' '}
            <strong className="text-ge-gray-800">chính xác và toàn diện nhất</strong>.
          </p>
        </motion.div>

        {/* Two columns: MBTI + RIASEC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

          {/* MBTI Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-card overflow-hidden border border-ge-gray-200/50"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🧠</span>
                <div>
                  <h3 className="font-heading font-extrabold text-xl">MBTI-Lite</h3>
                  <p className="text-white/75 text-sm">Myers-Briggs Type Indicator</p>
                </div>
              </div>
              <p className="text-white/85 text-sm leading-relaxed">
                Được phát triển bởi Isabel Briggs Myers (1943), dựa trên lý thuyết tâm lý của Carl Jung. Hiện sử dụng bởi hơn <strong className="text-white">88% trong Fortune 500</strong>.
              </p>
            </div>
            <div className="p-6">
              <p className="text-ge-gray-600 text-sm mb-4">
                MBTI phân loại tính cách theo <strong>4 chiều</strong>, kết hợp tạo ra <strong>16 nhóm tính cách</strong> khác nhau:
              </p>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {mbtiTypes.map((t) => (
                  <div key={t.code} className={`rounded-xl px-3 py-2.5 ${t.color}`}>
                    <p className="font-extrabold text-sm font-mono">{t.code}</p>
                    <p className="text-xs opacity-80">{t.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                <p className="text-purple-700 text-xs leading-relaxed">
                  💡 <strong>Phiên bản của chúng tôi:</strong> 30 câu hỏi tập trung vào 3 chiều quan trọng nhất cho hướng nghiệp — E/I, T/F, và phong cách học tập.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIASEC Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-card overflow-hidden border border-ge-gray-200/50"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🧭</span>
                <div>
                  <h3 className="font-heading font-extrabold text-xl">HOLLAND RIASEC</h3>
                  <p className="text-white/75 text-sm">Career Interest Assessment</p>
                </div>
              </div>
              <p className="text-white/85 text-sm leading-relaxed">
                Phát triển bởi John L. Holland (1959). Là nền tảng của hầu hết bài test hướng nghiệp chuyên nghiệp và được <strong className="text-white">hàng triệu người sử dụng mỗi năm</strong> tại Mỹ.
              </p>
            </div>
            <div className="p-6">
              <p className="text-ge-gray-600 text-sm mb-4">
                RIASEC xác định <strong>sở thích nghề nghiệp</strong> theo 6 nhóm tính cách:
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {riasecTypes.map((t) => (
                  <div key={t.letter} className="flex items-center gap-2.5">
                    <div className={`shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                      <span className="text-white font-extrabold text-sm">{t.letter}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-ge-gray-900 text-xs">{t.vi}</p>
                      <p className="text-ge-gray-400 text-[10px] leading-tight">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-blue-700 text-xs leading-relaxed">
                  💡 <strong>Kết quả:</strong> Bạn nhận được Holland Code 2 chữ (ví dụ: IA, SA, EC...) xác định nhóm nghề phù hợp nhất.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Synergy explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-card p-8 md:p-10 border border-ge-gray-200/50 mb-8"
        >
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-2xl text-ge-gray-900 mb-2">
              Tại sao cần kết hợp cả hai?
            </h3>
            <p className="text-ge-gray-500 text-sm max-w-xl mx-auto">
              Mỗi framework giải quyết một câu hỏi khác nhau về nghề nghiệp của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧩',
                title: 'MBTI trả lời: "Bạn là ai?"',
                desc: 'Tính cách, phong cách làm việc, cách ra quyết định, năng lượng xã hội. Đây là nền tảng bản thân không thay đổi nhiều theo thời gian.',
                color: 'border-purple-200 bg-purple-50',
                labelColor: 'text-purple-700',
              },
              {
                icon: '⚡',
                title: 'Kết hợp → "Ngành nào cho bạn?"',
                desc: 'Giao điểm của tính cách MBTI và sở thích RIASEC cho thấy ngành nghề vừa phù hợp tính cách vừa đúng đam mê — xác suất thành công cao nhất.',
                color: 'border-ge-blue/30 bg-ge-blue/5',
                labelColor: 'text-ge-blue',
              },
              {
                icon: '🎯',
                title: 'RIASEC trả lời: "Bạn thích làm gì?"',
                desc: 'Sở thích hoạt động nghề nghiệp thực tế, môi trường làm việc, và loại công việc hàng ngày bạn muốn. Đây là la bàn chọn ngành.',
                color: 'border-blue-200 bg-blue-50',
                labelColor: 'text-blue-700',
              },
            ].map((item, i) => (
              <div key={i} className={`border-2 ${item.color} rounded-2xl p-5`}>
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h4 className={`font-heading font-bold text-base ${item.labelColor} mb-2`}>{item.title}</h4>
                <p className="text-ge-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-ge-gray-500 text-sm mb-4">
            88 câu hỏi • Kết hợp MBTI + RIASEC + Năng lực học tập • Miễn phí 100%
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <Sparkles size={18} /> Khám phá ngay — Miễn phí
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
