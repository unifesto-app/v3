import { gradientText, brandGradient } from "@/lib/styles";

const testimonials = [
  {
    quote: "We managed 300+ registrations for Hack League without a single spreadsheet. The QR check-in was flawless.",
    name: "Arjun Sharma",
    role: "Lead Organiser, GDGon Campus MRUH",
    type: "organiser",
  },
  {
    quote: "I found out about ESummit through Unifesto. Registered in literally one tap. This is how campus events should work.",
    name: "Priya Reddy",
    role: "Final Year, CSE — MRUH",
    type: "student",
  },
  {
    quote: "The analytics after WDS 2026 were incredible. We knew exactly how many people attended each committee session.",
    name: "Neha Kaushal",
    role: "Secretary General, MUN Club MRUH",
    type: "organiser",
  },
  {
    quote: "Stopped missing events I actually care about. The feed just shows what's relevant to me.",
    name: "Vikram Naidu",
    role: "Second Year, ECE — MRUH",
    type: "student",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-black py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Loved by students &<br />
            <span style={gradientText}>trusted by organisers.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex flex-col gap-4"
            >
              {/* Quote mark */}
              <div className="text-3xl font-serif leading-none" style={gradientText}>&ldquo;</div>
              <p className="text-sm text-slate-300 leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 mt-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
                  style={{ background: brandGradient }}
                >
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <span
                  className="ml-auto text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide text-black"
                  style={{ background: brandGradient }}
                >
                  {t.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
