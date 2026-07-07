"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Lightning, Ticket, ChartBar, Users, ArrowRight, QrCode } from "@phosphor-icons/react";

const features = [
  { icon: <Lightning className="w-5 h-5" weight="bold" />, text: "Go live in under 5 minutes" },
  { icon: <Ticket className="w-5 h-5" weight="bold" />, text: "Ticketing, RSVP & QR check-in built-in" },
  { icon: <ChartBar className="w-5 h-5" weight="bold" />, text: "Real-time analytics & attendance reports" },
  { icon: <Users className="w-5 h-5" weight="bold" />, text: "Reach 10,000+ students instantly" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function OrganizerPitchSection() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };
  const panel: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease, delay: 0.15 } },
  };

  return (
    <section id="host" aria-labelledby="organizer-heading" className="relative bg-canvas py-20 md:py-28 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(44rem 28rem at 82% 30%, rgba(52,145,255,0.08), transparent 62%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p variants={item} className="mb-3 text-sm font-medium text-primary">
              For organizers
            </motion.p>
            <motion.h2 variants={item} id="organizer-heading" className="text-3xl md:text-5xl font-extrabold text-white leading-[1.08] [text-wrap:balance] mb-5">
              Host events that{" "}
              <span className="text-primary">actually get attended.</span>
            </motion.h2>
            <motion.p variants={item} className="text-slate-300 text-base leading-relaxed mb-8 max-w-md">
              Stop chasing RSVPs on WhatsApp groups. Unifesto gives every organizer a single command center to create, promote, and manage events.
            </motion.p>

            {/* Feature bullets */}
            <motion.ul variants={item} className="flex flex-col gap-3 mb-10">
              {features.map((f) => (
                <li key={f.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary">
                    {f.icon}
                  </div>
                  <span className="text-sm text-slate-300">{f.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-block">
              <a
                id="organizer-start-hosting"
                href="/host"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start Hosting
                <ArrowRight className="w-4 h-4" weight="bold" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: visual card */}
          <motion.div
            variants={panel}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-slate-400">Your event</p>
                  <p className="text-base font-bold text-white">Hack League 2026</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Live
                </span>
              </div>
              {/* Mock stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Registered", value: "312" },
                  { label: "Check-ins", value: "289" },
                  { label: "Revenue", value: "₹0" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-white">{s.value}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Mock QR block */}
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-slate-400" weight="bold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">QR Check-in Active</p>
                  <p className="text-[10px] text-slate-400">Scanning at Gate 1 &amp; Gate 2</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
