"use client";

import { useState } from "react";
import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Ticket = {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  lastUpdated: string;
  messages: {
    id: string;
    sender: "user" | "support";
    message: string;
    timestamp: string;
  }[];
};

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "tickets" | "contact">("faq");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Ticket System State
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium" as "low" | "medium" | "high",
    description: "",
  });
  const [newMessage, setNewMessage] = useState("");

  // Mock tickets data (in real app, this would come from backend)
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      subject: "Unable to generate QR codes for attendees",
      category: "technical",
      status: "in-progress",
      priority: "high",
      createdAt: "2026-04-15T10:30:00Z",
      lastUpdated: "2026-04-16T14:20:00Z",
      messages: [
        {
          id: "msg-1",
          sender: "user",
          message: "I'm trying to generate QR codes for my event but getting an error. The event has 200 registrations.",
          timestamp: "2026-04-15T10:30:00Z",
        },
        {
          id: "msg-2",
          sender: "support",
          message: "Hi! Thanks for reaching out. We're looking into this issue. Can you share the event ID?",
          timestamp: "2026-04-15T11:45:00Z",
        },
        {
          id: "msg-3",
          sender: "user",
          message: "Sure, the event ID is EVT-2026-HL-001",
          timestamp: "2026-04-15T12:10:00Z",
        },
        {
          id: "msg-4",
          sender: "support",
          message: "Thank you! We've identified the issue and are working on a fix. We'll update you within 2 hours.",
          timestamp: "2026-04-16T14:20:00Z",
        },
      ],
    },
    {
      id: "TKT-002",
      subject: "Refund request for cancelled event",
      category: "billing",
      status: "resolved",
      priority: "medium",
      createdAt: "2026-04-10T09:15:00Z",
      lastUpdated: "2026-04-12T16:30:00Z",
      messages: [
        {
          id: "msg-5",
          sender: "user",
          message: "I purchased a ticket for an event that got cancelled. How do I get a refund?",
          timestamp: "2026-04-10T09:15:00Z",
        },
        {
          id: "msg-6",
          sender: "support",
          message: "We've processed your refund. It should reflect in your account within 5-7 business days.",
          timestamp: "2026-04-12T16:30:00Z",
        },
      ],
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", category: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: ticketForm.subject,
      category: ticketForm.category,
      status: "open",
      priority: ticketForm.priority,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          message: ticketForm.description,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setTickets([newTicket, ...tickets]);
    setTicketForm({ subject: "", category: "", priority: "medium", description: "" });
    setShowTicketForm(false);
    setSelectedTicket(newTicket);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !newMessage.trim()) return;

    const updatedTicket = {
      ...selectedTicket,
      lastUpdated: new Date().toISOString(),
      messages: [
        ...selectedTicket.messages,
        {
          id: `msg-${Date.now()}`,
          sender: "user" as const,
          message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setTickets(tickets.map((t) => (t.id === selectedTicket.id ? updatedTicket : t)));
    setSelectedTicket(updatedTicket);
    setNewMessage("");
  };

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "closed":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const faqs = [
    {
      id: "getting-started",
      category: "Getting Started",
      question: "How do I create an account on Unifesto?",
      answer: "Click on 'Get Started' in the navigation bar. You can sign up using your email, Google account, or university email. No credit card required for free events.",
    },
    {
      id: "create-event",
      category: "Getting Started",
      question: "How do I create my first event?",
      answer: "After logging in, click 'Host Event' in the navigation. Fill in basic details like event name, date, venue, and category. You can publish your event in under 5 minutes.",
    },
    {
      id: "event-discovery",
      category: "For Students",
      question: "How do I find events on campus?",
      answer: "Visit the 'Discover' section to browse all campus events. Use filters to narrow down by category (Hackathons, Cultural, Workshops, etc.), date, or organizer. You can also search by event name or keyword.",
    },
    {
      id: "registration",
      category: "For Students",
      question: "Do I need an account to register for events?",
      answer: "For free events, you can register without an account. For paid events or to access additional features like saved events and personalized recommendations, you'll need to create an account.",
    },
    {
      id: "qr-ticket",
      category: "For Students",
      question: "Where is my QR ticket after registration?",
      answer: "Your QR ticket is sent to your email immediately after registration. You can also access it from your account dashboard under 'My Events'. Show this QR code at the event entry for check-in.",
    },
    {
      id: "ticketing",
      category: "For Organizers",
      question: "Can I sell paid tickets on Unifesto?",
      answer: "Yes! Unifesto supports both free RSVP and paid ticketing. You can set ticket prices, capacity limits, and enable waitlists. Payment processing is integrated and secure.",
    },
    {
      id: "qr-checkin",
      category: "For Organizers",
      question: "How does QR check-in work?",
      answer: "Use the Unifesto QR Check-in App on any device. Simply scan attendee QR codes at the gate. The system tracks attendance in real-time, prevents duplicate entries, and works offline.",
    },
    {
      id: "analytics",
      category: "For Organizers",
      question: "What analytics are available for my event?",
      answer: "You get real-time registration tracking, check-in data, attendance reports, demographic insights, and conversion metrics. All data can be exported in CSV or PDF format.",
    },
    {
      id: "capacity",
      category: "For Organizers",
      question: "What happens when my event reaches capacity?",
      answer: "When capacity is reached, new registrations automatically go to a waitlist. If someone cancels, the next person on the waitlist is automatically promoted and notified.",
    },
    {
      id: "certificates",
      category: "Features",
      question: "Can I generate certificates for attendees?",
      answer: "Certificate generation is coming soon! You'll be able to bulk-generate certificates with custom templates, QR verification, and automatic email delivery to all attendees.",
    },
    {
      id: "mobile-app",
      category: "Features",
      question: "Is there a mobile app?",
      answer: "Native Android and iOS apps are coming soon! Currently, Unifesto works perfectly on mobile browsers and can be added to your home screen as a PWA (Progressive Web App).",
    },
    {
      id: "pricing",
      category: "Pricing & Billing",
      question: "How much does Unifesto cost?",
      answer: "Unifesto is free for organizers to create and manage events. For paid events, we charge a small platform fee. Free events have no charges whatsoever.",
    },
    {
      id: "refunds",
      category: "Pricing & Billing",
      question: "What is your refund policy?",
      answer: "Refund policies are set by individual event organizers. If you need a refund, contact the event organizer directly through the event page. For platform-related issues, contact our support team.",
    },
    {
      id: "verification",
      category: "Verification",
      question: "How do I verify my organization?",
      answer: "Visit your organization profile and click 'Request Verification'. Submit required documents (university ID, club registration, etc.). Our team reviews within 2-3 business days.",
    },
    {
      id: "employee-verification",
      category: "Verification",
      question: "What is employee verification?",
      answer: "Employee verification is for Unifesto Private Limited employees only. Employees can verify their identity by scanning the QR code on their employee ID card.",
    },
  ];

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const contactOptions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "support@unifesto.app",
      href: "mailto:support@unifesto.app",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      href: "#chat",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Help Center",
      description: "Browse guides and tutorials",
      action: "View Docs",
      href: "#help-center",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      title: "Twitter / X",
      description: "Follow us for updates",
      action: "@unifestoapp",
      href: "https://x.com/unifestoapp",
    },
  ];

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
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>
            Support Center
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            How can we<br />
            <span style={gradientText}>help you?</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Find answers, create support tickets, or get in touch with our team.
          </p>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "faq"
                  ? "text-black"
                  : "text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
              style={activeTab === "faq" ? { background: brandGradient } : {}}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "tickets"
                  ? "text-black"
                  : "text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
              style={activeTab === "tickets" ? { background: brandGradient } : {}}
            >
              Support Tickets
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "contact"
                  ? "text-black"
                  : "text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
              style={activeTab === "contact" ? { background: brandGradient } : {}}
            >
              Contact Us
            </button>
          </div>

          {/* Search Bar */}
          {activeTab === "faq" && (
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 pl-12 text-sm text-white placeholder-slate-500 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Options */}
      {activeTab === "contact" && (
        <section className="relative py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
                Get in Touch
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                Choose your preferred<br />
                <span style={gradientText}>support channel.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option) => (
                <a
                  key={option.title}
                  href={option.href}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                  rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-black"
                    style={{ background: brandGradient }}
                  >
                    {option.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{option.description}</p>
                  <p className="text-sm font-semibold" style={gradientText}>
                    {option.action} →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Support Ticket System */}
      {activeTab === "tickets" && (
        <section className="relative py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            {!selectedTicket ? (
              <>
                {/* Ticket List Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                      Your Support Tickets
                    </h2>
                    <p className="text-sm text-slate-500">
                      Track and manage all your support requests
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTicketForm(true)}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                    style={{ background: brandGradient }}
                  >
                    + New Ticket
                  </button>
                </div>

                {/* Create Ticket Form Modal */}
                {showTicketForm && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Create Support Ticket</h3>
                        <button
                          onClick={() => setShowTicketForm(false)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleCreateTicket} className="space-y-5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-2">
                            Subject *
                          </label>
                          <input
                            type="text"
                            required
                            value={ticketForm.subject}
                            onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                            placeholder="Brief description of your issue"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">
                              Category *
                            </label>
                            <select
                              required
                              value={ticketForm.category}
                              onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                            >
                              <option value="" className="bg-black">Select category</option>
                              <option value="general" className="bg-black">General Inquiry</option>
                              <option value="technical" className="bg-black">Technical Support</option>
                              <option value="billing" className="bg-black">Billing & Payments</option>
                              <option value="event" className="bg-black">Event Management</option>
                              <option value="verification" className="bg-black">Verification</option>
                              <option value="feedback" className="bg-black">Feedback</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">
                              Priority *
                            </label>
                            <select
                              required
                              value={ticketForm.priority}
                              onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as "low" | "medium" | "high" })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                            >
                              <option value="low" className="bg-black">Low</option>
                              <option value="medium" className="bg-black">Medium</option>
                              <option value="high" className="bg-black">High</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-2">
                            Description *
                          </label>
                          <textarea
                            required
                            rows={6}
                            value={ticketForm.description}
                            onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200 resize-none"
                            placeholder="Provide detailed information about your issue..."
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setShowTicketForm(false)}
                            className="flex-1 rounded-full px-6 py-3 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]"
                            style={{ background: brandGradient }}
                          >
                            Create Ticket
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Tickets List */}
                <div className="space-y-4">
                  {tickets.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">No tickets yet</h3>
                      <p className="text-sm text-slate-500 mb-6">Create your first support ticket to get help</p>
                      <button
                        onClick={() => setShowTicketForm(true)}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]"
                        style={{ background: brandGradient }}
                      >
                        Create Ticket
                      </button>
                    </div>
                  ) : (
                    tickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className="w-full p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 text-left"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-slate-500">{ticket.id}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(ticket.status)}`}>
                                {ticket.status.toUpperCase().replace("-", " ")}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">{ticket.subject}</h3>
                            <p className="text-xs text-slate-500">
                              Created {formatDate(ticket.createdAt)} • Last updated {formatDate(ticket.lastUpdated)}
                            </p>
                          </div>
                          <svg className="w-5 h-5 text-slate-500 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-2">
                          {ticket.messages[ticket.messages.length - 1].message}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </>
            ) : (
              /* Ticket Detail View */
              <div>
                {/* Back Button */}
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to tickets
                </button>

                {/* Ticket Header */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-500">{selectedTicket.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(selectedTicket.status)}`}>
                          {selectedTicket.status.toUpperCase().replace("-", " ")}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedTicket.subject}</h2>
                      <p className="text-xs text-slate-500">
                        Created {formatDate(selectedTicket.createdAt)} • Last updated {formatDate(selectedTicket.lastUpdated)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 mb-6">
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border ${
                        msg.sender === "user"
                          ? "border-white/10 bg-white/[0.02] ml-0 mr-8"
                          : "border-blue-500/20 bg-blue-500/5 ml-8 mr-0"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={msg.sender === "support" ? { background: brandGradient, color: "#000" } : { background: "rgba(255,255,255,0.1)", color: "#fff" }}
                        >
                          {msg.sender === "user" ? "Y" : "S"}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">
                            {msg.sender === "user" ? "You" : "Support Team"}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {formatDate(msg.timestamp)} at {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                {selectedTicket.status !== "closed" && (
                  <form onSubmit={handleSendMessage} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <label className="block text-xs font-semibold text-slate-400 mb-3">
                      Add a reply
                    </label>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200 resize-none mb-4"
                      placeholder="Type your message..."
                    />
                    <button
                      type="submit"
                      className="rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]"
                      style={{ background: brandGradient }}
                    >
                      Send Reply
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {activeTab === "faq" && (
        <section className="relative py-20 px-6 border-t border-white/5">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
              FAQ
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
              Frequently Asked<br />
              <span style={gradientText}>Questions</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Quick answers to common questions about Unifesto.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/10 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors duration-200"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                      {faq.category}
                    </span>
                    <h3 className="text-sm md:text-base font-semibold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Contact Form */}
      {activeTab === "contact" && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
              Still Need Help?
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
              Send us a<br />
              <span style={gradientText}>message.</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Our support team will get back to you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: brandGradient }}>
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-sm text-slate-400">
                We've received your message and will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-semibold text-slate-400 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
                >
                  <option value="" className="bg-black">Select a category</option>
                  <option value="general" className="bg-black">General Inquiry</option>
                  <option value="technical" className="bg-black">Technical Support</option>
                  <option value="billing" className="bg-black">Billing & Payments</option>
                  <option value="event" className="bg-black">Event Management</option>
                  <option value="verification" className="bg-black">Verification</option>
                  <option value="feedback" className="bg-black">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200 resize-none"
                  placeholder="Describe your issue or question..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
                style={{ background: brandGradient }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
      )}

      {/* Quick Links */}
      {activeTab === "contact" && (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Helpful Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/about"
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3491ff] group-hover:to-[#0062ff] transition-all">
                About Unifesto
              </h3>
              <p className="text-xs text-slate-500">Learn about our mission and how we're transforming campus events.</p>
            </a>

            <a
              href="/products"
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3491ff] group-hover:to-[#0062ff] transition-all">
                Products & Features
              </h3>
              <p className="text-xs text-slate-500">Explore all the tools and features available on Unifesto.</p>
            </a>

            <a
              href="/verify"
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3491ff] group-hover:to-[#0062ff] transition-all">
                Verification
              </h3>
              <p className="text-xs text-slate-500">Verify certificates, employee IDs, and organization credentials.</p>
            </a>
          </div>
        </div>
      </section>
      )}

      <Footer />
    </main>
  );
}
