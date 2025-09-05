// app/api/send-welcome/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { welcomeEmailHTML } from '@/lib/email/welcome';

const FROM = 'Moodex <noreply@mg.moodex.io>';

function absolutize(url: string, origin: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return origin.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json().catch(() => ({}));
    const to = (email || '').toString().trim().toLowerCase();
    if (!to || !to.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: 'RESEND_API_KEY missing' }, { status: 500 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const resend = new Resend(RESEND_API_KEY);

    const logoUrl = absolutize('/brand/moodexlogo.png', origin);
    const heroUrl = absolutize('/brand/mascot.png', origin);

    const html = welcomeEmailHTML({
      siteUrl: origin,
      logoUrl,
      heroUrl,
      ctaHref: origin,
    });

    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      subject: 'Welcome to Moodex Beta 🎉',
      html,
      headers: { 'X-Entity-Ref-ID': `manual-welcome-${to}-${Date.now()}` },
    });

    if (error) {
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'send failed' }, { status: 500 });
  }
}
