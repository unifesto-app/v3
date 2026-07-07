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
  title: "Unifesto - AI-Based Event Tech Management Platform for India",
  description: "Unifesto is the AI brain behind every event run by institutions, clubs, communities, and startups. AI face check-in, smart event recommendations, WhatsApp-first updates, and post-event intelligence. 10,000+ attendees. Built by struggled event organisers.",
  keywords: ["AI event management platform India", "AI face check-in events", "community event AI", "event intelligence platform", "event tech India", "event recommendation engine", "AI event analytics", "institution event intelligence India", "event management AI"],
  openGraph: {
    title: "Unifesto - AI Event Tech Platform for India",
    description: "AI-powered event management for institutions, clubs, communities, and startups. Face check-in. Smart recommendations. WhatsApp-first updates. AI analytics. 10K+ attendees, 25+ events, built by struggled organisers.",
    type: "website",
    url: "https://www.unifesto.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unifesto - AI Event Tech for India",
    description: "AI face check-in. Smart event recommendations. WhatsApp-first. AI analytics. 10K+ attendees. Built by struggled event organisers.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-canvas overflow-x-hidden">
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
