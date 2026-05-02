import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Platform Features — Unifesto",
  description: "Discover Unifesto's core platform features: Event Discovery, Event Hosting, Ticketing & RSVP, and Analytics. Everything you need for campus events.",
  keywords: ["event discovery", "event hosting", "ticketing system", "event analytics", "campus event features", "rsvp management"],
  openGraph: {
    title: "Platform Features — Unifesto",
    description: "Discover Unifesto's core platform features for seamless campus event management.",
    type: "website",
    url: "https://www.unifesto.app/features",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Features — Unifesto",
    description: "Discover Unifesto's core platform features for seamless campus event management.",
    site: "@unifestoapp",
  },
};

// Core Platform Features
const features = [
  {
    id: "event-discovery",
    title: "Event Discovery",
    description: "Discover all campus events in one unified feed with smart filters and personalized recommendations",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    capabilities: [
      { title: "Unified Feed", desc: "All campus events in one place, no more scattered WhatsApp groups" },
      { title: "Smart Filters", desc: "Filter by category, date, location, and organizer" },
      { title: "Personalized Recommendations", desc: "AI-powered suggestions based on your interests" },
      { title: "Trending Events", desc: "See what's popular on campus right now" },
      { title: "Search & Browse", desc: "Find events by name, keyword, or organization" },
      { title: "Save for Later", desc: "Bookmark events and get reminders" },
    ],
    status: "active",
    platforms: ["Web App", "PWA"],
  },
  {
    id: "event-hosting",
    title: "Event Hosting",
    description: "Create and manage events with a powerful dashboard built for campus organizers",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    capabilities: [
      { title: "Quick Event Creation", desc: "Go live in under 5 minutes with simple forms" },
      { title: "Custom Branding", desc: "Add banners, logos, and custom descriptions" },
      { title: "Capacity Management", desc: "Set limits and enable waitlists automatically" },
      { title: "Multi-organizer Support", desc: "Collaborate with team members on events" },
      { title: "Event Templates", desc: "Reuse settings for recurring events" },
      { title: "Instant Publishing", desc: "Events go live immediately on the discovery feed" },
    ],
    status: "active",
    platforms: ["Web App"],
  },
  {
    id: "ticketing-rsvp",
    title: "Ticketing & RSVP",
    description: "Flexible registration system supporting free RSVPs, paid tickets, and QR-based entry",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    capabilities: [
      { title: "Free RSVP", desc: "No-cost registration for open events" },
      { title: "Paid Ticketing", desc: "Integrated payment gateway for paid events" },
      { title: "QR Tickets", desc: "Unique QR codes generated for each registration" },
      { title: "Email Delivery", desc: "Automatic ticket delivery to attendee inbox" },
      { title: "Waitlist Management", desc: "Auto-promote from waitlist when spots open" },
      { title: "Registration Forms", desc: "Collect custom information from attendees" },
    ],
    status: "active",
    platforms: ["Web App"],
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description: "Real-time insights and detailed reports to measure event success and attendee engagement",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    capabilities: [
      { title: "Real-time Dashboard", desc: "Live attendance tracking and registration metrics" },
      { title: "Attendance Reports", desc: "Detailed check-in data with timestamps" },
      { title: "Registration Analytics", desc: "Track sign-ups, drop-offs, and conversion rates" },
      { title: "Demographic Insights", desc: "Understand your audience composition" },
      { title: "Export Data", desc: "Download reports in CSV and PDF formats" },
      { title: "Historical Trends", desc: "Compare performance across multiple events" },
    ],
    status: "active",
    platforms: ["Web App"],
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Platform Features</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Everything you need,<br />
            <span style={gradientText}>built into the platform.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Core capabilities available to all users on the Unifesto platform for discovering, managing, and experiencing campus events.
          </p>
        </div>
      </section>

      {/* Platform Features */}
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={feature.id}
          className="relative py-20 md:py-28 px-6 scroll-mt-24"
        >
          {/* Background pattern for alternating sections */}
          {index % 2 === 1 && (
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
              aria-hidden="true"
            />
          )}

          {/* Ambient glow */}
          {index % 2 === 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(52,145,255,0.05) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
          )}

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(52, 145, 255, 0.1)" }}
                >
                  <div style={{ color: "#3491ff" }}>
                    {feature.icon}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  PLATFORM FEATURE
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {feature.title}
              </h2>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
                {feature.description}
              </p>
            </div>

            {/* Two Column Layout: Visual + Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Visual Mockup Column */}
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                {feature.id === "event-discovery" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                    {/* Mock Discovery Feed */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base font-bold text-white">Discover Events</p>
                        <div className="flex gap-2">
                          <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/5 text-slate-400">
                            Hackathons
                          </span>
                          <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/5 text-slate-400">
                            Tech
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: "Hack League 2026", org: "Tech Club", attendees: "312", trending: true },
                          { title: "ESummit 2026", org: "E-Cell", attendees: "450", trending: true },
                          { title: "Cultural Fest", org: "Arts Society", attendees: "890", trending: false },
                        ].map((event) => (
                          <div key={event.title} className="p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-white mb-0.5">{event.title}</p>
                                <p className="text-xs text-slate-500">{event.org}</p>
                              </div>
                              {event.trending && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                  TRENDING
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.attendees} registered</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {feature.id === "event-hosting" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                    {/* Mock Event Creation Form */}
                    <div className="mb-4">
                      <p className="text-base font-bold text-white mb-4">Create New Event</p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1.5">Event Name</p>
                          <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                            <p className="text-sm text-white">Hack League 2026</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-500 mb-1.5">Date</p>
                            <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                              <p className="text-xs text-white">Apr 25, 2026</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1.5">Capacity</p>
                            <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
                              <p className="text-xs text-white">500</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1.5">Category</p>
                          <div className="flex gap-2">
                            <span className="text-xs font-medium px-3 py-1.5 rounded-full text-black" style={{ background: brandGradient }}>
                              Hackathon
                            </span>
                            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-slate-400">
                              Tech
                            </span>
                          </div>
                        </div>
                        <button
                          className="w-full rounded-lg py-2.5 text-sm font-semibold text-black"
                          style={{ background: brandGradient }}
                        >
                          Publish Event
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {feature.id === "ticketing-rsvp" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                    {/* Mock Ticket */}
                    <div className="bg-gradient-to-br from-white to-slate-100 rounded-xl p-5 mb-3">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-600 font-semibold mb-1">YOUR TICKET</p>
                          <p className="text-lg font-bold text-slate-900">Hack League 2026</p>
                          <p className="text-xs text-slate-600 mt-1">April 25, 2026 • 10:00 AM</p>
                        </div>
                        <div className="w-10 h-10 rounded-full" style={{ background: brandGradient }} />
                      </div>
                      <div className="border-t border-slate-300 pt-3 mb-3">
                        <p className="text-xs text-slate-600 mb-1">Attendee</p>
                        <p className="text-sm font-semibold text-slate-900">Tej Reddy</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-300">
                        <div className="w-16 h-16 bg-slate-200 rounded-lg" />
                        <div>
                          <p className="text-[10px] text-slate-600 font-semibold">SCAN AT ENTRY</p>
                          <p className="text-[9px] text-slate-500">ID: #UNI2026-1234</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">Delivered via email instantly</p>
                  </div>
                )}

                {feature.id === "analytics" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                    {/* Mock Analytics Dashboard */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base font-bold text-white">Event Analytics</p>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-black" style={{ background: brandGradient }}>
                          Live
                        </span>
                      </div>
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                          { label: "Registrations", value: "312", change: "+24%" },
                          { label: "Check-ins", value: "289", change: "93%" },
                          { label: "Capacity", value: "500", change: "58%" },
                          { label: "Revenue", value: "₹0", change: "Free" },
                        ].map((metric) => (
                          <div key={metric.label} className="bg-white/5 rounded-lg p-3">
                            <p className="text-xs text-slate-500 mb-1">{metric.label}</p>
                            <p className="text-lg font-extrabold text-white">{metric.value}</p>
                            <p className="text-[10px] text-green-400">{metric.change}</p>
                          </div>
                        ))}
                      </div>
                      {/* Mock Chart */}
                      <div className="bg-white/5 rounded-lg p-3 h-24 flex items-end gap-1">
                        {[40, 65, 45, 80, 70, 90, 75, 95].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t"
                            style={{ 
                              height: `${height}%`,
                              background: i === 7 ? brandGradient : "rgba(100, 100, 100, 0.3)"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Capabilities Column */}
              <div className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                {/* Capabilities List */}
                <div className="flex flex-col gap-4 mb-8">
                  {feature.capabilities.map((capability) => (
                    <div
                      key={capability.title}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ background: brandGradient }}
                      >
                        <svg
                          className="w-4 h-4"
                          style={{ color: "#000" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">{capability.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{capability.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Platform Info */}
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="flex flex-wrap gap-2">
                    {feature.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="text-xs font-medium text-slate-300 px-3 py-1.5 rounded-full bg-white/5 border border-white/5"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <a
                    href="/host"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                    style={{ background: brandGradient }}
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="relative py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
            Ready to transform your<br />campus events?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
            Join universities and organizations already using Unifesto to create better event experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/host"
              className="rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
              style={{ background: brandGradient }}
            >
              Start Hosting Events
            </a>
            <a
              href="/events"
              className="rounded-full px-7 py-3 text-sm font-semibold border border-white/10 text-slate-300 hover:text-white transition-all duration-300"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
