// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

const FROM = 'Moodex <noreply@mg.moodex.io>'; // your verified Resend domain

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'RESEND_API_KEY missing' }, { status: 500 });
    }

    // Simple branded HTML (safe, inline styles only)
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;background:#0b1220;color:#eef2ff;padding:28px;border-radius:14px;border:1px solid rgba(255,255,255,.08)">
        <div style="text-align:center;margin-bottom:14px">
          <img src="https://moodex.io/brand/moodexlogo.png" alt="Moodex" style="height:56px"/>
        </div>
        <h1 style="text-align:center;margin:8px 0 18px;font-size:26px;letter-spacing:.3px">Welcome to the Moodex Beta 🚀</h1>
        <p>Thanks for joining! You’re now on the early access list. We’ll send invites, feature drops, and tips as we roll out.</p>
        <p style="margin-top:16px">What to expect next:</p>
        <ul style="margin:8px 0 18px;padding-left:18px">
          <li>Beta access link when your cohort opens</li>
          <li>Feature updates and changelogs</li>
          <li>Occasional alpha perks for early users</li>
        </ul>
        <div style="text-align:center;margin-top:20px">
          <a href="https://moodex.io" style="display:inline-block;background:linear-gradient(135deg,#00e2fb,#ff00c3);padding:12px 22px;color:#fff;text-decoration:none;border-radius:10px;border:1px solid rgba(255,255,255,.2)">Visit Moodex</a>
        </div>
        <p style="margin-top:26px;font-size:12px;color:#9aa4b2">
          You received this because you signed up at moodex.io. If this wasn’t you, please ignore this email.
        </p>
      </div>
    `;

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject: 'Welcome to Moodex Beta 🎉',
        html,
      }),
    });

    if (!r.ok) {
      const t = await r.text().catch(() => '');
      return NextResponse.json({ error: `Resend error: ${t}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'error' }, { status: 500 });
  }
}
