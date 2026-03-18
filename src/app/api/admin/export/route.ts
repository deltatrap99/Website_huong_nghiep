import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select(`
        id, mbti_lite, riasec_primary, riasec_secondary, archetype_code,
        riasec_scores, competency, lead_score, lead_tier, created_at,
        leads(full_name, phone, email, province, grade)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Export failed' }, { status: 500 });
    }

    // Build CSV
    const headers = [
      'Ngày', 'Họ tên', 'SĐT', 'Email', 'Tỉnh', 'Lớp',
      'MBTI-Lite', 'RIASEC Primary', 'RIASEC Secondary', 'Archetype',
      'R', 'I', 'A', 'S', 'E', 'C',
      'English', 'Self Study', 'Soft Skill',
      'Lead Score', 'Lead Tier',
    ];

    const rows = (data || []).map((r) => {
      const lead = Array.isArray(r.leads) ? r.leads[0] : r.leads;
      const scores = r.riasec_scores as Record<string, number> || {};
      const comp = r.competency as Record<string, number> || {};

      return [
        new Date(r.created_at).toLocaleString('vi-VN'),
        lead?.full_name || '',
        lead?.phone || '',
        lead?.email || '',
        lead?.province || '',
        lead?.grade || '',
        r.mbti_lite,
        r.riasec_primary,
        r.riasec_secondary,
        r.archetype_code,
        scores.R || 0,
        scores.I || 0,
        scores.A || 0,
        scores.S || 0,
        scores.E || 0,
        scores.C || 0,
        comp.english || 0,
        comp.self_study || 0,
        comp.soft_skill || 0,
        r.lead_score,
        r.lead_tier,
      ];
    });

    const escapeCSV = (val: unknown) => {
      const str = String(val ?? '');
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    };

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n');

    const BOM = '\uFEFF';
    return new NextResponse(BOM + csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="huong-nghiep-results-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    console.error('[API] Export error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
