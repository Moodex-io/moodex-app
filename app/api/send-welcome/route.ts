import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Moodex <noreply@mg.moodex.io>',
        to: email,
        subject: '👋 Welcome to Moodex Beta!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0d1117;color:#fff;padding:20px;border-radius:8px;">
            <div style="text-align:center;">
              <img src="https://moodex.io/brand/moodexlogo.png" alt="Moodex Logo" style="height:60px;margin-bottom:20px;" />
              <h1 style="color:#00e2fb;">Welcome to Moodex Beta 🚀</h1>
              <p>Thanks for joining the beta! You're officially part of the Moodex early access group.</p>
              <p>We'll keep you updated with new features and exclusive invites as we roll them out.</p>
              <a href="https://moodex.io" style="display:inline-block;background:linear-gradient(135deg,#00e2fb,#ff00c3);padding:12px 24px;color:#fff;text-decoration:none;border-radius:6px;margin-top:20px;">Visit Moodex</a>
              <p style="margin-top:30px;font-size:12px;color:#aaa;">You’re receiving this email because you signed up at moodex.io</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
