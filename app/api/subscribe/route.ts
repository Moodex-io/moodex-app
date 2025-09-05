// app/api/subscribe/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: Request) {
  try {
    const { email, source = 'hero' } = await req.json().catch(() => ({}))

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 })
    }

    // 1) Save to Supabase
    const supabase = createClient(supabaseUrl, supabaseAnon)
    const { error } = await supabase.from('email_signups').insert({ email, source })
    if (error) {
      console.error('supabase insert error:', error)
      return NextResponse.json({ ok: false, error: 'DB insert failed' }, { status: 500 })
    }

    // 2) Trigger the welcome email (server-to-server)
    // Use the current origin for dev/preview/prod correctness
    const origin = new URL(req.url).origin
    const r = await fetch(`${origin}/api/send-welcome`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ to: email }),
      // If send-welcome throws, we still want /subscribe to return an error so we notice it.
    })

    if (!r.ok) {
      const t = await r.text().catch(() => '')
      console.error('send-welcome failed:', r.status, t)
      return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('subscribe POST error:', e?.message || e)
    return NextResponse.json({ ok: false, error: 'Unhandled' }, { status: 500 })
  }
}
