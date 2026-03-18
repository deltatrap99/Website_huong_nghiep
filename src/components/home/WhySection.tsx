'use client';

import { motion } from 'framer-motion';
import { User, Map, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: User,
    title: 'Hiểu rõ bản thân',
    description: 'Khám phá nhóm tính cách, điểm mạnh và ngành nghề phù hợp nhất với con. Không phải ai cũng hợp với ngành "hot", quan trọng là ngành đúng với mình.',
    color: 'bg-ge-orange/10',
    iconColor: 'text-ge-orange',
  },
  {
    icon: Map,
    title: 'Lộ trình rõ ràng',
    description: 'Không chỉ nói "bạn hợp ngành X" rồi dừng. Kết quả kèm lộ trình học cụ thể: học gì, từ khi nào, bắt đầu từ đâu.',
    color: 'bg-ge-blue/10',
    iconColor: 'text-ge-blue',
  },
  {
    icon: HeartHandshake,
    title: 'Chuyên gia đồng hành',
    description: 'Sau trắc nghiệm, được tư vấn miễn phí 1:1 với chuyên gia giáo dục. Giải đáp mọi băn khoăn về ngành nghề, du học, hay lộ trình ôn thi.',
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
            Con đường nào dành cho bạn?
          </h2>
          <p className="text-ge-gray-600 text-lg max-w-xl mx-auto">
            70% học sinh chọn ngành theo cảm tính. Đừng để 4 năm đại học trở thành sự lãng phí.
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
