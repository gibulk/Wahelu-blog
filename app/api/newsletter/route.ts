import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email tidak valid' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

    if (error) {
      if (error.code === '23505') { // unique violation
        return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
