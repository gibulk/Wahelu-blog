import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Tentang Wahelu',
  description: 'Analis Geopolitik, Geografi, dan Kontributor Web3.',
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Wahelu</h1>
        <p className="text-xl text-muted-foreground">Analis Geopolitik & Geografi • Kontributor Web3</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">🌍</div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <p className="text-lg leading-relaxed">
            Saya adalah seorang analis geopolitik dan geografi dengan fokus pada dinamika konflik perbatasan, ekonomi-politik global, dan persimpangannya dengan teknologi Web3 yang terdesentralisasi.
          </p>
          <p className="text-lg leading-relaxed">
            Melalui platform ini, saya membagikan analisis mendalam berbasis data dan peta interaktif untuk membantu pembaca memahami kompleksitas isu global dengan lebih jernih.
          </p>
        </div>
      </div>
      <div className="text-center border-t pt-8">
        <h2 className="font-serif text-2xl font-bold mb-4">Terhubung</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:wahelu@example.com"><span className="mr-2">📧</span>Email</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#"><span className="mr-2">🐦</span>Twitter</a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#"><span className="mr-2">💼</span>LinkedIn</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
