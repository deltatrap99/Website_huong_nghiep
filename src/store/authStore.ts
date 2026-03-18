import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizResult } from '@/types/quiz';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
}

interface SavedResult {
  id: string;
  date: string;
  result: QuizResult;
}

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  savedResults: SavedResult[];
  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  checkSession: () => Promise<void>;
  saveResult: (result: QuizResult) => void;
  getAuthHeaders: () => Record<string, string>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      savedResults: [],
      isLoading: false,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });

        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            set({ isLoading: false });
            return false;
          }

          const data = await res.json();
          set({
            user: data.user,
            session: data.session,
            isLoading: false,
          });
          return true;
        } catch (err) {
          console.error('[Auth] Login failed:', err);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });

        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            set({ isLoading: false });
            return { ok: false, error: data.error || 'Đăng ký thất bại' };
          }

          set({
            user: data.user,
            session: data.session,
            isLoading: false,
          });
          return { ok: true };
        } catch (err) {
          console.error('[Auth] Register failed:', err);
          set({ isLoading: false });
          return { ok: false, error: 'Lỗi hệ thống' };
        }
      },

      logout: () => {
        set({ user: null, session: null });
      },

      checkSession: async () => {
        const { session } = get();
        if (!session?.accessToken) return;

        try {
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          });

          if (res.ok) {
            const data = await res.json();
            set({ user: data.user });
          } else {
            // Token expired or invalid
            set({ user: null, session: null });
          }
        } catch {
          // Network error — keep existing state
        }
      },

      saveResult: (result: QuizResult) => {
        const { savedResults, user } = get();
        if (!user) return;
        const newResult: SavedResult = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          result,
        };
        set({ savedResults: [newResult, ...savedResults].slice(0, 20) });
      },

      getAuthHeaders: (): Record<string, string> => {
        const { session } = get();
        if (!session?.accessToken) return {};
        return { Authorization: `Bearer ${session.accessToken}` };
      },
    }),
    {
      name: 'ge-auth',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        savedResults: state.savedResults,
      }),
    }
  )
);
