'use client';

import { useState } from 'react';
import { chat } from '@/lib/worker';

export default function AskClient() {
  const [q, setQ] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const worker = process.env.NEXT_PUBLIC_WORKER_URL || '';

  async function onAsk() {
    if (!q.trim() || !worker) return;
    setLoading(true);
    try {
      const res = await chat(q);
      setReply(res || '…');
    } catch (e:any) {
      setReply('Network hiccup. Try again in a moment.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="h2">Ask Mood-E</h2>
      <p className="muted" style={{marginTop:-8}}>
        Worker: <code>{worker || '(set NEXT_PUBLIC_WORKER_URL)'}</code>
      </p>
      <input
        className="input"
        placeholder="Try: Market mood"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=>{ if(e.key==='Enter') onAsk(); }}
      />
      <div style={{marginTop:12}}>
        <button className="button" onClick={onAsk} disabled={loading || !q.trim()}>
          {loading ? 'Asking…' : 'Ask Mood-E'}
        </button>
      </div>
      {reply && (
        <pre style={{
          whiteSpace:'pre-wrap',
          marginTop:14,
          borderTop:'1px solid rgba(125,252,255,.16)',
          paddingTop:12
        }}>{reply}</pre>
      )}
    </div>
  );
}
