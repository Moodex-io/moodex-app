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

    const supabase = getSupabase();
    if (!supabase) {
      if (hosted) {
        const url = `${hosted}${hosted.includes('?') ? '&' : '?'}email=${encodeURIComponent(
          email
        )}`;
        window.open(url, '_blank');
        setStatus('ok');
      } else {
        setStatus('err');
      }
      return;
    }

    try {
      setStatus('loading');
      const { error } = await supabase.from('email_signups').insert({ email });
      if (error) throw error;
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

        {/* Inline feedback */}
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
