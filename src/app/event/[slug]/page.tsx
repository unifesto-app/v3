"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CalendarBlank,
  Clock,
  MapPin,
  Tag,
  UsersThree,
  DeviceMobile,
  AppStoreLogo,
  GooglePlayLogo,
  Trophy,
  Medal,
  CaretRight,
  ArrowUpRight,
  Star,
} from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getEventBySlug, type Event } from "@/lib/api/events";
import { getSpaceEvents } from "@/lib/api/spaces";
import { getEventAdditionalInfo, type AgendaItem, type Speaker, type Prize, type Faq } from "@/lib/api/additional-info";
import { brandGradient } from "@/lib/styles";

interface Props {
  params: Promise<{ slug: string }>;
}

type TabType = "overview" | "agenda" | "speakers" | "rewards" | "faq" | "contact";

export default function EventDetailPage({ params }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [eventSlug, setEventSlug] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [spaceEvents, setSpaceEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  
  // Additional info state
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  
  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const { slug } = await params;
        setEventSlug(slug);
        setLoading(true);
        
        const eventData = await getEventBySlug(slug);
        if (!eventData) {
          setEvent(null);
          setLoading(false);
          return;
        }
        setEvent(eventData);
        
        // Load additional info
        try {
          const additionalInfo = await getEventAdditionalInfo(eventData.id);
          setAgenda(additionalInfo.agenda);
          setSpeakers(additionalInfo.speakers);
          setPrizes(additionalInfo.prizes);
          setFaqs(additionalInfo.faqs);
        } catch (error) {
          console.error('Error loading additional info:', error);
          // Continue without additional info
        }
        
        // Load other events from the same space
        const eventSpaceId = eventData.space_id ?? eventData.organization_id;
        if (eventSpaceId) {
          const { events } = await getSpaceEvents(eventSpaceId, 1, 6);
          // Filter out current event
          setSpaceEvents(events.filter((e: Event) => e.slug !== slug));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading event:', error);
        setEvent(null);
        setLoading(false);
      }
    };
    
    loadEvent();
  }, [params]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isDiscussionOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDiscussionOpen]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        {/* Hero skeleton mirrors the real layout so nothing jumps on load */}
        <div className="relative min-h-[420px] animate-pulse bg-white/[0.03] pt-20 md:min-h-[520px]" />
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="h-10 w-full animate-pulse rounded-lg bg-white/[0.04]" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.04]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.04]" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white/[0.04]" />
            </div>
            <div className="space-y-4 lg:col-span-1">
              <div className="h-48 w-full animate-pulse rounded-2xl bg-white/[0.04]" />
              <div className="h-28 w-full animate-pulse rounded-2xl bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="flex min-h-screen flex-col bg-black">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-6 py-20 text-center">
          <div>
            <h1 className="mb-3 text-2xl font-bold text-white">Event not found</h1>
            <p className="mb-6 text-sm text-slate-300">
              This event doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(52,145,255,0.4)]"
              style={{ background: brandGradient }}
            >
              Browse events
              <CaretRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Format date and time
  const eventDate = new Date(event.start_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const location = event.venue || event.city || event.state || 'Online';
  const eventSpace = event.space ?? event.organization;
  const organizerName = eventSpace?.name || 'Organizer';
  const imageUrl = event.banner_url || event.thumbnail_url || event.image_url;
  const isCompleted = event.status === 'completed' || event.status === 'cancelled';
  const isFree = event.is_free || !event.price;
  const currencySymbol = event.currency && event.currency !== 'INR' ? event.currency : '₹';
  const priceLabel = isFree ? 'Free' : `${currencySymbol}${(event.price ?? 0).toLocaleString('en-IN')}`;

  // On-brand fallback for missing artwork — the same blue radial the event
  // cards use, so a poster-less event still reads as part of the system.
  const posterFallback =
    "radial-gradient(120% 120% at 80% 0%, rgba(52,145,255,0.22), transparent 60%), #0a0a0d";

  return (
    <main className="min-h-screen bg-black overflow-x-hidden pb-24 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex min-h-[440px] items-end overflow-hidden px-6 pb-10 pt-24 md:min-h-[540px]"
        style={
          imageUrl
            ? { backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: posterFallback }
        }
      >
        {/* Overlay to guarantee legible text over any artwork */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-white/60">
            <Link href="/events" className="transition-colors hover:text-white">
              Events
            </Link>
            <CaretRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white/80">{event.category || "Event"}</span>
          </nav>

          {/* Badges + tags */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {event.is_trending && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-1 text-[11px] font-semibold text-amber-200">
                <Star weight="fill" className="h-3 w-3" aria-hidden="true" />
                Trending
              </span>
            )}
            {event.is_featured && (
              <span className="rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
                Featured
              </span>
            )}
            {event.tags?.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {event.title}
          </h1>
          <p className="mb-5 text-sm text-white/70">by {organizerName}</p>

          {/* Fact row: the three things a student decides on at a glance */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <CalendarBlank className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
              {location}
            </span>
            <span className="inline-flex items-center gap-2 font-semibold text-white">
              <Tag className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
              {priceLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Event Info Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Event sections">
                {[
                  { id: "overview", label: "Overview" },
                  ...(agenda.length > 0 ? [{ id: "agenda", label: "Agenda" }] : []),
                  ...(speakers.length > 0 ? [{ id: "speakers", label: "Speakers" }] : []),
                  ...(prizes.length > 0 ? [{ id: "rewards", label: "Prizes" }] : []),
                  ...(faqs.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
                  { id: "contact", label: "Contact" },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border-primary text-white"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-10">
                  {/* About */}
                  <section>
                    <h2 className="mb-3 text-lg font-bold text-white">About this event</h2>
                    <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                      {event.description ? (
                        event.description.split("\n\n").map((para: string, i: number) => (
                          <p key={i}>{para}</p>
                        ))
                      ) : (
                        <p className="text-slate-400">No description available for this event yet.</p>
                      )}
                    </div>
                  </section>

                  {/* Event Details */}
                  <section>
                    <h2 className="mb-4 text-lg font-bold text-white">Event details</h2>
                    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
                      <div className="flex items-start gap-3 bg-black/40 p-4">
                        <CalendarBlank className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <dt className="text-xs font-medium text-slate-400">Date &amp; time</dt>
                          <dd className="mt-0.5 text-sm font-semibold text-white">{formattedDate}</dd>
                          <dd className="text-sm text-slate-300">{formattedTime}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-4">
                        <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <dt className="text-xs font-medium text-slate-400">Location</dt>
                          <dd className="mt-0.5 text-sm font-semibold text-white">{location}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-4">
                        <Tag className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <dt className="text-xs font-medium text-slate-400">Price</dt>
                          <dd className="mt-0.5 text-sm font-semibold text-white">{priceLabel}</dd>
                        </div>
                      </div>
                      {event.max_attendees && (
                        <div className="flex items-start gap-3 bg-black/40 p-4">
                          <UsersThree className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                          <div>
                            <dt className="text-xs font-medium text-slate-400">Capacity</dt>
                            <dd className="mt-0.5 text-sm font-semibold text-white">
                              {event.max_attendees} attendees
                            </dd>
                          </div>
                        </div>
                      )}
                    </dl>
                  </section>
                </div>
              )}

              {/* Agenda Tab — timeline */}
              {activeTab === "agenda" && (
                <div>
                  <h2 className="mb-5 text-lg font-bold text-white">Event agenda</h2>
                  <ol className="relative space-y-5 border-l border-white/10 pl-6">
                    {agenda.map((item) => (
                      <li key={item.id} className="relative">
                        <span
                          className="absolute -left-[27px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-black"
                          aria-hidden="true"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {new Date(item.start_time).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                            {item.end_time &&
                              ` – ${new Date(item.end_time).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}`}
                          </div>
                          <h3 className="mb-1.5 text-base font-bold text-white">{item.title}</h3>
                          {item.description && (
                            <p className="mb-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <MapPin className="h-4 w-4" aria-hidden="true" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Speakers Tab */}
              {activeTab === "speakers" && (
                <div>
                  <h2 className="mb-5 text-lg font-bold text-white">Speakers &amp; guests</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {speakers.map((speaker) => (
                      <div key={speaker.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                        <div className="flex items-start gap-4">
                          {speaker.profile_image_url ? (
                            <img
                              src={speaker.profile_image_url}
                              alt={speaker.name}
                              className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold text-black"
                              style={{ background: brandGradient }}
                              aria-hidden="true"
                            >
                              {speaker.name.charAt(0)}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="mb-0.5 text-base font-bold text-white">{speaker.name}</h3>
                            {speaker.title && <p className="mb-2 text-xs text-slate-400">{speaker.title}</p>}
                            {speaker.bio && (
                              <p className="line-clamp-3 text-sm leading-relaxed text-slate-300">{speaker.bio}</p>
                            )}
                            {speaker.is_featured && (
                              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
                                <Star weight="fill" className="h-3 w-3" aria-hidden="true" />
                                Featured speaker
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prizes Tab */}
              {activeTab === "rewards" && (
                <div>
                  <h2 className="mb-5 text-lg font-bold text-white">Prizes &amp; rewards</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {prizes.map((prize) => (
                      <div
                        key={prize.id}
                        className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20">
                            {prize.position && prize.position <= 3 ? (
                              <Medal weight="fill" className="h-7 w-7 text-amber-300" aria-hidden="true" />
                            ) : (
                              <Trophy weight="fill" className="h-7 w-7 text-amber-300" aria-hidden="true" />
                            )}
                          </div>
                          <div className="flex-1">
                            {prize.position && (
                              <span className="mb-2 inline-block rounded-full bg-amber-400/20 px-2.5 py-1 text-xs font-bold text-amber-200">
                                {prize.position === 1
                                  ? "1st place"
                                  : prize.position === 2
                                    ? "2nd place"
                                    : prize.position === 3
                                      ? "3rd place"
                                      : `#${prize.position}`}
                              </span>
                            )}
                            <h3 className="mb-1.5 text-base font-bold text-white">{prize.name}</h3>
                            {prize.description && (
                              <p className="mb-2 text-sm leading-relaxed text-slate-300">{prize.description}</p>
                            )}
                            {prize.value && (
                              <p className="text-base font-semibold text-amber-300">{prize.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Tab — only rendered when faqs exist, so no fabricated fallback */}
              {activeTab === "faq" && (
                <div>
                  <h2 className="mb-5 text-lg font-bold text-white">Frequently asked questions</h2>
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                        <h3 className="mb-1.5 text-sm font-semibold text-white">{faq.question}</h3>
                        <p className="text-sm leading-relaxed text-slate-300">{faq.answer}</p>
                        {faq.category && (
                          <span className="mt-2 inline-block rounded bg-white/5 px-2 py-1 text-xs text-slate-400">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <section>
                  <h2 className="mb-4 text-lg font-bold text-white">Contact organizers</h2>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <h3 className="mb-2 text-base font-bold text-white">{organizerName}</h3>
                    <p className="mb-4 text-sm text-slate-300">
                      For questions about this event, reach the organizers through the Unifesto mobile app.
                    </p>
                    <a
                      href="https://unifesto.com/download"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
                      style={{ background: brandGradient }}
                    >
                      <DeviceMobile className="h-4 w-4" aria-hidden="true" />
                      Open in app
                    </a>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Register CTA — primary action, top of hierarchy */}
              <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-5">
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white">{priceLabel}</span>
                  {!isFree && (
                    <span className="text-xs text-slate-400">per ticket</span>
                  )}
                </div>
                <p className="mb-4 text-xs text-slate-300">
                  {isCompleted
                    ? "This event has ended."
                    : "Register in the Unifesto app to save your spot."}
                </p>
                <div className="space-y-2.5">
                  <a
                    href="https://apps.apple.com/app/unifesto"
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(52,145,255,0.4)]"
                    style={{ background: brandGradient }}
                  >
                    <AppStoreLogo weight="fill" className="h-5 w-5" aria-hidden="true" />
                    Get it on App Store
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.unifesto"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10"
                  >
                    <GooglePlayLogo weight="fill" className="h-5 w-5" aria-hidden="true" />
                    Get it on Google Play
                  </a>
                </div>
              </div>

              {/* Event Info Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="mb-4 text-sm font-bold text-white">Event information</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="mb-0.5 text-xs text-slate-400">Date</dt>
                    <dd className="font-semibold text-white">{formattedDate}</dd>
                  </div>
                  <div>
                    <dt className="mb-0.5 text-xs text-slate-400">Time</dt>
                    <dd className="font-semibold text-white">{formattedTime}</dd>
                  </div>
                  <div>
                    <dt className="mb-0.5 text-xs text-slate-400">Location</dt>
                    <dd className="font-semibold text-white">{location}</dd>
                  </div>
                  <div>
                    <dt className="mb-0.5 text-xs text-slate-400">Status</dt>
                    <dd className="font-semibold capitalize text-white">{event.status}</dd>
                  </div>
                </dl>
              </div>

              {/* Organizer Card */}
              {eventSpace && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="mb-4 text-sm font-bold text-white">Organized by</h3>
                  <Link href={`/space/${eventSpace.slug || eventSpace.id}`} className="group block">
                    <div className="flex items-center gap-3">
                      {eventSpace.logo_url ? (
                        <img
                          src={eventSpace.logo_url}
                          alt={organizerName}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold text-black"
                          style={{ background: brandGradient }}
                          aria-hidden="true"
                        >
                          {organizerName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-primary">
                          {organizerName}
                        </p>
                        <p className="inline-flex items-center gap-1 text-xs text-slate-400">
                          View profile
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* More Events */}
              {spaceEvents.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="mb-4 text-sm font-bold text-white">More from {organizerName}</h3>
                  <div className="space-y-3">
                    {spaceEvents.slice(0, 3).map((e) => (
                      <Link key={e.id} href={`/event/${e.slug || e.id}`} className="group block">
                        <div className="flex gap-3">
                          <div
                            className="h-16 w-16 flex-shrink-0 rounded-lg"
                            style={
                              e.banner_url || e.thumbnail_url || e.image_url
                                ? {
                                    backgroundImage: `url(${e.banner_url || e.thumbnail_url || e.image_url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }
                                : { background: posterFallback }
                            }
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="mb-1 line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-primary">
                              {e.title}
                            </p>
                            <p className="text-xs text-slate-400">
                              {new Date(e.start_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
