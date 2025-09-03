'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'ok'|'err'|'loading'>('idle');

  const hosted = process.env.NEXT_PUBLIC_SIGNUP_URL; // optional hosted form

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    // Try client Supabase; fall back to hosted URL if not configured
    const supabase = getSupabase();
    if (!supabase) {
      if (hosted) {
        const url = `${hosted}${hosted.includes('?') ? '&' : '?'}email=${encodeURIComponent(email)}`;
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
    <form onSubmit={onSubmit} className="email-capture">
      <input
        type="email"
        required
        placeholder="YOU@COMPANY.COM"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        autoComplete="email"
      />
      <button className="btn btn-primary" disabled={status==='loading'}>
        {status === 'loading' ? 'SAVING…' : 'JOIN THE BETA'}
      </button>
      {status === 'ok' && <div className="muted">Thanks! We’ll be in touch.</div>}
      {status === 'err' && <div className="muted">Couldn’t save right now. Try again later.</div>}
    </form>
  );
}
