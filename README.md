# 256 Foundation — Website

Official website for the [256 Foundation](https://256foundation.org), a 501(c)(3) nonprofit building the open-source Bitcoin mining ecosystem. Built with Next.js 15 and Tailwind CSS v4.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Deployment](#deployment)
6. [Site Architecture — Pages & Navigation](#site-architecture--pages--navigation)
7. [External Integrations & Links](#external-integrations--links)
8. [Design System](#design-system)
   - [Colors](#colors)
   - [Typography](#typography)
   - [Spacing & Layout](#spacing--layout)
   - [UI Components](#ui-components)
   - [Decorative Elements](#decorative-elements)
   - [Design Themes & Principles](#design-themes--principles)
9. [Data Layer](#data-layer)
10. [API Routes](#api-routes)
11. [Content Updates](#content-updates)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^15.5.13 |
| UI Library | React | ^19.2.4 |
| Language | TypeScript | ^5.9.3 |
| Styling | Tailwind CSS v4 | ^4.2.2 |
| Email | Resend | ^6.9.4 |
| XML Parsing | fast-xml-parser (Substack feed) | ^5.5.6 |
| Analytics | Umami (self-hosted, optional) | — |

**Key architectural decisions:**
- **App Router** — all pages use Next.js 15 App Router with server components by default
- **Tailwind CSS v4** — CSS-first config via `@theme` and `@custom-variant` in `globals.css` (no `tailwind.config.js`)
- **Dark mode** — driven by `@media (prefers-color-scheme: dark)` OS preference, not a toggle; Tailwind `dark:` prefix maps to this media query
- **Static-first** — most pages are statically generated at build time; only the contact API and HasHDash proxy are server-rendered on demand

---

## Project Structure

```
website-256F/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — wraps all pages with Header + Footer
│   ├── page.tsx                # Home page (/)
│   ├── globals.css             # Global styles, Tailwind theme, font vars, dark mode
│   ├── robots.ts               # Auto-generated robots.txt
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   ├── mission/page.tsx        # /mission
│   ├── donate/page.tsx         # /donate
│   ├── grants/page.tsx         # /grants
│   ├── faq/page.tsx            # /faq
│   ├── telehash/page.tsx       # /telehash
│   ├── projects/
│   │   ├── page.tsx            # /projects (all projects overview)
│   │   └── [slug]/page.tsx     # /projects/[slug] (individual project)
│   └── api/
│       ├── contact/route.ts    # Contact form → Resend email
│       ├── hashdash/route.ts   # Proxy for HasHDash worker API
│       └── posts/route.ts      # Substack RSS feed proxy
│
├── components/
│   ├── ui/                     # Reusable primitive components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Logo.tsx
│   │   ├── SectionWrapper.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── DecorativeBg.tsx
│   │   ├── PCBBackground.tsx
│   │   └── ExternalLink.tsx
│   ├── layout/                 # Header, Footer, Navigation
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── NavDropdown.tsx
│   ├── home/                   # Home page section components
│   │   ├── HeroSection.tsx
│   │   ├── DonateCards.tsx
│   │   ├── WhySection.tsx
│   │   ├── AllocationStats.tsx
│   │   ├── BlocksFound.tsx
│   │   ├── StayUpdated.tsx
│   │   ├── ApplySection.tsx
│   │   ├── CommunitySection.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── SupporterShowcase.tsx
│   │   ├── HashrateLeaderboard.tsx
│   │   └── ContactForm.tsx
│   ├── projects/               # Project detail components
│   │   ├── PillarProjectCard.tsx
│   │   ├── MilestoneTracker.tsx
│   │   ├── GrantLogTable.tsx
│   │   ├── HardwareProjectViewer.tsx
│   │   └── EcosystemCard.tsx
│   ├── shared/                 # Cross-page shared components
│   │   ├── TeamMemberCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── NewsletterSignup.tsx
│   │   └── SubstackEmbed.tsx
│   └── telehash/               # TeleHash-specific components
│       ├── CountdownTimer.tsx
│       └── TeleHashEventCard.tsx
│
├── data/                       # Static data — edit these to update site content
│   ├── navigation.ts           # All nav links (top nav + footer)
│   ├── projects.ts             # Pillar project definitions (Ember One, Mujina, etc.)
│   ├── grants.ts               # Grant recipient log
│   ├── supporters.ts           # Donor tiers
│   ├── team.ts                 # Team member profiles
│   ├── stats.ts                # Foundation statistics (BTC allocated, blocks found)
│   ├── telehash.ts             # TeleHash event history + next event date
│   └── faq.ts                  # FAQ entries by category
│
├── lib/
│   ├── metadata.ts             # SEO metadata generation helper
│   └── substack.ts             # Substack RSS fetch + parse
│
├── types/
│   └── index.ts                # All TypeScript interfaces
│
├── public/
│   ├── logos/                  # Logo variants (see Logo Component section)
│   ├── projects/               # Project images (Mujina, Hydrapool, etc.)
│   ├── team/                   # Team headshots
│   ├── supporters/             # Supporter tier logos
│   ├── ecosystem/              # Ecosystem partner logos
│   ├── og/                     # Open Graph images
│   └── models/                 # 3D model assets
│
└── next.config.ts              # Next.js config (image domains, etc.)
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/tylerkstevens/website-256F.git
cd website-256F
npm install
```

### Development

```bash
npm run dev
# → http://localhost:3000
```

### Build & Production

```bash
npm run build     # compile for production
npm start         # run production server
npm run lint      # run ESLint
```

---

## Environment Variables

Create a `.env.local` file in the project root. Copy the following and fill in values:

```env
# ─── Public (exposed to browser) ─────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://256foundation.org

# Zaprite donation link (used on /donate page)
NEXT_PUBLIC_ZAPRITE_URL=https://pay.zaprite.com/pl_...

# Typeform grant application URL (used on /grants page)
NEXT_PUBLIC_TYPEFORM_URL=https://form.typeform.com/to/...

# Umami analytics (optional — only injected in production)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=

# ─── Private (server-only) ────────────────────────────────────────────────────
# Resend email API key (contact form)
RESEND_API_KEY=re_...

# Email routing
CONTACT_EMAIL=hello@256foundation.org
EMAIL_FROM=noreply@256foundation.org

# HasHDash API (proxy for pool worker data)
HASHDASH_API_URL=https://dash.256f.org/api/workers
HASHDASH_API_KEY=
```

> **Note:** The site builds and runs without any env vars — pages fall back gracefully (donation buttons link to `#`, grant form links to `#`, analytics is skipped). Only the contact form and HasHDash widget require API keys to function.

---

## Deployment

The site is deployed on **Vercel** using the default Next.js preset — no `vercel.json` is required.

### Deploying

1. Push to `main` → Vercel auto-deploys
2. Pull requests get preview deployments automatically

### Remote Image Domains

These domains are configured in `next.config.ts` for `next/image` optimization:

| Domain | Used For |
|--------|---------|
| `substackcdn.com` | Substack post thumbnails |
| `substack-post-media.s3.amazonaws.com` | Substack post images |
| `i.ytimg.com` / `img.youtube.com` | YouTube thumbnails |

---

## Site Architecture — Pages & Navigation

### Page Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, donate CTAs, why section, stats, blocks found, updates, apply section, ecosystem, supporters, contact form |
| `/mission` | Mission | Foundation story, team, timeline, values |
| `/projects` | Projects | Overview of all four pillar projects |
| `/projects/ember-one` | Ember One | Individual project detail |
| `/projects/mujina` | Mujina | Individual project detail |
| `/projects/libre-board` | Libre Board | Individual project detail |
| `/projects/hydrapool` | Hydrapool | Individual project detail |
| `/grants` | Grants | Grant program overview + application |
| `/donate` | Donate | BTC/Lightning/card donation + hashrate donation |
| `/telehash` | TeleHash | Event info, countdown, participation guide, history |
| `/faq` | FAQ | Categorized Q&A accordion |

### Top Navigation

```
Logo (→ /)     Home     Mission     Projects ▾     Community ▾     Grants     [GitHub]     [Donate]

Projects dropdown:
  • Ember One          → /projects/ember-one
  • Mujina             → /projects/mujina
  • Libre Board        → /projects/libre-board
  • Hydrapool          → /projects/hydrapool
  ─────────────────
  • Funded Project Log → /projects#log

Community dropdown:
  • Forum              → https://forum.256foundation.org  (external)
  • Telegram           → https://t.me/the256foundation    (external)
  • Newsletter         → https://256foundation.substack.com (external)
  • POD256             → https://www.pod256.org           (external)
  • HasHDash           → https://dash.256f.org            (external)
  • TeleHash           → /telehash
  • X / Twitter        → https://x.com/256FOUNDATION      (external)
  • Nostr              → https://primal.net/p/nprofile1... (external)
```

### Footer Navigation

```
Foundation links:    Home · Mission · Projects · Grants · Donate · TeleHash · FAQ

Community links:     Forum · Telegram · GitHub · HasHDash · POD256 · Newsletter
                     (all external)

Social icons:        X  GitHub  Telegram  Nostr
```

### Responsive Behavior

| Breakpoint | Nav | Footer |
|-----------|-----|--------|
| < 768px (mobile) | Hamburger menu → full-screen `MobileNav` overlay | 1 column stacked |
| 768px–1023px (tablet) | Hamburger menu | 3 columns |
| ≥ 1024px (desktop) | Full horizontal nav with dropdowns | 12-col grid with col-spans |

---

## External Integrations & Links

### Payment & Donation
| Service | URL | Used In |
|---------|-----|---------|
| Zaprite | `https://pay.zaprite.com/pl_...` (env var) | `/donate`, home donate cards |

### Mining & Pool
| Service | URL | Used In |
|---------|-----|---------|
| Hydrapool (mining pool) | `stratum+tcp://pool.256foundation.org:3333` | `/donate`, `/telehash` |
| HasHDash (pool dashboard) | `https://dash.256f.org` | Footer, donate, nav |
| HasHDash API | `https://dash.256f.org/api/workers` | `/api/hashdash` proxy |

### Community Platforms
| Platform | URL |
|----------|-----|
| X / Twitter | `https://x.com/256FOUNDATION` |
| GitHub (org) | `https://github.com/256foundation` |
| Telegram | `https://t.me/the256foundation` |
| Nostr | `https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq` |
| Forum | `https://forum.256foundation.org` |
| Newsletter | `https://256foundation.substack.com` |
| POD256 Podcast | `https://www.pod256.org` |

### Project Sites & GitHub Repos
| Project | Site | GitHub |
|---------|------|--------|
| Ember One | `https://emberone.org` | `github.com/256foundation/ember-one` |
| Mujina | `https://mujina.org` | `github.com/256foundation/mujina` |
| Libre Board | `https://libreboard.org` | `github.com/256foundation/libre-board` |
| Hydrapool | `https://hydrapool.org` | `github.com/256foundation/hydrapool` |

### Third-party Content
| Service | Purpose |
|---------|---------|
| Substack RSS | Blog post feed on home page (`https://256foundation.substack.com/feed`) |
| YouTube embeds | Block found / event videos on project pages |
| Typeform | Grant application form (env var) |
| Resend | Contact form email delivery |

---

## Design System

This section documents the complete visual language of the site so it can be replicated in other apps, marketing materials, or design tools.

### Colors

All colors are defined as CSS custom properties in `app/globals.css` under `@theme`.

#### Brand Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Brand Purple** | `#7C3AED` | Primary accent — buttons, links, hover states, labels, borders |
| **Purple Dark** | `#6D28D9` | Button hover state |
| **Purple Light** | `#5B21B6` | Scrollbar hover (light mode) |
| **Terminal Green** | `#00FF41` | Success indicators, live status, code text in terminal-style blocks |
| **Error Red** | `red-500` (Tailwind) | "What we don't fund" list markers |

#### Dark Mode (default / `prefers-color-scheme: dark`)

| Role | Hex | Tailwind Equivalent |
|------|-----|---------------------|
| Page background | `#1a1a1a` | — |
| Elevated surface (cards, inputs) | `#242424` | — |
| Border | `#1f1f1f` | — |
| Subtle border (darker context) | `#111111` | — |
| Primary text | `#ffffff` | `text-white` |
| Secondary text | `text-gray-400` | `rgb(156 163 175)` |
| Muted text | `text-gray-500` / `text-gray-700` | |

#### Light Mode (`prefers-color-scheme: light`)

| Role | Hex / Class | Notes |
|------|-------------|-------|
| Page background | `#ffffff` | `bg-white` |
| Elevated surface | `#f5f5f5` / `bg-gray-50` | |
| Border | `#e5e7eb` | `border-gray-200` |
| Primary text | `#111827` | `text-gray-900` |
| Secondary text | `#6b7280` | `text-gray-600` |
| Muted text | `#9ca3af` | `text-gray-400` |

#### Purple Radial Glow (decorative)

Used in `DecorativeBg` and `HeroSection`:
```
rgba(124, 58, 237, 0.08–0.12)   /* body sections */
rgba(124, 58, 237, 0.12)         /* hero section (most prominent) */
```

#### Gradient Accents

- **Purple fade bar** (footer, section dividers):  
  `linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)`
- **Hero gradient** (dark overlay on hero image):  
  `from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent`

---

### Typography

Three font families are loaded via `next/font/google` in `app/layout.tsx`.

#### Font Families

| Font | CSS Class | Google Font | Weights | Role |
|------|-----------|-------------|---------|------|
| **Barlow Condensed** | `font-display` | `Barlow_Condensed` | 600, 700, 800 | Headings, labels, uppercase UI text |
| **Space Mono** | `font-mono` | `Space_Mono` | 400, 700 | Code, monospace UI, buttons, nav links, tags |
| **Inter** | `font-sans` | `Inter` | Variable | Body text (default) |

#### Usage Rules

| Element | Font | Weight | Case | Example |
|---------|------|--------|------|---------|
| Page H1 | Barlow Condensed | Bold (700) | UPPERCASE | "MINE FOR THE MISSION" |
| Section H2 | Barlow Condensed | Bold (700) | UPPERCASE | "HOW TO PARTICIPATE" |
| Card title | Barlow Condensed | Bold (700) | UPPERCASE | "OPEN ROLLING GRANTS" |
| Category label / eyebrow | Space Mono | 400 | UPPERCASE + tracking | "TELEHASH" (purple, tiny) |
| Body paragraph | Inter | 400 | Sentence | Long-form descriptions |
| Button text | Space Mono | Bold (700) | Mixed | "Apply for a Grant" |
| Navigation links | Space Mono | 400–700 | Mixed | "Mission", "Projects" |
| Code / pool URL | Space Mono | 400 | lowercase | `stratum+tcp://...` |
| Stats / numbers | Space Mono | Bold | Mixed | "4.2 BTC" |

#### Sizing Scale (key breakpoints)

| Element | Mobile | Desktop |
|---------|--------|---------|
| H1 hero | `text-3xl` (30px) | `text-5xl` (48px) — `lg:text-6xl` (60px) |
| H2 section | `text-2xl` (24px) | `text-3xl` (30px) |
| Body | `text-base` (16px) | `text-lg` (18px) |
| Label / eyebrow | `text-xs` (12px) | `text-xs` |
| Button (lg) | `text-base` (16px) | `text-base` |

---

### Spacing & Layout

#### Container

All page sections use `SectionWrapper` which provides:
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (max width 1280px, centered, responsive padding)
- Default vertical padding: `py-16 lg:py-24`
- Tight variant: `py-10 lg:py-16` (used for compact sections like the countdown)

#### Grid System

- Uses Tailwind's standard 12-column grid (`grid-cols-12`) at `lg` breakpoint for complex layouts
- Cards typically use: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (responsive auto-stacking)
- Footer: `grid-cols-1 md:grid-cols-3 lg:grid-cols-12`
- Section borders: `border-t border-gray-200 dark:border-[#1f1f1f]` between sections

#### Section Dividers

Sections are separated by thin borders, not whitespace gaps:
```jsx
<SectionWrapper className="border-t border-gray-200 dark:border-[#1f1f1f]">
```

---

### UI Components

All reusable components live in `components/ui/`. Import with `@/components/ui/ComponentName`.

#### `Button`

```tsx
<Button variant="primary" size="lg" href="/grants" external>
  Apply for a Grant
</Button>
```

| Prop | Options | Default |
|------|---------|---------|
| `variant` | `'primary'` \| `'secondary'` \| `'outlined'` | `'primary'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` |
| `href` | string (renders as `<a>`) | — |
| `external` | boolean (adds `target="_blank"`) | `false` |
| `loading` | boolean | `false` |
| `disabled` | boolean | `false` |

**Styles:**
- `primary`: purple background (`#7C3AED`), white text, no border-radius (`rounded-none`)
- `secondary`: transparent, purple text, purple border
- `outlined`: transparent, gray text, gray border

#### `Card`

Generic bordered container. Used throughout for info panels.

```tsx
<Card hover className="p-6">
  Content here
</Card>
```

Appearance: `bg-gray-50 dark:bg-[#242424]`, `border border-gray-200 dark:border-[#1f1f1f]`, `rounded-none`

#### `Badge`

Status chip for project/grant status.

```tsx
<Badge status="active" />
```

| Status | Color |
|--------|-------|
| `active` | Green (`#00FF41`) |
| `completed` | Gray |
| `in-progress` | Purple |
| `paused` | Yellow |
| `upcoming` | Blue |

#### `Logo`

Auto-switches between black and white logo variants based on OS color scheme.

```tsx
<Logo variant="horizontal" height={32} />
```

| Prop | Options | Default |
|------|---------|---------|
| `variant` | `'horizontal'` \| `'square'` \| `'vertical'` \| `'circular'` | `'horizontal'` |
| `height` | number (px) | `32` |
| `priority` | boolean (LCP optimization) | `false` |

**Logo asset locations:** `public/logos/`
- `256-logo-horizontal-black.png` / `256-logo-horizontal-white.png`
- `256-logo-square-black.png` / `256-logo-square-white.png`
- `256-logo-vertical-black.png` / `256-logo-vertical-white.png`
- `256-logo-rnd-lg-black.png` / `256-logo-rnd-lg-white.png` (rounded variant)

> **Convention:** "Black" logos are for use on dark backgrounds; "white" logos for light backgrounds. The `Logo` component handles switching automatically.

#### `SectionWrapper`

Page section container with consistent padding and max-width.

```tsx
<SectionWrapper
  id="contact"
  className="border-t border-gray-200 dark:border-[#1f1f1f]"
  tight        // reduces vertical padding
  decorative   // adds relative overflow-hidden for DecorativeBg
>
  {children}
</SectionWrapper>
```

#### `SectionHeader`

Standardized section title block.

```tsx
<SectionHeader
  label="Foundation"       // small purple monospace eyebrow text
  title="Our Mission"
  subtitle="Supporting open-source development"
  align="center"           // 'left' | 'center'
/>
```

#### `DecorativeBg`

Layered decorative background: PCB circuit grid + purple radial glow + vignette fade. Must be placed inside a `<SectionWrapper decorative>` or a `relative overflow-hidden` container.

```tsx
<SectionWrapper decorative>
  <DecorativeBg
    gridOpacity={0.07}         // default 0.05
    glowOpacity={0.08}         // default 0.08
    glowPosition="50% 0%"      // CSS position string — '50% 0%' = top-center
    vignette={true}            // fade edges to page bg color
  />
  {/* content */}
</SectionWrapper>
```

> **Hero section** uses `opacity={0.12}` and `animated={true}` (via `PCBBackground` directly) — always more prominent than body sections.

---

### Decorative Elements

#### PCB Circuit Board Background

`<PCBBackground>` renders an SVG repeating pattern of circuit board traces (60×60px tile) across the full section.

- Dark mode strokes: `rgba(136, 136, 136, opacity)`
- Not used at full opacity anywhere — always a subtle texture layer
- Animation: `pcb-animated` CSS class cycles opacity 0.05 → 0.14 over 4s (hero only)

#### Purple Radial Glow

A `radial-gradient` overlay positioned at a configurable point:
```css
radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)
```
Common positions used on the site:
- `50% 0%` — top-center (hero sections on inner pages)
- `50% 100%` — bottom-center (contact section)
- `100% 50%` — right-center (ApplySection)

#### Vignette

A radial gradient that fades content edges into the page background color:
- **Dark mode:** fades to `#1a1a1a`
- **Light mode:** fades to `white`
- Disabled (`vignette={false}`) when a section has a non-standard background (e.g., `#242424`)

#### Purple Accent Bar

A 1px wide vertical bar using `bg-[#7C3AED]`, used in `ApplySection` and some card designs:
```jsx
<div className="absolute top-0 left-0 w-1 h-full bg-[#7C3AED]" />
```

#### Terminal Green Dot (Live Indicator)

Used as "Funding Active" or "Open Source. Always." status indicators:
```jsx
<span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"
  style={{ boxShadow: '0 0 4px #00FF41' }} />
```

---

### Design Themes & Principles

#### Overall Aesthetic

The site uses a **technical, industrial, open-source hacker** aesthetic — deliberately referencing Bitcoin mining hardware, circuit boards, and terminal interfaces. The visual language communicates seriousness, transparency, and technical credibility.

**Key descriptors:** dark, monochromatic, accented purple and green, condensed uppercase headings, monospace labels, zero border-radius on interactive elements, grid-based layouts.

#### Rules & Constraints

1. **No border-radius** — all cards, buttons, inputs use `rounded-none`. This is a hard design rule throughout the site. Badges use `rounded-none`. Only logo images may have subtle rounding.

2. **Uppercase headings** — all H1 and H2 use `.uppercase` with Barlow Condensed. This is core to the brand voice.

3. **Purple is the only accent color** — `#7C3AED` is used for all interactive states (hover, focus, active), labels, and decorative accents. Never use any other hue for brand accents.

4. **Terminal green = live/success only** — `#00FF41` is reserved for status indicators (live events, success states, code text). Do not use it as a general accent.

5. **Dark mode is the primary experience** — the site is designed dark-first. Light mode is a fully supported secondary experience. When in doubt, optimize for dark.

6. **Borders over shadows** — all depth and separation is achieved with borders (`#1f1f1f` in dark, `#e5e7eb` in light), not box shadows. This keeps the aesthetic flat and technical.

7. **Monospace for UI, display for headings, sans for body** — never mix these up. Body copy is always Inter, never Space Mono.

8. **Arrow symbols over chevrons** — use `→` (HTML: `&rarr;`) for directional UI cues, not `>` or chevron icons.

#### Card Patterns

All cards share a common structure:
- Background: `bg-gray-50 dark:bg-[#242424]`
- Border: `border border-gray-200 dark:border-[#1f1f1f]`
- Border-radius: `rounded-none`
- Active/highlighted card: border changes to `border-[#7C3AED]/30`
- Internal padding: `p-5` or `p-6`

Eyebrow label inside cards (small monospace category):
```jsx
<div className="font-mono text-[#7C3AED] text-xs tracking-widest uppercase mb-3">
  Category Label
</div>
```

#### Interactive States

| Element | Default | Hover | Focus |
|---------|---------|-------|-------|
| Link text | `text-gray-500` | `text-[#7C3AED]` | — |
| Border | `border-gray-200 dark:border-[#1f1f1f]` | `border-[#7C3AED]/40` | — |
| Button primary | `bg-[#7C3AED]` | `bg-[#6D28D9]` | ring |
| Icon buttons | `text-gray-500` | `text-[#7C3AED]` | — |

#### Animated Hover: Expanding Line

Used in footer and nav links — a zero-width line that expands to 3px on hover:
```jsx
<span className="w-0 group-hover:w-3 h-px bg-[#7C3AED] transition-all duration-200 overflow-hidden" />
```

---

## Data Layer

All site content is stored in plain TypeScript files in `data/`. Edit these to update content without touching components.

### Updating Statistics (`data/stats.ts`)
Modify `siteStats` to update the BTC allocated, blocks found, active grantees numbers shown on the home page.

### Updating Projects (`data/projects.ts`)
Each entry in `pillarProjects[]` includes: slug, title, description, status, team members, milestone phases, grant amounts, and optional logo paths.

### Adding a TeleHash Event (`data/telehash.ts`)
Add a new entry to `teleHashEvents[]`. Set `nextEventDate` to the upcoming event's ISO date string.

### Adding FAQ Entries (`data/faq.ts`)
Add to `faqItems[]`. Each entry has: `question`, `answer` (string or JSX), and `category` (`'foundation' | 'donations' | 'grants' | 'projects' | 'technical'`).

### Navigation Changes (`data/navigation.ts`)
All nav links for the header dropdowns and footer are defined here. Add/remove/reorder without touching layout components.

---

## API Routes

| Route | Method | Description | Auth |
|-------|--------|-------------|------|
| `/api/contact` | POST | Submits contact form via Resend email | None (rate limited by Vercel) |
| `/api/hashdash` | GET | Proxies HasHDash worker data | `HASHDASH_API_KEY` header |
| `/api/posts` | GET | Returns parsed Substack RSS feed (3 posts) | None |

---

## Content Updates

### Updating the Donate Link
Set `NEXT_PUBLIC_ZAPRITE_URL` in `.env.local` (or Vercel environment variables).

### Updating the Grants Application Link
Set `NEXT_PUBLIC_TYPEFORM_URL` in `.env.local`.

### Adding a Supporter Logo
1. Add the logo image to `public/supporters/tier1/` (or tier2, tier3)
2. Add an entry to `data/supporters.ts`

### Adding a Team Member
1. Add headshot to `public/team/`
2. Add entry to `data/team.ts`

### Updating the Mining Pool Address
Search for `pool.256foundation.org` — it appears in `app/donate/page.tsx` and `app/telehash/page.tsx` as static strings in the participation steps arrays.
