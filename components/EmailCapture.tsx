'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');

  const hosted = process.env.NEXT_PUBLIC_SIGNUP_URL; // optional hosted form

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      // 1) Save to Supabase if configured
      const supabase = getSupabase();
      if (supabase) {
        const { error } = await supabase.from('email_signups').insert({ email, source: 'hero' });
        if (error) throw error;
      } else if (hosted) {
        // fallback to a hosted form if you configured one
        const url = `${hosted}${hosted.includes('?') ? '&' : '?'}email=${encodeURIComponent(email)}`;
        window.open(url, '_blank');
      }

      // 2) Fire the welcome email (best-effort)
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          cache: 'no-store',
        });
      } catch {
        // ignore email send failure here; user already saved
      }

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
        <button className="btn btn-primary w-full sm:w-auto" disabled={status === 'loading'}>
          {status === 'loading' ? 'SAVING…' : 'JOIN THE BETA'}
        </button>

        {status === 'ok' && (
          <div className="muted w-full text-center sm:text-left">Thanks! We’ll be in touch.</div>
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
