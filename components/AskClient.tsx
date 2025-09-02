'use client';
import { useMemo, useState } from 'react';

export default function AskClient() {
  const WORKER = useMemo(() => (process.env.NEXT_PUBLIC_WORKER_URL || '').replace(/\/$/, ''), []);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(5); // placeholder UI

  async function ask(askQ) {
    if (!askQ || busy) return;
    setBusy(true);
    try {
      const r = await fetch(`${WORKER}/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: askQ }),
      });
      const text = await r.text();
      alert(text); // temporary UX; replace with your console renderer
      setLeft(v => Math.max(0, v - 1));
    } catch (e) {
      alert('Network hiccup. Try again in a moment.');
    } finally {
      setBusy(false);
      setQ('');
    }
  }

  return (
    <>
      <div style={{display:'flex', gap:'12px'}}>
        <input
          className="input"
          placeholder="Ask anything about the market mood…"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={(e)=>{ if(e.key==='Enter') ask(q); }}
        />
        <button className="btn btn-primary" onClick={()=>ask(q)} disabled={busy}>
          {busy ? 'Thinking…' : 'Ask Mood-E'}
        </button>
      </div>

      <div className="chips">
        {['Market mood','BTC today','ETH today','SOL today','Latest crypto news','Fear & Greed index','Global market cap']
          .map((t) => (
            <button key={t} className="chip" onClick={()=>ask(t)}>{t}</button>
          ))}
      </div>

      <p className="micro muted" style={{marginTop:'10px'}}>
        Free asks left today: <strong>{left}</strong> / 5
      </p>
    </>
  );
}
