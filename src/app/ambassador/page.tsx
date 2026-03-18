'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Users,
  GraduationCap,
  HeartHandshake,
  CheckCircle,
  ChevronDown,
  User,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
} from 'lucide-react';
import { provinces } from '@/data/provinces';
import { analytics } from '@/lib/analytics';
import { useState } from 'react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
  province: z.string().min(1, 'Vui lòng chọn tỉnh/thành'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof formSchema>;

const ambassadors = [
  { name: 'Nguyễn Thị Hương', role: 'Đại sứ Giáo dục Khu vực Hà Nội', avatar: '👩‍🏫', students: 200 },
  { name: 'Trần Minh Đức', role: 'Đại sứ Giáo dục Khu vực TP.HCM', avatar: '👨‍🏫', students: 350 },
  { name: 'Lê Thanh Mai', role: 'Đại sứ Giáo dục Khu vực Đà Nẵng', avatar: '👩‍💼', students: 150 },
];

const faqs = [
  {
    q: 'Đại sứ Giáo dục là ai?',
    a: 'Đại sứ Giáo dục (ADC) là đội ngũ tư vấn viên chuyên nghiệp của Galaxy Education, được đào tạo bài bản về hướng nghiệp và các sản phẩm giáo dục. Họ giúp bạn định hướng học tập và chọn giải pháp phù hợp.',
  },
  {
    q: 'Tư vấn có mất phí không?',
    a: 'Hoàn toàn MIỄN PHÍ! Đại sứ Giáo dục tư vấn miễn phí, không ràng buộc. Bạn chỉ chi trả khi quyết định đăng ký khóa học phù hợp.',
  },
  {
    q: 'Sau khi đăng ký sẽ liên hệ bằng cách nào?',
    a: 'Đại sứ Giáo dục sẽ liên hệ bạn qua Zalo/điện thoại trong vòng 24 giờ sau khi đăng ký. Bạn cũng có thể chọn khung giờ tư vấn phù hợp.',
  },
  {
    q: 'Đại sứ tư vấn những gì?',
    a: 'Đại sứ tư vấn toàn diện: phân tích kết quả trắc nghiệm, gợi ý ngành nghề, lập lộ trình học tập cá nhân hóa, tư vấn chọn sản phẩm Galaxy Education phù hợp, hỗ trợ ôn thi đại học.',
  },
];

export default function AmbassadorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: ContactForm) => {
    console.log('[Ambassador Contact]', data);
    analytics.ambassadorContactRequested();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16">
      {/* Hero */}
      <section className="gradient-hero py-16 md:py-24 -mt-24 pt-36 md:pt-44 mb-12 md:mb-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <HeartHandshake size={16} className="text-ge-yellow" />
              <span className="text-white/90 text-sm font-medium">Hơn 14.000 Đại sứ trên toàn quốc</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl mb-4 text-white">
              Kết nối với Đại sứ Giáo dục
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Nhận tư vấn hướng nghiệp & lộ trình học tập 1-1 hoàn toàn miễn phí
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Process */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-ge-gray-900 text-center mb-12">
            Quy trình tư vấn đơn giản
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: GraduationCap, step: '01', title: 'Làm quiz hướng nghiệp', desc: 'Hoàn thành bài trắc nghiệm 12 câu hỏi để xác định hồ sơ nghề nghiệp' },
              { icon: Users, step: '02', title: 'Kết nối Đại sứ', desc: 'Đại sứ Giáo dục liên hệ trong 24h để phân tích kết quả và tư vấn' },
              { icon: CheckCircle, step: '03', title: 'Nhận lộ trình cá nhân', desc: 'Lộ trình học tập được thiết kế riêng với sản phẩm Galaxy Education' },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 md:p-8 shadow-card border border-ge-gray-200/50 text-center group hover:shadow-card-hover transition-all"
              >
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ge-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm">
                  {item.step}
                </span>
                <item.icon size={36} className="text-ge-blue mx-auto mt-4 mb-4" />
                <h3 className="font-heading font-bold text-lg text-ge-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-ge-gray-600 text-sm">{item.desc}</p>
                {i < 2 && (
                  <ArrowRight
                    size={20}
                    className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-ge-gray-300 z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-card-xl p-6 md:p-10 border border-ge-gray-200/50">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-ge-green/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-ge-green" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-ge-gray-900 mb-3">
                    Đăng ký thành công!
                  </h3>
                  <p className="text-ge-gray-600 mb-6">
                    Đại sứ Giáo dục sẽ liên hệ bạn trong 24 giờ tới.
                  </p>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-white font-bold shadow-lg"
                  >
                    <Sparkles size={16} /> Làm quiz hướng nghiệp
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="font-heading font-bold text-2xl text-ge-gray-900 mb-2">
                    Đăng ký tư vấn miễn phí
                  </h2>
                  <p className="text-ge-gray-600 mb-6">
                    Điền thông tin để Đại sứ Giáo dục liên hệ tư vấn cho bạn
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                        <User size={14} /> Họ tên <span className="text-ge-coral">*</span>
                      </label>
                      <input
                        {...register('fullName')}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                      {errors.fullName && <p className="text-ge-coral text-sm mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                        <Phone size={14} /> Số điện thoại <span className="text-ge-coral">*</span>
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="0901234567"
                        className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                      {errors.phone && <p className="text-ge-coral text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                        <MapPin size={14} /> Tỉnh/Thành <span className="text-ge-coral">*</span>
                      </label>
                      <select
                        {...register('province')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Chọn tỉnh/thành...</option>
                        {provinces.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      {errors.province && <p className="text-ge-coral text-sm mt-1">{errors.province.message}</p>}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                        <Mail size={14} /> Email <span className="text-ge-gray-400 text-xs">(không bắt buộc)</span>
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                        <MessageCircle size={14} /> Nội dung cần tư vấn
                      </label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Mình cần tư vấn về..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full gradient-cta text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                    </button>
                  </form>
                  <div className="flex items-center justify-center gap-2 mt-4 text-ge-gray-400 text-xs">
                    <Shield size={12} /> Thông tin được bảo mật. Không spam.
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-2xl text-ge-gray-900 mb-6">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-ge-gray-200/50 overflow-hidden shadow-card"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-3"
                  >
                    <span className="font-heading font-bold text-ge-gray-900">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-ge-gray-400 transition-transform shrink-0 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-ge-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
