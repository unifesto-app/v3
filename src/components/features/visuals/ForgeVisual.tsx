"use client";

import { motion } from "motion/react";
import { Hammer, Check } from "@phosphor-icons/react";
import Shell from "./Shell";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { label: "Details", done: true },
  { label: "Branding", done: true },
  { label: "Tickets", done: true },
  { label: "Publish", done: false },
];

export default function ForgeVisual({ reduce }: { reduce: boolean }) {
  return (
    <Shell
      label={
        <>
          <span className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-primary" weight="bold" aria-hidden="true" />
            Forge · New event
          </span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
            Draft
          </span>
        </>
      }
    >
      {/* Progress rail */}
      <div className="mb-4 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center gap-2">
            <motion.span
              initial={reduce ? false : { scale: 0.6, opacity: 0 }}
              whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.35, ease }}
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                s.done
                  ? "bg-primary text-black"
                  : "border border-primary/40 text-primary"
              }`}
            >
              {s.done ? <Check className="h-3 w-3" weight="bold" /> : i + 1}
            </motion.span>
            {i < steps.length - 1 && (
              <span className="h-px flex-1 bg-white/10" />
            )}
          </div>
        ))}
      </div>

      {/* Mock form */}
      <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Event name</p>
          <p className="mt-1 text-sm font-semibold text-white">Design Systems Jam</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">Date</p>
            <p className="mt-1 text-sm font-medium text-slate-200">Sat, 12 Apr</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">Space</p>
            <p className="mt-1 text-sm font-medium text-slate-200">Innovation Lab</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.4, ease }}
        className="mt-3 flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2.5"
      >
        <span className="text-xs font-medium text-primary">Live on the feed</span>
        <span className="text-[11px] text-slate-400">in 4 min 20 s</span>
      </motion.div>
    </Shell>
  );
}
