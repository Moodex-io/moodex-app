// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// server-side Supabase (service role for trusted inserts)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // server only
);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email, source = 'hero', ip } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    // 1) Insert to Supabase (idempotent-ish: ignore duplicates)
    const { error: insertErr } = await supabase.from('email_signups').insert({
      email,
      source,
      ip: ip ?? null,
    });

    // If already exists (unique violation) we don’t fail the response
    if (insertErr && !String(insertErr.message || '').toLowerCase().includes('duplicate')) {
      return NextResponse.json({ ok: false, error: 'db-insert-failed' }, { status: 500 });
    }

    // 2) Send the welcome email
    const from = process.env.EMAIL_FROM || 'Moodex <noreply@moodex.io>';
    const replyTo = process.env.EMAIL_REPLY_TO || 'team@moodex.io';

    const html = renderWelcomeEmailHTML(email);

    const { error: mailErr } = await resend.emails.send({
      from,
      to: email,
      subject: 'Welcome to the Moodex Beta 🎛️',
      html,
      reply_to: replyTo,
    });

    if (mailErr) {
      // Don’t block signup on email errors—just return ok:false with code for logs
      console.error('Resend error:', mailErr);
      return NextResponse.json({ ok: true, email_sent: false });
    }

    return NextResponse.json({ ok: true, email_sent: true });
  } catch (e: any) {
    console.error('subscribe route error:', e?.message || e);
    return NextResponse.json({ ok: false, error: 'unhandled' }, { status: 500 });
  }
}

/* ---- Email template (clean + brand) ---- */
function renderWelcomeEmailHTML(toEmail: string) {
  const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://moodex-projects.vercel.app'}/brand/moodexlogo.png`;
  const btnUrl  = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://moodex-projects.vercel.app'}#beta`;
  return `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta charSet="utf-8"/>
      <title>Welcome to Moodex</title>
      <style>
        body{margin:0;background:#0b1114;color:#e6f4ff;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6}
        .wrap{max-width:640px;margin:0 auto;padding:32px 24px}
        .card{background:#0f161a;border:1px solid #18323b;border-radius:16px;padding:28px;box-shadow:0 8px 30px rgba(0,0,0,.36)}
        .hdr{display:flex;align-items:center;gap:12px;margin-bottom:8px}
        .logo{width:28px;height:28px;border-radius:8px}
        .title{font-size:20px;font-weight:800;letter-spacing:.3px}
        .lede{font-size:16px;color:#cfe7f5;margin:8px 0 16px}
        .btn{
          display:inline-block;padding:12px 18px;border-radius:12px;
          text-decoration:none;font-weight:700;letter-spacing:.3px;
          color:#001217;border:1px solid rgba(255,255,255,.2);
          background:linear-gradient(135deg,#00e2fb,#d84bf1);
          box-shadow:0 12px 36px rgba(0,226,251,.25);
        }
        .muted{color:#9cb8c7;font-size:13px;margin-top:18px}
        .hr{height:1px;background:#18323b;margin:24px 0;border-radius:1px}
        .foot{color:#7ea0b1;font-size:12px;text-align:center;margin-top:20px}
        a{color:#7ee6ff}
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="card">
          <div class="hdr">
            <img alt="Moodex" src="${logoUrl}" class="logo"/>
            <div class="title">Welcome to Moodex</div>
          </div>
          <p class="lede">Thanks for joining the Moodex beta, ${toEmail.split('@')[0]}!</p>
          <p>Moodex reveals real-time sentiment, trends, and narratives across crypto, stocks, brands and more—so you act on signal, not noise.</p>
          <p style="margin:18px 0 26px">
            <a class="btn" href="${btnUrl}">Open the Moodex Console</a>
          </p>
          <div class="hr"></div>
          <p class="muted">
            You’re on the early-access list. We’ll send updates as we roll out new consoles (Crypto, Stocks, Brands) and premium features.
            Have feedback? Just hit reply—your note goes straight to the founders.
          </p>
          <p class="muted">– Team Moodex</p>
        </div>
        <div class="foot">
          You received this email because you signed up on our website.<br/>
          If this wasn’t you, you can ignore this message.
        </div>
      </div>
    </body>
  </html>
  `;
}
