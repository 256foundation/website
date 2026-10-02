# Session context / handoff

Full working context for the `/community`, `/our-work`, nav, and copy-polish rounds.
Written so a fresh session (or a different agent) can resume with zero chat history.
Read this together with [`docs/ui-work-log.md`](./ui-work-log.md) (the running UI log)
and the repo root [`CLAUDE.md`](../CLAUDE.md).

Last updated: 2026-10-02

---

## TL;DR current state

- **Open PRs on the current stack (merge in order):** [#32](https://github.com/256foundation/website/pull/32)
  (round 12 design-system pass) → [#33](https://github.com/256foundation/website/pull/33)
  (round 13 mission/footer) → [#34](https://github.com/256foundation/website/pull/34)
  (round 14 home overhaul). All target `main` and are stacked.
- Earlier merged: #20, #21, #24, #25, #26, #27, #28, #30, #31. Rounds 3 and 4 had no PR.
- Branch stack: `ui/edits-round12 → ui/edits-round13 → ui/edits-round14`. Branch the next
  round off the top of the stack while PRs are open.
- Dev server: `npm run dev` → http://localhost:3000.

---

## What this round set out to do

1. Consolidate the old **Ecosystem** and **Community** nav dropdowns into a single
   polished `/community` page.
2. Add a light, real-but-first-pass `/our-work` page.
3. Move the supporter/backer showcase and hashrate leaderboard off the home page to
   `/donate`.
4. Sweep retired canon vocabulary site-wide.
5. Iterate on `/community` and `/our-work` copy/design from in-app browser annotations.

All five are complete and merged.

---

## Canonical structure (locked)

- **Top nav, in order:** `Mission · Our Work · Mining Stack · Grants · Community · Newsroom`
  (no dropdowns). Defined in `data/navigation.ts`.
- **Footer:** same primary order, then `Donate · Telehash · FAQ`. Footer "Mining Stack"
  label (not "Open Mining Stack").
- `/telehash` stays a live route but is out of the nav; it is featured on `/community`
  with a link.
- `/community` composition:
  - hero photo carousel (single primary CTA "Join the forum →", plus "Dive into the code →" GitHub CTA)
  - Connect — six channel cards
  - Community projects — community-directed (OSMU, Hashrate Heatpunks) vs. projects we
    serve (Bitaxe, Jua Kali, ASIC-rs, HashScope; all link out)
  - featured Telehash block → `/telehash`
  - Listen and learn — live Substack + POD256 cards + `NewsletterSignup`
  - Get involved — Conversation + Code/GitHub blocks
- `/our-work` — eight light sections following the agreed outline (thesis, status quo,
  vision, proof of work, how we work → `/grants`, programs, close). Copy is explicitly a
  first pass; programs use a numbered list so five items never leave an orphan row.

---

## Key files

| Area | File |
|------|------|
| Community page | `app/community/page.tsx` |
| Community carousel | `components/community/CommunityHeroCarousel.tsx` |
| Community projects | `components/community/CommunityProjects.tsx` |
| Telehash feature block | `components/community/TelehashFeature.tsx` |
| Community data (channels, projects, hero photos, close blocks) | `data/community.ts` |
| Nav + footer | `data/navigation.ts` |
| Our Work page | `app/our-work/page.tsx` + `data/ourWork.ts` |
| Donate (now hosts supporters) | `app/donate/page.tsx` |
| UI work log | `docs/ui-work-log.md` |
| Community tests | `tests/community.test.mjs` |

---

## Decisions / conventions locked

- `/projects` on-page title = **"Open Mining Stack"**; nav/footer label = **"Mining Stack"**.
- Grants programs (exact names): `Core Projects Program` (foundation scopes) and
  `General Grant Program` (applicant scopes). Also `Red Team Program`,
  `Working Group Program`, `Community Program`. No per-project amounts.
- **Grant-announcement copy rules:** no "cycle" / "wave" / "round"; no "pillar" /
  "maintainer retainer" / "adoption phase"; no retired program names; **no em dashes**.
- Retired vocabulary replaced site-wide (`pillar projects` → `core projects`,
  "under our umbrella" → "we serve", etc.); `tests/community.test.mjs` guards it.
- Telehash happens **a few times a year** (not annually/semi-annually). Use the real
  first block height **881423**.
- Hero accent word is `text-[#c084d8]`. Full-bleed hero pattern per `CLAUDE.md` →
  "Current UI state".
- Logo `dark`/`light` naming = artwork for light/dark backgrounds respectively.
- Home page overhauled in round 14: the 8-beat page (thesis hero → problem → stack → proof
  → funding band → community → latest → shared closer). Section components live in
  `components/home/`. The closer keeps `id="contact"` so old `/#contact` links still land.

---

## Carousel behavior

Crossfade (~6s), hover-pause, reduced-motion static, swipe on touch, subtle arrows
flanking centered dots, manual nav resets the autoplay timer. Photos are real community
shots in `public/community/hero-0*.webp` (1920px WebP), listed in `communityHeroPhotos`
in `data/community.ts` — add or reorder there.

---

## Assets

- Community hero carousel: `public/community/hero-0*.webp`
- Our Work hero: `public/our-work-hero.webp` (from supplied `our-work-hero.jpg`,
  converted to 1920px WebP)
- Other hero art: `public/projects/open-mining-stack.webp`,
  `public/mission-hero.webp`, `public/grants-hero-background.webp`, `public/home-hero.webp`
- Brand logos: `public/logos/256-logo-{horizontal,secondary,vertical}-{dark,light}.png`

Image workflow used this round: `sharp` resize to max width 1920, `webp({quality: 82,
effort: 6})`, then wire into the page. Convert staged JPEGs and delete the source.

---

## Working workflow (per edit)

1. Make the edit.
2. `npm run lint` (expect 0 errors, a few `<img>` warnings) and `npm test` (expect all pass).
3. Kill the dev server (`pkill -f "next dev"; pkill -f "next-server"`) — a concurrent
   `next build` conflicts on `.next`.
4. `npm run build` — must stay green.
5. Commit, push, restart dev (`npm run dev > /tmp/256dev.log 2>&1 &`).

Verify visual changes in the in-app browser before committing. Pages use `<>` fragments;
the root layout provides `<main>`, so avoid accidental `main > main`.

---

## Open items / next steps

- **Home page asset gap** — the Development Kit hero is a square `public/home-hero.webp`
  (`devkit_hero.jpeg` converted); a landscape crop would tighten the desktop hero. Everything
  else on home is shipped.
- **`/our-work` copy** is a first pass — dial in copy and art later.
- **Grants "Apply for a Grant" button** links the Typeform form
  (`https://form.typeform.com/to/oqyJAntF`, new tab). Core Projects "Calls currently
  closed" stays inert until its window reopens.
- **Libre Board announcement pre-publish checklist:** (1) Schnitzel's consent to be named
  and linked as maintainer; (2) verify "revision three" against the actual repo state.
- **Square / circular logo variants** in `Logo.tsx` still point at old brand files.
- `ARCHITECTURE.md` / `SPEC.md` are intentionally stale (banner at top).
- **Next round should branch off the top of the branch stack** (`ui/edits-round14` while the
  PRs are open) so it does not miss the in-flight rounds.

---

## PR history referenced

- #20 Open Mining Stack `/projects` collapse — merged
- #21 Rebrand logo system, nav reorder, full-bleed stack hero — merged
- #23 Community page (superseded by #24) — closed
- #24 Community page, Our Work stub, nav consolidation, copy polish — merged
- #25 Our Work hero photo — merged
