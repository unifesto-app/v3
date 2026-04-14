import type { EventData } from "./EventsGrid";

interface EventCardProps {
  event: EventData;
  index: number;
}

// Category icon map
const categoryIcons: Record<string, string> = {
  "Entrepreneurship": "🚀",
  "Film & Arts": "🎬",
  "Model United Nations": "🌐",
  "Cultural": "🎭",
  "Hackathon": "💻",
  "Science & Tech": "🔬",
};

export default function EventCard({ event, index }: EventCardProps) {
  const icon = categoryIcons[event.category] ?? "✨";
  // Stagger delay based on index
  const delayClass = [
    "",
    "animate-delay-100",
    "animate-delay-200",
    "animate-delay-300",
    "animate-delay-400",
    "animate-delay-500",
  ][index] ?? "";

  return (
    <article
      id={`event-card-${event.id}`}
      aria-label={`${event.title} by ${event.organizer}`}
      className={`animate-fade-in-up ${delayClass} group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(37,99,235,0.35)]`}
      style={{ minHeight: "260px" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 transition-all duration-500 group-hover:opacity-90"
        style={{ background: event.gradient }}
        aria-hidden="true"
      />

      {/* Glossy sheen overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Inner glow on hover */}
      <div
        className="absolute inset-[1px] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 30px rgba(255,255,255,0.08)` }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5 min-h-[260px]">
        {/* Top row: category badge + date */}
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/60 uppercase tracking-wider bg-black/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
            <span aria-hidden="true">{icon}</span>
            {event.category}
          </span>
          <time
            className="text-[10px] font-medium text-white/50 whitespace-nowrap pt-1"
            dateTime={event.date}
          >
            {event.date}
          </time>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: event name + organizer */}
        <div>
          <h3
            className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-1 tracking-tight group-hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)] transition-all duration-300"
            style={{ fontFamily: "var(--font-agrandir), sans-serif" }}
          >
            {event.title}
          </h3>
          <p className="text-xs font-medium text-white/55 leading-snug">
            by {event.organizer}
          </p>

          {/* Arrow on hover */}
          <div className="mt-3 flex items-center gap-1 text-white/0 group-hover:text-white/60 transition-all duration-300">
            <span className="text-xs font-medium">View details</span>
            <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
