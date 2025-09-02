export default function Header() {
  return (
    <header className="container mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl font-extrabold text-[#001217]"
             style={{ background: 'linear-gradient(135deg, var(--brand-cyan), var(--brand-pink))', boxShadow: '0 0 28px rgba(0,226,251,.35)' }}>
          M
        </div>
        <div className="font-extrabold tracking-wide">MOODEX</div>
      </div>
      <nav className="hidden items-center gap-5 text-slate-300 md:flex">
        <a className="hover:text-white" href="#features">Features</a>
        <a className="hover:text-white" href="#feed">Feed</a>
        <a className="btn btn-primary" href="#beta">Join the Beta</a>
      </nav>
    </header>
  );
}
