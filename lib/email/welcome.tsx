import * as React from 'react';

type Props = {
  siteUrl: string;      // absolute, e.g. https://moodex.io
  logoSrc: string;      // absolute, e.g. https://moodex.io/brand/moodexlogo.png
  mascotSrc: string;    // absolute, e.g. https://moodex.io/brand/mascot.png
};

export default function WelcomeEmail({ siteUrl, logoSrc, mascotSrc }: Props) {
  const cleanHost = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Moodex Beta</title>
      </head>
      <body style={{ margin: 0, background: '#0b1117', color: '#e5eef7', fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial' }}>
        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
          <tbody>
            <tr>
              <td align="center" style={{ padding: '36px 16px 0' }}>
                {/* logos */}
                <img src={logoSrc} alt="Moodex" width={108} height={108} style={{ display: 'block', margin: '0 auto 10px', borderRadius: 16 }} />
                <img src={mascotSrc} alt="Moodex mascot" width={90} height={90} style={{ display: 'block', margin: '0 auto 24px' }} />

                {/* card */}
                <table width="560" cellPadding={0} cellSpacing={0} role="presentation" style={{ maxWidth: 560, width: '100%', background: '#0d1621', borderRadius: 16, border: '1px solid #13202f', boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: 32 }}>
                        <h1 style={{ margin: '0 0 12px', fontSize: 26, lineHeight: '32px', textAlign: 'center' }}>
                          Welcome to the Moodex Beta 🚀
                        </h1>

                        <p style={{ margin: '0 0 16px', color: '#a7b6c4', textAlign: 'center' }}>
                          You’re officially on the Early Access list. Moodex reveals live market mood &amp; narrative signals so you act on <strong>signal</strong>, not noise.
                        </p>

                        {/* CTA */}
                        <div style={{ textAlign: 'center', margin: '20px 0 28px' }}>
                          <a
                            href={siteUrl}
                            style={{
                              display: 'inline-block',
                              padding: '12px 18px',
                              borderRadius: 10,
                              background: 'linear-gradient(135deg,#47b5ff,#b16bff)',
                              color: '#0b1117',
                              textDecoration: 'none',
                              fontWeight: 700
                            }}
                          >
                            Explore Moodex
                          </a>
                        </div>

                        <h3 style={{ margin: '0 0 10px' }}>What’s next</h3>
                        <ul style={{ margin: 0, padding: '0 0 0 18px', lineHeight: '22px', color: '#b7c6d6' }}>
                          <li>Beta access link when your cohort opens</li>
                          <li>Feature drops and changelogs</li>
                          <li>Occasional alpha perks for early users</li>
                        </ul>

                        <hr style={{ border: 'none', borderTop: '1px solid #182433', margin: '24px 0' }} />

                        <p style={{ fontSize: 12, lineHeight: '18px', margin: 0, color: '#9ca3af', textAlign: 'center' }}>
                          You received this because you signed up at{' '}
                          <a href={siteUrl} style={{ color: '#9cd7ff', textDecoration: 'none' }}>{cleanHost}</a>. If this wasn’t you, please ignore this email.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ height: 28 }} />
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
