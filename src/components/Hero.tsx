import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { gradientText, brandGradient } from "@/lib/styles";

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "25+", label: "Events Hosted" },
  { value: "10+", label: "Collaborations" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Beams */}
      <BackgroundBeams className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-5 md:px-6 pt-24 md:pt-0 pb-32 md:pb-24">

        {/* Badge */}
        <div className="animate-fade-in-up animate-delay-100 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-6 md:mb-8">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: brandGradient }} />
          <span className="text-xs font-medium text-slate-300 tracking-wide">Now live at Hyderabad</span>
        </div>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="animate-fade-in-up animate-delay-100 m-0 mb-4 md:mb-6 leading-none tracking-tight"
        >
          <span
            className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-agrandir font-bold"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #ffffff 60%, #595959 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Organize. Optimize.
          </span>
          <span
            className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-agrandir font-bold mt-2 md:mt-3"
            style={gradientText}
          >
            Elevate. Events
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-200 text-slate-400 text-sm md:text-lg max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
          The all-in-one platform for campus event discovery, hosting, and management.{" "}
          <span className="text-slate-300">Built for students, by students.</span>
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-300 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Button
            id="hero-discover-events"
            className="rounded-full px-6 py-2.5 md:px-7 md:py-3 h-auto text-sm md:text-base font-semibold border-0 shadow-[0_0_24px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(52,145,255,0.65)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: brandGradient, color: "#000000" }}
          >
            Discover Events
          </Button>
          <div
            style={{ background: brandGradient, borderRadius: "9999px", padding: "1px" }}
            className="transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_0_20px_rgba(52,145,255,0.35)]"
          >
            <Button
              id="hero-host-event"
              className="rounded-full px-6 py-2.5 md:px-7 md:py-3 h-auto text-sm md:text-base font-semibold border-0 transition-all duration-300"
              style={{ background: "#000000" }}
            >
              <span style={gradientText}>Host an Event</span>
            </Button>
          </div>
        </div>

      </div>

      {/* Stats + Hashtag — pinned to bottom */}
      <div className="animate-fade-in-up animate-delay-400 absolute bottom-8 md:bottom-8 left-0 right-0 z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">

          {/* Hashtag */}
          <p className="text-xs md:text-sm font-bold tracking-[0.15em]" style={gradientText}>
            #UnifestoAtYourCampus
          </p>

          {/* Stats with dividers */}
          <div className="flex items-center gap-0">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div className="flex flex-col items-center px-4 md:px-6">
                  <span className="text-base md:text-2xl font-extrabold leading-none text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs font-medium text-slate-500 mt-0.5 tracking-wide">
                    {stat.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-6 bg-white/10" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
        aria-hidden="true"
      />
    </section>
  );
}
