"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MockEvent } from "@/lib/mockEvents";

interface EventCardProps {
  event: MockEvent;
  index?: number;
}

import { brandGradient } from "@/lib/styles";



export default function EventCard({ event, index = 0 }: EventCardProps) {
  const router = useRouter();
  const isCompleted = event.status.includes("completed") || event.status.includes("past");
  const isFree = event.price === 0;
  const spotsPercent = Math.round((event.spotsLeft / event.totalSpots) * 100);
  const isLowSpots = event.spotsLeft > 0 && event.spotsLeft <= 30;
  const delayClass = ["", "animate-delay-100", "animate-delay-200", "animate-delay-300", "animate-delay-400"][index % 5] ?? "";

  return (
    // Outer div — NOT an <a>, avoids nested <a> violation
    <div
      id={`event-card-${event.id}`}
      role="article"
      aria-label={`${event.title} by ${event.organizer}`}
      onClick={() => router.push(`/events/${event.id}`)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(`/events/${event.id}`); }}
      tabIndex={0}
      className={`animate-fade-in-up ${delayClass} group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/10 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(37,99,235,0.2)] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
    >
      {/* Poster */}
      <div
        className="relative h-40 flex items-end p-3 overflow-hidden"
        style={{ background: event.posterGradient }}
      >
        {/* Subtle sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, transparent 60%)" }}
          aria-hidden="true"
        />

        {/* Tag badges */}
        <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1 max-w-[60%]">
          {event.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm bg-white/10 text-white border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Spots bar */}
        {!isCompleted && event.spotsLeft > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${spotsPercent}%`, background: brandGradient }}
            />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title + org */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{event.category}</p>
          <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-blue-200 transition-colors duration-200">
            {event.title}
          </h3>
          {/* Organizer — valid <a> since outer is <div>, not <a> */}
          <Link
            href={`/org/${event.org.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-slate-500 mt-0.5 hover:text-white transition-colors duration-200 truncate block"
          >
            {event.organizer}
          </Link>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{event.date} · {event.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{event.location.split(",")[0]}</span>
          </div>
        </div>

        {/* Urgency */}
        {isLowSpots && (
          <p className="text-[10px] font-semibold text-slate-400">
            Only {event.spotsLeft} spots left
          </p>
        )}

        {/* Footer: price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-sm font-bold text-white">
            {isFree ? "Free" : `₹${event.price}`}
          </span>
          {isCompleted ? (
            <span className="text-xs font-medium text-slate-600 px-3 py-1.5 rounded-full border border-white/5">
              Completed
            </span>
          ) : (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full text-black group-hover:shadow-[0_0_16px_rgba(52,145,255,0.4)] transition-all duration-300"
              style={{ background: brandGradient }}
            >
              View →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
