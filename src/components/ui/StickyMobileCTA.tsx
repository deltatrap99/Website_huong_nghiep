'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercentage > 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-white/90 backdrop-blur-md border-t border-ge-gray-200 shadow-xl"
        >
          <Link
            href="/quiz"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full gradient-cta text-white font-bold text-base shadow-lg active:scale-[0.98] transition-transform"
          >
            <Sparkles size={18} />
            Khám phá ngành phù hợp
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
