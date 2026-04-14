import EventCard from "./EventCard";
import { gradientText, brandGradient } from "@/lib/styles";

export interface EventData {
  id: string;
  title: string;
  organizer: string;
  date: string;
}

const events: EventData[] = [
  {
    id: "esummit26",
    title: "ESummit'26",
    organizer: "Innovation & Entrepreneurship Cell",
    date: "16th March 2026",
  },
  {
    id: "unite",
    title: "UNITE",
    organizer: "Marquee Film Club",
    date: "13th April 2026",
  },
  {
    id: "wds2026",
    title: "WDS 2026",
    organizer: "MUN Club MRUH",
    date: "4th April 2026",
  },
  {
    id: "geetotsav",
    title: "Geetotsav",
    organizer: "Marquee Film Club",
    date: "12th March 2026",
  },
  {
    id: "hack-league",
    title: "Hack League",
    organizer: "GDGon Campus MRUH",
    date: "8th March 2026",
  },
  {
    id: "science-day",
    title: "Science Day",
    organizer: "BOS & R&D Dept. MRUH",
    date: "28th February 2026",
  },
];

export default function EventsGrid() {
  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="relative bg-black py-20 md:py-28 px-6"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
            What&apos;s Happening
          </p>
          <h2
            id="events-heading"
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Explore Events{" "}
            <span className="text-xl md:text-2xl font-medium" style={gradientText}>
              at Malla Reddy University
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            From hackathons to cultural fests — discover what&apos;s next on campus.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <a
            id="view-all-events"
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
            style={gradientText}
          >
            View all events
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 group-hover:translate-x-1"
              style={{ background: brandGradient }}
            >
              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
