// Simple semi-circle gauge 0–100
export default function MoodGauge({ score = 50 }) {
  const s = Math.max(0, Math.min(100, Number(score) || 0));
  const r = 60; // radius
  const semi = Math.PI * r; // semicircumference
  const offset = semi * (1 - s / 100);

  // color from red → yellow → green
  const color =
    s < 35 ? '#ff4d6d' :
    s < 65 ? '#ffd166' :
    '#17ff93';

  return (
    <div className="gauge">
      <svg width="160" height="100" viewBox="0 0 160 100">
        <defs>
          <linearGradient id="ggrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="50%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#17ff93" />
          </linearGradient>
        </defs>

        {/* background arc */}
        <path
          d="M10,90 A70,70 0 0 1 150,90"
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* progress arc */}
        <path
          d="M10,90 A70,70 0 0 1 150,90"
          fill="none"
          stroke="url(#ggrad)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${semi} ${semi}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
        {/* tick */}
        <circle cx="80" cy="90" r="3" fill={color} />
      </svg>
    </div>
  );
}
