// lib/email/welcome.ts
// Minimal, safe HTML generator (no JSX) to avoid build-time parser issues.
export function WelcomeEmail({ siteUrl }: { siteUrl: string }) {
  const clean = (u: string) => u.replace(/^https?:\/\//, '')

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Welcome to Moodex Beta</title>
  </head>
  <body style="margin:0; padding:24px; background:#0b1117; font-family:Inter,Segoe UI,Arial,sans-serif; color:#e5e7eb;">
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="640" border="0" cellpadding="0" cellspacing="0" style="max-width:640px; width:100%;">
            <tr>
              <td align="center" style="padding:16px 0 0 0;">
                <img src="${siteUrl}/brand/moodexlogo.png" width="36" height="36" alt="Moodex" style="display:block; margin:0 auto 10px auto;"/>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom:8px;">
                <img src="${siteUrl}/brand/mascot.png" width="44" height="44" alt="Moodex mascot" style="display:block; margin:0 auto 8px auto;"/>
              </td>
            </tr>
            <tr>
              <td style="padding:0 16px 20px 16px;">
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#0f1720; border:1px solid #14212e; border-radius:16px;">
                  <tr>
                    <td style="padding:32px 28px;">
                      <h1 style="margin:0 0 14px 0; font-size:28px; line-height:1.2; color:#ffffff; font-weight:800;">
                        Welcome to the Moodex Beta 🚀
                      </h1>

                      <p style="margin:0 0 14px 0; font-size:15px; line-height:1.7; color:#cbd5e1;">
                        You’re officially on the Early Access list! Moodex reveals live market mood & narrative signals so you act on <em>signal</em>, not noise.
                      </p>

                      <div style="height:14px;"></div>

                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                        <tr>
                          <td align="center" bgcolor="#3b82f6" style="border-radius:12px;">
                            <a href="${siteUrl}" style="display:inline-block; padding:12px 18px; font-size:14px; font-weight:700; text-decoration:none; color:#ffffff;">
                              Explore Moodex
                            </a>
                          </td>
                        </tr>
                      </table>

                      <div style="height:22px;"></div>

                      <h3 style="margin:0 0 10px 0; font-size:16px; font-weight:800; color:#ffffff;">What’s next</h3>
                      <ul style="margin:0; padding:0 0 0 18px; color:#cbd5e1; font-size:14px; line-height:1.8;">
                        <li>Beta access link when your cohort opens</li>
                        <li>Feature drops and changelogs</li>
                        <li>Occasional alpha perks for early users</li>
                      </ul>

                      <div style="height:22px;"></div>

                      <p style="margin:0; font-size:12px; color:#94a3b8; line-height:1.6; text-align:center;">
                        You received this because you signed up at
                        <a href="${siteUrl}" style="color:#9cd7ff; text-decoration:none;">${clean(siteUrl)}</a>.
                        If this wasn’t you, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="height:24px;"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim()
}
