'use client';
import { useMemo, useState } from 'react';

export default function AskWidget(){
  const WORKER = useMemo(
    () => (process.env.NEXT_PUBLIC_WORKER_URL || '').replace(/\/$/, ''),
    []
  );
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(5);

  async function ask(text: string){
    if(!text || busy) return;
    setBusy(true);
    try{
      const r = await fetch(`${WORKER}/chat`, {
        method:'POST',
        headers:{ 'content-type':'application/json' },
        body: JSON.stringify({ question:text })
      });
      const raw = await r.text();
      // Replace this with your console renderer later
      alert(raw);
      setLeft(v => Math.max(0, v-1));
    }catch(e){
      alert('Network hiccup. Try again.');
    }finally{
      setBusy(false);
      setQ('');
    }
  }

  const chips = ['Market mood','BTC today','ETH today','SOL today','Latest crypto news','Fear & Greed index','Global market cap'];

  return (
    <section className="wrap section" id="ask">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold">Ask Mood-E</h3>
          <div className="text-xs text-slate-400">Free asks left today: <b>{left}</b> / 5</div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="input"
            placeholder="Ask anything about today’s mood…"
            value={q}
            onChange={e=>setQ(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') ask(q); }}
          />
          <button className="btn btn-primary min-w-[140px]" onClick={()=>ask(q)} disabled={busy}>
            {busy ? 'Thinking…' : 'Ask Mood-E'}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map(c => (
            <button key={c} className="pill" onClick={()=>ask(c)}>{c}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
