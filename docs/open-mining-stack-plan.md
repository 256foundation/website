# Open Mining Stack — Implementation Plan

**Status:** Implemented
**Created:** 2026-09-29
**Owner:** Tyler
**Branch:** `ui/website-changes`

---

## 1. Goal

Collapse the `/projects` index and the four standalone `/projects/[slug]` project
pages into **one narrative page** at **`/projects`**, titled **"Open Mining Stack"**.

The page tells the stack as a vertical sequence of layers — hash board → control
board → firmware → pool — in this order: **Ember One, Libre Board, Mujina,
Hydrapool**. It is deliberately lean: what each layer is, the problem it solves,
key specs, key features, and outbound links. No milestones. No per-project grant
amounts. No standalone deep pages.

Retired `/projects/[slug]` URLs 308-redirect to each project's dedicated external
website (contributor/technical homes, e.g. mujina.org).

The header's **Projects dropdown disappears**; a single top-level **"Open Mining
Stack"** link replaces it.

---

## 2. Locked decisions

| # | Decision | Value |
|---|----------|-------|
| 1 | Page name | **Open Mining Stack** |
| 2 | URL | **`/projects`** (no redirect for the index; SEO preserved) |
| 3 | Retired project pages | `308` external redirect to `externalUrl` (emberone.org, libreboard.org, mujina.org, hydrapool.org) |
| 4 | Nav | Dropdown removed → single top-level link `Open Mining Stack` → `/projects` |
| 5 | Per-project depth | Lean: description, problem it solves, ~4 key specs, short feature list, outbound links, architect line, small activity badges |
| 6 | Live data | Per-project GitHub (stars + last push) and Forum (last reply) **badges only**; ISR `revalidate = 3600`; fail-soft |
| 7 | Ecosystem grid | Dropped from page (lives in Ecosystem nav dropdown) |
| 8 | People | One inline "Core Architect & Lead Maintainer" line per project, name + X link. **Not** labeled "grantee" (grant status stays flexible) |
| 9 | Grant Log | Deleted everywhere: page section, `data/grants.ts`, `GrantLogTable`, `Grant` type |
| 10 | Visual treatment | Numbered layers + sticky in-page sub-nav; layer metaphor (silicon → pool) |
| 11 | Internal links | Home cards/chips and 2 MDX posts point to on-site `/projects#<slug>` anchors |
| 12 | Data pruning | Prune `data/projects.ts` + `PillarProject` to only what the page uses; add `architect` |
| 13 | Sitemap | Drop per-slug entries; keep `/projects` |
| 14 | Home heading | Keep `ProjectsSection` heading; nav label changes only |
| 15 | Plan file | `.opencode/plans/open-mining-stack-plan.md` |

---

## 3. Non-goals

- No new CMS/data layer, no DB, no animation library.
- Not building the dedicated external project sites — only linking to them.
- No `#contact`/analytics/theme changes.
- No re-theming; reuse existing design tokens.

---

## 4. Page architecture (`app/projects/page.tsx` — full rewrite)

Render order:

1. **Hero** — kicker `OPEN MINING STACK`, headline, thesis paragraph, PCB background +
   purple radial (match existing `/projects` and `/projects/[slug]` heroes). Anchor
   `#top`.
2. **Stack overview** — one short connective paragraph + a compact 4-cell mini
   index (layer number / function / project name) that doubles as jump links.
3. **Layer 01 — HASH BOARD → Ember One** (`id="ember-one"`)
4. **Layer 02 — CONTROL BOARD → Libre Board** (`id="libre-board"`)
5. **Layer 03 — FIRMWARE → Mujina** (`id="mujina"`)
6. **Layer 04 — POOL → Hydrapool** (`id="hydrapool"`)
7. **Closing CTA** — "Fund the stack" (`/donate`), org GitHub, Forum.

**Sticky sub-nav** (`StackSubNav`): horizontal mono strip pinned below the header;
`01 HASH BOARD · 02 CONTROL BOARD · 03 FIRMWARE · 04 POOL`; active-section highlight
on scroll (IntersectionObserver, client component); horizontally scrollable on
mobile. Sections get `scroll-mt` accounting for the fixed header height **plus the
`--ext-offset` extension var**.

**Each `StackLayerSection` renders:**
- Kicker: `LAYER 01 / HASH BOARD`
- Project name (respect `titleFont`) + tagline
- `description` — what it is
- "The problem" — trimmed `whyNecessary` (2–3 sentences)
- Key specs: ≤4 mono tiles
- Key features: short bullet list (replaces 3-column `techFeatures`)
- Outbound link row: **Dedicated site**, **GitHub repo**, **Forum category**
- Architect line: `Core Architect & Lead Maintainer — {name} @{handle}` → X
- **Activity badges** (fail-soft): GitHub `★ {stars}` + `last push {timeAgo}`;
  Forum `last reply {timeAgo}`

Alternate section backgrounds (white / `#242424`) to separate layers, matching the
existing detail-page rhythm.

---

## 5. Files

### New
- `.opencode/plans/open-mining-stack-plan.md` (this file)
- `components/projects/StackSubNav.tsx` (client, scroll-spy)
- `components/projects/StackLayerSection.tsx`
- `components/projects/ActivityBadges.tsx`

### Rewritten
- `app/projects/page.tsx` — becomes Open Mining Stack

### Deleted
- `app/projects/[slug]/page.tsx`
- `components/projects/PillarProjectCard.tsx`
- `components/projects/GrantLogTable.tsx`
- `components/projects/EcosystemCard.tsx`
- `components/projects/ProjectTeamSection.tsx`
- `components/projects/GitHubActivitySection.tsx`
- `components/projects/ProjectForumSection.tsx`
- `components/projects/MilestoneTracker.tsx` (already orphaned)
- `data/grants.ts`

> `lib/projectTitle.ts` stays (still used for the `titleFont` name treatment).
> `TeamMemberCard` stays (used by `/mission`).

### Edited
- `next.config.ts` — add `redirects()`
- `data/navigation.ts` — remove Projects dropdown; add top-level link; rename footer `Projects` label
- `data/projects.ts` — reorder + prune + add `architect`
- `types/index.ts` — slim `PillarProject`; delete `Grant` and related per-grant types
- `app/sitemap.ts` — drop per-slug routes
- `components/home/ProjectsSection.tsx` — card links → `/projects#<slug>`
- `components/home/HeroSection.tsx` — chips → `/projects#<slug>`
- `content/newsroom/presidio-bitcoin-fundraiser.mdx`, `content/newsroom/ry3t-nova.mdx` — link targets → anchors
- `CLAUDE.md` — update data-layer table (remove `data/grants.ts`, describe new page)

---

## 6. Redirects (`next.config.ts`)

```ts
async redirects() {
  return pillarProjects.map((p) => ({
    source: `/projects/${p.slug}`,
    destination: p.externalUrl,
    permanent: true, // 308
  }))
}
```

Targets (from `externalUrl`):
- `/projects/ember-one` → `https://emberone.org`
- `/projects/libre-board` → `https://libreboard.org`
- `/projects/mujina` → `https://mujina.org`
- `/projects/hydrapool` → `https://hydrapool.org`

---

## 7. Data model

New `PillarProject` (pruned):

```ts
export interface ProjectArchitect {
  name: string
  handle: string
  x: string
}

export interface PillarProject {
  slug: 'ember-one' | 'libre-board' | 'mujina' | 'hydrapool'
  type: 'hardware' | 'software'
  name: string
  tagline: string
  description: string
  whyNecessary: string      // "the problem"
  keySpecs: KeySpec[]       // ≤4
  keyFeatures: string[]     // ~4–6
  architect: ProjectArchitect
  status: 'active' | 'completed' | 'paused'
  externalUrl: string
  githubUrl: string
  forumCategory: string
  forumCategoryApiUrl: string
  titleFont?: 'bridge-officer'
  logo?: ProjectLogo        // keep icon/character for home cards
}
```

**Removed fields:** `whyCoreGrant`, `context`, `technicalDetails`, `techFeatures`,
`milestones`, `team`.
**Removed types:** `Grant`, `Milestone`, `TechFeatureGroup`, `ProjectContext`,
`ProjectContextPoint`.
**Kept:** `KeySpec`, `ProjectLogo`, `ProjectSlug`, `ProjectType`.

Data order becomes: ember-one, libre-board, mujina, hydrapool.

Content tweaks per project:
- Trim `keySpecs` to ≤4.
- Derive `keyFeatures` from the shortlist of existing `techFeatures`.
- Add `architect`: Skot / Schnitzel / Ryan Kuester / Jungly.

---

## 8. Copy drafts (for Tyler's review)

**Hero headline**
> **THE OPEN MINING STACK**
> Bitcoin mining has four chokepoints: the hash board, the control board, the
> firmware, and the pool. A handful of companies control them all. The 256
> Foundation funds the open alternative at every layer — built to work as one stack.

**Overview line**
> Four layers, one stack, no black boxes. Each layer is designed to interoperate
> with the next; each is open source and independently maintained.

**Layer transitions** (one line above each layer, optional):
- 01 HASH BOARD — *The silicon. Where hashrate is actually produced.*
- 02 CONTROL BOARD — *The brain. What schedules, powers, and connects the hardware.*
- 03 FIRMWARE — *The software in control. What the machine actually runs.*
- 04 POOL — *The last mile. Where hashrate becomes blocks and payouts.*

**Problem statements** — condensed from `whyNecessary`, e.g. Ember One:
> One hardware company has held near-total control over hash board designs for
> years. Ember One is a fully documented, CERN-OHL-S-2.0 reference design anyone
> can build on — breaking the dependency at the most fundamental layer.

**Closing CTA**
> **Fund the stack.**
> These layers only win if they ship. Your donation pays maintainers, not
> middlemen. — buttons: Donate, GitHub, Forum.

---

## 9. SEO / metadata

```ts
export const metadata = generatePageMetadata({
  title: 'Open Mining Stack',
  description:
    'The open-source Bitcoin mining stack: open hash board, control board, firmware, and pool software funded by the 256 Foundation.',
  path: '/projects',
})
```

- `sitemap.ts`: keep `/projects` at priority `0.9`; remove `projectRoutes`.
- Redirects carry SEO equity to external project domains.

---

## 10. Design-system guardrails

- Square corners (`rounded-none`), borders over shadows.
- Purple `#3b1445` / `#c084d8` is the only accent.
- Terminal green `#00FF41` reserved for live/status.
- Uppercase `font-display` headings; `font-mono` for labels/badges; `→` for direction.
- Style light **and** dark (media-query driven; no `.dark` toggle).

---

## 11. Accessibility & performance

- Sub-nav uses real `<a href="#slug">` anchors; sections have `id` + `scroll-mt`.
- Active-link state not color-only (add weight/underline).
- Mobile sub-nav scrollable, no trap.
- Badges render fallback text when a fetch returns null/empty.
- Page stays `revalidate = 3600`; fetches already fail-soft.

---

## 12. Verification

1. `npm run lint`
2. `npm run build` — expect the 4 slugs removed from the route map; `/projects` static+ISR.
3. `npm test`
4. `curl -sI localhost:3000/projects/mujina` → `308` → `mujina.org`.
5. Browser check desktop + mobile: sticky sub-nav, anchor jumps clear the fixed
   header and extension offset, both color schemes, badge fallbacks.

---

## 13. Risks / open items

- External project sites must be live before redirects ship.
- Confirm final hero/problem copy.
- Extension topbar (`--ext-offset`) must be honored by sticky sub-nav offset.
- Deleting component files: confirm nothing else imports them (verified for the
  listed set at time of writing).
