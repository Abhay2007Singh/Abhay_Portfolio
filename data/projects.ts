export interface Project {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  problem: string;
  solution: string;
  features: string[];
  miniArch: string;
  metrics: string[];
}

export const projects: Project[] = [
  {
    id: "gig-ledger",
    name: "Gig Ledger",
    tagline: "AI income verification for gig workers",
    stack: ["Python", "Gemini API", "SQLite", "pdfplumber"],
    liveUrl: "https://gig-worker-cn9t.onrender.com",
    githubUrl: "https://github.com/Abhay2007Singh/gig_worker",
    problem:
      "Gig workers lack formal income documentation that banks and landlords accept. Inconsistent PDF formats across platforms and variable multi-source income make automated verification nearly impossible.",
    solution:
      "A three-tier PDF parsing pipeline (Gemini LLM extraction → table detection → line scanner) that handles inconsistent bank formats, tags transactions to gig platforms with confidence scoring, and generates LLM summaries with guardrails that validate every number against the analytics output.",
    features: [
      "Three-tier fallback parser: Gemini LLM extraction → table detection → line scanner",
      "Confidence-scored classifier tagging transactions to platforms (Swiggy, Zomato, Uber, Ola, Rapido) — unclear cases routed to manual confirmation",
      "SQLite ledger and analytics engine: OLS regression for income trend, volatility, and income gap detection",
      "LLM summary layer with guardrails — rejects any figure not validated against analytics output",
      "76 automated tests covering the full pipeline",
    ],
    miniArch: "PDF → 3-tier parser → confidence classifier → SQLite ledger → OLS analytics → Gemini summary (guardrailed)",
    metrics: [
      "Three-tier fallback handles inconsistent bank PDF formats",
      "76 automated tests covering full pipeline",
      "Guardrails prevent LLM from inventing figures — every number validated against analytics",
    ],
  },
  {
    id: "owallet",
    name: "OWallet",
    tagline: "Concurrency-safe digital wallet backend",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
    liveUrl: "https://o-wallet-three.vercel.app/",
    githubUrl: "https://github.com/Abhay2007Singh/OWallet",
    problem:
      "Digital wallet backends are prone to race conditions on concurrent transfers — double-spends, negative balances, and missing ledger entries are common failure modes in naive implementations.",
    solution:
      "Row-level locking in PostgreSQL guarantees atomic debit/credit pairs. Redis idempotency keys (SHA-256 hashed) prevent duplicate submissions. Celery workers handle async ledger writes with automatic retry.",
    features: [
      "Atomic P2P transfers using PostgreSQL transactions and row-level locking",
      "Deadlock-safe locking: wallet locks acquired in fixed UUID order; refresh-token replay attacks detected by invalidating all sessions on reuse",
      "Redis-based idempotency locks with request hashing — each transaction processed exactly once",
      "Append-only transaction ledger with Celery workers for async processing, retry handling, and fault-tolerant execution",
      "Deployed across four services — Supabase, Render, Railway, Vercel — as a distributed system",
    ],
    miniArch:
      "FastAPI → Redis idempotency check → PostgreSQL row-lock transaction → Celery ledger append (distributed: Supabase + Render + Railway + Vercel)",
    metrics: [
      "Deadlock-safe by design: UUID-ordered lock acquisition eliminates circular waits",
      "Idempotency guarantees exactly-once processing on retry",
      "Distributed across 4 managed services — no single hosted box",
    ],
  },
  {
    id: "sanket",
    name: "Sanket",
    tagline: "Real-time sign-language translation",
    stack: ["OpenCV", "MediaPipe", "TensorFlow", "PyTorch"],
    demoUrl:
      "https://drive.google.com/drive/folders/1_3HRBfdZ4eMxqAYFtbOkR6cGck1P4yt3",
    problem:
      "Sign-language interpretation requires a trained human interpreter, creating communication barriers in real-time contexts like education and public services.",
    solution:
      "MediaPipe extracts hand landmark coordinates from live webcam frames; a TensorFlow/PyTorch classifier maps 21-point hand graphs to sign labels in real time.",
    features: [
      "Real-time hand landmark detection via MediaPipe Hands",
      "21-keypoint skeleton fed into custom gesture classifier",
      "TensorFlow + PyTorch dual framework training pipeline",
      "OpenCV video capture with on-frame annotation overlay",
      "Extensible dataset: add new signs by recording additional samples",
    ],
    miniArch:
      "Webcam → OpenCV capture → MediaPipe landmarks → classifier (TF/PyTorch) → label overlay",
    metrics: [
      "Real-time inference at webcam frame rate",
      "Landmark-based approach generalises across hand sizes",
      "Modular dataset pipeline for adding new signs",
    ],
  },
  {
    id: "jobtracker",
    name: "JobTracker",
    tagline: "AI job-application tracker: Gmail → Telegram → Sheets",
    stack: [
      "Gemini",
      "python-telegram-bot",
      "SQLAlchemy",
      "Alembic",
      "APScheduler",
      "Gmail API",
      "Sheets API",
    ],
    githubUrl: "https://github.com/Abhay2007Singh/JobTracker",
    problem:
      "Tracking job applications across email threads, spreadsheets, and calendar reminders is manual and error-prone — important follow-ups get missed.",
    solution:
      "A local AI automation pipeline: APScheduler polls Gmail API, Gemini classifies each email (offer/rejection/interview), SQLAlchemy + Alembic persist state, and a Telegram bot surfaces alerts with Google Sheets export.",
    features: [
      "APScheduler polls Gmail API on configurable interval",
      "Gemini classifies email intent (interview, offer, rejection, follow-up)",
      "SQLAlchemy models + Alembic migrations for local state persistence",
      "Telegram bot for real-time push notifications and query commands",
      "Google Sheets export for a human-readable application dashboard",
    ],
    miniArch:
      "APScheduler → Gmail API → Gemini classification → SQLAlchemy DB → Telegram bot + Sheets",
    metrics: [
      "Automated classification removes manual email triage",
      "Alembic migrations keep schema evolution reproducible",
      "Telegram push ensures zero missed follow-up windows",
    ],
  },
  {
    id: "safeshop",
    name: "SafeShop",
    tagline: "Production e-commerce REST API with auth, caching & real-time order updates",
    stack: [
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Redis",
      "JWT",
      "WebSockets",
      "pytest",
    ],
    githubUrl: "https://github.com/Abhay2007Singh/SafeShop",
    problem:
      "E-commerce APIs commonly skip three things: proper role separation, cache invalidation on inventory mutation, and real-time order status for clients.",
    solution:
      "FastAPI with three-role RBAC (Admin/Seller/Customer) backed by python-jose JWT. Redis caches product listings with write-through invalidation. WebSockets push live order-status events. pytest covers every route.",
    features: [
      "Three-role RBAC: Admin, Seller, Customer — no privilege escalation possible",
      "JWT auth with python-jose, token rotation and refresh",
      "Redis write-through cache on product listings with mutation invalidation",
      "WebSocket endpoint for real-time order status updates",
      "slowapi rate limiting on public endpoints",
      "Alembic migrations for reproducible schema evolution",
      "Full pytest suite — every endpoint validated before merge",
    ],
    miniArch:
      "Client → FastAPI router (RBAC) → Redis cache → PostgreSQL (SQLAlchemy) → WebSocket broadcast",
    metrics: [
      "100% endpoint coverage in pytest suite",
      "Redis cache reduces DB reads on product listing hot path",
      "WebSocket delivery eliminates polling for order status",
    ],
  },
];
