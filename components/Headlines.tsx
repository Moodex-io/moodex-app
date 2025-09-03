'use client';

import { useEffect, useState } from 'react';

type Headline = {
  title: string;
  source?: string;
  url?: string;
  published_at?: string; // ISO string optional
};

export default function Headlines({ title = 'Today’s Headlines', market = 'crypto' }: { title?: string; market?: string }) {
  const [data, setData] = useState<Headline[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_WORKER_URL!;
        const r = await fetch(`${base}/news?market=${encodeURIComponent(market)}`, { cache: 'no-store' });
        if (!r.ok) throw new Error(`Worker /news ${r.status}`);
        const json = await r.json();
        if (!alive) return;
        setData(Array.isArray(json?.headlines) ? json.headlines.slice(0, 10) : []);
      } catch (e: any) {
        setErr(e?.message ?? 'Failed to load news.');
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
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-6 rounded-md" />)}
        </div>
      ) : err ? (
        <p className="muted">⚠️ {err}</p>
      ) : !data || data.length === 0 ? (
        <p className="muted">No headlines right now.</p>
      ) : (
        <ul className="news-list">
          {data.map((h, i) => (
            <li key={i} className="news-item">
              <a href={h.url ?? '#'} target={h.url ? '_blank' : undefined} rel="noreferrer">
                {h.title}
              </a>
              <span className="muted">
                {h.source ? ` • ${h.source}` : ''}{' '}
                {h.published_at ? ` • ${new Date(h.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
