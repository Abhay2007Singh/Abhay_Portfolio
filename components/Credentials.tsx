"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { credentials, type Credential } from "@/data/credentials";

function CertModal({ cert, onClose }: { cert: Credential | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cert) return;
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 sm:inset-x-10 lg:inset-x-20 top-[5vh] bottom-[5vh] z-50 max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${cert.title}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <div>
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-0.5">Certificate</div>
                <h3 className="font-display text-lg font-bold text-text leading-tight">{cert.title}</h3>
                <p className="font-mono text-xs text-primary mt-0.5">{cert.issuer} · {cert.date}</p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="text-muted hover:text-text transition-colors p-2 text-xl leading-none ml-4 shrink-0"
                aria-label="Close certificate"
              >✕</button>
            </div>

            {/* PDF iframe — fills remaining space */}
            <div className="flex-1 min-h-0">
              <iframe
                src={cert.previewUrl}
                className="w-full h-full border-0"
                title={cert.title}
                allow="autoplay"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border flex items-center justify-between gap-4 shrink-0">
              <p className="text-xs text-muted leading-relaxed">{cert.description}</p>
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-primary border border-primary/30 px-4 py-2 rounded whitespace-nowrap hover:bg-primary/10 transition-colors shrink-0"
                >
                  Verify ↗
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Credentials() {
  const [selected, setSelected] = useState<Credential | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <section
        id="credentials"
        className="py-24 sm:py-32 border-t border-border"
        aria-labelledby="credentials-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
              07 / Credentials
            </div>
            <h2 id="credentials-heading" className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">
              Certifications
            </h2>
            <p className="text-muted text-sm max-w-xl leading-relaxed">
              Click any card to preview the certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((cert, i) => (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setSelected(cert)}
                className="text-left border border-border rounded-xl bg-card overflow-hidden hover:border-primary/40 transition-all duration-200 group"
                aria-label={`View certificate: ${cert.title} by ${cert.issuer}`}
              >
                {/* Thumbnail — iframe preview scaled down */}
                <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: "4/3" }}>
                  <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
                    <iframe
                      src={cert.previewUrl}
                      title={`${cert.title} preview`}
                      className="border-0 origin-top-left"
                      style={{
                        width: "300%",
                        height: "300%",
                        transform: "scale(0.333)",
                        transformOrigin: "top left",
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 border-t border-border">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">{cert.issuer}</div>
                  <h3 className="font-display text-sm font-bold text-text group-hover:text-primary transition-colors leading-snug mb-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted">{cert.date}</span>
                    <span className="font-mono text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <CertModal cert={selected} onClose={close} />
    </>
  );
}
