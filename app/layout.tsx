// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Squada_One } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const squada = Squada_One({ weight: '400', subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Moodex Labs — The Crypto Mood Console',
  description: 'Fast market mood, trends & headlines — built for clarity.',
  themeColor: '#0d1720',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${squada.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
