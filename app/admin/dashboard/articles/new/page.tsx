import { ArticleForm } from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Buat Artikel Baru</h1>
      <ArticleForm />
    </div>
  );
}
