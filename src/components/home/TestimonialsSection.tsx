'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Minh Anh',
    grade: 'Lớp 11, Hà Nội',
    text: 'Mình không nghĩ bài trắc nghiệm miễn phí mà chính xác đến vậy! Kết quả gợi ý ngành Y khoa, đúng với đam mê mình chưa dám thừa nhận. Giờ mình tự tin hơn rất nhiều.',
    avatar: '👩‍🎓',
    rating: 5,
    archetype: 'The Analytical Mind',
  },
  {
    name: 'Quốc Bảo',
    grade: 'Lớp 12, TP.HCM',
    text: 'Sau khi làm quiz, mình được kết nối với Đại sứ Giáo dục rất tận tâm. Họ giúp mình lập lộ trình ôn thi chi tiết và giới thiệu khóa học phù hợp.',
    avatar: '👨‍🎓',
    rating: 5,
    archetype: 'The People Leader',
  },
  {
    name: 'Phương Linh',
    grade: 'Lớp 10, Đà Nẵng',
    text: 'Profile card kết quả đẹp quá, mình chụp đăng lên Facebook luôn! Bạn bè ai cũng hỏi link để làm quiz. Kết quả "Nhà Sáng Tạo" hoàn toàn đúng với mình.',
    avatar: '👩‍🏫',
    rating: 5,
    archetype: 'The Creative Thinker',
  },
  {
    name: 'Hoàng Khang',
    grade: 'Lớp 11, Cần Thơ',
    text: 'Trước đây mình rất phân vân giữa Kỹ thuật và Kinh tế. Quiz RIASEC cho thấy mình thuộc nhóm R-I, phù hợp Kỹ sư hơn. Giờ mình yên tâm đầu tư ôn Toán Lý rồi!',
    avatar: '👨‍💻',
    rating: 5,
    archetype: 'The Builder',
  },
  {
    name: 'Thùy Trang',
    grade: 'Lớp 12, Hải Phòng',
    text: 'Phần phân tích điểm mạnh và cần phát triển rất chi tiết, thậm chí còn gợi ý cách luyện tập cụ thể. Mình đã bắt đầu thực hành và thấy cải thiện rõ rệt.',
    avatar: '👩‍💼',
    rating: 5,
    archetype: 'The Inspiring Communicator',
  },
  {
    name: 'Đức Minh',
    grade: 'Lớp 10, Nghệ An',
    text: 'Bài quiz 88 câu hỏi nghe nhiều nhưng làm rất nhanh vì câu hỏi thú vị. Kết quả "Nhà Tổ Chức" đúng quá — mình luôn là người lên plan cho cả nhóm.',
    avatar: '👨‍🎓',
    rating: 5,
    archetype: 'The Organizer',
  },
  {
    name: 'Ngọc Hân',
    grade: 'Lớp 11, Bình Dương',
    text: 'Mình thích nhất phần ngành nghề phù hợp — không chỉ nói tên nghề mà còn mô tả chi tiết công việc, mức lương và kỹ năng cần có. Quá hữu ích!',
    avatar: '👩‍🎓',
    rating: 5,
    archetype: 'The Analytical Mind',
  },
  {
    name: 'Thanh Tùng',
    grade: 'Lớp 12, Thái Nguyên',
    text: 'Ba mẹ mình cũng xem kết quả quiz và rất ấn tượng. Giờ cả nhà cùng thống nhất hướng đi, không còn tranh cãi về chuyện chọn ngành nữa.',
    avatar: '👨‍🎓',
    rating: 5,
    archetype: 'The Builder',
  },
  {
    name: 'Mai Phương',
    grade: 'Lớp 10, Huế',
    text: 'Mình đã share link quiz cho cả lớp. 30/35 bạn đã làm xong và ai cũng bất ngờ vì kết quả chính xác. Cô chủ nhiệm cũng khen bài quiz hay!',
    avatar: '👩‍🏫',
    rating: 5,
    archetype: 'The Creative Thinker',
  },
];

const VISIBLE_COUNT = 3;
const AUTO_ROTATE_MS = 5000;

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / VISIBLE_COUNT);

  const next = useCallback(() => {
    setCurrentPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [next]);

  const visibleTestimonials = testimonials.slice(
    currentPage * VISIBLE_COUNT,
    currentPage * VISIBLE_COUNT + VISIBLE_COUNT
  );

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-ge-blue text-sm font-bold uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-ge-gray-900 mb-4">
            Học sinh nói gì?
          </h2>
          <p className="text-ge-gray-600 text-lg max-w-2xl mx-auto">
            Hơn <span className="font-bold text-ge-navy">50.000+</span> học sinh đã khám phá con đường sự nghiệp phù hợp với Galaxy Education
          </p>
        </motion.div>

        {/* Desktop: paginated grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="hidden md:grid md:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="flex flex-col bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-ge-gray-200/50 relative overflow-hidden"
                >
                  {/* Decorative gradient bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ge-blue via-ge-blue-light to-ge-green" />

                  <Quote size={28} className="text-ge-blue/15 mb-3" />
                  <p className="text-ge-gray-700 leading-relaxed flex-1 mb-5 text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Archetype badge */}
                  <span className="self-start text-xs font-semibold text-ge-blue bg-ge-blue/8 px-3 py-1 rounded-full mb-4">
                    {t.archetype}
                  </span>

                  <div className="flex items-center gap-3 pt-4 border-t border-ge-gray-100">
                    <span className="text-3xl">{t.avatar}</span>
                    <div>
                      <p className="font-heading font-bold text-ge-gray-900 text-sm">{t.name}</p>
                      <p className="text-ge-gray-500 text-xs">{t.grade}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} size={12} className="text-ge-yellow fill-ge-yellow" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden -mx-4 px-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-[300px] snap-center flex flex-col bg-white rounded-2xl p-5 shadow-card border border-ge-gray-200/50 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ge-blue via-ge-blue-light to-ge-green" />
                <Quote size={22} className="text-ge-blue/15 mb-2" />
                <p className="text-ge-gray-700 leading-relaxed flex-1 mb-4 text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <span className="self-start text-xs font-semibold text-ge-blue bg-ge-blue/8 px-2.5 py-0.5 rounded-full mb-3">
                  {t.archetype}
                </span>
                <div className="flex items-center gap-2.5 pt-3 border-t border-ge-gray-100">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="font-heading font-bold text-ge-gray-900 text-sm">{t.name}</p>
                    <p className="text-ge-gray-500 text-xs">{t.grade}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={11} className="text-ge-yellow fill-ge-yellow" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-ge-gray-200 flex items-center justify-center text-ge-gray-500 hover:border-ge-blue hover:text-ge-blue transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? 'w-8 bg-ge-blue'
                      : 'w-2 bg-ge-gray-300 hover:bg-ge-gray-400'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-ge-gray-200 flex items-center justify-center text-ge-gray-500 hover:border-ge-blue hover:text-ge-blue transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
