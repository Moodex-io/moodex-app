export default function Header() {
  return (
    <header className="site-hd">
      <div className="brand">
        <span className="logo">M</span>
        <span className="word">MOODEX</span>
      </div>
      <nav className="nav">
        <a className="navlink" href="#feed">Feed</a>
        <a className="navlink" href="#features">Features</a>
        <a className="btn" href="#beta">Join the Beta</a>
      </nav>
    </header>
  );
}
