import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import EventsGrid from "@/components/EventsGrid";
import HowItWorksSection from "@/components/HowItWorksSection";
import OrganizerPitchSection from "@/components/OrganizerPitchSection";
import SocialProofSection from "@/components/SocialProofSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Unifesto — Optimize. Organize. Elevate. Events.",
  description: "Discover and host premium campus events with Unifesto. The all-in-one platform for college event management at Malla Reddy University and beyond.",
  keywords: ["campus events", "college events", "event discovery", "event hosting", "student events", "university events", "malla reddy university"],
  openGraph: {
    title: "Unifesto — Optimize. Organize. Elevate. Events.",
    description: "Discover and host premium campus events with Unifesto.",
    type: "website",
    url: "https://www.unifesto.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unifesto — Optimize. Organize. Elevate. Events.",
    description: "Discover and host premium campus events with Unifesto.",
  },
  alternates: {
    canonical: "/",
  },
};

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
