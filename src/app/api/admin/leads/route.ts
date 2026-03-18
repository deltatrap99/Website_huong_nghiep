import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { leadQuerySchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const parsed = leadQuerySchema.safeParse(searchParams);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { tier, contacted, page, limit } = parsed.data;
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (tier) query = query.eq('lead_tier', tier);
    if (contacted !== undefined) query = query.eq('contacted', contacted);

    const { data, count, error } = await query;

    if (error) {
      console.error('[API] Leads query error:', error.message);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    return NextResponse.json({
      leads: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (err) {
    console.error('[API] Leads error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Mark a lead as contacted
export async function PATCH(request: NextRequest) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const { id, contacted } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing lead ID' }, { status: 400 });
    }

    const { error } = await supabase
      .from('leads')
      .update({ contacted: contacted ?? true })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[API] Lead update error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
