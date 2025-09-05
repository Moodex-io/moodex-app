// app/api/send-welcome/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/lib/email/welcome'

const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM || 'Moodex <noreply@mg.moodex.io>'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moodex.io'

export async function POST(req: Request) {
  if (!resendApiKey) {
    return NextResponse.json({ ok: false, error: 'RESEND_API_KEY missing' }, { status: 500 })
  }

  try {
    const { to } = await req.json().catch(() => ({}))
    if (!to || typeof to !== 'string') {
      return NextResponse.json({ ok: false, error: 'Missing "to"' }, { status: 400 })
    }

    const resend = new Resend(resendApiKey)

    // Render the email (React → HTML string)
    const html = WelcomeEmail({ siteUrl })

    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: 'Welcome to Moodex Beta 🎉',
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ ok: false, error }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('send-welcome error:', e?.message || e)
    return NextResponse.json({ ok: false, error: 'Unhandled' }, { status: 500 })
  }
}
