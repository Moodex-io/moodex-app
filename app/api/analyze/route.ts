// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { callLLM } from '@/lib/llm';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    const system = `You analyze market mood from headlines or tickers.
Return a short JSON with fields:
- moodScore: 0..100 (higher = more bullish)
- stance: Bullish | Bearish | Neutral
- summary: one short paragraph
- drivers: array of 2-4 bullet reasons.
Only return JSON.`;

    const prompt = `Input: ${query}\nTicker context allowed if it's a ticker symbol.`;

    const raw = await callLLM({ system, prompt, temperature: 0.2, maxTokens: 350 });

    // best-effort JSON parse (model should return JSON)
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    const json = JSON.parse(raw.slice(start, end + 1));

    // guard rails
    json.moodScore = Math.max(0, Math.min(100, Number(json.moodScore ?? 50)));
    if (!['Bullish','Bearish','Neutral'].includes(json.stance)) json.stance = 'Neutral';
    if (!Array.isArray(json.drivers)) json.drivers = [];

    return NextResponse.json(json);
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 500 });
  }
}
