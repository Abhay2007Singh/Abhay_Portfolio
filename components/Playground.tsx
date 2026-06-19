"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import TechChip from "./TechChip";

interface AppConfig {
  id: string;
  name: string;
  subtitle: string;
  tech: string[];
  url: string;
  githubUrl: string;
  archId: string;
  coldStart?: boolean;
}

const APPS: AppConfig[] = [
  {
    id: "owallet",
    name: "OWallet",
    subtitle: "Distributed Digital Wallet Platform",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    url: "https://o-wallet-three.vercel.app/",
    githubUrl: "https://github.com/Abhay2007Singh/OWallet",
    archId: "owallet",
  },
  {
    id: "gig-ledger",
    name: "Gig Ledger",
    subtitle: "AI Income Verification Platform",
    tech: ["Python", "Gemini API", "SQLite", "pdfplumber"],
    url: "https://gig-worker-cn9t.onrender.com",
    githubUrl: "https://github.com/Abhay2007Singh/gig_worker",
    archId: "gig-ledger",
    coldStart: true,
  },
];

type IframeState = "idle" | "loading" | "loaded" | "error";

function PlaygroundCard({ app }: { app: AppConfig }) {
  const [iframeState, setIframeState] = useState<IframeState>("idle");
  const [src, setSrc] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Load iframe only when card enters viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIframeState("loading");
          setSrc(app.url);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, [app.url]);

  const handleLoad = useCallback(() => setIframeState("loaded"), []);
  const handleError = useCallback(() => setIframeState("error"), []);

  // Detect X-Frame-Options block: iframe loads but shows error page
  useEffect(() => {
    if (iframeState !== "loading") return;
    const timer = setTimeout(() => {
      // If still loading after 12s, assume blocked
      if (iframeState === "loading") setIframeState("error");
    }, 12000);
    return () => clearTimeout(timer);
  }, [iframeState]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.005 }}
      className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(13,148,136,0.07)] hover:border-primary/30"
      style={{ height: "700px" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-border shrink-0">
        <div>
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-0.5">
            Live Preview
          </div>
          <h3 className="font-display text-lg font-bold text-text leading-tight">{app.name}</h3>
          <p className="font-mono text-xs text-muted mt-0.5">{app.subtitle}</p>
        </div>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors shrink-0 ml-4 whitespace-nowrap"
        >
          Open Full App ↗
        </a>
      </div>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 px-5 py-2.5 border-b border-border shrink-0">
        {app.tech.map((t) => (
          <TechChip key={t} name={t} />
        ))}
        {app.coldStart && (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-warning/30 bg-warning/5 text-warning ml-auto">
            ⚡ Render cold start ~30s
          </span>
        )}
      </div>

      {/* Iframe area */}
      <div ref={wrapperRef} className="flex-1 relative bg-bg min-h-0">

        {/* Idle — waiting to enter viewport */}
        {iframeState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted">
              ↓
            </div>
            <p className="font-mono text-xs text-muted">Scroll to load</p>
          </div>
        )}

        {/* Loading skeleton */}
        {iframeState === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-bg">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <div className="text-center">
              <p className="font-mono text-xs text-text">Loading {app.name}…</p>
              {app.coldStart && (
                <p className="font-mono text-[10px] text-muted mt-1">
                  Hosted on Render — first load may take ~30s
                </p>
              )}
            </div>
            {/* Skeleton lines */}
            <div className="w-64 flex flex-col gap-2 mt-2">
              {[80, 60, 72, 50].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded bg-border animate-pulse"
                  style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {iframeState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center z-10">
            <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-2xl">
              🔒
            </div>
            <div>
              <p className="font-display text-base font-bold text-text mb-1">Preview unavailable</p>
              <p className="font-mono text-xs text-muted max-w-xs leading-relaxed">
                This application blocks embedded previews via X-Frame-Options. Open the full app to interact with it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] bg-primary text-bg px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Open Full App ↗
              </a>
              <a
                href={app.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] border border-border text-muted px-4 py-2 rounded-lg hover:border-border-2 hover:text-text transition-colors"
              >
                View GitHub ↗
              </a>
            </div>
          </div>
        )}

        {/* Actual iframe */}
        {(iframeState === "loading" || iframeState === "loaded") && src && (
          <iframe
            ref={iframeRef}
            src={src}
            onLoad={handleLoad}
            onError={handleError}
            title={app.name}
            className="absolute inset-0 w-full h-full border-0 rounded-b-2xl"
            style={{ opacity: iframeState === "loaded" ? 1 : 0, transition: "opacity 0.3s" }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border shrink-0">
        <div className="flex gap-2">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] bg-primary text-bg px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Open Full App ↗
          </a>
          <a
            href={app.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] border border-border text-muted px-3 py-1.5 rounded-lg hover:border-border-2 hover:text-text transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={`#architecture`}
            className="font-mono text-[11px] border border-border text-muted px-3 py-1.5 rounded-lg hover:border-border-2 hover:text-text transition-colors"
          >
            Architecture ↓
          </a>
        </div>
        <div
          className={`w-2 h-2 rounded-full ${
            iframeState === "loaded" ? "bg-primary animate-pulse" :
            iframeState === "error" ? "bg-error" :
            "bg-muted"
          }`}
          title={iframeState === "loaded" ? "Live" : iframeState === "error" ? "Blocked" : "Loading"}
        />
      </div>
    </motion.div>
  );
}

export default function Playground() {
  return (
    <section
      id="playground"
      className="py-24 sm:py-32 border-t border-border"
      aria-labelledby="playground-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
            04 / Playground
          </div>
          <h2
            id="playground-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text mb-4"
          >
            Try My Applications
          </h2>
          <p className="text-muted text-sm max-w-xl leading-relaxed">
            Experience selected projects directly inside the portfolio. These are embedded previews
            of the actual deployed applications running in production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {APPS.map((app) => (
            <PlaygroundCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
