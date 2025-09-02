export default function Header() {
  return (
    <div className="header container">
      <div className="brand">
        <span className="logo">M</span>
        <span className="brand-word">MOODEX</span>
      </div>
      <nav className="nav">
        <a href="#features">Features</a>
        <a href="#feed">Feed</a>
        <a className="btn btn-primary" href="#beta">Join the Beta</a>
      </nav>
    </div>
  );
}
