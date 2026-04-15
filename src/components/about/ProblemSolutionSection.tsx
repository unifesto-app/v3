import { gradientText, brandGradient } from "@/lib/styles";

const problems = [
  "Events announced in chaotic WhatsApp groups",
  "No centralized campus calendar",
  "Organisers lose track of RSVPs on spreadsheets",
  "Students miss events they would have loved",
  "Check-in is manual, slow & fraud-prone",
];

const solutions = [
  "One platform for all campus events",
  "Discover by category, date or trending",
  "Organisers get a live dashboard + check-in tool",
  "Smart feed shows students what's relevant to them",
  "QR-based check-in — instant, verified, digital",
];

export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="relative bg-black py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Why Unifesto</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Campus events are broken.<br />
            <span style={gradientText}>We fixed them.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-slate-500" />
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500">The Problem</p>
            </div>
            <ul className="flex flex-col gap-4">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm text-slate-400">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: brandGradient }} />
              <p className="text-xs font-bold tracking-widest uppercase" style={gradientText}>Unifesto&apos;s Solution</p>
            </div>
            <ul className="flex flex-col gap-4">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#3491ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
