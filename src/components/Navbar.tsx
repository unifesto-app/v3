"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { brandGradient } from "@/lib/styles";
import Image from "next/image";
import GooglePlayBadge from "@/app/assets/svg/GetItOnGooglePlay_Badge_Web_color_English.svg";
import AppStoreBadge from "@/app/assets/svg/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

type NavItem = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string; description?: string; image?: any }[];
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
          { label: "Browse All", href: "/org", description: "Universities, clubs & more" },
          { label: "Universities & Colleges", href: "/org?type=university", description: "Top-level institutions" },
          { label: "Clubs", href: "/org?type=club", description: "Student clubs, cells & departments" },
          { label: "Communities", href: "/org?type=community", description: "Independent groups" },
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
  {
    label: "Download",
    dropdown: [
      { label: "App Store", href: "https://apps.apple.com/app/unifesto/id6767165496", image: AppStoreBadge },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.unifesto.app", image: GooglePlayBadge },
    ],
  },
];

function MegaMenu({ items }: { items: NavItem[] }) {
  const mainItems = items.filter(item => item.label !== "Download");
  const downloadItem = items.find(item => item.label === "Download");

  return (
    <div className="absolute top-full right-0 mt-4 w-[1000px] max-w-[90vw] rounded-3xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden z-50 pointer-events-auto">
      <div className="h-1 w-full" style={{ background: brandGradient }} />
      <div className="p-8 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainItems.map((item, index) => {
            const isLastItem = index === mainItems.length - 1;
            return (
              <div key={item.label} className="flex flex-col h-full">
                <div className="mb-auto">
                  <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                    {item.label}
                  </h3>
                  <div className="space-y-4">
                    {item.twoColumn ? (
                      item.twoColumn.map(col => (
                        <div key={col.title} className="mb-4">
                          <h4
                            className="text-xs font-semibold uppercase tracking-wider mb-2"
                            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: brandGradient }}
                          >
                            {col.title}
                          </h4>
                          <div className="space-y-1">
                            {col.items.map(sub => (
                              <a key={sub.label} href={sub.href} className="block px-3 py-2 -mx-3 rounded-xl hover:bg-white/5 transition-all group">
                                <div className="text-sm font-medium text-white/90 group-hover:text-white">{sub.label}</div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : item.dropdown ? (
                      <div className="space-y-1">
                        {item.dropdown.map(sub => (
                          <a key={sub.label} href={sub.href} className="block px-3 py-2 -mx-3 rounded-xl hover:bg-white/5 transition-all group">
                            <div className="text-sm font-medium text-white/90 group-hover:text-white">{sub.label}</div>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                {isLastItem && downloadItem && (
                  <div className="mt-8 flex flex-col items-end gap-4">
                    <div className="flex flex-row items-center gap-4">
                      {downloadItem.dropdown?.map(sub => (
                        <a key={sub.label} href={sub.href} className="block hover:opacity-80 transition-opacity">
                          <Image src={sub.image} alt={sub.label} className="h-12 w-auto object-contain" />
                        </a>
                      ))}
                    </div>
                    <div
                      className="font-black tracking-[0.2em] text-sm opacity-80"
                      style={{
                        background: brandGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      #UNIFESTO
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopMenuTrigger({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div
      className="hidden md:flex relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-2 text-base text-slate-300/80 hover:text-white font-medium tracking-wide transition-colors duration-200 group px-4 py-2 rounded-full hover:bg-white/5"
        aria-expanded={open}
      >
        <span>Menu</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && <MegaMenu items={items} />}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
          <div className="hidden md:flex flex-1 justify-end pt-2">
            <DesktopMenuTrigger items={navItems} />
          </div>

          {/* Desktop CTA removed to convert to standard menu item */}

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
                {navItems.filter(i => i.label !== "Download").map((item) => (
                  <div key={item.label}>
                    {item.dropdown || item.twoColumn ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base text-slate-300/80 hover:text-white font-medium hover:bg-white/5 transition-all duration-200"
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        >
                          <span>{item.label}</span>
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
                                <div key={column.title} className="mb-4">
                                  <div className="px-3 py-1.5">
                                    <span
                                      className="text-xs font-bold uppercase tracking-wider"
                                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: brandGradient }}
                                    >
                                      {column.title}
                                    </span>
                                  </div>
                                  {column.items.map((sub) => (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-200"
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      <span className="text-sm font-medium text-white/80">{sub.label}</span>
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

                {navItems.find(i => i.label === "Download") && (
                  <div className="mt-4 px-3 flex flex-col items-end gap-4 pb-6">
                    <div className="flex flex-row items-center justify-end gap-4">
                      {navItems.find(i => i.label === "Download")?.dropdown?.map(sub => (
                        <a key={sub.label} href={sub.href} className="hover:opacity-80 transition-opacity">
                          <Image src={sub.image} alt={sub.label} className="h-12 w-auto object-contain" />
                        </a>
                      ))}
                    </div>
                    <div
                      className="font-black tracking-[0.2em] text-sm opacity-80"
                      style={{
                        background: brandGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      #UNIFESTO
                    </div>
                  </div>
                )}
                <div className="px-2 pt-1 pb-1">
                  {/* Mobile CTA removed to convert to standard menu item */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
