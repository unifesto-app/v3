import type { EventData } from "./EventsGrid";
import { brandGradient } from "@/lib/styles";

interface EventCardProps {
  event: EventData;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
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
      className={`animate-fade-in-up ${delayClass} group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_64px_rgba(37,99,235,0.4)]`}
      style={{ minHeight: "260px" }}
    >
      {/* Brand gradient background */}
      <div
        className="absolute inset-0 transition-all duration-500 group-hover:brightness-110"
        style={{ background: brandGradient }}
        aria-hidden="true"
      />

      {/* Glossy sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5 min-h-[260px]">
        {/* Top: date */}
        <div className="flex justify-end">
          <time
            className="text-xs font-semibold text-black/70 bg-black/10 rounded-full px-3 py-1 backdrop-blur-sm"
            dateTime={event.date}
          >
            {event.date}
          </time>
        </div>

        {/* Bottom: title + organizer + arrow */}
        <div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-black leading-tight tracking-tight group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300">
                {event.title}
              </h3>
              <p className="text-xs font-semibold text-black/60 mt-1 leading-snug">
                by {event.organizer}
              </p>
            </div>
            {/* Arrow */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-black/50 group-hover:text-black/80 group-hover:bg-black/15 transition-all duration-300 group-hover:translate-x-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
