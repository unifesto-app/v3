import type { ReactNode } from "react";

/** Shared device chrome for feature visuals, matches the homepage fragments. */
export default function Shell({
  label,
  children,
}: {
  label?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-4 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
      {label ? (
        <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-400">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
}
