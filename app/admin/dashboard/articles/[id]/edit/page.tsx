import { createClient } from '@/lib/supabase/server';
import { ArticleForm } from '@/components/admin/ArticleForm';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!article) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Artikel</h1>
      <ArticleForm initialData={article} />
    </div>
  );
}
