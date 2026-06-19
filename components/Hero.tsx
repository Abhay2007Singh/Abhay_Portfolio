"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import TechChip from "./TechChip";

const STATS = [
  { value: "7.99", label: "CGPA" },
  { value: "5", label: "Major Projects" },
  { value: "2", label: "Internships" },
];

const TECH_PILLS = [
  "Python", "FastAPI", "PostgreSQL", "Redis", "Docker",
  "Celery", "React", "Gemini API", "WebSockets",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const reduced = useReducedMotion();

  const anim = (delay = 0) =>
    reduced
      ? {}
      : fadeUp(delay);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14"
      aria-label="Introduction"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: "var(--primary)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            {/* Eyebrow */}
            <motion.div {...anim(0)} className="flex items-center gap-2 mb-8">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
                Software Engineer · Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              {...anim(0.1)}
              className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold text-text leading-[1.05] mb-6"
            >
              Abhay Kumar
              <br />
              Singh
              <span className="text-primary">.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...anim(0.2)}
              className="text-muted text-base sm:text-lg leading-relaxed mb-4 max-w-lg"
            >
              I build systems. Some move money. Some run AI.{" "}
              <span
                className="text-text"
                style={{ borderBottom: "2px solid var(--primary)", paddingBottom: "1px" }}
              >
                All of them handle failure
              </span>
              .
            </motion.p>
            <motion.p {...anim(0.25)} className="text-muted text-sm leading-relaxed mb-8 max-w-lg">
              Python · FastAPI · PostgreSQL · Gemini API · CSE @ GEC Ajmer
            </motion.p>

            {/* Tech pills */}
            <motion.div {...anim(0.3)} className="flex flex-wrap gap-2 mb-10">
              {TECH_PILLS.map((t) => (
                <TechChip key={t} name={t} />
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...anim(0.35)} className="flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/12brDPEi3slkRzRvqzYeu6ZxXLN3SSyLJ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-bg font-mono text-xs px-5 py-2.5 rounded hover:bg-primary/90 transition-colors tracking-widest uppercase font-semibold"
              >
                Resume ↗
              </a>
              <a
                href="https://github.com/Abhay2007Singh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-text font-mono text-xs px-5 py-2.5 rounded hover:border-border-2 hover:bg-card transition-colors tracking-widest uppercase"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/abhay-kumar-singh-aks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-text font-mono text-xs px-5 py-2.5 rounded hover:border-border-2 hover:bg-card transition-colors tracking-widest uppercase"
              >
                LinkedIn ↗
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border text-text font-mono text-xs px-5 py-2.5 rounded hover:border-border-2 hover:bg-card transition-colors tracking-widest uppercase"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* Right — request-flow diagram + stat cards */}
          <div className="flex flex-col gap-6">
            {/* Timeline */}
            <motion.div
              {...anim(0.4)}
              className="border border-border rounded-xl bg-card p-6"
            >
              <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] mb-6">
                Journey
              </div>
              <div className="flex flex-col">
                {[
                  {
                    year: "2026",
                    items: [
                      { label: "Final Year — CSE", sub: "Government Engineering College, Ajmer", color: "text-primary", dot: "bg-primary" },
                      { label: "Built Gig Ledger", sub: "AI income verification platform", color: "text-secondary", dot: "bg-secondary" },
                    ],
                  },
                  {
                    year: "2025",
                    items: [
                      { label: "IIT Roorkee Hackathon", sub: "Rank 7 / national-level", color: "text-warning", dot: "bg-warning" },
                      { label: "Built OWallet", sub: "Concurrency-safe distributed wallet", color: "text-secondary", dot: "bg-secondary" },
                    ],
                  },
                  {
                    year: "2024",
                    items: [
                      { label: "Sign Language Translator", sub: "Real-time CV pipeline with MediaPipe", color: "text-muted", dot: "bg-muted" },
                      { label: "GIT Hackathon", sub: "Top 15 finalist", color: "text-primary", dot: "bg-primary" },
                    ],
                  },
                ].map((group, gi) => (
                  <motion.div
                    key={group.year}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + gi * 0.1 }}
                    className="flex gap-4"
                  >
                    {/* Year column */}
                    <div className="flex flex-col items-center" style={{ minWidth: "3rem" }}>
                      <span className="font-mono text-[11px] font-bold text-primary">{group.year}</span>
                      <div className="flex-1 w-px bg-border mt-1" />
                    </div>

                    {/* Events */}
                    <div className="flex flex-col gap-3 pb-5 flex-1">
                      {group.items.map((item, ii) => (
                        <div key={ii} className="flex gap-3 items-start">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.dot}`} />
                          <div>
                            <div className={`font-mono text-[12px] font-semibold ${item.color}`}>{item.label}</div>
                            <div className="font-mono text-[10px] text-muted mt-0.5">{item.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...anim(0.45 + i * 0.07)}
                  className="border border-border rounded-lg bg-card p-4 text-center"
                >
                  <div className="font-display text-2xl font-bold text-primary mb-1">{s.value}</div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest leading-tight">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        {...anim(0.8)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-muted tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted to-transparent" />
      </motion.div>
    </section>
  );
}
