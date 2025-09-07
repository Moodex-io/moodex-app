import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="wrap py-5 flex items-center justify-between">
      {/* Left: Logo (links home) */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/moodexlogo.png"
            alt="Moodex"
            width={250}
            height={80}
            priority
            className="h-12 w-auto"
          />
        </Link>
      </div>

      {/* Right: Desktop nav */}
      <div className="hidden md:flex items-center gap-6 text-slate-300">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#pricing" className="hover:text-white">Pricing</a>
        <a href="#feed" className="hover:text-white">Feed</a>

        {/* New: Sign in (internal route) */}
        <Link href="/login" className="hover:text-white">
          Sign in
        </Link>

        <a href="#beta" className="btn btn-primary">Join the Beta</a>
      </div>

      {/* Right: Mobile quick action (only Sign in to keep it tidy) */}
      <div className="md:hidden">
        <Link
          href="/login"
          className="px-3 py-2 rounded-lg border border-white/10 text-slate-200 hover:text-white hover:border-white/20"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
