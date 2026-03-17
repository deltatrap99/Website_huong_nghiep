import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizResult } from '@/types/quiz';

interface SavedResult {
  id: string;
  date: string;
  result: QuizResult;
}

interface AuthState {
  user: { name: string; email: string; isAdmin?: boolean } | null;
  savedResults: SavedResult[];
  login: (email: string, password: string, name?: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  saveResult: (result: QuizResult) => void;
}

// Simple client-side auth with localStorage (demo purposes)
const ADMIN_EMAIL = 'tuanbq@hocmai.vn';
const ADMIN_PASSWORD = 'Quoctuan6699@';

const getAccounts = (): Record<string, { name: string; password: string }> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('ge-accounts') || '{}');
  } catch {
    return {};
  }
};

const saveAccounts = (accounts: Record<string, { name: string; password: string }>) => {
  localStorage.setItem('ge-accounts', JSON.stringify(accounts));
};

export const getAllUserResults = (): { email: string; name: string; results: SavedResult[] }[] => {
  if (typeof window === 'undefined') return [];
  const results: { email: string; name: string; results: SavedResult[] }[] = [];
  const accounts = getAccounts();
  for (const [email, account] of Object.entries(accounts)) {
    try {
      const stored = JSON.parse(localStorage.getItem(`ge-results-${email}`) || '[]');
      results.push({ email, name: account.name, results: stored });
    } catch {
      // skip
    }
  }
  return results;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      savedResults: [],

      login: (email: string, password: string) => {
        // Admin login
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({ user: { name: 'Admin', email: ADMIN_EMAIL, isAdmin: true } });
          return true;
        }
        const accounts = getAccounts();
        const account = accounts[email];
        if (account && account.password === password) {
          set({ user: { name: account.name, email } });
          return true;
        }
        return false;
      },

      register: (name: string, email: string, password: string) => {
        const accounts = getAccounts();
        if (accounts[email]) return false; // already exists
        accounts[email] = { name, password };
        saveAccounts(accounts);
        set({ user: { name, email } });
        return true;
      },

      logout: () => set({ user: null }),

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
    }),
    {
      name: 'ge-auth',
    }
  )
);
