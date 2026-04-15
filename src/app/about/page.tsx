import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProblemSolutionSection from "@/components/about/ProblemSolutionSection";
import HowItWorksDetailedSection from "@/components/about/HowItWorksDetailedSection";
import ProductShowcaseSection from "@/components/about/ProductShowcaseSection";
import FeaturesSection from "@/components/about/FeaturesSection";
import UseCasesSection from "@/components/about/UseCasesSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";

export const metadata = {
  title: "About — Unifesto",
  description: "Learn how Unifesto is transforming campus event management at Malla Reddy University.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* About Hero */}
      <section className="relative bg-black pt-36 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Our Story</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            We&apos;re building the<br />
            <span style={gradientText}>campus event OS.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Unifesto started with a simple frustration — great events happening on campus, and students missing them because the system was broken. We&apos;re fixing that, one campus at a time.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="/pricing"
              className="rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
              style={{ background: brandGradient }}
            >
              View Pricing
            </a>
            <a
              href="/#events"
              className="rounded-full px-7 py-3 text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>

      <ProblemSolutionSection />
      <HowItWorksDetailedSection />
      <ProductShowcaseSection />
      <FeaturesSection />
      <UseCasesSection />
      <TestimonialsSection />

      {/* CTA to Pricing */}
      <section className="py-16 px-6 text-center border-t border-white/5">
        <p className="text-slate-500 text-sm mb-2">Ready to get started?</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">See our pricing plans.</h2>
        <a
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(52,145,255,0.4)]"
          style={{ background: brandGradient }}
        >
          View Pricing →
        </a>
      </section>

      <Footer />
    </main>
  );
}
