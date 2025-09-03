export default function FeatureRows(){
  return (
    <section className="wrap section grid gap-10">
      {/* Row 1 */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="mock h-[260px]"></div>
        <div>
          <h3 className="text-xl font-extrabold">Moodex Score + Narrative</h3>
          <p className="mt-2 text-slate-300">
            We compress market data, news and sentiment into a single score with a plain-English
            narrative so teams can align fast.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Unified mood score for each market</li>
            <li>• Trend and momentum hints</li>
            <li>• Built to share: screenshot-ready cards</li>
          </ul>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid items-center gap-8 md:grid-cols-2 md:flex-row-reverse">
        <div className="md:order-2 mock h-[260px]"></div>
        <div className="md:order-1">
          <h3 className="text-xl font-extrabold">Ask Mood-E (AI Market Copilot)</h3>
          <p className="mt-2 text-slate-300">
            Ask what changed and why. Mood-E answers with live context—prices, flows, and headlines—without
            recommending trades.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Short, confident outputs</li>
            <li>• Safe constraints (no financial advice)</li>
            <li>• Rate-limited free tier, Pro unlocks more</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
