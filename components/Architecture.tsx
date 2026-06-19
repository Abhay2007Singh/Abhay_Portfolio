"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { architectures, type ArchEntry } from "@/data/architecture";
import ArchModal from "./ArchModal";

const ICONS: Record<string, string> = {
  owallet: "◎",
  safeshop: "◈",
  jobtracker: "◉",
  "gig-ledger": "◐",
  sanket: "◑",
};

export default function Architecture() {
  const [selected, setSelected] = useState<ArchEntry | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <section
        id="architecture"
        className="py-24 sm:py-32 border-t border-border"
        aria-labelledby="arch-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
              03 / Architecture
            </div>
            <h2
              id="arch-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-text mb-4"
            >
              Engineering Architecture
            </h2>
            <p className="text-muted text-sm max-w-xl leading-relaxed">
              Click any project to open a detailed architecture viewer with system diagrams,
              component breakdown, data flows, and scaling considerations.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {architectures.map((entry, i) => (
              <motion.button
                key={entry.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setSelected(entry)}
                className="text-left border border-border rounded-xl bg-card p-6 hover:border-primary/40 hover:bg-card-2 transition-all duration-200 group"
                aria-label={`Open architecture viewer for ${entry.name}`}
              >
                <div className="text-3xl text-primary mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">
                  {ICONS[entry.id] ?? "◇"}
                </div>
                <h3 className="font-display text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors">
                  {entry.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{entry.tagline}</p>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-primary uppercase tracking-widest">
                  <span>View diagram</span>
                  <span>→</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ArchModal entry={selected} onClose={close} />
    </>
  );
}
