"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 sm:py-32 border-t border-border"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
            05 / Skills
          </div>
          <h2
            id="skills-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text mb-4"
          >
            Skills & Tools
          </h2>
          <p className="text-muted text-sm max-w-xl leading-relaxed">
            Technologies I use to build, ship, and iterate.{" "}
            <span className="text-primary font-semibold">Green</span> = primary stack.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-border rounded-xl bg-card p-5"
            >
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-1">
                {cat.label}
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">{cat.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-mono text-[11px] px-2 py-0.5 rounded border transition-all duration-150 ${
                      s.primary
                        ? "text-primary border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/60"
                        : "text-muted border-border hover:text-text hover:border-border-2"
                    }`}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
