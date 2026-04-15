import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getEventById, getAllEvents } from "@/lib/mockEvents";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllEvents().map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Event Not Found — Unifesto" };
  return {
    title: `${event.title} — Unifesto`,
    description: event.description.split("\n")[0],
  };
}



export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  const isCompleted = event.status.includes("completed") || event.status.includes("past");
  const isFree = event.price === 0;
  const isLowSpots = event.spotsLeft > 0 && event.spotsLeft <= 30;
  const spotsPercent = Math.round((event.spotsLeft / event.totalSpots) * 100);

  // Related events (same category, exclude current)
  const related = getAllEvents()
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden pb-24 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-20 min-h-[340px] md:min-h-[400px] flex items-end pb-8 px-6 overflow-hidden"
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
            {event.tags.map((tag) => (
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

            {/* About */}
            <section id="overview">
              <h2 className="text-lg font-bold text-white mb-3">About This Event</h2>
              <div className="text-sm text-slate-400 leading-relaxed space-y-3">
                {event.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Schedule */}
            {event.schedule.length > 0 && (
              <section id="agenda">
                <h2 className="text-lg font-bold text-white mb-4">Agenda</h2>
                <div className="flex flex-col gap-0">
                  {event.schedule.map((item, i) => (
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
                <button
                  className="w-full rounded-full py-3 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                  style={{ background: brandGradient }}
                >
                  {isFree ? "Register Now — Free" : `Register — ₹${event.price}`}
                </button>
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
          <button
            className="rounded-full px-6 py-2.5 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
            style={{ background: brandGradient }}
          >
            {isFree ? "Register Free" : "Register"}
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
