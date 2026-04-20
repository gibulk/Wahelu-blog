
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CATEGORIES } from '@/lib/constants';
import { slugify } from '@/lib/utils';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { Article } from '@/types';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const articleSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  category: z.string(),
  cover_image: z.string().optional(),
  published: z.boolean(),
});

type FormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: Article;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState(initialData?.content || '');
  const supabase = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || '',
      excerpt: initialData?.excerpt || '',
      category: initialData?.category || CATEGORIES[0].value,
      cover_image: initialData?.cover_image || '',
      published: initialData?.published || false,
    },
  });

  const coverImage = watch('cover_image');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file);
      if (error) throw error;

      const { data } = supabase.storage.from('article-images').getPublicUrl(fileName);
      setValue('cover_image', data.publicUrl);
    } catch (error) {
      toast.error('Gagal upload gambar');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    const slug = slugify(data.title);
    const payload = {
      ...data,
      content,
      slug,
      published_at: data.published ? new Date().toISOString() : null,
    };

    try {
      if (initialData) {
        const { error } = await supabase
          .from('articles')
          .update(payload)
          .eq('id', initialData.id);
        if (error) throw error;
        toast.success('Artikel diperbarui');
      } else {
        const { error } = await supabase.from('articles').insert(payload);
        if (error) throw error;
        toast.success('Artikel dibuat');
      }
      router.push('/admin/dashboard/articles');
      router.refresh();
    } catch (error) {
      toast.error('Terjadi kesalahan');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Judul</label>
        <Input {...register('title')} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kutipan Singkat</label>
        <Input {...register('excerpt')} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <select
          {...register('category')}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gambar Sampul</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        {coverImage && (
          <img src={coverImage} alt="Preview" className="mt-2 h-32 object-cover rounded" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Konten (Markdown)</label>
        <MDEditor value={content} onChange={(val) => setContent(val || '')} height={400} />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="published" {...register('published')} />
        <label htmlFor="published">Publikasikan</label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : initialData ? 'Update' : 'Simpan'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
      </div>
    </form>
  );
        }
