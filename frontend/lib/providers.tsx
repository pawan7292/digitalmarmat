'use client';

import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        {children}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
