"use client";

import { createClient } from "@/lib/supabase/client";
import type { Profile, UpdateProfileDto } from "@/types/profile";
import { UserRole } from "@/types/profile";

/**
 * Get current user profile from Supabase profiles table
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Error getting user:", userError);
      return null;
    }

    // Fetch profile from profiles table
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error("Unexpected error in getProfile:", error);
    return null;
  }
}

/**
 * Create profile if it doesn't exist
 */
export async function createProfileIfNotExists(): Promise<Profile | null> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Error getting user:", userError);
      return null;
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingProfile) {
      return existingProfile as Profile;
    }

    // Create new profile
    const newProfile = {
      id: user.id,
      email: user.email,
      role: UserRole.ATTENDEE,
      is_verified: false,
      is_active: true,
      is_banned: false,
    };

    const { data, error } = await supabase
      .from("profiles")
      .insert(newProfile)
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      // If profile was created by another request, fetch it
      if (error.code === "23505") {
        return getProfile();
      }
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error("Unexpected error in createProfileIfNotExists:", error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  updateDto: UpdateProfileDto
): Promise<Profile | null> {
  try {
    const supabase = createClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Error getting user:", userError);
      return null;
    }

    // If username is being updated, check for uniqueness
    if (updateDto.username) {
      const { data: existingUsername } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", updateDto.username)
        .neq("id", user.id)
        .single();

      if (existingUsername) {
        throw new Error("Username already taken");
      }
    }

    // Update profile
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updateDto,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error("Unexpected error in updateProfile:", error);
    throw error;
  }
}

/**
 * Check if username is available
 */
export async function isUsernameAvailable(username: string): Promise<boolean> {
  try {
    const supabase = createClient();
    
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    return !data;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
}
