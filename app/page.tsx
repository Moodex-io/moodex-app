// app/page.tsx

import Link from 'next/link'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import ValueProps from '@/components/ValueProps'
import FeatureRows from '@/components/FeatureRows'
import AskWidget from '@/components/AskWidget'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

// New panels
import Trending from '@/components/Trending'
import Headlines from '@/components/Headlines'

// Load EmailCapture only on client to avoid SSR env issues
import dynamic from 'next/dynamic'
const EmailCapture = dynamic(() => import('@/components/EmailCapture'), { ssr: false })

export default function Page() {
  return (
    <>
      <Navbar />

      {/* main content container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Logos />
        <ValueProps />
        <FeatureRows />

        {/* Ask widget */}
        <AskWidget />

        {/* --- Micro-tools teaser (lightweight hub without adding a new component) --- */}
        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Moodex Micro-tools</h2>
            <Link href="/tools" className="text-sm md:text-base text-slate-300 hover:text-white">
              View all tools →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tools/analyze"
              className="block rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700"
            >
              <div className="text-lg font-semibold">Market Analyze</div>
              <div className="text-slate-400 mt-1 mb-4">
                Drop a ticker, token, or topic. Get a clean 30-second brief.
              </div>
              <span className="btn btn-primary">Open</span>
            </Link>

            <Link
              href="/tools/meme"
              className="block rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700"
            >
              <div className="text-lg font-semibold">Mood Meme</div>
              <div className="text-slate-400 mt-1 mb-4">
                Generate a shareable on-brand meme for today’s market mood.
              </div>
              <span className="btn btn-primary">Open</span>
            </Link>

            <Link
              href="/tools"
              className="block rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700"
            >
              <div className="text-lg font-semibold">More tools</div>
              <div className="text-slate-400 mt-1 mb-4">
                Trending tickers, headline signal, and more—no setup.
              </div>
              <span className="btn btn-secondary">Explore tools</span>
            </Link>
          </div>
        </section>

        {/* Trending + Headlines side by side on large screens */}
        <section id="signals" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div id="trending">
            <Trending title="Trending now" market="crypto" />
          </div>
          <div id="news">
            <Headlines title="Latest crypto news" market="crypto" />
          </div>
        </section>

        {/* Email capture callout (client-only) */}
        <section className="mt-12 flex justify-center">
          <EmailCapture />
        </section>

        {/* If you want it less SaaS-y right now, comment out Pricing and keep CTA to tools/beta */}
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
