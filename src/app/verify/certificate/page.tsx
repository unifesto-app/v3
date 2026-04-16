"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gradientText, brandGradient } from "@/lib/styles";

type VerificationStep = "input" | "verifying" | "result";

interface CertificateResult {
  status: "verified" | "not-found" | "revoked";
  certificateId?: string;
  recipientName?: string;
  eventName?: string;
  eventDate?: string;
  organization?: string;
  certificateType?: string;
  issuedDate?: string;
  validUntil?: string;
  achievements?: string[];
  verifiedAt?: string;
}

export default function CertificateVerificationPage() {
  const [step, setStep] = useState<VerificationStep>("input");
  const [certificateId, setCertificateId] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [result, setResult] = useState<CertificateResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("verifying");

    // Simulate API call
    setTimeout(() => {
      // Mock verification result
      const mockResult: CertificateResult = {
        status: "verified",
        certificateId: certificateId || "CERT-2024-HKL-5678",
        recipientName: "Priya Sharma",
        eventName: "Hack League 2024",
        eventDate: "March 15-17, 2024",
        organization: "Malla Reddy University - Tech Club",
        certificateType: "Participation Certificate",
        issuedDate: "March 20, 2024",
        validUntil: "Lifetime",
        achievements: [
          "Successfully completed 48-hour hackathon",
          "Built AI-powered campus navigation system",
          "Presented project to industry judges",
        ],
        verifiedAt: new Date().toLocaleString(),
      };
      setResult(mockResult);
      setStep("result");
    }, 2500);
  };

  const handleReset = () => {
    setStep("input");
    setCertificateId("");
    setUploadedFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Certificate Verification</p>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Verify Event<br />
            <span style={gradientText}>Certificates</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Authenticate participation certificates and achievement credentials issued for campus events
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-12 animate-fade-in-up animate-delay-100">
            {[
              { id: "input", label: "Upload/Enter ID" },
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

          {/* Input Form */}
          {step === "input" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 animate-fade-in-up animate-delay-200">
              <h2 className="text-xl font-bold text-white mb-2">Certificate Information</h2>
              <p className="text-sm text-slate-400 mb-6">Enter certificate ID or upload the certificate document</p>

              <form onSubmit={handleVerify} className="space-y-6">
                {/* Certificate ID Input */}
                <div>
                  <label htmlFor="certificateId" className="block text-sm font-medium text-slate-300 mb-2">
                    Certificate ID
                  </label>
                  <input
                    type="text"
                    id="certificateId"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g., CERT-2024-HKL-5678"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#3491ff] focus:ring-1 focus:ring-[#3491ff] transition-all"
                    required={!uploadedFile}
                  />
                  <p className="text-xs text-slate-500 mt-2">Find this ID on the bottom of your certificate</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-black text-slate-500">OR</span>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Upload Certificate
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-[#3491ff]/50 hover:bg-white/[0.02] transition-all duration-300 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                        style={{ background: uploadedFile ? brandGradient : "rgba(52, 145, 255, 0.1)" }}
                      >
                        <svg
                          className="w-6 h-6"
                          style={{ color: uploadedFile ? "#000" : "#3491ff" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      {uploadedFile ? (
                        <div>
                          <p className="text-sm font-medium text-white mb-1">{uploadedFile.name}</p>
                          <p className="text-xs text-slate-500">Click to change file</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-white mb-1">Click to upload certificate</p>
                          <p className="text-xs text-slate-500">PDF, JPG, or PNG (max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!certificateId && !uploadedFile}
                  className="w-full py-3 rounded-xl font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: brandGradient }}
                >
                  Verify Certificate
                </button>
              </form>

              <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-blue-300 mb-1">Instant Verification</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We use secure technology to verify certificates in real-time. Your document is not stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verifying State */}
          {step === "verifying" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-12 text-center animate-fade-in-up">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verifying Certificate</h3>
              <p className="text-sm text-slate-400 mb-4">Checking authenticity...</p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-[#3491ff] animate-pulse" />
                <span>Scanning document metadata</span>
              </div>
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
                    : result.status === "revoked"
                    ? "border-yellow-500/20 bg-yellow-500/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    result.status === "verified"
                      ? "bg-green-500/10"
                      : result.status === "revoked"
                      ? "bg-yellow-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {result.status === "verified" ? (
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : result.status === "revoked" ? (
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    result.status === "verified"
                      ? "text-green-400"
                      : result.status === "revoked"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {result.status === "verified"
                    ? "Certificate Verified"
                    : result.status === "revoked"
                    ? "Certificate Revoked"
                    : "Certificate Not Found"}
                </h3>
                <p className="text-sm text-slate-400">
                  {result.status === "verified"
                    ? "This certificate is authentic and valid"
                    : result.status === "revoked"
                    ? "This certificate has been revoked by the issuer"
                    : "Unable to find this certificate in our records"}
                </p>
              </div>

              {/* Details Card */}
              {result.status === "verified" && (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
                    <h3 className="text-lg font-bold text-white mb-6">Certificate Details</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Certificate ID", value: result.certificateId },
                        { label: "Recipient Name", value: result.recipientName },
                        { label: "Event Name", value: result.eventName },
                        { label: "Event Date", value: result.eventDate },
                        { label: "Issued By", value: result.organization },
                        { label: "Certificate Type", value: result.certificateType },
                        { label: "Issue Date", value: result.issuedDate },
                        { label: "Valid Until", value: result.validUntil },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                          <span className="text-sm text-slate-400">{item.label}</span>
                          <span className="text-sm font-medium text-white text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {result.achievements && result.achievements.length > 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
                      <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
                      <ul className="space-y-3">
                        {result.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: brandGradient }}>
                              <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-slate-300 leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Verification Info */}
                  <div className="rounded-xl bg-white/5 border border-white/5 p-4">
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
                </>
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
