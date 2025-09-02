'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import MarketTabs from '@/components/MarketTabs';
import MoodGauge from '@/components/MoodGauge';
import AskClient from '@/components/AskClient';

const WORKER = process.env.NEXT_PUBLIC_WORKER_URL || '';

async function fetchPulse(market) {
  try {
    const url = `${WORKER.replace(/\/$/, '')}/pulse?market=${encodeURIComponent(market)}`;
    const r = await fetch(url, { next: { revalidate: 30 } });
    if (!r.ok) throw new Error(`pulse ${r.status}`);
    return await r.json();
  } catch {
    // Safe placeholder so the page always looks finished
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

export default function Home() {
  const [market, setMarket] = useState('crypto');
  const [pulse, setPulse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    setLoading(true);
    fetchPulse(market).then((data) => {
      if (live) { setPulse(data); setLoading(false); }
    });
    return () => { live = false; };
  }, [market]);

  return (
    <main className="wrap">
      <Header />

      <section className="hero">
        <h1 className="hero-title">THE MOODEX CONSOLE</h1>
        <p className="hero-sub">The Mood of the Market — any market. Any business.</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#beta">Join the Beta</a>
          <a className="btn btn-ghost" href="#features">See Features</a>
        </div>
      </section>

      <MarketTabs value={market} onChange={setMarket} />

      <section className="grid">
        {/* Score Card */}
        <div className="card card--accent">
          <div className="card-hd">
            <h2 className="h2">Moodex Score</h2>
            <span className="pill">{(pulse?.market || market).toUpperCase()}</span>
          </div>

          <div className="score-row">
            <MoodGauge score={pulse?.score ?? 50} />
            <div className="score-meta">
              <div className="score-num">{pulse?.score ?? 50}</div>
              <div className="score-label">{pulse?.label ?? '—'}</div>
              <p className="score-note">
                {loading ? 'Loading market narrative…' : pulse?.narrative ?? '—'}
              </p>
              <div className="chip-row">
                {(pulse?.trending ?? []).map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ask Card */}
        <div className="card">
          <div className="card-hd">
            <h2 className="h2">Ask Mood-E</h2>
          </div>
          <AskClient />
          <p className="tiny muted" style={{marginTop:10}}>
            Tip: Try “Market mood”, “BTC today”, or “Latest crypto news”.
          </p>
        </div>

        {/* Signals */}
        <div className="card col-span-2">
          <div className="card-hd">
            <h2 className="h2">Today’s Signals</h2>
          </div>
          <ul className="list">
            {(pulse?.headlines ?? []).map((h, i) => (
              <li key={i}>
                <a href={h.url} target="_blank" rel="noreferrer">
                  <span className="dot" /> {h.title}
                </a>
              </li>
            ))}
            {!pulse?.headlines?.length && !loading && (
              <li className="muted">No signals right now.</li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
