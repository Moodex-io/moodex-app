// lib/email/welcome.ts
// Polished HTML email for Moodex welcome
// Uses inline CSS + tables (works in Gmail/Outlook). No external CSS.
// Provide absolute URLs for images (logo/mascot) via inputs.

export type WelcomeEmailOpts = {
  siteUrl: string;        // e.g. https://moodex.io (or your Vercel domain)
  logoUrl: string;        // e.g. https://moodex.io/brand/moodexlogo.png
  mascotUrl: string;      // e.g. https://moodex.io/brand/mascot.png
  ctaUrl?: string;        // optional deep link for the CTA
};

export function renderWelcomeEmail({
  siteUrl,
  logoUrl,
  mascotUrl,
  ctaUrl,
}: WelcomeEmailOpts) {
  const cleanUrl = siteUrl
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/+$/, "");

  const cta = ctaUrl || siteUrl;

  // Keep total HTML under ~100KB to avoid Gmail clipping
  // Width = 600px, safe for most clients

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Welcome to the Moodex Beta 🎉</title>
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    /* Some clients ignore <style>, so all critical styles are inline below. */
    @media (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 16px !important; padding-right: 16px !important; }
      .center { text-align: center !important; }
      .stack { display: block !important; width: 100% !important; }
      .card { padding: 16px !important; }
      .hero-title { font-size: 26px !important; line-height: 34px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#0b1220; font-family: Inter, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#e5e7eb;">
  <!-- Outer wrapper (full width) -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b1220;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <!-- Fixed-width container -->
        <table class="container" role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 8px 0 12px 0;">
              <img src="${logoUrl}" width="128" height="auto" alt="Moodex" style="display:block; width:128px; height:auto; border:0; outline:none; text-decoration:none;">
            </td>
          </tr>

          <!-- Mascot -->
          <tr>
            <td align="center" style="padding: 0 0 16px 0;">
              <img src="${mascotUrl}" width="64" height="64" alt="Moodex mascot" style="display:block; width:64px; height:64px; border-radius:16px; border:0;">
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="px" style="padding: 0 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f172a; border-radius:16px; box-shadow:0 12px 40px rgba(0,0,0,0.35);">
                <tr>
                  <td class="card" style="padding: 28px 28px 10px 28px;">
                    <h1 class="hero-title" style="margin:0; font-size:28px; line-height:36px; color:#f8fafc; font-weight:800; letter-spacing:0.2px;">
                      Welcome to the Moodex Beta 🚀
                    </h1>
                    <p style="margin:12px 0 0 0; font-size:15px; line-height:24px; color:#cbd5e1;">
                      You’re officially on the Early Access list. Moodex reveals real-time market mood &amp; narratives so you act on <strong style="color:#fff">signal</strong>, not noise.
                    </p>

                    <!-- CTA -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                      <tr>
                        <td align="center" bgcolor="#5eead4" style="border-radius:12px; background: linear-gradient(135deg,#33d6ff,#a855f7);">
                          <a href="${cta}" style="display:inline-block; padding:12px 22px; font-weight:700; font-size:14px; line-height:20px; color:#0b1220; text-decoration:none;">
                            Explore Moodex
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <div style="height:1px; background:linear-gradient(90deg,rgba(51,214,255,0.3),rgba(168,85,247,0.3)); margin:22px 0;"></div>

                    <!-- “What’s next” title -->
                    <h2 style="margin:0 0 10px 0; font-size:16px; line-height:22px; color:#e2e8f0; font-weight:800;">What’s next</h2>

                    <!-- Feature cards (stack on mobile) -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td class="stack" valign="top" style="width:33.33%; padding-right:10px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#111827; border-radius:12px;">
                            <tr>
                              <td style="padding:14px;">
                                <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">Cohorts</div>
                                <div style="font-size:14px; color:#e5e7eb; font-weight:700; line-height:20px;">Beta access link when your cohort opens</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="stack" valign="top" style="width:33.33%; padding:0 5px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#111827; border-radius:12px;">
                            <tr>
                              <td style="padding:14px;">
                                <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">Product</div>
                                <div style="font-size:14px; color:#e5e7eb; font-weight:700; line-height:20px;">Feature drops &amp; changelogs</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td class="stack" valign="top" style="width:33.33%; padding-left:10px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#111827; border-radius:12px;">
                            <tr>
                              <td style="padding:14px;">
                                <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">Perks</div>
                                <div style="font-size:14px; color:#e5e7eb; font-weight:700; line-height:20px;">Occasional alpha perks for early users</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer note -->
                    <p style="margin:20px 0 0 0; font-size:12px; line-height:18px; color:#94a3b8; text-align:center;">
                      You received this because you signed up at
                      <a href="${siteUrl}" style="color:#9cd7ff; text-decoration:none;">${cleanUrl}</a>.
                      If this wasn’t you, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:24px; line-height:24px;">&nbsp;</td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
