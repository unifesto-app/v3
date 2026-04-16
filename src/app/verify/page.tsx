"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gradientText, brandGradient } from "@/lib/styles";

const verificationTypes = [
  {
    id: "employee",
    title: "Employee Verification",
    description: "Verify employment credentials for Unifesto Private Limited employees only",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    href: "/verify/employee",
    features: ["Unifesto employees only", "QR code verification", "Instant authentication", "Secure credentials"],
    accessMethod: "Scan QR code on Unifesto employee ID card",
    status: "active",
  },
  {
    id: "certificate",
    title: "Certificate Verification",
    description: "Authenticate event participation certificates and achievement credentials",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    href: "/verify/certificate",
    features: ["Certificate authenticity", "Event participation", "Achievement records", "Digital credentials"],
    accessMethod: "Scan QR code on certificate or enter certificate ID",
    status: "active",
  },
  {
    id: "ticket",
    title: "Ticket Verification",
    description: "Validate event tickets and entry passes for authenticity and usage status",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    href: "/verify/ticket",
    features: ["Real-time validation", "Duplicate detection", "Entry status tracking", "Event details"],
    accessMethod: "Scan QR code on event ticket",
    status: "coming-soon",
  },
];

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Secure Verification System</p>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Verify Credentials<br />
            <span style={gradientText}>Instantly & Securely</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Authenticate employee credentials and event certificates with our secure verification system. 
            Trusted by organizations across campus.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {[
              { value: "10K+", label: "Verifications" },
              { value: "99.9%", label: "Accuracy" },
              { value: "<2s", label: "Avg. Time" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs text-slate-500 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Types */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up animate-delay-100">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
              Choose verification type
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              What would you like to verify?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {verificationTypes.map((type, index) => (
              <div
                key={type.id}
                className={`relative block animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6">
                  {/* Status Badge */}
                  {type.status === "coming-soon" && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        COMING SOON
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: type.status === "active" ? "rgba(52, 145, 255, 0.1)" : "rgba(100, 100, 100, 0.1)" }}
                  >
                    <div style={{ color: type.status === "active" ? "#3491ff" : "#64748b" }}>
                      {type.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-5">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-slate-500">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: type.status === "active" ? "#3491ff" : "#64748b" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Access Method */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                      </svg>
                      <div>
                        <p className="text-[10px] font-medium text-slate-300 mb-0.5">Access Method</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          {type.accessMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 animate-fade-in-up">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
              Simple & Secure
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              How verification works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {[
              {
                step: "01",
                title: "Enter Details",
                description: "Provide the verification ID or upload the credential document",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Instant Check",
                description: "Our system validates against secure records in real-time",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive detailed verification report with authenticity proof",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`relative flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 group animate-fade-in-up`}
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                  style={{ background: brandGradient }}
                >
                  <span className="text-black">{item.icon}</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600 mb-2">{item.step}</span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
