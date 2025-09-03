export default function Footer(){
  return (
    <footer className="wrap py-10 text-sm text-slate-400">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>© {new Date().getFullYear()} MOODEX. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#beta" className="hover:text-white">Join Beta</a>
        </div>
      </div>
    </footer>
  );
}
