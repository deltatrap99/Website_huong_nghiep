import { QuizAnswer, RIASECScores, CompetencyProfile, QuizResult } from '@/types/quiz';
import { questions } from '@/data/questions';
import { archetypes } from '@/data/archetypes';

export function calculateRIASEC(answers: QuizAnswer[]): RIASECScores {
  const scores: RIASECScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option?.scores.riasec) return;

    const { dimensions, weight } = option.scores.riasec;
    dimensions.forEach((dim) => {
      scores[dim] += weight;
    });
  });

  return scores;
}

export function calculateMBTILite(answers: QuizAnswer[]): string {
  const dims: Record<string, { positive: number; negative: number }> = {
    EI: { positive: 0, negative: 0 },
    TF: { positive: 0, negative: 0 },
    JP: { positive: 0, negative: 0 },
  };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option?.scores.mbti) return;

    const { dimension, value } = option.scores.mbti;
    if (['E', 'T', 'J'].includes(value)) {
      dims[dimension].positive++;
    } else {
      dims[dimension].negative++;
    }
  });

  const e = dims.EI.positive >= dims.EI.negative ? 'E' : 'I';
  const t = dims.TF.positive >= dims.TF.negative ? 'T' : 'F';
  const j = dims.JP.positive >= dims.JP.negative ? 'J' : 'P';

  return `${e}${t}${j}-lite`;
}

export function calculateCompetency(answers: QuizAnswer[]): CompetencyProfile {
  const profile: CompetencyProfile = { english: 0, self_study: 0, soft_skill: 0 };
  const counts = { english: 0, self_study: 0, soft_skill: 0 };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option?.scores.competency) return;

    const { skill, level } = option.scores.competency;
    if (skill in profile) {
      profile[skill as keyof CompetencyProfile] += level;
      counts[skill as keyof CompetencyProfile]++;
    }
  });

  // Average the competency scores
  for (const key of Object.keys(profile) as (keyof CompetencyProfile)[]) {
    if (counts[key] > 0) {
      profile[key] = Math.round(profile[key] / counts[key]);
    }
  }

  return profile;
}

export function calculateLeadScore(answers: QuizAnswer[]): { score: number; tier: 'hot' | 'warm' | 'cold' } {
  let score = 0;

  // Score from context answers
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option?.scores.context) return;

    score += option.scores.context.score;
  });

  // Score from english competency (higher = more engaged)
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option?.scores.competency) return;

    if (option.scores.competency.skill === 'english' && option.scores.competency.level >= 3) {
      score += 1;
    }
  });

  // Completion bonus
  score += 1;

  const tier = score >= 8 ? 'hot' : score >= 4 ? 'warm' : 'cold';
  return { score, tier };
}

export function generateResult(answers: QuizAnswer[]): QuizResult {
  const riasecScores = calculateRIASEC(answers);
  const mbtiLite = calculateMBTILite(answers);
  const competencyProfile = calculateCompetency(answers);
  const { score: leadScore, tier: leadTier } = calculateLeadScore(answers);

  // Find primary and secondary RIASEC
  const sorted = Object.entries(riasecScores).sort(([, a], [, b]) => b - a);
  const riasecPrimary = sorted[0][0];
  const riasecSecondary = sorted[1][0];

  const archetype = archetypes[riasecPrimary];

  return {
    mbtiLite,
    riasecScores,
    riasecPrimary,
    riasecSecondary,
    archetype,
    competencyProfile,
    leadScore,
    leadTier,
  };
}
