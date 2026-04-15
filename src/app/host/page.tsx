"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brandGradient, gradientText } from "@/lib/styles";

const EVENT_CATEGORIES = [
  "Hackathon",
  "Cultural",
  "MUN",
  "Film & Arts",
  "Entrepreneurship",
  "Science & Tech",
  "Workshop",
  "Sports",
  "Ideathon",
  "Other",
];

const EVENT_TYPES = [
  { value: "inPerson", label: "In Person" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];

export default function HostEventPage() {
  const [formData, setFormData] = useState({
    eventName: "",
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    category: "",
    eventType: "inPerson",
    date: "",
    location: "",
    description: "",
    expectedAttendees: "",
    ticketPrice: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        eventName: "",
        organizerName: "",
        organizerEmail: "",
        organizerPhone: "",
        category: "",
        eventType: "inPerson",
        date: "",
        location: "",
        description: "",
        expectedAttendees: "",
        ticketPrice: "",
        additionalInfo: "",
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-black pt-36 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>
            Host Your Event
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Bring Your Event<br />
            <span style={gradientText}>to Life</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Fill out the form below and we'll help you create an amazing event experience on campus. Our team will review your request and get back to you within 24-48 hours.
          </p>
        </div>
      </section>

      {/* Ticketing & RSVP Section */}
      <section id="ticketing" className="scroll-mt-20 relative bg-black py-20 md:py-28 px-6">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
                Ticketing & RSVP
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Sell tickets or<br />
                <span style={gradientText}>collect RSVPs</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Whether you're running a free event or selling tickets, our platform makes registration seamless. Set capacity limits, enable waitlists, and manage everything in real-time.
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {[
                  { icon: "💳", text: "Free & paid ticketing options" },
                  { icon: "👥", text: "Capacity management & waitlists" },
                  { icon: "⚡", text: "Instant email confirmations" },
                  { icon: "📊", text: "Real-time registration tracking" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-black" style={{ background: brandGradient }}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-500">Registration Status</p>
                    <p className="text-base font-bold text-white">Tech Summit 2026</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full text-black" style={{ background: brandGradient }}>
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Registered", value: "487" },
                    { label: "Capacity", value: "500" },
                    { label: "Revenue", value: "₹0" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-lg font-extrabold text-white">{s.value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">13 spots remaining</p>
                    <p className="text-[10px] text-slate-500">Waitlist: 24 people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Check-in Section */}
      <section id="checkin" className="scroll-mt-20 relative bg-black py-20 md:py-28 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(52,145,255,0.06) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-500">Check-in Dashboard</p>
                    <p className="text-base font-bold text-white">Live Scanning</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    Active
                  </span>
                </div>
                <div className="bg-white/5 rounded-xl p-6 mb-4 flex items-center justify-center">
                  <svg className="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M8 16H6m0 0H4m2 0v2m0-8V8m4-4H8m0 0V2m0 2H6M20 8h-2m2 0v6" />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Checked In", value: "289" },
                    { label: "Pending", value: "23" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-lg font-extrabold text-white">{s.value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
                QR Check-in
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Fraud-proof<br />
                <span style={gradientText}>entry system</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Verify attendees in seconds with our QR code scanning system. Prevent duplicate entries and keep your event secure with real-time validation.
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {[
                  { icon: "📱", text: "Instant QR code generation" },
                  { icon: "🔒", text: "Duplicate entry prevention" },
                  { icon: "📡", text: "Offline mode support" },
                  { icon: "⚡", text: "Real-time sync across devices" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-black" style={{ background: brandGradient }}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="scroll-mt-20 relative bg-black py-20 md:py-28 px-6">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
                Analytics Dashboard
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
                Track your<br />
                <span style={gradientText}>event performance</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Get real-time insights into your event's performance. Monitor registrations, track attendance, and understand your audience with detailed analytics.
              </p>

              <ul className="flex flex-col gap-3 mb-10">
                {[
                  { icon: "📈", text: "Live attendance tracking" },
                  { icon: "👥", text: "Attendee demographics" },
                  { icon: "📊", text: "Registration insights" },
                  { icon: "📥", text: "Export reports (CSV)" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-black" style={{ background: brandGradient }}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="mb-5">
                  <p className="text-xs text-slate-500 mb-1">Event Performance</p>
                  <p className="text-base font-bold text-white">Last 7 Days</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: "Total Views", value: "2.4K" },
                    { label: "Registrations", value: "487" },
                    { label: "Attendance", value: "289" },
                    { label: "Conversion", value: "20%" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3">
                      <p className="text-lg font-extrabold text-white">{s.value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Peak Registration Time</p>
                    <p className="text-[10px] text-slate-500">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="request-form" className="scroll-mt-20 px-6 pb-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
            Ready to Start?
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Submit Your Event Request
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Fill out the form below and our team will review your request within 24-48 hours.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/[0.02]">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: brandGradient }}>
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
            <p className="text-slate-400 text-sm">
              We've received your event request. Our team will review it and get back to you within 24-48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Details Section */}
            <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 md:p-8">
              <h2 className="text-lg font-bold text-white mb-6">Event Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Event Name - Full Width */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label htmlFor="eventName" className="block text-sm font-semibold text-white mb-2">
                    Event Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="e.g., Tech Summit 2026"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-white mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#3491ff] transition-colors"
                  >
                    <option value="" className="bg-black">Select a category</option>
                    {EVENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-black">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Type */}
                <div>
                  <label htmlFor="eventType" className="block text-sm font-semibold text-white mb-2">
                    Event Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#3491ff] transition-colors"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type.value} value={type.value} className="bg-black">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-white mb-2">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="e.g., Auditorium, Block 3"
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-white mb-2">
                    Event Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#3491ff] transition-colors"
                  />
                </div>

                {/* Ticket Price */}
                <div>
                  <label htmlFor="ticketPrice" className="block text-sm font-semibold text-white mb-2">
                    Ticket Price (₹)
                  </label>
                  <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    min="0"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="0 for free events"
                  />
                </div>

                {/* Expected Attendees */}
                <div>
                  <label htmlFor="expectedAttendees" className="block text-sm font-semibold text-white mb-2">
                    Expected Attendees <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    id="expectedAttendees"
                    name="expectedAttendees"
                    value={formData.expectedAttendees}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="e.g., 200"
                  />
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                    Event Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors resize-none"
                    placeholder="Describe your event, what attendees can expect, and any special highlights..."
                  />
                </div>
              </div>
            </div>

            {/* Organizer Details Section */}
            <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 md:p-8">
              <h2 className="text-lg font-bold text-white mb-6">Organizer Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Organizer Name */}
                <div>
                  <label htmlFor="organizerName" className="block text-sm font-semibold text-white mb-2">
                    Your Name / Organization <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizerName"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="e.g., Tech Club MRUH"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="organizerEmail" className="block text-sm font-semibold text-white mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="organizerEmail"
                    name="organizerEmail"
                    value={formData.organizerEmail}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="organizerPhone" className="block text-sm font-semibold text-white mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="organizerPhone"
                    name="organizerPhone"
                    value={formData.organizerPhone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Additional Info - Full Width */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label htmlFor="additionalInfo" className="block text-sm font-semibold text-white mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors resize-none"
                    placeholder="Any special requirements, sponsors, or additional details..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
              <p className="text-xs text-slate-500">
                <span className="text-red-400">*</span> Required fields
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                style={{ background: brandGradient }}
              >
                Submit Event Request
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
