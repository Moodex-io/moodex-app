// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { welcomeEmailHTML } from '@/lib/email/welcome';

const FROM = 'Moodex <noreply@mg.moodex.io>';

function absolutize(url: string, origin: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return origin.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
}

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json().catch(() => ({}));
    const to = (email || '').toString().trim().toLowerCase();
    if (!to || !to.includes('@')) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY missing' }, { status: 500 });
    }

    // --- optional: save to Supabase if envs exist
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/email_signups`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({ email: to, source: (source || 'hero').toString().slice(0, 40) }),
        });
        if (!r.ok) {
          console.error('[subscribe] supabase insert failed', await r.text());
        }
      } catch (e) {
        console.error('[subscribe] supabase error', e);
      }
    }

    // build absolute assets for email
    const logoUrl = absolutize('/brand/moodexlogo.png', origin);
    const heroUrl = absolutize('/brand/mascot.png', origin);

    const html = welcomeEmailHTML({
      siteUrl: origin,
      logoUrl,
      heroUrl,
      ctaHref: origin,
      previewText: 'You’re on the Moodex early access list. Here’s what to expect.',
    });

    // Send via Resend REST (works in Edge/Node runtimes)
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to,
        subject: 'Welcome to Moodex Beta 🎉',
        html,
        headers: { 'X-Entity-Ref-ID': `welcome-${to}-${Date.now()}` },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '');
      return NextResponse.json({ error: `Resend error: ${errText}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'error' }, { status: 500 });
  }
}
