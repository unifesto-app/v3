"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brandGradient, gradientText } from "@/lib/styles";
import { getAllOrgs } from "@/lib/mockEvents";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    organization: "",
    rollNumber: "",
    mobile: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orgSearch, setOrgSearch] = useState("");
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  const supabase = createClient();
  const allOrgs = getAllOrgs();
  const filteredOrgs = allOrgs.filter(org => 
    org.name.toLowerCase().includes(orgSearch.toLowerCase())
  );

  // Check if Supabase is configured
  const isSupabaseConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleOrgSearch = (value: string) => {
    setOrgSearch(value);
    setFormData({ ...formData, organization: value });
    setShowOrgDropdown(true);
  };

  const selectOrg = (orgName: string) => {
    setFormData({ ...formData, organization: orgName });
    setOrgSearch(orgName);
    setShowOrgDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      setError("Authentication is not configured. Please set up Supabase environment variables.");
      setLoading(false);
      return;
    }
    
    try {
      if (mode === "signup") {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        // Sign up with Supabase
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              organization: formData.organization,
              mobile: formData.mobile,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) throw signUpError;

        setSubmitted(true);
        // Redirect to success page or show email confirmation message
        setTimeout(() => router.push("/auth/success"), 1500);
        
      } else if (mode === "login") {
        // Sign in with Supabase
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        setSubmitted(true);
        setTimeout(() => router.push("/profile"), 1500);
        
      } else {
        // Forgot password - send reset email
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          formData.email,
          {
            redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
          }
        );

        if (resetError) throw resetError;

        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setMode("login");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      organization: "",
      rollNumber: "",
      mobile: "",
    });
    setOrgSearch("");
    setError("");
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
    setSubmitted(false);
  };

  const handleGoogleSignIn = async () => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      setError("Authentication is not configured. Please set up Supabase environment variables.");
      return;
    }

    try {
      setLoading(true);
      
      // Get the current origin for redirect
      const redirectUrl = `${window.location.origin}/auth/callback`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
        throw error;
      }
      
    } catch (err: any) {
      console.error("Failed to sign in with Google:", err);
      setError(err.message || "Failed to sign in with Google");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <section className="relative bg-black pt-28 pb-20 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(52,145,255,0.08) 0%, transparent 70%)" }}
          aria-hidden="true"
        /> */}
        
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1fr] gap-8 lg:gap-16 items-center">
            
            {/* Left Column - Info/Content */}
            <div className="hidden lg:flex flex-col gap-8">
              {mode === "login" && (
                <>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                      Welcome back to<br />
                      <span style={gradientText}>Unifesto</span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      Your gateway to discovering and attending amazing campus events.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Discover Events", desc: "Find events that match your interests" },
                      { title: "Quick Registration", desc: "Register in just one tap" },
                      { title: "Digital Tickets", desc: "Get your QR ticket instantly" },
                      { title: "Track History", desc: "Keep track of all events" },
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]" style={{ background: brandGradient }}>
                          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-1">{feature.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden backdrop-blur-sm">
                    {/* <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    /> */}
                    <div
                      className="absolute top-0 left-0 w-full h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, #3491ff, transparent)" }}
                      aria-hidden="true"
                    />
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 relative z-10">Platform Stats</p>
                    <div className="grid grid-cols-4 gap-3 relative z-10">
                      {[
                        { value: "10K+", label: "Active Students" },
                        { value: "25+", label: "Events Monthly" },
                        { value: "10+", label: "Organizations" },
                        { value: "100%", label: "Free to Join" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-xl font-black text-white mb-1">{stat.value}</p>
                          <p className="text-xs text-slate-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {mode === "signup" && (
                <>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                      Join the campus<br />
                      <span style={gradientText}>event revolution</span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      Create your account and never miss an event again.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Personalized Feed", desc: "Event recommendations based on interests" },
                      { title: "Smart Reminders", desc: "Never miss an event with notifications" },
                      { title: "Connect & Network", desc: "Meet like-minded people at events" },
                      { title: "Build Your Profile", desc: "Showcase your participation history" },
                    ].map((feature) => (
                      <div key={feature.title} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]" style={{ background: brandGradient }}>
                          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-1">{feature.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden backdrop-blur-sm">
                    {/* <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    /> */}
                    <div
                      className="absolute top-0 left-0 w-full h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, #3491ff, transparent)" }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <p className="text-sm text-slate-400 italic mb-4 leading-relaxed">
                        "Unifesto made it so easy to discover events I actually care about. Best decision ever!"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: brandGradient }}>
                            PR
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Priya Reddy</p>
                            <p className="text-xs text-slate-500">Final Year, CSE</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" style={{ color: "#3491ff" }} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === "forgot" && (
                <>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                      Reset your<br />
                      <span style={gradientText}>password</span>
                    </h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                      Don't worry, it happens. We'll help you get back in.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { step: "01", title: "Enter your email", desc: "Provide your account email address" },
                      { step: "02", title: "Check your inbox", desc: "We'll send you a secure reset link" },
                      { step: "03", title: "Create new password", desc: "Click the link and set a new password" },
                      { step: "04", title: "You're back in!", desc: "Sign in with your new password" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-black flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]" style={{ background: brandGradient }}>
                          {item.step}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden backdrop-blur-sm">
                    {/* <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    /> */}
                    <div
                      className="absolute top-0 left-0 w-full h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, #3491ff, transparent)" }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <svg className="w-5 h-5" style={{ color: "#3491ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Tip</p>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Use a strong password with letters, numbers, and special characters to keep your account secure.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Vertical Divider Line */}
            <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent min-h-[500px]" />

            {/* Right Column - Form */}
            <div className="w-full">
              {/* Header - Only show on mobile */}
              <div className="text-center lg:hidden mb-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
                  Attendee Portal
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2">
                  {mode === "login" && "Welcome back"}
                  {mode === "signup" && "Create your account"}
                  {mode === "forgot" && "Reset password"}
                </h1>
                <p className="text-slate-500 text-sm">
                  {mode === "login" && "Sign in to discover and register for campus events"}
                  {mode === "signup" && "Join thousands of students discovering amazing events"}
                  {mode === "forgot" && "We'll send you a reset link to your email"}
                </p>
              </div>

              {/* Form Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
                {/* Error Message */}
                {error && (
                  <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: brandGradient }}>
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {mode === "login" && "Login Successful!"}
                      {mode === "signup" && "Account Created!"}
                      {mode === "forgot" && "Reset Link Sent!"}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {mode === "login" && "Redirecting to your dashboard..."}
                      {mode === "signup" && "Welcome to Unifesto! Redirecting..."}
                      {mode === "forgot" && "Check your email for the reset link."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Signup Fields - Landscape Layout */}
                    {mode === "signup" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="Enter your full name"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="signup-email" className="block text-sm font-semibold text-white mb-2">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="signup-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label htmlFor="mobile" className="block text-sm font-semibold text-white mb-2">
                            Mobile Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="10-digit mobile number"
                          />
                        </div>

                        {/* Organization with Search Dropdown */}
                        <div className="relative">
                          <label htmlFor="organization" className="block text-sm font-semibold text-white mb-2">
                            Organisation <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={orgSearch}
                            onChange={(e) => handleOrgSearch(e.target.value)}
                            onFocus={() => setShowOrgDropdown(true)}
                            onBlur={() => setTimeout(() => setShowOrgDropdown(false), 200)}
                            required
                            autoComplete="off"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="Search your organisation"
                          />
                          {showOrgDropdown && filteredOrgs.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-black border border-white/10 rounded-xl shadow-lg z-50">
                              {filteredOrgs.slice(0, 10).map((org) => (
                                <button
                                  key={org.id}
                                  type="button"
                                  onClick={() => selectOrg(org.name)}
                                  className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                                >
                                  <div className="font-medium">{org.name}</div>
                                  <div className="text-xs text-slate-500">{org.type}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Password */}
                        <div>
                          <label htmlFor="signup-password" className="block text-sm font-semibold text-white mb-2">
                            Password <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="password"
                            id="signup-password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="Create a password"
                          />
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                            Confirm Password <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="Confirm your password"
                          />
                        </div>
                      </div>
                    )}

                    {/* Login & Forgot Password Fields - Vertical Layout */}
                    {mode !== "signup" && (
                      <div className="space-y-5">
                        {/* Email Field */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>

                        {/* Password Field (login only) */}
                        {mode === "login" && (
                          <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                              Password <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                              placeholder="Enter your password"
                            />
                          </div>
                        )}

                        {/* Forgot Password Link (login only) */}
                        {mode === "login" && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => switchMode("forgot")}
                              className="text-xs font-medium transition-colors"
                              style={gradientText}
                            >
                              Forgot password?
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Google Sign In */}
                    {mode !== "forgot" && (
                      <>
                        <button
                          type="button"
                          onClick={handleGoogleSignIn}
                          className="w-full rounded-full px-6 py-3.5 text-sm font-bold bg-white text-black border border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-3"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 10.2v3.96h5.62c-.24 1.34-1.52 3.92-5.62 3.92-3.38 0-6.14-2.8-6.14-6.24S8.62 5.64 12 5.64c1.92 0 3.21.82 3.95 1.52l2.69-2.59C16.91 2.98 14.73 2 12 2 6.92 2 2.8 6.12 2.8 11.2S6.92 20.4 12 20.4c6.7 0 8.84-4.7 8.84-7.16 0-.47-.05-.83-.11-1.16H12Z" />
                            <path fill="#4285F4" d="M3.48 7.38l3.2 2.35C7.56 7.38 9.56 5.64 12 5.64c1.92 0 3.21.82 3.95 1.52l2.69-2.59C16.91 2.98 14.73 2 12 2 8.03 2 4.58 4.24 3.48 7.38Z" />
                            <path fill="#FBBC05" d="M12 20.4c2.62 0 4.84-.86 6.45-2.35l-2.98-2.44c-.82.56-1.9 1.12-3.47 1.12-4.07 0-5.35-2.53-5.6-3.85l-3.24 2.5C4.23 18.08 7.69 20.4 12 20.4Z" />
                            <path fill="#34A853" d="M21.84 12.04c0-.53-.05-.94-.13-1.35H12v3.96h5.62c-.28 1.57-1.6 2.88-3.15 3.14l2.98 2.44C19.95 18.35 21.84 15.86 21.84 12.04Z" />
                          </svg>
                          Continue with Google
                        </button>

                        <div className="flex items-center gap-3">
                          <div className="h-px bg-white/10 flex-1" />
                          <span className="text-xs text-slate-600 uppercase tracking-wide">or</span>
                          <div className="h-px bg-white/10 flex-1" />
                        </div>
                      </>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      style={{ background: brandGradient }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          {mode === "login" && "Sign In"}
                          {mode === "signup" && "Create Account"}
                          {mode === "forgot" && "Send Reset Link"}
                        </>
                      )}
                    </button>

                    {/* Mode Switch */}
                    <div className="text-center pt-4 border-t border-white/5">
                      {mode === "login" && (
                        <p className="text-sm text-slate-500">
                          Don't have an account?{" "}
                          <button
                            type="button"
                            onClick={() => switchMode("signup")}
                            className="font-semibold transition-colors"
                            style={gradientText}
                          >
                            Sign up
                          </button>
                        </p>
                      )}
                      {mode === "signup" && (
                        <p className="text-sm text-slate-500">
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => switchMode("login")}
                            className="font-semibold transition-colors"
                            style={gradientText}
                          >
                            Sign in
                          </button>
                        </p>
                      )}
                      {mode === "forgot" && (
                        <p className="text-sm text-slate-500">
                          Remember your password?{" "}
                          <button
                            type="button"
                            onClick={() => switchMode("login")}
                            className="font-semibold transition-colors"
                            style={gradientText}
                          >
                            Sign in
                          </button>
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </div>

              {/* Additional Info */}
              {!submitted && (
                <p className="text-center text-xs text-slate-600 mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
