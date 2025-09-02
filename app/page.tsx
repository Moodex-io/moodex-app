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
    if (!r.ok) throw new Error('pulse');
    return await r.json();
  } catch {
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

  useEffect(() => {
    let live = true;
    fetchPulse(market).then(d => { if (live) setPulse(d); });
    return () => { live = false; };
  }, [market]);

  return (
    <>
      <Header />

      <section className="hero container">
        <h1>THE MOODEX CONSOLE</h1>
        <p>The Mood of the Market — any market. Any business.</p>
        <div className="cta">
          <a className="btn btn-primary" href="#beta">Join the Beta</a>
          <a className="btn btn-ghost" href="#features">See Features</a>
        </div>
      </section>

      <div className="container">
        <MarketTabs value={market} onChange={setMarket} />

        <div className="grid-12">
          {/* Score */}
          <div className="card card--accent col-7">
            <div className="card-hd">
              <h2 className="h2">Moodex Score</h2>
              <span className="pill">{(pulse?.market || market).toUpperCase()}</span>
            </div>

            <div style={{display:'flex', gap:'24px', alignItems:'center'}}>
              <MoodGauge score={pulse?.score ?? 50} />
              <div>
                <div className="gauge-value">{pulse?.score ?? 50}</div>
                <div className="gauge-label">{pulse?.label ?? '—'}</div>
                <p className="narrative">{pulse?.narrative ?? ''}</p>
                <div className="chips" style={{marginTop:'14px'}}>
                  {(pulse?.trending ?? []).map(t => <span className="chip" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Ask */}
          <div className="card col-5">
            <div className="card-hd"><h2 className="h2">Ask Mood-E</h2></div>
            <AskClient />
          </div>

          {/* Signals */}
          <div className="card col-12">
            <div className="card-hd"><h2 className="h2">Today’s Signals</h2></div>
            <ul className="list">
              {(pulse?.headlines ?? []).map((h,i)=>(
                <li key={i}><a href={h.url} target="_blank" rel="noreferrer"><span className="dot" />{h.title}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
