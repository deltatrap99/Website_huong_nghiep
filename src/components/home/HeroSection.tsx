'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Users, Clock, Award, ArrowRight } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString('vi-VN')}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-20 w-72 h-72 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 md:w-[500px] md:h-[500px] bg-ge-blue-light/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-ge-blue/5 rounded-full blur-3xl" />
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-[15%] w-16 h-16 border-2 border-white/10 rounded-xl rotate-12"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-[10%] w-12 h-12 border-2 border-ge-yellow/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[40%] right-[8%] w-8 h-8 border border-ge-orange/20 rounded-lg"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-28 md:py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 border border-white/10"
            >
              <Sparkles size={16} className="text-ge-yellow" />
              <span className="text-white/90 text-sm font-medium">
                Miễn phí 100% • Chỉ 30 phút
              </span>
            </motion.div>

            {/* Headline — more eye-catching with glow effects */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.15] mb-6"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-ge-yellow to-white">Bạn phù hợp với</span>
              <span className="relative inline-block mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ge-yellow via-ge-orange to-ge-coral text-5xl md:text-6xl lg:text-7xl">
                  ngành gì?
                </span>
                {/* Glow effect behind the text */}
                <span className="absolute -inset-4 bg-gradient-to-r from-ge-yellow/20 via-ge-orange/20 to-ge-coral/20 rounded-2xl blur-2xl -z-10" />
              </span>
              <span className="block mt-2 text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white/90">
                Khám phá trong <span className="text-ge-yellow font-extrabold">30 phút</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Trắc nghiệm hướng nghiệp dựa trên framework <span className="text-white font-semibold">HOLLAND RIASEC</span> quốc tế, giúp bạn tìm ra con đường sự nghiệp phù hợp nhất.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/quiz"
                className="group inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full gradient-cta text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                <Sparkles size={20} />
                Bắt đầu trắc nghiệm
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 md:mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto lg:mx-0"
            >
              {[
                { icon: Users, value: 50000, suffix: '+', label: 'Học sinh đã làm' },
                { icon: Clock, value: 30, suffix: ' phút', label: 'Thời gian quiz' },
                { icon: Award, value: 98, suffix: '%', label: 'Hài lòng kết quả' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <stat.icon size={18} className="text-ge-yellow mx-auto lg:mx-0 mb-1.5" />
                  <div className="font-heading font-bold text-2xl md:text-3xl text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/50 text-xs md:text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 max-w-lg lg:max-w-xl"
          >
            <div className="relative">
              <Image
                src="/images/hero-illustration.png"
                alt="Vietnamese students exploring career paths"
                width={600}
                height={400}
                className="relative z-10 w-full h-auto drop-shadow-2xl rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 80V30C240 60 480 0 720 30C960 60 1200 0 1440 30V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
