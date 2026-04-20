'use client';

import { ThemeProvider } from 'next-themes';
import { createClient } from '@/lib/supabase/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionContextProvider>
  );
}
