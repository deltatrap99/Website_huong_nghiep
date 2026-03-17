'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/blog', label: 'Blog' },
  { href: '/ambassador', label: 'Đại sứ' },
  { href: '/account', label: 'Tài khoản' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className={`transition-all duration-300 rounded-lg ${
              isScrolled ? '' : 'bg-white/90 backdrop-blur-sm px-3 py-1.5'
            }`}>
              <img
                src="https://education.galaxy.com.vn/images/img-glx-edu-small.png"
                alt="Galaxy Education"
                className="h-8 md:h-10"
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isScrolled
                      ? active
                        ? 'text-ge-blue bg-ge-blue/8 font-semibold'
                        : 'text-ge-gray-600 hover:text-ge-navy hover:bg-ge-gray-100'
                      : active
                        ? 'text-white bg-white/20 font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.href === '/account' ? (
                    <span className="flex items-center gap-1.5">
                      {user ? (
                        <>
                          <span className="w-5 h-5 rounded-full bg-ge-blue text-white flex items-center justify-center text-[10px] font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                          {user.name.split(' ').pop()}
                        </>
                      ) : (
                        <>
                          <User size={14} />
                          Đăng nhập
                        </>
                      )}
                    </span>
                  ) : (
                    link.label
                  )}
                </Link>
              );
            })}
            <Link
              href="/quiz"
              className={`ml-2 px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ${
                pathname.startsWith('/quiz')
                  ? 'bg-ge-navy text-white'
                  : 'gradient-cta text-white'
              }`}
            >
              {pathname.startsWith('/quiz') ? '📝 Đang làm Quiz' : 'Làm quiz ngay'}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-ge-gray-800' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-ge-gray-200 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-ge-blue/8 text-ge-blue font-semibold'
                        : 'text-ge-gray-800 hover:bg-ge-gray-50'
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-ge-blue" />}
                    {link.href === '/account' ? (
                      <span className="flex items-center gap-2">
                        <User size={16} />
                        {user ? user.name : 'Đăng nhập / Đăng ký'}
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                );
              })}
              <Link
                href="/quiz"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-3 rounded-full gradient-cta text-white font-semibold text-center shadow-lg"
              >
                Làm quiz ngay ✨
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
