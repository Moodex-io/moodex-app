'use client';

import { useEffect, useState } from 'react';
import Chips from './Chips';
import RateLimitBanner from './RateLimitBanner';
import { addUse, remaining } from '@/lib/usage';

type Props = { hideWorkerNote?: boolean; dailyLimit?: number };

const API_URL = process.env.NEXT_PUBLIC_WORKER_URL?.replace(/\/+$/, '') || '';
const SIGNUP = process.env.NEXT_PUBLIC_SIGNUP_URL || '#';

export default function AskClient({ hideWorkerNote = false, dailyLimit = 5 }: Props) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [left, setLeft] = useState(remaining(dailyLimit));

  useEffect(() => setLeft(remaining(dailyLimit)), [dailyLimit]);

  async function ask(text?: string) {
    const prompt = (text ?? q).trim();
    if (!prompt) return;
    if (!API_URL) {
      setAnswer('Worker URL is not configured. Set NEXT_PUBLIC_WORKER_URL in Vercel env.');
      return;
    }
    if (left <= 0) {
      setAnswer('Daily free limit reached. Join the Beta for more.');
      return;
    }

    setLoading(true);
    setAnswer('');
    try {
      const r = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: prompt }),
      });
      const text = await r.text();
      try {
        const data = JSON.parse(text);
        setAnswer(data?.answer || data?.message || data?.reply || '…');
      } catch {
        setAnswer(text || '…');
      }
      addUse();
      setLeft(remaining(dailyLimit));
      setQ('');
    } catch {
      setAnswer('Network hiccup. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="console">
      {!hideWorkerNote && API_URL && (
        <p className="text-xs text-teal-200/60 mb-2">
          Worker: <span className="font-mono">{API_URL}</span>
        </p>
      )}

      <div className="flex gap-2">
        <input
          className="input"
          placeholder="> Type your question…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button className="btn" onClick={() => ask()} disabled={loading}>
          {loading ? 'Asking…' : 'Ask Mood-E'}
        </button>
      </div>

      <Chips onPick={(t) => ask(t)} />
      <RateLimitBanner left={left} limit={dailyLimit} signupUrl={SIGNUP} />

      {!!answer && (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-teal-100 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
}
