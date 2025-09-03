export default function Navbar(){
  return (
    <nav className="wrap py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-xl font-extrabold text-[#001217]"
          style={{ background:'linear-gradient(135deg,var(--brand-cyan),var(--brand-pink))', boxShadow:'0 0 24px rgba(0,226,251,.35)' }}
        >
          M
        </div>
        <div className="font-extrabold tracking-wide">MOODEX</div>
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
