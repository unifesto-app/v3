"use client";

import { motion } from "motion/react";
import { ChartLineUp, Sparkle } from "@phosphor-icons/react";
import Shell from "./Shell";

const ease = [0.22, 1, 0.36, 1] as const;

const bars = [38, 52, 46, 64, 58, 78, 71, 92];

export default function AnalyticsVisual({ reduce }: { reduce: boolean }) {
  return (
    <Shell
      label={
        <>
          <span className="flex items-center gap-2">
            <ChartLineUp className="h-4 w-4 text-primary" weight="bold" aria-hidden="true" />
            Event debrief
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live
          </span>
        </>
      }
    >
      {/* Stat row */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { v: "1,240", l: "Registered" },
          { v: "93%", l: "Checked in" },
          { v: "4.8", l: "Avg rating" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5"
          >
            <p className="text-base font-bold text-white">{s.v}</p>
            <p className="text-[10px] text-slate-400">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex h-24 items-end justify-between gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease }}
              className="flex-1 origin-bottom rounded-t"
              style={{
                height: `${h}%`,
                background:
                  i === bars.length - 1
                    ? "#3491ff"
                    : "rgba(52,145,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* AI debrief line */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4, ease }}
        className="mt-3 flex items-start gap-2.5 rounded-lg bg-primary/10 px-3 py-2.5"
      >
        <Sparkle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" weight="fill" aria-hidden="true" />
        <p className="text-[12px] leading-snug text-slate-200">
          Peak entry at 6:10 PM. Next time, open a second gate 20 min earlier.
        </p>
      </motion.div>
    </Shell>
  );
}
