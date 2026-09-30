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

### Round 4 — `ui/edits-round4` (no PR) — funding announcements log
- **Newsroom taxonomy replaced:** the six old categories (`announcement`, `mission`,
  `industry`, `partner`, `grant`, `manifesto` — five unused) → five new ones:
  `perspective`, `foundation-news`, `project-update`, `highlight`, `grant-announcement`.
  Existing posts remapped (Presidio → Perspective; HRF + MARA → Foundation News; RY3T
  Nova → Highlight). `category` is now validated in `toPost`, not cast.
- **Grants bottom section:** "Stay Informed" replaced by a **Funding announcements** log
  (`components/grants/FundingAnnouncements.tsx` + `GrantAnnouncementCard.tsx`), derived
  from `getGrantAnnouncements()` (newsroom posts tagged `grant-announcement`, newest
  first, max 6 + "View all →"). Hero card relabeled "Funding announcements" and now links
  `#funding-announcements`. The newsletter / POD256 / social links left `/grants`.
- **New route:** `/grants/announcements` — "All funding announcements" archive, back
  link to `/grants#funding-announcements`.
- **First article:** `content/newsroom/libre-board-funding.mdx` (Libre Board, `program:
  core`, `term: Four months, September to December`, cover `public/newsroom/libre-board-funding/cover.jpeg`).
- **Copy rules in force for this feature:** no "cycle" / "wave" / "round"; no amounts;
  no "pillar" / "maintainer retainer" / "adoption phase" / retired program names; no em
  dashes (also scrubbed from pre-existing grants-page copy). Tests in
  `tests/grant-announcements.test.mjs` enforce these.
- **Bug fix:** `/newsroom` and the home "Updates" column listed posts featured-first
  because both used `getAllPosts()`. Added `getAllPostsByDate()` and pointed both at it,
  so `featured` no longer reorders either feed. Home and the index now run strict
  newest-first. `featured` remains for the (currently unused) `getLatestPost()` slot.
- **Newsroom category filters:** `components/newsroom/NewsroomIndex.tsx` (client) adds
  an All + per-category chip bar with live counts; only populated categories get a chip.
  Split the pure helpers (`NEWSROOM_CATEGORIES`, `categoryLabel`, `formatPostDate`) into
  client-safe `lib/newsroomMeta.ts` (no `fs`), re-exported by `lib/newsroom.ts`, because
  a client component importing the `fs`-using module failed the webpack build.

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
- **Newsroom categories** (5): Perspective, Foundation News, Project Update, Highlight,
  Grant Announcement. Display names live in `categoryLabel()` in `lib/newsroom.ts`.
  Only `grant-announcement` feeds the grants log; grants *received* (HRF, MARA) are
  Foundation News. Third-party grant amounts may stay in titles (MARA is exempt); the
  log itself never shows an amount.
- **Grant-announcement copy rules:** no "cycle" / "wave" / "round"; no "pillar" /
  "maintainer retainer" / "adoption phase"; no retired program names; no em dashes.
  Funded work, not the project's achievements, is what the Foundation claims.

---

## Open items / next steps

- **Grants "Apply for a Grant" button** (General Grant card) now links to the Typeform
  application form (`https://form.typeform.com/to/oqyJAntF`, new tab). Core Projects
  "Calls currently closed" stays inert until its window reopens. The hero "Apply for a
  Grant" card still jumps to `#grant-programs` (both programs).
- **Libre Board announcement pre-publish checklist** (from the canon review, not yet
  confirmed): (1) Schnitzel's consent to being named and linked as maintainer; (2) verify
  "revision three" against the actual project state before publishing — never publish a
  revision number the repo does not support.
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
