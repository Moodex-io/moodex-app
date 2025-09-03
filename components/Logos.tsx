export default function Logos(){
  return (
    <section className="wrap py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-70">
        {['Alpha','Nova','Orbit','Pioneer','Vector','Atlas'].map(x=>(
          <div key={x} className="h-10 rounded-lg border border-white/10 bg-white/5 grid place-items-center text-xs text-slate-300">{x}</div>
        ))}
      </div>
    </section>
  );
}
