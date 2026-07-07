"use client";

import { motion } from "motion/react";
import { ScanSmiley } from "@phosphor-icons/react";
import Shell from "./Shell";

const ease = [0.22, 1, 0.36, 1] as const;

export default function GateVisual({ reduce }: { reduce: boolean }) {
  return (
    <Shell
      label={
        <>
          <span className="flex items-center gap-2">
            <ScanSmiley className="h-4 w-4 text-primary" weight="bold" aria-hidden="true" />
            Gate 1 · Face check-in
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Offline-ready
          </span>
        </>
      }
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
        <div className="aspect-[16/10] w-full bg-[radial-gradient(120%_120%_at_50%_0%,rgba(52,145,255,0.16),transparent_55%)]">
          <svg viewBox="0 0 200 125" className="h-full w-full" aria-hidden="true">
            <circle cx="100" cy="50" r="26" fill="rgba(255,255,255,0.10)" />
            <path
              d="M60 125 C60 96 78 80 100 80 C122 80 140 96 140 125 Z"
              fill="rgba(255,255,255,0.08)"
            />
            <g stroke="#3491ff" strokeWidth="2" fill="none" strokeLinecap="round">
              <path d="M66 36 v-9 h9" />
              <path d="M134 36 v-9 h-9" />
              <path d="M66 82 v9 h9" />
              <path d="M134 82 v9 h-9" />
            </g>
            <motion.rect
              x="64"
              width="72"
              height="2"
              fill="#3491ff"
              initial={false}
              animate={reduce ? { y: 58 } : { y: [28, 90, 28] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 2.2, ease: [0.77, 0, 0.175, 1], repeat: Infinity }
              }
              style={{ filter: "drop-shadow(0 0 6px rgba(52,145,255,0.9))" }}
            />
          </svg>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5">
        <div>
          <p className="text-sm font-semibold text-white">Ananya R.</p>
          <p className="text-[11px] text-slate-400">Verified · pass #H-214</p>
        </div>
        <motion.span
          initial={reduce ? false : { scale: 0.7, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4, ease }}
          className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary"
        >
          0.4s
        </motion.span>
      </div>
    </Shell>
  );
}
