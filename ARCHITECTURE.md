# 256 Foundation Website — Architecture

> **Spec reference:** [SPEC.md](./SPEC.md)

---

## Overview

A content-driven nonprofit website built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Deployed to a self-hosted Proxmox LXC container as a standard Node.js process. All content is managed via static TypeScript data files in the repository — no CMS or database required.

The site has one live external data dependency (HasHDash hashrate feed) and one server-side periodic data fetch (Substack RSS). Everything else is static at build time.

**Key complexity:** Hardware project pages (`/projects/ember-one`, `/projects/libre-board`) feature Apple-style scroll-driven 3D model assembly using Three.js + GSAP. Software project pages (`/projects/mujina`, `/projects/hydrapool`) feature animated hash stream canvas backgrounds.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Browser (Client)                           │
│                                                                     │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────────────┐   │
│  │  Next.js     │  │  HasHDash      │  │  3D Scroll / Hash      │   │
│  │  Pages (RSC) │  │  Leaderboard   │  │  Stream Canvas         │   │
│  │              │  │  (polls proxy) │  │  (Three.js / Canvas)   │   │
│  └──────┬───────┘  └───────┬────────┘  └───────────┬────────────┘   │
└─────────│──────────────────│───────────────────────│───────────────┘
          │                  │                       │
          ▼                  ▼                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Next.js Server (LXC Container)                    │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                        App Router                             │  │
│  │  /          /mission    /projects    /projects/[slug]         │  │
│  │  /grants    /donate     /telehash    /faq                     │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                       API Routes                              │  │
│  │  POST /api/contact     → email dispatch (Resend)              │  │
│  │  GET  /api/hashdash    → proxy to dash.256f.org API           │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │             Static Data Layer (TypeScript files)              │  │
│  │  data/projects.ts  data/team.ts  data/supporters.ts           │  │
│  │  data/grants.ts    data/stats.ts data/telehash.ts             │  │
│  │  data/faq.ts       data/navigation.ts                         │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │             ISR Data Fetches (server-side)                    │  │
│  │  Substack RSS  →  revalidate: 3600 (1 hour)                   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                 3D Asset Serving (static)                     │  │
│  │  public/models/ember-one.glb                                  │  │
│  │  public/models/libre-board.glb                                │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌──────────────┐       ┌─────────────────────────────┐
│  dash.256f   │       │  External Services           │
│  .org API    │       │  ─ Zaprite (donate)          │
│  (hashrate   │       │  ─ Typeform (grants)         │
│   feed)      │       │  ─ Substack (newsletter RSS) │
└──────────────┘       │  ─ Resend (email)            │
                       │  ─ Umami (analytics)         │
                       └─────────────────────────────┘
```

---

## Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` (home) | SSG + ISR (1hr) | Substack posts fetched server-side; rest is static |
| `/mission` | SSG | Fully static content from data files |
| `/projects` | SSG | Static data; grant log from data file |
| `/projects/[slug]` | SSG (`generateStaticParams`) | 4 known slugs; 3D viewer is client-only hydration |
| `/grants` | SSG | Static content |
| `/donate` | SSG | Static content |
| `/telehash` | SSG | Static content; countdown timer is client-side only |
| `/faq` | SSG | Static content from data file |
| `/api/contact` | Node API Route | POST handler — runtime only |
| `/api/hashdash` | Node API Route (`force-dynamic`) | Proxy GET — runtime only, no caching |
| `/sitemap.xml` | Generated at build | Next.js `app/sitemap.ts` |
| `/robots.txt` | Generated at build | Next.js `app/robots.ts` |

**HasHDash live feed:** The `HashrateLeaderboard` component is a Client Component that polls `/api/hashdash` every 60 seconds. The API route proxies to `dash.256f.org` server-side — prevents CORS issues and allows auth header injection via `HASHDASH_API_KEY` env var.

**Substack RSS:** Fetched server-side with `{ next: { revalidate: 3600 } }`. Parsed with `fast-xml-parser`. URL: `https://256foundation.substack.com/feed`.

**3D model pages:** Project sub-pages are SSG — the `HardwareProjectViewer` component (Three.js) hydrates on the client after the static shell is served. GLTF/GLB files are served from `/public/models/` as static assets.

---

## Design System

### Color Tokens (Tailwind CSS v4 `@theme {}`)

```css
@theme {
  /* Primary accent — replaces orange entirely */
  --color-brand-purple:        #7C3AED;
  --color-brand-purple-dark:   #6D28D9;
  --color-brand-purple-light:  #5B21B6;  /* light mode only — more contrast on white */

  /* Terminal / status */
  --color-brand-green:         #00FF41;

  /* Surfaces — dark mode */
  --color-brand-dark:          #0a0a0a;
  --color-brand-surface:       #111111;
  --color-brand-border:        #1f1f1f;

  /* Surfaces — light mode */
  --color-brand-light-bg:      #ffffff;
  --color-brand-light-surface: #f5f5f5;
  --color-brand-light-border:  #e5e5e5;

  /* Fonts */
  --font-display: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
  --font-mono:    var(--font-space-mono), ui-monospace, monospace;
  --font-sans:    var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

**Note:** Orange (`#F7931A`) is removed from all UI usage. It appears only in textual/content contexts referencing Bitcoin (e.g., the ₿ symbol).

### Typography Scale

| Use | Font | Weight | Class pattern |
|---|---|---|---|
| Hero headlines, page titles | Barlow Condensed | 800 (ExtraBold) | `font-display font-extrabold uppercase` |
| Section headings | Barlow Condensed | 700 (Bold) | `font-display font-bold` |
| Nav links | Barlow Condensed | 600 (SemiBold) | `font-display font-semibold uppercase` |
| Labels, badges, stats labels | Space Mono | 400/700 | `font-mono` |
| Body prose | Inter | 400 | `font-sans` |
| Code blocks | Space Mono | 400 | `font-mono` |

**Font loading** via `next/font/google` in `app/layout.tsx`:
- `Barlow_Condensed` — weights 600, 700, 800
- `Space_Mono` — weights 400, 700
- `Inter` — variable weight

CSS vars: `--font-barlow-condensed`, `--font-space-mono`, `--font-inter`

### Component Shape Language

- **Border radius: 0** — all cards, buttons, panels, inputs use `rounded-none` (or `rounded-sm` maximum)
- **Card default:** `bg-[#111111] border border-[#1f1f1f]`
- **Card hover:** `border-[#7C3AED]/50 shadow-[0_0_20px_rgba(124,58,237,0.15)]`
- **Primary button:** `bg-white text-[#0a0a0a] font-mono font-bold rounded-none` — white fill, dark text
- **Secondary button:** `text-[#7C3AED] font-mono hover:underline` — no border, underline on hover
- **Outlined button:** `border border-[#7C3AED]/40 text-[#7C3AED] rounded-none hover:border-[#7C3AED]`

### PCB Background

The existing `PCBBackground.tsx` component is **kept as gray/neutral traces** — not recolored purple. The PCB pattern provides subtle technical depth without competing with purple accents. Opacity: `0.08–0.15` depending on section.

---

## File Structure

```
website-256F/
├── app/
│   ├── layout.tsx                        # Root layout: Header, Footer, Umami, fonts
│   ├── globals.css                       # @theme tokens, base styles, animations
│   ├── page.tsx                          # Home (10 sections, ISR for Substack)
│   ├── mission/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx                      # Projects hub
│   │   └── [slug]/
│   │       └── page.tsx                  # Pillar project sub-pages (generateStaticParams)
│   ├── grants/
│   │   └── page.tsx
│   ├── donate/
│   │   └── page.tsx
│   ├── telehash/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts                  # POST: contact form → Resend email
│   │   └── hashdash/
│   │       └── route.ts                  # GET: proxy to HasHDash API (force-dynamic)
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    # Fixed nav, purple accent line, pill hover
│   │   ├── Footer.tsx                    # 4-col footer, social icons, clean/functional
│   │   ├── NavDropdown.tsx               # Dropdown with dark bg + purple hover
│   │   └── MobileNav.tsx                 # Hamburger drawer, accordion dropdowns
│   │
│   ├── ui/                               # Primitive / reusable UI components
│   │   ├── Button.tsx                    # primary | secondary | outlined variants
│   │   ├── Card.tsx                      # Sharp corners, purple glow on hover
│   │   ├── Badge.tsx                     # Status: Active | In Progress | Completed
│   │   ├── SectionWrapper.tsx            # Consistent section padding + max-width
│   │   ├── SectionHeader.tsx             # Barlow Condensed heading + Space Mono label
│   │   ├── ExternalLink.tsx              # <a target="_blank" rel="noopener noreferrer">
│   │   ├── PCBBackground.tsx             # SVG PCB trace pattern (gray/neutral)
│   │   ├── Logo.tsx                      # next/image logo, inverted prop for dark bg
│   │   └── ASCIIArt.tsx                  # ASCII art decorative blocks
│   │
│   ├── home/                             # Home page section components
│   │   ├── HeroSection.tsx               # PCB bg + purple radial, Logo + tagline, metrics
│   │   ├── DonateCards.tsx               # Two equal panels: BTC + Hashrate
│   │   ├── WhySection.tsx                # 3/9 col grid, "WHY" watermark, pull quote
│   │   ├── AllocationStats.tsx           # Giant numbers, divide-x layout
│   │   ├── BlocksFound.tsx               # Compact: green block count + YouTube embed
│   │   ├── StayUpdated.tsx               # 3 Substack post cards + newsletter + POD256
│   │   ├── ApplySection.tsx              # Purple-accent CTA, category pills
│   │   ├── CommunitySection.tsx          # 3/9 col split, icon+text rows
│   │   ├── SupporterShowcase.tsx         # "use client" — tier grid + leaderboard
│   │   ├── HashrateLeaderboard.tsx       # "use client" — F1-style ranked table, polls 60s
│   │   └── ContactForm.tsx               # "use client" — controlled form, POST /api/contact
│   │
│   ├── projects/
│   │   ├── PillarProjectCard.tsx         # Detailed card with progress bar, milestones
│   │   ├── EcosystemCard.tsx             # External link card (OSMU, Heatpunks)
│   │   ├── GrantLogTable.tsx             # Table of all funded grants
│   │   ├── MilestoneTracker.tsx          # Horizontal progress steps (not vertical)
│   │   ├── ProjectTeamSection.tsx        # Lead engineer + PM cards
│   │   ├── HardwareProjectViewer.tsx     # "use client" — Three.js scroll-driven 3D assembly
│   │   └── HashStreamCanvas.tsx          # "use client" — SHA-256 hash stream canvas bg
│   │
│   ├── telehash/
│   │   ├── CountdownTimer.tsx            # "use client" — DD:HH:MM:SS countdown
│   │   └── TeleHashEventCard.tsx         # Past event: results + YouTube embed
│   │
│   └── shared/
│       ├── TeamMemberCard.tsx            # "use client" — photo with onError fallback
│       ├── Timeline.tsx                  # Vertical timeline (purple dots + line)
│       └── SubstackEmbed.tsx             # Substack subscription widget wrapper
│
├── data/                                 # Static content — edit to update the site
│   ├── projects.ts                       # Pillar project details, milestones, team
│   ├── supporters.ts                     # Financial supporter tiers
│   ├── grants.ts                         # Full funded grant log
│   ├── stats.ts                          # Allocation totals, blocks found
│   ├── telehash.ts                       # TeleHash event history + next event date
│   ├── team.ts                           # Founders + board bios, photos, socials
│   ├── faq.ts                            # FAQ Q&A by category
│   └── navigation.ts                     # topNav + footer links
│
├── types/
│   └── index.ts                          # Shared TypeScript types
│
├── lib/
│   ├── substack.ts                       # fetchSubstackPosts() — RSS parse utility
│   └── metadata.ts                       # generatePageMetadata() — shared OG/meta helper
│
├── public/
│   ├── logo.jpg                          # Foundation logo (white bg JPG, 1024×1024)
│   ├── models/                           # GLTF/GLB 3D models (hardware projects)
│   │   ├── ember-one.glb                 # Ember One PCB — exported from STEP/KiCad
│   │   └── libre-board.glb               # Libre Board PCB — exported from STEP/KiCad
│   ├── team/                             # Team member headshots
│   │   └── placeholder.png
│   └── og/
│       ├── og-default.png                # Default OG image 1200×630
│       ├── og-ember-one.png
│       ├── og-mujina.png
│       ├── og-libre-board.png
│       └── og-hydrapool.png
│
├── SPEC.md
├── ARCHITECTURE.md
├── next.config.ts
├── tsconfig.json
├── .env.local                            # gitignored
└── .env.example
```

---

## Components

### Layout: `Header.tsx`
- Fixed top, 2px purple accent line at very top (`z-50`)
- Scrolled state: `bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f]`
- Nav links: Barlow Condensed, uppercase. Hover: `bg-[#7C3AED]/10 rounded` pill effect
- Active page: white text
- Logo left, nav center/right, Donate CTA (white button) far right
- `"use client"` — scroll listener + mobile state

### Layout: `Footer.tsx`
- Functional, clean 4-column grid (not a design showcase)
- Logo (inverted for dark bg), tagline, 501(c)(3), social icons
- Social icons: `text-gray-500 hover:text-[#7C3AED] border border-[#1f1f1f] hover:border-[#7C3AED]/40`
- Copyright + "Open source. Always." strip at bottom

### Projects: `HardwareProjectViewer.tsx` (`"use client"`)

**The most complex component in the codebase.** Implements Apple-style scroll-driven 3D model assembly.

```
Architecture:
  ┌─────────────────────────────────────────────────────┐
  │  Scroll Container (tall — e.g. 400vh)               │
  │                                                     │
  │  ┌─────────────────────────────────────────────┐    │
  │  │  Sticky Panel (100vh, position: sticky)     │    │
  │  │                                             │    │
  │  │  ┌──────────────────┐  ┌─────────────────┐  │    │
  │  │  │  Three.js Canvas │  │  Text Panel     │  │    │
  │  │  │  (R3F <Canvas>)  │  │  (scrolls over) │  │    │
  │  │  │                  │  │                 │  │    │
  │  │  │  GLTF Model      │  │  Section text   │  │    │
  │  │  │  scroll-driven   │  │  fades in/out   │  │    │
  │  │  │  assembly        │  │  at breakpoints │  │    │
  │  │  └──────────────────┘  └─────────────────┘  │    │
  │  └─────────────────────────────────────────────┘    │
  └─────────────────────────────────────────────────────┘
```

**Scroll binding:** GSAP ScrollTrigger maps scroll position (0→1) to model assembly progress. Component positions are interpolated between exploded and assembled states.

**Props:** `modelPath: string` (e.g. `/models/ember-one.glb`), `sections: { label, description, scrollStart, scrollEnd }[]`

**Fallback:** If `matchMedia('(prefers-reduced-motion)')` is true, OR on mobile viewport, shows static rendered model (no scroll binding, auto-rotate only).

**Dependencies:** `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`

### Projects: `HashStreamCanvas.tsx` (`"use client"`)

Animated SHA-256 hash stream background canvas for software project pages.

**Behavior:**
- `<canvas>` absolutely positioned behind page content, `z-index: 0`
- Columns of streaming hex characters (hash values, nonces, difficulty targets)
- Terminal green (`#00FF41`) text at `opacity: 0.08–0.12`
- On scroll, stream speed subtly increases
- At designated scroll milestones, a brief "VALID BLOCK FOUND" flash highlights one column
- Uses `requestAnimationFrame` loop; cleaned up on unmount

**Performance:** Capped at 30fps; off-screen columns skip rendering via viewport check.

### Home: `HashrateLeaderboard.tsx` (`"use client"`)

F1-style ranked competition leaderboard.

**Visual spec:**
- `#1` — gold rank badge `bg-yellow-500`, bold, elevated
- `#2` — silver rank badge `bg-gray-400`
- `#3` — bronze rank badge `bg-amber-700`
- `#4+` — standard rank number
- Worker name in Space Mono, hashrate in Barlow Condensed (large)
- Shimmer skeleton loading state
- Graceful error: "Dashboard unavailable" + link to `dash.256f.org`

**Polling:** `setInterval(60_000)` cleared on unmount. Calls `GET /api/hashdash`.

### Projects: `MilestoneTracker.tsx`

**Horizontal progress steps** (not vertical timeline).

```
  ● ─────── ● ─────── ○ ─────── ○
 [Done]   [Done]  [Active]  [Upcoming]
```

- Completed steps: filled purple circle + purple connecting line
- Active step: purple outline circle, pulsing
- Upcoming: gray outline + gray line
- Labels below in Space Mono `text-xs`
- Server component (no interactivity)

---

## Data Types (`types/index.ts`)

```typescript
export type ProjectSlug = 'ember-one' | 'mujina' | 'libre-board' | 'hydrapool'
export type ProjectType = 'hardware' | 'software'

export interface PillarProject {
  slug: ProjectSlug
  type: ProjectType               // determines which project page template to use
  name: string
  tagline: string
  description: string
  whyCoreGrant: string
  whyNecessary: string
  technicalDetails: string
  status: 'active' | 'completed' | 'paused'
  externalUrl: string
  githubUrl: string
  forumCategory: string
  ogImage: string                 // path under /public/og/
  modelPath?: string              // GLTF path under /public/models/ — hardware only
  milestones: Milestone[]
  team: { leadEngineer: TeamMember; projectManager?: TeamMember }
}

export interface Milestone {
  label: string
  status: 'completed' | 'active' | 'upcoming'
  date?: string
}

export interface TeamMember {
  name: string
  handle?: string
  bio: string
  headshot: string
  links: { x?: string; nostr?: string; github?: string; website?: string }
}

export interface Supporter {
  name: string
  image: string                   // logo URL (org) or photo URL (individual)
  link: string                    // website or social profile
  tier: 1 | 2 | 3
}

export interface Grant {
  name: string
  grantee: string
  category: 'hardware' | 'software' | 'research' | 'education'
  amountBTC: number
  status: 'active' | 'completed'
  dateFunded: string
}

export interface TeleHashEvent {
  number: number
  date: string
  blockFound: boolean
  btcRaised?: number
  videoUrl?: string
}

export interface FAQItem {
  question: string
  answer: string
  category: 'foundation' | 'donations' | 'grants' | 'projects' | 'technical'
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
  children?: NavItem[]
}
```

---

## API Routes

### `POST /api/contact`
```
Body:       { name: string, email: string, message: string }
Validation: All fields required; email format regex check
Success:
  1. Send email to process.env.CONTACT_EMAIL (foundation inbox)
  2. Send auto-reply to submitter's email address
  3. Return 200 { ok: true }
Failure:    Return 500 { error: string }
Provider:   Resend (RESEND_API_KEY env var)
Dev:        Returns 500 gracefully when RESEND_API_KEY is missing
```

### `GET /api/hashdash`
```
Purpose:    Server-side proxy to dash.256f.org — avoids CORS, abstracts auth
Config:     export const dynamic = 'force-dynamic'
Behavior:
  - Fetch from HASHDASH_API_URL (default: https://dash.256f.org/api/workers)
  - If HASHDASH_API_KEY set, add Authorization: Bearer header
  - Forward response as-is
  - On upstream failure: return 503 { error: 'Upstream unavailable' }
Cache:      None — client manages polling on its own schedule
```

---

## 3D Asset Pipeline

Hardware project pages require GLTF/GLB files. These must be produced from the existing KiCad/STEP source files.

### Conversion Steps

```
KiCad Native (.kicad_pcb)
        │
        │  KiCad 3D Viewer → Export STEP
        ▼
   STEP File (.step)
        │
        │  FreeCAD → File > Export > GLTF/GLB
        ▼
   Raw GLTF/GLB
        │
        │  npx @gltf-transform/cli optimize model.glb optimized.glb
        │  [optional: --compress draco if file > 5MB]
        ▼
   public/models/[slug].glb   (target: < 5MB)
```

### Model Requirements for Scroll Assembly

For the scroll-driven explosion/assembly effect, the GLTF must have **named mesh groups** per logical component (e.g., `PCB_Board`, `ASIC_Chip`, `VRM_Section`, `Connectors`). These names are referenced in `HardwareProjectViewer.tsx` to animate component positions independently.

If the exported GLTF has a flat mesh structure, it can be split in Blender:
1. Import GLB into Blender
2. Select faces by logical grouping, separate into named objects (`P` → Separate → Selection)
3. Export as GLB

### Fallback Plan

While GLTF files are pending, the hardware project pages render:
- A static `<img>` hero with a photograph or render of the board
- All other sections (milestones, team, links) render normally
- `HardwareProjectViewer.tsx` shows a placeholder: `"3D model coming soon"`

---

## SEO & Metadata

Shared helper in `lib/metadata.ts`:

```typescript
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/og/og-default.png',
}: MetadataProps): Metadata {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://256foundation.org'
  const url = `${base}${path}`
  return {
    title: `${title} | 256 Foundation`,
    description,
    openGraph: {
      title, description, url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      siteName: '256 Foundation',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      images: [ogImage],
      site: '@256FOUNDATION',
    },
    alternates: { canonical: url },
  }
}
```

Each `page.tsx` exports `metadata` via `generatePageMetadata()`. Project sub-pages use their custom `/og/og-[slug].png`.

---

## External Integrations

| Integration | How It Works | Where |
|---|---|---|
| **Zaprite** | `href={process.env.NEXT_PUBLIC_ZAPRITE_URL}` button | `/donate` |
| **Typeform** | `href={process.env.NEXT_PUBLIC_TYPEFORM_URL}` button, new tab | `/grants` |
| **Substack RSS** | `fetch(rssUrl, { next: { revalidate: 3600 } })` + `fast-xml-parser` | Home page (server) |
| **Substack embed** | Script-based widget in `SubstackEmbed.tsx` (client, lazy) | Home + TeleHash |
| **HasHDash API** | Client polls `/api/hashdash` every 60s | Home `HashrateLeaderboard` |
| **YouTube embed** | `<iframe loading="lazy" aspect-video>` | TeleHash page, BlocksFound |
| **Umami** | `<Script strategy="afterInteractive">`, production only | Root layout |
| **Three.js (R3F)** | Client-only, dynamic import with `ssr: false` | Hardware project pages |

**Important:** Three.js / `@react-three/fiber` must be loaded with `dynamic(() => import(...), { ssr: false })` to prevent SSR errors, since it accesses `window`/`WebGL` context.

---

## Key Design Decisions

### ADR-1: Static Data Files Over CMS
**Decision:** All content in TypeScript data files, no CMS.
**Rationale:** Team is developer-comfortable, content changes infrequently, zero operational overhead, type safety on all content, no external service dependency.
**Trade-off:** Non-developers cannot update content without a code change + deploy.

### ADR-2: Server-Side HasHDash Proxy
**Decision:** `GET /api/hashdash` proxies to `dash.256f.org` rather than direct browser fetch.
**Rationale:** Prevents CORS issues; allows auth header injection via env var; single place to update when API docs arrive; can add server-side caching later.

### ADR-3: Static Sub-pages for Pillar Projects
**Decision:** `app/projects/[slug]/page.tsx` with `generateStaticParams()` for the 4 known slugs.
**Rationale:** DRY template. Statically generated. Adding a 5th project requires only a data entry + deploy.

### ADR-4: OS Preference Color Mode (No Toggle)
**Decision:** Dark/light mode via `@custom-variant dark (@media (prefers-color-scheme: dark))` — no manual toggle.
**Rationale:** Spec explicitly requires no toggle. Avoids hydration mismatch. If toggle is desired in future, add `ThemeProvider` + `class` strategy.

### ADR-5: Static OG Images
**Decision:** Static PNG files in `/public/og/` rather than `next/og` dynamic generation.
**Rationale:** Simpler, no runtime cost, no edge function needed. Default image covers all non-project pages; custom images for the 4 project sub-pages.

### ADR-6: Three.js with `@react-three/fiber` for 3D
**Decision:** R3F over vanilla Three.js or `<model-viewer>` web component.
**Rationale:** R3F provides React-idiomatic component model for scene management; `@react-three/drei` provides `useGLTF`, `OrbitControls`, lighting helpers out of the box; GSAP ScrollTrigger integrates cleanly with R3F via `useFrame`/`useEffect`.
**Trade-off:** Adds ~300KB gzipped to the hardware project page bundle. Mitigated by dynamic import (`ssr: false`) so it only loads on those 2 pages.

### ADR-7: Canvas API for Hash Stream (Not CSS/SVG)
**Decision:** `<canvas>` with `requestAnimationFrame` for the hash stream background.
**Rationale:** Thousands of animating text characters would be too expensive as DOM nodes. Canvas handles this trivially at 30fps. More authentic terminal aesthetic than SVG or CSS approaches.
**Trade-off:** Canvas is harder to make accessible. Mitigation: `aria-hidden="true"` on canvas, `role="presentation"`.

### ADR-8: ISR for Substack Posts
**Decision:** Substack RSS fetched server-side with 1-hour ISR.
**Rationale:** No loading spinner for visitors. Avoids client-side CORS with RSS. Content doesn't need real-time freshness.

### ADR-9: Purple Replaces Orange as Primary Accent
**Decision:** Brand color is `#7C3AED` (purple), matching the live 256foundation.org. Orange (`#F7931A`) removed from UI.
**Rationale:** Design overhaul to match existing brand identity and eliminate generic "AI-generated" aesthetic. Orange remains only in Bitcoin-specific content contexts (₿ symbol, price references).

### ADR-10: Barlow Condensed as Display Font
**Decision:** `Barlow Condensed` Bold/ExtraBold for all headlines and display text.
**Rationale:** Creates the bold, industrial, motorsport aesthetic aligned with the logo design language. Pairs well with Space Mono for technical labels.

---

## Implementation Phases

### Phase 1 — Design System Foundation
- Update `app/globals.css` with new `@theme {}` tokens (purple, Barlow Condensed, sharp edges)
- Update `app/layout.tsx` to load Barlow Condensed + Space Mono + Inter via `next/font`
- Update `tailwind.config.ts` to remove orange, add purple tokens
- Update `components/ui/Button.tsx` — new primary (white), secondary (purple text), outlined variants
- Update `components/ui/Card.tsx` — sharp edges, purple hover glow
- Update `components/ui/SectionHeader.tsx` — Barlow Condensed, Space Mono label

### Phase 2 — Layout Redesign
- `Header.tsx` — purple accent line, pill hover nav, Barlow Condensed nav links, white Donate button
- `Footer.tsx` — retheme to purple social icons, clean layout
- `MobileNav.tsx` — Barlow Condensed accordion links

### Phase 3 — Home Page Redesign
- Retheme all 10 section components with new design tokens
- `HashrateLeaderboard.tsx` — F1-style ranking with gold/silver/bronze badges
- `AllocationStats.tsx` — giant Barlow Condensed numbers, purple accent
- `HeroSection.tsx` — PCB + subtle purple radial bg, Logo + big tagline
- `DonateCards.tsx` — two equal sharp-edge panels
- `WhySection.tsx` — 3/9 col grid, pull quote with purple left bar
- `MilestoneTracker.tsx` — refactor to horizontal steps
- `BlocksFound.tsx` — compact: green number + YouTube embed side-by-side
- `SupporterShowcase.tsx` — logo grid with tier structure

### Phase 4 — Static Pages Redesign
- `/mission` — bold Barlow Condensed text hero, purple vertical timeline, team cards
- `/grants` — explain + grant log + CTA structure
- `/donate` — BTC first, hashrate second layout
- `/telehash` — three equal sections, purple countdown numbers
- `/faq` — grouped accordion with `<details>/<summary>`, purple open state

### Phase 5 — Projects Hub
- `/projects` hub — larger detailed pillar cards, ecosystem cards, grant log table
- `PillarProjectCard.tsx` — progress bar, full description, milestone summary, purple glow hover

### Phase 6 — 3D / Visual FX Project Pages

**Hardware (Ember One, Libre Board):**
1. Install dependencies: `npm install three @react-three/fiber @react-three/drei gsap`
2. Build `HardwareProjectViewer.tsx` — R3F canvas, GSAP ScrollTrigger scroll binding
3. Implement explode/assemble logic with named mesh group interpolation
4. Wire into `/projects/[slug]/page.tsx` via `dynamic(() => import(...), { ssr: false })`
5. Add mobile fallback (static render, no scroll binding)
6. Integrate GLTF files once client delivers them (placeholder until then)

**Software (Mujina, Hydrapool):**
1. Build `HashStreamCanvas.tsx` — canvas-based SHA-256 hash rain
2. Implement scroll-speed binding and milestone flash events
3. Wire into software project page sections

### Phase 7 — API Routes
- `POST /api/contact` — Resend integration
- `GET /api/hashdash` — proxy with `force-dynamic`

### Phase 8 — SEO, OG, Sitemap, Robots
- `lib/metadata.ts` helper
- `generateMetadata()` on every page
- `app/sitemap.ts`, `app/robots.ts`
- OG image assets (placeholders → final branded assets)

### Phase 9 — Polish & QA
- Responsive testing (mobile / tablet / desktop)
- Dark + light mode verification across all pages
- Accessibility pass: ARIA labels on 3D canvas (`aria-hidden`), focus states, color contrast check for purple on dark
- Performance audit: dynamic imports for Three.js; canvas off-screen optimization; Lighthouse target 90+
- Content replacement: stubs → real data as client delivers

---

## Environment Variables

```env
# Contact form
CONTACT_EMAIL=
EMAIL_FROM=
RESEND_API_KEY=

# HasHDash proxy
HASHDASH_API_URL=
HASHDASH_API_KEY=

# Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=

# External link URLs
NEXT_PUBLIC_ZAPRITE_URL=
NEXT_PUBLIC_TYPEFORM_URL=
NEXT_PUBLIC_SITE_URL=https://256foundation.org
```

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| GLTF files not yet available | Hardware pages show static image placeholder; 3D viewer is non-blocking feature |
| GLTF file > 5MB after export | Apply Draco compression via `@gltf-transform/cli --compress draco`; target < 5MB |
| GLTF has flat mesh (no named groups) | Blender mesh-split workflow documented in Asset Pipeline section above |
| Three.js SSR errors | `dynamic(() => import(...), { ssr: false })` on all R3F components |
| Three.js bundle size (~300KB) | Dynamic import ensures it only loads on the 2 hardware project pages |
| Canvas performance on low-end devices | Hash stream capped at 30fps; off-screen columns skip; `prefers-reduced-motion` disables it |
| HasHDash API shape unknown | Proxy route isolates frontend from API changes; `HashrateLeaderboard` has graceful error state |
| Substack RSS structure changes | `lib/substack.ts` isolates parsing; single function to update |
| Content stubs at launch | All data files have realistic placeholder stubs; site builds and deploys |
| Purple contrast on dark bg | `#7C3AED` on `#0a0a0a` passes WCAG AA for large text; check small text with contrast tool |

---

## References

- Spec: [SPEC.md](./SPEC.md)
- Next.js App Router: https://nextjs.org/docs/app
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- gltf-transform CLI: https://gltf-transform.dev/cli
- Tailwind CSS v4: https://tailwindcss.com/docs
- Design references: bitaxe.org, heatpunks.org, homeassistant.io, apple.com/mac-pro
