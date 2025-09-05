// lib/email/welcome.ts
import * as React from 'react';

type Props = {
  siteUrl: string;
  logoSrc: string;   // absolute URL
  mascotSrc: string; // absolute URL
  ctaHref: string;   // absolute URL
};

export function WelcomeEmail({ siteUrl, logoSrc, mascotSrc, ctaHref }: Props) {
  const cleanHost = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Moodex Beta</title>
      </head>
      <body style={{ margin: 0, background: '#0b1117', color: '#e5eef7', fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
        <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
          <tbody>
            <tr>
              <td align="center" style={{ padding: '36px 16px' }}>
                {/* header logos */}
                <img src={logoSrc} alt="Moodex" width={100} height={100} style={{ display: 'block', margin: '0 auto 10px', borderRadius: 16 }} />
                <img src={mascotSrc} alt="Moodex mascot" width={90} height={90} style={{ display: 'block', margin: '0 auto 24px' }} />

                {/* card */}
                <table
                  width="560"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    maxWidth: 560,
                    width: '100%',
                    background: '#0e1621',
                    borderRadius: 16,
                    border: '1px solid #13202f',
                    boxShadow: '0 10px 30px rgba(0,0,0,.35)',
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: 32 }}>
                        <h1 style={{ margin: '0 0 12px', fontSize: 26, lineHeight: '32px' }}>
                          Welcome to the Moodex Beta 🚀
                        </h1>

                        <p style={{ margin: '0 0 16px', color: '#c8d7e1' }}>
                          You’re officially on the Early Access list! Moodex reveals live market mood & narratives so you act on <b>signal</b>, not noise.
                        </p>

                        <div style={{ textAlign: 'center', margin: '24px 0 28px' }}>
                          <a
                            href={ctaHref}
                            style={{
                              display: 'inline-block',
                              padding: '12px 22px',
                              borderRadius: 10,
                              textDecoration: 'none',
                              background: 'linear-gradient(135deg,#00e2fb,#a855f7)',
                              color: '#0b1117',
                              fontWeight: 700,
                            }}
                          >
                            Explore Moodex
                          </a>
                        </div>

                        <h3 style={{ margin: '0 0 8px', fontSize: 16, color: '#e5eef7' }}>What’s next</h3>
                        <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#c8d7e1' }}>
                          <li>Beta access link when your cohort opens</li>
                          <li>Feature drops and changelogs</li>
                          <li>Occasional alpha perks for early users</li>
                        </ul>

                        <hr style={{ border: 'none', borderTop: '1px solid #13202f', margin: '28px 0 12px' }} />

                        <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>
                          You received this because you signed up at{' '}
                          <a href={siteUrl} style={{ color: '#9cd7ff', textDecoration: 'none' }}>
                            {cleanHost}
                          </a>. If this wasn’t you, please ignore this email.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* /card */}
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
