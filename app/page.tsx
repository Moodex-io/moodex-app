// app/page.tsx

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import ValueProps from '@/components/ValueProps'
import FeatureRows from '@/components/FeatureRows'
import AskWidget from '@/components/AskWidget'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

// New imports
import Trending from '@/components/Trending'
import Headlines from '@/components/Headlines'
import EmailCapture from '@/components/EmailCapture'

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

        {/* Trending + Headlines side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Trending title="Trending now" market="crypto" />
          <Headlines title="Latest crypto news" market="crypto" />
        </div>

        {/* Email capture callout */}
        <section className="mt-12 flex justify-center">
          <EmailCapture />
        </section>

        <Pricing />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
