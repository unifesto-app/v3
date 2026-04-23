"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brandGradient, gradientText } from "@/lib/styles";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile after 3 seconds
    const timer = setTimeout(() => {
      router.push("/profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <section className="relative bg-black pt-28 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md mx-auto text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: brandGradient }}>
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-extrabold text-white mb-4">
              Welcome to <span style={gradientText}>Unifesto!</span>
            </h1>
            
            <p className="text-slate-400 text-base mb-6 leading-relaxed">
              Your account has been created successfully. Please check your email to verify your account.
            </p>

            {/* Email Verification Notice */}
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="text-left">
                  <p className="text-sm font-semibold text-blue-400 mb-1">Verification Email Sent</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Click the link in your email to verify your account and unlock all features.
                  </p>
                </div>
              </div>
            </div>

            {/* Redirect Notice */}
            <p className="text-sm text-slate-500">
              Redirecting to your profile in a few seconds...
            </p>

            {/* Manual Navigation */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <button
                onClick={() => router.push("/profile")}
                className="text-sm font-semibold transition-colors"
                style={gradientText}
              >
                Go to Profile Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
