'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { FileText, Home, LogOut } from 'lucide-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/dashboard/articles', label: 'Artikel', icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold">Wahelu Admin</h2>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <Button variant="outline" onClick={handleLogout} className="justify-start">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </aside>
  );
}
