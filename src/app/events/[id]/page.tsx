"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getEventById, getAllEvents, getEventsByOrgTree, getSubEvents, getParentEvent, getAllCollaborators } from "@/lib/mockEvents";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ id: string }>;
}

type TabType = "overview" | "discussion" | "sponsors" | "contact" | "faq";

export default function EventDetailPage({ params }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [eventId, setEventId] = useState<string>("");
  const [event, setEvent] = useState<any>(null);
  
  // Load event data
  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      const eventData = getEventById(id);
      if (!eventData) {
        notFound();
      }
      setEvent(eventData);
    });
  }, [params]);

  if (!event) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  const isCompleted = event.status.includes("completed") || event.status.includes("past");
  const isFree = event.price === 0;
  const isLowSpots = event.spotsLeft > 0 && event.spotsLeft <= 30;
  const spotsPercent = Math.round((event.spotsLeft / event.totalSpots) * 100);

  // Get sub-events if this is a parent event
  const subEvents = event.isParentEvent ? getSubEvents(event.id) : [];
  
  // Get parent event if this is a sub-event
  const parentEvent = event.parentEventId ? getParentEvent(event.id) : undefined;
  
  // Get all collaborators
  const collaborators = getAllCollaborators(event);
  const hasCollaborators = collaborators.length > 1;

  // Events from same org/sub-orgs (exclude current and sub-events)
  const subEventIds = new Set(subEvents.map(e => e.id));
  const orgEvents = getEventsByOrgTree(event.org.id)
    .filter((e) => e.id !== event.id && !subEventIds.has(e.id))
    .slice(0, 3);

  // Related events (same category, exclude current, org events, and sub-events)
  const orgEventIds = new Set(orgEvents.map(e => e.id));
  const related = getAllEvents()
    .filter((e) => e.id !== event.id && e.category === event.category && !orgEventIds.has(e.id) && !subEventIds.has(e.id))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden pb-24 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-20 min-h-[450px] md:min-h-[550px] flex items-end pb-8 px-6 overflow-hidden"
        style={{ background: event.posterGradient }}
      >
        {/* Gradient overlay to blend into page */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)" }}
          aria-hidden="true"
        />
        {/* Sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs text-white/50">
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <span>/</span>
            <span className="text-white/70">{event.category}</span>
          </div>
          {/* Category + tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm border border-white/10">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">{event.title}</h1>
          <p className="text-sm text-white/60">{event.organizer} · {event.college}</p>
        </div>
      </section>

      {/* Urgency bar */}
      {!isCompleted && (
        <div className="border-b border-white/5 bg-black">
          <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center gap-4 text-xs">
            {isLowSpots && (
              <span className="font-semibold text-slate-400 flex items-center gap-1">
                Only {event.spotsLeft} spots left
              </span>
            )}
            {!isLowSpots && event.spotsLeft > 0 && (
              <span className="text-slate-500">{event.spotsLeft} of {event.totalSpots} spots remaining</span>
            )}
            {event.spotsLeft > 0 && (
              <div className="flex-1 max-w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${100 - spotsPercent}%`, background: brandGradient }} />
              </div>
            )}
            <span className="text-slate-500 ml-auto">Closes: {event.registrationDeadline}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Parent Event Link */}
            {parentEvent && (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Part of</p>
                <Link href={`/events/${parentEvent.id}`} className="flex items-center gap-3 group">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-white/80 transition-colors">{parentEvent.title}</p>
                    <p className="text-xs text-slate-500">{parentEvent.date}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Collaborators */}
            {hasCollaborators && (
              <section>
                <h2 className="text-lg font-bold text-white mb-4">Organized By</h2>
                <div className="flex flex-wrap gap-3">
                  {collaborators.map((collab: any) => (
                    <Link
                      key={collab.id}
                      href={`/org/${collab.id}`}
                      className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-black" style={{ background: brandGradient }}>
                        {collab.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors">{collab.name}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex gap-1 overflow-x-auto">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "discussion", label: "Discussion" },
                  { id: "sponsors", label: "Sponsors & Partners" },
                  { id: "contact", label: "Contact" },
                  { id: "faq", label: "FAQs" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "text-white border-b-2"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                    style={activeTab === tab.id ? { borderColor: "#3491ff" } : {}}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-10">
                  {/* About */}
                  <section>
                    <h2 className="text-lg font-bold text-white mb-3">About This Event</h2>
                    <div className="text-sm text-slate-400 leading-relaxed space-y-3">
                      {event.description.split("\n\n").map((para: string, i: number) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </section>

                  {/* Sub-events */}
                  {subEvents.length > 0 && (
                    <section>
                      <h2 className="text-lg font-bold text-white mb-4">Sub-Events ({subEvents.length})</h2>
                      <div className="grid grid-cols-1 gap-4">
                  {subEvents.map((subEvent) => (
                    <Link
                      key={subEvent.id}
                      href={`/events/${subEvent.id}`}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                              {subEvent.time}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-black" style={{ background: brandGradient }}>
                              {subEvent.category}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-white/80 transition-colors mb-1">{subEvent.title}</h3>
                          <p className="text-xs text-slate-500 mb-2">{subEvent.organizer}</p>
                          <p className="text-xs text-slate-400 line-clamp-2">{subEvent.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {subEvent.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              {subEvent.attendees} attended
                            </span>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                      ))}
                    </div>
                  </section>
                  )}

                  {/* Schedule */}
                  {event.schedule.length > 0 && (
                    <section>
                      <h2 className="text-lg font-bold text-white mb-4">Agenda</h2>
                      <div className="flex flex-col gap-0">
                        {event.schedule.map((item: any, i: number) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
                                style={{ background: i === 0 ? brandGradient : "rgba(255,255,255,0.15)" }}
                              />
                              {i < event.schedule.length - 1 && <div className="w-px flex-1 bg-white/5 my-1" />}
                            </div>
                            <div className="pb-4">
                              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{item.time}</p>
                              <p className="text-sm font-medium text-white">{item.title}</p>
                              {item.speaker && <p className="text-xs text-slate-500 mt-0.5">{item.speaker}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Discussion Tab */}
              {activeTab === "discussion" && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-white/5">
                      <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Discussion Coming Soon</h3>
                    <p className="text-sm text-slate-500">
                      Connect with other attendees and ask questions about the event.
                    </p>
                  </div>
                </div>
              )}

              {/* Sponsors & Partners Tab */}
              {activeTab === "sponsors" && (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-lg font-bold text-white mb-4">Event Sponsors</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { name: "Tech Corp", type: "Title Sponsor" },
                        { name: "Innovation Labs", type: "Gold Sponsor" },
                        { name: "Digital Solutions", type: "Silver Sponsor" },
                      ].map((sponsor) => (
                        <div key={sponsor.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center hover:bg-white/[0.04] transition-all">
                          <div className="w-16 h-16 rounded-lg mx-auto mb-3 flex items-center justify-center text-lg font-bold text-black" style={{ background: brandGradient }}>
                            {sponsor.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <p className="text-sm font-semibold text-white mb-1">{sponsor.name}</p>
                          <p className="text-xs text-slate-500">{sponsor.type}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold text-white mb-4">Community Partners</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Developer Community",
                        "Student Tech Club",
                        "Innovation Hub",
                        "Startup Network",
                      ].map((partner) => (
                        <div key={partner} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center hover:bg-white/[0.04] transition-all">
                          <p className="text-sm font-medium text-white">{partner}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-lg font-bold text-white mb-4">Contact Organizers</h2>
                    <div className="space-y-4">
                      {[
                        { name: "Event Coordinator", email: "events@unifesto.com", phone: "+91 98765 43210" },
                        { name: "Technical Support", email: "support@unifesto.com", phone: "+91 98765 43211" },
                      ].map((contact) => (
                        <div key={contact.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                          <h3 className="text-base font-bold text-white mb-3">{contact.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <a href={`mailto:${contact.email}`} className="text-slate-300 hover:text-white transition-colors">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <a href={`tel:${contact.phone}`} className="text-slate-300 hover:text-white transition-colors">
                                {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
                  {[
                    {
                      q: "What should I bring to the event?",
                      a: "Please bring a valid ID, your registration confirmation (QR code), and any materials mentioned in the event description."
                    },
                    {
                      q: "Is parking available?",
                      a: "Yes, free parking is available at the venue. Please arrive early as spaces are limited."
                    },
                    {
                      q: "Can I get a refund if I can't attend?",
                      a: "Refunds are available up to 48 hours before the event. Please contact the organizers for refund requests."
                    },
                    {
                      q: "Will food be provided?",
                      a: "Light refreshments will be provided. Lunch is included for full-day events."
                    },
                    {
                      q: "Is the event accessible?",
                      a: "Yes, the venue is wheelchair accessible and has facilities for attendees with special needs."
                    },
                  ].map((faq, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Register card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="text-2xl font-black text-white">
                    {isFree ? "Free" : `₹${event.price}`}
                  </p>
                </div>
                {isCompleted ? (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 text-slate-500 border border-white/5">
                    Event Completed
                  </span>
                ) : event.spotsLeft === 0 ? (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
                    Sold Out
                  </span>
                ) : null}
              </div>
              {!isCompleted && event.spotsLeft > 0 ? (
                <Link
                  href={`/events/${event.id}/register`}
                  className="block w-full text-center rounded-full py-3 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                  style={{ background: brandGradient }}
                >
                  {isFree ? "Register Now — Free" : `Register — ₹${event.price}`}
                </Link>
              ) : (
                <p className="text-xs text-center text-slate-600">Thank you for your interest in this event.</p>
              )}
              <p className="text-[10px] text-center text-slate-600">Registration closes: {event.registrationDeadline}</p>
            </div>

            {/* Event info */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 flex flex-col gap-3 text-xs">
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest">Event Information</h3>
              {[
                { label: "Organizer", value: event.organizer, href: `/org/${event.org.id}` },
                { label: "Event Type", value: event.eventType === "inPerson" ? "In Person" : event.eventType, href: null },
                { label: "Location", value: event.location, href: null },
                { label: "Date", value: event.date, href: null },
                { label: "Time", value: event.time, href: null },
                { label: "Category", value: event.category, href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <p className="text-slate-600 uppercase tracking-wider text-[9px] font-semibold">{label}</p>
                  {href ? (
                    <Link href={href} className="text-slate-300 hover:text-white text-xs flex items-center gap-1 group transition-colors duration-200">
                      {value}
                      <svg className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <p className="text-slate-300 text-xs">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Events from same organization */}
        {orgEvents.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">More from {event.organizer}</h2>
              <Link href={`/org/${event.org.id}`} className="text-xs font-medium" style={gradientText}>
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {orgEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          </div>
        )}

        {/* Related events */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/5">
            <h2 className="text-lg font-bold text-white mb-6">More {event.category} Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA (mobile) */}
      {!isCompleted && event.spotsLeft > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">{event.title}</p>
            <p className="text-sm font-bold text-white">{isFree ? "Free" : `₹${event.price}`}</p>
          </div>
          <Link
            href={`/events/${event.id}/register`}
            className="rounded-full px-6 py-2.5 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
            style={{ background: brandGradient }}
          >
            {isFree ? "Register Free" : "Register"}
          </Link>
        </div>
      )}

      <Footer />
    </main>
  );
}
