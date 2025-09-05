// lib/email/welcome.ts
export function welcomeEmail(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  const cleanHost = base.replace(/^https?:\/\/(www\.)?/i, "");

  const logoUrl = `${base}/brand/moodexlogo.png`;
  const mascotUrl = `${base}/brand/mascot.png`;

  return `
<body style="margin:0; padding:0; background:#0a0f1c; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1c; padding:32px 0;">
    <tr>
      <td align="center">

        <!-- header: logo + mascot -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto;">
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <img src="${logoUrl}" width="150" alt="Moodex" style="display:block; border:0; outline:none; text-decoration:none;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="${mascotUrl}" width="110" alt="Moodex mascot" style="display:block; border:0; outline:none; text-decoration:none;" />
            </td>
          </tr>
        </table>

        <!-- card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background:#101828; border-radius:12px; padding:40px; color:#ffffff;">
          <tr>
            <td align="center">

              <h1 style="margin:0 0 14px; font-size:26px; line-height:1.3; color:#ffffff;">
                Welcome to the Moodex Beta 🚀
              </h1>

              <p style="margin:0 0 16px; font-size:16px; line-height:1.6; color:#cbd5e1;">
                You’re officially on the Early Access list! Moodex reveals live market mood & narrative signals so you act on <em>signal</em>, not noise.
              </p>

              <p style="margin:0 0 24px; font-size:16px; line-height:1.6; color:#cbd5e1;">
                As an early pioneer, your feedback helps shape the product. We’re excited you’re here.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px auto 8px;">
                <tr>
                  <td align="center" bgcolor="#6d28d9" style="border-radius:10px;">
                    <a href="${base}"
                       style="display:inline-block; padding:14px 26px; font-weight:700; color:#ffffff; text-decoration:none; 
                              background:linear-gradient(90deg,#06b6d4,#a855f7); border-radius:10px;">
                      Explore Moodex
                    </a>
                  </td>
                </tr>
              </table>

              <h2 style="margin:28px 0 10px; font-size:18px; color:#ffffff;">What’s next</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="text-align:left;">
                <tr>
                  <td style="color:#cbd5e1; font-size:14px; line-height:1.8;">
                    • Beta access link when your cohort opens<br/>
                    • Feature drops and changelogs<br/>
                    • Occasional alpha perks for early users
                  </td>
                </tr>
              </table>

              <hr style="border:0; border-top:1px solid #233047; margin:28px 0;" />

              <p style="font-size:12px; line-height:1.6; color:#9ca3af; margin:0;">
                You received this because you signed up at
                <a href="${base}" style="color:#9cd7ff; text-decoration:none;">${cleanHost}</a>.
                If this wasn’t you, please ignore this email.
              </p>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
`;
}
