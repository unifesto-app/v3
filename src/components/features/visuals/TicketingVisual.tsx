"use client";

import { motion } from "motion/react";
import { Ticket } from "@phosphor-icons/react";
import Shell from "./Shell";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TicketingVisual({ reduce }: { reduce: boolean }) {
  return (
    <Shell
      label={
        <>
          <span className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary" weight="bold" aria-hidden="true" />
            Your pass
          </span>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            Confirmed
          </span>
        </>
      }
    >
      {/* Ticket with a perforation notch */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-primary/[0.14] to-transparent p-5">
        {/* notches */}
        <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#0e0e12]" />
        <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#0e0e12]" />

        <p className="text-lg font-bold text-white">Hack League 2026</p>
        <p className="mt-1 text-xs text-slate-300">Sat, 12 Apr · Main Auditorium</p>

        <div
          aria-hidden="true"
          className="my-4 border-t border-dashed border-white/15"
        />

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              Attendee
            </span>
            <span className="text-sm font-semibold text-white">Ananya R.</span>
            <span className="mt-2 text-[10px] uppercase tracking-wide text-slate-400">
              Seat
            </span>
            <span className="text-sm font-semibold text-white">H-214</span>
          </div>

          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4, ease }}
            className="grid grid-cols-5 gap-1"
          >
            {Array.from({ length: 25 }).map((_, k) => (
              <span
                key={k}
                className={`h-2 w-2 rounded-[3px] ${
                  [0, 2, 4, 6, 8, 11, 12, 13, 16, 18, 20, 22, 24].includes(k)
                    ? "bg-primary"
                    : "bg-white/15"
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4, ease }}
        className="mt-3 flex items-center justify-between text-[11px]"
      >
        <span className="text-slate-400">Delivered to inbox</span>
        <span className="font-medium text-primary">3 on waitlist · auto-promote</span>
      </motion.div>
    </Shell>
  );
}
