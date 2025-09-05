// app/api/send-welcome/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { welcomeEmailHTML } from "@/lib/email/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

// optional: change the friendly name
const FROM = `Moodex <noreply@mg.moodex.io>`;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moodex.io";

    const html = welcomeEmailHTML({
      siteUrl,
      logoUrl: "/brand/moodexlogo.png",
      heroUrl: "/email/mascot.png", // safe even if you haven't added it—image just won’t render
      ctaHref: siteUrl,
    });

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Welcome to Moodex Beta 🎉",
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "send failed" }, { status: 500 });
  }
}
