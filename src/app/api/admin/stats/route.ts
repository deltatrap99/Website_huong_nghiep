import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    // Total quizzes
    const { count: totalQuizzes } = await supabase
      .from('quiz_results')
      .select('*', { count: 'exact', head: true });

    // Quizzes this week
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { count: weeklyQuizzes } = await supabase
      .from('quiz_results')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo);

    // Archetype distribution
    const { data: archetypeData } = await supabase
      .from('quiz_results')
      .select('archetype_code');

    const archetypeDistribution: Record<string, number> = {};
    (archetypeData || []).forEach((r) => {
      archetypeDistribution[r.archetype_code] =
        (archetypeDistribution[r.archetype_code] || 0) + 1;
    });

    // Lead tier breakdown
    const { data: leadData } = await supabase
      .from('leads')
      .select('lead_tier');

    const leadsByTier: Record<string, number> = { hot: 0, warm: 0, cold: 0 };
    (leadData || []).forEach((l) => {
      if (l.lead_tier in leadsByTier) {
        leadsByTier[l.lead_tier]++;
      }
    });

    // Total leads
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    // Quiz mode breakdown
    const { data: modeData } = await supabase
      .from('quiz_sessions')
      .select('mode');

    const modeBreakdown: Record<string, number> = { quick: 0, full: 0 };
    (modeData || []).forEach((m) => {
      if (m.mode in modeBreakdown) {
        modeBreakdown[m.mode]++;
      }
    });

    return NextResponse.json({
      totalQuizzes: totalQuizzes || 0,
      weeklyQuizzes: weeklyQuizzes || 0,
      totalLeads: totalLeads || 0,
      archetypeDistribution,
      leadsByTier,
      modeBreakdown,
    });
  } catch (err) {
    console.error('[API] Stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
