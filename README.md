# Abhay Kumar Singh — Portfolio

Production-ready personal portfolio. Next.js 14 · TypeScript · Tailwind CSS · Framer Motion.

## Stack

- **Next.js 14** (App Router, strict TypeScript)
- **Tailwind CSS 3** with CSS custom property design tokens
- **Framer Motion 11** for animations (respects `prefers-reduced-motion`)
- **Resend** for the contact form email delivery
- Deploy target: **Vercel**

## Quick Start

```bash
cd New_Portfolio
npm install
cp .env.example .env.local   # add your RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (production) | From [resend.com](https://resend.com) → API Keys. Free tier covers 100 emails/day. |

The contact form returns a 503 gracefully if the key is absent, so `npm run dev` works without it.

### Setting up Resend

1. Create a free account at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Add `RESEND_API_KEY=re_xxxxx` to `.env.local` (local) and to Vercel's Environment Variables panel (production)

## Vercel Deploy

```bash
npm i -g vercel
vercel --prod
```

Add `RESEND_API_KEY` in Vercel Dashboard → Project → Settings → Environment Variables.

## Project Structure

```
app/
  layout.tsx          # Fonts (Space Grotesk, Inter, JetBrains Mono), JSON-LD, metadata
  page.tsx            # Composes all sections
  globals.css         # Design tokens, base styles
  sitemap.ts
  robots.ts
  api/contact/route.ts  # Serverless email handler (Resend)
components/
  Nav.tsx             # Sticky nav, mobile drawer
  Hero.tsx            # Code window, stat cards, staggered entrance
  Projects.tsx        # 2-col grid
  ProjectCard.tsx     # Expandable card (click/tap/keyboard)
  Architecture.tsx    # Clickable arch cards → modal
  ArchModal.tsx       # SVG diagram + component/flow/scaling breakdown
  ArchDiagram.tsx     # SVG renderer for architecture nodes/edges
  Playground.tsx      # OWallet + Gig Ledger sandboxes
  WalletSandbox.tsx   # Atomic transfer simulator with live log
  GigLedgerSandbox.tsx  # Mock income analysis dashboard
  LiveAppModal.tsx    # Lazy-iframe device-frame modal
  Skills.tsx          # 7-category skill grid
  Experience.tsx      # Timeline + achievements
  Credentials.tsx     # Cert cards → preview modal
  About.tsx           # Bio, meta, interests
  Contact.tsx         # Form → /api/contact
  Marquee.tsx         # Tech ticker
data/
  projects.ts         # All 5 projects typed
  skills.ts           # 7 skill categories
  experience.ts       # 2 internships + 2 achievements
  credentials.ts      # 3 certificates
  architecture.ts     # 5 arch entries with SVG diagrams
hooks/
  useReducedMotion.ts
  useMediaQuery.ts
public/
  resume.pdf          # TODO: add your resume PDF
  og-image.png        # TODO: add 1200×630 OG image
  certs/
    aws-genai.png     # TODO: drop certificate images here
    aws-prompt.png
    anthropic-claude-code.png
```

## TODOs (before going live)

- [ ] **`public/resume.pdf`** — add your resume PDF (the Resume button links to it)
- [ ] **`public/og-image.png`** — 1200×630 Open Graph image for social sharing
- [ ] **`public/certs/*.png`** — certificate images for the Credentials section preview modals
- [ ] **`app/sitemap.ts`** — replace `abhaysingh.dev` with your actual domain
- [ ] **`app/layout.tsx`** — replace `metadataBase` URL with your actual domain
- [ ] **Resend domain** — once you have a custom domain, update the `from` address in `app/api/contact/route.ts` from `onboarding@resend.dev` to `contact@yourdomain.com`
- [ ] **LinkedIn URL** — verify `linkedin.com/in/abhay-kumar-singh-aks` is correct
- [ ] **GitHub repo URLs** in `data/projects.ts` — confirm all repos are public

## Design Tokens

All tokens are CSS custom properties in `app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background |
| `--card` | `#111111` | Card backgrounds |
| `--card-2` | `#161616` | Nested card / code blocks |
| `--border` | `#222222` | Default borders |
| `--border-2` | `#2C2C2C` | Hover borders |
| `--primary` | `#10B981` | Green accent (emerald) |
| `--secondary` | `#60A5FA` | Blue accent |
| `--text` | `#F5F5F5` | Body text |
| `--muted` | `#9CA3AF` | Secondary text |
| `--warning` | `#F59E0B` | Amber highlights |
| `--error` | `#EF4444` | Error states |
