export const metadata = {
  title: 'MOODEX — The Mood of the Market',
  description: 'Instant market mood, trends & headlines. Any market.',
  icons: { icon: '/favicon.ico' },
  themeColor: '#070b0c',
};

import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts: bold modern headers + clean body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Squada+One&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
