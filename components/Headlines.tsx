'use client';

import { useEffect, useState } from 'react';

type Headline = {
  title: string;
  source?: string;
  url?: string;
  published_at?: string; // ISO string optional
};

export default function Headlines({
  title = 'Latest crypto news',
  market = 'crypto',
}: { title?: string; market?: string }) {
  const [data, setData] = useState<Headline[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_WORKER_URL!;
        const res = await fetch(
          `${base}/news?market=${encodeURIComponent(market)}`,
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error(`Worker /news ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        setData(Array.isArray(json?.headlines) ? json.headlines.slice(0, 10) : []);
      } catch (e: any) {
        setErr(e?.message ?? 'Failed to load news.');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [market]);

  return (
    <section className="card p-4">
      <div className="card-head">
        <h3 className="h3 text-center w-full">{title}</h3>
      </div>

      <div className="min-h-[84px]">
        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-6 rounded-md" />
            ))}
          </div>
        ) : err ? (
          <div className="flex items-center justify-center text-center">
            <p className="muted">⚠ {err}</p>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex items-center justify-center text-center">
            <p className="muted">No headlines right now.</p>
          </div>
        ) : (
          <ul className="news-list">
            {data.map((h, i) => (
              <li key={i} className="news-item">
                <a
                  href={h.url ?? '#'}
                  target={h.url ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {h.title}
                </a>
                <span className="muted">
                  {h.source ? ` • ${h.source}` : ''}
                  {h.published_at
                    ? ` • ${new Date(h.published_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
