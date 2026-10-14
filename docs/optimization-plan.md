# Site optimization plan (2026)

Branch: `perf/optimization-2026`

A working plan to make 256foundation.org faster to load, better indexed, easier
for AI agents to consume, and hardened against the defaults that most static
sites ship with. Written to be executed in small, independently reviewable
phases, each with its own verification.

Owner: Tyler. Status: P0–P1 landed on this branch (see `docs/ui-work-log.md` →
Round 18); remaining P2: enforce the CSP (currently report-only), full a11y audit,
www→apex canonicalization at the proxy. Shipped `public/` bytes are now ~6.1 MB
(OG cards palette-quantized), ahead of the <6.5 MB target.

> Read [`CLAUDE.md`](../CLAUDE.md) first for how the codebase actually works.
> This file adds only the optimization workstream on top of the existing
> conventions (static-first, no new runtime deps unless noted, copy rules, no
> em dashes in rendered copy).

---

## 1. Why this branch exists

The site is already well built: static-first (SSG + hourly ISR), a small JS
payload (`~103 kB` shared), images pre-optimized to WebP with an
AVIF/WebP `next/image` pipeline, a full metadata/sitemap/robots layer, and an
agent surface (`/llms.txt`, `/llms-full.txt`, per-post markdown, JSON-LD,
RSS). The remaining wins are the ones nobody sees until they are missing:
response caching, security headers, structured-data depth, delivery-level
compression, and quality gates. Those are what this branch targets.

## 2. Baseline (measured 2026-10-14, `npm run build`)

| Metric | Value |
|---|---|
| Build | green, 43 routes prerendered |
| First Load JS (shared) | 103 kB |
| Largest route JS | `/telehash`, `/donate` ~115 kB |
| `public/` on disk | 8.2 MB |
| Largest public asset | `community/hero-07.webp` 496 kB |
| Runtime deps | `next`, `react`, `react-dom`, `sharp`, `gray-matter`, `next-mdx-remote`, `fast-xml-parser` |
| Node | 20 LTS+; container runs Node 22 |
| Hosting | self-hosted Docker (standalone) via GitHub Actions; not Vercel |

Targets after this plan:

- **LCP** < 2.0 s (mobile, throttled), **CLS** < 0.05, **INP** < 150 ms on all
  template pages.
- **Lighthouse** >= 98 Performance, 100 Best Practices, 100 SEO on home,
  mission, projects, newsroom index, and a post.
- **Public asset bytes** < 6.5 MB down from 8.2 MB (no visual change).
- Zero new runtime dependencies.

---

## 3. Workstreams

Priorities: **P0** = do first (safe, high impact, no design risk). **P1** =
high impact, small surface change. **P2** = polish / nice to have.

### A. Delivery, caching, and response headers — P0

This is the single highest-leverage change. Today `next.config.ts` sets no
`headers()`, so:

- everything under `public/` (heroes, logos, OG cards, fonts) is served by
  Next with `Cache-Control: public, max-age=0`, meaning a revalidation request
  on every navigation for assets that never change;
- there are no security headers (HSTS, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, CSP);
- there is no cache directive policy for the hashed `/_next/static` assets
  beyond Next's default.

**Changes**

1. Add `async headers()` to `next.config.ts`:
   - `/:all*(webp|avif|png|jpg|jpeg|svg|ico|woff2)` →
     `Cache-Control: public, max-age=31536000, immutable` (files are
     content-stable; add a cache-bust query on the rare in-place change).
   - `/og/:path*` and `/logos/:path*` same year-long immutable.
   - `/_next/static/:path*` → `public, max-age=31536000, immutable` (matches
     the hashed filenames Next already produces).
   - HTML routes (`/`, `/mission`, ...) → `public, max-age=0,
     must-revalidate` so ISR keeps working exactly as it does now.
2. Add baseline security headers to the same `headers()`:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-Frame-Options: SAMEORIGIN`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - `Cross-Origin-Opener-Policy: same-origin`
3. Set `compress: true` explicitly (Next default) and document that the
   reverse proxy in front of the container must enable **brotli** and
   **HTTP/2+HTTP/3**; if the proxy is nginx, add `brotli on;` and
   `listen 443 ssl http2;`/`http3`. Record the proxy recipe in `README.md`.
4. Verify the production container sets `X-Powered-By` off (already done via
   `poweredByHeader: false`).

**Risk:** a strict CSP is the only tricky one. Start with report-only
`Content-Security-Policy-Report-Only` in P1 (see F) and promote later.

**Verify:** `curl -sI https://<preview>/home-hero.webp` shows the immutable
header; `curl -sI /` still shows ISR-appropriate caching; Lighthouse Best
Practices 100.

### B. Image and media pipeline — P0/P1

Sources are already WebP-optimized, but three gaps remain:

1. **Hero sources are oversized for their quality.** `community/hero-07.webp`
   (496 kB) and `hero-08` (260 kB) are 1920 px q82. Lossy q78-q80 at the same
   dimensions, plus a per-directory pass, cuts these 20-30% with no visible
   change. Extend `scripts/optimize-art.mjs` targets to `public/community`,
   `public/` root hero art, and `public/team` (team headshots are still
   `.jpg`), with `MAX_PX` tuned per directory (heroes 1920, team 800).
2. **Raw `<img>` in three components** (`StackSection.tsx`,
   `CommunityProjects.tsx`, `Logo.tsx`) bypasses `next/image`. Keep `Logo`
   as-is (it needs the `<picture>` color-scheme switch), but add explicit
   `width`/`height` and `decoding="async"` to the two card logos so they do
   not contribute CLS, or route the simple ones through `next/image`.
3. **Preload the LCP image deterministically.** `HomeHero` and the page
   heroes already use `priority`, which emits a `<link rel="preload">`. Audit
   every main page hero to confirm exactly one `priority` image each (multiple
   priority images contend for bandwidth). The community carousel correctly
   marks only frame 0.
4. **Optimizer cache persistence.** The Dockerfile already chowns
   `.next/cache/images`. Add a named volume or bind mount for
   `.next/cache/images` in the server compose so transcodes survive container
   replacement (today a deploy wipes them).

**Verify:** total `public/` bytes decrease; no page gains a second priority
image; CLS stays 0.

### C. JavaScript, CSS, and Core Web Vitals — P1

1. **Bundle analysis.** Add `@next/bundle-analyzer` as a devDependency and an
   `npm run analyze` script. Use it to confirm no accidental client-side pulls
   (e.g. a server data module imported into a client component — the
   `lib/newsroomMeta.ts` split pattern). Fix anything the report surfaces.
2. **Audit client components.** `Header`, `ScrollProgress`,
   `TelehashExtensionDetector` each attach scroll listeners; verify passive
   and consider consolidating the two scroll listeners in the header region.
   `NewsroomIndex` and `CommunityHeroCarousel` are the only meaningfully
   interactive islands; keep them.
3. **Fonts.** Confirm `next/font/google` self-hosts (it does) and that only
   the used weights are requested (Barlow 600/700/800, Space Mono 400/700,
   Inter variable). Consider `adjustFontFallback` (default) and a tighter
   `Inter` subset. The brand `Bridge Officer` woff2 is 1.7 kB — fine.
4. **Render-blocking check.** `globals.css` is the only stylesheet; Tailwind
   v4 emits used utilities only. Verify no unused animation/keyframe CSS
   ships and that `scroll-behavior: smooth` is not fighting reduced motion.
5. **Third-party scripts.** Umami loads `afterInteractive` and only in
   production. Add `preconnect` hints for Umami and the Forum only where
   rendered, not site-wide.

**Verify:** bundle analyzer shows no server modules in client chunks; INP
budget holds; `npm run build` First Load JS does not regress.

### D. SEO and structured data — P1

Metadata, canonical URLs, sitemap, and robots are already solid. Deepen schema
and fix the small correctness gaps:

1. Move JSON-LD to a single site-wide `@graph`:
   `Organization`/`NGO` (with `@id`, `sameAs`, `logo`, `foundingDate`,
   `address`, `taxID`) + `WebSite` (with `inLanguage`, `publisher` `@id`) +
   `WebPage` per route, emitted once from the layout with per-page override
   where needed. Reference nodes by `@id` instead of repeating them.
2. Add `BreadcrumbList` to interior pages and `ItemList` to `/projects` and
   `/grants/announcements`. Add `Person` nodes for founders/board on
   `/mission`.
3. `NewsArticle`: add `dateModified` (from frontmatter if present),
   `articleSection`, `keywords`, and `image` always. Keep `isAccessibleForFree`.
4. Add `viewport` and `themeColor` exports in `app/layout.tsx`
   (`colorScheme: 'dark light'`, per-scheme `themeColor`) — currently absent.
5. Sitemap: use real `lastModified` from file mtimes for static pages rather
   than build time, and keep newsroom dates from frontmatter. Add `<host>` in
   `robots.ts`. Consider a Google News style surface only if the newsroom
   grows; not required today.
6. Add `app/not-found.tsx` and `app/error.tsx` with real, indexable content
   and the shared layout, so 404/500 are branded and not blank.
7. Add `app/manifest.ts` (name, icons, theme, display `standalone`) — cheap,
   helps install and some crawlers.
8. Audit heading order and one-`h1`-per-page across all templates.

**Verify:** every page validates in the Schema.org validator; Rich Results
test passes for `NewsArticle` and `FAQPage`; a crawler sees canonical + OG on
every route.

### E. Agentic / AI discoverability (AEO/GEO) — P1

Already present: explicit AI-crawler allow-list in `robots.ts`, `/llms.txt`,
`/llms-full.txt`, per-post `/newsroom/<slug>/llms.txt`, RSS, JSON-LD.

Extend with the 2026 conventions:

1. **Markdown content negotiation.** Add `middleware.ts` (or a route handler)
   so a request with `Accept: text/markdown` to an HTML route returns the
   markdown equivalent (`/newsroom/<slug>/llms.txt` already exists; add a
   page-level markdown view for the top-level pages). Advertise it with
   `Link: </llms.txt>; rel="llms"` and `<link rel="alternate"
   type="text/markdown">` in the head.
2. **Discovery well-known surfaces:** `/.well-known/security.txt`,
   `/.well-known/ai.txt` (crawler preferences summary), and keep
   `/llms.txt` linked from `robots.txt` and the sitemap comments.
3. **Stable agent contracts:** give every data-driven section a stable `id`
   anchor (projects already have `#slug`) so agent-generated deep links do
   not rot; document the anchors in `/llms.txt`.
4. **Feed hygiene:** ensure `rss.xml` includes `<atom:link rel="self">`
   (present) and full absolute URLs (present); add `dc:creator` and
   `content:encoded` for richer downstream ingestion.
5. **Accuracy signals:** keep `dateModified` truthful so agents prefer the
   newest version, and ensure `/llms-full.txt` regenerates on build (it does).

**Verify:** `curl -H 'Accept: text/markdown' /mission` returns markdown;
`/.well-known/*` resolve; an AI-readiness scanner shows no regressions.

### F. Security and best-practice hardening — P1/P2

1. Ship the header set from workstream A.
2. Add a **CSP in report-only first**, then enforce. Because Next injects
   inline bootstrap scripts and the site uses `dangerouslySetInnerHTML` for
   JSON-LD, start with `script-src 'self' 'unsafe-inline'` plus explicit
   `frame-src` for the block-find YouTube embed and `connect-src` for Umami,
   Formspree, and GitHub/Discourse if fetched client-side. Tighten to
   hash/nonce later if desired.
3. `images.remotePatterns` already restricts remote hosts; confirm every
   external image host used is listed and drop any unused.
4. Add `npm audit --production` to CI (report-only threshold).

**Verify:** securityheaders.com grade A/A+; YouTube embed and Formspree still
function under the enforced CSP.

### G. Quality gates and monitoring — P0/P1

Nothing currently runs tests, lint, or a build on pull requests.

1. Add `.github/workflows/ci.yml`: on `pull_request`, run `npm ci`,
   `npm run lint`, `npm test`, `npm run build`. Cache npm. This is the
   cheapest guard against regressions in every other workstream.
2. Add **Lighthouse CI** (`@lhci/cli`) against the built app for home, a post,
   `/projects`, and `/contact`, with budgets for LCP/CLS/INP, total bytes, and
   JS size. Fail the check on regression.
3. Add a `scripts/lh-budget.json` (or LHCI `assertions`) capturing the targets
   in section 2.
4. Document how to run the audits locally in `README.md`.

**Verify:** a throwaway PR shows the CI green; an intentional slowdown turns
the Lighthouse job red.

### H. Accessibility (also SEO) — P2

1. Run `axe`/Lighthouse a11y on every template; fix contrast on the purple
   accent over dark (`#c084d8` on `#1a1a1a` passes; verify small text uses
   the light-mode variant correctly).
2. Confirm focus-visible rings on all interactive controls, and that the
   carousel/mobile-nav are keyboard operable with correct `aria-*`.
3. Give decorative canvas/PCB layers `aria-hidden`; confirm image `alt`
   quality (not filename dumps).

### I. Content and asset hygiene — P2

1. Remove unused code/assets surfaced by the audit (`data/stats.ts` usage,
   `components/shared/NewsletterSignup.tsx`, any orphaned UI primitive).
2. Compress the OG PNGs (`public/og/*` ~90 kB each) to palette PNG or WebP —
   they are social-only, so a smaller file speeds unfurls.
3. Canonical host: ensure `www` → apex 308 at the proxy, and that
   `NEXT_PUBLIC_SITE_URL` is the only origin used in metadata (it is).
4. Re-run both optimize scripts and commit the result in their own commit for
   a clean diff.

---

## 4. Suggested execution order

1. **P0** — workstream A (headers) + G (CI). Land together, verify green.
2. **P1** — B (images), D (schema/SEO), E (agent surfaces).
3. **P1** — C (bundle analysis + fixes), F (CSP report-only).
4. **P2** — F enforcement, H (a11y), I (hygiene).
5. Final pass: re-measure against the targets in section 2; update this file
   and `docs/ui-work-log.md`.

## 5. Guardrails

- No new runtime dependencies; dev-only tooling (`@next/bundle-analyzer`,
  `@lhci/cli`) is fine.
- Every phase keeps `npm run lint`, `npm test`, and `npm run build` green.
- Preserve all copy rules (no em dashes, no per-project amounts, canon
  vocabulary) and the design system (square corners, purple accent, token
  surfaces).
- Content changes stay in `data/` and `content/`, not components.
- One reviewable commit per phase; update the work log with each merge.

## 6. Out of scope

- Framework migration, CDN adoption beyond the existing proxy, auth/CMS.
- Rewriting the newsroom or adding analytics beyond what exists.
- Any visual redesign; this branch is behavior, delivery, and metadata only.
