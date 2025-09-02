// components/Header.tsx
'use client';

import Link from 'next/link';

const SIGNUP = process.env.NEXT_PUBLIC_SIGNUP_URL || '#';

export default function Header() {
  return (
    <div className="border-b border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/25">
      <header className="container flex h-14 md:h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500" aria-hidden />
          <span className="font-heading text-lg tracking-wider text-white">MOODEX</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-teal-200/80">
          <a href="#console" className="hover:text-teal-100">Console</a>
          <a href="#industries" className="hover:text-teal-100">Industries</a>
          <a href="#pricing" className="hover:text-teal-100">Pricing</a>
          <a href={SIGNUP} className="btn ml-2">Join Beta</a>
        </nav>
      </header>
    </div>
  );
}
