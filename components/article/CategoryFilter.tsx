'use client';

import { CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

export function CategoryFilter({ currentCategory }: { currentCategory?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/articles">
        <Button variant={!currentCategory ? 'default' : 'outline'} size="sm">
          Semua
        </Button>
      </Link>
      {CATEGORIES.map((cat) => (
        <Link key={cat.value} href={`/articles?category=${cat.value}`}>
          <Button
            variant={currentCategory === cat.value ? 'default' : 'outline'}
            size="sm"
          >
            {cat.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
