'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-client';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'ok'|'dup'|'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    const supabase = supabaseBrowser();

    const { error } = await supabase
      .from('subscribers')
      .insert({ email, source: 'moodex-landing' });

    if (error) {
      // 23505 = unique violation (already on list)
      if ((error as any).code === '23505') setStatus('dup');
      else setStatus('error');
    } else {
      setStatus('ok');
      setEmail('');
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 w-64 text-white"
      />
      <button
        className="px-4 py-2 rounded-md bg-cyan-500 text-black font-bold"
      >
        Join Beta
      </button>

      {status === 'ok'   && <span className="text-emerald-400">Added!</span>}
      {status === 'dup'  && <span className="text-yellow-400">Already on list</span>}
      {status === 'error'&& <span className="text-red-400">Oops, try again</span>}
    </form>
  );
}
