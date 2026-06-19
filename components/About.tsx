"use client";

import { motion } from "framer-motion";

const INTERESTS = [
  "Distributed systems",
  "Transaction isolation",
  "AI pipelines",
  "API design",
  "Real-time systems",
  "Computer Vision",
  "Open-source",
  "IoT",
];

const META = [
  { label: "Currently at", value: "GEC Ajmer" },
  { label: "Degree", value: "B.Tech CSE" },
  { label: "Graduating", value: "2027" },
  { label: "Location", value: "Bengaluru, Karnataka" },
  { label: "CGPA", value: "7.99 / 10" },
  { label: "Status", value: "Open to roles", highlight: true },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 border-t border-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
            08 / About
          </div>
          <h2
            id="about-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text"
          >
            About
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: meta */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-0"
          >
            {META.map((m) => (
              <div key={m.label} className="py-3 border-b border-border last:border-0">
                <div className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-0.5">
                  {m.label}
                </div>
                {m.highlight ? (
                  <span className="font-mono text-[11px] font-semibold text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 rounded">
                    {m.value}
                  </span>
                ) : (
                  <div className="font-mono text-sm text-text font-medium">{m.value}</div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="font-display text-xl text-text leading-relaxed">
              I&apos;m in my fourth year of Computer Science and Engineering at Government
              Engineering College, Ajmer.
            </p>

            <div className="w-8 h-0.5 bg-primary" aria-hidden="true" />

            <p className="text-muted text-sm leading-relaxed">
              I&apos;ve done two internships : one as a Python developer, one in UI/UX design. The
              design one was useful in an unexpected way: it made me think about what a system feels
              like from the outside, not just how it&apos;s built on the inside. I now think about
              both the architecture and the interface it serves.
            </p>

            <p className="text-muted text-sm leading-relaxed">
              Most of what I&apos;ve learned came from building actual projects like, a concurrency-safe
              wallet backend, an income verification pipeline that runs AI on top of a proper stats
              engine, and a few other systems where getting the backend right was the whole point.
              The skills listed above came from using them in those projects, not just reading about
              them.
            </p>

            <p className="text-muted text-sm leading-relaxed">
              What I&apos;m looking for is a role where I can work on real software, proper
              codebases, real users, real engineering problems alongside people who take building
              things seriously.
            </p>

            {/* Interest chips */}
            <div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] mb-3">
                Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono text-[11px] text-muted border border-border px-2.5 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
