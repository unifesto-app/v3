import { gradientText, brandGradient } from "@/lib/styles";

const useCases = [
  {
    title: "Hackathons",
    desc: "Manage registrations, team formation, QR check-in and live leaderboards for multi-day hackathons.",
  },
  {
    title: "Cultural Fests",
    desc: "Handle thousands of attendees with smooth ticketing, multiple event tracks and gates.",
  },
  {
    title: "MUN & Debates",
    desc: "Delegate registration, committee assignment and credential distribution in one workflow.",
  },
  {
    title: "Entrepreneurship Events",
    desc: "From pitch competitions to summits — manage speakers, sponsors and audience seamlessly.",
  },
  {
    title: "Film Screenings & Open Mics",
    desc: "Simple RSVP collection with spot-booking and waitlists for smaller, intimate events.",
  },
  {
    title: "Workshops & Seminars",
    desc: "Capacity-capped registrations, certificate distribution and feedback collection post-event.",
  },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="relative bg-black py-20 md:py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(52,145,255,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Use Cases</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Every kind of campus event,<br />
            <span style={gradientText}>covered.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-base font-bold text-white mb-2">{uc.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
