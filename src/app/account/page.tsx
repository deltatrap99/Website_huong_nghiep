'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  Shield,
  Users,
  FileText,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function AuthPage() {
  const router = useRouter();
  const { login, register, user, savedResults, logout } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Admin dashboard
  if (user?.isAdmin) {
    return <AdminDashboard />;
  }

  // Logged in user dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16">
        <div className="max-w-[700px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ge-blue to-ge-blue-light flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-heading font-extrabold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-ge-gray-900 mb-1">
              Xin chào, {user.name}!
            </h1>
            <p className="text-ge-gray-500">{user.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-heading font-bold text-xl text-ge-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-ge-blue" />
              Kết quả đã lưu ({savedResults.length})
            </h2>

            {savedResults.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-ge-gray-100 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 size={28} className="text-ge-gray-400" />
                </div>
                <p className="text-ge-gray-600 mb-4">
                  Bạn chưa có kết quả nào. Hãy làm quiz để khám phá ngành nghề phù hợp!
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Làm quiz ngay
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedResults.map((saved) => {
                  const d = new Date(saved.date);
                  const dateStr = d.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  const { archetype, mbtiLite, riasecPrimary, riasecSecondary } = saved.result;
                  return (
                    <div
                      key={saved.id}
                      className="bg-white rounded-2xl shadow-card border border-ge-gray-200/50 overflow-hidden hover:shadow-card-hover transition-all"
                    >
                      <div className="flex items-stretch">
                        <div
                          className="w-2 shrink-0"
                          style={{ background: archetype.gradient }}
                        />
                        <div className="flex-1 p-5 md:p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-heading font-bold text-lg text-ge-gray-900">
                              {archetype.nameVi}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-ge-gray-400">
                              <Clock size={12} />
                              {dateStr}
                            </div>
                          </div>
                          <p className="text-ge-gray-600 text-sm mb-3 line-clamp-2">
                            {archetype.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-ge-blue/10 text-ge-blue px-2.5 py-1 rounded-full font-medium">
                              {mbtiLite}
                            </span>
                            <span className="text-xs bg-ge-orange/10 text-ge-orange px-2.5 py-1 rounded-full font-medium">
                              RIASEC: {riasecPrimary}{riasecSecondary}
                            </span>
                            <span className="text-xs bg-ge-gray-100 text-ge-gray-600 px-2.5 py-1 rounded-full font-medium">
                              {archetype.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <Link
                href="/quiz"
                className="flex-1 text-center py-3 rounded-full gradient-cta text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Làm quiz mới
              </Link>
              <button
                onClick={logout}
                className="px-6 py-3 rounded-full border-2 border-ge-gray-300 text-ge-gray-600 font-semibold hover:bg-ge-gray-100 transition-all"
              >
                Đăng xuất
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const ok = await login(email, password);
      if (ok) {
        setSuccess('Đăng nhập thành công!');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } else {
      if (!name.trim()) {
        setError('Vui lòng nhập họ tên');
        return;
      }
      if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
      const result = await register(name, email, password);
      if (result.ok) {
        setSuccess('Đăng ký thành công!');
      } else {
        setError(result.error || 'Đăng ký thất bại');
      }
    }
  };

  return (
    <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-[440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-card-xl p-6 md:p-10 border border-ge-gray-200/50"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-ge-gray-500 text-sm hover:text-ge-navy mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Trang chủ
          </Link>

          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-ge-gray-900 mb-1">
            {mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </h1>
          <p className="text-ge-gray-500 text-sm mb-6">
            {mode === 'login'
              ? 'Đăng nhập để xem lại kết quả quiz của bạn'
              : 'Tạo tài khoản để lưu và xem lại kết quả quiz'}
          </p>

          {/* Admin toggle */}
          {mode === 'login' && (
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setError('');
                if (!isAdminMode) {
                  setEmail('admin@galaxy.edu.vn');
                } else {
                  setEmail('');
                }
              }}
              className={`w-full flex items-center gap-2.5 p-3.5 rounded-xl mb-5 border-2 transition-all text-sm font-medium ${
                isAdminMode
                  ? 'border-ge-navy bg-ge-navy/5 text-ge-navy'
                  : 'border-ge-gray-200 text-ge-gray-500 hover:border-ge-gray-300'
              }`}
            >
              <Shield size={18} className={isAdminMode ? 'text-ge-navy' : 'text-ge-gray-400'} />
              <span>Bạn là Quản trị viên?</span>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                isAdminMode ? 'bg-ge-navy text-white' : 'bg-ge-gray-100 text-ge-gray-400'
              }`}>
                {isAdminMode ? 'ON' : 'OFF'}
              </span>
            </button>
          )}

          {/* Tabs */}
          {!isAdminMode && (
            <div className="flex bg-ge-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'login'
                    ? 'bg-white text-ge-navy shadow-sm'
                    : 'text-ge-gray-500 hover:text-ge-gray-700'
                }`}
              >
                <LogIn size={14} className="inline mr-1.5" />
                Đăng nhập
              </button>
              <button
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'register'
                    ? 'bg-white text-ge-navy shadow-sm'
                    : 'text-ge-gray-500 hover:text-ge-gray-700'
                }`}
              >
                <UserPlus size={14} className="inline mr-1.5" />
                Đăng ký
              </button>
            </div>
          )}

          {/* Error/Success */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3 mb-4"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3 mb-4"
              >
                <CheckCircle2 size={16} />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && !isAdminMode && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                  <User size={14} /> Họ tên
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            )}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                <Mail size={14} /> {isAdminMode ? 'Email quản trị viên' : 'Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdminMode ? 'admin@galaxy.edu.vn' : 'email@example.com'}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ge-gray-700 mb-1.5">
                <Lock size={14} /> Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={isAdminMode ? 1 : 6}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-ge-gray-200 bg-ge-gray-50 text-ge-gray-800 placeholder:text-ge-gray-400 focus:border-ge-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ge-gray-400 hover:text-ge-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all ${
                isAdminMode
                  ? 'bg-ge-navy text-white'
                  : 'gradient-cta text-white'
              }`}
            >
              {isAdminMode
                ? '🔐 Đăng nhập quản trị'
                : mode === 'login'
                  ? 'Đăng nhập'
                  : 'Tạo tài khoản'}
            </button>
          </form>

          {!isAdminMode && (
            <p className="text-center text-ge-gray-400 text-xs mt-4">
              {mode === 'login' ? (
                <>Chưa có tài khoản? <button onClick={() => setMode('register')} className="text-ge-blue font-medium hover:underline">Đăng ký ngay</button></>
              ) : (
                <>Đã có tài khoản? <button onClick={() => setMode('login')} className="text-ge-blue font-medium hover:underline">Đăng nhập</button></>
              )}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  const { logout, getAuthHeaders } = useAuthStore();
  const [stats, setStats] = useState<{
    totalQuizzes: number;
    weeklyQuizzes: number;
    totalLeads: number;
    archetypeDistribution: Record<string, number>;
    leadsByTier: Record<string, number>;
    modeBreakdown: Record<string, number>;
  } | null>(null);
  const [results, setResults] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const headers = getAuthHeaders();

      try {
        const [statsRes, resultsRes] = await Promise.all([
          fetch('/api/admin/stats', { headers }),
          fetch('/api/admin/results?limit=50', { headers }),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (resultsRes.ok) {
          const data = await resultsRes.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error('[Admin] Fetch error:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, [getAuthHeaders]);

  const totalResults = stats?.totalQuizzes || 0;
  const archetypeCount = stats?.archetypeDistribution || {};
  const recentCount = stats?.weeklyQuizzes || 0;

  const handleExportCSV = async () => {
    const headers = getAuthHeaders();
    try {
      const res = await fetch('/api/admin/export', { headers });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `quiz-results-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('[Admin] Export error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-ge-gray-50 pt-24 pb-16">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        {/* Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ge-navy rounded-3xl p-6 md:p-10 text-white mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={20} className="text-ge-yellow" />
                <span className="text-ge-yellow text-sm font-bold uppercase tracking-wider">Quản trị viên</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl mb-1">
                Dashboard báo cáo
              </h1>
              <p className="text-white/70">Xem toàn bộ dữ liệu và kết quả quiz</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 rounded-full bg-ge-yellow text-ge-navy font-semibold hover:bg-ge-yellow/80 transition-all text-sm flex items-center gap-2"
              >
                <FileText size={16} />
                Xuất CSV
              </button>
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Users, label: 'Lượt quiz', value: totalResults, color: 'text-ge-blue' },
            { icon: FileText, label: '7 ngày gần', value: recentCount, color: 'text-ge-green' },
            { icon: TrendingUp, label: 'Loại hình', value: Object.keys(archetypeCount).length, color: 'text-ge-orange' },
            { icon: BarChart3, label: 'Dữ liệu', value: loading ? '...' : 'Supabase', color: 'text-ge-coral' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5 text-center">
              <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
              <p className="font-heading font-extrabold text-2xl text-ge-gray-900">{stat.value}</p>
              <p className="text-ge-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Archetype Distribution */}
        {Object.keys(archetypeCount).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl shadow-card p-6 md:p-8 mb-8"
          >
            <h2 className="font-heading font-bold text-lg text-ge-gray-900 mb-4">
              📊 Phân bổ loại hình
            </h2>
            <div className="space-y-3">
              {Object.entries(archetypeCount)
                .sort((a, b) => b[1] - a[1])
                .map(([name, count]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-ge-gray-700">{name}</span>
                      <span className="text-ge-gray-500">{count} kết quả</span>
                    </div>
                    <div className="h-2.5 bg-ge-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-ge-blue to-ge-blue-light rounded-full transition-all"
                        style={{ width: `${(count / totalResults) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* User List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-card p-6 md:p-8"
        >
          <h2 className="font-heading font-bold text-lg text-ge-gray-900 mb-4">
            📋 Kết quả quiz ({totalResults})
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-3 border-ge-blue border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-ge-gray-500 text-sm">Đang tải dữ liệu từ Supabase...</p>
            </div>
          ) : results.length === 0 ? (
            <p className="text-ge-gray-500 text-sm py-4 text-center">Chưa có kết quả nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-ge-gray-100">
                    <th className="px-3 py-3 text-left font-semibold text-ge-gray-500 text-xs uppercase tracking-wider">Thời gian</th>
                    <th className="px-3 py-3 text-left font-semibold text-ge-gray-500 text-xs uppercase tracking-wider">MBTI</th>
                    <th className="px-3 py-3 text-left font-semibold text-ge-gray-500 text-xs uppercase tracking-wider">RIASEC</th>
                    <th className="px-3 py-3 text-left font-semibold text-ge-gray-500 text-xs uppercase tracking-wider">Kết quả</th>
                    <th className="px-3 py-3 text-center font-semibold text-ge-gray-500 text-xs uppercase tracking-wider">Lead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ge-gray-100">
                  {results.map((r: Record<string, unknown>) => (
                    <tr key={String(r.id)} className="hover:bg-ge-gray-50 transition-colors">
                      <td className="px-3 py-3 text-ge-gray-600 whitespace-nowrap">
                        {r.created_at ? new Date(String(r.created_at)).toLocaleString('vi-VN', {
                          day: '2-digit', month: '2-digit', year: '2-digit',
                          hour: '2-digit', minute: '2-digit'
                        }) : '—'}
                      </td>
                      <td className="px-3 py-3">
                        <span className="bg-ge-blue/10 text-ge-blue px-2 py-0.5 rounded-full text-xs font-bold">
                          {String(r.mbti_lite || '')}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="bg-ge-orange/10 text-ge-orange px-2 py-0.5 rounded-full text-xs font-bold">
                          {String(r.riasec_primary || '')}{String(r.riasec_secondary || '')}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-medium text-ge-gray-900">{String(r.archetype_code || '')}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          r.lead_tier === 'hot' ? 'bg-green-100 text-green-700' :
                          r.lead_tier === 'warm' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-ge-gray-100 text-ge-gray-500'
                        }`}>
                          {String(r.lead_tier || 'cold')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
