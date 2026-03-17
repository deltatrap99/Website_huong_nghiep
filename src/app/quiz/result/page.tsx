'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Share2,
  Download,
  MessageCircle,
  ArrowRight,
  Star,
  TrendingUp,
  ChevronDown,
  DollarSign,
  Lightbulb,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { analytics } from '@/lib/analytics';
import { sendToGoogleSheet } from '@/lib/googleSheet';
import RIASECChart from '@/components/result/RIASECChart';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ResultPage() {
  const router = useRouter();
  const { result, reset } = useQuizStore();
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  useEffect(() => {
    if (!result) {
      router.push('/quiz');
      return;
    }
    analytics.resultViewed(result.archetype.name);
    // Auto-save result if logged in
    useAuthStore.getState().saveResult(result);
    // Auto-send to Google Sheet
    sendToGoogleSheet(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, router]);

  if (!result) return null;

  const { archetype, riasecScores, mbtiLite, competencyProfile } = result;

  const handleShareFacebook = () => {
    analytics.resultShared('facebook');
    const shareUrl = encodeURIComponent(window.location.origin);
    const shareText = encodeURIComponent(
      `🎓 Kết quả hướng nghiệp của tôi: "${archetype.nameVi}" (${archetype.name})!\n\nMBTI: ${mbtiLite} | RIASEC: ${result.riasecPrimary}${result.riasecSecondary}\n\nBạn là kiểu gì? Làm quiz miễn phí tại:`
    );
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleShareNative = async () => {
    analytics.resultShared('native');
    if (navigator.share) {
      await navigator.share({
        title: `Tôi là "${archetype.nameVi}" - Trắc nghiệm Hướng nghiệp`,
        text: `Kết quả hướng nghiệp của tôi: ${archetype.nameVi}. Bạn là kiểu gì?`,
        url: window.location.origin,
      });
    }
  };

  const profileCardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!profileCardRef.current) return;
    try {
      const html2canvas = (await import('html2canvas-pro')).default;
      const canvas = await html2canvas(profileCardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `ket-qua-huong-nghiep-${archetype.code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to capture image:', err);
    }
  }, [archetype.code]);

  const handleNewQuiz = () => {
    reset();
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen bg-ge-gray-50 pt-24 pb-32 md:pb-16">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        {/* Profile Card */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-card-xl mb-8"
          style={{ background: archetype.gradient }}
          ref={profileCardRef}
        >
          <div className="p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {mbtiLite}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {archetype.code}-type
              </span>
            </div>
            <p className="text-white/70 text-sm mb-1">Kết quả của bạn</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl mb-2">
              {archetype.nameVi}
            </h1>
            <p className="text-white/80 text-lg mb-6">{archetype.name}</p>
            <p className="text-white/90 leading-relaxed text-base md:text-lg max-w-xl">
              {archetype.description}
            </p>

            {/* Share buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={handleShareFacebook}
                className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1565d8] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button
                onClick={handleShareNative}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                <Share2 size={16} /> Chia sẻ
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                <Download size={16} /> Lưu ảnh
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIASEC Chart */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-card p-6 md:p-8 mb-6"
        >
          <h2 className="font-heading font-bold text-xl text-ge-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={22} className="text-ge-blue" />
            Hồ sơ RIASEC của bạn
          </h2>
          <RIASECChart scores={riasecScores} />
        </motion.div>

        {/* Strengths & Improvements — DETAILED */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          {/* Strengths */}
          <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
            <h3 className="font-heading font-bold text-lg text-ge-gray-900 mb-5 flex items-center gap-2">
              <Star size={20} className="text-ge-yellow" />
              Điểm mạnh
            </h3>
            <div className="space-y-4">
              {archetype.strengths.map((s) => (
                <div key={s.title} className="border-l-3 border-green-400 pl-4">
                  <h4 className="font-bold text-ge-gray-900 text-sm mb-1">{s.title}</h4>
                  <p className="text-ge-gray-600 text-sm leading-relaxed mb-1.5">{s.description}</p>
                  <div className="flex items-start gap-1.5 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2">
                    <Lightbulb size={13} className="shrink-0 mt-0.5" />
                    <span>{s.howToLeverage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
            <h3 className="font-heading font-bold text-lg text-ge-gray-900 mb-5 flex items-center gap-2">
              <Target size={20} className="text-ge-orange" />
              Cần phát triển
            </h3>
            <div className="space-y-4">
              {archetype.improvements.map((imp) => (
                <div key={imp.title} className="border-l-3 border-orange-400 pl-4">
                  <h4 className="font-bold text-ge-gray-900 text-sm mb-1">{imp.title}</h4>
                  <p className="text-ge-gray-600 text-sm leading-relaxed mb-2">{imp.description}</p>
                  <div className="space-y-1.5">
                    {imp.actions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-ge-gray-700">
                        <CheckCircle2 size={13} className="text-ge-orange shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recommended Careers — DETAILED */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-card p-6 md:p-8 mb-6"
        >
          <h2 className="font-heading font-bold text-xl text-ge-gray-900 mb-6">
            🎯 Ngành nghề phù hợp
          </h2>
          <div className="space-y-4">
            {archetype.careers.map((career, i) => {
              const isExpanded = expandedCareer === i;
              return (
                <div
                  key={career.name}
                  className="rounded-2xl border border-ge-gray-200 overflow-hidden transition-all hover:border-ge-blue/30"
                >
                  <button
                    onClick={() => setExpandedCareer(isExpanded ? null : i)}
                    className="w-full text-left p-4 md:p-5 flex items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-ge-gray-900 text-base">
                        {career.name}
                      </h3>
                      <p className="text-ge-gray-500 text-sm mt-0.5">{career.description}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-ge-gray-400 shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 md:px-5 pb-5 space-y-4 border-t border-ge-gray-100 pt-4">
                          {/* Description */}
                          <p className="text-ge-gray-700 text-sm leading-relaxed">
                            {career.detailedDescription}
                          </p>

                          {/* Salary */}
                          <div className="flex items-start gap-2 bg-green-50 rounded-xl p-3">
                            <DollarSign size={16} className="text-green-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-green-800 mb-0.5">Thu nhập tham khảo</p>
                              <p className="text-xs text-green-700">{career.salary}</p>
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <p className="text-xs font-semibold text-ge-gray-500 mb-2 uppercase tracking-wider">
                              Kỹ năng cần có
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {career.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs bg-ge-blue/8 text-ge-navy px-3 py-1.5 rounded-full font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>


        {/* Competency Profile */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-card p-6 md:p-8 mb-8"
        >
          <h2 className="font-heading font-bold text-xl text-ge-gray-900 mb-6">
            📊 Năng lực học tập
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Tiếng Anh', value: competencyProfile.english, max: 4 },
              { label: 'Tự học', value: competencyProfile.self_study, max: 3 },
              { label: 'Kỹ năng mềm', value: competencyProfile.soft_skill, max: 3 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-ge-gray-700">{item.label}</span>
                  <span className="text-ge-gray-500">
                    {item.value}/{item.max}
                  </span>
                </div>
                <div className="h-3 bg-ge-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: archetype.gradient }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / item.max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Block */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-card-xl p-6 md:p-10 text-center"
        >
          <h2 className="font-heading font-bold text-2xl text-ge-gray-900 mb-3">
            Cần tư vấn thêm?
          </h2>
          <p className="text-ge-gray-600 mb-6 max-w-md mx-auto">
            Kết nối với Đại sứ Giáo dục Galaxy Education để được hỗ trợ lập kế hoạch học tập chi tiết.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/ambassador"
              onClick={() => analytics.resultCTAClicked('ambassador')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <MessageCircle size={18} />
              Đăng ký tư vấn miễn phí
            </Link>
            <button
              onClick={handleNewQuiz}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-ge-blue text-ge-blue font-semibold hover:bg-ge-blue hover:text-white transition-all"
            >
              Làm lại quiz
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
