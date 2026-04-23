"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { getProfile, updateProfile, createProfileIfNotExists } from "@/lib/api/profile";
import type { Profile } from "@/types/profile";

// Mock user data
const mockUser = {
  name: "Rahul Verma",
  email: "rahul.verma@university.edu",
  phone: "+91 98765 43210",
  college: "Indian Institute of Technology, Delhi",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  bio: "Tech enthusiast and hackathon organizer. Love building products that solve real problems.",
  avatar: null,
  joinedDate: "January 2024",
  stats: {
    eventsAttended: 12,
    eventsHosted: 3,
    ticketsBooked: 15,
  },
  wallet: {
    balance: 250,
    currency: "Uni Coins",
  },
  referral: {
    code: "RAHUL2026",
    totalReferrals: 8,
    coinsEarned: 200,
    link: "https://unifesto.app/signup?ref=RAHUL2026",
  },
};

// Mock transaction history
const transactions = [
  {
    id: "1",
    type: "earned",
    amount: 50,
    description: "Attended Hack League 2026",
    date: "April 10, 2026",
  },
  {
    id: "2",
    type: "spent",
    amount: -30,
    description: "Purchased ticket for Tech Talk",
    date: "April 8, 2026",
  },
  {
    id: "3",
    type: "earned",
    amount: 100,
    description: "Hosted Cultural Fest 2026",
    date: "March 15, 2026",
  },
  {
    id: "4",
    type: "earned",
    amount: 25,
    description: "Referral bonus",
    date: "March 10, 2026",
  },
  {
    id: "5",
    type: "spent",
    amount: -20,
    description: "Event registration fee",
    date: "February 28, 2026",
  },
];

// Mock upcoming events
const upcomingEvents = [
  {
    id: "1",
    title: "Hack League 2026",
    date: "April 25, 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Tech Talk: AI & ML",
    date: "April 30, 2026",
    time: "2:00 PM",
    location: "Seminar Hall",
    status: "confirmed",
  },
];

// Mock past events
const pastEvents = [
  {
    id: "3",
    title: "Cultural Fest 2026",
    date: "March 15, 2026",
    attended: true,
  },
  {
    id: "4",
    title: "Startup Summit",
    date: "February 20, 2026",
    attended: true,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showWallet, setShowWallet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    bio: "",
    phone: "",
    username: "",
  });
  const [saveError, setSaveError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const handleCopyReferral = () => {
    const referralLink = `https://unifesto.app/signup?ref=${profile?.username || profile?.id}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = async () => {
    setSaveError("");
    setSaveLoading(true);
    
    try {
      const updated = await updateProfile({
        name: editedUser.name,
        bio: editedUser.bio,
        phone: editedUser.phone,
        username: editedUser.username,
      });

      if (updated) {
        setProfile(updated);
        setIsEditing(false);
      } else {
        setSaveError("Failed to update profile");
      }
    } catch (error: any) {
      setSaveError(error.message || "Failed to update profile");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
    if (profile) {
      setEditedUser({
        name: profile.name || "",
        bio: profile.bio || "",
        phone: profile.phone || "",
        username: profile.username || "",
      });
    }
    setSaveError("");
    setIsEditing(false);
  };

  useEffect(() => {
    // Check authentication with Supabase and load profile
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session && !error) {
        setIsAuthenticated(true);
        
        // Load or create profile
        let userProfile = await getProfile();
        
        if (!userProfile) {
          // Create profile if it doesn't exist
          userProfile = await createProfileIfNotExists();
        }
        
        if (userProfile) {
          setProfile(userProfile);
          setEditedUser({
            name: userProfile.name || "",
            bio: userProfile.bio || "",
            phone: userProfile.phone || "",
            username: userProfile.username || "",
          });
        }
      } else {
        // Redirect to auth page if not logged in
        router.push("/auth");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Profile Header */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name || "Profile"}
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ background: brandGradient }}
                >
                  {profile?.name ? profile.name.split(" ").map(n => n[0]).join("") : profile?.email?.[0].toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              {saveError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{saveError}</p>
                </div>
              )}
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Username</label>
                    <input
                      type="text"
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                      placeholder="Choose a unique username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Bio</label>
                    <textarea
                      value={editedUser.bio}
                      onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-600 outline-none focus:border-[#3491ff] transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                    {profile?.name || "User"}
                  </h1>
                  {profile?.username && (
                    <p className="text-slate-400 mb-1">@{profile.username}</p>
                  )}
                  <p className="text-slate-400 mb-1">{profile?.email}</p>
                  {profile?.bio && (
                    <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mt-4">
                      {profile.bio}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex lg:flex-col gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saveLoading}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: brandGradient }}
                  >
                    {saveLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={saveLoading}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold text-white mb-1">{mockUser.stats.eventsAttended}</p>
              <p className="text-xs text-slate-500">Events Attended</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold text-white mb-1">{mockUser.stats.eventsHosted}</p>
              <p className="text-xs text-slate-500">Events Hosted</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold text-white mb-1">{mockUser.stats.ticketsBooked}</p>
              <p className="text-xs text-slate-500">Tickets Booked</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold" style={gradientText}>{mockUser.wallet.balance}</p>
              <p className="text-xs text-slate-500">Uni Coins</p>
            </div>
          </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold text-white mb-1">{mockUser.stats.eventsHosted}</p>
              <p className="text-xs text-slate-500">Events Hosted</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold text-white mb-1">{mockUser.stats.ticketsBooked}</p>
              <p className="text-xs text-slate-500">Tickets Booked</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl font-bold" style={gradientText}>{mockUser.wallet.balance}</p>
              <p className="text-xs text-slate-500">Uni Coins</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Wallet & Referral */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Wallet Card */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">Wallet</h2>
                  <button
                    onClick={() => setShowWallet(!showWallet)}
                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    {showWallet ? "Hide" : "View All"}
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-1">Balance</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-extrabold" style={gradientText}>
                      {mockUser.wallet.balance}
                    </h3>
                    <span className="text-sm text-slate-400">{mockUser.wallet.currency}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 rounded-lg px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
                    style={{ background: brandGradient }}
                  >
                    Add Coins
                  </button>
                  <button
                    className="flex-1 rounded-lg px-4 py-2 text-xs font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all duration-300"
                  >
                    Redeem
                  </button>
                </div>

                {showWallet && (
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <h4 className="text-sm font-bold text-white mb-3">Recent Transactions</h4>
                    <div className="space-y-2">
                      {transactions.slice(0, 3).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                transaction.type === "earned"
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {transaction.type === "earned" ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{transaction.description}</p>
                              <p className="text-[10px] text-slate-500">{transaction.date}</p>
                            </div>
                          </div>
                          <div
                            className={`text-sm font-bold ${
                              transaction.type === "earned" ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}{transaction.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                      <p className="text-xs font-semibold text-white mb-2">Earn More Coins</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Attend events: +25-50 coins</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Host events: +100 coins</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Referrals: +25 coins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Referral Card */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-4">Refer & Earn</h2>
                
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 text-center p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xl font-bold text-white">{mockUser.referral.totalReferrals}</p>
                    <p className="text-[10px] text-slate-500">Referrals</p>
                  </div>
                  <div className="flex-1 text-center p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xl font-bold" style={gradientText}>{mockUser.referral.coinsEarned}</p>
                    <p className="text-[10px] text-slate-500">Coins Earned</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Your Referral Code</label>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                    <span className="flex-1 text-lg font-bold tracking-wider" style={gradientText}>
                      {profile?.username || profile?.id?.slice(0, 8).toUpperCase() || "UNIFESTO"}
                    </span>
                    <button
                      onClick={handleCopyReferral}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      {copied ? (
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`https://wa.me/?text=Join Unifesto and discover amazing campus events! Use my referral code: ${profile?.username || profile?.id?.slice(0, 8).toUpperCase()} - https://unifesto.app/signup?ref=${profile?.username || profile?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="text-xs font-semibold text-[#25D366]">Share on WhatsApp</span>
                  </a>

                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=Join Unifesto and discover amazing campus events! Use my referral code: ${profile?.username || profile?.id?.slice(0, 8).toUpperCase()}&url=https://unifesto.app/signup?ref=${profile?.username || profile?.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#1DA1F2]">X</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://unifesto.app/signup?ref=${profile?.username || profile?.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/20 hover:bg-[#0A66C2]/20 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#0A66C2]">LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p className="text-xs font-semibold text-white mb-2">How it works</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Share your code, friends sign up, you both earn coins. You get 25 coins, they get 10 bonus coins!
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-4">Contact Info</h2>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Email</label>
                      <input
                        type="email"
                        value={profile?.email || ""}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#3491ff] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Member Since</label>
                      <input
                        type="text"
                        value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ""}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">Email</p>
                      <p className="text-xs text-white">{profile?.email || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">Phone</p>
                      <p className="text-xs text-white">{profile?.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 mb-1">Member Since</p>
                      <p className="text-xs text-white">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Not available"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>


            {/* Right Column - Events */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">My Events</h2>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-white/10">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
                      activeTab === "upcoming" ? "text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Upcoming
                    {activeTab === "upcoming" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: brandGradient }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
                      activeTab === "past" ? "text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Past Events
                    {activeTab === "past" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: brandGradient }}
                      />
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === "upcoming" && (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <a
                              href={`/events/${event.id}/register/success`}
                              className="rounded-full px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)] text-center"
                              style={{ background: brandGradient }}
                            >
                              View Ticket
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "past" && (
                    <div className="space-y-4">
                      {pastEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                              <p className="text-sm text-slate-400">{event.date}</p>
                            </div>
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                              Attended
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
