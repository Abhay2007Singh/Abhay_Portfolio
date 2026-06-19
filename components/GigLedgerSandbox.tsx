"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const INCOME_DATA = [18200, 21400, 19800, 24100, 22600, 26300];
const PLATFORMS = [
  { name: "Uber", pct: 42, color: "#0D9488" },
  { name: "Swiggy", pct: 31, color: "#60A5FA" },
  { name: "Zomato", pct: 27, color: "#F59E0B" },
];

const AI_SUMMARY = `Income pattern shows consistent upward trend over 6 months (+44.5% growth).
Primary platform: Uber (42%). Stability score: 8.1/10. Seasonal variance is within
acceptable range (σ = ₹2,847). Suitable for rental or credit verification purposes.`;

export default function GigLedgerSandbox({ onLaunch }: { onLaunch: () => void }) {
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 1400));
    setRunning(false);
    setRan(true);
  };

  const maxIncome = Math.max(...INCOME_DATA);

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card-2">
        <div>
          <div className="font-mono text-[10px] text-secondary uppercase tracking-[0.2em] mb-0.5">
            Gig Ledger
          </div>
          <h3 className="font-display text-sm font-bold text-text">Income Analysis Sandbox</h3>
        </div>
        <button
          onClick={onLaunch}
          className="font-mono text-[10px] text-secondary border border-secondary/30 px-3 py-1.5 rounded hover:bg-secondary/10 transition-colors uppercase tracking-widest"
        >
          Live App ↗
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* File selector mock */}
        <div className="border border-dashed border-border-2 rounded-lg p-4 text-center bg-card-2">
          <div className="font-mono text-xs text-muted mb-2">Sample income PDF loaded</div>
          <div className="font-mono text-[11px] text-text border border-border rounded px-3 py-1.5 inline-block bg-bg">
            📄 gig_income_jan_jun_2025.pdf
          </div>
        </div>

        <button
          onClick={handleRun}
          disabled={running}
          className="w-full font-mono text-xs bg-secondary text-bg py-2.5 rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest font-semibold"
        >
          {running ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 border border-bg/30 border-t-bg rounded-full animate-spin" />
              Running Gemini analysis…
            </span>
          ) : ran ? (
            "Run Again"
          ) : (
            "Run Sample Analysis"
          )}
        </button>

        <AnimatePresence>
          {ran && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Stability score */}
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-border rounded-lg p-3 text-center bg-card-2">
                  <div className="font-display text-xl font-bold text-primary">8.1</div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest mt-0.5">Stability</div>
                </div>
                <div className="border border-border rounded-lg p-3 text-center bg-card-2">
                  <div className="font-display text-xl font-bold text-secondary">₹132K</div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest mt-0.5">6-mo Total</div>
                </div>
                <div className="border border-border rounded-lg p-3 text-center bg-card-2">
                  <div className="font-display text-xl font-bold text-warning">+44%</div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-widest mt-0.5">Growth</div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="border border-border rounded-lg p-4 bg-card-2">
                <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
                  Monthly Income Trend
                </div>
                <div className="flex items-end gap-2 h-24">
                  {INCOME_DATA.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(v / maxIncome) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="w-full rounded-t-sm bg-primary/60"
                        style={{ minHeight: "4px" }}
                      />
                      <span className="font-mono text-[9px] text-muted">{MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform breakdown */}
              <div className="border border-border rounded-lg p-4 bg-card-2">
                <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
                  Platform Breakdown
                </div>
                <div className="space-y-2">
                  {PLATFORMS.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted w-14">{p.name}</span>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: p.color }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted w-8 text-right">
                        {p.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI summary */}
              <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                    Gemini AI Summary
                  </span>
                </div>
                <p className="font-mono text-[11px] text-muted/90 leading-relaxed">{AI_SUMMARY}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
