"use client";

import { motion } from "framer-motion";
import { experiences, achievements } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 sm:py-32 border-t border-border"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
            06 / Experience
          </div>
          <h2
            id="experience-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text"
          >
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-0 w-px bg-border hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="sm:pl-10 relative"
              >
                {/* Dot */}
                <div
                  className="hidden sm:block absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-primary border-2 border-bg"
                  aria-hidden="true"
                />

                <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
                  {exp.period}
                </div>
                <h3 className="font-display text-lg font-bold text-text mb-0.5">{exp.role}</h3>
                <div className="font-mono text-xs text-primary mb-4">{exp.company}</div>

                <ul className="space-y-2">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-primary shrink-0 mt-1">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] mb-6">
            Recognition
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a.id} className="border border-border rounded-xl bg-card p-5 flex gap-4">
                <span className="text-warning text-xl shrink-0 mt-0.5">◆</span>
                <div>
                  <div className="font-display text-sm font-bold text-text mb-1">{a.title}</div>
                  <div className="font-mono text-xs text-muted">{a.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
