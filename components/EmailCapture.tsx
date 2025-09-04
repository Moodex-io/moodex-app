'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');
  const [debug, setDebug] = useState<string | null>(null); // <- show exact error in dev

  const hosted = process.env.NEXT_PUBLIC_SIGNUP_URL; // optional fallback form

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDebug(null);

    if (!email) return;

    const supabase = getSupabase();
    if (!supabase) {
      if (hosted) {
        const url = `${hosted}${hosted.includes('?') ? '&' : '?'}email=${encodeURIComponent(email)}`;
        window.open(url, '_blank');
        setStatus('ok');
      } else {
        setStatus('err');
        setDebug('Supabase client not configured (missing envs).');
      }
      return;
    }

    try {
      setStatus('loading');

      // include a source so you can see where the signup came from
      const { error } = await supabase
        .from('email_signups')
        .insert({ email, source: 'hero' });

      if (error) {
        console.error('[EmailCapture] insert error:', error);
        setDebug(`${error.code ?? ''} ${error.message ?? error.toString()}`);
        throw error;
      }

      setStatus('ok');
      setEmail('');
    } catch (e: any) {
      console.error('[EmailCapture] failed:', e);
      setStatus('err');
      if (!debug) setDebug(e?.message ?? String(e));
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

        {/* Dev-only error details (won’t show in production UI) */}
        {process.env.NODE_ENV !== 'production' && debug && (
          <div className="muted w-full text-center sm:text-left">
            <span className="opacity-70">debug:</span> {debug}
          </div>
        )}
      </form>
    </div>
  );
}
