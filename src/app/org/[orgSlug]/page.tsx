"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getOrganizationBySlug, getOrganizationById, getOrganizationEvents, getSubOrganizations, type Organization, ORG_TYPE_LABELS } from "@/lib/api/organizations";
import type { Event } from "@/lib/api/events";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ orgSlug: string }>;
}

export default function OrgPage({ params }: Props) {
  const [orgSlug, setOrgSlug] = useState<string>("");
  const [org, setOrg] = useState<Organization | null>(null);
  const [parentOrg, setParentOrg] = useState<Organization | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [subOrgs, setSubOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrg = async () => {
      try {
        const { orgSlug: slug } = await params;
        setOrgSlug(slug);
        setLoading(true);

        const orgData = await getOrganizationBySlug(slug);
        if (!orgData) {
          setOrg(null);
          setLoading(false);
          return;
        }
        setOrg(orgData);

        // Load events, parent org (if sub-org), and sub-orgs in parallel
        const promises: Promise<any>[] = [
          getOrganizationEvents(orgData.id, 1, 50),
        ];
        
        // If this org has a parent, load the parent
        if (orgData.parent_org_id) {
          promises.push(getOrganizationById(orgData.parent_org_id));
        } else {
          promises.push(Promise.resolve(null));
        }
        
        // Load sub-organizations
        promises.push(getSubOrganizations(orgData.id));
        
        const [eventsData, parentOrgData, subOrgsData] = await Promise.all(promises);
        
        setEvents(eventsData?.events || []);
        setParentOrg(parentOrgData?.organization || null);
        setSubOrgs(subOrgsData?.organizations || []);

        setLoading(false);
      } catch (error) {
        console.error('Error loading organization:', error);
        setOrg(null);
        setLoading(false);
      }
    };

    loadOrg();
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

  if (!org) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Navbar />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Organization Not Found</h1>
          <p className="text-slate-400 mb-6">The organization you're looking for doesn't exist or has been removed.</p>
          <Link href="/org" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)]" style={{ background: brandGradient }}>
            Browse Organizations
          </Link>
        </div>
      </main>
    );
  }

  const upcomingCount = events.filter((e) => e.status === "published").length;
  const totalAttendees = events.reduce((sum, e) => sum + (e.max_attendees || 0), 0);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Org Hero */}
      <section 
        className="relative pt-20 min-h-[450px] md:min-h-[550px] flex items-end pb-8 px-6 overflow-hidden"
        style={org.banner_url ? { backgroundImage: `url(${org.banner_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: brandGradient }}
      >
        {/* Gradient overlay to blend into page */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/60 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs text-white/50">
            <Link href="/org" className="hover:text-white transition-colors">Communities</Link>
            <span>/</span>
            {parentOrg && (
              <>
                <Link href={`/org/${parentOrg.slug || parentOrg.id}`} className="hover:text-white transition-colors">
                  {parentOrg.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-white/70">{org.name}</span>
          </div>

          {/* Badge */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/10 text-white border border-white/10"
            >
              {ORG_TYPE_LABELS[org.type] ?? org.type}
            </span>
            {org.is_verified && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Verified
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">{org.name}</h1>
          {org.description && (
            <p className="text-sm text-white/60 max-w-2xl leading-relaxed">{org.description}</p>
          )}
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-white/5 bg-black">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6 text-xs">
          {[
            { label: "Events Hosted", value: events.length },
            { label: "Active Events", value: upcomingCount },
            { label: "Members", value: (org.member_count || 0).toLocaleString() },
            { label: "Sub-Organizations", value: org.sub_org_count || subOrgs.length },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <p className="text-lg md:text-xl font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Parent Organization (if this is a sub-org) */}
        {parentOrg && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-white mb-4">Part of</h2>
            <Link
              href={`/org/${parentOrg.slug || parentOrg.id}`}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                {parentOrg.logo_url ? (
                  <img 
                    src={parentOrg.logo_url} 
                    alt={parentOrg.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: brandGradient }}
                  >
                    {parentOrg.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-base font-semibold text-white group-hover:text-white/80 transition-colors">
                    {parentOrg.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {ORG_TYPE_LABELS[parentOrg.type] || parentOrg.type}
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        )}

        {/* Sub-organisations */}
        {subOrgs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-white mb-4">
              Sub-Organizations
              <span className="ml-2 text-xs font-normal text-slate-500">({subOrgs.length})</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {subOrgs.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/org/${sub.slug}`}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 group"
                >
                  <div>
                    <p className="text-sm font-semibold text-white transition-colors">{sub.name}</p>
                    <p className="text-[10px] text-slate-500">{ORG_TYPE_LABELS[sub.type]}</p>
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
              <p className="text-sm text-slate-500">No events from this organisation yet.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
