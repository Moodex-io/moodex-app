'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import MarketTabs from '@/components/MarketTabs';
import MoodGauge from '@/components/MoodGauge';
import AskClient from '@/components/AskClient';

type Pulse = {
  market: string;
  score: number;
  label: string;
  narrative: string;
  trending: string[];
  headlines: { title: string; url: string }[];
};

const WORKER = (process.env.NEXT_PUBLIC_WORKER_URL || '').replace(/\/$/, '');

async function getPulse(market: string): Promise<Pulse> {
  try {
    const r = await fetch(`${WORKER}/pulse?market=${encodeURIComponent(market)}`, { next: { revalidate: 30 } });
    if (!r.ok) throw new Error('pulse');
    return await r.json();
  } catch {
    // fallback
    return {
      market,
      score: 56,
      label: 'Cautious',
      narrative: 'Stable conditions with mixed flows. Watch for volume inflection.',
      trending: ['BTC', 'ETH', 'SOL'],
      headlines: [
        { title: 'ETF flows mixed; traders cautious', url: '#' },
        { title: 'DeFi usage steady; gas fees moderate', url: '#' },
      ],
    };
  }
}

export default function Page() {
  const [tab, setTab] = useState<'crypto'|'stocks'|'brands'|'politics'|'entertainment'>('crypto');
  const [pulse, setPulse] = useState<Pulse | null>(null);

  useEffect(() => {
    let live = true;
    getPulse(tab).then(d => { if (live) setPulse(d); });
    return () => { live = false; };
  }, [tab]);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="container mx-auto max-w-6xl px-5 pt-12 pb-10 text-center">
        <h1 className="mx-auto max-w-3xl font-extrabold tracking-wide text-white"
            style={{ fontFamily:'Space Grotesk, system-ui', fontSize:'clamp(34px,5vw,64px)' }}>
          THE MOODEX CONSOLE
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold text-slate-300">
          The Mood of the Market — any market. Any business.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <a className="btn btn-primary" href="#beta">Join the Beta</a>
          <a className="btn btn-ghost" href="#features">See Features</a>
        </div>

        <div className="mt-8">
          <MarketTabs value={tab} onChange={setTab} />
        </div>
      </section>

      {/* GRID */}
      <section className="container mx-auto max-w-6xl px-5 pb-16">
        <div className="grid grid-cols-12 gap-6">
          {/* Score card */}
          <div className="card col-span-12 lg:col-span-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-extrabold tracking-wide">Moodex Score</h2>
              <span className="pill">{(pulse?.market || tab).toUpperCase()}</span>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <MoodGauge score={pulse?.score ?? 50} />
              <div>
                <div className="text-4xl font-black leading-none">{pulse?.score ?? 50}</div>
                <div className="mt-1 text-sm font-extrabold text-slate-400">{pulse?.label ?? '—'}</div>
                <p className="mt-3 text-sm text-slate-300">{pulse?.narrative ?? ''}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(pulse?.trending ?? []).map(t => <span key={t} className="pill">{t}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Ask card */}
          <div className="card col-span-12 lg:col-span-5">
            <div className="mb-6">
              <h2 className="text-base font-extrabold tracking-wide">Ask Mood-E</h2>
            </div>
            <AskClient />
          </div>

          {/* Signals */}
          <div className="card col-span-12">
            <div className="mb-5">
              <h2 className="text-base font-extrabold tracking-wide">Today’s Signals</h2>
            </div>
            <ul className="divide-y divide-white/10">
              {(pulse?.headlines ?? []).map((h, i) => (
                <li key={i} className="py-3 text-sm">
                  <a href={h.url} target="_blank" className="text-slate-200 hover:text-white">{h.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
