import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";

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
      <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h1
          id="hero-heading"
          className="animate-fade-in-up animate-delay-100 m-0 mb-6 leading-none tracking-tight font-agrandir"
        >
          <span
            className="block text-6xl md:text-7xl lg:text-8xl font-agrandir font-bold"
            style={{
              background: "linear-gradient(180deg, #ffffff, #ffffff, #595959)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Organize. Optimize.
          </span>
          <span
            className="block text-4xl md:text-5xl lg:text-6xl font-agrandir font-bold mt-3"
            style={{
              background: "linear-gradient(135deg, #3491ff, #0062ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Elevate. Events
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-200 text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one platform for campus event discovery, hosting, and management. Built for students, by students.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-300 flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button
            id="hero-discover-events"
            className="rounded-full px-4 pb-2 pt-3 md:px-6 md:pb-3 md:pt-4 h-auto text-sm md:text-lg font-semibold border-0 shadow-[0_0_24px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(52,145,255,0.65)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #3491ff, #0062ff)",
              color: "#000000",
              backgroundClip: "padding-box",
            }}
          >
            Discover Events
          </Button>
          <div
            style={{
              background: "linear-gradient(135deg, #3491ff, #0062ff)",
              borderRadius: "9999px",
              padding: "1px",
            }}
            className="transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_0_20px_rgba(52,145,255,0.35)]"
          >
            <Button
              id="hero-host-event"
              className="rounded-full px-4 pb-2 pt-3 md:px-6 md:pb-3 md:pt-4 h-auto text-sm md:text-lg font-semibold border-0 transition-all duration-300"
              style={{
                background: "#000000",
                WebkitBackgroundClip: "unset",
                backgroundClip: "unset",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #3491ff, #0062ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Host an Event
              </span>
            </Button>
          </div>
        </div>

      </div>

      {/* Stats + Hashtag row — pinned to bottom */}
      <div className="animate-fade-in-up animate-delay-400 absolute bottom-12 md:bottom-6 left-0 right-0 z-10 flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0 w-full max-w-6xl mx-auto px-6 md:px-8">
        {/* Hashtag */}
        <p
          className="text-sm md:text-lg font-bold tracking-[0.15em]"
          style={{
            background: "linear-gradient(135deg, #3491ff, #0062ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          #UnifestoAtYourCampus
        </p>

        {/* Stats */}
        <div className="flex items-center gap-5 md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-row items-center gap-1">
              <span
                className="text-base md:text-xl font-extrabold leading-none"
                style={{
                  background: "linear-gradient(135deg, #3491ff, #0062ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] md:text-xs font-light tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #3491ff, #0062ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
        aria-hidden="true"
      />
    </section>
  );
}
