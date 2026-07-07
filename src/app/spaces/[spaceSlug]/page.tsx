"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getSpaceBySlug, getSpaceById, getSpaceEvents, getSubSpaces, type Space, SPACE_TYPE_LABELS } from "@/lib/api/spaces";
import type { Event } from "@/lib/api/events";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ spaceSlug: string }>;
}

export default function SpacePage({ params }: Props) {
  const [spaceSlug, setSpaceSlug] = useState<string>("");
  const [space, setSpace] = useState<Space | null>(null);
  const [parentSpace, setParentSpace] = useState<Space | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [subSpaces, setSubSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpace = async () => {
      try {
        const { spaceSlug: slug } = await params;
        setSpaceSlug(slug);
        setLoading(true);

        const spaceData = await getSpaceBySlug(slug);
        if (!spaceData) {
          setSpace(null);
          setLoading(false);
          return;
        }
        setSpace(spaceData);

        // Load events, parent space (if sub-space), and sub-spaces in parallel
        const promises: Promise<any>[] = [
          getSpaceEvents(spaceData.id, 1, 50),
        ];
        
        // If this space has a parent, load the parent
        if (spaceData.parent_space_id) {
          promises.push(getSpaceById(spaceData.parent_space_id));
        } else {
          promises.push(Promise.resolve(null));
        }
        
        // Load sub-spaces
        promises.push(getSubSpaces(spaceData.id));
        
        const [eventsData, parentSpaceData, subSpacesData] = await Promise.all(promises);
        
        setEvents(eventsData?.events || []);
        setParentSpace(parentSpaceData || null);
        setSubSpaces(subSpacesData || []);

        setLoading(false);
      } catch (error) {
        console.error('Error loading space:', error);
        setSpace(null);
        setLoading(false);
      }
    };

    loadSpace();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3491ff]"></div>
        </div>
      </main>
    );
  }

  if (!space) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Navbar />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Space Not Found</h1>
          <p className="text-slate-400 mb-6">The space you're looking for doesn't exist or has been removed.</p>
          <Link href="/spaces" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]" style={{ background: brandGradient }}>
            Browse Spaces
          </Link>
        </div>
      </main>
    );
  }

  const upcomingCount = events.filter((e) => e.status === "published").length;

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Space Hero */}
      <section 
        className="relative pt-20 min-h-[450px] md:min-h-[550px] flex items-end pb-8 px-6 overflow-hidden"
        style={space.banner_url ? { backgroundImage: `url(${space.banner_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: brandGradient }}
      >
        {/* Gradient overlay to blend into page */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/60 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs text-white/50">
            <Link href="/spaces" className="hover:text-white transition-colors">Communities</Link>
            <span>/</span>
            {parentSpace && (
              <>
                <Link href={`/spaces/${parentSpace.slug || parentSpace.id}`} className="hover:text-white transition-colors">
                  {parentSpace.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white/70">{space.name}</span>
          </div>

          {/* Badge */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/10 text-white border border-white/10"
            >
              {SPACE_TYPE_LABELS[space.type] ?? space.type}
            </span>
            {space.is_verified && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Verified
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">{space.name}</h1>
          {space.description && (
            <p className="text-sm text-white/60 max-w-2xl leading-relaxed">{space.description}</p>
          )}
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-white/5 bg-black">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6 text-xs">
          {[
            { label: "Events Hosted", value: events.length },
            { label: "Active Events", value: upcomingCount },
            { label: "Members", value: (space.member_count || 0).toLocaleString() },
            { label: "Sub-Spaces", value: space.sub_space_count || subSpaces.length },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <p className="text-lg md:text-xl font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Parent Space (if this is a sub-space) */}
        {parentSpace && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-white mb-4">Part of</h2>
            <Link
              href={`/spaces/${parentSpace.slug || parentSpace.id}`}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                {parentSpace.logo_url ? (
                  <img 
                    src={parentSpace.logo_url} 
                    alt={parentSpace.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: brandGradient }}
                  >
                    {parentSpace.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-base font-semibold text-white group-hover:text-white/80 transition-colors">
                    {parentSpace.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {SPACE_TYPE_LABELS[parentSpace.type] || parentSpace.type}
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        )}

        {/* Sub-spaces */}
        {subSpaces.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-white mb-4">
              Sub-Spaces
              <span className="ml-2 text-xs font-normal text-slate-500">({subSpaces.length})</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {subSpaces.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/spaces/${sub.slug || sub.id}`}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 group"
                >
                  <div>
                    <p className="text-sm font-semibold text-white transition-colors">{sub.name}</p>
                    <p className="text-[10px] text-slate-500">{SPACE_TYPE_LABELS[sub.type]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Events */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white">
              Events
              <span className="ml-2 text-xs font-normal text-slate-500">({events.length})</span>
            </h2>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-16 border border-white/5 rounded-2xl">
              <p className="text-sm text-slate-500">No events from this space yet.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
