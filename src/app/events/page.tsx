"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";
import { filterEvents, ALL_CATEGORIES, STATUS_TABS, DATE_FILTERS, PRICE_FILTERS } from "@/lib/mockEvents";
import { brandGradient, gradientText } from "@/lib/styles";

function EventsContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "All");
  const [status, setStatus] = useState(searchParams.get("status") ?? "all");
  const [price, setPrice] = useState<"all" | "free" | "paid">("all");
  const [dateRange, setDateRange] = useState<"all" | "today" | "week" | "upcoming">("all");

  const events = useMemo(
    () => filterEvents({ query, category, status, price, dateRange }),
    [query, category, status, price, dateRange]
  );

  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setStatus("all");
    setPrice("all");
    setDateRange("all");
  };

  const hasFilters = query || category !== "All" || status !== "all" || price !== "all" || dateRange !== "all";

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-28 pb-10 px-6 border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% -20%, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={gradientText}>Campus Events</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            Discover Events
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-lg">
            All events at Malla Reddy University — search, filter, and register in seconds.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search + Status tabs */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="events-page-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, organizers..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors duration-200"
            />
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 overflow-x-auto">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200"
                style={status === tab.key ? { background: brandGradient, color: "#000" } : { color: "#64748b" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-5 border-b border-white/5">
          {/* Category */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider mr-1">Category</span>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200"
                style={
                  category === cat
                    ? { background: brandGradient, color: "#000", borderColor: "transparent" }
                    : { background: "transparent", color: "#64748b", borderColor: "rgba(255,255,255,0.08)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider mr-1">Date</span>
            {DATE_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setDateRange(f.key as typeof dateRange)}
                className="rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200"
                style={
                  dateRange === f.key
                    ? { background: brandGradient, color: "#000", borderColor: "transparent" }
                    : { background: "transparent", color: "#64748b", borderColor: "rgba(255,255,255,0.08)" }
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider mr-1">Price</span>
            {PRICE_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setPrice(f.key as typeof price)}
                className="rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200"
                style={
                  price === f.key
                    ? { background: brandGradient, color: "#000", borderColor: "transparent" }
                    : { background: "transparent", color: "#64748b", borderColor: "rgba(255,255,255,0.08)" }
                }
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Clear all */}
          {hasFilters && (
            <button onClick={clearAll} className="text-xs font-medium text-slate-500 hover:text-white transition-colors duration-200 ml-auto">
              Clear all ×
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-600 mb-5">
          {events.length === 0 ? "No events" : `${events.length} event${events.length !== 1 ? "s" : ""}`}{hasFilters ? " matching your filters" : " total"}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.length > 0
            ? events.map((event, i) => <EventCard key={event.id} event={event} index={i} />)
            : <EmptyState onClear={clearAll} onCategory={(cat) => { setQuery(""); setStatus("all"); setPrice("all"); setDateRange("all"); setCategory(cat); }} />
          }
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <EventsContent />
    </Suspense>
  );
}
