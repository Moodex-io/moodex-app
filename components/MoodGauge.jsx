export default function MoodGauge({ score = 50 }) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));
  const r = 80;
  const semi = Math.PI * r;
  const offset = semi * (1 - s / 100);

  return (
    <div>
      <div className="gauge">
        <svg viewBox="0 0 220 145" width="220" height="145">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b"/>
              <stop offset="50%" stopColor="#ffd166"/>
              <stop offset="100%" stopColor="#19ffa0"/>
            </linearGradient>
          </defs>
          <path d="M20,125 A100,100 0 0 1 200,125" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="18" strokeLinecap="round"/>
          <path d="M20,125 A100,100 0 0 1 200,125" fill="none" stroke="url(#grad)" strokeWidth="18" strokeLinecap="round"
            strokeDasharray={`${semi} ${semi}`} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset .6s ease' }}/>
        </svg>
      </div>
    </div>
  );
}
