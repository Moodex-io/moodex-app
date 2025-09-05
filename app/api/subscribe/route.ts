import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import React from 'react';
import WelcomeEmail from '@/lib/email/welcome';

export const dynamic = 'force-dynamic'; // ensure it runs as a serverless fn

function getAbsolute(url: string, origin: string) {
  // ensure images work in emails
  if (/^https?:\/\//i.test(url)) return url;
  return origin.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
}

export async function POST(req: Request) {
  // Use configured site URL first; fall back to the request's origin (works on previews)
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, '');

  const {
    NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL = process.env.SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '',
    RESEND_API_KEY = '',
    RESEND_FROM = '', // e.g. 'Moodex <noreply@mg.moodex.io>'
  } = process.env as Record<string, string>;

  // sanity log (only booleans / non-secret)
  console.log('[subscribe] envs', {
    hasSupabaseUrl: !!SUPABASE_URL,
    hasSupabaseAnon: !!SUPABASE_ANON_KEY,
    hasResendKey: !!RESEND_API_KEY,
    hasFrom: !!RESEND_FROM,
    origin,
  });

  let email = '';
  let source: string | undefined;

  try {
    const body = await req.json().catch(() => ({}));
    email = (body?.email || '').toString().trim().toLowerCase();
    source = body?.source ? String(body.source).slice(0, 40) : 'hero';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'invalid-email' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'bad-json' }, { status: 400 });
  }

  // --- insert into Supabase (non-blocking if it fails)
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn('[subscribe] missing Supabase envs, skipping insert');
    } else {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { error } = await supabase.from('email_signups').insert({ email, source });
      if (error) console.error('[subscribe] supabase insert failed', error);
    }
  } catch (e) {
    console.error('[subscribe] supabase client error', e);
  }

  // --- send welcome email (best-effort; respond 200 even if email fails)
  try {
    if (!RESEND_API_KEY || !RESEND_FROM) {
      console.warn('[subscribe] missing RESEND envs, skip sending');
    } else {
      const resend = new Resend(RESEND_API_KEY);

      // absolute assets for email images
      const logoSrc = getAbsolute('/brand/moodexlogo.png', origin);
      const mascotSrc = getAbsolute('/brand/mascot.png', origin);

      const subject = 'Welcome to Moodex Beta 🎉';

      // Create the React element (Resend expects a React node)
      const element = (
        <WelcomeEmail
          siteUrl={origin}
          logoSrc={logoSrc}
          mascotSrc={mascotSrc}
        />
      );

      const resp = await resend.emails.send({
        from: RESEND_FROM, // e.g. 'Moodex <noreply@mg.moodex.io>'
        to: email,
        subject,
        react: element,
        headers: {
          'X-Entity-Ref-ID': `welcome-${email}-${Date.now()}`,
        },
      });

      if (resp.error) {
        console.error('[subscribe] resend error', resp.error);
      } else {
        console.log('[subscribe] resend ok', { to: email, id: resp.data?.id });
      }
    }
  } catch (e) {
    console.error('[subscribe] send failed', e);
  }

  return NextResponse.json({ ok: true });
}
