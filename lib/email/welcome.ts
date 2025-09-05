export function welcomeEmail(siteUrl: string) {
  return `
  <body style="margin:0; padding:0; font-family:Arial, sans-serif; background:#0a0f1c; color:#ffffff;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#0a0f1c; padding:40px 0;">
      <tr>
        <td align="center">
          <!-- Logo -->
          <img src="${siteUrl}/brand/moodexlogo.png" alt="Moodex Logo" width="120" style="margin-bottom:20px;" />

          <!-- Mascot (optional, add later) -->
          <img src="${siteUrl}/brand/moodex-mascot.png" alt="Moodex Mascot" width="100" style="margin-bottom:20px;" />

          <!-- Card -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#101828; border-radius:12px; padding:40px; text-align:center;">
            <tr>
              <td>
                <h1 style="color:#ffffff; font-size:24px; margin-bottom:16px;">
                  Welcome to the Moodex Beta 🚀
                </h1>
                <p style="color:#9ca3af; font-size:16px; line-height:1.6; margin:0 0 24px;">
                  Thanks for joining! You’re now on the early access list. 
                  We’ll send invites, feature drops, and tips as we roll out.
                </p>

                <table cellspacing="0" cellpadding="0" style="margin:24px auto;">
                  <tr>
                    <td align="center" bgcolor="#6366f1" style="border-radius:8px;">
                      <a href="${siteUrl}" 
                         style="display:inline-block; padding:12px 24px; font-size:16px; color:#ffffff; 
                                text-decoration:none; font-weight:bold; background:linear-gradient(90deg,#06b6d4,#a855f7); 
                                border-radius:8px;">
                        Visit Moodex
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; color:#9ca3af; margin-top:20px; line-height:1.6;">
                  What to expect next:<br/>
                  • Beta access link when your cohort opens<br/>
                  • Feature updates and changelogs<br/>
                  • Occasional alpha perks for early users
                </p>

                <hr style="margin:24px 0; border:0; border-top:1px solid #2d3748;" />

                <p style="font-size:12px; color:#9ca3af; line-height:1.6; margin:0;">
                  You received this because you signed up at 
                  <a href="${siteUrl}" style="color:#9cd7ff;">${siteUrl.replace(/^https?:\\/\\//,'')}</a>.
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
