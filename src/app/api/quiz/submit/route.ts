import { NextRequest, NextResponse } from 'next/server';
import { quizSubmitSchema } from '@/lib/validation';
import { generateResult } from '@/lib/scoring';
import { getSupabaseServer } from '@/lib/supabase-server';
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { QuizAnswer } from '@/types/quiz';

export async function POST(request: NextRequest) {
  // Rate limit
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
  const { allowed } = rateLimit(ip);
  if (!allowed) return rateLimitResponse();

  try {
    const body = await request.json();
    const parsed = quizSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { answers, mode, leadData, utm } = parsed.data;

    // Server-side scoring
    const quizAnswers: QuizAnswer[] = answers.map((a) => ({
      questionId: a.questionId,
      optionId: a.optionId,
    }));
    const result = generateResult(quizAnswers);

    // Save to Supabase
    const supabase = getSupabaseServer();
    let resultId: string | null = null;

    if (supabase) {
      try {
        // 1. Insert quiz session
        const { data: session, error: sessionError } = await supabase
          .from('quiz_sessions')
          .insert({
            mode,
            answers_json: quizAnswers,
            utm_source: utm?.utm_source || null,
            utm_medium: utm?.utm_medium || null,
            utm_campaign: utm?.utm_campaign || null,
            ambassador_ref: utm?.utm_source || leadData?.ambassadorRef || utm?.ref || null,
          })
          .select('id')
          .single();

        if (sessionError) {
          console.error('[API] Session insert error:', sessionError.message);
        }

        const sessionId = session?.id;

        // 2. Insert quiz result
        if (sessionId) {
          const { data: resultRow, error: resultError } = await supabase
            .from('quiz_results')
            .insert({
              session_id: sessionId,
              mbti_lite: result.mbtiLite,
              riasec_primary: result.riasecPrimary,
              riasec_secondary: result.riasecSecondary,
              riasec_scores: result.riasecScores,
              archetype_code: result.archetype.code,
              competency: result.competencyProfile,
              lead_score: result.leadScore,
              lead_tier: result.leadTier,
              result_json: result,
            })
            .select('id')
            .single();

          if (resultError) {
            console.error('[API] Result insert error:', resultError.message);
          }
          resultId = resultRow?.id || null;
        }

        // 3. Insert lead (if lead data provided)
        if (sessionId && leadData) {
          const { error: leadError } = await supabase
            .from('leads')
            .insert({
              session_id: sessionId,
              full_name: leadData.fullName,
              phone: leadData.phone,
              email: leadData.email || null,
              province: leadData.province,
              grade: leadData.grade,
              lead_tier: result.leadTier,
              ambassador_ref: utm?.utm_source || leadData.ambassadorRef || utm?.ref || null,
            });

          if (leadError) {
            console.error('[API] Lead insert error:', leadError.message);
          }
        }
      } catch (dbErr) {
        console.error('[API] Database error:', dbErr);
        // Don't fail the request — still return the result
      }
    }

    return NextResponse.json({
      resultId,
      result,
    });
  } catch (err) {
    console.error('[API] Quiz submit error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
