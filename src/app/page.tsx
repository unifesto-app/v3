import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import EventsGrid from "@/components/EventsGrid";
import HowItWorksSection from "@/components/HowItWorksSection";
import OrganizerPitchSection from "@/components/OrganizerPitchSection";
import SocialProofSection from "@/components/SocialProofSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <MarqueeBar />
      <EventsGrid />
      <HowItWorksSection />
      <OrganizerPitchSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
