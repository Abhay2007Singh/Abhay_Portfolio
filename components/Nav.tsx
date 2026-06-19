"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#playground", label: "Playground" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — highlight whichever section is most visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const visibleRatios = new Map<string, number>();

    const pick = () => {
      let best = "";
      let bestRatio = 0;
      for (const [id, ratio] of visibleRatios) {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      }
      setActiveId(best);
    };

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleRatios.set(id, entry.intersectionRatio);
          pick();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm text-text tracking-wider hover:text-primary transition-colors"
            aria-label="Abhay Kumar Singh — home"
          >
            ABHAY
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((l) => {
              const id = l.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted hover:text-text"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Resume CTA */}
          <a
            href="https://drive.google.com/file/d/12brDPEi3slkRzRvqzYeu6ZxXLN3SSyLJ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/40 px-3 py-1.5 rounded hover:bg-primary/10 transition-colors tracking-widest uppercase"
          >
            Resume ↗
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-muted hover:text-text transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
            <span className="block w-5 h-px bg-current mb-1.5 transition-all" />
            <span className="block w-3 h-px bg-current transition-all" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-sm flex flex-col pt-14"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            onClick={closeMenu}
            className="absolute top-4 right-6 text-muted hover:text-text text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav className="flex flex-col px-6 py-8 gap-0" aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => {
              const id = l.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className={`text-sm font-mono py-4 border-b border-border transition-colors tracking-widest uppercase ${
                    isActive ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
            <a
              href="https://drive.google.com/file/d/12brDPEi3slkRzRvqzYeu6ZxXLN3SSyLJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-6 text-sm font-mono text-primary border border-primary/40 px-4 py-3 rounded text-center hover:bg-primary/10 transition-colors tracking-widest uppercase"
            >
              Resume ↗
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
