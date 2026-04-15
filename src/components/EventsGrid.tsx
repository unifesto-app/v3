"use client";

import { useState, useMemo } from "react";
import EventCard from "./EventCard";
import { gradientText, brandGradient } from "@/lib/styles";
import { filterEvents, STATUS_TABS } from "@/lib/mockEvents";

export default function EventsGrid() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const events = useMemo(
    () => filterEvents({ query, status }),
    [query, status]
  );

  const preview = events.slice(0, 6);

  return (
    <section id="events" aria-labelledby="events-heading" className="relative bg-black py-20 md:py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(52,145,255,0.06) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={gradientText}>
              What&apos;s Happening
            </p>
            <h2 id="events-heading" className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Explore Events{" "}
              <span className="text-lg md:text-xl font-medium" style={gradientText}>
                at Malla Reddy University
              </span>
            </h2>
          </div>
          <a
            href="/events"
            className="text-xs font-semibold transition-all duration-200 group flex items-center gap-1 whitespace-nowrap"
            style={gradientText}
          >
            View all events
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </a>
        </div>

        {/* Quick search + tabs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="events-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Quick search..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
            />
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200"
                style={status === tab.key ? { background: brandGradient, color: "#000" } : { color: "#64748b" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid — show max 6 */}
        {preview.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {preview.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-white/5 rounded-2xl">
            <p className="text-slate-500 text-sm">No events match your search.</p>
            <button
              onClick={() => { setQuery(""); setStatus("all"); }}
              className="mt-3 text-xs font-medium transition-colors duration-200 hover:text-white"
              style={gradientText}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            id="view-all-events"
            href="/events"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_24px_rgba(52,145,255,0.4)] hover:-translate-y-0.5"
            style={{ background: brandGradient }}
          >
            View all {status === "all" ? "" : status} events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
