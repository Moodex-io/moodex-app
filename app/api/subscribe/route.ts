// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { welcomeEmail } from '@/lib/email/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM || 'Moodex <noreply@mg.moodex.io>';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://moodex.io';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

export async function POST(req: Request) {
  try {
    const { email, source = 'hero', ip } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
    }

    if (supabase) {
      await supabase.from('email_signups').insert({ email, source, ip: ip ?? null });
    }

    // send fancy welcome email (non-blocking for the user)
    if (process.env.RESEND_API_KEY) {
      const html = welcomeEmail(SITE_URL);
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: 'Welcome to Moodex Beta 🎉',
        html,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'error' }, { status: 500 });
  }
}
