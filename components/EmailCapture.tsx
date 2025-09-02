'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('waitlist').insert({ email });
    setStatus(error ? 'err' : 'ok');
    if (!error) setEmail('');
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input className="px-3 py-2 rounded bg-white/10 border border-white/15"
             type="email" placeholder="email@you.com" required
             value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="px-4 py-2 rounded bg-cyan-500 font-bold"
              disabled={status==='loading'}>
        {status==='loading' ? 'Saving…' : 'Join Beta'}
      </button>
      {status==='ok' && <span className="opacity-80">Thanks! 🎉</span>}
      {status==='err' && <span className="opacity-80">Try again</span>}
    </form>
  );
}
