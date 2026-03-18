'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Compass,
  BarChart3,
  Clock,
  Shield,
  ChevronRight,
  Users,
  Trophy,
  ArrowRight,
  Zap,
  BookOpen,
} from 'lucide-react';
import { useQuizStore, QuizMode } from '@/store/quizStore';
import { analytics } from '@/lib/analytics';
import LeadCaptureForm from '@/components/quiz/LeadCaptureForm';

const quizSlide = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

/* ── Quiz sections explained ─────────────────── */
const quizSections = [
  {
    icon: Brain,
    title: 'MBTI-Lite Personality Hook',
    questions: '30 câu hỏi',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    description:
      'Khám phá phong cách tư duy & ra quyết định của bạn dựa trên framework MBTI rút gọn — Hướng ngoại/Hướng nội, Lý tính/Cảm tính.',
    items: [
      'Cách bạn nạp năng lượng — Hướng ngoại (E) hay Hướng nội (I)',
      'Cách bạn ra quyết định — Lý tính (T) hay Cảm tính (F)',
      'Phong cách học tập thiên về thực hành hay lý thuyết',
      'Định hình tính cách nghề nghiệp cốt lõi',
    ],
  },
  {
    icon: Compass,
    title: 'HOLLAND RIASEC Career Discovery',
    questions: '29 câu hỏi',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    description:
      'Xác định nhóm nghề nghiệp phù hợp theo mô hình RIASEC quốc tế — 6 nhóm tính cách nghề nghiệp được hàng triệu người trên thế giới sử dụng.',
    items: [
      'R — Realistic: Thực tế, thích làm việc với máy móc, công cụ',
      'I — Investigative: Nghiên cứu, phân tích dữ liệu, khoa học',
      'A — Artistic: Sáng tạo, nghệ thuật, thiết kế',
      'S — Social: Giao tiếp, giáo dục, chăm sóc',
      'E — Enterprising: Lãnh đạo, kinh doanh, thuyết phục',
      'C — Conventional: Hệ thống, tổ chức, quản lý dữ liệu',
    ],
  },
  {
    icon: BarChart3,
    title: 'Năng lực & Bối cảnh',
    questions: '29 câu hỏi',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    description:
      'Đánh giá năng lực học tập (Tiếng Anh, tự học, kỹ năng mềm) và bối cảnh cá nhân để đưa ra gợi ý lộ trình phù hợp nhất.',
    items: [
      'Trình độ tiếng Anh hiện tại',
      'Khả năng tự học & nghiên cứu độc lập',
      'Kỹ năng mềm & làm việc nhóm',
      'Mục tiêu học tập ngắn hạn & dài hạn',
    ],
  },
];

/* ── Countdown Component ─────────────────── */
function Countdown({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / seconds) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-ge-gray-200"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#countdown-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="countdown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-extrabold text-3xl text-ge-navy">
            {timeLeft}
          </span>
        </div>
      </div>
      <p className="text-ge-gray-500 text-sm font-medium">Quiz bắt đầu sau...</p>
    </div>
  );
}

/* ── Main Quiz Page ─────────────────── */
export default function QuizPage() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [selectedMode, setSelectedMode] = useState<QuizMode>('quick');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const {
    currentQuestion,
    answers,
    direction,
    showLeadForm,
    sectionBreak,
    quizMode,
    result,
    startQuiz,
    answerQuestion,
    continueSectionBreak,
    getQuestions,
    goBack,
  } = useQuizStore();

  useEffect(() => {
    if (result) router.push('/quiz/result');
  }, [result, router]);

  const handleStartCountdown = useCallback(() => {
    setShowCountdown(true);
    analytics.quizStart();
  }, []);

  const handleCountdownComplete = useCallback(() => {
    setShowIntro(false);
    setShowCountdown(false);
    startQuiz(selectedMode);
  }, [startQuiz, selectedMode]);

  const handleSkipCountdown = useCallback(() => {
    setShowIntro(false);
    setShowCountdown(false);
    startQuiz(selectedMode);
  }, [startQuiz, selectedMode]);

  /* ── Intro Screen ─────────────────── */
  if (showIntro) {
    return (
      <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Hero intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-ge-blue/5 border border-ge-blue/10 rounded-full px-5 py-2 mb-6">
              <Clock size={16} className="text-ge-blue" />
              <span className="text-ge-navy text-sm font-semibold">Miễn phí 100% • Chọn phiên bản phù hợp</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-ge-gray-900 mb-4">
              Trắc nghiệm <span className="text-transparent bg-clip-text bg-gradient-to-r from-ge-blue to-ge-blue-light">Hướng nghiệp</span>
            </h1>
            <p className="text-ge-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Kết hợp <span className="font-bold text-ge-navy">MBTI-Lite</span> và{' '}
              <span className="font-bold text-ge-navy">HOLLAND RIASEC</span> — hai framework hướng nghiệp 
              hàng đầu thế giới — để phân tích toàn diện tính cách và năng lực nghề nghiệp
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center mb-10"
          >
            <Image
              src="/images/quiz-illustration.png"
              alt="Quiz hướng nghiệp"
              width={320}
              height={320}
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="font-heading font-bold text-xl text-ge-gray-800 text-center mb-6">
              Chọn phiên bản quiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Mode Card */}
              <button
                onClick={() => setSelectedMode('quick')}
                className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMode === 'quick'
                    ? 'border-ge-orange bg-orange-50 ring-2 ring-orange-200 shadow-lg'
                    : 'border-ge-gray-200 bg-white hover:border-ge-orange/50'
                }`}
              >
                {selectedMode === 'quick' && (
                  <div className="absolute -top-3 right-4 bg-ge-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                    Đang chọn
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Zap size={22} className="text-ge-orange" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-ge-navy text-lg">Nhanh</h3>
                    <span className="text-xs text-ge-gray-500">~5 phút</span>
                  </div>
                </div>
                <p className="text-ge-gray-600 text-sm leading-relaxed mb-3">
                  30 câu hỏi chọn lọc, kết quả tổng quan nhanh chóng.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-orange-100 text-ge-orange px-2.5 py-1 rounded-full font-medium">⚡ 30 câu</span>
                  <span className="text-xs bg-orange-100 text-ge-orange px-2.5 py-1 rounded-full font-medium">🎯 Tổng quan</span>
                </div>
              </button>

              {/* Full Mode Card */}
              <button
                onClick={() => setSelectedMode('full')}
                className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                  selectedMode === 'full'
                    ? 'border-ge-blue bg-blue-50 ring-2 ring-blue-200 shadow-lg'
                    : 'border-ge-gray-200 bg-white hover:border-ge-blue/50'
                }`}
              >
                {selectedMode === 'full' && (
                  <div className="absolute -top-3 right-4 bg-ge-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    Đang chọn
                  </div>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <BookOpen size={22} className="text-ge-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-ge-navy text-lg">Đầy đủ</h3>
                    <span className="text-xs text-ge-gray-500">~15 phút</span>
                  </div>
                </div>
                <p className="text-ge-gray-600 text-sm leading-relaxed mb-3">
                  88 câu hỏi chi tiết, kết quả phân tích chuyên sâu và chính xác nhất.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 text-ge-blue px-2.5 py-1 rounded-full font-medium">📋 88 câu</span>
                  <span className="text-xs bg-blue-100 text-ge-blue px-2.5 py-1 rounded-full font-medium">🔬 Chuyên sâu</span>
                  <span className="text-xs bg-blue-100 text-ge-blue px-2.5 py-1 rounded-full font-medium">⭐ Chính xác nhất</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-6 mb-8 text-sm text-ge-gray-500"
          >
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-ge-blue" />
              <span><strong className="text-ge-gray-700">50.000+</strong> học sinh đã làm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy size={15} className="text-ge-orange" />
              <span><strong className="text-ge-gray-700">98%</strong> hài lòng</span>
            </div>
          </motion.div>

          {/* Countdown or Start button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center"
          >
            {showCountdown ? (
              <div className="py-6">
                <Countdown seconds={5} onComplete={handleCountdownComplete} />
                <button
                  onClick={handleSkipCountdown}
                  className="mt-4 text-ge-gray-500 text-sm underline hover:text-ge-navy transition-colors"
                >
                  Bỏ qua, bắt đầu ngay
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleStartCountdown}
                  className="group inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full gradient-cta text-white font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                >
                  <Sparkles size={22} />
                  Bắt đầu làm quiz
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-2 text-ge-gray-400 text-sm">
                  <Shield size={14} />
                  <span>Không cần đăng ký • Kết quả chính xác</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── Lead form ─────────────────── */
  if (showLeadForm) return <LeadCaptureForm />;

  /* ── Section Break Screen ─────────────────── */
  if (sectionBreak) {
    const completedSectionIndex = currentQuestion < 30 ? 0 : currentQuestion < 59 ? 1 : 2;
    const nextSectionIndex = completedSectionIndex + 1;
    const completedSection = quizSections[completedSectionIndex];
    const nextSection = quizSections[nextSectionIndex];

    return (
      <div className="min-h-screen gradient-quiz-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[600px]"
        >
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {quizSections.map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    i <= completedSectionIndex
                      ? 'bg-ge-green text-white shadow-lg'
                      : 'bg-white/60 text-ge-gray-400 border-2 border-ge-gray-200'
                  }`}
                >
                  {i <= completedSectionIndex ? '✓' : i + 1}
                </div>
                {i < 2 && (
                  <div className={`w-12 h-0.5 ${
                    i < completedSectionIndex ? 'bg-ge-green' : 'bg-ge-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Completed section card */}
          <div className="bg-white rounded-3xl shadow-card-xl p-8 md:p-10 text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-ge-green/10 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-ge-gray-900 mb-2">
              Hoàn thành Phần {completedSectionIndex + 1}!
            </h2>
            <p className="text-ge-gray-500 text-lg mb-6">
              {completedSection.title}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-1.5 text-ge-green">
                <span className="font-bold">{completedSectionIndex + 1}/3</span>
                <span className="text-ge-gray-500">phần hoàn thành</span>
              </div>
              <div className="flex items-center gap-1.5 text-ge-blue">
                <span className="font-bold">{answers.length}/{88}</span>
                <span className="text-ge-gray-500">câu đã trả lời</span>
              </div>
            </div>

            {/* Next section preview */}
            {nextSection && (
              <div className={`${nextSection.bgColor} rounded-2xl p-5 text-left mb-6`}>
                <div className="flex items-center gap-3 mb-2">
                  <nextSection.icon size={20} className={nextSection.iconColor} />
                  <span className="text-xs font-bold uppercase tracking-wider text-ge-gray-400">
                    Phần {nextSectionIndex + 1} tiếp theo
                  </span>
                </div>
                <h3 className="font-heading font-bold text-ge-navy text-lg mb-1">
                  {nextSection.title}
                </h3>
                <p className="text-ge-gray-600 text-sm">
                  {nextSection.questions} • {nextSection.description.slice(0, 80)}...
                </p>
              </div>
            )}

            {/* Continue button */}
            <button
              onClick={continueSectionBreak}
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full gradient-cta text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
            >
              Tiếp tục Phần {nextSectionIndex + 1}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Encouragement */}
          <p className="text-center text-ge-gray-400 text-sm">
            💪 Bạn đang làm rất tốt! Cố lên nhé!
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Quiz Questions ─────────────────── */
  const questionList = getQuestions();
  if (!questionList.length) return null;
  const question = questionList[currentQuestion];
  if (!question) return null;

  const totalQuestions = questionList.length;
  const selectedAnswer = answers.find((a) => a.questionId === question.id);
  const isMidpoint = currentQuestion === Math.floor(totalQuestions / 2);

  // Section info (only meaningful for full mode)
  const isFullMode = quizMode === 'full';
  const sectionIndex = isFullMode
    ? (currentQuestion < 30 ? 0 : currentQuestion < 59 ? 1 : 2)
    : 0;
  const sectionStart = isFullMode ? (sectionIndex === 0 ? 0 : sectionIndex === 1 ? 30 : 59) : 0;
  const sectionEnd = isFullMode ? (sectionIndex === 0 ? 30 : sectionIndex === 1 ? 59 : 88) : totalQuestions;
  const sectionProgress = ((currentQuestion - sectionStart + 1) / (sectionEnd - sectionStart)) * 100;
  const overallProgress = ((currentQuestion + 1) / totalQuestions) * 100;
  const sectionLabels = ['Phần 1: MBTI-Lite', 'Phần 2: RIASEC', 'Phần 3: Năng lực'];
  const modeLabel = isFullMode ? sectionLabels[sectionIndex] : 'Quiz Nhanh';

  const handleAnswer = (optionId: string) => {
    if (!question) return;
    analytics.quizAnswer(question.id);
    if (question.id === 6) analytics.quizMidpoint();
    answerQuestion(question.id, optionId);
  };

  return (
    <div className="min-h-screen gradient-quiz-bg flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-ge-gray-200/50">
        <div className="max-w-[680px] mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentQuestion === 0}
            className="p-2 rounded-lg text-ge-gray-600 hover:bg-ge-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Quay lại"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <div className="text-center">
            <span className="text-xs text-ge-gray-400 font-medium">{modeLabel}</span>
            <span className="block text-sm text-ge-gray-600 font-semibold">
              {isFullMode
                ? `${currentQuestion - sectionStart + 1} / ${sectionEnd - sectionStart}`
                : `${currentQuestion + 1} / ${totalQuestions}`}
            </span>
          </div>
          <button
            onClick={() => { setShowIntro(true); }}
            className="p-2 rounded-lg text-ge-gray-600 hover:bg-ge-gray-100 transition-colors text-xs font-medium"
          >
            ✕
          </button>
        </div>
        {/* Section dots (full) or simple bar (quick) */}
        {isFullMode && (
          <div className="flex items-center justify-center gap-2 py-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === sectionIndex ? 'w-8 bg-ge-blue' : i < sectionIndex ? 'w-4 bg-ge-green' : 'w-4 bg-ge-gray-200'
                }`}
              />
            ))}
          </div>
        )}
        {/* Progress bar */}
        <div className="h-1.5 bg-ge-gray-100">
          <motion.div
            className="h-full bg-gradient-to-r from-ge-blue to-ge-green rounded-r-full"
            animate={{ width: `${isFullMode ? sectionProgress : overallProgress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Quiz content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[680px]">
          {/* Mid-quiz encouragement */}
          <AnimatePresence>
            {isMidpoint && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-ge-yellow/20 text-ge-gray-800 text-sm font-semibold rounded-full px-4 py-2">
                  🎉 Bạn đã đi được nửa đường! Cố lên!
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={quizSlide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-white rounded-3xl shadow-card-xl p-6 md:p-10"
            >
              {/* Section indicator */}
              {question.subtitle && (
                <p className="text-ge-blue text-sm font-medium mb-3">{question.subtitle}</p>
              )}

              {/* Question */}
              <h2 className="font-heading font-bold text-xl md:text-2xl text-ge-gray-900 mb-8 leading-snug">
                {question.text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer?.optionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-ge-blue bg-blue-50 ring-2 ring-blue-200 shadow-md'
                          : 'border-ge-gray-200 hover:border-ge-blue/50 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option.emoji && (
                          <span className="text-2xl shrink-0">{option.emoji}</span>
                        )}
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-ge-navy' : 'text-ge-gray-800'
                          }`}
                        >
                          {option.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
