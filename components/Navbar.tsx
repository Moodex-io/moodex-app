// components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="wrap py-5 flex items-center justify-between">
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

      <div className="hidden md:flex items-center gap-6 text-slate-300">
        <Link href="/#features" className="hover:text-white">Features</Link>
        <Link href="/#pricing" className="hover:text-white">Pricing</Link>

        {/* New: Tools hub */}
        <Link href="/tools" className="hover:text-white">Tools</Link>

        {/* New: Sign in */}
        <Link href="/auth" className="hover:text-white">Sign in</Link>

        <Link href="/auth" className="btn btn-primary">Join the Beta</Link>
      </div>
    </nav>
  );
}
