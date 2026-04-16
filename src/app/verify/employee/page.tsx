"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gradientText, brandGradient } from "@/lib/styles";

type VerificationStep = "input" | "verifying" | "result";

interface VerificationResult {
  status: "verified" | "not-found" | "expired";
  employeeName?: string;
  employeeId?: string;
  organization?: string;
  role?: string;
  department?: string;
  joinDate?: string;
  status_text?: string;
  verifiedAt?: string;
}

export default function EmployeeVerificationPage() {
  const searchParams = useSearchParams();
  const empidFromQR = searchParams.get("empid");
  
  const [step, setStep] = useState<VerificationStep>(empidFromQR ? "verifying" : "input");
  const [result, setResult] = useState<VerificationResult | null>(null);

  // Auto-verify when QR code is scanned (empid in URL)
  useEffect(() => {
    if (empidFromQR && step === "verifying") {
      // Simulate API call
      setTimeout(() => {
        // Mock verification result based on QR code
        const mockResult: VerificationResult = {
          status: "verified",
          employeeName: "Rajesh Kumar",
          employeeId: empidFromQR,
          organization: "Malla Reddy University",
          role: "Event Coordinator",
          department: "Student Affairs",
          joinDate: "January 15, 2024",
          status_text: "Active",
          verifiedAt: new Date().toLocaleString(),
        };
        setResult(mockResult);
        setStep("result");
      }, 2000);
    }
  }, [empidFromQR, step]);

  const handleReset = () => {
    setStep("input");
    setResult(null);
    // Clear URL params
    window.history.replaceState({}, "", "/verify/employee");
  };

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.08) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center animate-fade-in-up">
          <Link href="/verify" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Verification
          </Link>

          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Employee Verification</p>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Verify Unifesto<br />
            <span style={gradientText}>Employee Credentials</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Authenticate employment credentials for Unifesto Private Limited employees
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up animate-delay-100">
            {[
              { id: "input", label: "Enter Details" },
              { id: "verifying", label: "Verifying" },
              { id: "result", label: "Results" },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step === s.id
                        ? "text-black shadow-[0_0_20px_rgba(52,145,255,0.4)]"
                        : ["input", "verifying", "result"].indexOf(step) > i
                        ? "bg-white/10 text-white"
                        : "bg-white/5 text-slate-600"
                    }`}
                    style={step === s.id ? { background: brandGradient } : {}}
                  >
                    {["input", "verifying", "result"].indexOf(step) > i ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 hidden md:block">{s.label}</span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-16 md:w-24 h-px mx-2 transition-all duration-300 ${
                      ["input", "verifying", "result"].indexOf(step) > i ? "bg-white/20" : "bg-white/5"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* QR Code Required Message */}
          {step === "input" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-12 text-center animate-fade-in-up animate-delay-200">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "rgba(52, 145, 255, 0.1)" }}>
                <svg className="w-10 h-10" style={{ color: "#3491ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">QR Code Required</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-8">
                Employee verification is for Unifesto Private Limited employees only. Scan the QR code on your Unifesto employee ID card to verify credentials. Manual entry is not available for security purposes.
              </p>

              <div className="space-y-4 max-w-sm mx-auto">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: brandGradient }}>
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Secure Verification</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        QR codes ensure authentic employee credentials
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: brandGradient }}>
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Instant Results</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Verification completes in under 2 seconds
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: brandGradient }}>
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Tamper-Proof</p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        All credentials are cryptographically secured
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs font-medium text-blue-300 mb-1">How to Verify</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Use your phone camera or QR scanner app to scan the QR code on your Unifesto employee ID card. You will be automatically redirected to this page with verification results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verifying State */}
          {step === "verifying" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-12 text-center animate-fade-in-up">
              {empidFromQR && (
                <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                    </svg>
                    <span className="text-sm font-semibold">QR Code Scanned</span>
                  </div>
                </div>
              )}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div
                  className="absolute inset-0 rounded-full animate-spin"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${brandGradient})`,
                  }}
                />
                <div className="absolute inset-2 rounded-full bg-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: "#3491ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verifying Credentials</h3>
              <p className="text-sm text-slate-400">Checking against secure records...</p>
              {empidFromQR && (
                <p className="text-xs text-slate-500 mt-2">Employee ID: {empidFromQR}</p>
              )}
            </div>
          )}

          {/* Result */}
          {step === "result" && result && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Status Card */}
              <div
                className={`rounded-2xl border p-8 text-center transition-all duration-300 ${
                  result.status === "verified"
                    ? "border-green-500/20 bg-green-500/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    result.status === "verified" ? "bg-green-500/10" : "bg-red-500/10"
                  }`}
                >
                  {result.status === "verified" ? (
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${result.status === "verified" ? "text-green-400" : "text-red-400"}`}>
                  {result.status === "verified" ? "Verified Successfully" : "Verification Failed"}
                </h3>
                <p className="text-sm text-slate-400">
                  {result.status === "verified"
                    ? "Employee credentials have been authenticated"
                    : "Unable to verify the provided credentials"}
                </p>
              </div>

              {/* Details Card */}
              {result.status === "verified" && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
                  <h3 className="text-lg font-bold text-white mb-6">Employee Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Full Name", value: result.employeeName },
                      { label: "Employee ID", value: result.employeeId },
                      { label: "Organization", value: result.organization },
                      { label: "Role", value: result.role },
                      { label: "Department", value: result.department },
                      { label: "Join Date", value: result.joinDate },
                      { label: "Status", value: result.status_text },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <span className="text-sm text-slate-400">{item.label}</span>
                        <span className="text-sm font-medium text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-300 mb-1">Verified Successfully</p>
                        <p className="text-xs text-slate-500">Verified at: {result.verifiedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                  style={{ background: brandGradient }}
                >
                  Verify Another
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
