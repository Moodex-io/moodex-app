import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'MOODEX — Mood Intelligence Console',
  description: 'The Mood of the Market — any market. Any business.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-[#0a0f12] text-slate-50`}>
        {children}
      </body>
    </html>
  );
}
