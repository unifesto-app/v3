"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getEventBySlug, type Event } from "@/lib/api/events";
import { getOrganizationEvents } from "@/lib/api/organizations";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ slug: string }>;
}

type TabType = "overview" | "agenda" | "speakers" | "rewards" | "sponsors" | "faq" | "contact";

export default function EventDetailPage({ params }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [eventSlug, setEventSlug] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [orgEvents, setOrgEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  
  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      const { slug } = await params;
      setEventSlug(slug);
      setLoading(true);
      
      const eventData = await getEventBySlug(slug);
      if (!eventData) {
        notFound();
      }
      setEvent(eventData);
      
      // Load other events from the same organization
      if (eventData.organization_id) {
        const { events } = await getOrganizationEvents(eventData.organization_id, 1, 6);
        // Filter out current event
        setOrgEvents(events.filter((e: Event) => e.slug !== slug));
      }
      
      setLoading(false);
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
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3491ff]"></div>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  // Format date and time
  const eventDate = new Date(event.start_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const location = event.venue || event.city || event.state || 'Online';
  const organizerName = event.organization?.name || 'Organizer';
  const imageUrl = event.banner_url || event.thumbnail_url || event.image_url;
  const isCompleted = event.status === 'completed' || event.status === 'cancelled';
  const isFree = event.is_free;

  // Generate poster gradient
  const generatePosterGradient = (id: string) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };
  
  const posterGradient = generatePosterGradient(event.id);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden pb-24 md:pb-0">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-20 min-h-[450px] md:min-h-[550px] flex items-end pb-8 px-6 overflow-hidden"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: posterGradient }}
      >
        {/* Gradient overlay to blend into page */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/60 to-transparent"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs text-white/50">
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <span>/</span>
            <span className="text-white/70">{event.category || 'Event'}</span>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags?.map((tag: string) => (
              <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm border border-white/10">
                {tag}
              </span>
            ))}
            {event.is_trending && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                Trending
              </span>
            )}
            {event.is_featured && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">{event.title}</h1>
          <p className="text-sm text-white/60">{organizerName}</p>
        </div>
      </section>

      {/* Event Info Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex gap-1 overflow-x-auto">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "faq", label: "FAQs" },
                  { id: "contact", label: "Contact" },
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
                      {event.description ? (
                        event.description.split("\n\n").map((para: string, i: number) => (
                          <p key={i}>{para}</p>
                        ))
                      ) : (
                        <p>No description available.</p>
                      )}
                    </div>
                  </section>

                  {/* Event Details */}
                  <section>
                    <h2 className="text-lg font-bold text-white mb-4">Event Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-white">Date & Time</p>
                          <p className="text-sm text-slate-400">{formattedDate}</p>
                          <p className="text-sm text-slate-400">{formattedTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-white">Location</p>
                          <p className="text-sm text-slate-400">{location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-white">Price</p>
                          <p className="text-sm text-slate-400">{isFree ? "Free" : `${event.currency || '₹'}${event.price}`}</p>
                        </div>
                      </div>
                      {event.max_attendees && (
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-white">Capacity</p>
                            <p className="text-sm text-slate-400">{event.max_attendees} attendees</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Download App CTA */}
                  <section>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: brandGradient }}>
                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Register for this Event</h3>
                      <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
                        Download the Unifesto mobile app to register for events, connect with attendees, and get real-time updates.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                          style={{ background: brandGradient }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          App Store
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                          style={{ background: brandGradient }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                          </svg>
                          Play Store
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {[
                      {
                        q: "What should I bring to the event?",
                        a: "Please bring a valid ID and your registration confirmation. Additional requirements will be mentioned in your registration email."
                      },
                      {
                        q: "How do I register for this event?",
                        a: "Download the Unifesto mobile app from the App Store or Play Store to register for events."
                      },
                      {
                        q: "Can I get a refund if I can't attend?",
                        a: "Refund policies vary by event. Please check the event details or contact the organizers."
                      },
                      {
                        q: "Will certificates be provided?",
                        a: "Certificate availability depends on the event. Check the event description or contact organizers for details."
                      },
                    ].map((faq, i) => (
                      <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <section>
                    <h2 className="text-lg font-bold text-white mb-4">Contact Organizers</h2>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                        <h3 className="text-base font-bold text-white mb-3">{organizerName}</h3>
                        <p className="text-sm text-slate-400 mb-4">
                          For questions about this event, please contact the organizers through the Unifesto mobile app.
                        </p>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
                          style={{ background: brandGradient }}
                        >
                          Open in App
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Event Info Card */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-bold text-white mb-4">Event Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Date</p>
                    <p className="text-white font-semibold">{formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Time</p>
                    <p className="text-white font-semibold">{formattedTime}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Location</p>
                    <p className="text-white font-semibold">{location}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Price</p>
                    <p className="text-white font-semibold">{isFree ? "Free" : `${event.currency || '₹'}${event.price}`}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Status</p>
                    <p className="text-white font-semibold capitalize">{event.status}</p>
                  </div>
                </div>
              </div>

              {/* Organizer Card */}
              {event.organization && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-white mb-4">Organized By</h3>
                  <Link href={`/org/${event.organization.slug || event.organization_id}`} className="block group">
                    <div className="flex items-center gap-3">
                      {event.organization.logo_url ? (
                        <img src={event.organization.logo_url} alt={organizerName} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-black"
                          style={{ background: brandGradient }}
                        >
                          {organizerName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors truncate">{organizerName}</p>
                        <p className="text-xs text-slate-500">View Profile →</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* More Events */}
              {orgEvents.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-white mb-4">More from {organizerName}</h3>
                  <div className="space-y-3">
                    {orgEvents.slice(0, 3).map((e) => (
                      <Link key={e.id} href={`/events/${e.slug}`} className="block group">
                        <div className="flex gap-3">
                          <div
                            className="w-16 h-16 rounded-lg flex-shrink-0"
                            style={e.thumbnail_url || e.image_url ? { backgroundImage: `url(${e.thumbnail_url || e.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: generatePosterGradient(e.id) }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-2 mb-1">{e.title}</p>
                            <p className="text-xs text-slate-500">{new Date(e.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
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
