import { NextResponse } from "next/server";

const WORKER_BASE = process.env.MOODEX_WORKER_BASE ?? "https://moodex-chat.<your-subdomain>.workers.dev";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get("market") || "crypto";

  const upstream = `${WORKER_BASE}/chat/trending?market=${encodeURIComponent(market)}`;

  try {
    const r = await fetch(upstream, { headers: { "Content-Type": "application/json" } });
    if (!r.ok) return NextResponse.json({ error: `upstream ${r.status}` }, { status: 502 });
    const json = await r.json();
    return NextResponse.json(json, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "fetch failed" }, { status: 500 });
  }
}
