export default function CTA(){
  return (
    <section className="wrap section">
      <div className="card p-8 text-center">
        <h3 className="text-xl font-extrabold">Ready to feel the market’s mood?</h3>
        <p className="mt-2 text-slate-300">Join the beta and start asking Mood-E.</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <a className="btn btn-primary" href="#ask">Try Mood-E</a>
          <a className="btn btn-ghost" href="#features">Explore features</a>
        </div>
      </div>
    </section>
  );
}
