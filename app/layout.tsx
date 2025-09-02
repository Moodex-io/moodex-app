export const metadata = {
  title: 'MOODEX – Mood Intelligence Console',
  description: 'The Mood of the Market — any market. Any business.',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0a0f12] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
