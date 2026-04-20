'use client';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success('Berhasil berlangganan!');
      setEmail('');
    } catch (error) {
      toast.error('Gagal berlangganan, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-bold">Dapatkan Analisis Terbaru</h2>
        <p className="mt-4 text-muted-foreground">
          Berlangganan newsletter untuk menerima artikel terbaru langsung di inbox Anda.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Alamat email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Memproses...' : 'Berlangganan'}
          </Button>
        </form>
      </div>
    </section>
  );
}
