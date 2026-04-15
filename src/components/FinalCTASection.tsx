import { brandGradient, gradientText } from "@/lib/styles";

export default function FinalCTASection() {
  return (
    <section id="final-cta" aria-labelledby="cta-heading" className="relative bg-black py-24 md:py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Top + bottom gradient lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, #3491ff, transparent)" }} aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>
          Ready?
        </p>
        <h2 id="cta-heading" className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
          Your next event<br />starts here.
        </h2>
        <p className="text-slate-500 text-sm md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Whether you're looking for something to do on campus or building the next big event — Unifesto is your platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="final-cta-explore"
            href="#events"
            className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(52,145,255,0.55)] hover:-translate-y-0.5 text-center"
            style={{ background: brandGradient, color: "black" }}
          >
            Explore Events
          </a>
          <div
            className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(52,145,255,0.25)]"
            style={{ background: brandGradient, borderRadius: "9999px", padding: "1px" }}
          >
            <a
              id="final-cta-create"
              href="#host"
              className="block w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-semibold text-center bg-black"
            >
              <span style={gradientText}>Create an Event</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
