import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AskClient from '@/components/AskClient';

export default function Home() {
  return (
    <>
      <Header />

      <main className="container py-10 md:py-14">
        {/* HERO */}
        <section className="text-center mb-10 md:mb-14">
          <div className="badge mb-3">BETA</div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md font-heading">
            THE MOOD CONSOLE
          </h1>
          <p className="mt-3 text-sm md:text-base text-teal-200/80">
            The mood of the market. <span className="text-teal-100">Any market.</span> Any business.
          </p>
        </section>

        {/* CONSOLE */}
        <section id="console" className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="card p-5 md:p-6">
            <h2 className="text-lg font-semibold text-cyan-200 mb-2">Ask Mood-E</h2>
            <p className="text-sm text-teal-200/70 mb-4">
              Try: <span className="font-semibold text-teal-100">Market mood</span>,{' '}
              <span className="font-semibold text-teal-100">BTC today</span>,{' '}
              <span className="font-semibold text-teal-100">Trending coins</span>.
            </p>
            <AskClient hideWorkerNote dailyLimit={5} />
          </div>

          <div className="card p-5 md:p-6">
            <h2 className="text-lg font-semibold text-cyan-200 mb-2">What you get</h2>
            <ul className="list-disc pl-5 text-sm text-teal-200/80 space-y-2">
              <li>One-line mood verdict + key numbers.</li>
              <li>Plain-language explanations (AI Narrator).</li>
              <li>Trending topics + distilled headlines (no doomscrolling).</li>
            </ul>
          </div>
        </section>

        {/* INDUSTRIES (vision) */}
        <section id="industries" className="mt-12 md:mt-16">
          <h2 className="text-2xl font-bold text-white font-heading mb-4">BUILT TO CROSS INDUSTRIES</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-5"><h3 className="font-semibold text-cyan-200 mb-2">Crypto & Finance</h3><p className="text-sm text-teal-200/80">Market mood, flows, events.</p></div>
            <div className="card p-5"><h3 className="font-semibold text-cyan-200 mb-2">Brands & Commerce</h3><p className="text-sm text-teal-200/80">Customer sentiment & review trends.</p></div>
            <div className="card p-5"><h3 className="font-semibold text-cyan-200 mb-2">Politics & News</h3><p className="text-sm text-teal-200/80">Voter mood & narrative shifts.</p></div>
            <div className="card p-5"><h3 className="font-semibold text-cyan-200 mb-2">Entertainment</h3><p className="text-sm text-teal-200/80">Audience buzz for movies, games, music.</p></div>
          </div>
        </section>

        {/* PRICING (unchanged placeholder) */}
        <section id="pricing" className="mt-12 md:mt-16">
          <h2 className="text-2xl font-bold text-white font-heading mb-4">PRICING</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white">Free</h3>
              <p className="mt-1 text-teal-200/80 text-sm">5 asks/day • Core metrics • Headlines</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white">Pro (Soon)</h3>
              <p className="mt-1 text-teal-200/80 text-sm">Unlimited asks • Multi-market dashboards • Alerts • API</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
