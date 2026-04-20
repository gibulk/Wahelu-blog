'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/lib/constants';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // pastikan install lucide-react
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-serif text-2xl font-bold">
            Wahelu
          </Link>
          <nav className="hidden md:flex gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/category/${cat.value}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Tentang
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="container md:hidden pb-4">
          <nav className="flex flex-col space-y-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/category/${cat.value}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
