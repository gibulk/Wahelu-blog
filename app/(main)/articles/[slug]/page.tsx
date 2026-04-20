import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { TippingButton } from '@/components/article/TippingButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!article) notFound();

  const categoryLabel = CATEGORIES.find(c => c.value === article.category)?.label || article.category;

  return (
    <article className="container max-w-4xl py-12">
      <header className="mb-8">
        <div className="text-primary text-sm mb-2">{categoryLabel}</div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
        {article.published_at && (
          <time className="text-muted-foreground">{formatDate(article.published_at)}</time>
        )}
      </header>
      {article.cover_image && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </div>
      <div className="border-t pt-8 flex flex-col items-center gap-4">
        <p className="text-muted-foreground text-center">
          Apresiasi analisis ini? Dukung dengan crypto.
        </p>
        <TippingButton />
      </div>
    </article>
  );
}
