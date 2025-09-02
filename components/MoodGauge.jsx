export default function MoodGauge({ score = 56 }: { score?: number }) {
  const s = Math.max(0, Math.min(100, Number(score)));
  const r = 80;
  const semi = Math.PI * r;
  const offset = semi * (1 - s/100);

  return (
    <div className="w-[240px]">
      <svg viewBox="0 0 240 150" width="240" height="150">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b"/>
            <stop offset="50%" stopColor="#ffd166"/>
            <stop offset="100%" stopColor="#19ffa0"/>
          </linearGradient>
        </defs>
        <path d="M30,130 A100,100 0 0 1 210,130"
              fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="20" strokeLinecap="round"/>
        <path d="M30,130 A100,100 0 0 1 210,130"
              fill="none" stroke="url(#g)" strokeWidth="20" strokeLinecap="round"
              strokeDasharray={`${semi} ${semi}`} strokeDashoffset={offset}
              style={{ transition:'stroke-dashoffset .6s ease' }}/>
      </svg>
    </div>
  );
}
