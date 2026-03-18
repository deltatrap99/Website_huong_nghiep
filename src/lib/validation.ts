import { z } from 'zod';

// Quiz submission validation
export const quizSubmitSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number().int().min(1).max(88),
      optionId: z.string().min(1),
    })
  ).min(1),
  mode: z.enum(['quick', 'full']),
  leadData: z.object({
    fullName: z.string().min(1),
    phone: z.string().min(5),
    grade: z.string().min(1),
    province: z.string().min(1),
    email: z.string().email().optional().or(z.literal('')),
    source: z.string().optional(),
    ambassadorRef: z.string().optional(),
  }).optional(),
  utm: z.object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    ref: z.string().optional(),
  }).optional(),
});

export type QuizSubmitInput = z.infer<typeof quizSubmitSchema>;

// Admin results filter
export const adminResultsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  tier: z.enum(['hot', 'warm', 'cold']).optional(),
  archetype: z.string().optional(),
});

// Lead query
export const leadQuerySchema = z.object({
  tier: z.enum(['hot', 'warm', 'cold']).optional(),
  contacted: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
