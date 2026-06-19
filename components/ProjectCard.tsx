"use client";

import { useRef, useEffect } from "react";
import type { Project } from "@/data/projects";
import TechChip from "./TechChip";

const EXP_W = 680;
const EXP_H = 500;
const CARD_H = 280;

interface Props {
  project: Project;
  index: number;
  isExpanded: boolean;
  isDimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

export default function ProjectCard({
  project,
  index,
  isExpanded,
  isDimmed,
  onEnter,
  onLeave,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!inner || !wrapper) return;

    if (isExpanded) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const containerEl = wrapper.closest(".proj-grid") as HTMLElement;
      const containerRect = containerEl?.getBoundingClientRect() ?? wrapperRect;

      const wrapperW = wrapperRect.width;

      // Center horizontally, clamp within container
      let relLeft = (wrapperW - EXP_W) / 2;
      const absLeft = wrapperRect.left + relLeft;
      if (absLeft < containerRect.left) relLeft += containerRect.left - absLeft;
      const absRight = wrapperRect.left + relLeft + EXP_W;
      if (absRight > containerRect.right) relLeft -= absRight - containerRect.right;

      // Center vertically, clamp so top doesn't go above viewport
      let relTop = (CARD_H - EXP_H) / 2;
      const absTop = wrapperRect.top + relTop;
      if (absTop < 8) relTop += 8 - absTop;

      inner.style.transition =
        "left 350ms ease-out, top 350ms ease-out, width 350ms ease-out, height 350ms ease-out, box-shadow 350ms ease-out";
      inner.style.left = `${relLeft}px`;
      inner.style.top = `${relTop}px`;
      inner.style.width = `${EXP_W}px`;
      inner.style.height = `${EXP_H}px`;
      inner.style.boxShadow = "0 32px 80px rgba(0,0,0,0.8)";
      wrapper.style.zIndex = "100";
    } else {
      inner.style.transition =
        "left 350ms ease-out, top 350ms ease-out, width 350ms ease-out, height 350ms ease-out, box-shadow 350ms ease-out";
      inner.style.left = "0px";
      inner.style.top = "0px";
      inner.style.width = "100%";
      inner.style.height = `${CARD_H}px`;
      inner.style.boxShadow = "none";
      const t = setTimeout(() => {
        if (wrapper) wrapper.style.zIndex = "";
      }, 360);
      return () => clearTimeout(t);
    }
  }, [isExpanded]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${CARD_H}px` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={innerRef}
        className="absolute left-0 top-0 w-full rounded-xl border bg-card flex flex-col overflow-hidden"
        style={{
          height: `${CARD_H}px`,
          zIndex: isExpanded ? 9999 : 1,
          borderColor: isExpanded ? "rgba(13,148,136,0.4)" : "#1E2626",
          opacity: isDimmed ? 0.35 : 1,
          filter: isDimmed ? "blur(1px)" : "none",
          transform: isDimmed ? "scale(0.97)" : "scale(1)",
          transition: "opacity 250ms, filter 250ms, transform 250ms, border-color 250ms",
        }}
      >
        {/* Default face */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6"
          style={{
            opacity: isExpanded ? 0 : 1,
            transition: "opacity 150ms",
            pointerEvents: isExpanded ? "none" : "auto",
          }}
        >
          <div>
            <div className="flex items-start justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-muted text-sm">✦</span>
            </div>
            <h3 className="font-display text-xl font-bold text-text mb-1 leading-tight">
              {project.name}
            </h3>
            <p className="text-[13px] text-muted leading-snug">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <TechChip key={s} name={s} />
            ))}
          </div>
        </div>

        {/* Expanded face */}
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            opacity: isExpanded ? 1 : 0,
            transition: "opacity 200ms 80ms",
            pointerEvents: isExpanded ? "auto" : "none",
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-primary">{project.name}</h3>
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[12px] text-muted mt-0.5">{project.tagline}</p>
          </div>

          {/* Body: 2-col */}
          <div className="flex-1 grid grid-cols-2 overflow-hidden min-h-0">
            {/* Left: Problem + Solution */}
            <div className="px-5 py-4 border-r border-border overflow-y-auto flex flex-col gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary mb-1.5">
                  Problem
                </p>
                <p className="text-[12px] text-muted leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary mb-1.5">
                  Solution
                </p>
                <p className="text-[12px] text-muted leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Right: Features */}
            <div className="px-5 py-4 overflow-y-auto">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mb-2">
                Key Features
              </p>
              <ul className="flex flex-col gap-1.5">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-muted">
                    <span className="text-primary shrink-0 mt-px">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer: chips + links */}
          <div
            className="px-5 py-3 border-t border-border flex items-center justify-between shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <TechChip key={s} name={s} />
              ))}
            </div>
            <div className="flex gap-2 shrink-0 ml-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] border border-border text-muted px-3 py-1 rounded hover:border-border-2 hover:text-text transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] bg-primary text-bg px-3 py-1 rounded hover:bg-primary/90 transition-colors"
                >
                  Live ↗
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] bg-secondary text-bg px-3 py-1 rounded hover:bg-secondary/90 transition-colors"
                >
                  Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
