"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArchEntry } from "@/data/architecture";
import ArchDiagram from "./ArchDiagram";

interface Props {
  entry: ArchEntry | null;
  onClose: () => void;
}

export default function ArchModal({ entry, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!entry) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      prev?.focus();
    };
  }, [entry, onClose]);

  // Trap focus inside modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      {entry && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 sm:inset-x-8 top-[5vh] bottom-[5vh] z-50 max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="arch-modal-title"
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <div>
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-0.5">
                  Architecture
                </div>
                <h2 id="arch-modal-title" className="font-display text-xl font-bold text-text">
                  {entry.name}
                </h2>
                <p className="text-xs text-muted mt-0.5">{entry.tagline}</p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="text-muted hover:text-text transition-colors p-2 rounded"
                aria-label="Close architecture viewer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* SVG diagram */}
              <div className="border border-border rounded-lg bg-card-2 p-4">
                <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] mb-4">
                  System Diagram
                </div>
                <ArchDiagram diagram={entry.diagram} />
              </div>

              {/* Two-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Components */}
                <Section title="Components" color="text-secondary">
                  {entry.components.map((c, i) => (
                    <Item key={i} text={c} bullet="›" bulletColor="text-secondary" />
                  ))}
                </Section>

                {/* Data flow */}
                <Section title="Data Flow" color="text-primary">
                  {entry.dataFlow.map((d, i) => (
                    <li key={i} className="text-xs text-muted flex gap-2">
                      <span className="text-primary shrink-0 font-mono">{i + 1}.</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </Section>

                {/* Tech choices */}
                <Section title="Technology Choices" color="text-warning">
                  {entry.techChoices.map((t, i) => (
                    <Item key={i} text={t} bullet="·" bulletColor="text-warning" />
                  ))}
                </Section>

                {/* Scaling */}
                <Section title="Scaling Considerations" color="text-muted">
                  {entry.scaling.map((s, i) => (
                    <Item key={i} text={s} bullet="—" bulletColor="text-muted" />
                  ))}
                </Section>
              </div>

              {/* Future */}
              <Section title="Future Improvements" color="text-muted">
                <div className="flex flex-wrap gap-2">
                  {entry.future.map((f) => (
                    <span
                      key={f}
                      className="font-mono text-[11px] text-muted border border-border px-2.5 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-3 ${color}`}>
        {title}
      </div>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function Item({
  text,
  bullet,
  bulletColor,
}: {
  text: string;
  bullet: string;
  bulletColor: string;
}) {
  return (
    <li className="text-xs text-muted flex gap-2">
      <span className={`${bulletColor} shrink-0 mt-0.5`}>{bullet}</span>
      <span>{text}</span>
    </li>
  );
}
