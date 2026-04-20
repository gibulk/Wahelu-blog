import { Hero } from '@/components/home/Hero';
import { FeaturedArticles } from '@/components/home/FeaturedArticles';
import { WorldMapSection } from '@/components/home/WorldMapSection';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(6);

  return (
    <main className="flex-1">
      <Hero />
      <FeaturedArticles articles={articles || []} />
      <WorldMapSection />
      <NewsletterSignup />
    </main>
  );
}
