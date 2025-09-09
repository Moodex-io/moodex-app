// app/tools/meme/page.tsx
'use client';

import { useState } from 'react';

type MemeResult = {
  captions: string[];
  hashtags: string[];
  prompt?: string; // optional image prompt if you later add an image generator
};

export default function MemePage() {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<MemeResult|null>(null);
  const [err, setErr] = useState<string|null>(null);

  async function onGen(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null); setRes(null);
    try {
      const r = await fetch('/api/meme', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ mood })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'Failed');
      setRes(j as MemeResult);
    } catch (e:any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="wrap py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Mood Meme Generator</h1>
      <form onSubmit={onGen} className="flex gap-3 mb-8">
        <input
          className="input flex-1"
          placeholder="Describe your mood (e.g., 'Monday chaos but optimistic')"
          value={mood}
          onChange={(e)=>setMood(e.target.value)}
          required
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Cooking…' : 'Generate'}
        </button>
      </form>

      {err && <div className="text-red-400 mb-4">{err}</div>}

      {res && (
        <div className="card p-6">
          <h2 className="font-bold mb-3">Captions</h2>
          <ul className="list-disc pl-5 mb-4">
            {res.captions.map((c,i)=><li key={i}>{c}</li>)}
          </ul>

          {res.hashtags?.length ? (
            <>
              <h3 className="font-semibold mb-2">Hashtags</h3>
              <p className="opacity-80">{res.hashtags.join(' ')}</p>
            </>
          ) : null}
        </div>
      )}
    </main>
  );
}
