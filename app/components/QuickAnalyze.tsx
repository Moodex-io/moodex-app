'use client';

import { useState } from 'react';

export default function QuickAnalyze() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    | null
    | {
        score?: number;
        label?: string;
        summary?: string;
        sources?: Array<{ title?: string; url?: string }>;
      }
  >(null);
  const [error, setError] = useState<string | null>(null);

  async function onAnalyze() {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const r = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Failed');
      setResult(data);
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
      <h3 className="text-lg font-semibold">Market Mood Analyzer</h3>
      <p className="mt-1 text-sm text-slate-400">
        Enter a ticker or headline; get a Moodex score and quick summary.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g., TSLA or “BTC spikes on ETF news”"
          className="flex-1 rounded-md bg-slate-800 px-3 py-2 text-sm outline-none ring-1 ring-slate-700 placeholder:text-slate-500"
        />
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-5 rounded-lg bg-slate-800/60 p-4">
          {(result.score !== undefined || result.label) && (
            <div className="mb-2 flex items-baseline gap-3">
              {result.score !== undefined && (
                <span className="text-2xl font-bold">{result.score}</span>
              )}
              {result.label && (
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs">
                  {result.label}
                </span>
              )}
            </div>
          )}
          {result.summary && (
            <p className="text-sm text-slate-300">{result.summary}</p>
          )}
          {Array.isArray(result.sources) && result.sources.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-400">
              {result.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" className="hover:text-white">
                      {s.title || s.url}
                    </a>
                  ) : (
                    s.title
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
