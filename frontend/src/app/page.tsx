import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyBuiltSection from "@/components/WhyBuiltSection";
import OffersSection from "@/components/OffersSection";
import StatsGrid from "@/components/StatsGrid";
import WhoAndWhySection from "@/components/WhoAndWhySection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import SparkleCursor from "@/components/SparkleCursor";
import BackgroundSparkles from "@/components/BackgroundSparkles";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-peacock font-sans text-white/90 selection:bg-gold/30 selection:text-gold-light scroll-smooth relative z-0">
      {/* Ambient background dust (behind everything) */}
      <BackgroundSparkles />
      {/* Interactive cursor sparkles (on top of everything) */}
      <SparkleCursor />
      <Navbar />
      <HeroSection />
      <WhyBuiltSection />
      <OffersSection />
      <StatsGrid />
      <WhoAndWhySection />
      <FaqSection />
      <Footer />
    </main>
  );
}

