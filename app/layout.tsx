import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Moodex Labs',
  description: 'Crypto mood console and analytics – fast, clean, modern.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
