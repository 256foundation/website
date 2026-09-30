# UI work log

Running log of website UI revision rounds, decisions, and open follow-ups. **Read this
first in a fresh session** so nothing lives only in chat history.

Last updated: 2026-09-30

---

## Branch / PR status

| Branch | PR | Contents | State |
|--------|----|----------|-------|
| `ui/website-changes` | [#20](https://github.com/256foundation/website/pull/20) | Open Mining Stack: collapse `/projects` + 4 deep pages into one page; 308-redirect retired slugs; remove nav dropdown, Grant Log, ecosystem grid | open |
| `ui/edits-round2` | [#21](https://github.com/256foundation/website/pull/21) | Logo rebrand + invisible-logo fix; nav reorder; full-bleed stack hero | open (branched off `ui/website-changes`) |
| `ui/edits-round3` | — | Mission + Grants refresh; grants program copy/buttons | no PR yet (branched off `ui/edits-round2`) |

Each branch stacks on the previous one. Merge order matters: #20 → #21 → `ui/edits-round3`.

Dev server: `npm run dev` → http://localhost:3000. `npm run build` + `npm run lint` +
`npm test` must stay green (lint has 6 pre-existing `<img>` warnings, 0 errors).

---

## Round summaries

### Round 1 — `ui/website-changes` (PR #20)
- `/projects` rebuilt as **"Open Mining Stack"**: hero, layer index, sticky sub-nav,
  four layer sections (Ember One → Libre Board → Mujina → Hydrapool) each with
  "The closed problem" / "The open answer", specs, features, architect line, live
  GitHub/forum badges, and a "Fund the Stack" close.
- `/projects/{ember-one,libre-board,mujina,hydrapool}` → `308` to each project's
  dedicated site (`next.config.ts`).
- Removed Project nav dropdown, Grant Log (`data/grants.ts`, `GrantLogTable`, `Grant`
  type), and the duplicate ecosystem grid. Pruned `data/projects.ts` / `PillarProject`.

### Round 2 — `ui/edits-round2` (PR #21)
- New brand logo assets + `Logo.tsx` rewrite. **Bug fixed:** light mode served white
  artwork on white (invisible); now light→dark artwork, dark→white artwork.
- Header/mobile use the `secondary` lockup; hero/footer use `horizontal`. New favicon.
- Nav: removed Home; order Mission · Mining Stack · Grants · Newsroom · Ecosystem ·
  Community.
- `/projects` hero → full-bleed responsive image (`public/projects/open-mining-stack.webp`).

### Round 3 — `ui/edits-round3` (no PR)
- **Mission:** new mission-statement hero (clean, textured), a full-bleed photo band
  (`public/mission-background.webp`) framed by two thin muted info bars, subtle
  "Principles" filler (3 statements), emphasized `SectionKicker` labels, removed the
  two card `h2`s. Team bios edited (Skot, Bitkite).
- **Grants:** full-bleed faded hero (`public/grants-hero-background.webp`, accent word
  purple) matching the stack hero; two hero cards ("Apply for a Grant" → `#grant-programs`,
  "Announcement Log" — no link). Renamed programs to **Core Projects Program** /
  **General Grant Program** with "We scoped it" / "You scoped it" kickers and new copy;
  per-program buttons (**Calls currently closed**, **Apply for a Grant** — no link,
  **See our Core Projects** → `/projects`). Reworked "How a grant runs" steps; made
  "What We Fund / Don't Fund" a subtle filler section.

---

## Decisions / conventions locked

- `/projects` on-page title = **"Open Mining Stack"**; header nav label = **"Mining Stack"**.
- Grants programs = **Core Projects Program** (foundation scopes) and **General Grant
  Program** (applicant scopes). No per-project amounts.
- Maintainers credited as **"Funded by 256 · Core Architect & Lead Maintainer"**; grantee
  status is deliberately not baked in.
- Full-bleed hero pattern (see CLAUDE.md "Current UI state"). Hero accent word is
  `text-[#c084d8]`.
- Logo `dark`/`light` naming = artwork for light/dark backgrounds respectively.
- Copy follows the private roadmap: no "passthrough", no per-person amounts, "Core
  Contributors".

---

## Open items / next steps

- **Grants "Apply for a Grant" buttons** (hero card and General Grant card) have **no
  link yet** — wire to the application form (Typeform / `NEXT_PUBLIC_TYPEFORM_URL`) when
  a cycle reopens.
- **Grants "Announcement Log"** hero card has no target — add a bottom-of-page
  announcement-log section and link it (`#announcement-log`).
- **Square / circular logo variants** in `Logo.tsx` still point at the old brand files;
  replace if new assets exist.
- `/projects` uses one hero image; no separate dev-kit photo asset.
- Home `ProjectsSection` heading still reads "The Open-Source Stack".
- `ARCHITECTURE.md` / `SPEC.md` remain intentionally stale (banner at top).

---

## Asset locations

- Brand logos: `public/logos/256-logo-{horizontal,secondary,vertical}-{dark,light}.png`
- Favicon: `app/icon.png`
- Hero art: `public/projects/open-mining-stack.webp`,
  `public/mission-background.webp`, `public/grants-hero-background.webp`
- Project marks: `public/projects/*`
