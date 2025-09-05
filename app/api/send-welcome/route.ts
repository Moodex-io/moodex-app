// app/api/send-welcome/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderWelcomeEmail } from "@/lib/email/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

// Build absolute URLs to /public assets. On Vercel, NEXT_PUBLIC_BASE_URL
// should be your prod site (e.g. https://moodex.io or https://moodex.vercel.app)
function abs(path: string) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://moodex.vercel.app";
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || "").toString().trim();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://moodex.vercel.app";

    const html = renderWelcomeEmail({
      siteUrl,
      logoUrl: abs("/brand/moodexlogo.png"),
      mascotUrl: abs("/brand/mascot.png"),
      ctaUrl: siteUrl,
    });

    const { error } = await resend.emails.send({
      from: "Moodex <noreply@mg.moodex.io>",
      to: email,
      subject: "Welcome to Moodex Beta 🎉",
      html,
    });

    if (error) {
      // Resend shows “bounced” in dashboard if address is invalid
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
