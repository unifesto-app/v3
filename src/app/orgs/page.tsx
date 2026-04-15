"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllOrgs, getSubOrgs, ORG_TYPE_LABELS, type Org } from "@/lib/mockEvents";
import { brandGradient, gradientText } from "@/lib/styles";

const TYPE_FILTERS = [
  { key: "all", label: "All" },
  { key: "university", label: "Universities" },
  { key: "department", label: "Departments" },
  { key: "club", label: "Clubs & Cells" },
  { key: "community", label: "Communities" },
  { key: "individual", label: "Individuals" },
];

function OrgCard({ org }: { org: Org }) {
  const children = getSubOrgs(org.id);
  return (
    <Link
      href={`/org/${org.id}`}
      className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden"
    >
      {/* Poster */}
      <div className="relative h-32 flex items-end p-3 overflow-hidden" style={{ background: brandGradient }}>
        {/* Subtle sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-sm bg-white/10 text-black border border-white/10"
          >
            {ORG_TYPE_LABELS[org.type]}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-extrabold text-white transition-colors leading-snug">
            {org.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{org.description}</p>

        {/* Sub-orgs count */}
        {children.length > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {children.length} sub-organisation{children.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-[10px] text-slate-600">Malla Reddy University</span>
          <span className="text-[10px] font-semibold group-hover:translate-x-0.5 transition-all duration-200" style={gradientText}>View →</span>
        </div>
      </div>
    </Link>
  );
}

function OrgsContent() {
  const searchParams = useSearchParams();
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") ?? "all");
  const [query, setQuery] = useState("");

  const allOrgs = getAllOrgs();

  const filtered = useMemo(() => {
    const lcQuery = query.toLowerCase();
    return allOrgs.filter((o) => {
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "club" ? (o.type === "club" || o.type === "cell") : o.type === typeFilter);
      const matchesQuery =
        !query || o.name.toLowerCase().includes(lcQuery) || o.description.toLowerCase().includes(lcQuery);
      return matchesType && matchesQuery;
    });
  }, [allOrgs, typeFilter, query]);

  // Top-level orgs for hierarchy view (no parent)
  const topLevel = filtered.filter((o) => !o.parentOrgId);
  // Child orgs separately
  const childOrgs = filtered.filter((o) => !!o.parentOrgId);

  const showHierarchy = typeFilter === "all" && !query;

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="relative pt-28 pb-10 px-6 border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% -10%, rgba(52,145,255,0.07) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={gradientText}>Browse</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Organisations</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl">
            Universities, departments, clubs, communities & individuals — all the organisers behind events on Unifesto.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search + type filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="orgs-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organisations..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 overflow-x-auto">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTypeFilter(t.key)}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200"
                style={typeFilter === t.key ? { background: brandGradient, color: "#000" } : { color: "#64748b" }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hierarchy view — all orgs, grouped by top level */}
        {showHierarchy ? (
          <div className="space-y-10">
            {topLevel.map((parent) => {
              const children = allOrgs.filter((o) => o.parentOrgId === parent.id);
              return (
                <div key={parent.id}>
                  {/* Parent and its children in same grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <OrgCard org={parent} />
                    {children.map((child) => (
                      <OrgCard key={child.id} org={child} />
                    ))}
                  </div>
                  
                  {/* Grandchildren if any */}
                  {children.some((child) => allOrgs.some((o) => o.parentOrgId === child.id)) && (
                    <div className="ml-6 pl-4 border-l border-white/5 mt-5">
                      <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-3">
                        Sub-organisations
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {children.map((child) => {
                          const grandchildren = allOrgs.filter((o) => o.parentOrgId === child.id);
                          return grandchildren.map((gc) => <OrgCard key={gc.id} org={gc} />);
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Flat grid for filtered view */
          <div>
            <p className="text-xs text-slate-600 mb-5">
              {filtered.length} organisation{filtered.length !== 1 ? "s" : ""}
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((o) => <OrgCard key={o.id} org={o} />)}
              </div>
            ) : (
              <div className="text-center py-20 border border-white/5 rounded-2xl">
                <p className="text-sm text-slate-500">No organisations match your search.</p>
                <button onClick={() => { setQuery(""); setTypeFilter("all"); }} className="mt-3 text-xs font-medium hover:text-white transition-colors" style={gradientText}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function OrgsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <OrgsContent />
    </Suspense>
  );
}
