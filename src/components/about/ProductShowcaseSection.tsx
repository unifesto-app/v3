import { gradientText, brandGradient } from "@/lib/styles";

const screens = [
  {
    label: "Event Discovery",
    desc: "Browse, filter and find events in seconds.",
    mockup: (
      <div className="bg-black/40 rounded-xl p-4 space-y-3">
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-2">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-xs text-slate-600">Search events…</span>
        </div>
        {/* Filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {["All", "Trending", "Hackathon", "Cultural"].map((t, i) => (
            <span key={t} className={`text-[10px] font-semibold rounded-full px-2.5 py-1 ${i === 0 ? "text-black" : "text-slate-500 border border-white/5"}`} style={i === 0 ? { background: brandGradient } : {}}>{t}</span>
          ))}
        </div>
        {/* Cards */}
        {["ESummit'26", "Hack League"].map((title) => (
          <div key={title} className="rounded-xl p-3 text-right" style={{ background: brandGradient }}>
            <p className="text-[10px] text-black/60 font-medium">April 2026</p>
            <p className="text-sm font-black text-black mt-6">{title}</p>
            <p className="text-[10px] text-black/50">by IE Cell MRUH</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Organiser Dashboard",
    desc: "Manage everything from one live dashboard.",
    mockup: (
      <div className="bg-black/40 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-white">Hack League 2026</p>
          <span className="text-[10px] font-bold text-black rounded-full px-2 py-0.5" style={{ background: brandGradient }}>Live</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["312", "Registered"], ["289", "Checked in"], ["₹0", "Revenue"]].map(([v, l]) => (
            <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-sm font-black text-white">{v}</p>
              <p className="text-[9px] text-slate-500">{l}</p>
            </div>
          ))}
        </div>
        <div className="h-16 bg-white/5 rounded-lg flex items-end gap-1 px-3 pb-2">
          {[30, 55, 40, 70, 90, 60, 85].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: brandGradient, opacity: 0.6 + i * 0.06 }} />
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2.5">
          <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">QR Check-in Active</p>
            <p className="text-[9px] text-slate-500">Gate 1 & Gate 2</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "QR Ticket",
    desc: "Your ticket is generated instantly on register.",
    mockup: (
      <div className="bg-black/40 rounded-xl p-5 flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-bold text-white">ESummit&apos;26</p>
        <p className="text-[10px] text-slate-500">Innovation & Entrepreneurship Cell</p>
        {/* QR placeholder */}
        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
          <div className="grid grid-cols-5 gap-0.5 p-1">
            {[1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1].map((v, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-sm ${v ? "bg-black" : "bg-white"}`} />
            ))}
          </div>
        </div>
        <span className="text-[10px] font-bold text-black rounded-full px-3 py-1" style={{ background: brandGradient }}>Scan at Gate</span>
        <p className="text-[9px] text-slate-600">16 March 2026 · Auditorium, Block 3</p>
      </div>
    ),
  },
];

export default function ProductShowcaseSection() {
  return (
    <section id="product-showcase" className="relative bg-black py-20 md:py-28 px-6 overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: brandGradient }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>The Product</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Clean, fast,<br />
            <span style={gradientText}>purpose-built.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mt-4">
            Every screen is designed to get you from intention to action in under a second.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screens.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1">
              {s.mockup}
              <div className="mt-4 px-1">
                <p className="text-sm font-bold text-white">{s.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
