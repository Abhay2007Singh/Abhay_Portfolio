"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const COLLAPSE_DELAY = 80;

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((id: string) => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleLeave = useCallback(() => {
    collapseTimer.current = setTimeout(() => setExpandedId(null), COLLAPSE_DELAY);
  }, []);

  useEffect(
    () => () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    },
    []
  );

  return (
    <section id="projects" className="py-24 sm:py-32" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">
            02 / Work
          </div>
          <h2
            id="projects-heading"
            className="font-display text-4xl sm:text-5xl font-bold text-text mb-4"
          >
            Projects
          </h2>
          <p className="text-muted text-sm max-w-xl leading-relaxed">
            <span className="hidden sm:inline">Hover any card to see the problem, solution, and engineering notes.</span>
            <span className="sm:hidden">Tap any card to expand the details.</span>
          </p>
        </div>

        {/* 3-col grid — wrappers have fixed height, inner card expands absolutely */}
        <div
          className="proj-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isExpanded={expandedId === project.id}
              isDimmed={expandedId !== null && expandedId !== project.id}
              onEnter={() => handleEnter(project.id)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
