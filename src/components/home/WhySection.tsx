'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Gift } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Nhanh chóng',
    description: 'Chỉ 88 câu hỏi, hoàn thành trong 30 phút. Không cần đăng ký, không cần email.',
    color: 'bg-ge-orange/10',
    iconColor: 'text-ge-orange',
  },
  {
    icon: Target,
    title: 'Chính xác',
    description: 'Dựa trên framework HOLLAND RIASEC quốc tế, được sử dụng bởi hàng triệu người trên thế giới.',
    color: 'bg-ge-blue/10',
    iconColor: 'text-ge-blue',
  },
  {
    icon: Gift,
    title: 'Miễn phí 100%',
    description: 'Nhận kết quả chi tiết + gợi ý ngành nghề + lộ trình học tập hoàn toàn miễn phí.',
    color: 'bg-ge-green/10',
    iconColor: 'text-ge-green',
  },
];

export default function WhySection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-ge-gray-900 mb-4">
            Tại sao nên làm trắc nghiệm?
          </h2>
          <p className="text-ge-gray-600 text-lg max-w-xl mx-auto">
            Đừng để lựa chọn ngành nghề trở thành điều bạn hối hận sau này
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-ge-gray-200/50"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${reason.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon size={28} className={reason.iconColor} />
              </div>
              <h3 className="font-heading font-bold text-xl text-ge-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-ge-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
