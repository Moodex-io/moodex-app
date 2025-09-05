// app/api/send-welcome/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import WelcomeEmail from '@/lib/email/welcome';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { RESEND_API_KEY = '', RESEND_FROM = '' } = process.env;
    if (!RESEND_API_KEY || !RESEND_FROM) {
      return NextResponse.json({ ok: false, error: 'missing-resend-env' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || '').trim().toLowerCase();
    const siteUrl = String(body?.siteUrl || '');
    const logoSrc = String(body?.logoSrc || '');
    const mascotSrc = String(body?.mascotSrc || '');

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'invalid-email' }, { status: 400 });
    }

    const resend = new Resend(RESEND_API_KEY);

    // No JSX here – use createElement
    const element = React.createElement(WelcomeEmail, {
      siteUrl,
      logoSrc,
      mascotSrc,
    });

    const resp = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: 'Welcome to Moodex Beta 🎉',
      react: element,
      headers: { 'X-Entity-Ref-ID': `send-welcome-${email}-${Date.now()}` },
    });

    if (resp.error) {
      console.error('[send-welcome] resend error', resp.error);
      return NextResponse.json({ ok: false, error: String(resp.error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: resp.data?.id });
  } catch (e: any) {
    console.error('[send-welcome] failed', e);
    return NextResponse.json({ ok: false, error: 'server-error' }, { status: 500 });
  }
}
