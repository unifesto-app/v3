"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: 'university' | 'college' | 'club' | 'community';
  description?: string;
  parent_org_id?: string;
  super_admin_id?: string;
  depth_level: number;
  logo_url?: string;
  banner_url?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  member_count?: number;
  sub_org_count?: number;
}

export interface OrganizationListResponse {
  organizations: Organization[];
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
 * Get all organizations with pagination and filters
 */
export async function getOrganizations(
  page: number = 1,
  limit: number = 50,
  filters?: {
    search?: string;
    type?: string;
    is_active?: boolean;
  }
): Promise<OrganizationListResponse> {
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

    const response = await fetchWithTimeout(`${API_URL}/public/organizations?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching organizations:', response.status, response.statusText);
      return { organizations: [], total: 0, page: 1, limit: 50 };
    }

    const data = await response.json();
    return data || { organizations: [], total: 0, page: 1, limit: 50 };
  } catch (error) {
    console.error('[API] Error fetching organizations:', error);
    return { organizations: [], total: 0, page: 1, limit: 50 };
  }
}

/**
 * Get organization by ID
 */
export async function getOrganizationById(id: string): Promise<Organization | null> {
  try {
    const response = await fetchWithTimeout(`${API_URL}/public/organizations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching organization:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data.organization || null;
  } catch (error) {
    console.error('[API] Error fetching organization:', error);
    return null;
  }
}

/**
 * Get organization by slug
 */
export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  try {
    const response = await fetchWithTimeout(`${API_URL}/public/organizations/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching organization:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data.organization || null;
  } catch (error) {
    console.error('[API] Error fetching organization:', error);
    return null;
  }
}

/**
 * Get sub-organizations of a parent organization
 */
export async function getSubOrganizations(parentId: string): Promise<Organization[]> {
  try {
    const response = await fetchWithTimeout(`${API_URL}/public/organizations/${parentId}/sub-orgs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching sub-organizations:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.organizations || [];
  } catch (error) {
    console.error('[API] Error fetching sub-organizations:', error);
    return [];
  }
}

/**
 * Get events by organization
 */
export async function getOrganizationEvents(orgId: string, page: number = 1, limit: number = 20) {
  try {
    const params = new URLSearchParams({
      organization_id: orgId,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetchWithTimeout(`${API_URL}/public/events?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, 10000);

    if (!response.ok) {
      console.error('[API] Error fetching organization events:', response.status, response.statusText);
      return { events: [], total: 0, page: 1, limit: 20 };
    }

    const data = await response.json();
    return data || { events: [], total: 0, page: 1, limit: 20 };
  } catch (error) {
    console.error('[API] Error fetching organization events:', error);
    return { events: [], total: 0, page: 1, limit: 20 };
  }
}

// Constants
export const ORG_TYPE_LABELS: Record<string, string> = {
  university: 'University',
  college: 'College',
  club: 'Club',
  community: 'Community',
};

export const ORG_TYPES = [
  { key: 'all', label: 'All Types' },
  { key: 'university', label: 'Universities' },
  { key: 'college', label: 'Colleges' },
  { key: 'club', label: 'Clubs' },
  { key: 'community', label: 'Communities' },
];
