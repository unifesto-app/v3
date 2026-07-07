"use client";

import { motion } from "motion/react";
import { Compass, TrendUp } from "@phosphor-icons/react";
import Shell from "./Shell";

const ease = [0.22, 1, 0.36, 1] as const;

const events = [
  { name: "ESummit '26", meta: "Entrepreneurship · Fri", tag: "Trending", live: true },
  { name: "Hack League", meta: "48h build · This week", tag: "Filling up", live: false },
  { name: "MUN Conclave", meta: "Debate · Sat", tag: "For you", live: false },
  { name: "Indie Night", meta: "Music · Tonight", tag: "New", live: false },
];

export default function DiscoveryVisual({ reduce }: { reduce: boolean }) {
  return (
    <Shell
      label={
        <>
          <span className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" weight="bold" aria-hidden="true" />
            Your event feed
          </span>
          <span className="flex items-center gap-1 text-[11px] text-primary">
            <TrendUp className="h-3.5 w-3.5" weight="bold" aria-hidden="true" />
            Ranked for you
          </span>
        </>
      }
    >
      <ul className="space-y-2">
        {events.map((ev, i) => (
          <motion.li
            key={ev.name}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.09, duration: 0.4, ease }}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{ev.name}</p>
              <p className="truncate text-[11px] text-slate-400">{ev.meta}</p>
            </div>
            <span
              className={`ml-3 flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                ev.live
                  ? "bg-primary/15 text-primary"
                  : "bg-white/5 text-slate-300"
              }`}
            >
              {ev.tag}
            </span>
          </motion.li>
        ))}
      </ul>
    </Shell>
  );
}
