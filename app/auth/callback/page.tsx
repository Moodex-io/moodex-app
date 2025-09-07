'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Finalizing sign-in…');

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setMessage('Auth is not configured.');
      return;
    }

    // This triggers Supabase to parse tokens in the URL and set the session.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setMessage('Could not complete sign-in.');
        return;
      }
      if (data?.session) {
        setMessage('Signed in! Redirecting…');
        // Small delay for UX, then go to dashboard
        setTimeout(() => router.replace('/dashboard'), 600);
      } else {
        setMessage('No session found. Try logging in again.');
      }
    });
  }, [router]);

  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <p className="text-slate-200">{message}</p>
    </main>
  );
}
