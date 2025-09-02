import AskClient from '@/components/AskClient';

export default function Home() {
  return (
    <main className="grid">
      <section className="col-12 center">
        <h1 className="h1">THE CRYPTO MOOD CONSOLE</h1>
        <p className="muted">FAST VERDICTS • TRENDS & HEADLINES • BUILT FOR CLARITY</p>
      </section>

      <section className="col-6">
        <AskClient />
      </section>

      <section className="col-6">
        <div className="card">
          <h2 className="h2">Status</h2>
          <ul className="muted" style={{margin:0,paddingLeft:18}}>
            <li>Next.js 14 App Router</li>
            <li>Vercel build-ready</li>
            <li>Uses <code>NEXT_PUBLIC_WORKER_URL</code> for chat</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
