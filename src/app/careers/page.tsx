import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Careers — Unifesto",
  description: "Join our mission to transform campus events. Explore open positions at Unifesto.",
};

const openings = [
  {
    id: "fullstack-engineer",
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Build scalable features for our event management platform using Next.js, React, and Node.js.",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Design intuitive experiences for students and event organizers across web and mobile platforms.",
  },
  {
    id: "marketing-lead",
    title: "Marketing Lead",
    department: "Marketing",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Drive growth and brand awareness across college campuses through creative campaigns.",
  },
  {
    id: "campus-ambassador",
    title: "Campus Ambassador",
    department: "Community",
    location: "On Campus",
    type: "Part-time",
    description: "Represent Unifesto at your campus, onboard organizations, and grow the community.",
  },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Move Fast",
    description: "We ship quickly, iterate constantly, and learn from every launch.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Student First",
    description: "Every decision we make prioritizes the student experience.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Think Big",
    description: "We're building the future of campus events, not just another app.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Learn Always",
    description: "We embrace curiosity, experimentation, and continuous growth.",
  },
];

const perks = [
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), 
    title: "Competitive Salary", 
    description: "Market-rate compensation with equity options" 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ), 
    title: "Remote Friendly", 
    description: "Work from anywhere or our office spaces" 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ), 
    title: "Flexible Time Off", 
    description: "Unlimited PTO and flexible working hours" 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ), 
    title: "Learning Budget", 
    description: "Annual budget for courses, books, and conferences" 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ), 
    title: "Health Coverage", 
    description: "Comprehensive health insurance for you and family" 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ), 
    title: "Growth Opportunities", 
    description: "Fast-track your career in a high-growth startup" 
  },
];

export default function CareersPage() {
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
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Careers at Unifesto</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Build the future of<br />
            <span style={gradientText}>campus events.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Join a passionate team on a mission to transform how students discover, attend, and organize events across college campuses.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
            style={{ background: brandGradient }}
          >
            View Open Positions
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Our Values</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              What drives us forward
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              These principles guide everything we do, from product decisions to how we work together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(52, 145, 255, 0.1)", color: "#3491ff" }}
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="relative py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Benefits & Perks</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              We take care of our team
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              Competitive benefits and a supportive environment to help you do your best work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(52, 145, 255, 0.1)", color: "#3491ff" }}
                >
                  {perk.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="relative py-20 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>Open Positions</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Join our team
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              We're always looking for talented people who share our passion for transforming campus events.
            </p>
          </div>

          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@unifesto.app?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)] whitespace-nowrap"
                    style={{ background: brandGradient }}
                  >
                    Apply Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No perfect fit CTA */}
          <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-center">
            <h3 className="text-xl font-bold text-white mb-3">Don't see a perfect fit?</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-xl mx-auto">
              We're always interested in meeting talented people. Send us your resume and tell us how you'd like to contribute.
            </p>
            <a
              href="mailto:careers@unifesto.app?subject=General Application"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              style={gradientText}
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
