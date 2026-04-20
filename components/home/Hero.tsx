import { Button } from '../ui/Button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Analisis Geopolitik & <br className="hidden sm:inline" />
          Persimpangan Web3
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
          Wahelu — Analis Geopolitik, Geografi, dan Kontributor Web3. Eksplorasi mendalam dinamika global, konflik perbatasan, dan teknologi terdesentralisasi.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/articles">Jelajahi Artikel</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Tentang Saya</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
