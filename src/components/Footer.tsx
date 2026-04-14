export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative bg-black border-t border-blue-950/40 py-10 px-6"
    >
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="/"
          aria-label="Unifesto home"
          className="group flex items-center"
        >
          <span
            className="text-xl text-blue-400 group-hover:text-blue-300 transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] font-agrandir font-black"
          >
            unifesto
          </span>
        </a>

        {/* Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6">
          {["About", "Discover", "Pricing", "Support", "Privacy"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-slate-500 hover:text-blue-400 font-medium transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-600 text-center md:text-right">
          © {currentYear} Unifesto. All rights reserved.
        </p>
      </div>

      {/* Bottom tagline */}
      <p className="mt-6 text-center text-[10px] tracking-[0.2em] uppercase text-blue-900/60 font-medium">
        #UnifestoAtYourCampus
      </p>
    </footer>
  );
}
