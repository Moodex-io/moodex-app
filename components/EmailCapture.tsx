'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

type Props = {
  /** Where this form lives: 'hero' | 'footer' | 'modal' | etc. */
  source?: string;
};

export default function EmailCapture({ source = 'hero' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');

  // Optional hosted fallback (e.g., Carrd/ConvertKit form)
  const hosted = process.env.NEXT_PUBLIC_SIGNUP_URL;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    const supabase = getSupabase();

    // If Supabase isn’t configured, fall back to hosted form (if provided)
    if (!supabase) {
      if (hosted) {
        const url = `${hosted}${hosted.includes('?') ? '&' : '?'}email=${encodeURIComponent(email)}&source=${encodeURIComponent(source)}`;
        window.open(url, '_blank');
        setStatus('ok');
      } else {
        setStatus('err');
      }
      return;
    }

    try {
      setStatus('loading');

      // Insert with a source so we can track placement performance
      const { error } = await supabase.from('email_signups').insert({ email, source });

      // If email is unique and already exists, Supabase will throw 23505 (unique_violation)
      // We treat that as success to avoid confusing users who already signed up.
      // @ts-ignore (Supabase error has .code)
      if (error && error.code !== '23505') throw error;

      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('err');
    }
  }

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <input
          type="email"
          required
          placeholder="YOU@COMPANY.COM"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full sm:flex-1"
          autoComplete="email"
        />
        <button
          className="btn btn-primary w-full sm:w-auto"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'SAVING…' : 'JOIN THE BETA'}
        </button>

        {status === 'ok' && (
          <div className="muted w-full text-center sm:text-left">
            Thanks! We’ll be in touch.
          </div>
        )}
        {status === 'err' && (
          <div className="muted w-full text-center sm:text-left">
            Couldn’t save right now. Try again later.
          </div>
        )}
      </form>
    </div>
  );
}
