'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/admin/login');
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Memeriksa autentikasi...</p>
      </div>
    );
  }

  return <>{children}</>;
}
