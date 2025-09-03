const items = [
  { title:'Instant Pulse', desc:'One-line verdict + mood score in seconds.' },
  { title:'Signal over Noise', desc:'Trends & headlines distilled — no doomscrolling.' },
  { title:'Frictionless', desc:'Try Mood-E without an account (limited free queries).' },
];

export default function ValueProps(){
  return (
    <section className="wrap section" id="features">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(i=>(
          <div key={i.title} className="card p-6">
            <div className="text-sm font-extrabold tracking-wide text-slate-200">{i.title}</div>
            <p className="mt-2 text-sm text-slate-300">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
