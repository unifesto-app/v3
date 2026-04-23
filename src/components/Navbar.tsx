"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { brandGradient } from "@/lib/styles";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

type NavItem = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string; description?: string }[];
  twoColumn?: { title: string; items: { label: string; href: string; description?: string }[] }[];
};

const navItems: NavItem[] = [
  {
    label: "Discover",
    twoColumn: [
      {
        title: "Events",
        items: [
          { label: "All Events", href: "/events", description: "Browse everything on campus" },
          { label: "Trending", href: "/events?status=trending", description: "What everyone is talking about" },
          { label: "Upcoming", href: "/events?status=upcoming", description: "Don't miss what's next" },
          { label: "Featured", href: "/events?status=featured", description: "Handpicked by the team" },
        ],
      },
      {
        title: "Organizations",
        items: [
          { label: "Browse All", href: "/orgs", description: "Universities, clubs & more" },
          { label: "Universities & Colleges", href: "/orgs?type=university", description: "Top-level institutions" },
          { label: "Clubs", href: "/orgs?type=club", description: "Student clubs, cells & departments" },
          { label: "Communities", href: "/orgs?type=community", description: "Independent groups" },
        ],
      },
    ],
  },
  {
    label: "About",
    dropdown: [
      { label: "About Us", href: "/about", description: "Our story & mission" },
      { label: "Features", href: "/about#features", description: "What we offer" },
      { label: "Use Cases", href: "/about#use-cases", description: "Events we support" },
      { label: "Testimonials", href: "/about#testimonials", description: "What people say" },
      { label: "Support", href: "/support", description: "Get help & contact us" },
    ],
  },
  { label: "Host Event", href: "/host" },
  {
    label: "Features",
    dropdown: [
      { label: "Event Discovery", href: "/features#event-discovery", description: "Find all campus events in one place" },
      { label: "Event Hosting", href: "/features#event-hosting", description: "Create & manage events easily" },
      { label: "Ticketing & RSVP", href: "/features#ticketing-rsvp", description: "Registration & QR tickets" },
      { label: "Analytics", href: "/features#analytics", description: "Real-time insights & reports" },
    ],
  },
  {
    label: "Products",
    dropdown: [
      { label: "QR Check-in App", href: "/products#qr-checkin", description: "Fast event entry management" },
      { label: "Face Check-in (MxA.ai)", href: "https://mxa.ai", description: "AI-powered facial recognition entry" },
      { label: "Certificate Generation", href: "/products#certificate", description: "Automated certificates & verification" },
      { label: "Event App", href: "/products#event-app", description: "Companion app for attendees" },
      { label: "Mobile Apps", href: "/products#mobile-apps", description: "Android & iOS discovery apps" },
    ],
  },
];

function TwoColumnDropdown({ columns }: { columns: { title: string; items: { label: string; href: string; description?: string }[] }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-50 pointer-events-auto">
      {/* Gradient top border accent */}
      <div className="h-px w-full" style={{ background: brandGradient }} />
      <div className="flex">
        {columns.map((column, idx) => (
          <div key={column.title} className={`p-1.5 w-56 ${idx > 0 ? 'border-l border-white/10' : ''}`}>
            <div className="px-3 py-2 mb-1">
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{column.title}</span>
            </div>
            {column.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group"
              >
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{item.label}</span>
                {item.description && (
                  <span className="text-[11px] text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors">{item.description}</span>
                )}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DropdownMenu({ items }: { items: { label: string; href: string; description?: string }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-50 pointer-events-auto">
      {/* Gradient top border accent */}
      <div className="h-px w-full" style={{ background: brandGradient }} />
      <div className="p-1.5">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group"
          >
            <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{item.label}</span>
            {item.description && (
              <span className="text-[11px] text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors">{item.description}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  if (!item.dropdown && !item.twoColumn) {
    return (
      <li>
        <a
          href={item.href}
          className="text-base text-slate-300/80 hover:text-white font-medium tracking-wide transition-colors duration-200 relative group"
        >
          {item.label}
          <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: brandGradient }} />
        </a>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className="flex items-center gap-1 text-base text-slate-300/80 hover:text-white font-medium tracking-wide transition-colors duration-200 relative group"
        aria-expanded={open}
      >
        {item.label}
        {/* Chevron */}
        <svg
          className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: brandGradient }} />
      </button>
      {open && item.twoColumn && <TwoColumnDropdown columns={item.twoColumn} />}
      {open && item.dropdown && <DropdownMenu items={item.dropdown} />}
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<{ avatar_url?: string; full_name?: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getScrollY = () =>
      window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
    const handleScroll = () => setScrolled(getScrollY() > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch user profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url, full_name')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile(profile);
        }
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch user profile data
        supabase
          .from('profiles')
          .select('avatar_url, full_name')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              setUserProfile(profile);
            }
          });
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-black/80 backdrop-blur-xl border-b border-blue-950/60 shadow-[0_4px_32px_rgba(37,99,235,0.08)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Primary navigation">

          {/* Logo */}
          <a href="/" aria-label="Unifesto home" className="flex items-center group">
            <span
              className="text-4xl md:text-5xl transition-all duration-300"
              style={{
                fontFamily: "var(--font-sweet-apricot)",
                background: brandGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingLeft: "3px",
                lineHeight: 1,
                display: "inline-block",
              }}
            >
              unifesto
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 pt-2" aria-label="Main links">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 pt-2">
            {user ? (
              <a href="/profile" className="group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#3491ff] transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]">
                  {userProfile?.avatar_url ? (
                    <img 
                      src={userProfile.avatar_url} 
                      alt={userProfile.full_name || "Profile"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: brandGradient }}
                    >
                      {userProfile?.full_name 
                        ? userProfile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
                        : user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </a>
            ) : (
              <a href="/auth">
                <Button
                  id="nav-get-started"
                  className="rounded-full px-6 py-2.5 h-auto text-sm font-semibold border-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
                  style={{ background: "transparent", border: "1px solid #3491ff", color: "#3491ff" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = brandGradient;
                    el.style.color = "#000000";
                    el.style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "transparent";
                    el.style.color = "#3491ff";
                    el.style.borderColor = "#3491ff";
                  }}
                >
                  Get Started
                </Button>
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#3491ff" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up">
            <div className="flex flex-col bg-black/80 backdrop-blur-xl rounded-2xl border border-white/5 mt-1 overflow-hidden">
              {/* Gradient top accent */}
              <div className="h-px w-full" style={{ background: brandGradient }} />
              <div className="p-2">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown || item.twoColumn ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base text-slate-300/80 hover:text-white font-medium hover:bg-white/5 transition-all duration-200"
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        >
                          {item.label}
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {mobileExpanded === item.label && (
                          <div className="pl-4 pb-1">
                            {item.twoColumn ? (
                              item.twoColumn.map((column) => (
                                <div key={column.title} className="mb-2">
                                  <div className="px-3 py-1.5">
                                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{column.title}</span>
                                  </div>
                                  {column.items.map((sub) => (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      <span className="text-sm font-medium text-white/80">{sub.label}</span>
                                      {sub.description && <span className="text-[11px] text-slate-500">{sub.description}</span>}
                                    </a>
                                  ))}
                                </div>
                              ))
                            ) : (
                              item.dropdown?.map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  <span className="text-sm font-medium text-white/80">{sub.label}</span>
                                  {sub.description && <span className="text-[11px] text-slate-500">{sub.description}</span>}
                                </a>
                              ))
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="block px-3 py-2.5 rounded-xl text-base text-slate-300/80 hover:text-white font-medium hover:bg-white/5 transition-all duration-200"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
                <div className="px-2 pt-1 pb-1">
                  {user ? (
                    <a href="/profile" className="block">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3491ff]">
                          {userProfile?.avatar_url ? (
                            <img 
                              src={userProfile.avatar_url} 
                              alt={userProfile.full_name || "Profile"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center text-sm font-bold text-white"
                              style={{ background: brandGradient }}
                            >
                              {userProfile?.full_name 
                                ? userProfile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
                                : user.email?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">
                            {userProfile?.full_name || user.email?.split("@")[0] || "My Profile"}
                          </p>
                          <p className="text-xs text-slate-400">View Profile</p>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <a href="/auth" className="block">
                      <Button
                        id="mobile-get-started"
                        className="mt-1 rounded-full px-6 py-3 h-auto text-sm font-semibold border-0 transition-all duration-300 w-full"
                        style={{ background: brandGradient, color: "#000000" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        Get Started
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
