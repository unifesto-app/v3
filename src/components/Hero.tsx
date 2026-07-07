"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ScanSmiley, Sparkle, Check } from "@phosphor-icons/react";

/* One orchestrated page-load. Reveals enhance already-visible content;
   with prefers-reduced-motion the content simply appears. */
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  /* Only run the entrance after mount. On the server and first client paint
     the content renders visible (no injected hidden styles), so SSR and
     hydration markup match, then the reveal plays. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.55, ease },
    },
  };

  const panel: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : 0.15 },
    },
  };

  /* The device runs its own sequence after the panel settles: the scan boots,
     then the match confirms, then the recommendation reveals. Purpose:
     explanation. Reduced motion collapses it to a plain appearance. */
  const strip: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.45, ease, delay: reduce ? 0 : 1.35 },
    },
  };

  const reco: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 8, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.45, ease, delay: reduce ? 0 : 1.6 },
    },
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] flex items-center bg-canvas overflow-hidden"
    >
      {/* Ambient depth: a single soft radial from the accent, low opacity.
          Not a decorative grid/stripe; just gives the black canvas a light source. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60rem 40rem at 78% 18%, rgba(52,145,255,0.14), transparent 60%)",
        }}
      />

      <motion.div
        variants={container}
        initial={mounted ? "hidden" : false}
        animate={mounted ? "show" : false}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pt-28 pb-20 md:py-0
                   grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]"
      >
        {/* ── Left: message ─────────────────────────────────────────── */}
        <div className="max-w-2xl">
          {/* Live badge: real proof (named organisation), not a stat cliche */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-300">
              Live at Hyderabad
            </span>
          </motion.div>

          {/* Heading: solid white, one word in solid electric blue.
              Emphasis by color + weight, never gradient text. */}
          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 font-agrandir font-bold text-white
                       text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.98]
                       [text-wrap:balance]"
            style={{ letterSpacing: "-0.045em" }}
          >
            The AI brain behind every event.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-400"
          >
            Face check-in, smart event matching, WhatsApp-first updates and
            post-event intelligence. One platform that actually{" "}
            <span className="font-semibold text-white">runs the event with you</span>,
            not just a page to list it on.
          </motion.p>

          {/* CTAs: solid primary, real bordered secondary. No glow pill, no gradient text. */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            {/* Press feedback: scale(0.97) on tap, snappy. Buttons must feel
                like they hear the user. Color still transitions on hover. */}
            <motion.div whileTap={reduce ? undefined : { scale: 0.97 }}>
              <Link
                id="hero-discover-events"
                href="/events"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary
                           px-6 py-3.5 text-base font-semibold text-black
                           transition-colors duration-200 hover:bg-[#1f83ff]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Discover events
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" weight="bold" />
              </Link>
            </motion.div>
            <motion.div whileTap={reduce ? undefined : { scale: 0.97 }}>
              <Link
                id="hero-host-event"
                href="/#host"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15
                           bg-white/[0.02] px-6 py-3.5 text-base font-semibold text-white
                           transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Host an event
              </Link>
            </motion.div>
          </motion.div>

          {/* Inline proof: woven into a sentence, not a big-number bar */}
          <motion.p
            variants={item}
            className="mt-8 text-sm text-slate-400"
          >
            Trusted by{" "}
            <span className="font-semibold text-slate-300">10,000+ students</span>{" "}
            across{" "}
            <span className="font-semibold text-slate-300">25+ events</span>. Built by
            organisers who lived the chaos.
          </motion.p>
        </div>

        {/* Right: product proof, AI face check-in, shown running */}
        <motion.div variants={panel} className="relative">
          {/* The device / product surface */}
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#0e0e12] p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            {/* Window chrome */}
            <div className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <ScanSmiley className="h-4 w-4 text-primary" aria-hidden="true" />
                Check-in · Nav Nirman 4.0
              </div>
              <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Live
              </span>
            </div>

            {/* Face scan viewport */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
              <div className="aspect-[4/3] w-full bg-[radial-gradient(120%_120%_at_50%_0%,rgba(52,145,255,0.14),transparent_55%)]">
                {/* Silhouette */}
                <svg
                  viewBox="0 0 200 150"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="scanClip">
                      <rect x="60" y="26" width="80" height="82" rx="8" />
                    </clipPath>
                  </defs>
                  {/* Single clean head + shoulders silhouette */}
                  <circle cx="100" cy="58" r="30" fill="rgba(255,255,255,0.10)" />
                  <path
                    d="M52 150 C52 116 72 96 100 96 C128 96 148 116 148 150 Z"
                    fill="rgba(255,255,255,0.08)"
                  />
                  {/* Face bounding brackets */}
                  <g stroke="#3491ff" strokeWidth="2" fill="none" strokeLinecap="round">
                    <path d="M62 40 v-10 h10" />
                    <path d="M138 40 v-10 h-10" />
                    <path d="M62 96 v10 h10" />
                    <path d="M138 96 v10 h-10" />
                  </g>
                  {/* Scan line */}
                  <g clipPath="url(#scanClip)">
                    <motion.rect
                      x="60"
                      width="80"
                      height="2"
                      fill="#3491ff"
                      initial={false}
                      animate={
                        !mounted || reduce ? { y: 74 } : { y: [26, 122, 26] }
                      }
                      transition={
                        !mounted || reduce
                          ? { duration: 0 }
                          : {
                              duration: 2.4,
                              /* Strong ease-in-out: the scan accelerates and
                                 decelerates like a real sensor sweep. */
                              ease: [0.77, 0, 0.175, 1],
                              repeat: Infinity,
                              /* Boot up after the panel has settled. */
                              delay: 0.6,
                            }
                      }
                      style={{ filter: "drop-shadow(0 0 6px rgba(52,145,255,0.9))" }}
                    />
                  </g>
                </svg>
              </div>

              {/* Matched result strip: reveals after the scan completes. */}
              <motion.div
                variants={strip}
                initial={mounted ? "hidden" : false}
                animate={mounted ? "show" : false}
                className="flex items-center gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-black">
                  <Check className="h-4 w-4" weight="bold" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    Ananya R. checked in
                  </p>
                  <p className="text-xs text-slate-400">
                    Face matched in 0.4s · pass verified
                  </p>
                </div>
              </motion.div>
            </div>

            {/* AI recommendation card - "show the intelligence".
               Reveals last, after the match confirms.
               Body wraps to two lines, so it carries extra bottom spacing. */}
            <motion.div
              variants={reco}
              initial={mounted ? "hidden" : false}
              animate={mounted ? "show" : false}
              className="mt-4 mb-2 rounded-xl border border-primary/25 bg-primary/[0.06] p-3.5"
            >
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
                Recommended for her
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">ESummit&apos;26</span> next
                Saturday. Matched to her past 3 events.
              </p>
            </motion.div>
          </div>

          {/* Floating live tally: product chrome, not a hero-metric bar.
              Springs into place last, giving the surface a sense of being
              alive. Subtle bounce (0.25) reads as playful, not gimmicky. */}
          <motion.div
            initial={mounted && !reduce ? { opacity: 0, y: 12, scale: 0.9 } : false}
            animate={mounted ? { opacity: 1, y: 0, scale: 1 } : false}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", duration: 0.6, bounce: 0.25, delay: 1.85 }
            }
            className="absolute -left-3 -bottom-4 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a] px-3.5 py-2 shadow-lg sm:flex"
          >
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300">
              <span className="font-semibold text-white">10,000+</span> students checked in
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}