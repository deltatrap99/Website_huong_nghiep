import { getSupabase } from './supabase';
import { QuizResult } from '@/types/quiz';

export interface QuizResultRow {
  id?: string;
  created_at?: string;
  mbti_lite: string;
  riasec_primary: string;
  riasec_secondary: string;
  archetype_code: string;
  archetype_name_vi: string;
  archetype_name_en: string;
  r_score: number;
  i_score: number;
  a_score: number;
  s_score: number;
  e_score: number;
  c_score: number;
  english_score: number;
  self_study_score: number;
  soft_skill_score: number;
  lead_score: number;
  careers: string;
  strengths: string;
  improvements: string;
  // Full result JSON for re-hydration
  result_json: string;
}

// Save a quiz result to Supabase
export async function saveQuizResult(result: QuizResult): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn('[Supabase] Not configured, skipping save');
    return false;
  }

  try {
    const row: Omit<QuizResultRow, 'id' | 'created_at'> = {
      mbti_lite: result.mbtiLite,
      riasec_primary: result.riasecPrimary,
      riasec_secondary: result.riasecSecondary,
      archetype_code: result.archetype.code,
      archetype_name_vi: result.archetype.nameVi,
      archetype_name_en: result.archetype.name,
      r_score: result.riasecScores.R,
      i_score: result.riasecScores.I,
      a_score: result.riasecScores.A,
      s_score: result.riasecScores.S,
      e_score: result.riasecScores.E,
      c_score: result.riasecScores.C,
      english_score: result.competencyProfile.english,
      self_study_score: result.competencyProfile.self_study,
      soft_skill_score: result.competencyProfile.soft_skill,
      lead_score: result.leadScore,
      careers: result.archetype.careers.map((c) => c.name).join(', '),
      strengths: result.archetype.strengths.map((s) => s.title).join(', '),
      improvements: result.archetype.improvements.map((i) => i.title).join(', '),
      result_json: JSON.stringify(result),
    };

    const { error } = await supabase.from('quiz_results').insert(row);

    if (error) {
      console.error('[Supabase] Insert error:', error.message);
      return false;
    }

    console.log('[Supabase] Result saved successfully');
    return true;
  } catch (err) {
    console.error('[Supabase] Failed to save:', err);
    return false;
  }
}

// Get all quiz results (for admin dashboard)
export async function getAllQuizResults(): Promise<QuizResultRow[]> {
  if (!getSupabase()) return [];
  const supabase = getSupabase()!;

  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Fetch error:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('[Supabase] Failed to fetch:', err);
    return [];
  }
}

// Get stats for admin dashboard
export async function getQuizStats() {
  const results = await getAllQuizResults();

  const totalResults = results.length;

  // Archetype distribution
  const archetypeCount: Record<string, number> = {};
  results.forEach((r) => {
    archetypeCount[r.archetype_name_vi] = (archetypeCount[r.archetype_name_vi] || 0) + 1;
  });

  // Recent results (last 7 days)
  const week = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentCount = results.filter(
    (r) => r.created_at && new Date(r.created_at).getTime() > week
  ).length;

  return {
    totalResults,
    archetypeCount,
    recentCount,
    results,
  };
}
