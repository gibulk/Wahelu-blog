import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { slugify } from '@/lib/utils';

// GET: Ambil semua artikel (published saja untuk public)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get('published') !== 'false';
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '50');

  const supabase = createAdminClient();
  
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (publishedOnly) {
    query = query.eq('published', true);
  }

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Buat artikel baru (admin only - perlu auth)
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    
    const slug = slugify(body.title);
    
    const { data, error } = await supabase
      .from('articles')
      .insert({
        ...body,
        slug,
        published_at: body.published ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
