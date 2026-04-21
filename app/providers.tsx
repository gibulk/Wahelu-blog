'use client';

import { ThemeProvider } from 'next-themes';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Session, SupabaseClient } from '@supabase/supabase-js';

type SessionContextType = {
  session: Session | null;
  supabase: SupabaseClient;
  loading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  supabase: null as any,
  loading: true,
});

export const useSession = () => useContext(SessionContext);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      router.refresh();
    });
    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <SessionContext.Provider value={{ session, supabase, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
