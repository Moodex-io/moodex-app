// app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import Footer from '@/components/Footer';
import QuickAnalyze from '@/components/QuickAnalyze';
import MemeMaker from '@/components/MemeMaker';

// (Optional) keep these light panels under the tools
import Trending from '@/components/Trending';
import Headlines from '@/components/Headlines';

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <ValueProps />

        {/* Tools Hub */}
        <section id="tools" className="mt-10">
          <h2 className="text-2xl font-semibold">Try the tools</h2>
          <p className="mt-1 text-slate-400">
            Instant, shareable outputs—no account required.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <QuickAnalyze />
            <MemeMaker />
          </div>
        </section>

        {/* Optional “context” panels below, can be collapsed if you want less on the page */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Trending title="Trending now" market="crypto" />
          <Headlines title="Latest crypto news" market="crypto" />
        </div>
      </main>

      <Footer />
    </>
  );
}
