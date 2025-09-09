// app/tools/analyze/page.tsx
'use client';

import { useState } from 'react';

type Result = {
  moodScore: number;       // 0-100 bullish; <50 bearish
  stance: 'Bullish'|'Bearish'|'Neutral';
  summary: string;
  drivers: string[];
};

export default function AnalyzePage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setRes(null);

    try {
      const r = await fetch('/api/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: input })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'Failed');
      setRes(j as Result);
    } catch (e:any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="wrap py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Market Mood Analyzer</h1>
      <form onSubmit={onAnalyze} className="flex gap-3 mb-8">
        <input
          className="input flex-1"
          placeholder="Enter a ticker (e.g., TSLA) or a headline…"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          required
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </form>

      {err && <div className="text-red-400 mb-4">{err}</div>}

      {res && (
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">{res.stance}</div>
            <div className="text-sm opacity-80">Mood score: {res.moodScore}</div>
          </div>
          <p className="mt-3">{res.summary}</p>
          {res.drivers?.length ? (
            <ul className="mt-3 list-disc pl-5">
              {res.drivers.map((d,i)=><li key={i}>{d}</li>)}
            </ul>
          ) : null}
        </div>
      )}
    </main>
  );
}
