// components/RateLimitBanner.tsx
type Props = {
  left: number;
  limit: number;
  signupUrl?: string;
};

export default function RateLimitBanner({ left, limit, signupUrl = '#' }: Props) {
  const pct = Math.round(((limit - left) / limit) * 100);
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-teal-100">
          Free asks left today: <span className="font-semibold">{left}</span> / {limit}
        </p>
        <div className="hidden md:block w-40 h-2 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      {left === 0 && (
        <p className="mt-2 text-sm text-teal-200/80">
          You’ve hit the free daily limit. <a className="underline text-cyan-300" href={signupUrl}>Join the Beta</a> for more.
        </p>
      )}
    </div>
  );
}
