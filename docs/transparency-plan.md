# Transparency page plan (2026)

Branch: `feat/transparency-page` (fresh off `main`)

A plan for one dedicated `/transparency` page that gathers, in one place, everything
the 256 Foundation already makes public or gives on request, and for the
**transparency report** that lives alongside it. Written so it can be executed in
small, independently reviewable phases, each with its own verification.

Owner: Tyler. Status: **plan, nothing built yet.**

> Read [`CLAUDE.md`](../CLAUDE.md) first for how the codebase actually works.
> This file adds only the transparency workstream on top of the existing
> conventions (static-first, no new runtime deps, content in `data/`, no em
> dashes in rendered copy, no per-project grant amounts).

---

## 1. What this page is, and why

The page is not a new disclosure. Every item on it is either **already public**
(Secretary of State filings, the IRS determination letter, the Form 990 lookup,
the grants log, the policies) or **already obtainable on request**. Publishing
collects them and removes a step.

Two framing points that govern the copy:

1. It exists to remove a step, not to reveal anything new.
2. On money, the answer is the **Form 990 itself**. The page links a public EIN
   lookup rather than restating figures in prose, because a restated figure can
   drift from the filed one. Per-project grant amounts never appear anywhere
   public.

The **transparency report** is the narrative of what the Foundation and its
grantees did. It is *defined on this page* and is *distinct from the page itself*:
the page is the index of standing documents, the report is the periodic story.
The report is not done yet.

**Deliberately not on the page:** bylaws, financial statements, board meeting
minutes, the full policy set (only the key public ones below).

---

## 2. Inventory: already live vs. missing

### Already live, link and reuse

| Item | Where it lives today | How the page uses it |
|---|---|---|
| Mission | `/mission` hero H1 (`app/mission/page.tsx`) | Link it on its own, as canon says |
| Grants timeline | `/grants/announcements` funding log (`lib/grantLog.ts`, grant-announcement posts) | Link it. Already the historical record: project, program, term, dates, no amounts |
| EIN + 501(c)(3) status | `data/faq.ts` (99-1662333), `lib/agentSeo.ts` `organizationJsonLd` (`taxID`, `nonprofitStatus`) | Reuse the EIN from one source of truth |
| Tax-deductibility / IRS inspection note | `data/faq.ts` | Cross-link FAQ |
| Responsible-disclosure contact | `public/.well-known/security.txt` (currently `Policy:` points at `/faq`) | Repoint `Policy:` at the real policy, not the FAQ |
| OG-card pipeline | `scripts/generate-og.mjs`, `public/og/` | Generate `og-transparency.png` |
| Agent surfaces | `lib/agentSeo.ts` (`llms.txt`, `llms-full.txt`, breadcrumb JSON-LD) | Add the page |

### Missing, must be produced for this page

| Item | Canon position | Needed |
|---|---|---|
| `/transparency` page itself | The whole point | New route + content |
| Transparency report | "Not done" | A definition on the page, plus either a first edition or a clearly-marked "first edition forthcoming" slot |
| Articles of Incorporation | Not listed | Dropped from the page; filed with the TN Secretary of State (control no. 001512457) |
| IRS determination letter | Required on request | Link the IRS-hosted letter PDF (`apps.irs.gov/pub/epostcard/dl/FinalLetter_99-1662333_...pdf`) |
| Form 990 lookup | A public EIN lookup showing every 990 filed | External link, EIN 99-1662333 (ProPublica Nonprofit Explorer or IRS Tax Exempt Organization Search) |
| Six key public policies | Planned, not yet written; Outline has no Policies collection | Blank category until they exist (see §2a) |

### 2a. Canon sources (resolved)

The private [`256foundation/organization-spec`](https://github.com/256foundation/organization-spec)
repo is accessible via `gh`. It settles the unknowns:

- **The six policies are not published yet, so the page does not link them.**
  The org spec still records "no written organizational policies exist" and dates
  most drafts to Sep/Oct tasks; the last Outline export has no Policies collection.
  When they land they go in Outline under `docs.256foundation.org`. The six planned,
  in case the names return:
  - Conflicts of Interest, Privacy Policy, Responsible Disclosure, Code of Conduct,
    Whistleblower, Gift Acceptance and Restricted Funds
- **Outline is login-gated for anonymous visitors.** Even a known-good doc
  (`/doc/the-board-...`) bounces the public to a sign-in page, so any
  `docs.256foundation.org/doc/...` link is a login prompt, not a readable doc.
  Worth opening the policy collection to public sharing before linking it.
- **Filing state is Tennessee** (`finance/filings-and-compliance.md`). The IRS
  determination letter is *not yet recovered into the formation package*
  (tasks `#377`/`#442`), so the page links the IRS-hosted PDF. The Articles of
  Incorporation are filed with the TN Secretary of State (control no. 001512457)
  but are not listed on the page. The agency copies remain available on request.
- **Form 990 lookup:** ProPublica Nonprofit Explorer for EIN 99-1662333
  (`projects.propublica.org/nonprofits/organizations/991662333`). FY2024 filed;
  FY2025 extension approved, not yet filed.
- **The transparency report is actively drafted** by Tyler
  (`drafts/transparency-report-outline.md`, `drafts/transparency-report-2024-2026.md`
  in the spec repo): OpenSats-modeled fund statements, no individual donor or
  grantee ever named or amounted. On the page it is a **defined section with an
  empty/coming-soon state**.
- **EIN:** 99-1662333 (single source: `data/faq.ts` / `organizationJsonLd`).
- Security note: this repo's `.well-known/security.txt` `Policy:` currently points
  at `/faq`; it should point at the Responsible Disclosure policy.

---

## 3. Workstreams

Priorities: **P0** = do first. **P1** = needed to ship a complete page.
**P2** = polish.

### A. Content model + copy — P0

- New `data/transparency.ts`: typed lists for the on-page items (title, why,
  href, external flag) and the framing copy, so the page stays a data edit.
- Copy rules: no em dashes; no amounts; "already public or obtainable on
  request" framing; the Form 990-owns-the-number line; report defined on-page.
- Every item is one of the seven table rows in §2 "Already live" + the document
  and policy rows, nothing more.

### B. The `/transparency` route — P0

- `app/transparency/page.tsx`, static, following the `/faq` + `/our-work` shape:
  eyebrow hero, the items as a bordered grid/panel (the FAQ `<details>` pattern
  fits the "why" one-liners), a defined "Transparency report" section, and the
  shared `PageCTA`.
- `generatePageMetadata({ title: 'Transparency', …, ogImage: '/og/og-transparency.png' })`.
- `breadcrumbJsonLd([{ name: 'Transparency', path: '/transparency' }])`.

### C. Document + policy links — P1 (depends on decisions)

- IRS determination letter, Form 990 lookup wired as
  external links with a clear "public record" label.
- The six policies: each row points at wherever the policy lives (on-site page,
  hosted PDF, or external). If hosted on-site, decide one home (see decisions).

### D. Transparency report definition (+ optional first edition) — P1

- On-page definition of what the report is and its cadence, distinct from the
  page, per canon.
- If a first edition exists, render it (likely as a `foundation-news` newsroom
  post, which the funding log / Latest beat and the report section can link).
  Otherwise a clean "first edition forthcoming" state.

### E. Wire-up — P1

- `data/navigation.ts`: add **Transparency** to `footerResourcesLinks` (top nav
  is locked at six items; footer is the safe spot unless we choose otherwise).
- `app/sitemap.ts`: add `/transparency`.
- `lib/agentSeo.ts`: add the page to `buildLlmsTxt`, the relevant facts (EIN,
  determination letter, 990 lookup, policies, report) to `buildLlmsFullTxt`.
- `public/.well-known/security.txt`: repoint `Policy:` at the responsible
  disclosure policy.
- `scripts/generate-og.mjs`: add the transparency card + `npm run og`.

### F. Tests + verification — P1

- `tests/transparency.test.mjs`: footer link present, sitemap entry present,
  `/transparency` file exists, no em dashes, no per-project amounts, policies +
  documents all have hrefs, `security.txt` policy no longer points at `/faq`.
- Repo workflow per `CLAUDE.md`: `npm run lint` → `npm test` → kill dev → `npm run build`
  → browser check before commit.

### G. Docs — P2

- Move the relevant session/context notes into `docs/session-context.md`
  conventions once shipped.

### H. Cross-links from the rest of the site — P1

A page nobody can reach from the money and legal touchpoints is half-wired. Ranked
by how directly the surrounding copy already claims the public record; every row
below is **done** in this branch except the ad hoc newsroom asides.

| Where | The existing line that begs for it | Status |
|---|---|---|
| FAQ, "Are donations tax deductible?" | prints the Tax ID and points at the IRS | done (`related` link) |
| FAQ, "Are grant awards given in bitcoin or fiat?" | "annual tax disclosures are available for public inspection" | done (`related` link) |
| Footer brand column | "A 501(c)(3) nonprofit organization" | done (now a link) |
| Donate hero | "501(c)(3) nonprofit" and the money framing | done (`See the public record`) |
| Grants funding log | "Every grant we've funded", no amounts | done ("the Form 990 owns the figures") |
| FAQ, "What does the 256 Foundation do?" | prints the EIN | done (`related` link) |
| Mission, Principles | "Money from anyone, influence from no one" | done |
| Home, FundingBand | money beat | removed, read as clutter |
| Newsroom / grant posts | "how is this funded" asides | candidate, ad hoc |

Mechanism: FAQ answers are plain strings (JSON-LD reads them verbatim), so links
ride a new optional `FAQItem.related` field rendered under the answer rather than
markdown inside it. Everything else is a `TextLink` or `Link` in existing copy.
`tests/transparency.test.mjs` guards the footer and sitemap wires; the FAQ
`related` links are covered by the type and a manual check.

---

## 4. Resolved decisions

1. **One page, `/transparency`.** Policies and the report live *on this page* as
   sections; no separate `/policies/*` routes. Policy rows link the published
   Outline docs (single source of truth), the page carries the framing.
2. **Report:** a defined section, empty for now ("first edition in progress");
   Tyler is drafting it and will drop it in.
3. **Nav:** footer `Resources` only. Top nav stays locked at six items.
4. **Form 990:** ProPublica Nonprofit Explorer, EIN 99-1662333.
5. **Determination letter:** link the IRS-hosted determination letter PDF. The
   Articles of Incorporation are not listed. The agency copies are on request.
6. **No amount, no em dashes.** Restated nowhere; the Form 990 owns the numbers.

---

## 5. Out of scope (canon)

Bylaws, financial statements, board meeting minutes, the full policy set, and any
per-project grant amount. Nothing here restates a 990 figure in prose.
