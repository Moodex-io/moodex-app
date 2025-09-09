// components/Trending.tsx
"use client";

import { useEffect, useState } from "react";

type Item = { symbol: string; score?: number; change?: number; label?: string };

export default function Trending({
  title = "Trending now",
  market = "crypto",
}: {
  title?: string;
  market?: "crypto" | "stocks";
}) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError(null);
        const res = await fetch(`/api/trending?market=${encodeURIComponent(market)}`, {
          next: { revalidate: 60 }, // cache hint for Next
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
          Couldn’t load trending: {error}
        </div>
      )}

      {!items && !error && (
        <div className="text-sm text-slate-400">Loading…</div>
      )}

      {items && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li
              key={`${it.symbol}-${i}`}
              className="flex items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2"
            >
              <span className="font-medium">{it.symbol || it.label}</span>
              <span className="text-slate-400 text-sm">
                {typeof it.score === "number" ? `Score ${it.score}` : ""}
                {typeof it.change === "number" ? ` · ${it.change.toFixed(2)}%` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
