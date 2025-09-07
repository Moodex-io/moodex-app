'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    if (!email) return;

    const supabase = getSupabase();
    if (!supabase) {
      setStatus('error');
      setErrorMsg('Auth is not configured.');
      return;
    }

    try {
      setStatus('sending');
      const redirectTo =
        (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin) + '/auth/callback';

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) throw error;
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Could not send magic link.');
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-extrabold text-white text-center">Sign in to Moodex</h1>
      <p className="text-slate-300 text-center mt-2">
        Enter your email and we’ll send a one-time magic link.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
          autoComplete="email"
        />
        <button
          className="btn btn-primary w-full"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send magic link'}
        </button>

        {status === 'sent' && (
          <p className="text-sm text-emerald-300 text-center">
            Check your inbox for the sign-in link.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400 text-center">
            {errorMsg || 'Something went wrong.'}
          </p>
        )}
      </form>
    </main>
  );
}
