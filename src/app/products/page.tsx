import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Products & Features — Unifesto",
  description: "Explore Unifesto's platform features and standalone products for campus event management.",
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

// Standalone Products
const products = [
  {
    id: "qr-checkin",
    title: "QR Check-in App",
    description: "Streamlined event entry management with real-time QR code scanning and attendance tracking",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
      </svg>
    ),
    capabilities: [
      { title: "Instant QR Scanning", desc: "Lightning-fast QR code recognition for quick entry" },
      { title: "Real-time Tracking", desc: "Live attendance dashboard with entry timestamps" },
      { title: "Offline Mode", desc: "Works without internet, syncs when connected" },
      { title: "Duplicate Prevention", desc: "Automatic detection of duplicate entries" },
      { title: "Multi-gate Support", desc: "Multiple scanners for large events" },
      { title: "Live Dashboard Sync", desc: "Instant updates to organizer dashboard" },
    ],
    status: "active",
    platforms: ["Web App"],
  },
  {
    id: "certificate",
    title: "Certificate Generation & Verification",
    description: "Automated certificate creation and secure verification system for event participants",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    capabilities: [
      { title: "Bulk Generation", desc: "Create hundreds of certificates in seconds" },
      { title: "Custom Templates", desc: "Design your own certificate layouts" },
      { title: "QR Verification", desc: "Each certificate has a unique QR code" },
      { title: "Digital Signatures", desc: "Cryptographically signed certificates" },
      { title: "Email Delivery", desc: "Automatic email distribution to recipients" },
      { title: "Tamper-proof", desc: "Secure records that can't be altered" },
    ],
    status: "coming-soon",
    platforms: ["Web App"],
  },
  {
    id: "event-app",
    title: "Event App for Attendees",
    description: "Comprehensive event companion app with schedules, networking, and real-time updates",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    capabilities: [
      { title: "Event Schedules", desc: "Complete agenda with session timings" },
      { title: "Speaker Profiles", desc: "Detailed bios and social links" },
      { title: "Interactive Maps", desc: "Navigate venue with digital maps" },
      { title: "Live Notifications", desc: "Real-time updates and announcements" },
      { title: "Networking", desc: "Connect with other attendees" },
      { title: "Session Feedback", desc: "Rate and review sessions instantly" },
    ],
    status: "coming-soon",
    platforms: ["Web App", "PWA"],
  },
  {
    id: "mobile-apps",
    title: "Android & iOS App for Discovery",
    description: "Native mobile apps for discovering and managing campus events on the go",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    capabilities: [
      { title: "Browse Events", desc: "Discover all campus events in one place" },
      { title: "Personalized Feed", desc: "AI-powered event recommendations" },
      { title: "One-tap RSVP", desc: "Register for events instantly" },
      { title: "Push Notifications", desc: "Never miss event reminders" },
      { title: "Offline Access", desc: "View saved events without internet" },
      { title: "Calendar Sync", desc: "Add events to your phone calendar" },
    ],
    status: "coming-soon",
    platforms: ["Android", "iOS"],
  },
];
  {
    id: "mobile-apps",
    title: "Android & iOS App for Discovery",
    description: "Native mobile apps for discovering and managing campus events on the go",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      { title: "Browse Events", desc: "Discover all campus events in one place" },
      { title: "Personalized Feed", desc: "AI-powered event recommendations" },
      { title: "One-tap RSVP", desc: "Register for events instantly" },
      { title: "Push Notifications", desc: "Never miss event reminders" },
      { title: "Offline Access", desc: "View saved events without internet" },
      { title: "Calendar Sync", desc: "Add events to your phone calendar" },
    ],
    status: "coming-soon",
    platforms: ["Android", "iOS"],
  },
];

export default function ProductsPage() {
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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Products & Features</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Built for the<br />
            <span style={gradientText}>modern campus.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Core platform features and standalone products to discover, manage, and experience campus events seamlessly.
          </p>
        </div>
      </section>

      {/* Platform Features Section Header */}
      <section className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Platform Features</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Everything you need,<br />
            <span style={gradientText}>built into the platform.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Core capabilities available to all users on the Unifesto platform.
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
                  style={{ background: feature.status === "active" ? "rgba(52, 145, 255, 0.1)" : "rgba(100, 100, 100, 0.1)" }}
                >
                  <div style={{ color: feature.status === "active" ? "#3491ff" : "#64748b" }}>
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
                        <p className="text-sm font-semibold text-slate-900">Rahul Verma</p>
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
                        style={{ background: feature.status === "active" ? brandGradient : "rgba(100, 100, 100, 0.2)" }}
                      >
                        <svg
                          className="w-4 h-4"
                          style={{ color: feature.status === "active" ? "#000" : "#64748b" }}
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

                {/* CTA for active features */}
                {feature.status === "active" && (
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
                )}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* Standalone Products Section Header */}
      <section className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Standalone Products</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
            Specialized tools for<br />
            <span style={gradientText}>specific needs.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Dedicated apps and tools that extend the platform's capabilities.
          </p>
        </div>
      </section>

      {/* Standalone Products */}
      {products.map((product, index) => (
        <section
          key={product.id}
          id={product.id}
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
                  style={{ background: product.status === "active" ? "rgba(52, 145, 255, 0.1)" : "rgba(100, 100, 100, 0.1)" }}
                >
                  <div style={{ color: product.status === "active" ? "#3491ff" : "#64748b" }}>
                    {product.icon}
                  </div>
                </div>
                {product.status === "active" ? (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    AVAILABLE NOW
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    COMING SOON
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {product.title}
              </h2>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
                {product.description}
              </p>
            </div>

            {/* Two Column Layout: Visual + Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Visual Mockup Column */}
              <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                {product.id === "event-discovery" && (
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

                {product.id === "event-hosting" && (
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

                {product.id === "ticketing-rsvp" && (
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
                        <p className="text-sm font-semibold text-slate-900">Rahul Verma</p>
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

                {product.id === "analytics" && (
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

                {product.id === "qr-checkin" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm max-w-sm mx-auto">
                    {/* Mock QR Scanner Interface */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] text-slate-500">Scanning at</p>
                        <p className="text-sm font-bold text-white">Gate 1 - Main Entry</p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-black"
                        style={{ background: brandGradient }}
                      >
                        Live
                      </span>
                    </div>
                    {/* QR Scanner Area */}
                    <div className="aspect-square bg-white/5 rounded-xl mb-4 flex items-center justify-center border-2 border-dashed border-white/10">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                        </svg>
                        <p className="text-[10px] text-slate-500">Point camera at QR code</p>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Scanned", value: "289" },
                        { label: "Capacity", value: "500" },
                        { label: "Rate", value: "58%" },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/5 rounded-lg p-2.5 text-center">
                          <p className="text-base font-extrabold text-white">{s.value}</p>
                          <p className="text-[9px] text-slate-500">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.id === "certificate" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                    {/* Mock Certificate Preview */}
                    <div className="bg-white rounded-xl p-6 mb-4">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 rounded-full mx-auto mb-3" style={{ background: brandGradient }} />
                        <p className="text-xs text-slate-600 font-semibold">CERTIFICATE OF PARTICIPATION</p>
                      </div>
                      <div className="border-t border-slate-200 pt-4 mb-4">
                        <p className="text-sm text-slate-800 text-center mb-2">This certifies that</p>
                        <p className="text-lg font-bold text-slate-900 text-center mb-2">Priya Sharma</p>
                        <p className="text-xs text-slate-600 text-center">has successfully participated in</p>
                        <p className="text-sm font-semibold text-slate-800 text-center mt-2">Hack League 2024</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-200">
                        <div className="w-12 h-12 bg-slate-200 rounded" />
                        <p className="text-[10px] text-slate-500">QR Code</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">Auto-generated with unique QR verification</p>
                  </div>
                )}

                {product.id === "event-app" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                    {/* Mock Event App Interface */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base font-bold text-white">ESummit 2026</p>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          LIVE NOW
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { time: "10:00 AM", title: "Opening Keynote", speaker: "Dr. Rajesh Kumar", status: "completed" },
                          { time: "11:30 AM", title: "Panel Discussion", speaker: "Industry Leaders", status: "live" },
                          { time: "02:00 PM", title: "Startup Pitches", speaker: "Selected Teams", status: "upcoming" },
                        ].map((session) => (
                          <div key={session.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                            <div className="text-xs font-semibold text-slate-400 w-16 flex-shrink-0">{session.time}</div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white mb-0.5">{session.title}</p>
                              <p className="text-xs text-slate-500">{session.speaker}</p>
                            </div>
                            {session.status === "live" && (
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {product.id === "mobile-apps" && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Android */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 11.03 1 14.22 1 17.8h22c0-3.58-1.92-6.77-5.4-8.32zM8.06 15.2c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zm7.88 0c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-white text-center mb-1">Android</p>
                      <p className="text-xs text-slate-500 text-center">Google Play Store</p>
                    </div>
                    {/* iOS */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-white text-center mb-1">iOS</p>
                      <p className="text-xs text-slate-500 text-center">Apple App Store</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Features Column */}
              <div className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                {/* Capabilities List */}
                <div className="flex flex-col gap-4 mb-8">
                  {product.capabilities.map((capability) => (
                    <div
                      key={capability.title}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ background: product.status === "active" ? brandGradient : "rgba(100, 100, 100, 0.2)" }}
                      >
                        <svg
                          className="w-4 h-4"
                          style={{ color: product.status === "active" ? "#000" : "#64748b" }}
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
                    {product.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="text-xs font-medium text-slate-300 px-3 py-1.5 rounded-full bg-white/5 border border-white/5"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA for active products */}
                {product.status === "active" && (
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
                )}
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
