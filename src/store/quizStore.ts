import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizAnswer, QuizResult, LeadFormData } from '@/types/quiz';
import { generateResult } from '@/lib/scoring';
import { questions as allQuestions } from '@/data/questions';
import { QUICK_QUESTION_IDS } from '@/data/quickQuestionIds';

export type QuizMode = 'quick' | 'full';

// Get the filtered question list based on mode
function getQuestionList(mode: QuizMode) {
  if (mode === 'quick') {
    return allQuestions.filter((q) => QUICK_QUESTION_IDS.includes(q.id));
  }
  return allQuestions;
}

// Section break indices for full mode (after Q30=index 29, Q59=index 58)
const FULL_SECTION_BREAKS = [29, 58];

interface QuizState {
  // State
  quizMode: QuizMode | null;
  currentQuestion: number;
  answers: QuizAnswer[];
  direction: number;
  result: QuizResult | null;
  leadData: LeadFormData | null;
  showLeadForm: boolean;
  sectionBreak: boolean;
  sectionIntro: boolean;
  isSubmitting: boolean;
  quizStartedAt: number | null;

  // Actions
  startQuiz: (mode: QuizMode) => void;
  answerQuestion: (questionId: number, optionId: string) => void;
  goBack: () => void;
  continueSectionBreak: () => void;
  continueSectionIntro: () => void;
  submitLeadForm: (data: LeadFormData) => Promise<void>;
  calculateResult: () => void;
  reset: () => void;
  getQuestions: () => typeof allQuestions;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quizMode: null,
      currentQuestion: 0,
      answers: [],
      direction: 1,
      result: null,
      leadData: null,
      showLeadForm: false,
      sectionBreak: false,
      sectionIntro: false,
      isSubmitting: false,
      quizStartedAt: null,

      getQuestions: () => {
        const { quizMode } = get();
        return getQuestionList(quizMode ?? 'full');
      },

      startQuiz: (mode: QuizMode) =>
        set({
          quizMode: mode,
          currentQuestion: 0,
          answers: [],
          direction: 1,
          result: null,
          leadData: null,
          showLeadForm: false,
          sectionBreak: false,
          sectionIntro: true,  // Show MBTI intro first
          isSubmitting: false,
          quizStartedAt: Date.now(),
        }),

      continueSectionIntro: () => set({ sectionIntro: false }),

      answerQuestion: (questionId: number, optionId: string) => {
        const { answers, currentQuestion, quizMode } = get();
        const questionList = getQuestionList(quizMode ?? 'full');
        const newAnswers = answers.filter((a) => a.questionId !== questionId);
        newAnswers.push({ questionId, optionId });

        if (currentQuestion >= questionList.length - 1) {
          // Last question answered — show lead form
          set({
            answers: newAnswers,
            showLeadForm: true,
            direction: 1,
          });
        } else if (quizMode === 'full' && FULL_SECTION_BREAKS.includes(currentQuestion)) {
          // End of section (full mode only) — show section break screen
          set({
            answers: newAnswers,
            sectionBreak: true,
            direction: 1,
          });
        } else {
          set({
            answers: newAnswers,
            currentQuestion: currentQuestion + 1,
            direction: 1,
          });
        }
      },

      continueSectionBreak: () => {
        const { currentQuestion } = get();
        set({
          sectionBreak: false,
          currentQuestion: currentQuestion + 1,
          direction: 1,
        });
      },

      goBack: () => {
        const { currentQuestion } = get();
        if (currentQuestion > 0) {
          set({
            currentQuestion: currentQuestion - 1,
            direction: -1,
          });
        }
      },

      submitLeadForm: async (data: LeadFormData) => {
        set({ leadData: data, isSubmitting: true });

        const { answers, quizMode } = get();

        // Try server-side scoring via API
        try {
          // Retrieve UTM from localStorage
          let utm = {};
          if (typeof window !== 'undefined') {
            try {
              utm = JSON.parse(localStorage.getItem('huong_nghiep_utm') || '{}');
            } catch { /* ignore */ }
          }

          const res = await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              answers,
              mode: quizMode || 'full',
              leadData: data,
              utm,
            }),
          });

          if (res.ok) {
            const { result } = await res.json();
            set({ result, isSubmitting: false });
            return;
          }
        } catch (err) {
          console.warn('[Quiz] API failed, falling back to client scoring:', err);
        }

        // Fallback: client-side scoring
        const result = generateResult(answers);
        set({ result, isSubmitting: false });
      },

      calculateResult: () => {
        const { answers } = get();
        const result = generateResult(answers);
        set({ result });
      },

      reset: () =>
        set({
          quizMode: null,
          currentQuestion: 0,
          answers: [],
          direction: 1,
          result: null,
          leadData: null,
          showLeadForm: false,
          sectionBreak: false,
          sectionIntro: false,
          isSubmitting: false,
          quizStartedAt: null,
        }),
    }),
    {
      name: 'huong-nghiep-quiz',
      partialize: (state) => ({
        quizMode: state.quizMode,
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        quizStartedAt: state.quizStartedAt,
      }),
    }
  )
);
