import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizAnswer, QuizResult, LeadFormData } from '@/types/quiz';
import { generateResult } from '@/lib/scoring';
import { questions } from '@/data/questions';

interface QuizState {
  // State
  currentQuestion: number;
  answers: QuizAnswer[];
  direction: number;
  result: QuizResult | null;
  leadData: LeadFormData | null;
  showLeadForm: boolean;
  quizStartedAt: number | null;

  // Actions
  startQuiz: () => void;
  answerQuestion: (questionId: number, optionId: string) => void;
  goBack: () => void;
  submitLeadForm: (data: LeadFormData) => void;
  calculateResult: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuestion: 0,
      answers: [],
      direction: 1,
      result: null,
      leadData: null,
      showLeadForm: false,
      quizStartedAt: null,

      startQuiz: () =>
        set({
          currentQuestion: 0,
          answers: [],
          direction: 1,
          result: null,
          leadData: null,
          showLeadForm: false,
          quizStartedAt: Date.now(),
        }),

      answerQuestion: (questionId: number, optionId: string) => {
        const { answers, currentQuestion } = get();
        const newAnswers = answers.filter((a) => a.questionId !== questionId);
        newAnswers.push({ questionId, optionId });

        if (currentQuestion < questions.length - 1) {
          set({
            answers: newAnswers,
            currentQuestion: currentQuestion + 1,
            direction: 1,
          });
        } else {
          // Last question answered — show lead form
          set({
            answers: newAnswers,
            showLeadForm: true,
            direction: 1,
          });
        }
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

      submitLeadForm: (data: LeadFormData) => {
        set({ leadData: data });
        get().calculateResult();
      },

      calculateResult: () => {
        const { answers } = get();
        const result = generateResult(answers);
        set({ result });
      },

      reset: () =>
        set({
          currentQuestion: 0,
          answers: [],
          direction: 1,
          result: null,
          leadData: null,
          showLeadForm: false,
          quizStartedAt: null,
        }),
    }),
    {
      name: 'huong-nghiep-quiz',
      partialize: (state) => ({
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        quizStartedAt: state.quizStartedAt,
      }),
    }
  )
);
