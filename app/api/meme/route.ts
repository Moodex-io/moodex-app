// app/api/meme/route.ts
import { NextResponse } from 'next/server';
import { callLLM } from '@/lib/llm';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { mood } = await req.json();
    if (!mood || typeof mood !== 'string') {
      return NextResponse.json({ error: 'Missing mood' }, { status: 400 });
    }

    const system = `You write short, witty, PG-13 social captions & hashtags. 
Return pure JSON: { "captions": string[], "hashtags": string[], "prompt": string }.
Captions should be 6–12 words, modern tone, emoji allowed.
Hashtags: 5–10 max, lowercase, no spaces. Prompt describes a meme image idea.`;

    const raw = await callLLM({
      system,
      prompt: `Mood: ${mood}\nAudience: general social.\nReturn JSON only.`,
      temperature: 0.8,
      maxTokens: 400
    });

    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    const json = JSON.parse(raw.slice(start, end + 1));

    if (!Array.isArray(json.captions)) json.captions = [];
    if (!Array.isArray(json.hashtags)) json.hashtags = [];

    return NextResponse.json(json);
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 500 });
  }
}
