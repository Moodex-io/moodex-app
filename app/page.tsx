import AskClient from '@/components/AskClient';
// import EmailCapture from '@/components/EmailCapture' // enable after Supabase table exists

export default function Home() {
  return (
    <main className="grid gap-8 p-6 md:p-10"
          style={{gridTemplateColumns:'repeat(12, minmax(0,1fr))'}}>
      <section className="col-[1/13] text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-wide">THE CRYPTO MOOD CONSOLE</h1>
        <p className="opacity-80">FAST VERDICTS • TRENDS &amp; HEADLINES • BUILT FOR CLARITY</p>
        {/* <div className="mt-6 flex justify-center"><EmailCapture /></div> */}
      </section>

      <section className="col-[1/13] md:col-[1/7]">
        <AskClient />
      </section>

      <section className="col-[1/13] md:col-[7/13]">
        <div className="rounded-xl border border-white/10 p-5 bg-white/5">
          <h2 className="text-xl font-bold mb-2">Status</h2>
          <ul className="opacity-80 list-disc pl-5 space-y-1 m-0">
            <li>Next.js 14 App Router</li>
            <li>Vercel build-ready</li>
            <li>Uses <code>NEXT_PUBLIC_WORKER_URL</code> for chat</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
