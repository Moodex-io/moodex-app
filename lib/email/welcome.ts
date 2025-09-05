// lib/email/welcome.ts
export function welcomeEmailHTML(opts: {
  siteUrl: string;
  logoUrl?: string;
  heroUrl?: string;
  ctaHref?: string;
}) {
  const {
    siteUrl,
    logoUrl = "/brand/moodexlogo.png",
    heroUrl = "/email/mascot.png",
    ctaHref = siteUrl,
  } = opts;

  // Precompute a safe hostname so we don't need any regex in the template
  const safeHost = (() => {
    try {
      return new URL(siteUrl).host || siteUrl;
    } catch {
      return siteUrl.replace("https://", "").replace("http://", "");
    }
  })();

  const abs = (p: string) => (p.startsWith("http") ? p : `${siteUrl}${p}`);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to Moodex</title>
  <style>
    body { margin:0; padding:0; background:#0b1117; }
    img { border:0; display:block; outline:none; text-decoration:none; }
    a { text-decoration:none; }
    .btn {
      background: linear-gradient(135deg,#00E2FB,#C855FF);
      border-radius:10px;
      color:#0b1117 !important;
      display:inline-block;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      font-weight:800;
      font-size:14px;
      line-height:1;
      padding:14px 22px;
    }
    .card { background:#0E1521; border-radius:16px; box-shadow: 0 10px 40px rgba(0,0,0,.35); }
    .muted { color:#9fb0c1; }
    .title { color:#e7eef7; font-weight:900; letter-spacing:.2px; font-size:28px; line-height:1.25; margin:0; }
    .copy { color:#cbd6e2; font-size:15px; line-height:1.7; }
    .li { color:#cbd6e2; font-size:14px; line-height:1.6; }
  </style>
</head>
<body>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1117; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;">
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="${abs(logoUrl)}" alt="Moodex" width="36" height="36" style="width:36px;height:36px;">
            </td>
          </tr>
          <tr>
            <td class="card" style="padding:32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <img src="${abs(heroUrl)}" alt="Welcome to the Moodex Beta" width="560" style="max-width:100%; height:auto; border-radius:12px;">
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td align="center" style="padding:8px 8px 16px;">
                  <h1 class="title">Welcome to the Moodex Beta 🚀</h1>
                </td></tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 4px 20px;">
                  <p class="copy" style="margin:0;">
                    Thanks for joining! You’re now on the early-access list. We’ll send invites, feature drops,
                    and tips as we roll out.
                  </p>
                </td></tr>
                <tr><td style="padding:0 4px 8px;">
                  <ul style="margin:0; padding-left:20px;">
                    <li class="li">Beta access link when your cohort opens</li>
                    <li class="li">Feature updates and changelogs</li>
                    <li class="li">Occasional alpha perks for early users</li>
                  </ul>
                </td></tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td align="center" style="padding-top:16px; padding-bottom:12px;">
                  <a href="${ctaHref}" class="btn">Visit Moodex</a>
                </td></tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:8px;">
                    <p class="muted" style="font-size:12px; line-height:1.6; margin:0;">
                      You received this because you signed up at
                      <a href="${siteUrl}" style="color:#9cd7ff;">${safeHost}</a>.
                      If this wasn't you, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
