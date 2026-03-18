import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json({ error: 'Auth service not configured' }, { status: 503 });
  }

  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email và mật khẩu là bắt buộc' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu phải ít nhất 6 ký tự' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || email.split('@')[0] },
      email_confirm: true, // Auto-confirm email for now
    });

    if (error) {
      if (error.message.includes('already')) {
        return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Auto-login after registration
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !loginData.session) {
      // Registration succeeded but auto-login failed — still return success
      return NextResponse.json({
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || '',
          isAdmin: false,
        },
        session: null,
      });
    }

    return NextResponse.json({
      user: {
        id: loginData.user.id,
        email: loginData.user.email,
        name: loginData.user.user_metadata?.name || '',
        isAdmin: false,
      },
      session: {
        accessToken: loginData.session.access_token,
        refreshToken: loginData.session.refresh_token,
        expiresAt: loginData.session.expires_at,
      },
    });
  } catch (err) {
    console.error('[Auth] Register error:', err);
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
