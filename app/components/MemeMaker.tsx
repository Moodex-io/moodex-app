'use client';

import { useState } from 'react';

export default function MemeMaker() {
  const [vibe, setVibe] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    if (!vibe.trim()) return;
    setLoading(true);
    setError(null);
    setIdeas(null);

    try {
      const r = await fetch('/api/meme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vibe }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Failed');
      setIdeas(Array.isArray(data?.ideas) ? data.ideas : []);
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
      <h3 className="text-lg font-semibold">Mood Meme Generator</h3>
      <p className="mt-1 text-sm text-slate-400">
        Describe your mood; get caption ideas you can screenshot & share.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder='e.g., "Monday chaos but optimistic"'
          className="flex-1 rounded-md bg-slate-800 px-3 py-2 text-sm outline-none ring-1 ring-slate-700 placeholder:text-slate-500"
        />
        <button
          onClick={onGenerate}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Thinking…' : 'Generate'}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {ideas && (
        <div className="mt-5 rounded-lg bg-slate-800/60 p-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-200">
            {ideas.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
