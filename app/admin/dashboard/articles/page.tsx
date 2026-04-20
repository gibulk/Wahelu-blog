import { createClient } from '@/lib/supabase/server';
import { ArticleTable } from '@/components/admin/ArticleTable';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default async function ArticlesAdminPage() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Kelola Artikel</h1>
        <Button asChild>
          <Link href="/admin/dashboard/articles/new">
            <Plus className="mr-2 h-4 w-4" />
            Artikel Baru
          </Link>
        </Button>
      </div>
      <ArticleTable articles={articles || []} />
    </div>
  );
}
