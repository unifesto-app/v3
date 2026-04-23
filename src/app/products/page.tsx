import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Products & Features — Unifesto",
  description: "Explore Unifesto's standalone products and platform features for campus event management. QR check-in, certificates, analytics, and more.",
  keywords: ["unifesto products", "event management tools", "qr check-in", "event certificates", "event analytics", "campus event software"],
  openGraph: {
    title: "Products & Features — Unifesto",
    description: "Explore Unifesto's standalone products and platform features for campus event management.",
    type: "website",
    url: "https://www.unifesto.app/products",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products & Features — Unifesto",
    description: "Explore Unifesto's standalone products and platform features for campus event management.",
    site: "@unifestoapp",
  },
};

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
    id: "face-checkin",
    title: "MxA.ai — Face Check-in",
    description: "AI-powered facial recognition for instant, contactless event entry without QR codes or tickets",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    capabilities: [
      { title: "Instant Recognition", desc: "Check-in in under 1 second with face scan" },
      { title: "Fraud Prevention", desc: "No ticket sharing or duplicate entries" },
      { title: "Contactless Entry", desc: "No apps, no QR codes, just walk in" },
      { title: "Real-time Verification", desc: "Accurate face matching at entry points" },
      { title: "Privacy First", desc: "Encrypted face signatures, not raw images" },
      { title: "Large Event Ready", desc: "Handles high-volume entry efficiently" },
    ],
    status: "coming-soon",
    platforms: ["Web App", "Android", "iOS"],
    externalLink: "https://mxa.ai",
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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Standalone Products</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Specialized tools for<br />
            <span style={gradientText}>specific needs.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Dedicated apps and tools that extend the platform's capabilities for campus event management.
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
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(52,145,255,0.05) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

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

                {product.id === "face-checkin" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm max-w-sm mx-auto">
                    {/* Mock Face Check-in Interface */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] text-slate-500">Face Check-In</p>
                        <p className="text-sm font-bold text-white">Tech Summit 2026</p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-black"
                        style={{ background: brandGradient }}
                      >
                        Active
                      </span>
                    </div>
                    {/* Face Scanner Area */}
                    <div className="aspect-[4/3] bg-black rounded-xl mb-4 flex items-center justify-center border border-white/10 relative overflow-hidden">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: "linear-gradient(rgba(52,145,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(52,145,255,0.5) 1px, transparent 1px)",
                          backgroundSize: "20px 20px"
                        }} />
                      </div>
                      {/* Face detection frame */}
                      <div className="relative w-32 h-40">
                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-blue-400 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-blue-400 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-blue-400 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-blue-400 rounded-br-lg" />
                        {/* Face icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Status indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-full px-4 py-2 border border-blue-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[10px] font-semibold text-white">Ready to Scan</span>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Checked In", value: "156" },
                        { label: "Match Rate", value: "98.7%" },
                        { label: "Avg Time", value: "0.8s" },
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
                        <div className="w-12 h-12 rounded border-2 border-slate-300 flex items-center justify-center">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                          </svg>
                        </div>
                        <p className="text-[10px] text-slate-500">QR Code</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">Auto-generated with unique QR verification</p>
                  </div>
                )}

                {product.id === "event-app" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm max-w-sm mx-auto">
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
                    <div className="rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 11.03 1 14.22 1 17.8h22c0-3.58-1.92-6.77-5.4-8.32zM8.06 15.2c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zm7.88 0c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-white text-center mb-1">Android</p>
                      <p className="text-xs text-slate-500 text-center">Google Play Store</p>
                    </div>
                    {/* iOS */}
                    <div className="rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
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
                      href={product.externalLink || "/host"}
                      className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                      style={{ background: brandGradient }}
                      {...(product.externalLink && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {product.externalLink ? "Learn More" : "Get Started"}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* CTA for coming-soon products with external link */}
                {product.status === "coming-soon" && product.externalLink && (
                  <div>
                    <a
                      href={product.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                      style={{ 
                        background: "rgba(52, 145, 255, 0.1)",
                        color: "#3491ff",
                        border: "1px solid rgba(52, 145, 255, 0.2)"
                      }}
                    >
                      Preview Landing Page
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
