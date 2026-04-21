'use client';

import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="font-serif text-4xl font-bold mb-4">Terjadi Kesalahan</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>Coba Lagi</Button>
        <Button variant="outline" asChild>
          <a href="/">Kembali ke Beranda</a>
        </Button>
      </div>
    </div>
  );
}
