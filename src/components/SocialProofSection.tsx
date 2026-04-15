"use client";

import { useEffect, useRef, useState } from "react";
import { gradientText } from "@/lib/styles";

const stats = [
  { value: 10000, suffix: "+", label: "Active Students", duration: 2000 },
  { value: 25, suffix: "+", label: "Events Hosted", duration: 1200 },
  { value: 10, suffix: "+", label: "Collaborations", duration: 1000 },
  { value: 3, suffix: "", label: "Campus Clubs", duration: 800 },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, duration, active }: typeof stats[0] & { active: boolean }) {
  const count = useCountUp(value, duration, active);
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
      <span className="text-4xl md:text-5xl font-black text-white mb-1">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-slate-500 font-medium">{label}</span>
    </div>
  );
}

export default function SocialProofSection() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="social-proof" aria-labelledby="proof-heading" className="relative bg-black py-20 md:py-24 px-6">
      {/* Gradient top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #3491ff, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={gradientText}>
          By the numbers
        </p>
        <h2 id="proof-heading" className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
          Trusted by students across campus
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mb-12">
          Real events. Real attendees. Real impact.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
