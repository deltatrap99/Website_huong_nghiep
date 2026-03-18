// Quiz Types & Interfaces

export interface QuizQuestion {
  id: number;
  layer: 'hook' | 'career' | 'competency' | 'context';
  text: string;
  subtitle?: string;
  options: QuizOption[];
  type: 'single' | 'multiple';
}

export interface QuizOption {
  id: string;
  text: string;
  emoji?: string;
  scores: {
    mbti?: { dimension: 'EI' | 'JP' | 'TF'; value: 'E' | 'I' | 'J' | 'P' | 'T' | 'F' };
    riasec?: { dimensions: ('R' | 'I' | 'A' | 'S' | 'E' | 'C')[]; weight: number };
    competency?: { skill: 'english' | 'self_study' | 'soft_skill'; level: number };
    context?: { factor: 'goal' | 'budget' | 'career' | 'support'; value: string; score: number };
  };
}

export interface QuizAnswer {
  questionId: number;
  optionId: string;
}

export interface RIASECScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface CompetencyProfile {
  english: number;
  self_study: number;
  soft_skill: number;
}

export interface Career {
  name: string;
  description: string;
  detailedDescription: string;
  salary: string;
  skills: string[];
  icon: string;
}

export interface StrengthItem {
  title: string;
  description: string;
  howToLeverage: string;
}

export interface ImprovementItem {
  title: string;
  description: string;
  actions: string[];
}

export interface LearningPathStep {
  order: number;
  title: string;
  description: string;
  product?: string;
  icon: string;
}

export interface ArchetypeResult {
  code: string;
  name: string;
  nameVi: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
  careers: Career[];
  strengths: StrengthItem[];
  improvements: ImprovementItem[];
  learningPath: LearningPathStep[];
}

export interface QuizResult {
  mbtiLite: string;
  riasecScores: RIASECScores;
  riasecPrimary: string;
  riasecSecondary: string;
  archetype: ArchetypeResult;
  competencyProfile: CompetencyProfile;
  leadScore: number;
  leadTier: 'hot' | 'warm' | 'cold';
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  grade: string;
  province: string;
  email?: string;
  source?: string;
  ambassadorRef?: string;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ref?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: number;
  featured?: boolean;
  content?: string;
}
