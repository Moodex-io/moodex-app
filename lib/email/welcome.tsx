// lib/email/welcome.tsx
import * as React from 'react';

type Props = {
  siteUrl: string;      // absolute URL (e.g. https://moodex.io)
  logoSrc: string;      // absolute URL to /brand/moodexlogo.png
  mascotSrc: string;    // absolute URL to /brand/mascot.png (or any hero)
  ctaHref: string;      // absolute URL
  previewText?: string; // optional: inbox preview line
};

export function WelcomeEmail({
  siteUrl,
  logoSrc,
  mascotSrc,
  ctaHref,
  previewText = 'You’re on the Moodex early access list. Here’s what to expect.',
}: Props) {
  const cleanHost = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // palette
  const bg = '#0b1117';
  const card = '#0f1624';
  const text = '#e6eef8';
  const mid = '#9aa4b2';
  const line = 'rgba(255,255,255,0.08)';
  const btnGrad = 'linear-gradient(135deg,#00e2fb,#ff00c3)';

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark light" />
        <title>Welcome to Moodex Beta</title>
        {/* Some clients only read <style>, but we still inline everything for safety */}
        <style>{`.btn:hover{filter:brightness(1.08)}`}</style>
      </head>

      <body style={{ margin: 0, background: bg, color: text, fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
        {/* preview text (hidden) */}
        <div style={{ display: 'none', overflow: 'hidden', lineHeight: '1px', opacity: 0, maxHeight: 0, maxWidth: 0 }}>
          {previewText}
        </div>

        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ background: bg }}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: '28px 16px' }}>
                {/* CARD */}
                <table
                  role="presentation"
                  width={640}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: '100%',
                    maxWidth: 640,
                    background: card,
                    border: `1px solid ${line}`,
                    borderRadius: 16,
                    boxShadow: '0 10px 30px rgba(0,0,0,.35)',
                  }}
                >
                  <tbody>
                    {/* Header logo */}
                    <tr>
                      <td align="center" style={{ padding: '28px 24px 8px 24px' }}>
                        <img
                          src={logoSrc}
                          alt="Moodex"
                          width={120}
                          style={{ display: 'block', height: 'auto', maxWidth: 120, margin: '0 auto 8px' }}
                        />
                      </td>
                    </tr>

                    {/* Hero / mascot (optional—if broken URL, client just ignores) */}
                    <tr>
                      <td align="center" style={{ padding: '0 24px 8px 24px' }}>
                        <img
                          src={mascotSrc}
                          alt="Moodex mascot"
                          width={160}
                          style={{ display: 'block', height: 'auto', maxWidth: 160, margin: '0 auto 4px' }}
                        />
                      </td>
                    </tr>

                    {/* Headline + subcopy */}
                    <tr>
                      <td align="center" style={{ padding: '8px 24px 0 24px' }}>
                        <h1 style={{ margin: '0 0 12px', fontSize: 24, lineHeight: 1.25, letterSpacing: 0.2 }}>
                          Welcome to the Moodex Beta 🚀
                        </h1>
                        <p style={{ margin: '0 0 4px', fontSize: 14, color: mid, lineHeight: 1.7 }}>
                          You’re officially on the Early Access list. Moodex reveals live market mood & narrative signals
                          so you act on <b style={{ color: '#bfe3ff' }}>signal</b>, not noise.
                        </p>
                      </td>
                    </tr>

                    {/* CTA */}
                    <tr>
                      <td align="center" style={{ padding: '18px 24px 8px 24px' }}>
                        <a
                          href={ctaHref}
                          className="btn"
                          style={{
                            display: 'inline-block',
                            background: btnGrad,
                            color: '#ffffff',
                            textDecoration: 'none',
                            padding: '12px 22px',
                            borderRadius: 12,
                            border: '1px solid rgba(255,255,255,0.18)',
                            fontWeight: 700,
                          }}
                        >
                          Explore Moodex
                        </a>
                      </td>
                    </tr>

                    {/* Three “cards” row */}
                    <tr>
                      <td style={{ padding: '20px 20px 6px 20px' }}>
                        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              {/* Card 1 */}
                              <td width="33%" valign="top" style={{ padding: 10 }}>
                                <table
                                  role="presentation"
                                  width="100%"
                                  cellPadding={0}
                                  cellSpacing={0}
                                  style={{ background: '#0b131f', border: `1px solid ${line}`, borderRadius: 12 }}
                                >
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: 14 }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>📈</div>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Real-time Signals</div>
                                        <div style={{ color: mid, fontSize: 13, lineHeight: 1.55 }}>
                                          Spot shifting narratives and sentiment across markets—fast.
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                              {/* Card 2 */}
                              <td width="33%" valign="top" style={{ padding: 10 }}>
                                <table
                                  role="presentation"
                                  width="100%"
                                  cellPadding={0}
                                  cellSpacing={0}
                                  style={{ background: '#0b131f', border: `1px solid ${line}`, borderRadius: 12 }}
                                >
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: 14 }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>🛰️</div>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Signal, not Noise</div>
                                        <div style={{ color: mid, fontSize: 13, lineHeight: 1.55 }}>
                                          Filter the chatter. Act on clean, ranked insights—not raw feeds.
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                              {/* Card 3 */}
                              <td width="33%" valign="top" style={{ padding: 10 }}>
                                <table
                                  role="presentation"
                                  width="100%"
                                  cellPadding={0}
                                  cellSpacing={0}
                                  style={{ background: '#0b131f', border: `1px solid ${line}`, borderRadius: 12 }}
                                >
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: 14 }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>🚀</div>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Early Access Perks</div>
                                        <div style={{ color: mid, fontSize: 13, lineHeight: 1.55 }}>
                                          Feature drops, private cohorts, and occasional alpha for pioneers.
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* What’s next */}
                    <tr>
                      <td style={{ padding: '6px 24px 4px 24px' }}>
                        <div style={{ borderTop: `1px solid ${line}`, margin: '12px 0 14px' }} />
                        <p style={{ margin: '0 0 8px 0', fontWeight: 700 }}>What’s next:</p>
                        <ul style={{ margin: '0 0 12px 18px', padding: 0, color: mid, lineHeight: 1.7 }}>
                          <li>Beta access link when your cohort opens</li>
                          <li>Feature updates & changelogs</li>
                          <li>Occasional alpha perks for early users</li>
                        </ul>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td align="center" style={{ padding: '6px 24px 22px 24px' }}>
                        <p style={{ margin: 0, fontSize: 12, color: mid, lineHeight: 1.7 }}>
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
                {/* /CARD */}
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
