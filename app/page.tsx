import AskClient from '@/components/AskClient';
import EmailCapture from '@/components/EmailCapture';

export default function Home() {
  return (
    <main className="grid gap-8 p-8">
      {/* Hero Section */}
      <section className="col-span-12 text-center">
        <h1 className="h1">THE CRYPTO MOOD CONSOLE</h1>
        <p className="muted">
          FAST VERDICTS • TRENDS &amp; HEADLINES • BUILT FOR CLARITY
        </p>

        {/* Email Capture under Hero */}
        <div className="mt-6 flex justify-center">
          <EmailCapture />
        </div>
      </section>

      {/* Ask Console */}
      <section className="col-span-6">
        <AskClient />
      </section>

      {/* Status Card */}
      <section className="col-span-6">
        <div className="card">
          <h2 className="h2">Status</h2>
          <ul className="muted list-disc pl-5">
            <li>Next.js 14 App Router</li>
            <li>Vercel build-ready</li>
            <li>
              Uses <code>NEXT_PUBLIC_WORKER_URL</code> for chat
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
