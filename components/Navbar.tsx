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
            width={140}   // tweak size as needed
            height={40}
            priority
            className="h-10 w-auto"
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
