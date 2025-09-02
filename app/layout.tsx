export const metadata = {
  title: 'MOODEX — The Mood Intelligence Console',
  description: 'The Mood of the Market — any market. Any business.',
  icons: { icon: '/favicon.ico' },
  themeColor: '#0a0f12',
};

import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Headings: Space Grotesk, Body: Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
