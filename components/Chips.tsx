// components/Chips.tsx
'use client';

type Props = { onPick: (q: string) => void };

const PRESETS = [
  'Market mood',
  'BTC today',
  'ETH today',
  'SOL today',
  'Trending coins',
  'Latest crypto news',
  'Fear & Greed index',
  'Global market cap',
];

export default function Chips({ onPick }: Props) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {PRESETS.map((t) => (
        <button
          key={t}
          onClick={() => onPick(t)}
          className="px-3 py-1.5 rounded-full text-xs border border-white/15 text-teal-100 bg-white/5 hover:bg-white/10"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
