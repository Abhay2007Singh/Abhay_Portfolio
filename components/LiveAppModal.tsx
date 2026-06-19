"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  url: string;
  title: string;
  coldStart?: boolean;
  onClose: () => void;
}

export default function LiveAppModal({ url, title, coldStart, onClose }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!url) return;
    setLoaded(false);
    const iframe = iframeRef.current;
    if (iframe) iframe.src = url;
    closeRef.current?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (iframe) iframe.src = "about:blank";
    };
  }, [url, onClose]);

  return (
    <AnimatePresence>
      {url && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 sm:inset-x-8 top-[4vh] bottom-[4vh] z-50 max-w-5xl mx-auto flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`Live app: ${title}`}
          >
            {/* Device frame */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl">
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card-2 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-error/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 bg-bg border border-border rounded px-3 py-1">
                  <span className="font-mono text-[11px] text-muted truncate">{url}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                    title="Open in new tab"
                  >
                    ↗
                  </a>
                  <button
                    ref={closeRef}
                    onClick={onClose}
                    className="text-muted hover:text-text transition-colors font-mono text-[10px] border border-border px-2 py-1 rounded"
                    aria-label="Close live app"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Cold start notice */}
              {coldStart && !loaded && (
                <div className="px-4 py-2 bg-warning/10 border-b border-warning/20 font-mono text-[11px] text-warning text-center shrink-0">
                  First load may take 30–60s if the service is idle (Render free tier cold start)
                </div>
              )}

              {/* Loading state */}
              <div className="relative flex-1 min-h-0">
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card z-10">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="font-mono text-xs text-muted">Loading {title}…</span>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  title={title}
                  className="w-full h-full border-0"
                  onLoad={() => setLoaded(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
