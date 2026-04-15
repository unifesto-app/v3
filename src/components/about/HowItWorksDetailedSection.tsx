import { gradientText, brandGradient } from "@/lib/styles";

const studentFlow = [
  {
    step: "01",
    title: "Browse the feed",
    desc: "Open Unifesto and see a personalised list of events happening at your campus — filtered by what you care about.",
  },
  {
    step: "02",
    title: "Tap Discover",
    desc: "Filter by category (Hackathon, Cultural, MUN…), status (Trending, Upcoming) or search by name or organiser.",
  },
  {
    step: "03",
    title: "Register instantly",
    desc: "Hit Register or RSVP. No account needed for free events. Your QR ticket is generated on the spot.",
  },
  {
    step: "04",
    title: "Show up & scan",
    desc: "Walk to the gate, show your QR code, and the organiser scans it. You're in — verified and logged.",
  },
];

const organiserFlow = [
  {
    step: "01",
    title: "Create your event",
    desc: "Fill in the basics — name, date, venue, category. Add a banner image and description.",
  },
  {
    step: "02",
    title: "Set up ticketing",
    desc: "Choose free RSVP or paid tickets. Set capacity limits and enable waitlisting.",
  },
  {
    step: "03",
    title: "Go live & promote",
    desc: "Publish your event. It goes live on the Unifesto discovery feed for students at your campus.",
  },
  {
    step: "04",
    title: "Check in on the day",
    desc: "Use the Unifesto check-in scanner at the gate. Real-time dashboard shows attendance as it happens.",
  },
];

function FlowColumn({ title, subtitle, steps, color }: {
  title: string;
  subtitle: string;
  steps: typeof studentFlow;
  color: string;
}) {
  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{subtitle}</span>
        <h3 className="text-xl md:text-2xl font-extrabold text-white mt-1">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {steps.map((s, i) => (
          <div key={s.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black text-black"
                style={{ background: brandGradient }}
              >
                {s.step}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-white/5 my-1" />}
            </div>
            <div className="pb-4">
              <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksDetailedSection() {
  return (
    <section id="how-it-works-detail" className="relative bg-black py-20 md:py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>How It Works</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Two flows,<br />
            <span style={gradientText}>one platform.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mt-4">
            Whether you&apos;re attending or organising, Unifesto makes every step seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <FlowColumn
            title="For Students"
            subtitle="Attendee flow"
            steps={studentFlow}
            color="#60a5fa"
          />
          <div className="hidden lg:block w-px bg-white/5" />
          <FlowColumn
            title="For Organisers"
            subtitle="Organiser flow"
            steps={organiserFlow}
            color="#3491ff"
          />
        </div>
      </div>
    </section>
  );
}
