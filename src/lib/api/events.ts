"use client";

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
  event_type: 'online' | 'offline' | 'hybrid';
  category?: string;
  tags?: string[];
  max_attendees?: number;
  is_free: boolean;
  price?: number;
  currency?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  is_featured: boolean;
  is_trending: boolean;
  organization_id: string;
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

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await fetchWithTimeout(`${API_URL}/public/events?${params.toString()}`, {
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
    return data || { events: [], total: 0, page: 1, limit: 20 };
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
    const response = await fetchWithTimeout(`${API_URL}/public/events/${id}`, {
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
    return data.event || null;
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
    const response = await fetchWithTimeout(`${API_URL}/public/events/slug/${slug}`, {
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
    return data.event || null;
  } catch (error) {
    console.error('[API] Error fetching event by slug:', error);
    return null;
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit: number = 10): Promise<Event[]> {
  try {
    const response = await fetchWithTimeout(`${API_URL}/public/events/featured?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching featured events:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('[API] Error fetching featured events:', error);
    return [];
  }
}

/**
 * Get trending events
 */
export async function getTrendingEvents(limit: number = 10): Promise<Event[]> {
  try {
    const response = await fetchWithTimeout(`${API_URL}/public/events/trending?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching trending events:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('[API] Error fetching trending events:', error);
    return [];
  }
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
