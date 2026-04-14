"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Discover", href: "#events" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getScrollY = () =>
      window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;

    const handleScroll = () => setScrolled(getScrollY() > 24);

    // Run immediately in case page loads already scrolled
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
                background: "linear-gradient(135deg, #3491ff, #0062ff)",
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

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 pt-2" aria-label="Main links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  id={`nav-${item.label.toLowerCase()}`}
                  className="text-base text-slate-300/80 hover:text-white font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: "linear-gradient(135deg, #3491ff, #0062ff)" }} />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 pt-2">
            <Button
              id="nav-get-started"
              className="rounded-full px-6 py-2.5 h-auto text-sm font-semibold border-0 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)]"
              style={{ background: "transparent", border: "1px solid #3491ff", color: "#3491ff" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "linear-gradient(135deg, #3491ff, #0062ff)";
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
          </div>

          {/* Mobile menu toggle */}
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
            <div className="flex flex-col gap-1 bg-black/80 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/5 mt-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base text-slate-300/80 hover:text-white font-medium py-3 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                id="mobile-get-started"
                className="mt-2 rounded-full px-6 py-3 h-auto text-sm font-semibold border-0 transition-all duration-300 w-full"
                style={{ background: "linear-gradient(135deg, #3491ff, #0062ff)", color: "#000000" }}
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
