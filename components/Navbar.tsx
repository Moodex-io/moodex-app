import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="wrap py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo wrapped in a home link */}
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/moodexlogo.png"
            alt="Moodex"
            width={200}   // increased width
            height={55}   // increased height
            priority
            className="h-12 w-auto" // was h-10 → bumped to h-12
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6 text-slate-300">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#pricing" className="hover:text-white">Pricing</a>
        <a href="#feed" className="hover:text-white">Feed</a>
        <a href="#beta" className="btn btn-primary">Join the Beta</a>
      </div>
    </nav>
  );
}
