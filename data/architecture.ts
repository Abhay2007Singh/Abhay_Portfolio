export interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ArchDiagram {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export interface ArchEntry {
  id: string;
  name: string;
  tagline: string;
  components: string[];
  dataFlow: string[];
  techChoices: string[];
  scaling: string[];
  future: string[];
  diagram: ArchDiagram;
}

export const architectures: ArchEntry[] = [
  {
    id: "owallet",
    name: "OWallet",
    tagline: "Concurrency-safe digital wallet backend",
    components: [
      "FastAPI — async HTTP layer, request validation via Pydantic",
      "PostgreSQL — source of truth; row-level locking for atomic transfers",
      "Redis — idempotency key store with TTL; prevents duplicate submissions",
      "Celery + RabbitMQ — async ledger writes; auto-retry on failure",
      "Docker Compose — reproducible local and CI environment",
    ],
    dataFlow: [
      "Client sends POST /transfer with idempotency key",
      "FastAPI checks Redis — return cached result if key exists",
      "Acquire row-level locks on sender + receiver accounts",
      "Execute debit/credit atomically inside a DB transaction",
      "Dispatch Celery task to append ledger entry asynchronously",
      "Return tx_id; Celery worker writes ledger, retries on crash",
    ],
    techChoices: [
      "PostgreSQL row-level locking over application-layer mutex — DB guarantees atomicity across processes",
      "Redis for idempotency over DB unique constraint — faster TTL-based expiry, no table growth",
      "Celery for ledger writes — decouples audit trail from the hot transfer path",
    ],
    scaling: [
      "Horizontal FastAPI replicas behind a load balancer (stateless)",
      "Read replicas for balance queries; primary only for writes",
      "Redis Cluster for idempotency at scale",
      "Celery worker pool scaled independently of API tier",
    ],
    future: [
      "Event sourcing: rebuild balance from ledger on demand",
      "Saga pattern for multi-hop transfers",
      "gRPC internal transport between services",
    ],
    diagram: {
      nodes: [
        { id: "client", label: "Client", x: 60, y: 120, color: "#60A5FA" },
        { id: "api", label: "FastAPI", x: 220, y: 120, color: "#0D9488" },
        { id: "redis", label: "Redis", x: 380, y: 60, color: "#F59E0B" },
        { id: "pg", label: "PostgreSQL", x: 380, y: 180, color: "#60A5FA" },
        { id: "celery", label: "Celery", x: 540, y: 120, color: "#6B7F7F" },
        { id: "ledger", label: "Ledger", x: 680, y: 120, color: "#22C55E" },
      ],
      edges: [
        { from: "client", to: "api", label: "POST /transfer" },
        { from: "api", to: "redis", label: "idempotency check" },
        { from: "api", to: "pg", label: "row-lock + atomic tx" },
        { from: "api", to: "celery", label: "dispatch task" },
        { from: "celery", to: "ledger", label: "append entry" },
      ],
    },
  },
  {
    id: "safeshop",
    name: "SafeShop",
    tagline: "Production e-commerce REST API",
    components: [
      "FastAPI — routers per domain (products, orders, inventory, auth)",
      "PostgreSQL + SQLAlchemy — ORM models with Alembic migrations",
      "Redis — write-through product listing cache",
      "python-jose — JWT issuing, validation, and rotation",
      "slowapi — rate limiting on public endpoints",
      "WebSockets — real-time order status push",
      "pytest — full endpoint coverage suite",
    ],
    dataFlow: [
      "Request hits FastAPI; JWT decoded and role extracted",
      "RBAC middleware checks role against route permission map",
      "Product read: check Redis cache → DB fallback on miss",
      "Product write: update DB → invalidate Redis key",
      "Order placed: DB write → WebSocket broadcast to client",
      "pytest CI runs on every PR, all routes validated",
    ],
    techChoices: [
      "Three-role RBAC at middleware layer — single enforcement point, no per-handler checks",
      "Redis write-through (not write-back) — simpler invalidation, no stale-read window",
      "WebSockets over polling — eliminates N×polling load on order status",
      "slowapi for rate limiting — FastAPI-native, no separate proxy needed",
    ],
    scaling: [
      "Stateless FastAPI replicas; JWT verified locally (no session store)",
      "Redis Cluster for cache tier",
      "Connection pooling via SQLAlchemy pool_size + max_overflow",
      "WebSocket connections handled per replica; pub/sub via Redis for multi-replica broadcast",
    ],
    future: [
      "Separate inventory service with its own DB",
      "Elasticsearch for product search",
      "Stripe webhook integration for payment state machine",
    ],
    diagram: {
      nodes: [
        { id: "client", label: "Client", x: 60, y: 130, color: "#60A5FA" },
        { id: "api", label: "FastAPI\n(RBAC)", x: 220, y: 130, color: "#0D9488" },
        { id: "redis", label: "Redis\nCache", x: 400, y: 60, color: "#F59E0B" },
        { id: "pg", label: "PostgreSQL", x: 400, y: 200, color: "#60A5FA" },
        { id: "ws", label: "WebSocket", x: 580, y: 80, color: "#6B7F7F" },
        { id: "pytest", label: "pytest CI", x: 580, y: 200, color: "#22C55E" },
      ],
      edges: [
        { from: "client", to: "api", label: "JWT + request" },
        { from: "api", to: "redis", label: "cache read/write" },
        { from: "api", to: "pg", label: "ORM query" },
        { from: "api", to: "ws", label: "order event" },
        { from: "pytest", to: "api", label: "CI test suite" },
      ],
    },
  },
  {
    id: "jobtracker",
    name: "JobTracker",
    tagline: "AI job-application automation pipeline",
    components: [
      "APScheduler — polls Gmail API on configurable cron interval",
      "Gmail API — reads unread email threads matching job keywords",
      "Gemini API — classifies email intent (offer/rejection/interview/follow-up)",
      "SQLAlchemy + SQLite — local application state with Alembic migrations",
      "python-telegram-bot — push notifications + interactive query commands",
      "Google Sheets API — exports structured dashboard for human review",
    ],
    dataFlow: [
      "APScheduler fires on interval; fetches unread Gmail threads",
      "Each thread passed to Gemini with classification prompt",
      "Gemini returns structured label + confidence",
      "SQLAlchemy persists result; Alembic handles schema migrations",
      "Telegram bot sends push alert for high-priority labels (offer, interview)",
      "Sheets API syncs full application table on each run",
    ],
    techChoices: [
      "APScheduler over cron job — Python-native, portable, no OS config",
      "Gemini for classification — structured JSON output, handles noisy email prose",
      "SQLite for local persistence — zero-dependency, no server needed for a local tool",
      "Telegram bot over email alerts — instant mobile delivery, interactive commands",
    ],
    scaling: [
      "Currently a local pipeline — runs on developer machine or home server",
      "Could be containerised and deployed to a cheap VPS for 24/7 operation",
      "Gmail API quota: 250 units/second, well within polling needs",
    ],
    future: [
      "Multi-account support (multiple Gmail inboxes)",
      "Calendar API integration for interview scheduling",
      "Web dashboard to replace Sheets export",
    ],
    diagram: {
      nodes: [
        { id: "scheduler", label: "APScheduler", x: 60, y: 130, color: "#F59E0B" },
        { id: "gmail", label: "Gmail API", x: 240, y: 70, color: "#60A5FA" },
        { id: "gemini", label: "Gemini", x: 240, y: 190, color: "#0D9488" },
        { id: "db", label: "SQLite\n(SQLAlchemy)", x: 420, y: 130, color: "#6B7F7F" },
        { id: "telegram", label: "Telegram\nBot", x: 600, y: 70, color: "#60A5FA" },
        { id: "sheets", label: "Google\nSheets", x: 600, y: 190, color: "#22C55E" },
      ],
      edges: [
        { from: "scheduler", to: "gmail", label: "poll emails" },
        { from: "gmail", to: "gemini", label: "classify" },
        { from: "gemini", to: "db", label: "persist label" },
        { from: "db", to: "telegram", label: "push alert" },
        { from: "db", to: "sheets", label: "sync export" },
      ],
    },
  },
  {
    id: "gig-ledger",
    name: "Gig Ledger",
    tagline: "AI income verification for gig workers",
    components: [
      "pdfplumber — extracts structured text from platform-specific PDF layouts",
      "Normalisation layer — maps platform quirks to a canonical income schema",
      "SQLite — stores transaction records and monthly aggregates",
      "Gemini API — generates income stability narrative and flags anomalies",
      "Flask / Render — serves the analysis dashboard",
    ],
    dataFlow: [
      "User uploads income PDF (Uber, Swiggy, Zomato, etc.)",
      "pdfplumber extracts raw text; normaliser maps to income rows",
      "Rows written to SQLite with platform tag and period",
      "Gemini receives aggregated data; returns stability score + narrative",
      "Dashboard renders trend chart, platform breakdown, and AI summary",
    ],
    techChoices: [
      "pdfplumber over PyPDF2 — handles complex table layouts and column alignment",
      "Gemini for narrative generation — produces human-readable lender-friendly summaries",
      "SQLite over PostgreSQL — portable, no server, appropriate for single-user tool",
      "Render free tier for deployment — sufficient for demo traffic",
    ],
    scaling: [
      "Multi-user: add user auth and per-user ledger partitioning",
      "S3 for PDF storage instead of local filesystem",
      "Background job queue for large PDF batches",
    ],
    future: [
      "Support more platform PDF formats",
      "Bank statement ingestion alongside platform PDFs",
      "PDF generation of the final verification report",
    ],
    diagram: {
      nodes: [
        { id: "pdf", label: "PDF Upload", x: 60, y: 130, color: "#60A5FA" },
        { id: "plumber", label: "pdfplumber", x: 220, y: 130, color: "#F59E0B" },
        { id: "normalise", label: "Normaliser", x: 380, y: 70, color: "#6B7F7F" },
        { id: "sqlite", label: "SQLite", x: 380, y: 190, color: "#60A5FA" },
        { id: "gemini", label: "Gemini", x: 540, y: 130, color: "#0D9488" },
        { id: "dash", label: "Dashboard", x: 700, y: 130, color: "#22C55E" },
      ],
      edges: [
        { from: "pdf", to: "plumber", label: "extract" },
        { from: "plumber", to: "normalise", label: "raw text" },
        { from: "normalise", to: "sqlite", label: "income rows" },
        { from: "sqlite", to: "gemini", label: "aggregates" },
        { from: "gemini", to: "dash", label: "score + summary" },
      ],
    },
  },
  {
    id: "sanket",
    name: "Sanket",
    tagline: "Real-time sign-language translation",
    components: [
      "OpenCV — webcam capture, frame preprocessing, annotation overlay",
      "MediaPipe Hands — 21-point 3D hand landmark extraction",
      "Custom dataset — labelled gesture recordings per sign",
      "TensorFlow / PyTorch — gesture classifier training and inference",
      "Real-time prediction loop — sub-frame latency for live translation",
    ],
    dataFlow: [
      "OpenCV captures webcam frame at native frame rate",
      "MediaPipe processes frame; outputs 21 (x,y,z) landmarks",
      "Landmark vector normalised and fed to classifier",
      "Classifier outputs sign label with confidence score",
      "OpenCV overlays label and confidence on the live frame",
    ],
    techChoices: [
      "MediaPipe over raw CNN — landmark extraction is faster and generalises across skin tones and hand sizes",
      "21-point vector over raw image — smaller input dimension; classifier trains faster and runs lighter",
      "PyTorch for research iteration + TensorFlow for potential mobile export",
    ],
    scaling: [
      "ONNX export for cross-platform inference (mobile, edge)",
      "Dataset expansion: crowd-sourced gesture recording app",
      "Two-hand gesture support for complex signs",
    ],
    future: [
      "Two-hand and body-pose integration for full ISL/ASL coverage",
      "Speech synthesis output for accessibility",
      "Mobile app via TFLite",
    ],
    diagram: {
      nodes: [
        { id: "webcam", label: "Webcam", x: 80, y: 80, color: "#60A5FA" },
        { id: "opencv", label: "OpenCV", x: 280, y: 80, color: "#F59E0B" },
        { id: "mediapipe", label: "MediaPipe", x: 480, y: 80, color: "#0D9488" },
        { id: "classifier", label: "TF/PyTorch", x: 280, y: 190, color: "#6B7F7F" },
        { id: "overlay", label: "UI Overlay", x: 480, y: 190, color: "#22C55E" },
      ],
      edges: [
        { from: "webcam", to: "opencv", label: "raw frame" },
        { from: "opencv", to: "mediapipe", label: "preprocessed" },
        { from: "mediapipe", to: "classifier", label: "21 landmarks" },
        { from: "classifier", to: "overlay", label: "label + confidence" },
        { from: "opencv", to: "overlay", label: "annotated frame" },
      ],
    },
  },
];
