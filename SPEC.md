# 256 Foundation Website — Full Specification

## Overview

The 256 Foundation website (`256foundation.org`) is the primary public-facing presence and source of truth for the entire organization. It serves three core functions:

1. **Inform** — explain the mission, projects, and ecosystem to the public
2. **Fund** — accept financial donations (BTC + fiat via Zaprite) and hashrate donations
3. **Recruit** — invite developers to apply for open rolling grants

**Design references:** bitaxe.org, heatpunks.org, homeassistant.io (boldness and confidence), Apple.com product pages (scroll-driven 3D interactions for project pages)

---

## Organization Context

**Name:** 256 Foundation
**Founded:** February 2024
**Founders:** @bitkite and @econoalchemist
**Board:** Tyler (Stevens), Skot, Joe Wood
**Legal status:** Fully approved 501(c)(3) nonprofit (tax-deductible donations)
**Donation policy:** 100% passthrough — all donated funds go directly to grantees

**Mission:**
Build the open-source Bitcoin mining ecosystem. The foundation raises money to fund developers building open-source Bitcoin mining hardware and software solutions, dismantling the proprietary mining empire that has centralized Bitcoin mining around closed-source hardware and software.

**Core Values:** Free and open-source development. Every project funded by this foundation is made available through FOSS contributions — [OSS definition for software](https://opensource.org/osd), [OSHWA definition for hardware](https://www.oshwa.org/definition/).

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| 3D rendering | Three.js + @react-three/fiber + @react-three/drei |
| Scroll animation | GSAP ScrollTrigger (for 3D project pages) |
| Analytics | Umami (self-hosted) |
| Contact form | Next.js API Route + Resend |
| Grant applications | External Typeform link |
| Donations | Zaprite (BTC + fiat), Hydrapool (hashrate) |
| Newsletter | Substack (RSS fetch for post cards) |
| Deployment | Self-hosted on Proxmox VPS, LXC container |
| Internationalization | English only |
| Color mode | Follows OS system preference (dark/light), no manual toggle |

---

## Visual Design & Brand

### Core Aesthetic

The site should feel like **industrial hardware meets hacker software** — bold, confident, technically credible. It must avoid the generic "AI-generated" look of overused design patterns. The aesthetic reference is the live 256foundation.org color identity executed with the boldness and polish of bitaxe.org and heatpunks.org.

The design must feel **deliberately engineered**, not assembled from a template. Every visual decision should reinforce technical authority.

### Color Palette

**Dark mode (default):**
- Background: `#0a0a0a` (near-black)
- Surface (cards, panels): `#111111`
- Border: `#1f1f1f`
- Primary accent: **Purple `#7C3AED`** — this is the PRIMARY brand color, replacing orange entirely
- Hover/active accent: `#6D28D9` (slightly darker purple)
- Terminal/status green: `#00FF41` — for status indicators, ASCII art, code elements
- Text primary: `#f0f0f0` (off-white)
- Text secondary: `#9ca3af` (gray-400)
- Text muted: `#4b5563` (gray-600)

**Light mode:**
- Background: `#ffffff` (pure white)
- Surface: `#f5f5f5`
- Border: `#e5e5e5`
- Primary accent: **`#5B21B6`** (darker purple for contrast against white)
- Terminal green: `#16a34a` (muted green for light bg readability)
- Text primary: `#111111` (near-black)
- Text secondary: `#6b7280`
- Text muted: `#9ca3af`

**Orange (`#F7931A`) is removed from the UI entirely.** It is only present as the Bitcoin symbol in content contexts (e.g., ₿).

### Typography

**Display / Headlines:** `Barlow Condensed` — Bold (700) and ExtraBold (800) weights. All major section headings, hero taglines, project names, and page titles. Uppercase where appropriate.

**Code / Labels / UI:** `Space Mono` — Regular (400) and Bold (700). Navigation links, stats labels, badge text, metadata, monospace code blocks.

**Body:** `Inter` — Variable weight. Prose paragraphs, descriptions, form fields.

Font loading via `next/font/google`. CSS vars: `--font-display`, `--font-mono`, `--font-sans`.

### Logo

The 256 Foundation logo (`public/logo.jpg`) is a motorsport-industrial wordmark: massive metallic "256" in black/silver chrome 3D bevel, above "FOUNDATION" in condensed caps with PCB circuit trace decoration. White background JPG.

**Dark mode rendering:** `filter: brightness(0) invert(1)` converts it to a white silhouette that reads cleanly on `#0a0a0a`.
**Light mode rendering:** No filter — the original black/silver logo on white background.

Use the existing `components/ui/Logo.tsx` component with `inverted` prop.

### PCB Background Pattern

The existing PCB trace pattern (`components/ui/PCBBackground.tsx`) is **kept as-is** — gray/neutral traces at low opacity. It appears on the hero and relevant sections. Do NOT recolor traces to purple. The PCB texture provides subtle technical depth without competing with purple content.

### Card Design Language

- **Border radius: 0** — all cards, buttons, and panels use sharp rectangular edges (`rounded-none` or `rounded-sm` at most)
- Cards: `bg-[#111111] border border-[#1f1f1f]`
- Hover state: subtle purple border glow — `border-[#7C3AED]/50 shadow-[0_0_20px_rgba(124,58,237,0.15)]`
- No soft shadows or gradients on cards unless intentional

### Buttons

**Primary CTA:** White fill, near-black text — maximum contrast, inverted. `bg-white text-[#0a0a0a] font-mono font-bold`. Hover: `bg-gray-100`.

**Secondary / Ghost:** Purple text, no border, underline on hover. `text-[#7C3AED] font-mono`. Hover: `underline`.

**Outlined:** `border border-[#7C3AED]/40 text-[#7C3AED]`. Hover: `border-[#7C3AED]`.

All buttons: `rounded-none` (sharp corners), monospace font.

### Navigation

**Desktop nav links:** Barlow Condensed, uppercase, medium weight. Default color: gray-400. Hover: subtle dark/purple background pill appears behind the link (`bg-white/5` or `bg-[#7C3AED]/10 rounded`). Active page: white text.

**Header:** Fixed top, thin 2px purple accent line at very top (replaces orange line). Logo left, nav center/right, Donate CTA button far right.

**Donate button in header:** Uses Primary CTA style (white fill, dark text).

**Dropdown menus:** Dark background (`#111111`), sharp corners, purple left border on hover items.

### Section Rhythm & Layout

- **Section transitions:** Hard edges — no gradient fades between sections. The color/content shift IS the separator.
- **Spacing density:** Medium — balanced whitespace, not cramped, not wasteful. ~`py-20 lg:py-28` per section.
- **Alternating backgrounds:** Most sections on `#0a0a0a`; select key CTA sections use `#111111` or a purple-tinted dark surface.
- No decorative dividers between sections (no gradient lines, no ornaments).

### Animations

- **Scroll-triggered fade-ins:** Sections and key elements fade up on scroll entry (moderate — not every element, only primary content blocks)
- **No parallax** (performance + accessibility)
- **3D scroll interactions:** Hardware project pages only (see Project Sub-pages section)
- **PCB pulse animation:** Retained as a subtle background texture animation
- **Status indicators:** Green dot blink animation retained

### Forms

- Input fields: `bg-zinc-900 border border-[#2a2a2a]` in dark mode; `bg-gray-50 border border-gray-200` in light mode
- Focus state: `border-[#7C3AED] ring-1 ring-[#7C3AED]/30`
- Labels: Space Mono, small, gray-400
- Submit button: Primary CTA style

---

## Site Architecture

### URL Structure

```
/                          → Home
/mission                   → Mission & About
/projects                  → Projects hub (pillars + ecosystem + grant log)
  /projects/ember-one      → Ember One sub-page
  /projects/mujina         → Mujina sub-page
  /projects/libre-board    → Libre Board sub-page
  /projects/hydrapool      → Hydrapool sub-page
/grants                    → Grants program + application
/donate                    → Donate page
/telehash                  → TeleHash event page
/faq                       → FAQ page
```

### Navigation — Top Bar (Sticky, Fixed)

```
[256 Foundation Logo]   MISSION   PROJECTS ▾   COMMUNITY ▾   GRANTS   [DONATE]
```

Nav links in Barlow Condensed Uppercase. Logo left, nav right, Donate CTA far right.

**Projects dropdown:**
- Funded Project Log → `/projects#log`
- Ember One → `/projects/ember-one`
- Mujina → `/projects/mujina`
- Libre Board → `/projects/libre-board`
- Hydrapool → `/projects/hydrapool`

**Community dropdown:**
- Forum → `https://forum.256foundation.org` (external)
- Telegram → `https://t.me/the256foundation` (external)
- GitHub → `https://github.com/256foundation` (external)
- HasHDash → `https://dash.256f.org` (external)
- TeleHash → `/telehash`
- POD256 → `https://www.pod256.org` (external)
- Newsletter → `https://256foundation.substack.com` (external)

**Mobile:** Hamburger → slide-out drawer. Nav links uppercase Barlow Condensed. Dropdowns become accordions.

### Footer

Functional and clean — not a design showcase. Four-column grid (collapses on mobile).

**Col 1:** Logo + tagline ("Building the open-source Bitcoin mining ecosystem.") + 501(c)(3) notice + social icons (X, GitHub, Telegram, Nostr)
**Col 2:** Foundation links — Mission, Projects, Grants, Donate, TeleHash, FAQ
**Col 3:** Community links — Forum, Telegram, GitHub, HasHDash, POD256, Newsletter
**Col 4:** (merge with Col 1 on smaller grids)

Copyright: `© 2024–[year] 256 Foundation. All rights reserved.`
Social icons: Inline SVG, `text-gray-500 hover:text-[#7C3AED]`, border `border-[#1f1f1f] hover:border-[#7C3AED]/40`

---

## Page Specifications

---

### 1. Home Page (`/`)

#### 1.1 Hero

Full viewport height section.

**Background:** PCB pattern (gray/neutral, `opacity-0.12`) + radial dark vignette overlay. Optionally a very subtle purple radial gradient at top-center (`rgba(124,58,237,0.08)` at center, transparent at edges).

**Content layout:**
- Left-aligned content, max-w-7xl centered container
- Top: Status bar — green dot + "Funding Active" label (Space Mono, green, uppercase)
- Logo image (`<Logo height={180}>`) as the primary visual anchor — replaces any text-based "256 Foundation" heading
- Below logo: Big tagline in Barlow Condensed Bold — "Building the open-source Bitcoin mining stack." — large, confident, 3–4 lines on mobile, 1–2 on desktop
- Sub-copy: 1–2 sentences explaining the problem being solved (gray-500, small)
- CTA row: Primary button "Our Mission →" + outlined button "Donate →" + text link "View Projects"
- Bottom: Metrics strip (border-top, 4-col grid): BTC Deployed / USD Equivalent / Active Projects / Blocks Found — numbers in purple (or green for Blocks Found), labels in Space Mono uppercase gray

#### 1.2 Donate Section

Two equal full-bleed panels separated by a 1px gap:

**Panel A — Donate BTC/Fiat:**
- Corner accent bracket decoration (top-right, purple lines)
- Large symbol or icon
- Heading: "Fund the Mission"
- Copy: tax-deductible, 100% to developers, BTC + fiat accepted
- CTA button → `/donate`

**Panel B — Donate Hashrate:**
- Corner accent bracket decoration
- Heading: "Donate Hashrate"
- Copy: Point your miner to the pool, block proceeds go to the foundation
- CTA button → `/donate#hashrate`

Both panels: `bg-[#111111]`, sharp corners, subtle purple hover glow.

#### 1.3 Why We Exist

12-column grid on desktop:
- Left (3 cols): Large "WHY" watermark text in Barlow Condensed, very low opacity (~10%), positioned as background decoration
- Right (9 cols): Pull quote with 2px purple left border, full explanation prose, "Learn More" text link → `/mission`

#### 1.4 Current Allocation Stats

Giant numbers, borderless divided layout. Stats displayed horizontally on desktop, stacked on mobile:
- BTC Allocated (purple)
- USD Equivalent (purple)
- Active Projects (white)
- Blocks Found (terminal green, with glow)

Number sizes: `text-5xl lg:text-7xl`, Barlow Condensed Bold. Labels: Space Mono, uppercase, gray-600, `text-xs`.
Dividers between stats: `divide-x divide-[#1f1f1f]`.

#### 1.5 Blocks Found

Dedicated compact section. Two-column layout:
- Left: Block count (large terminal green number with `text-shadow: 0 0 20px #00FF41`), brief blurb about what blocks found means, "Learn About TeleHash" link
- Right: YouTube embed (the first TeleHash block find video), `loading="lazy"`, `aspect-video rounded-none`

#### 1.6 Stay Updated

Three-column grid:
- Blog: 3 recent Substack posts as horizontal cards (title + date + short excerpt + link). Cards: `bg-[#111111] border border-[#1f1f1f]`, sharp corners, purple title on hover.
- Newsletter embed: Substack subscribe widget
- Podcast: POD256 description, link to `https://www.pod256.org`, next live date if scheduled

#### 1.7 Submit an Application

Full-width section with purple-tinted background (`bg-[#111111]` or very subtle purple wash). Left-aligned layout with 1px purple left accent bar on the section.
- Heading in Barlow Condensed
- Category pill tags showing what gets funded (hardware / firmware / pool software / education)
- Primary CTA button → `/grants`
- 8/4 column grid: copy left, supplementary info right

#### 1.8 Community

3/9 column split on desktop. Icon + label + description rows for each community channel (Forum, Telegram, X, Nostr, GitHub). Icons are inline SVGs. Hover: purple icon color.

#### 1.9 Supporter Showcase

**Financial Supporters:**
Grouped by tier (Block Founders / Hash Champions / Satoshi Friends). Each supporter: logo image (if org) or avatar (if individual), name/nym in Space Mono, click → external website or social profile. Logos shown at consistent height, grayscale default → color/purple-tint on hover.

**Hashrate Leaderboard (live):**
F1-style ranked competition leaderboard. Polls `/api/hashdash` every 60s. Layout:
- `#1` gets gold treatment, `#2` silver, `#3` bronze — colored rank badges
- Worker name (Space Mono), hashrate (Barlow Condensed, large), formatted as TH/s or GH/s
- Loading: skeleton rows with shimmer animation
- Error: graceful "Dashboard unavailable" state with link to `https://dash.256f.org`
- "View Full Dashboard →" link below table

#### 1.10 Contact Form

Bottom of homepage. Input fields: `bg-zinc-900 border border-[#2a2a2a]`, focus → purple border + ring. Fields: Name/Alias, Email, Message (textarea). Submit: Primary CTA (white button). Success/error states inline.

---

### 2. Mission / About Page (`/mission`)

#### 2.1 Hero — Mission Statement

Full-width hero with PCB background. NO logo in hero — the **mission statement text IS the hero**.

Massive Barlow Condensed ExtraBold headline (3–5 words, bold, may wrap to 2 lines on desktop). Below: full mission statement prose in `text-lg lg:text-xl` Inter. Max-width `max-w-3xl`.

Example headline: "OPEN MINING FOR EVERYONE." or "OPEN SOURCE. ALWAYS." — exact copy TBD by foundation team.

Purple 1px left accent bar on the prose block.

#### 2.2 Vision Quote

Pull quote styling: large Barlow Condensed Italic (or regular), centered, max-w-2xl, subtle purple text. "An open protocol should be accessible to anyone at all layers — the open-source Bitcoin mining stack we are building achieves this."

#### 2.3 Values / Principles

4 value cards in a 2×2 grid (desktop) / single column (mobile). Each card:
- Sharp edges (`border border-[#1f1f1f]`)
- Barlow Condensed heading
- Short prose value statement
- On hover: subtle purple border glow

Values: Free and open development / 100% passthrough / Permissionless innovation / Community-first governance

#### 2.4 Foundation History / Timeline

Vertical timeline, left-aligned, connecting line in purple. Each milestone:
- Purple dot marker
- Date in Space Mono
- Event heading in Barlow Condensed
- 1–2 sentence description

Key milestones:
- February 2024 — 256 Foundation formed
- [Date] — First TeleHash; solo mined a block
- [Date] — Four pillar grants launched
- [Date] — TeleHash 2 and 3
- Additional milestones TBD

#### 2.5 Founders

Two-column card layout:
- **@bitkite** — photo (Twitter/social photo), handle in Barlow Condensed, bio, social icons (X, Nostr, GitHub)
- **@econoalchemist** — same structure

Cards: sharp corners, `bg-[#111111] border border-[#1f1f1f]`. Photo treatment: square crop, grayscale → color on hover.

#### 2.6 Board

Three-column card layout:
- Tyler Stevens, Skot (also Lead Engineer, Ember One), Joe Wood
- Same card structure as founders

*Headshots, bios, and social handles to be provided. Placeholder: initials circle `bg-[#111111]` until real photos delivered.*

---

### 3. Projects Page (`/projects`)

#### 3.1 Four Pillar Grants

Section header (Barlow Condensed + Space Mono label) explaining these are foundation core grants.

**Cards are larger and more detailed than the homepage** — full description, all milestones visible, technical spec summary. 2×2 grid on desktop, single column on mobile.

Each card:
- Progress bar across top of card (1px, fills proportionally with completed milestones, purple)
- Project name in Barlow Condensed Bold
- Category badge (hardware / firmware / software) in Space Mono
- Status badge (active / in-progress / completed) in terminal green/purple/gray
- Full one-paragraph description
- Milestone summary (e.g., "3 of 7 milestones complete")
- External site link + GitHub link + "View Project →" button
- Sharp corners, `bg-[#111111]`, purple glow on hover

**The Four Pillar Projects:**
| Project | Type | External | Sub-page |
|---|---|---|---|
| Ember One | Open Hardware Hashboard | emberone.org | /projects/ember-one |
| Mujina | Open Mining Firmware | mujina.org | /projects/mujina |
| Libre Board | Open Hardware Control Board | libreboard.org | /projects/libre-board |
| Hydrapool | Open Mining Pool Software | hydrapool.org | /projects/hydrapool |

#### 3.2 Ecosystem Community Projects

Section with two external-link cards:
- **Open Source Miners United (OSMU)** → `https://osmu.wiki`
- **Hashrate Heatpunks** → `https://heatpunks.org`

Cards slightly smaller than pillar cards. External link icon. Open in new tab.

#### 3.3 Funded Project Log (`id="log"`)

Table/list of every grant funded. Columns: Project Name / Grantee / Category / Amount / Status / Date.
Sharp-corners table style: `border border-[#1f1f1f]`, alternating row subtle tint, header row in Space Mono uppercase.

---

### 4. Project Sub-pages (`/projects/[slug]`)

**These pages are the most visually ambitious on the site.** Inspired by Apple product pages — scroll-driven storytelling with 3D assets for hardware and hash stream animations for software.

#### Hardware Projects: Ember One + Libre Board

**3D Scroll Experience:**

The core interaction is a **scroll-driven 3D assembly/explosion** of the PCB/hardware model. As the user scrolls down:
- Components start separated (exploded view)
- Scrolling assembles them together, revealing the complete board
- Specific components highlight with labels as they pass through an "active zone"
- Final state: fully assembled board, slowly rotating

**Implementation:**
- 3D model: GLTF/GLB file (client must convert from STEP/KiCad — see Asset Pipeline below)
- Renderer: `@react-three/fiber` + `@react-three/drei` + `gsap` ScrollTrigger for scroll binding
- The 3D canvas is **sticky** — it stays in viewport while the user scrolls through a tall scroll container
- Text panels scroll alongside/over the 3D model, triggering assembly stages
- Mobile: graceful fallback to static 3D render (no scroll animation) to preserve performance

**Asset Pipeline for GLTF export from KiCad/STEP:**
1. Open STEP file in FreeCAD (free)
2. Export as GLTF/GLB from File > Export
3. Optimize with `gltf-transform` CLI: `npx @gltf-transform/cli optimize model.glb optimized.glb`
4. Place at `public/models/[project-slug].glb`

**Page sections (hardware):**
1. **Hero band:** Project name (Barlow Condensed ExtraBold, huge), one-line description, status badge, external links (GitHub, project site, forum)
2. **3D Scroll Section:** Full-height sticky 3D assembly experience (scroll to assemble). Text panels overlaid: "Why This Hardware Matters", "The Problem With Proprietary", technical specs as components assemble
3. **Milestone Tracker:** Horizontal progress steps — completed steps filled purple, future steps grayed. Step labels in Space Mono. Arrow connectors between steps.
4. **Team:** Lead engineer + project manager cards (photo, handle, bio, social links)
5. **Links:** GitHub, project site, forum, documentation

#### Software Projects: Mujina + Hydrapool

**Hash Stream Background Experience:**

Instead of 3D, these pages use an **animated hash stream** as the persistent background canvas:
- Continuous stream of SHA-256 hash values, nonces, and difficulty targets scrolling vertically in the background
- Implemented as a `<canvas>` element with terminal green text on near-black
- Opacity ~0.08–0.12 — subtle atmospheric texture, not readable content
- On scroll, the stream speed or density changes subtly
- Specific values in the stream highlight briefly as the user scrolls past relevant sections (e.g., when the "What It Does" section enters view, a "VALID BLOCK FOUND" flash appears in the stream)

**Page sections (software):**
1. **Hero band:** Project name, description, status, links
2. **What It Is / Why It's Needed:** Prose sections with hash stream background, purple accent bars on key pull quotes
3. **Technical Architecture:** Stack diagram, protocols supported, compatibility — rendered as a structured technical spec list or ASCII-style diagram
4. **Milestone Tracker:** Same horizontal progress steps as hardware pages
5. **Team:** Same structure
6. **Links**

#### Shared Section: "Why This Is a Core Grant"

Both hardware and software project pages include a compelling explanation of why the foundation specifically funds this project, framed around the systemic problem it addresses. This section uses a large Barlow Condensed pull quote as the visual anchor.

---

### 5. Grants Page (`/grants`)

**Goal:** Balanced — explain the program, establish credibility with grant history, then drive to the apply CTA.

**Page structure:**

1. **About the Program** — brief explanation of core pillar grants vs. open rolling grants
2. **What We Fund** — category list (hardware / firmware / pool software / education / tools). Pill tags.
3. **What We Don't Fund** — short list (closed-source, unrelated to Bitcoin mining)
4. **Grant History** — embedded grant log table (`id="log"`) showing past funded grants — establishes credibility
5. **Application Process** — step-by-step how it works
6. **Apply CTA** — large purple-accented section, Primary CTA button → Typeform (new tab)

---

### 6. Donate Page (`/donate`)

**Priority: Bitcoin/fiat first, hashrate second.**

1. **Why Donate** — 100% passthrough, 501(c)(3) tax-deductible, EIN displayed
2. **Donate with Bitcoin/Fiat** — featured section with Zaprite button (Primary CTA), accepted methods (BTC on-chain, Lightning, card)
3. **Donate with Hashrate** (`id="hashrate"`) — explanation of hashrate donation concept, step-by-step pool setup instructions:
   - Pool URL: `stratum+tcp://pool.256foundation.org:3333`
   - Worker name: `your_npub.bitaxe-1`
   - Link to HasHDash for verification
   - Link to TeleHash page

---

### 7. TeleHash Page (`/telehash`)

**All three sections equally weighted:**

1. **What Is TeleHash** — explanation of the semi-annual 8-hour livestream solo mining fundraiser
2. **Countdown Timer** — large, prominent countdown to next event. If no event scheduled: newsletter subscribe CTA. Display in DD:HH:MM:SS blocks, Space Mono font, purple numbers.
3. **Past Events** — card archive of all TeleHash events (event number, date, result, YouTube embed if available)
4. **How to Participate** — step-by-step pool setup instructions (same as donate page hashrate section)

---

### 8. FAQ Page (`/faq`)

**Layout:** Grouped by category with bold section headers. Accordion per question (HTML `<details>/<summary>`). No JS required.

**Closed state:** Question text + right-side chevron (rotates 180° when open)
**Open state:** Summary highlight in purple (`[open] > summary { color: #7C3AED }`)
**Category headers:** Barlow Condensed Bold, uppercase, with horizontal rule

Categories:
- About the Foundation
- Donations
- Grants
- Projects & Ecosystem
- Technical

*All answers authored by foundation team — data in `data/faq.ts`.*

---

## Content Data Files

| Data | File | Notes |
|---|---|---|
| Financial supporters | `data/supporters.ts` | Name, logo/photo URL, link, tier |
| Funded project log | `data/grants.ts` | All grants ever funded |
| Pillar project milestones | `data/projects.ts` | Per-project milestone data |
| Allocation totals | `data/stats.ts` | BTC/USD allocated, blocks found |
| TeleHash events | `data/telehash.ts` | Past events + upcoming date |
| Team members | `data/team.ts` | Founders, board, bios, photos |
| FAQ | `data/faq.ts` | Q&A pairs by category |
| Navigation | `data/navigation.ts` | topNav, footer links |

---

## SEO & Meta

Every page:
- `<title>`: `[Page Name] | 256 Foundation`
- `<meta name="description">`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card
- Canonical URL
- Auto-generated `sitemap.xml` + `robots.txt` via Next.js built-in

OG images: default branded 1200×630 for generic pages; custom per project sub-page.

---

## Analytics

- **Platform:** Umami (self-hosted)
- **Script:** `<Script strategy="afterInteractive">` in `app/layout.tsx`, gated on `NODE_ENV === 'production' && NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- **Privacy:** Cookieless, no PII

---

## External Integrations

| Integration | Purpose | Implementation |
|---|---|---|
| Zaprite | Financial donations | External link button |
| Typeform | Grant applications | External link, new tab |
| Substack | Recent posts | RSS fetch, revalidate 3600s, 3 post cards |
| HasHDash API | Live hashrate leaderboard | Client-side polling every 60s via `/api/hashdash` proxy |
| Contact email | Form submissions | `/api/contact` + Resend |
| Umami | Analytics | Script tag in root layout |

---

## API Routes

### `app/api/contact/route.ts`
- POST: validate fields, send via Resend to `CONTACT_EMAIL`, auto-reply to submitter
- Returns 500 gracefully when `RESEND_API_KEY` missing

### `app/api/hashdash/route.ts`
- `export const dynamic = 'force-dynamic'`
- Proxy GET to `HASHDASH_API_URL ?? 'https://dash.256f.org/api/workers'`
- Returns 503 `{ error: 'Upstream unavailable' }` on failure

---

## Environment Variables

```env
CONTACT_EMAIL=
EMAIL_FROM=
RESEND_API_KEY=
HASHDASH_API_URL=
HASHDASH_API_KEY=
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=
NEXT_PUBLIC_ZAPRITE_URL=
NEXT_PUBLIC_TYPEFORM_URL=
NEXT_PUBLIC_SITE_URL=https://256foundation.org
```

---

## 3D Asset Pipeline (Client Action Required)

Before the hardware project pages can go live, the client must export GLTF/GLB files from the existing KiCad/STEP files.

**Steps:**
1. Install [FreeCAD](https://www.freecad.org/) (free, open-source)
2. Open the STEP file (`.step`) for Ember One or Libre Board
3. File → Export → select `.glb` format
4. Run optimization: `npx @gltf-transform/cli optimize model.glb public/models/ember-one.glb`
5. Repeat for Libre Board: output to `public/models/libre-board.glb`

Target file size: under 5MB per model after optimization. If larger, use Draco compression: `--compress draco` flag.

**Fallback while assets are pending:** Show a static hero image of the board (photograph or render) with a "3D model loading..." placeholder. The rest of the page still works.

---

## Page Inventory Summary

| Route | Page | Notes |
|---|---|---|
| `/` | Home | 10 sections |
| `/mission` | Mission & About | Founders, board, timeline, values |
| `/projects` | Projects Hub | Pillar cards, ecosystem cards, grant log |
| `/projects/ember-one` | Ember One | 3D scroll assembly experience |
| `/projects/mujina` | Mujina | Hash stream background |
| `/projects/libre-board` | Libre Board | 3D scroll assembly experience |
| `/projects/hydrapool` | Hydrapool | Hash stream background |
| `/grants` | Grants Program | Typeform CTA |
| `/donate` | Donate | Zaprite + hashrate instructions |
| `/telehash` | TeleHash | Countdown + past events + how to |
| `/faq` | FAQ | Grouped accordion, no JS |

---

## Out of Scope (v1)

- CMS / admin interface
- User accounts or authentication
- Multi-language / internationalization
- Privacy Policy or Terms of Service pages
- On-site blog (Substack IS the blog)
- Custom Zaprite or Typeform UI
- Real-time block notifications via WebSocket
- Mobile app
- Manual dark/light mode toggle (OS preference only)

---

## Content Requiring Client Delivery Before Launch

- [ ] GLTF/GLB 3D models for Ember One and Libre Board (see Asset Pipeline section)
- [ ] Headshots for: @bitkite, @econoalchemist, Tyler, Skot, Joe Wood (Twitter/social photos acceptable)
- [ ] Bios and social handles for all team/board members
- [ ] Zaprite donation link URL
- [ ] Typeform grant application URL
- [ ] Foundation EIN for 501(c)(3) display
- [ ] TeleHash event dates (past events 1–3, and upcoming if scheduled)
- [ ] Pillar project milestone data (current status for all 4 projects)
- [ ] Financial supporter list (name, headshot/logo, link, tier)
- [ ] HasHDash API documentation (endpoints, auth if any)
- [ ] Allocation totals (BTC/USD deployed to date)
- [ ] Embedded video URL for TeleHash block find (YouTube)
- [ ] FAQ answers authored by foundation team
- [ ] Contact form destination email address
- [ ] Umami instance URL and site ID
- [ ] Mission page hero headline copy (short Barlow Condensed tagline, e.g., "OPEN MINING FOR EVERYONE.")
