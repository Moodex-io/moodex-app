'use client';

import { useEffect, useState } from 'react';

type TrendingItem = {
  symbol?: string;
  name?: string;
  score?: number;      // optional “buzz” score if your Worker returns one
  url?: string;        // optional details page
};

export default function Trending({ title = 'Trending', market = 'crypto' }: { title?: string; market?: string }) {
  const [data, setData] = useState<TrendingItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_WORKER_URL!;
        const r = await fetch(`${base}/trending?market=${encodeURIComponent(market)}`, { cache: 'no-store' });
        if (!r.ok) throw new Error(`Worker /trending ${r.status}`);
        const json = await r.json();
        if (!alive) return;
        setData(Array.isArray(json?.items) ? json.items.slice(0, 12) : []);
      } catch (e: any) {
        setErr(e?.message ?? 'Failed to load trending.');
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [market]);

  return (
    <section className="card">
      <div className="card-head">
        <h3 className="h3">{title}</h3>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="skeleton h-9 rounded-md" />
          ))}
        </div>
      ) : err ? (
        <p className="muted">⚠️ {err}</p>
      ) : !data || data.length === 0 ? (
        <p className="muted">No trending items right now.</p>
      ) : (
        <div className="flex flex-wrap gap-8">
          {data.map((it, i) => (
            <a
              key={`${it.symbol ?? it.name ?? i}-${i}`}
              className="trend-chip"
              href={it.url ?? '#'}
              target={it.url ? '_blank' : undefined}
              rel="noreferrer"
              onClick={(e) => !it.url && e.preventDefault()}
              title={it.name ?? it.symbol}
            >
              <span className="code">{it.symbol ?? it.name}</span>
              {typeof it.score === 'number' && <span className="score">{Math.round(it.score)}</span>}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
