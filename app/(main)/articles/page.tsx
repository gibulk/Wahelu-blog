import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/article/ArticleCard';
import { CategoryFilter } from '@/components/article/CategoryFilter';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const supabase = createClient();
  const category = searchParams.category;

  let query = supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data: articles } = await query;

  return (
    <div className="container py-12">
      <h1 className="font-serif text-4xl font-bold mb-8">Semua Artikel</h1>
      <CategoryFilter currentCategory={category} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {(!articles || articles.length === 0) && (
        <p className="text-center text-muted-foreground py-12">
          Belum ada artikel dalam kategori ini.
        </p>
      )}
    </div>
  );
}
