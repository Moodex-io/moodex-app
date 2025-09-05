// lib/email/welcome.ts
// Reusable, pure-HTML generator (no JSX)

type WelcomeArgs = {
  siteUrl: string;      // absolute site origin, e.g. https://moodex.io
  logoUrl: string;      // absolute OR relative (/brand/moodexlogo.png)
  heroUrl?: string;     // optional mascot/hero image path
  ctaHref?: string;     // button link
  previewText?: string; // inbox preview line
};

function absolutize(url: string, siteUrl: string) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return siteUrl.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
}

export function welcomeEmailHTML({
  siteUrl,
  logoUrl,
  heroUrl,
  ctaHref,
  previewText = 'You’re on the Moodex early access list. Here’s what to expect.',
}: WelcomeArgs) {
  const absLogo = absolutize(logoUrl, siteUrl);
  const absHero = heroUrl ? absolutize(heroUrl, siteUrl) : '';
  const buttonHref = ctaHref || siteUrl;

  // colors
  const bg = '#0b1117';
  const card = '#0f1624';
  const text = '#e6eef8';
  const mid = '#9aa4b2';
  const line = 'rgba(255,255,255,0.08)';
  const btnGrad = 'linear-gradient(135deg,#00e2fb,#ff00c3)';

  // note: inline styles only; table layout for maximum client support
  return `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark light">
    <title>Welcome to Moodex</title>
    <style>
      /* some clients use <style> only; we also inline for safety */
      .btn:hover { filter: brightness(1.08); }
    </style>
  </head>
  <body style="margin:0;background:${bg};color:${text};font-family: Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
    <!-- preview text (hidden) -->
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
      ${previewText}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${bg};">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <!-- card -->
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:${card};border:1px solid ${line};border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
            <tr>
              <td style="padding:28px 24px 8px 24px;" align="center">
                <img src="${absLogo}" alt="Moodex" width="120" style="display:block;height:auto;max-width:120px;margin:0 auto 8px auto;">
              </td>
            </tr>

            ${absHero
              ? `<tr>
                   <td align="center" style="padding:0 24px 8px 24px;">
                     <img src="${absHero}" alt="Moodex mascot" width="160" style="display:block;height:auto;max-width:160px;margin:0 auto 4px auto;">
                   </td>
                 </tr>`
              : ''}

            <tr>
              <td align="center" style="padding:8px 24px 0 24px;">
                <h1 style="margin:0 0 12px 0;font-size:24px;line-height:1.25;letter-spacing:0.2px;">
                  Welcome to the Moodex Beta 🚀
                </h1>
                <p style="margin:0 0 4px 0;font-size:14px;color:${mid};line-height:1.7;">
                  You’re officially on the Early Access list. Moodex reveals live market mood & narrative signals
                  so you act on <strong style="color:#bfe3ff;">signal</strong>, not noise.
                </p>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding:18px 24px 8px 24px;">
                <a href="${buttonHref}" class="btn"
                   style="display:inline-block;background:${btnGrad};color:#ffffff;text-decoration:none;
                          padding:12px 22px;border-radius:12px;border:1px solid rgba(255,255,255,0.18);
                          font-weight:600;">
                  Explore Moodex
                </a>
              </td>
            </tr>

            <!-- 3 feature “cards” -->
            <tr>
              <td style="padding:20px 20px 6px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;">
                  <tr>
                    <td width="33%" valign="top" style="padding:10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                        style="background:#0b131f;border:1px solid ${line};border-radius:12px;">
                        <tr>
                          <td style="padding:14px;">
                            <div style="font-size:22px;margin-bottom:6px;">📈</div>
                            <div style="font-weight:700;margin-bottom:4px;">Real-time Signals</div>
                            <div style="color:${mid};font-size:13px;line-height:1.55;">
                              Spot shifting narratives and sentiment across markets—fast.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>

                    <td width="33%" valign="top" style="padding:10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                        style="background:#0b131f;border:1px solid ${line};border-radius:12px;">
                        <tr>
                          <td style="padding:14px;">
                            <div style="font-size:22px;margin-bottom:6px;">🛰️</div>
                            <div style="font-weight:700;margin-bottom:4px;">Signal, not Noise</div>
                            <div style="color:${mid};font-size:13px;line-height:1.55;">
                              Filter the chatter. Act on clean, ranked insights—not raw feeds.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>

                    <td width="33%" valign="top" style="padding:10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                        style="background:#0b131f;border:1px solid ${line};border-radius:12px;">
                        <tr>
                          <td style="padding:14px;">
                            <div style="font-size:22px;margin-bottom:6px;">🚀</div>
                            <div style="font-weight:700;margin-bottom:4px;">Early Access Perks</div>
                            <div style="color:${mid};font-size:13px;line-height:1.55;">
                              Feature drops, private cohorts, and occasional alpha for pioneers.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- “What’s next” list -->
            <tr>
              <td style="padding:6px 24px 4px 24px;">
                <div style="border-top:1px solid ${line};margin:12px 0 14px 0;"></div>
                <p style="margin:0 0 8px 0;font-weight:700;">What’s next:</p>
                <ul style="margin:0 0 12px 18px;padding:0;color:${mid};line-height:1.7;">
                  <li>Beta access link when your cohort opens</li>
                  <li>Feature updates & changelogs</li>
                  <li>Occasional alpha perks for early users</li>
                </ul>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="padding:6px 24px 22px 24px;" align="center">
                <p style="margin:0;font-size:12px;color:${mid};line-height:1.7;">
                  You received this because you signed up at
                  <a href="${siteUrl}" style="color:#9cd7ff;text-decoration:none;">${siteUrl.replace(/^https?:\\/\\//,'')}</a>.
                  If this wasn’t you, please ignore this email.
                </p>
              </td>
            </tr>

          </table>
          <!-- /card -->
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
