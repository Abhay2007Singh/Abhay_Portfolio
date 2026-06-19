"use client";

import { skillCategories } from "@/data/skills";

// Flat map of skill name → url, case-insensitive
const SKILL_URLS = new Map<string, string>();
for (const cat of skillCategories) {
  for (const skill of cat.skills) {
    SKILL_URLS.set(skill.name.toLowerCase(), skill.url);
  }
}

function getUrl(name: string): string | undefined {
  return SKILL_URLS.get(name.toLowerCase());
}

interface Props {
  name: string;
  primary?: boolean;
  className?: string;
}

export default function TechChip({ name, primary, className = "" }: Props) {
  const url = getUrl(name);

  const base = `font-mono text-[11px] px-2 py-0.5 rounded border transition-all duration-150 ${
    primary
      ? "text-primary border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/60"
      : "text-muted border-border hover:text-text hover:border-border-2"
  } ${className}`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        onClick={(e) => e.stopPropagation()}
      >
        {name}
      </a>
    );
  }

  return <span className={base}>{name}</span>;
}
