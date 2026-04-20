import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { formatDate } from '@/lib/utils';
import type { Article } from '@/types';
import { CATEGORIES } from '@/lib/constants';

export function ArticleCard({ article }: { article: Article }) {
  const categoryLabel = CATEGORIES.find(c => c.value === article.category)?.label || article.category;

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {article.cover_image && (
        <div className="relative h-48 w-full">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="text-sm text-primary mb-2">{categoryLabel}</div>
        <CardTitle className="line-clamp-2">
          <Link href={`/articles/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {article.published_at && formatDate(article.published_at)}
      </CardFooter>
    </Card>
  );
}
