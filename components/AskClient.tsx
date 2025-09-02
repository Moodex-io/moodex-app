'use client';
import { useMemo, useState } from 'react';

export default function AskClient() {
  const WORKER = useMemo(()=> (process.env.NEXT_PUBLIC_WORKER_URL || '').replace(/\/$/,''), []);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(5);

  async function ask(text: string) {
    if (!text || busy) return;
    setBusy(true);
    try {
      const r = await fetch(`${WORKER}/chat`, {
        method:'POST',
        headers:{ 'content-type':'application/json' },
        body: JSON.stringify({ question: text }),
      });
      const raw = await r.text();
      // Temporary: swap for your console renderer
      alert(raw);
      setLeft(v => Math.max(0, v-1));
    } catch {
      alert('Network hiccup. Try again.');
    } finally {
      setBusy(false);
      setQ('');
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <input className="input" placeholder="Ask anything about the market mood…" value={q}
               onChange={e=>setQ(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') ask(q);} }/>
        <button className="btn btn-primary min-w-[130px]" onClick={()=>ask(q)} disabled={busy}>
          {busy ? 'Thinking…' : 'Ask Mood-E'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Market mood','BTC today','ETH today','SOL today','Latest crypto news','Fear & Greed index','Global market cap'].map(t=>(
          <button key={t} className="pill" onClick={()=>ask(t)}>{t}</button>
        ))}
      </div>

      <div className="text-xs text-slate-400">Free asks left today: <b>{left}</b> / 5</div>
    </div>
  );
}
