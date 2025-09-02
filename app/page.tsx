'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import MarketTabs from '@/components/MarketTabs';
import MoodGauge from '@/components/MoodGauge';
import AskClient from '@/components/AskClient';

const WORKER = process.env.NEXT_PUBLIC_WORKER_URL || '';

async function fetchPulse(market) {
  // We’ll add /pulse on the Worker in Step 2.
  // This gracefully falls back to a safe placeholder so the UI looks good now.
  try {
    const url = `${WORKER.replace(/\/$/, '')}/pulse?market=${encodeURIComponent(market)}`;
    const r = await fetch(url, { next: { revalidate: 30 } });
    if (!r.ok) throw new Error(`pulse ${r.status}`);
    return await r.json();
  } catch {
    return {
      market,
      score: 52,
      label: 'Neutral',
      narrative: 'Stable mood. Minor chop across majors.',
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
    let alive = true;
    setLoading(true);
    fetchPulse(market).then((data) => {
      if (alive) {
        setPulse(data);
        setLoading(false);
      }
    });
    return () => { alive = false; };
  }, [market]);

  return (
    <main className="wrap">
      <Header />

      <section className="hero">
        <h1 className="title">THE CRYPTO MOOD CONSOLE</h1>
        <p className="tag">FAST VERDICTS • TRENDS & HEADLINES • BUILT FOR CLARITY</p>
      </section>

      <MarketTabs value={market} onChange={setMarket} />

      <section className="grid">
        {/* Mood card */}
        <div className="card card--glow">
          <div className="card-hd">
            <h2 className="h2">MOODEX SCORE</h2>
            <span className="pill">{(pulse?.market || market).toUpperCase()}</span>
          </div>

          <div className="gauge-row">
            <MoodGauge score={pulse?.score ?? 50} />
            <div className="gauge-meta">
              <div className="score">{pulse?.score ?? 50}</div>
              <div className="label">{pulse?.label ?? 'Neutral'}</div>
              <p className="narrative">
                {loading ? 'Loading market narrative…' : pulse?.narrative ?? '—'}
              </p>
            </div>
          </div>

          <div className="chips">
            {(pulse?.trending ?? []).map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* Ask panel */}
        <div className="card">
          <div className="card-hd">
            <h2 className="h2">ASK MOOD-E</h2>
          </div>
          <p className="muted" style={{ marginTop: -10, marginBottom: 12 }}>
            Worker: <code>{WORKER || '— set NEXT_PUBLIC_WORKER_URL —'}</code>
          </p>
          <AskClient />
        </div>

        {/* Headlines */}
        <div className="card col-span-2">
          <div className="card-hd">
            <h2 className="h2">TODAY’S SIGNALS</h2>
          </div>
          <ul className="list">
            {(pulse?.headlines ?? []).map((h, i) => (
              <li key={i}>
                <a href={h.url} target="_blank" rel="noreferrer">
                  <span className="dot" /> {h.title}
                </a>
              </li>
            ))}
            {!pulse?.headlines?.length && !loading && <li className="muted">No headlines right now.</li>}
          </ul>
        </div>
      </section>
    </main>
  );
}
