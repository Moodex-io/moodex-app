export default function Hero(){
  return (
    <section className="wrap section text-center">
      <div className="mx-auto max-w-3xl">
        <h1
          className="font-black text-white tracking-tight"
          style={{ fontSize:'clamp(40px,6vw,72px)' }}
        >
          The Mood of the Market.
          <br/><span className="text-slate-300">Any market. Any business.</span>
        </h1>
        <p className="mt-4 text-slate-300">
          Moodex reveals real-time sentiment, trends, and narratives across crypto, stocks,
          brands and more—so you act on signal, not noise.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a className="btn btn-primary" href="#ask">Try Mood-E</a>
          <a className="btn btn-ghost" href="#features">See Features</a>
        </div>
      </div>
    </section>
  );
}
