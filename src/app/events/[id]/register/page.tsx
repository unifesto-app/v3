"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getEventById } from "@/lib/mockEvents";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ id: string }>;
}

type TicketType = "individual" | "group";
type PricingModel = "perPerson" | "perGroup";

interface TicketOption {
  id: string;
  name: string;
  type: TicketType;
  pricingModel: PricingModel;
  price: number;
  maxQuantity: number;
  description?: string;
}

interface AttendeeInfo {
  name: string;
  email: string;
  mobile: string;
  organization: string;
  gender: string;
}

const REGISTRATION_TIME_LIMIT = 15 * 60; // 15 minutes in seconds

export default function RegisterPage({ params }: Props) {
  const router = useRouter();
  const [eventId, setEventId] = useState<string>("");
  const [event, setEvent] = useState<any>(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(REGISTRATION_TIME_LIMIT);
  const [timerExpired, setTimerExpired] = useState(false);
  
  // Registration flow state
  const [step, setStep] = useState<"ticket" | "details" | "review" | "payment">("ticket");
  
  // Ticket selection
  const [selectedTicket, setSelectedTicket] = useState<TicketOption | null>(null);
  const [quantity, setQuantity] = useState(1);

  
  // Attendee details
  const [attendees, setAttendees] = useState<AttendeeInfo[]>([{
    name: "",
    email: "",
    mobile: "",
    organization: "",
    gender: "",
  }]);
  
  // Mock ticket options (in real app, this would come from the event data)
  const ticketOptions: TicketOption[] = [
    {
      id: "standard-individual",
      name: "Standard Individual",
      type: "individual",
      pricingModel: "perPerson",
      price: 0,
      maxQuantity: 5,
      description: "Single attendee registration"
    },
    {
      id: "group-ticket",
      name: "Group Registration",
      type: "group",
      pricingModel: "perPerson",
      price: 0,
      maxQuantity: 50,
      description: "Register multiple people together (5-50 people)"
    },
  ];

  // Load event data
  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      const eventData = getEventById(id);
      if (!eventData) {
        router.push("/events");
        return;
      }
      setEvent(eventData);
    });
  }, [params, router]);

  // Timer countdown
  useEffect(() => {
    if (timerExpired) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerExpired(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerExpired]);


  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle ticket selection
  const handleTicketSelect = (ticket: TicketOption) => {
    setSelectedTicket(ticket);
    
    // Initialize attendees based on ticket type
    if (ticket.type === "group") {
      // For group tickets, start with minimum 5 attendees
      const initialGroupSize = 5;
      setQuantity(initialGroupSize);
      setAttendees(Array(initialGroupSize).fill(null).map(() => ({
        name: "",
        email: "",
        mobile: "",
        organization: "",
        gender: "",
      })));
    } else {
      setQuantity(1);
      setAttendees([{
        name: "",
        email: "",
        mobile: "",
        organization: "",
        gender: "",
      }]);
    }
  };

  // Handle quantity change for both individual and group tickets
  const handleQuantityChange = (newQuantity: number) => {
    if (!selectedTicket) return;
    
    // For group tickets, enforce minimum of 5
    if (selectedTicket.type === "group" && newQuantity < 5) {
      return;
    }
    
    setQuantity(newQuantity);
    const newAttendees = Array(newQuantity).fill(null).map((_, i) => 
      attendees[i] || {
        name: "",
        email: "",
        mobile: "",
        organization: "",
        gender: "",
      }
    );
    setAttendees(newAttendees);
  };

  // Handle attendee info change
  const handleAttendeeChange = (index: number, field: keyof AttendeeInfo, value: string) => {
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], [field]: value };
    setAttendees(newAttendees);
  };

  // Validate attendee info
  const validateAttendees = () => {
    return attendees.every(attendee => 
      attendee.name.trim() !== "" &&
      attendee.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email) &&
      attendee.mobile.trim() !== "" &&
      /^[0-9]{10}$/.test(attendee.mobile) &&
      attendee.organization.trim() !== "" &&
      attendee.gender !== ""
    );
  };


  // Calculate total price
  const calculateTotal = () => {
    if (!selectedTicket) return 0;
    
    if (selectedTicket.pricingModel === "perPerson") {
      return selectedTicket.price * quantity;
    } else {
      return selectedTicket.price;
    }
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (step === "ticket" && selectedTicket) {
      setStep("details");
    } else if (step === "details" && validateAttendees()) {
      setStep("review");
    } else if (step === "review") {
      setStep("payment");
    }
  };

  const goToPreviousStep = () => {
    if (step === "details") setStep("ticket");
    else if (step === "review") setStep("details");
    else if (step === "payment") setStep("review");
  };

  // Handle registration submission
  const handleSubmit = () => {
    console.log("Registration submitted:", {
      event: eventId,
      ticket: selectedTicket,
      quantity,
      attendees,
      total: calculateTotal(),
    });
    
    // Redirect to success page
    router.push(`/events/${eventId}/register/success`);
  };

  if (!event) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (timerExpired) {
    return (
      <main className="min-h-screen bg-black overflow-x-hidden">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Registration Time Expired</h1>
            <p className="text-slate-400 text-sm mb-6">
              Your registration session has expired. Please start a new registration.
            </p>
            <button
              onClick={() => router.push(`/events/${eventId}`)}
              className="rounded-full px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]"
              style={{ background: brandGradient }}
            >
              Back to Event
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Timer Bar */}
      <div className="sticky top-20 z-30 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-slate-400">Time remaining:</span>
            <span className={`text-sm font-bold ${timeLeft < 300 ? "text-red-400" : "text-white"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${timeLeft < 300 ? "bg-red-400 animate-pulse" : "bg-green-400"}`} />
            <span className="text-xs text-slate-500">Session active</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-white/5">
          <div 
            className="h-full transition-all duration-1000 ease-linear"
            style={{ 
              width: `${(timeLeft / REGISTRATION_TIME_LIMIT) * 100}%`,
              background: timeLeft < 300 ? "linear-gradient(90deg, #ef4444, #dc2626)" : brandGradient
            }}
          />
        </div>
      </div>

      <section className="relative bg-black pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
              Event Registration
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{event.title}</h1>
            <p className="text-sm text-slate-500">{event.date} · {event.location}</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { id: "ticket", label: "Select Ticket" },
                { id: "details", label: "Attendee Details" },
                { id: "review", label: "Review" },
                { id: "payment", label: "Payment" },
              ].map((s, i, arr) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step === s.id ? "text-black" : 
                      arr.findIndex(x => x.id === step) > i ? "bg-white/10 text-white" : "bg-white/5 text-slate-600"
                    }`} style={step === s.id ? { background: brandGradient } : {}}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] mt-1 ${step === s.id ? "text-white font-semibold" : "text-slate-600"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`flex-1 h-px mx-2 ${arr.findIndex(x => x.id === step) > i ? "bg-white/20" : "bg-white/5"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>


          {/* Step Content */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 mb-8">
            
            {/* Step 1: Ticket Selection */}
            {step === "ticket" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Select Your Ticket</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {ticketOptions.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => handleTicketSelect(ticket)}
                      className={`text-left rounded-xl border p-5 transition-all duration-300 ${
                        selectedTicket?.id === ticket.id
                          ? "border-[#3491ff] bg-[#3491ff]/5"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base font-bold text-white mb-1">{ticket.name}</h3>
                          <p className="text-xs text-slate-500">{ticket.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedTicket?.id === ticket.id ? "border-[#3491ff]" : "border-white/20"
                        }`}>
                          {selectedTicket?.id === ticket.id && (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: brandGradient }} />
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">
                          {ticket.price === 0 ? "Free" : `₹${ticket.price}`}
                        </span>
                        {ticket.pricingModel === "perPerson" && ticket.type === "individual" && (
                          <span className="text-xs text-slate-500">per person</span>
                        )}
                        {ticket.pricingModel === "perGroup" && (
                          <span className="text-xs text-slate-500">per group</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity selector for individual and group tickets */}
                {selectedTicket && (
                  <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <label className="block text-sm font-semibold text-white mb-4">
                      {selectedTicket.type === "group" ? "Number of Attendees" : "Number of Tickets"}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(Math.max(selectedTicket.type === "group" ? 5 : 1, quantity - 1))}
                        disabled={quantity <= (selectedTicket.type === "group" ? 5 : 1)}
                        className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-white w-16 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(Math.min(selectedTicket.maxQuantity, quantity + 1))}
                        disabled={quantity >= selectedTicket.maxQuantity}
                        className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        +
                      </button>
                      <span className="text-xs text-slate-500 ml-2">
                        {selectedTicket.type === "group" ? "Min: 5, Max: 50" : `Max: ${selectedTicket.maxQuantity}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* Step 2: Attendee Details */}
            {step === "details" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">
                  Attendee Information
                  {attendees.length > 1 && <span className="text-slate-500 text-base ml-2">({attendees.length} people)</span>}
                </h2>
                
                <div className="space-y-10">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="pb-10 border-b border-white/5 last:border-b-0 last:pb-0">
                      {attendees.length > 1 && (
                        <h3 className="text-sm font-bold text-white mb-5">
                          Attendee {index + 1}
                        </h3>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={attendee.name}
                            onChange={(e) => handleAttendeeChange(index, "name", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="Enter full name"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={attendee.email}
                            onChange={(e) => handleAttendeeChange(index, "email", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="your@email.com"
                            required
                          />
                        </div>

                        {/* Mobile */}
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2">
                            Mobile Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            value={attendee.mobile}
                            onChange={(e) => handleAttendeeChange(index, "mobile", e.target.value)}
                            pattern="[0-9]{10}"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="10-digit mobile number"
                            required
                          />
                        </div>

                        {/* Organization */}
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2">
                            Organisation <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={attendee.organization}
                            onChange={(e) => handleAttendeeChange(index, "organization", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                            placeholder="Your organisation"
                            required
                          />
                        </div>

                        {/* Gender */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-white mb-2">
                            Gender <span className="text-red-400">*</span>
                          </label>
                          <div className="flex gap-3">
                            {["Male", "Female", "Other", "Prefer not to say"].map((gender) => (
                              <button
                                key={gender}
                                type="button"
                                onClick={() => handleAttendeeChange(index, "gender", gender)}
                                className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                                  attendee.gender === gender
                                    ? "border-[#3491ff] bg-[#3491ff]/5 text-white"
                                    : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20"
                                }`}
                              >
                                {gender}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Step 3: Review */}
            {step === "review" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Review Your Registration</h2>
                
                {/* Event Details */}
                <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-white mb-3">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Event:</span>
                      <span className="text-white font-medium">{event.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date:</span>
                      <span className="text-white">{event.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="text-white">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-white mb-3">Ticket Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ticket Type:</span>
                      <span className="text-white font-medium">{selectedTicket?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Quantity:</span>
                      <span className="text-white">{quantity} {quantity === 1 ? "ticket" : "tickets"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Attendees:</span>
                      <span className="text-white">{attendees.length} {attendees.length === 1 ? "person" : "people"}</span>
                    </div>
                  </div>
                </div>

                {/* Attendee List */}
                <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-white mb-3">Attendee Information</h3>
                  <div className="space-y-4">
                    {attendees.map((attendee, index) => (
                      <div key={index} className="pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                          Attendee {index + 1}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-600">Name:</span>
                            <span className="text-white ml-2">{attendee.name}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Email:</span>
                            <span className="text-white ml-2">{attendee.email}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Mobile:</span>
                            <span className="text-white ml-2">{attendee.mobile}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Organisation:</span>
                            <span className="text-white ml-2">{attendee.organization}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-600">Gender:</span>
                            <span className="text-white ml-2">{attendee.gender}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white">Total Amount</span>
                    <span className="text-2xl font-black text-white">
                      {calculateTotal() === 0 ? "Free" : `₹${calculateTotal()}`}
                    </span>
                  </div>
                </div>
              </div>
            )}


            {/* Step 4: Payment */}
            {step === "payment" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Payment</h2>
                
                {calculateTotal() === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: brandGradient }}>
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Free Event</h3>
                    <p className="text-sm text-slate-400 mb-6">
                      No payment required. Click confirm to complete your registration.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-slate-500">Amount to Pay</span>
                        <span className="text-2xl font-black text-white">₹{calculateTotal()}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white">Select Payment Method</h3>
                      
                      {["UPI", "Card", "Net Banking"].map((method) => (
                        <button
                          key={method}
                          className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-white/20 hover:bg-white/[0.04] transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{method}</span>
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-2">
            {step !== "ticket" && (
              <button
                onClick={goToPreviousStep}
                className="px-6 py-3 rounded-full border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-all"
              >
                ← Back
              </button>
            )}
            
            <div className="flex-1" />

            {step !== "payment" ? (
              <button
                onClick={goToNextStep}
                disabled={
                  (step === "ticket" && !selectedTicket) ||
                  (step === "details" && !validateAttendees())
                }
                className="px-8 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: brandGradient }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]"
                style={{ background: brandGradient }}
              >
                {calculateTotal() === 0 ? "Confirm Registration" : "Proceed to Payment"}
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
