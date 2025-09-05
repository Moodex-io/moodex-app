import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import WelcomeEmail from '@/lib/email/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, siteUrl, logoSrc, mascotSrc } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json({ ok: false, error: 'missing_resend_key' }, { status: 500 });
    }
    if (!email || !siteUrl || !logoSrc || !mascotSrc) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
    }

    const html = renderToStaticMarkup(
      <WelcomeEmail siteUrl={siteUrl} logoSrc={logoSrc} mascotSrc={mascotSrc} />
    );

    const { data, error } = await resend.emails.send({
      from: 'Moodex <noreply@mg.moodex.io>',
      to: email,
      subject: 'Welcome to Moodex Beta 🎉',
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    console.error('send-welcome crash:', e);
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 500 });
  }
}
