'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { useSession } from '@/app/providers';
import toast from 'react-hot-toast';

// Icon sederhana tanpa lucide-react
const HomeIcon = () => <span className="mr-2">🏠</span>;
const FileIcon = () => <span className="mr-2">📄</span>;
const LogoutIcon = () => <span className="mr-2">🚪</span>;

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/admin/dashboard/articles', label: 'Artikel', icon: FileIcon },
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
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Icon />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <Button variant="outline" onClick={handleLogout} className="justify-start">
        <LogoutIcon />
        Logout
      </Button>
    </aside>
  );
}
