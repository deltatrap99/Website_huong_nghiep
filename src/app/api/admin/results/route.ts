import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { adminResultsQuerySchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  // Parse query params
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = adminResultsQuerySchema.safeParse(searchParams);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { page, limit, tier, archetype } = parsed.data;
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('quiz_results')
      .select('*, quiz_sessions(mode, utm_source, ambassador_ref), leads(full_name, phone, email, province, grade)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (tier) {
      query = query.eq('lead_tier', tier);
    }
    if (archetype) {
      query = query.eq('archetype_code', archetype);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('[API] Results query error:', error.message);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    return NextResponse.json({
      results: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (err) {
    console.error('[API] Results error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
