export function welcomeEmail(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  const cleanHost = base.replace(/^https?:\/\/(www\.)?/i, "");
  const logoUrl = `${base}/brand/moodexlogo.png`;
  const mascotUrl = `${base}/brand/mascot.png`;

  return `
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background:#0a0f1c; color:#ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#0a0f1c; padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Logo -->
        <img src="${logoUrl}" alt="Moodex Logo" width="140" style="margin-bottom:12px; display:block;" />

        <!-- Mascot -->
        <img src="${mascotUrl}" alt="Moodex Mascot" width="110" style="margin-bottom:28px; display:block;" />

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#101828; border-radius:12px; padding:40px; text-align:center;">
          <tr>
            <td>

              <h1 style="color:#ffffff; font-size:26px; margin:0 0 16px;">
                🎉 Welcome to the Moodex Beta 🎉
              </h1>

              <p style="color:#9ca3af; font-size:16px; line-height:1.6; margin:0 0 20px;">
                You’ve officially joined the <strong>Moodex Early Access</strong> community! 🚀  
                Get ready to explore market moods, real-time sentiment, and insights that help you
                act on <em>signal</em>, not noise.
              </p>

              <p style="color:#9ca3af; font-size:16px; line-height:1.6; margin:0 0 24px;">
                As one of the first pioneers, your feedback will help shape the future of Moodex.
                We’re excited to have you on board!
              </p>

              <!-- CTA Button -->
              <table cellspacing="0" cellpadding="0" style="margin:24px auto;">
                <tr>
                  <td align="center" bgcolor="#6366f1" style="border-radius:8px;">
                    <a href="${base}"
                       style="display:inline-block; padding:14px 28px; font-size:16px; color:#ffffff;
                              text-decoration:none; font-weight:bold; background:linear-gradient(90deg,#06b6d4,#a855f7);
                              border-radius:8px;">
                      Explore Moodex
                    </a>
                  </td>
                </tr>
              </table>

              <h2 style="color:#ffffff; font-size:18px; margin:30px 0 12px;">✨ What’s Next</h2>
              <ul style="color:#9ca3af; font-size:14px; line-height:1.8; margin:0; padding:0 0 0 18px; text-align:left;">
                <li>Beta access links when your group opens</li>
                <li>Feature updates, drops, and improvements</li>
                <li>Exclusive perks for early adopters</li>
              </ul>

              <hr style="margin:28px 0; border:0; border-top:1px solid #2d3748;" />

              <p style="font-size:12px; color:#9ca3af; line-height:1.6; margin:0;">
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
