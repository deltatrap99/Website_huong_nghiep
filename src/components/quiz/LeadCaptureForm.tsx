'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Phone, GraduationCap, MapPin, Mail, Shield } from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';
import { provinces } from '@/data/provinces';
import { analytics } from '@/lib/analytics';
import { getStoredUTM } from '@/lib/analytics';
import { useEffect } from 'react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
  grade: z.string().min(1, 'Vui lòng chọn lớp'),
  province: z.string().min(1, 'Vui lòng chọn tỉnh/thành'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadCaptureForm() {
  const submitLeadForm = useQuizStore((s) => s.submitLeadForm);
  const storeSubmitting = useQuizStore((s) => s.isSubmitting);

  useEffect(() => {
    analytics.leadFormViewed();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const utm = getStoredUTM();
    const leadData = {
      ...data,
      source: utm.utm_source,
      ambassadorRef: utm.ref,
    };

    console.log('[Lead Captured]', leadData);
    analytics.leadFormSubmitted('pending');

    await submitLeadForm(leadData);
  };

  return (
    <div className="min-h-screen gradient-quiz-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[520px] bg-white rounded-3xl shadow-card-xl p-6 md:p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="font-heading font-bold text-2xl text-ge-gray-900 mb-2">
            Bạn đã hoàn thành quiz!
          </h2>
          <p className="text-ge-gray-600">
            Nhập thông tin để nhận kết quả chi tiết + tư vấn miễn phí
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
              <User size={14} /> Họ và tên <span className="text-ge-coral">*</span>
            </label>
            <input
              {...register('fullName')}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            {errors.fullName && (
              <p className="text-ge-coral text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
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
            {errors.phone && (
              <p className="text-ge-coral text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Grade */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
              <GraduationCap size={14} /> Lớp <span className="text-ge-coral">*</span>
            </label>
            <select
              {...register('grade')}
              className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Chọn lớp...</option>
              {[8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={`Lớp ${g}`}>
                  Lớp {g}
                </option>
              ))}
              <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
            </select>
            {errors.grade && (
              <p className="text-ge-coral text-sm mt-1">{errors.grade.message}</p>
            )}
          </div>

          {/* Province */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
              <MapPin size={14} /> Tỉnh/Thành phố <span className="text-ge-coral">*</span>
            </label>
            <select
              {...register('province')}
              className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Chọn tỉnh/thành...</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="text-ge-coral text-sm mt-1">{errors.province.message}</p>
            )}
          </div>

          {/* Email (optional) */}
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
            {errors.email && (
              <p className="text-ge-coral text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || storeSubmitting}
            className="w-full py-4 rounded-full gradient-cta text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {(isSubmitting || storeSubmitting) ? 'Đang phân tích kết quả...' : 'Xem kết quả của tôi 🎯'}
          </button>
        </form>

        {/* Privacy */}
        <div className="flex items-center justify-center gap-2 mt-4 text-ge-gray-400 text-xs">
          <Shield size={12} />
          <span>Thông tin được bảo mật. Không spam.</span>
        </div>
      </motion.div>
    </div>
  );
}
