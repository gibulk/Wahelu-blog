'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { useSession } from '@/app/providers';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/dashboard/articles', label: 'Artikel', icon: '📄' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { supabase } = useSession();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logout berhasil');
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold">Wahelu Admin</h2>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant={pathname === item.href ? 'default' : 'ghost'} className="w-full justify-start">
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <Button variant="outline" onClick={handleLogout} className="justify-start">
        <span className="mr-2">🚪</span>
        Logout
      </Button>
    </aside>
  );
}
