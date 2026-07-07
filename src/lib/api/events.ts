"use client";

// Call the NestJS backend directly. The backend exposes events under `/events`.
// See backends/unifesto-backend/src/events/events.controller.ts.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  banner_url?: string;
  thumbnail_url?: string;
  image_url?: string;
  start_date: string;
  end_date: string;
  registration_start?: string;
  registration_end?: string;
  venue?: string;
  city?: string;
  state?: string;
  country?: string;
  event_type: string;
  category?: string;
  tags?: string[];
  max_attendees?: number;
  is_free: boolean;
  price?: number;
  currency?: string;
  status: string;
  is_featured: boolean;
  is_trending: boolean;
  // Backend still sends the legacy "organization" wire keys; the frontend
  // treats the hosting entity as a Space. Both are kept for compatibility.
  space_id?: string;
  space?: {
    id: string;
    name: string;
    logo_url?: string;
    slug?: string;
    type?: string;
  };
  organization_id?: string;
  organization?: {
    id: string;
    name: string;
    logo_url?: string;
    slug?: string;
    type?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface EventListResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Fetch with timeout for better UX
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Normalize a raw backend Event (Prisma camelCase) into the frontend Event
 * shape (snake_case). The backend response shape is defined in
 * backends/unifesto-backend/src/events/events.service.ts.
 */
export function mapEvent(raw: Record<string, unknown> | null | undefined): Event | null {
  if (!raw) return null;
  const r = raw as Record<string, unknown>;

  const rawSpace = (r.space ?? null) as Record<string, unknown> | null;
  const space = rawSpace
    ? {
        id: rawSpace.id as string,
        name: rawSpace.name as string,
        logo_url: (rawSpace.logoUrl ?? rawSpace.logo_url) as string | undefined,
        slug: rawSpace.slug as string | undefined,
        type: rawSpace.type as string | undefined,
      }
    : undefined;

  // Pricing is derived from ticket types; treat as free when none are paid.
  const ticketTypes = (r.ticketTypes ?? []) as Array<Record<string, unknown>>;
  const firstTicket = ticketTypes[0];
  const isFree = (r.isFree ?? r.is_free ?? (ticketTypes.length === 0)) as boolean;

  return {
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    description: r.description as string | undefined,
    banner_url: (r.coverImageUrl ?? r.banner_url ?? r.image_url) as string | undefined,
    image_url: (r.coverImageUrl ?? r.image_url) as string | undefined,
    start_date: (r.startDateTime ?? r.start_date) as string,
    end_date: (r.endDateTime ?? r.end_date) as string,
    venue: (r.venueName ?? r.venue) as string | undefined,
    city: r.city as string | undefined,
    state: r.state as string | undefined,
    country: r.country as string | undefined,
    event_type: (r.type ?? r.event_type) as string,
    category: r.category as string | undefined,
    tags: (r.tags ?? []) as string[],
    max_attendees: (r.capacity ?? r.max_attendees) as number | undefined,
    is_free: isFree,
    price: firstTicket ? (firstTicket.price as number | undefined) : undefined,
    currency: firstTicket ? (firstTicket.currency as string | undefined) : undefined,
    status: r.status as string,
    is_featured: (r.isFeatured ?? r.is_featured ?? false) as boolean,
    is_trending: (r.isTrending ?? r.is_trending ?? false) as boolean,
    space_id: (r.spaceId ?? r.space_id) as string | undefined,
    space,
    organization_id: (r.spaceId ?? r.space_id) as string | undefined,
    organization: space,
    created_at: (r.createdAt ?? r.created_at) as string,
    updated_at: (r.updatedAt ?? r.updated_at) as string,
  };
}

/**
 * Get all events with pagination and filters
 */
export async function getEvents(
  page: number = 1,
  limit: number = 20,
  filters?: {
    search?: string;
    category?: string;
    event_type?: string;
    city?: string;
    is_free?: boolean;
    is_featured?: boolean;
    is_trending?: boolean;
    organization_id?: string;
  }
): Promise<EventListResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Map frontend filter names to the backend EventFilterDto (camelCase).
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.event_type) params.append('type', filters.event_type);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.organization_id) params.append('spaceId', filters.organization_id);

    const response = await fetchWithTimeout(`${API_URL}/events?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching events:', response.status, response.statusText);
      return { events: [], total: 0, page: 1, limit: 20 };
    }

    const data = await response.json();
    const list = (data?.data ?? []) as Record<string, unknown>[];
    return {
      events: list.map((e) => mapEvent(e)!).filter(Boolean),
      total: (data?.total as number) ?? list.length,
      page: (data?.page as number) ?? page,
      limit: (data?.limit as number) ?? limit,
    };
  } catch (error) {
    console.error('[API] Error fetching events:', error);
    return { events: [], total: 0, page: 1, limit: 20 };
  }
}

/**
 * Get event by ID
 */
export async function getEventById(id: string): Promise<Event | null> {
  try {
    // The backend `/events/:slug` route resolves both slugs and UUID ids.
    const response = await fetchWithTimeout(`${API_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching event:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return mapEvent(data?.id ? data : null);
  } catch (error) {
    console.error('[API] Error fetching event:', error);
    return null;
  }
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const response = await fetchWithTimeout(`${API_URL}/events/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching event by slug:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return mapEvent(data?.id ? data : null);
  } catch (error) {
    console.error('[API] Error fetching event by slug:', error);
    return null;
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit: number = 10): Promise<Event[]> {
  // The backend has no dedicated featured endpoint; fall back to the most
  // recent published events.
  const { events } = await getEvents(1, limit);
  return events;
}

/**
 * Get trending events
 */
export async function getTrendingEvents(limit: number = 10): Promise<Event[]> {
  // The backend has no dedicated trending endpoint; fall back to the most
  // recent published events.
  const { events } = await getEvents(1, limit);
  return events;
}

/**
 * Filter events (client-side for compatibility)
 */
export function filterEvents(
  events: Event[],
  filters: {
    query?: string;
    category?: string;
    status?: string;
    price?: "all" | "free" | "paid";
    dateRange?: "all" | "today" | "week" | "upcoming";
  }
): Event[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  return events.filter((e) => {
    // Query filter
    const matchesQuery =
      !filters.query ||
      e.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      e.description?.toLowerCase().includes(filters.query.toLowerCase()) ||
      e.organization?.name.toLowerCase().includes(filters.query.toLowerCase());

    // Category filter
    const matchesCategory =
      !filters.category ||
      filters.category === "All" ||
      e.category === filters.category;

    // Price filter
    const matchesPrice =
      !filters.price ||
      filters.price === "all" ||
      (filters.price === "free" && e.is_free) ||
      (filters.price === "paid" && !e.is_free);

    // Date range filter
    const eventDate = new Date(e.start_date);
    const matchesDate =
      !filters.dateRange ||
      filters.dateRange === "all" ||
      (filters.dateRange === "today" &&
        eventDate.toDateString() === today.toDateString()) ||
      (filters.dateRange === "week" &&
        eventDate >= today &&
        eventDate <= weekEnd) ||
      (filters.dateRange === "upcoming" && eventDate >= today);

    return matchesQuery && matchesCategory && matchesPrice && matchesDate;
  });
}

// Constants for filters
export const ALL_CATEGORIES = [
  "All",
  "Technology",
  "Business",
  "Arts & Culture",
  "Sports",
  "Education",
  "Health & Wellness",
  "Music",
  "Food & Drink",
  "Community",
  "Other",
];

export const STATUS_TABS = [
  { key: "all", label: "All Events" },
  { key: "upcoming", label: "Upcoming" },
  { key: "ongoing", label: "Ongoing" },
  { key: "past", label: "Past" },
];

export const DATE_FILTERS = [
  { key: "all", label: "All" },
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "upcoming", label: "Upcoming" },
];

export const PRICE_FILTERS = [
  { key: "all", label: "All" },
  { key: "free", label: "Free" },
  { key: "paid", label: "Paid" },
];
