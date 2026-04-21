import { createClient } from '@/lib/supabase/server';
import { ArticleCard } from '@/components/article/ArticleCard';
import { CategoryFilter } from '@/components/article/CategoryFilter';
import { CATEGORIES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = CATEGORIES.find(c => c.value === params.category);
  return {
    title: category?.label || 'Kategori',
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const categoryData = CATEGORIES.find(c => c.value === category);
  
  if (!categoryData) {
    notFound();
  }

  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .order('published_at', { ascending: false });

  return (
    <div className="container py-12">
      <h1 className="font-serif text-4xl font-bold mb-4">{categoryData.label}</h1>
      <p className="text-muted-foreground mb-8">
        Kumpulan analisis dan artikel seputar {categoryData.label.toLowerCase()}.
      </p>
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
