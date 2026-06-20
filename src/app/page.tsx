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
  title: "Unifesto — AI-Based Event Tech Management Platform for Campus India",
  description: "Unifesto is the AI brain behind every student-led campus event. AI face check-in, smart event recommendations, WhatsApp-first updates, and post-event intelligence. 10,000+ students. Built by struggled event organisers.",
  keywords: ["AI event management platform India", "AI face check-in events", "campus event AI", "event intelligence platform", "student event tech India", "event recommendation engine", "AI event analytics", "campus intelligence India", "event management AI"],
  openGraph: {
    title: "Unifesto — AI Event Tech Platform for Campus India",
    description: "AI-powered campus event management. Face check-in. Smart recommendations. WhatsApp-first updates. AI analytics. 10K+ students, 25+ events, built by struggled organisers.",
    type: "website",
    url: "https://www.unifesto.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unifesto — AI Event Tech for Campus India",
    description: "AI face check-in. Smart event recommendations. WhatsApp-first. AI analytics. 10K+ students. Built by struggled event organisers.",
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
