# UI work log

Running log of website UI revision rounds, decisions, and open follow-ups. **Read this
first in a fresh session** so nothing lives only in chat history. For the fuller
round-5 pickup context, see [`docs/session-context.md`](./session-context.md).

Last updated: 2026-10-02

---

## Branch / PR status

| Branch | PR | Contents | State |
|--------|----|----------|-------|
| `ui/website-changes` | [#20](https://github.com/256foundation/website/pull/20) | Open Mining Stack: collapse `/projects` + 4 deep pages into one page; 308-redirect retired slugs; remove nav dropdown, Grant Log, ecosystem grid | open |
| `ui/edits-round2` | [#21](https://github.com/256foundation/website/pull/21) | Logo rebrand + invisible-logo fix; nav reorder; full-bleed stack hero | open (branched off `ui/website-changes`) |
| `ui/edits-round3` | — | Mission + Grants refresh; grants program copy/buttons; funding announcements log (round 4) | no PR yet (branched off `ui/edits-round2`) |
| `ui/edits-round5` | [#24](https://github.com/256foundation/website/pull/24) → [#25](https://github.com/256foundation/website/pull/25) | Community page; Our Work stub; nav consolidation; supporters → Donate; canon sweep; Our Work hero photo | both merged; no open PRs |
| `ui/edits-round6` | [#26](https://github.com/256foundation/website/pull/26) | Footer restructure: supplemental pages get a dedicated Resources column; Donate CTA; social icons removed as redundant | merged |
| `ui/edits-round7` | [#27](https://github.com/256foundation/website/pull/27) | Libre Board article: reactivation framing + funding CTA; footer "Grant announcements" label | merged |
| `ui/edits-round8` | [#28](https://github.com/256foundation/website/pull/28) | Footer Contact button beside Donate | merged |
| `ui/edits-round9` | [#29](https://github.com/256foundation/website/pull/29) | Contact form: label "Name / Nym", message placeholder "What's up?" | closed |
| `ui/edits-round10` | [#30](https://github.com/256foundation/website/pull/30) | Dedicated `/contact` page + site-wide contextual contact links | merged |
| `ui/edits-round11` | [#31](https://github.com/256foundation/website/pull/31) | `/donate` + `/telehash` relayout, neutral code style, FAQ hero CTA, footer cleanup | merged |
| `ui/edits-round12` | [#32](https://github.com/256foundation/website/pull/32) | Design-system continuity pass: shared Eyebrow / TextLink / Panel, on-dark buttons, one PageCTA, surface + spacing tokens, badge routing, green → status-only | merged |
| `ui/edits-round13` | [#33](https://github.com/256foundation/website/pull/33) | Mission narrative rework (photo hero, numbered story beats, large two-point vision), shared `HeroScrim` across main-page heroes, footer logo matches header, Elsewhere link reorder | merged |
| `ui/edits-round14` | [#34](https://github.com/256foundation/website/pull/34) | Homepage overhaul: 8-beat rebuild (thesis hero, problem, stack, proof, funding band, community, latest, shared closer); `Reveal` + scroll-progress client utilities; dead home components pruned | merged |
| `ui/edits-round14` (docs) | [#35](https://github.com/256foundation/website/pull/35) | Docs sync for round 14 (CLAUDE/README/session-context/ARCHITECTURE) | merged |
| `ui/edits-round15` | — | Home polish: clean favicon from the header `secondary` mark (theme-aware `app/icon.svg`, `app/favicon.ico` + `app/apple-icon.png` fallbacks, replaces off-brand `app/icon.png`); dedicated home Community photo (`public/home-community.webp`, conference panel) instead of reusing a `/community` carousel shot; home CTA consistency (Latest beat's "All updates →" now the shared outlined `Button` like every other main-page link) | [#36](https://github.com/256foundation/website/pull/36) |
| `chore/housekeeping` | [#37](https://github.com/256foundation/website/pull/37) | Repo hygiene: prune merged branches, drop unused assets, move the Discourse prompt into `docs/`, non-breaking `npm audit fix` | merged |
| `chore/image-weight` | [#38](https://github.com/256foundation/website/pull/38) | Cut shipped raster weight ~13MB → ~1.5MB: convert oversized project/ecosystem/supporter art to right-sized WebP (`scripts/optimize-art.mjs`), re-encode logos + OG to compressed palette PNG | merged |
| `chore/perf-pass` | [#39](https://github.com/256foundation/website/pull/39) | Round 2 of image/perf: re-run newsroom optimizer, convert telehash photos to WebP, and mount only 3 frames in the `/community` hero carousel instead of all 8 | merged |
| `chore/img-nextimage` | [#40](https://github.com/256foundation/website/pull/40) | Convert the last 5 raw `<img>` tags to `next/image` (lint now clean), tighten newsroom optimizer to 1440px/q78, align `deviceSizes` to 1440 | merged |
| `ui/our-work-hero-break` | [#41](https://github.com/256foundation/website/pull/41) | Hero-heading consistency: purple accent word(s) on the home, mission, grants, community and our-work heroes, "open-source"/"mining stack" broken to their own line where noted, trailing periods removed from all main-page hero headers; grants hero CTAs switched to the shared Button pair; our-work Vision relabeled "The Future" with a new lead line and program copy refreshed; community "Listen and Learn" shows newsroom + newsletter + podcast with the newsroom piece first, and project cards keep "Visit →" visible, with a Donate → button into each community fund (OSMU, Hashrate Heatpunks); community carousel opens on the developer-call shot; every page's closing PageCTA now defaults to centered so pages all end on the same note. **Plus:** regenerated OpenGraph share cards — one branded home card and a dedicated card per footer Foundation + Resources page (`scripts/generate-og.mjs` → `public/og/og-*.png`, brand TTFs in `assets/fonts/`), wired through `ogImage` in each page's metadata; newsroom posts still use their own featured image | PR opens now |

Merge order for the earlier stack was #20 → #21 → `ui/edits-round3`; all three are merged, so `ui/edits-round5` now bases on `main`.

Dev server: `npm run dev` → http://localhost:3000. `npm run build` + `npm run lint` +
`npm test` must stay green (lint has a few pre-existing `<img>` warnings, 0 errors).

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

### Round 5 — `ui/edits-round5` (PR #24) — Community page + Our Work stub
- **Nav consolidated:** both Ecosystem and Community dropdowns removed (they were all
  external links except Telehash). `topNav` = Mission · Our Work · Mining Stack · Grants ·
  Newsroom · Community. Footer adds Our Work + Community; `/telehash` stays a live route
  but out of nav.
- **New `/community`:** one narrative — full-bleed **photo carousel** hero
  (`CommunityHeroCarousel`, crossfade, dots, pause-on-hover, reduced-motion static;
  photos seeded from `public/community/hero-0*.jpg`), Connect (six channel cards),
  Community projects (community-directed OSMU + Heatpunks with fund line → `/our-work`;
  ecosystem projects we serve: Bitaxe, Jua Kali, ASIC-rs, HashScope), a featured **Telehash**
  block linking `/telehash`, Listen and learn (live Substack + POD256 cards +
  `NewsletterSignup`), Get involved (Conversation + Code/GitHub blocks). One CTA: Join the forum.
- **New `/our-work` stub** (real but light, all 8 outline sections): thesis, status quo,
  vision, proof of work, how we work → `/grants`, programs (Red Team, Working Group,
  Stewardship, Community, Education), close. Added to nav, footer, sitemap. Copy is
  first-pass; claim discipline applies.
- **Supporters moved:** `SupporterShowcase` (logo tiers + live HashrateLeaderboard) off
  the home page, onto `/donate`. Home keeps its other sections for now (overhaul later).
- **Site-wide canon sweep:** `pillar projects` → `core projects`; FAQ "Core Pillar Grant
  vs Open Grant" → "Core Projects Program vs General Grant Program"; ApplySection →
  "General Grant Program / Fund Your Open-Source Mining Project"; home ProjectsSection
  heading → "The Open Mining Stack"; EcosystemSection "under our umbrella" → "we serve";
  `data/telehash.ts` scrub. Tests: `tests/community.test.mjs`.

### Round 6 — `ui/edits-round6` (PR #26, merged) — footer restructure
- **Supplemental pages separated.** `/donate`, `/telehash`, `/faq` were tacked onto
  the end of the Foundation column with no distinction. Added a dedicated, visually
  secondary **Resources** column (outlined section marker) and moved them there; also
  added the previously missing `/grants/announcements` archive as "Funding announcements".
- **Donate promoted** to a standalone filled button under the logo/tagline in the footer's
  brand column (Donate stays out of the link lists).
- **Social icon row removed** from the brand column — X, GitHub, Group Chat, and Nostr
  were fully duplicated by the external link column.
- **External column renamed "Community" → "Elsewhere"** so it clearly reads as the
  off-site list, distinct from the on-site `/community` page link.
- Footer grid: brand column plus a nested equal-width three-up subgrid for the link
  columns, so the column gap is consistent (`grid-cols-2 sm:grid-cols-3` on small,
  brand `col-span-4` / links `col-span-8` on `lg`). The long "Funding announcements"
  label is shortened to "Grant announcements" in the footer so no one column's text
  runs close to the next and the visual gaps stay even.

### Round 7 — `ui/edits-round7` (PR #27, merged) — Libre Board post
- **Libre Board announcement** (`content/newsroom/libre-board-funding.mdx`): reframed as
  additional funding that **reactivates the existing 12-month 2026 term**, not a new term.
  Retitled the post, SEO title, excerpt, opening, and the "What the Funding Covers" lead;
  grants-log `term` label → "2026 term, reactivated September". No budget/agreement detail.
- **"Keep It Running" CTA** added: continuous (one-time, repeated) donations keep grants on
  schedule; larger/longer commitments give grantees an uninterrupted term and stability.
  Deliberately not called "recurring" — no subscription infrastructure exists (Zaprite /
  on-chain / Lightning are all one-time).
- **Test parser fix:** the grant-announcements frontmatter `field()` helper stopped at an
  apostrophe in a quoted value, silently failing the title check; now handles quoted values.
- **Footer:** Resources link relabeled "Grant announcements".

### Round 8 — `ui/edits-round8` (merged) — footer Contact button
- Added a secondary **Contact** button beside the Donate CTA in the footer
  brand column, matching the header's Contact treatment.

### Round 9 — `ui/edits-round9` (PR #29) — contact form copy
- Contact form (`components/home/ContactForm.tsx`): name label "Name / Alias" →
  **"Name / Nym"**, message placeholder "How can we help?" → **"What's up?"**.

### Round 10 — `ui/edits-round10` — dedicated `/contact` page
- New **`/contact`** page (`app/contact/page.tsx`): the shared `ContactForm` plus the general
  email **contact@256foundation.org**. Added to the sitemap and to footer Resources.
- The general email is also shown in the footer brand column, under the 501(c)(3) line.
- **Relinked `/ #contact` → `/contact`** in the header, footer, mobile nav, and the Libre
  Board article. The home page keeps its own `id="contact"` section and full form (per
  decision), so existing `/#contact` links still land.
- **Contextual get-in-touch links** added site-wide so every page offers both a donate and
  a contact path: secondary Contact buttons on `/our-work`, `/projects`, `/community`,
  `/telehash`, and newsroom articles; a shared contextual `PageCTA` closer on `/mission`,
  `/faq`, `/newsroom`, `/grants`, `/grants/announcements`, and `/donate`.
- **Our Work close:** the Linux Foundation line breaks onto its own line, and the primary
  button is relabeled **"Support with a Donation →"**.
- **Community close:** added a PageCTA after Get Involved (Donate + Get in touch); it had none.

### Round 11 — `ui/edits-round11` — `/donate` relayout
- **Hero compacted** (`tight`) into two columns: short "Fund the open-source mining stack."
  copy on the left, and a **"Give in seconds"** action box on the right with the Zaprite
  button and Card / On-chain / Lightning chips — so the primary action is above the fold.
- **501(c)(3) note moved low**, to a single compact line after the hashrate section, instead
  of its own full-height band near the top.
- Renamed "Donate with Money" → folded into the hero; direct-address section trimmed to one line.
- **Hashrate copy trimmed** to one paragraph.
- **Code blocks rethemed** from dark purple + neon green to neutral `gray-100 dark:#1f1f1f`
  with gray text; `CopyButton` rethemed from green to gray/purple.
- Shared **`ZAPRITE_URL`** constant added to `data/donate.ts`; `/donate` and the home
  `DonateCards` now read it (removes the hardcoded/`#`-fallback mismatch).
- **Telehash page** retheme: participation code blocks no longer dark purple + neon green
  (now neutral gray), the "In Person" / "Block Found!" green badges use the brand purple,
  and step cards/pool-URL chip resized so the URL stays on one line.
- **Telehash hero** is now two columns with the event status on the right: the no-event flag
  moved out of its own section, the countdown / next-event details live in the hero too, and
  a **View Events Calendar** link sits in the hero. The standalone countdown section is gone.
- The telehash hero event status is a **full-height panel** (anchored header, centered message,
  bottom "View Events Calendar" bar) rather than a floating box, so it fills the hero cleanly.
- **FAQ hero** now has a right-side "General Questions" panel with **Get in touch** (/contact)
  and **Visit the Forum** links, mirroring the telehash panel treatment.

### Round 12 — `ui/edits-round12` — design-system continuity pass
Full audit first (heroes, closers, buttons, kickers, surfaces, badges, accents), then a
token/component consolidation. Layouts kept; only tokens and shared primitives changed.

New primitives: `components/ui/Eyebrow.tsx` (single kicker), `components/ui/TextLink.tsx`
(single inline `→` link), `components/ui/Panel.tsx` (the hero header/body/footer box).
New tokens: `lib/tokens.ts` — three surfaces (`default`, `raised`, `tinted`).

- **Kickers unified** to `<Eyebrow>` everywhere: replaced `SectionHeader`'s inline label, the
  local `SectionKicker` helpers in `/mission` and `/our-work`, and all inline kickers. One
  size, tracking, and bar width.
- **Buttons**: added `onDark` / `onDarkOutlined` variants and replaced ~15 hardcoded CTA
  links, fixing the low-contrast outlined button on the photo heroes.
- **Closers**: one `PageCTA` with `align="center"`, `extra`, and `footnote`; `/our-work` and
  `/projects` bespoke closers now use it.
- **Panel**: `/donate`, `/telehash`, and `/faq` heroes now render the shared `<Panel>`.
- **Badges**: `Badge` gained `online`, `in-person`, `block-found`, `closed`; telehash event
  pills, the Block Found badge, and grants' "Calls currently closed" route through it.
- **Surfaces**: dark card values collapsed (`#242424`/`#0a0a0a`/`#13091a` → `#1a1a1a`, tinted
  → `#1e1028`); `Card` now carries the surface tokens.
- **Spacing**: `SectionWrapper` gained a named `size` scale (`hero`/`default`/`tight`/`compact`)
  so heroes no longer jump between rhythms.
- **Accent rule**: purple is the brand accent; green `#00FF41` is reserved for live/active/
  hashrate (live dots, `HashrateLeaderboard`, `Badge active`, `BlocksFound`). Everything else
  that was green (hero chips, hardware tags, grant arrows, success states, banner tag,
  newsletter) is purple.

### Round 13 — `ui/edits-round13` (PR #33) — mission narrative

- `/mission` hero photo band, narrative recast as four numbered story beats, vision recast
  as two large display statements.
- Shared `HeroScrim` extracted and applied to the mission/our-work/grants/projects/community
  heroes. Footer logo switched to the `secondary` variant to match the header; Elsewhere
  reordered (GitHub, Forum, Group Chat, Events Calendar, Hashdash, POD256, Newsletter,
  X / Twitter, Nostr).

### Round 14 — `ui/edits-round14` — homepage overhaul

Rebuilt the home from the 8-beat outline. The page is now: thesis hero → the problem →
the stack → the proof → funding band → community → latest → shared closer. Copy answers
why/who; destination pages answer how.

- **Hero:** the thesis is the H1 ("Bitcoin mining will be open-source, or Bitcoin remains
  permissioned."). Full-bleed Development Kit shot (`public/home-hero.webp`, mirrored so
  the hardware sits right), static PCB texture, no rotating tagline, header logo only,
  scroll cue. Two CTAs: See our work / Fund the work.
- **Problem:** two centered statements, link to `/mission`.
- **Stack:** four layer cards → `/projects#slug`, "Together, the four form the Development
  Kit." → `/projects`. (`StackSection` replaces `ProjectsSection` on home.)
- **Proof:** giant `881423` + block copy beside the existing block-find video → `/our-work`.
- **Funding:** compact tinted band + grants CTA (no full screen).
- **Community:** full-bleed photo + live forum and GitHub strips (folded in here) → `/community`.
- **Latest:** one live card each from the newsroom, POD256, and Substack → `/newsroom`.
- **Closer:** shared `PageCTA`, centered. Keeps `id="contact"` so old `/#contact` links land.
- **New client utilities:** `components/ui/Reveal.tsx` (one-time fade, readable with motion
  off), `components/layout/ScrollProgress.tsx` (purple line in the header, no easing under
  reduced motion), `lib/useReducedMotion.ts`.
- **Removed from home:** contact form section, mission essay, ecosystem essays, supporters
  wall, FAQ, hashrate leaderboard, duplicate project essays. Ten now-dead `components/home`
  files deleted (`HeroSection`, `WhySection`, `BlocksFound`, `StayUpdated`, `ApplySection`,
  `DonateCards`, `EcosystemSection`, `FAQSection`, `ProjectsSection`, `RotatingTagline`;
  `HashrateLeaderboard` stays for `/donate`).
- **Copy:** zero em dashes, ban-list clean (no "cycle"/"pillar"/amounts). Page is ~5.9
  desktop screens.

### Round 15 — `ui/edits-round15` — home polish (favicon + community photo)

Replaced the off-brand favicon (a purple "256" cropped from the `horizontal` wordmark) with
the **`secondary` mark** the header actually uses.

- **`app/icon.svg`** is the primary: the black mark in light mode, white in dark mode via a
  `prefers-color-scheme` media query (two inline PNGs). Renders crisp at any tab size.
- **`app/favicon.ico`** (16/32/48) and **`app/apple-icon.png`** (180, dark brand tile) are
  fallbacks for clients without SVG favicon support.
- The mark is tightly trimmed, centered, ~90% frame width. No stray whitespace.

Gave the home Community beat its own photo instead of reusing `/community/hero-01.webp`:

- Cropped the supplied conference-panel shot to a 2048x820 (~2.5:1) band (ceiling and stage
  floor removed, four panelists framed with headroom), exported to `public/home-community.webp`
  at quality 82.
- Wide band, so desktop shows all four while the left copy sits on the dark side of
  `HeroScrim`. The speaker is dead-center, so narrow/mobile `object-cover` crops to a clean
  portrait of him instead of slicing someone in half. Looks intentional at any aspect ratio.

CTA consistency pass on home: the mission, our-work, mining-stack and grants links were
already boxed buttons, but the Latest beat's "All updates →" was a bare text link. It now uses
the same `Button variant="outlined" size="sm"`, so every in-content link to a main page on the
home page is the same control (photo overlays stay `onDark`).

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
- **Design-system primitives (round 12):** use `<Eyebrow>` for every kicker, `<TextLink>` for
  inline `→` links, `<Panel>` for boxed hero actions, and `<Card>` / `lib/tokens.ts` surfaces
  for cards. Do not hand-roll these again. Accent rule: purple brand; green `#00FF41` only for
  live/active/hashrate.

---

## Open items / next steps

- **Grants "Apply for a Grant" button** (General Grant card) now links to the Typeform
  application form (`https://form.typeform.com/to/oqyJAntF`, new tab). Core Projects
  "Calls currently closed" stays inert until its window reopens. The hero "Apply for a
  Grant" card still jumps to `#grant-programs` (both programs).
- **Community hero photos** — real community shots in `public/community/hero-0*.webp`
  (1920px WebP, EXIF-rotated), listed in `communityHeroPhotos` in `data/community.ts`;
  add or reorder there.
- **`/our-work` copy is a first pass** — every outline section is present but light;
  dial in copy and art later. Hero art is `public/our-work-hero.webp`.
- **Libre Board announcement pre-publish checklist** (from the canon review, not yet
  confirmed): (1) Schnitzel's consent to being named and linked as maintainer; (2) verify
  "revision three" against the actual project state before publishing — never publish a
  revision number the repo does not support.
- **Square / circular logo variants** in `Logo.tsx` still point at the old brand files;
  replace if new assets exist.
- Home page overhauled in round 14 (8-beat rebuild). Remaining home asset gap: a landscape
  crop of the Development Kit hero; the current square `public/home-hero.webp` works with
  the scrim.
- `ARCHITECTURE.md` / `SPEC.md` remain intentionally stale (banner at top).

---

## Asset locations

- Brand logos: `public/logos/256-logo-{horizontal,secondary,vertical}-{dark,light}.png`
- Favicon: `app/icon.svg` (theme-aware), `app/favicon.ico`, `app/apple-icon.png`
  (built from `public/logos/256-logo-secondary-{dark,light}.png`)
- Hero art: `public/projects/open-mining-stack.webp`,
  `public/mission-hero.webp`, `public/grants-hero-background.webp`,
  `public/our-work-hero.webp`, `public/home-hero.webp`, `public/home-community.webp`
- Community hero carousel: `public/community/hero-0*.webp`
- Project marks: `public/projects/*`
- OpenGraph cards: `public/og/og-*.png`, regenerated with `npm run og`
  (`scripts/generate-og.mjs`; brand TTFs live in `assets/fonts/` and the script
  mirrors them into `~/Library/Fonts` so librsvg can render the card text)
