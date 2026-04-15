'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  if (!googleClientId) {
    console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        {children}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
