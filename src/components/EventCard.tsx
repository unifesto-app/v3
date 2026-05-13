"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Event } from "@/lib/api/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

import { brandGradient } from "@/lib/styles";



export default function EventCard({ event, index = 0 }: EventCardProps) {
  const router = useRouter();
  const isCompleted = event.status === "completed" || event.status === "cancelled";
  const isFree = event.is_free;
  const spotsLeft = event.max_attendees ? event.max_attendees : 0;
  const isLowSpots = spotsLeft > 0 && spotsLeft <= 30;
  const delayClass = ["", "animate-delay-100", "animate-delay-200", "animate-delay-300", "animate-delay-400"][index % 5] ?? "";
  
  // Format date
  const eventDate = new Date(event.start_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
  // Get location
  const location = event.venue || event.city || event.state || 'Online';
  
  // Get image
  const imageUrl = event.banner_url || event.thumbnail_url || event.image_url;
  
  // Get organization name
  const organizerName = event.organization?.name || 'Organizer';
  
  // Generate poster gradient based on event ID
  const generatePosterGradient = (id: string) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    ];
    
    // Simple hash function to get consistent gradient for same ID
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash;
    }
    return gradients[Math.abs(hash) % gradients.length];
  };
  
  const posterGradient = generatePosterGradient(event.id);

  return (
    // Outer div — NOT an <a>, avoids nested <a> violation
    <div
      id={`event-card-${event.id}`}
      role="article"
      aria-label={`${event.title} by ${organizerName}`}
      onClick={() => router.push(`/events/${event.slug}`)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(`/events/${event.slug}`); }}
      tabIndex={0}
      className={`animate-fade-in-up ${delayClass} group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/10 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(52,145,255,0.2)] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3491ff]`}
    >
      {/* Poster */}
      <div
        className="relative h-40 flex items-end p-3 overflow-hidden"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: posterGradient }}
      >
        {/* Overlay for better text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Tag badges */}
        <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1 max-w-[60%]">
          {event.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm bg-white/10 text-white border-white/20"
            >
              {tag}
            </span>
          ))}
          {event.is_trending && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              Trending
            </span>
          )}
          {event.is_featured && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-sm bg-blue-500/20 text-blue-300 border-blue-500/30">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title + org */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{event.category || 'Event'}</p>
          <h3 className="text-base font-extrabold text-white leading-snug transition-colors duration-200">
            {event.title}
          </h3>
          {/* Organizer — valid <a> since outer is <div>, not <a> */}
          <Link
            href={`/org/${event.organization?.slug || event.organization_id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-slate-500 mt-0.5 hover:text-white transition-colors duration-200 truncate block"
          >
            {organizerName}
          </Link>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{formattedDate} · {formattedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Urgency */}
        {isLowSpots && (
          <p className="text-[10px] font-semibold text-slate-400">
            Only {spotsLeft} spots left
          </p>
        )}

        {/* Footer: price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-sm font-bold text-white">
            {isFree ? "Free" : `₹${event.price || 0}`}
          </span>
          {isCompleted ? (
            <span className="text-xs font-medium text-slate-600 px-3 py-1.5 rounded-full border border-white/5">
              Completed
            </span>
          ) : (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full text-black group-hover:shadow-[0_0_16px_rgba(52,145,255,0.4)] transition-all duration-300"
              style={{ background: brandGradient }}
            >
              View →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
