export default function Pricing(){
  return (
    <section className="wrap section" id="pricing">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-extrabold">Simple pricing</h3>
        <p className="mt-2 text-slate-300">Start free. Upgrade when you need more.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Free */}
        <div className="card p-6">
          <div className="text-sm font-extrabold tracking-wide">Starter</div>
          <div className="mt-2 text-4xl font-black">$0</div>
          <p className="mt-1 text-sm text-slate-300">5 asks/day • BTC/ETH/SOL • Headlines</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Moodex Score + narrative</li>
            <li>• Ask Mood-E (rate-limited)</li>
            <li>• Email updates (optional)</li>
          </ul>
          <a className="mt-5 inline-block btn btn-ghost" href="#ask">Try free</a>
        </div>

        {/* Pro */}
        <div className="card p-6 border-white/20">
          <div className="text-sm font-extrabold tracking-wide">Pro</div>
          <div className="mt-2 text-4xl font-black">$39<span className="text-lg font-bold text-slate-300">/mo</span></div>
          <p className="mt-1 text-sm text-slate-300">Unlimited asks • 10+ markets • Alerts</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Priority responses & fresher cache</li>
            <li>• Watchlists & alerts (email/Telegram)</li>
            <li>• Early access to B2B widget/API</li>
          </ul>
          <a className="mt-5 inline-block btn btn-primary" href="#beta">Join the Beta</a>
        </div>
      </div>
    </section>
  );
}
