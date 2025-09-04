// components/EmailCapture.tsx
'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      setStatus('loading');
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero' }),
      });
      const json = await r.json();
      if (!r.ok || !json.ok) throw new Error('bad');
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
