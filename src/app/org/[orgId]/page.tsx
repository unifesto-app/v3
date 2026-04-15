import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getOrgById, getEventsByOrgTree, getSubOrgs, getAllOrgs, getParentChain, ORG_TYPE_LABELS } from "@/lib/mockEvents";
import { brandGradient, gradientText } from "@/lib/styles";

interface Props {
  params: Promise<{ orgId: string }>;
}

export async function generateStaticParams() {
  return getAllOrgs().map((o) => ({ orgId: o.id }));
}

export async function generateMetadata({ params }: Props) {
  const { orgId } = await params;
  const org = getOrgById(orgId);
  if (!org) return { title: "Organisation Not Found — Unifesto" };
  return {
    title: `${org.name} — Unifesto`,
    description: org.description,
  };
}



export default async function OrgPage({ params }: Props) {
  const { orgId } = await params;
  const org = getOrgById(orgId);
  if (!org) notFound();

  const events = getEventsByOrgTree(orgId);
  const subOrgs = getSubOrgs(orgId);
  const parentChain = getParentChain(orgId);
  const upcomingCount = events.filter((e) => e.status.includes("upcoming")).length;
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Org Hero */}
      <section 
        className="relative pt-20 min-h-[450px] md:min-h-[550px] flex items-end pb-8 px-6 overflow-hidden"
        style={{ background: brandGradient }}
      >
        {/* Gradient overlay to blend into page */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)" }}
          aria-hidden="true"
        />
        {/* Sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs text-white/50">
            <Link href="/orgs" className="hover:text-white transition-colors">Communities</Link>
            {parentChain.map((p) => (
              <span key={p.id} className="contents">
                <span>/</span>
                <Link href={`/org/${p.id}`} className="hover:text-white transition-colors">{p.name}</Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-white/70">{org.name}</span>
          </div>

          {/* Badge */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/10 text-black border border-white/10"
            >
              {ORG_TYPE_LABELS[org.type] ?? org.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">{org.name}</h1>
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed">{org.description}</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-white/5 bg-black">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6 text-xs">
          {[
            { label: "Events Hosted", value: events.length },
            { label: "Upcoming", value: upcomingCount },
            { label: "Total Attendees", value: totalAttendees.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <p className="text-lg md:text-xl font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Sub-organisations (e.g., clubs under MRUH) */}
        {subOrgs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-base font-bold text-white mb-4">
              Clubs & Departments
              <span className="ml-2 text-xs font-normal text-slate-500">({subOrgs.length})</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {subOrgs.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/org/${sub.id}`}
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
            <Link href={`/events?orgId=${org.id}`} className="text-xs font-medium" style={gradientText}>
              View all →
            </Link>
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
