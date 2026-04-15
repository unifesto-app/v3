"use client";

import { gradientText, brandGradient } from "@/lib/styles";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: "Go live in under 5 minutes",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    text: "Ticketing, RSVP & QR check-in built-in",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    text: "Real-time analytics & attendance reports",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "Reach 10,000+ students instantly",
  },
];

export default function OrganizerPitchSection() {
  return (
    <section id="host" aria-labelledby="organizer-heading" className="relative bg-black py-20 md:py-28 px-6 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: brandGradient }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
              For organizers
            </p>
            <h2 id="organizer-heading" className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Host events that<br />
              <span style={gradientText}>actually get attended.</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Stop chasing RSVPs on WhatsApp groups. Unifesto gives every organizer a single command center to create, promote, and manage events on campus.
            </p>

            {/* Feature bullets */}
            <ul className="flex flex-col gap-3 mb-10">
              {features.map((f) => (
                <li key={f.text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-black"
                    style={{ background: brandGradient }}
                  >
                    {f.icon}
                  </div>
                  <span className="text-sm text-slate-300">{f.text}</span>
                </li>
              ))}
            </ul>

            <a
              id="organizer-start-hosting"
              href="/host"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
              style={{ background: brandGradient, color: "black" }}
            >
              Start Hosting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: visual card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-slate-500">Your event</p>
                  <p className="text-base font-bold text-white">Hack League 2026</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full text-black"
                  style={{ background: brandGradient }}
                >
                  Live
                </span>
              </div>
              {/* Mock stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Registered", value: "312" },
                  { label: "Check-ins", value: "289" },
                  { label: "Revenue", value: "₹0" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-white">{s.value}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Mock QR block */}
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">QR Check-in Active</p>
                  <p className="text-[10px] text-slate-500">Scanning at Gate 1 & Gate 2</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
