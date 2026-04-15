import { gradientText, brandGradient } from "@/lib/styles";

const studentFeatures = [
  { title: "Smart Event Feed", desc: "Personalised events based on your interests and clubs." },
  { title: "One-Tap RSVP", desc: "Register for events instantly — no forms, no friction." },
  { title: "QR Ticket", desc: "Your ticket lives in the app. Scan at the gate and you're in." },
  { title: "Campus Calendar", desc: "Never miss an event with the unified campus schedule." },
  { title: "Event Reminders", desc: "Get notified before events you've registered for." },
  { title: "Event History", desc: "Track everything you've attended and discovered." },
];

const organiserFeatures = [
  { title: "Event Creation Wizard", desc: "Set up an event in under 5 minutes — categories, tickets, timing." },
  { title: "Live Dashboard", desc: "Real-time attendee count, check-in stats and revenue." },
  { title: "QR Check-in System", desc: "Fraud-proof, app-based entry scanning for your team." },
  { title: "Ticketing & RSVP", desc: "Sell paid tickets or collect free RSVPs with one toggle." },
  { title: "Analytics Reports", desc: "Post-event insights — attendance rates, peak times, feedback." },
  { title: "Promotions", desc: "Boost your event on the Unifesto discovery feed." },
];

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200">
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative bg-black py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Features</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Built for everyone<br />
            <span style={gradientText}>on campus.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Students */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: brandGradient }}>
                <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white">For Students</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studentFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>

          {/* Organisers */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: brandGradient }}>
                <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white">For Organisers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {organiserFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
