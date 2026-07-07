"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSpaces, SPACE_TYPE_LABELS, SPACE_TYPES, type Space } from "@/lib/api/spaces";
import { brandGradient, gradientText } from "@/lib/styles";

function SpaceCard({ space }: { space: Space }) {
  const subSpacesCount = space.sub_space_count || 0;

  return (
    <Link
      href={`/spaces/${space.slug || space.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05]"
    >
      {/* Poster: dark field with the on-brand radial gradient, matching the blog cards. */}
      <div
        className="relative flex h-32 items-end overflow-hidden bg-[#0a0a0d] p-5"
        style={space.banner_url ? { backgroundImage: `url(${space.banner_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        {space.banner_url ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          />
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_0%,rgba(52,145,255,0.18),transparent_60%)]"
          />
        )}

        {/* Type pill, matching the blog card kicker. */}
        <span className="relative z-10 rounded-full border border-primary/25 bg-primary/12 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {SPACE_TYPE_LABELS[space.type] || space.type}
        </span>

        {/* Logo if available */}
        {space.logo_url && (
          <div className="absolute bottom-3 right-3 z-10 w-12 h-12 rounded-lg bg-white/90 p-1 shadow-lg">
            <img src={space.logo_url} alt={space.name} className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-extrabold text-white transition-colors leading-snug">
            {space.name}
          </h3>
        </div>

        {/* Description */}
        {space.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{space.description}</p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 text-[10px] text-slate-600">
          {subSpacesCount > 0 && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {subSpacesCount} sub-space{subSpacesCount !== 1 ? "s" : ""}
            </div>
          )}
          {space.member_count && space.member_count > 0 && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {space.member_count} member{space.member_count !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-[10px] text-slate-600">{space.city || space.state || 'Space'}</span>
          <span className="text-[10px] font-semibold group-hover:translate-x-0.5 transition-all duration-200" style={gradientText}>View →</span>
        </div>
      </div>
    </Link>
  );
}

function SpacesContent() {
  const searchParams = useSearchParams();
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") ?? "all");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allSpaces, setAllSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  // Load spaces from API
  useEffect(() => {
    const loadSpaces = async () => {
      setLoading(true);
      try {
        const filters: any = { is_active: true };
        if (typeFilter !== "all") filters.type = typeFilter;
        
        const response = await getSpaces(1, 100, filters);
        setAllSpaces(response.spaces);
      } catch (error) {
        console.error("Error loading spaces:", error);
        setAllSpaces([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadSpaces();
  }, [typeFilter]);

  const filtered = useMemo(() => {
    const lcQuery = query.toLowerCase();
    return allSpaces.filter((o) => {
      const matchesQuery =
        !query || o.name.toLowerCase().includes(lcQuery) || o.description?.toLowerCase().includes(lcQuery);
      return matchesQuery;
    });
  }, [allSpaces, query]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [typeFilter, query]);

  // Top-level spaces for hierarchy view (no parent)
  const topLevel = filtered.filter((o) => !o.parent_space_id);

  const showHierarchy = typeFilter === "all" && !query;

  // Pagination for flat view
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSpaces = filtered.slice(startIndex, endIndex);

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
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Spaces</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl">
            Universities, clubs and communities: all the organisers behind events on Unifesto.
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
              id="spaces-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search spaces..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 overflow-x-auto">
            {SPACE_TYPES.map((t) => (
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

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3491ff]"></div>
          </div>
        ) : (
          <>
            {/* Hierarchy view: all spaces, grouped by top level */}
            {showHierarchy ? (
              <div className="space-y-10">
            {topLevel.map((parent) => {
              const children = allSpaces.filter((o) => o.parent_space_id === parent.id);
              return (
                <div key={parent.id}>
                  {/* Parent and its children in same grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <SpaceCard space={parent} />
                    {children.map((child) => (
                      <SpaceCard key={child.id} space={child} />
                    ))}
                  </div>
                  
                  {/* Grandchildren if any */}
                  {children.some((child) => allSpaces.some((o) => o.parent_space_id === child.id)) && (
                    <div className="ml-6 pl-4 border-l border-white/5 mt-5">
                      <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-3">
                        Sub-spaces
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {children.map((child) => {
                          const grandchildren = allSpaces.filter((o) => o.parent_space_id === child.id);
                          return grandchildren.map((gc) => <SpaceCard key={gc.id} space={gc} />);
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
              {filtered.length} space{filtered.length !== 1 ? "s" : ""}
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
            {filtered.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                  {paginatedSpaces.map((o) => <SpaceCard key={o.id} space={o} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8 border-t border-white/5">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg px-4 py-2 text-sm font-medium border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all duration-200"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                        const showEllipsis = (page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2);
                        
                        if (showEllipsis) {
                          return <span key={page} className="px-2 text-slate-600">...</span>;
                        }
                        
                        if (!showPage) return null;
                        
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className="rounded-lg w-10 h-10 text-sm font-medium transition-all duration-200"
                            style={
                              currentPage === page
                                ? { background: brandGradient, color: "#000" }
                                : { border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }
                            }
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-lg px-4 py-2 text-sm font-medium border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500">No spaces found</p>
              </div>
            )}
          </div>
        )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function SpacesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SpacesContent />
    </Suspense>
  );
}
