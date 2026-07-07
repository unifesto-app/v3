"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import {
  Compass,
  Hammer,
  ScanSmiley,
  Ticket,
  ChartLineUp,
  ArrowRight,
  Check,
} from "@phosphor-icons/react";

import DiscoveryVisual from "./visuals/DiscoveryVisual";
import ForgeVisual from "./visuals/ForgeVisual";
import GateVisual from "./visuals/GateVisual";
import TicketingVisual from "./visuals/TicketingVisual";
import AnalyticsVisual from "./visuals/AnalyticsVisual";

const ease = [0.22, 1, 0.36, 1] as const;

type Capability = { title: string; desc: string };

type Feature = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  capabilities: Capability[];
  platforms: string[];
  cta: { label: string; href: string };
  Icon: typeof Compass;
  Visual: (props: { reduce: boolean }) => React.ReactElement;
};

const FEATURES: Feature[] = [
  {
    id: "event-discovery",
    index: "01",
    eyebrow: "Discovery",
    title: "Every event, in one feed.",
    lede: "No more scattered WhatsApp groups and torn-down posters. Unifesto pulls every fest, workshop and club night into a single feed, then ranks it by what's trending and what actually fits you.",
    capabilities: [
      { title: "Unified feed", desc: "Every event in one place, web and app." },
      { title: "Smart filters", desc: "By category, date, space and organiser." },
      { title: "AI recommendations", desc: "Matched to what you've shown up for before." },
      { title: "Trending now", desc: "See what everyone is filling up for today." },
      { title: "Search & browse", desc: "Find anything by name, keyword or space." },
      { title: "Save for later", desc: "Bookmark events and get nudged before they start." },
    ],
    platforms: ["Website", "App"],
    cta: { label: "Explore events", href: "/events" },
    Icon: Compass,
    Visual: DiscoveryVisual,
  },
  {
    id: "forge",
    index: "02",
    eyebrow: "Forge",
    title: "Launch an event before your chai goes cold.",
    lede: "Forge is the organiser workspace, a full dashboard on the web and a dedicated mode in the app. Build, brand and publish an event to the discovery feed in under five minutes, with your whole team alongside you.",
    capabilities: [
      { title: "Organiser dashboard", desc: "A full web workspace to run every event." },
      { title: "Organiser mode in-app", desc: "Manage on the go, straight from your phone." },
      { title: "Five-minute setup", desc: "Simple forms, no onboarding maze." },
      { title: "Your branding", desc: "Banners, logos and custom descriptions." },
      { title: "Team collaboration", desc: "Bring co-organisers into the same event." },
      { title: "Instant publish", desc: "Goes live on the feed the moment you hit go." },
    ],
    platforms: ["Organiser Dashboard", "App"],
    cta: { label: "Start hosting", href: "/#host" },
    Icon: Hammer,
    Visual: ForgeVisual,
  },
  {
    id: "gate",
    index: "03",
    eyebrow: "Gate",
    title: "Your face is the ticket.",
    lede: "Gate lives in the app and turns entry into a half-second glance. Face check-in, QR fallback, live counts that sync straight to analytics, and it keeps scanning even when the venue Wi-Fi gives up.",
    capabilities: [
      { title: "AI face check-in", desc: "Look up, you're in. Verified in 0.4s." },
      { title: "Instant QR scan", desc: "Lightning-fast recognition as a fallback." },
      { title: "Live attendance", desc: "Counts sync to analytics in real time." },
      { title: "Duplicate guard", desc: "Automatic detection of repeat entries." },
      { title: "Multi-gate", desc: "Many scanners running one big event." },
      { title: "Works offline", desc: "Keeps scanning, syncs once you're back." },
    ],
    platforms: ["App"],
    cta: { label: "See it live", href: "/#host" },
    Icon: ScanSmiley,
    Visual: GateVisual,
  },
  {
    id: "ticketing-rsvp",
    index: "04",
    eyebrow: "Ticketing",
    title: "Free RSVPs and paid tickets, one flow.",
    lede: "Open the doors with a free RSVP or run a paid event through an integrated gateway. Every registration mints a unique QR pass, lands in the attendee's inbox, and manages its own waitlist.",
    capabilities: [
      { title: "Free RSVP", desc: "No-cost registration for open events." },
      { title: "Paid ticketing", desc: "Integrated gateway for priced events." },
      { title: "Unique QR passes", desc: "A distinct code minted per registration." },
      { title: "Instant delivery", desc: "The pass hits their inbox immediately." },
      { title: "Waitlists", desc: "Auto-promote the moment a seat opens." },
      { title: "Custom forms", desc: "Collect exactly what your event needs." },
    ],
    platforms: ["Web App"],
    cta: { label: "Start hosting", href: "/#host" },
    Icon: Ticket,
    Visual: TicketingVisual,
  },
  {
    id: "analytics",
    index: "05",
    eyebrow: "Analytics",
    title: "Walk away with the debrief, not a spreadsheet.",
    lede: "The intelligence layer. Live registration and check-in metrics while the event runs, a full breakdown when it ends, and an AI debrief that tells you what worked, exportable the second you need it.",
    capabilities: [
      { title: "Live dashboard", desc: "Attendance and registration as it happens." },
      { title: "Attendance reports", desc: "Check-in data down to the timestamp." },
      { title: "Funnel analytics", desc: "Sign-ups, drop-offs and conversion." },
      { title: "Audience insight", desc: "Understand who actually showed up." },
      { title: "Export anywhere", desc: "CSV and PDF, one click away." },
      { title: "Historical trends", desc: "Compare across every event you've run." },
    ],
    platforms: ["Web App"],
    cta: { label: "Start hosting", href: "/#host" },
    Icon: ChartLineUp,
    Visual: AnalyticsVisual,
  },
];

export default function FeaturesContent() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(FEATURES[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const flowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    const els = Object.values(sectionRefs.current).filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fade: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.6, ease },
    },
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-16 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55rem 34rem at 78% 8%, rgba(52,145,255,0.16), transparent 62%)",
          }}
        />
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
          }}
          className="relative z-10 mx-auto max-w-5xl"
        >
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium tracking-wide text-slate-300">
              Five pillars, one platform
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            className="mt-6 max-w-3xl font-agrandir text-[clamp(2.5rem,6.4vw,5rem)] font-bold leading-[0.98] text-white [text-wrap:balance]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Everything an event needs, and{" "}
            <span className="text-primary">nothing it doesn&apos;t.</span>
          </motion.h1>

          <motion.p
            variants={fade}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            Discovery, Forge, Gate, Ticketing and Analytics: the five parts of
            the platform that take an event from a poster to a debrief without a
            single spreadsheet in between.
          </motion.p>

          {/* Meta strip, replaces the chip nav; the sticky tab-bar below handles jumps */}
          <motion.dl
            variants={fade}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4"
          >
            {[
              { k: "Pillars", v: "05" },
              { k: "Surfaces", v: "Web + App" },
              { k: "Setup", v: "< 5 min" },
              { k: "Spreadsheets", v: "Zero" },
            ].map((stat) => (
              <div key={stat.k}>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  {stat.k}
                </dt>
                <dd className="mt-1.5 font-agrandir text-xl font-bold text-white tabular-nums">
                  {stat.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </section>

      {/* ── Sticky pillar tab-bar + scroll progress ──────────────────── */}
      <div className="sticky top-0 z-30 border-y border-white/[0.07] bg-canvas/80 backdrop-blur-xl">
        <nav
          aria-label="Platform pillars"
          className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FEATURES.map((f) => {
            const Icon = f.Icon;
            const isActive = active === f.id;
            return (
              <a
                key={f.id}
                href={`#${f.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex flex-shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200"
              >
                <Icon
                  className={`h-4 w-4 transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                  weight="bold"
                  aria-hidden="true"
                />
                <span
                  className={`transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  <span className="mr-1.5 tabular-nums text-xs text-slate-600">
                    {f.index}
                  </span>
                  {f.eyebrow}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="pillar-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
        <motion.div
          aria-hidden="true"
          className="h-0.5 origin-left bg-primary"
          style={{ scaleX: reduce ? 0 : progress }}
        />
      </div>

      {/* ── Feature chapters ─────────────────────────────────────────── */}
      <div ref={flowRef} className="relative">
        {FEATURES.map((feature, i) => {
          const { Icon, Visual } = feature;
          const flip = i % 2 === 1;
          return (
            <motion.section
              key={feature.id}
              id={feature.id}
              ref={(el) => {
                sectionRefs.current[feature.id] = el;
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
              }}
              className="relative scroll-mt-20 border-b border-white/[0.06] py-20 md:py-28"
            >
              {/* Oversized index watermark, anchored to the chapter */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-10 select-none font-agrandir text-[7rem] font-bold leading-none text-white/[0.03] md:text-[10rem] lg:right-16"
              >
                {feature.index}
              </span>

              <div className="mx-auto max-w-6xl px-6">
                {/* Chapter header, full width, sits above the split */}
                <motion.div variants={fade} className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" weight="bold" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      {feature.eyebrow}
                    </span>
                  </div>
                  <h2
                    className="mt-6 font-agrandir text-[clamp(1.9rem,4.4vw,3.25rem)] font-bold leading-[1.0] text-white [text-wrap:balance]"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {feature.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                    {feature.lede}
                  </p>
                </motion.div>

                {/* Split: large visual panel + capability rail. Alternates side. */}
                <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  {/* Visual, takes the wider column */}
                  <motion.div
                    variants={fade}
                    className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <Visual reduce={!!reduce} />
                  </motion.div>

                  {/* Capability rail, stacked list with dividers, not cards */}
                  <div
                    className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <motion.ul
                      variants={fade}
                      className="divide-y divide-white/[0.07]"
                    >
                      {feature.capabilities.map((cap) => (
                        <li key={cap.title} className="flex gap-3 py-3.5 first:pt-0">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"
                          >
                            <Check className="h-3 w-3" weight="bold" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {cap.title}
                            </p>
                            <p className="mt-0.5 text-[13px] leading-snug text-slate-400">
                              {cap.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </motion.ul>

                    <motion.div
                      variants={fade}
                      className="mt-7 flex flex-wrap items-center gap-3"
                    >
                      <Link
                        href={feature.cta.href}
                        className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#1f83ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      >
                        {feature.cta.label}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          weight="bold"
                        />
                      </Link>
                      <div className="flex flex-wrap gap-2">
                        {feature.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(52,145,255,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
          style={{
            background: "linear-gradient(90deg, transparent, #3491ff, transparent)",
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
          }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fade}
            className="font-agrandir text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.03] text-white [text-wrap:balance]"
            style={{ letterSpacing: "-0.035em" }}
          >
            Five pillars. One platform.{" "}
            <span className="text-primary">Zero spreadsheets.</span>
          </motion.h2>
          <motion.p
            variants={fade}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg"
          >
            Join the organisers already running their events on Unifesto, from
            the first poster to the final debrief.
          </motion.p>
          <motion.div
            variants={fade}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/#host"
              className="w-full rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              Start hosting events
            </Link>
            <Link
              href="/events"
              className="w-full rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-primary/50 hover:text-primary sm:w-auto"
            >
              Explore events
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
