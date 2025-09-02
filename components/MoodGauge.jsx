export default function MoodGauge({ score = 50 }) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));
  const r = 60; // radius
  const semi = Math.PI * r;
  const offset = semi * (1 - s / 100);

  return (
    <div className="gauge">
      <svg width="160" height="100" viewBox="0 0 160 100">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b"/>
            <stop offset="50%" stopColor="#ffd166"/>
            <stop offset="100%" stopColor="#19ffa0"/>
          </linearGradient>
        </defs>
        <path d="M10,90 A70,70 0 0 1 150,90" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="14" strokeLinecap="round"/>
        <path d="M10,90 A70,70 0 0 1 150,90" fill="none" stroke="url(#g)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${semi} ${semi}`} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset .6s ease' }}/>
      </svg>
    </div>
  );
}
