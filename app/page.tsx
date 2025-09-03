import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Logos from '@/components/Logos';
import ValueProps from '@/components/ValueProps';
import FeatureRows from '@/components/FeatureRows';
import AskWidget from '@/components/AskWidget';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home(){
  return (
    <>
      <Navbar />
      <Hero />
      <Logos />
      <ValueProps />
      <FeatureRows />
      <AskWidget />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

