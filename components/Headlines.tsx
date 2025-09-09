// components/Headlines.tsx
"use client";

import { useEffect, useState } from "react";

type Headline = {
  title: string;
  url: string;
  source?: string;
  time?: string | number;
};

export default function Headlines({
  title = "Latest news",
  market = "crypto",
}: {
  title?: string;
  market?: "crypto" | "stocks";
}) {
  const [items, setItems] = useState<Headline[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setError(null);
        const res = await fetch(`/api/news?market=${encodeURIComponent(market)}`, {
          next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setItems(data?.items ?? []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "failed");
      }
    }
    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [market]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {error && (
        <div className="text-sm text-rose-300">
          Couldn’t load headlines: {error}
        </div>
      )}

      {!items && !error && (
        <div className="text-sm text-slate-400">Loading…</div>
      )}

      {items && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((h, idx) => (
            <li key={idx}>
              <a
                href={h.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg bg-slate-800/60 px-3 py-2 hover:bg-slate-800"
              >
                <div className="font-medium">{h.title}</div>
                <div className="text-slate-400 text-xs mt-0.5">
                  {h.source ? `${h.source}` : ""}
                  {h.time ? ` · ${new Date(h.time).toLocaleTimeString()}` : ""}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
