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
| Articles of Incorporation | Already public at Secretary of State | Link the state record (state + entity search URL needed, see decisions) |
| IRS determination letter | Required on request | Link an IRS lookup, and/or host the letter PDF under `public/` |
| Form 990 lookup | A public EIN lookup showing every 990 filed | External link, EIN 99-1662333 (ProPublica Nonprofit Explorer or IRS Tax Exempt Organization Search) |
| Six key public policies | Adopted, canon lives in Outline | Link each from the page (see §2a) |

### 2a. Canon sources (resolved)

The private [`256foundation/organization-spec`](https://github.com/256foundation/organization-spec)
repo is accessible via `gh`. It settles the unknowns:

- **The six policies are adopted and published.** Canon is the Outline Policies
  collection at `docs.256foundation.org`; the page links each doc rather than
  duplicating it (so policy text stays single-source). Stable URLs:
  - Conflicts of Interest: `/doc/conflicts-of-interest-policy-gQ1dmH2N9B`
  - Privacy Policy: `/doc/privacy-policy-1IHWpfXC4v`
  - Responsible Disclosure: `/doc/responsible-disclosure-policy-PCfyFQb2N7`
  - Code of Conduct: `/doc/code-of-conduct-policy-SMD9JitR6V`
  - Whistleblower: `/doc/whistleblower-policy-i5kwa0Hibd`
  - Gift Acceptance and Restricted Funds: `/doc/gift-acceptance-and-restricted-funds-policy-JVf1JC73SN`
- **Filing state is Tennessee** (`finance/filings-and-compliance.md`). Articles of
  Incorporation and the IRS determination letter are *not yet recovered into the
  formation package* (tasks `#377`/`#442`), so the page links the public records
  (TN Secretary of State business search; ProPublica reproduces the determination
  record) and notes the originals are available on request.
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

- Articles of Incorporation, IRS determination letter, Form 990 lookup wired as
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
| Home, FundingBand | money beat | done |
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
5. **Articles + determination letter:** link the Tennessee Secretary of State
   business search for the Articles; link ProPublica for the determination
   record, with the originals noted as available on request until recovered.
   Host a letter PDF later if desired.
6. **No amount, no em dashes.** Restated nowhere; the Form 990 owns the numbers.

---

## 5. Out of scope (canon)

Bylaws, financial statements, board meeting minutes, the full policy set, and any
per-project grant amount. Nothing here restates a 990 figure in prose.
