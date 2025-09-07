// lib/email/welcome.tsx
import * as React from 'react';

type Props = {
  siteUrl: string;   // absolute, e.g. https://moodex.io
  logoSrc: string;   // absolute URL to /brand/moodexlogo.png
  mascotSrc: string; // absolute URL to /brand/mascot.png
  ctaHref: string;   // absolute URL for the CTA button
};

export function WelcomeEmail({ siteUrl, logoSrc, mascotSrc, ctaHref }: Props) {
  // Clean host without using regex in JSX strings (which was causing the build error)
  const cleanHost = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Palette
  const bg = '#0b1117';
  const card = '#0e1621';
  const border = '#13202f';
  const text = '#e5eef7';
  const mid = '#c8d7e1';

  // Re-usable styles (keep to simple inline styles for email clients)
  const container: React.CSSProperties = {
    margin: 0,
    background: bg,
    color: text,
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  };
  const outerTd: React.CSSProperties = { padding: '36px 16px' };
  const cardTable: React.CSSProperties = {
    maxWidth: 560,
    width: '100%',
    background: card,
    borderRadius: 16,
    border: `1px solid ${border}`,
    boxShadow: '0 10px 30px rgba(0,0,0,.35)',
  };
  const cardTd: React.CSSProperties = { padding: 32 };
  const h1: React.CSSProperties = { margin: '0 0 12px', fontSize: 26, lineHeight: '32px' };
  const p: React.CSSProperties = { margin: '0 0 16px', color: mid };
  const hr: React.CSSProperties = { border: 'none', borderTop: `1px solid ${border}`, margin: '28px 0 12px' };
  const ctaWrap: React.CSSProperties = { textAlign: 'center', margin: '24px 0 28px' };
  const cta: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 22px',
    borderRadius: 10,
    textDecoration: 'none',
    background: 'linear-gradient(135deg,#00e2fb,#a855f7)',
    color: '#0b1117',
    fontWeight: 700,
  };
  const footerP: React.CSSProperties = { margin: 0, fontSize: 12, color: '#9ca3af', lineHeight: 1.7 };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Moodex Beta</title>
      </head>
      <body style={container}>
        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
          <tbody>
            <tr>
              <td align="center" style={outerTd}>
                {/* Brand block */}
                <img
                  src={logoSrc}
                  alt="Moodex"
                  width={100}
                  height={100}
                  style={{ display: 'block', margin: '0 auto 10px', borderRadius: 16 }}
                />
                <img
                  src={mascotSrc}
                  alt="Moodex mascot"
                  width={90}
                  height={90}
                  style={{ display: 'block', margin: '0 auto 24px' }}
                />

                {/* Card */}
                <table width={560} cellPadding={0} cellSpacing={0} role="presentation" style={cardTable}>
                  <tbody>
                    <tr>
                      <td style={cardTd}>
                        <h1 style={h1}>Welcome to the Moodex Beta 🚀</h1>

                        <p style={p}>
                          You’re officially on the Early Access list! Moodex reveals live market mood & narratives so you act on <b>signal</b>, not noise.
                        </p>

                        <div style={ctaWrap}>
                          <a href={ctaHref} style={cta}>
                            Explore Moodex
                          </a>
                        </div>

                        {/* Mini “cards” row (safe table layout for email) */}
                        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ marginBottom: 8 }}>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: 8 }}>
                                <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ border: `1px solid ${border}`, borderRadius: 12, background: '#0f1a28' }}>
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: '14px 16px' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Daily Mood Pulse</div>
                                        <div style={{ color: mid, fontSize: 13 }}>One-line market verdict + key drivers.</div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td style={{ paddingLeft: 8 }}>
                                <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ border: `1px solid ${border}`, borderRadius: 12, background: '#0f1a28' }}>
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: '14px 16px' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Narrative Heat</div>
                                        <div style={{ color: mid, fontSize: 13 }}>Trends & headlines distilled into signal.</div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                          <tbody>
                            <tr>
                              <td>
                                <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ border: `1px solid ${border}`, borderRadius: 12, background: '#0f1a28' }}>
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: '14px 16px' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Early Access Perks</div>
                                        <ul style={{ margin: 0, padding: '0 0 0 18px', color: mid }}>
                                          <li>Beta access link when your cohort opens</li>
                                          <li>Feature drops and changelogs</li>
                                          <li>Occasional alpha perks for early users</li>
                                        </ul>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <hr style={hr} />

                        <p style={footerP}>
                          You received this because you signed up at{' '}
                          <a href={siteUrl} style={{ color: '#9cd7ff', textDecoration: 'none' }}>
                            {cleanHost}
                          </a>
                          . If this wasn’t you, please ignore this email.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* /Card */}
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
