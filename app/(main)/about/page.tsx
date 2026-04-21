import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Mail, Twitter, Linkedin, Globe } from 'lucide-react';

export const metadata = {
  title: 'Tentang Wahelu',
  description: 'Analis Geopolitik, Geografi, dan Kontributor Web3.',
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Wahelu</h1>
        <p className="text-xl text-muted-foreground">
          Analis Geopolitik & Geografi • Kontributor Web3
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              🌍
            </div>
            {/* Ganti dengan foto profil nanti */}
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <p className="text-lg leading-relaxed">
            Saya adalah seorang analis geopolitik dan geografi dengan fokus pada dinamika konflik perbatasan, 
            ekonomi-politik global, dan persimpangannya dengan teknologi Web3 yang terdesentralisasi.
          </p>
          <p className="text-lg leading-relaxed">
            Melalui platform ini, saya membagikan analisis mendalam berbasis data dan peta interaktif 
            untuk membantu pembaca memahami kompleksitas isu global dengan lebih jernih.
          </p>
          <p className="text-lg leading-relaxed">
            Latar belakang saya mencakup riset akademik di bidang hubungan internasional, 
            pengalaman sebagai kontributor di proyek Web3, serta kolaborasi dengan berbagai 
            think tank dan media analisis strategis.
          </p>
        </div>
      </div>

      <Card className="mb-12">
        <CardContent className="p-6">
          <h2 className="font-serif text-2xl font-bold mb-4">Keahlian & Fokus Analisis</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">🌏 Geopolitik</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Konflik Laut Cina Selatan</li>
                <li>• Dinamika Selat Taiwan</li>
                <li>• Perbatasan India-China</li>
                <li>• Geopolitik Timur Tengah</li>
                <li>• Rivalitas AS-China</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">⛓️ Web3 & Desentralisasi</h3>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Tata kelola terdesentralisasi (DAO)</li>
                <li>• Identitas digital & kedaulatan data</li>
                <li>• Tokenisasi aset dunia nyata</li>
                <li>• Dampak regulasi kripto global</li>
                <li>• DeFi & inklusi keuangan</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center border-t pt-8">
        <h2 className="font-serif text-2xl font-bold mb-4">Terhubung</h2>
        <p className="text-muted-foreground mb-6">
          Untuk kolaborasi riset, wawancara, atau konsultasi.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:wahelu@example.com">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
