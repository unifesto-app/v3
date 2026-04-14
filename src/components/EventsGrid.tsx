import EventCard from "./EventCard";

export interface EventData {
  id: string;
  title: string;
  organizer: string;
  date: string;
  category: string;
  gradient: string;
  accentColor: string;
}

const events: EventData[] = [
  {
    id: "esummit26",
    title: "ESummit'26",
    organizer: "Innovation and Entrepreneurship Cell",
    date: "16th March 2026",
    category: "Entrepreneurship",
    gradient: "linear-gradient(145deg, #1e40af 0%, #1d4ed8 40%, #2563eb 100%)",
    accentColor: "#60a5fa",
  },
  {
    id: "unite",
    title: "UNITE",
    organizer: "Marquee Film Club",
    date: "13th April 2026",
    category: "Film & Arts",
    gradient: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
    accentColor: "#93c5fd",
  },
  {
    id: "wds2026",
    title: "WDS 2026",
    organizer: "MUN Club MRUH",
    date: "4th April 2026",
    category: "Model United Nations",
    gradient: "linear-gradient(145deg, #1d4ed8 0%, #2563eb 45%, #60a5fa 100%)",
    accentColor: "#bfdbfe",
  },
  {
    id: "geetotsav",
    title: "Geetotsav",
    organizer: "Marquee Film Club",
    date: "12th March 2026",
    category: "Cultural",
    gradient: "linear-gradient(145deg, #1e40af 0%, #3b82f6 55%, #60a5fa 100%)",
    accentColor: "#93c5fd",
  },
  {
    id: "hack-league",
    title: "Hack League",
    organizer: "GDGoc Campus MRUH",
    date: "8th March 2026",
    category: "Hackathon",
    gradient: "linear-gradient(145deg, #1e3a8a 0%, #2563eb 40%, #3b82f6 100%)",
    accentColor: "#60a5fa",
  },
  {
    id: "science-day",
    title: "Science Day",
    organizer: "BOS & R&D Dept. MRUH",
    date: "28th February 2026",
    category: "Science & Tech",
    gradient: "linear-gradient(145deg, #1d4ed8 0%, #2563eb 50%, #93c5fd 100%)",
    accentColor: "#bfdbfe",
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
          <p className="text-blue-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            What&apos;s Happening
          </p>
          <h2
            id="events-heading"
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Explore Events{" "}
            <span className="text-blue-400 text-xl md:text-2xl font-medium">
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

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <a
            id="view-all-events"
            href="#"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 group"
          >
            View all events
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
