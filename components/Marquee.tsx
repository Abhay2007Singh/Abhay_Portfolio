const ITEMS = [
  "Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "Celery",
  "React", "Gemini API", "WebSockets", "SQLAlchemy", "Alembic",
  "TensorFlow", "MediaPipe", "OpenCV", "TypeScript", "pytest",
];

export default function Marquee() {
  const text = ITEMS.join("  ·  ");

  return (
    <div
      className="overflow-hidden border-t border-b border-border py-3 bg-card"
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[text, text].map((t, i) => (
          <span key={i} className="font-mono text-xs text-muted px-8 shrink-0">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
