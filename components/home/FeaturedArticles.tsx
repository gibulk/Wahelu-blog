import { ArticleCard } from '../article/ArticleCard';
import type { Article } from '@/types';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className="container py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl font-bold">Artikel Terbaru</h2>
        <Button variant="ghost" asChild>
          <Link href="/articles">Lihat semua →</Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
