'use client';

import type { Article } from '@/types';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { formatDate } from '@/lib/utils';
import { useSession } from '@/app/providers';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function ArticleTable({ articles }: { articles: Article[] }) {
  const { supabase } = useSession();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      toast.error('Gagal menghapus artikel');
    } else {
      toast.success('Artikel dihapus');
      router.refresh();
    }
  };

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-3 text-left">Judul</th>
            <th className="p-3 text-left">Kategori</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Tanggal</th>
            <th className="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t">
              <td className="p-3">{article.title}</td>
              <td className="p-3">{article.category}</td>
              <td className="p-3">
                <span className={article.published ? 'text-green-600' : 'text-yellow-600'}>
                  {article.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="p-3">{formatDate(article.created_at)}</td>
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/admin/dashboard/articles/${article.id}/edit`}>
                      <span>✏️</span>
                    </Link>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(article.id)}>
                    <span>🗑️</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
