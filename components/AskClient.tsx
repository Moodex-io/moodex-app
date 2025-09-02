// components/AskClient.tsx
'use client';

import { useState } from 'react';

type Props = {
  hideWorkerNote?: boolean;
};

const API_URL =
  process.env.NEXT_PUBLIC_WORKER_URL?.replace(/\/+$/, '') || '';

export default function AskClient({ hideWorkerNote = false }: Props) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>('');

  async function ask() {
    if (!q.trim()) return;
    if (!API_URL) {
      setAnswer('Worker URL is not configured. Set NEXT_PUBLIC_WORKER_URL in Vercel env.');
      return;
    }
    setLoading(true);
    setAnswer('');
    try {
      const r = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q.trim() }),
      });
      const text = await r.text();
      try {
        const data = JSON.parse(text);
        setAnswer(data?.answer || data?.message || data?.reply || '…');
      } catch {
        setAnswer(text || '…');
      }
    } catch (e: any) {
      setAnswer('Network hiccup. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!hideWorkerNote && API_URL && (
        <p className="text-xs text-teal-200/60 mb-2">
          Worker: <span className="font-mono">{API_URL}</span>
        </p>
      )}
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="> Type your question…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button className="btn" onClick={ask} disabled={loading}>
          {loading ? 'Asking…' : 'Ask Mood-E'}
        </button>
      </div>

      {!!answer && (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-teal-100 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
}
