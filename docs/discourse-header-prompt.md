# Prompt for Claude-in-Chrome: Match Discourse Header to 256 Foundation Main Site

You are modifying the self-hosted Discourse forum at `https://forum.256foundation.org` so its top header looks **pixel-identical** to the top header on `https://256foundation.org`. The goal: a user navigating from the main site to the forum should not be able to tell from the header that they left the main site.

Horizon is the parent theme and is locked ("preinstalled, cannot be deleted or customized"). **All edits go into the existing child component `256 Foundation — Site Theme`**. Do not create a new component. Do not edit Horizon directly.

---

## Reference — what we are matching

Main site header (`components/layout/Header.tsx` in the `website-256F` repo):

- A 3px fixed accent bar at the very top: `linear-gradient(to right, #2d0f36, #5c2070, #2d0f36)`
- Below it a 64px-tall header, `fixed` to viewport top at `z-40`, background `rgba(19,9,26,0.8)` with `backdrop-filter: blur(4px)`, bottom border transparent (turns to `rgba(59,20,69,0.3)` after scroll — skip the scroll behavior on Discourse; use the "scrolled" style always)
- Inner wrapper: `max-width: 1280px` (Tailwind `max-w-7xl`), horizontal padding `1rem → 1.5rem (sm) → 2rem (lg)`, `display:flex; align-items:center; justify-content:space-between; height:64px`
- Left: logo, `height: 44px`, `opacity:0.9` (1.0 on hover)
- Center (≥1024px only): nav links with these styles
  - `font-family: 'Barlow Condensed'` (CSS class `.font-display`)
  - `font-weight: 600`, `font-size: 0.875rem`, `text-transform: uppercase`, `letter-spacing: normal`
  - color `#9ca3af` (gray-400), hover `#ffffff`
  - padding `0.5rem 1rem`, hover bg `rgba(59,20,69,0.1)`, no border-radius (square)
  - Dropdown carets: small ▾ after label, panel opens on hover/click with dark bg
- Right (≥1024px): GitHub icon button, Forum icon button (*omit on Discourse*), Contact outline button, Donate solid purple button
- Right (<1024px): single hamburger button
- Button styles:
  - **Icon buttons** (GitHub): 36×36px, border `1px solid #3f3f3f`, color `#e5e7eb`, square corners, hover `border-color: #5c2070; background: rgba(59,20,69,0.1)`
  - **Contact / Login (outline)**: `padding: 0.5rem 0.75rem`, border `1px solid #3f3f3f`, `font-family: 'Space Mono'` (`.font-mono`), `font-size: 0.875rem`, square corners, hover as above
  - **Donate (solid)**: `padding: 0.5rem 1rem`, bg `#3b1445`, color `#fff`, `font-family: 'Space Mono'`, `font-weight: 700`, square corners, hover bg `#2d0f36`
- Breakpoint: **1024px** — below this, all desktop nav/buttons hide and only a hamburger shows

Fonts used by the main site (must all be available in the component):
- **Barlow Condensed** (wt 400, 600, 700) — already imported in the component
- **Space Mono** (wt 400, 700) — add via Google Fonts
- Inter — Horizon already self-hosts it; do not re-import

---

## Design decisions for the Discourse port

Confirmed with the site owner:

1. **Remove the Chat icon from the header entirely.** (Chat plugin stays enabled; only its header button is hidden.)
2. **Remove the Sign Up button.** Keep only Log In — its page offers account creation.
3. **Keep Discourse's left-side sidebar toggle** (`.header-sidebar-toggle`) — it is needed to collapse/expand the forum sidebar. Restyle it to match the icon-button look.
4. **Keep the search icon when Discourse renders one** (mobile / some routes). Style it like an icon button.
5. **Keep Discourse's notifications/avatar menu.** When logged in, the avatar sits at the far right *after* Donate. Donate is always visible, logged in or out.
6. **Two hamburgers on mobile, side by side.** Do not try to merge them. Order on mobile (logged-in): `logo … [site hamburger] [discourse sidebar/search icons] [discourse hamburger] [avatar]`. The custom site hamburger opens site nav; the Discourse hamburger opens the forum sidebar panel.
7. Donate button links to `https://256foundation.org/donate` (opens in same tab — since forum is a subdomain, this is a cross-origin nav; `target="_self"` is fine).

---

## What to change in `256 Foundation — Site Theme`

### A. `<head>` tab — add Space Mono import

Prepend to the existing `<head>` content:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

(Keep the existing Barlow Condensed import if any. If it is currently loaded via `@import` in the SCSS, leave it — or migrate it here for perf; not required.)

### B. Common SCSS — replace the component's stylesheet with the following

```scss
/* ============================================================
   256 Foundation — Header match with main site
   Targets: .d-header, #f256-nav, d-header-icons, .panel
   ============================================================ */

/* ---- Font vars (match main site CSS) ---- */
:root {
  --f256-font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --f256-font-mono:    "Space Mono", ui-monospace, Menlo, Consolas, monospace;
  --f256-purple-900:   #2d0f36;
  --f256-purple-700:   #3b1445;
  --f256-purple-500:   #5c2070;
  --f256-purple-accent:#c084d8;
  --f256-bg-dark:      #13091a;
  --f256-border-dark:  #3f3f3f;
  --f256-text-muted:   #9ca3af;
  --f256-text:         #e5e7eb;
}

/* ---- 3px purple accent bar above header ---- */
.d-header-wrap::before,
body > .d-header-wrap::before {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  z-index: 1001;
  background: linear-gradient(to right,
    var(--f256-purple-900), var(--f256-purple-500), var(--f256-purple-900));
  pointer-events: none;
}

/* ---- Header shell ---- */
.d-header {
  top: 3px !important;                /* sit below the accent bar */
  background: rgba(19, 9, 26, 0.85) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(59, 20, 69, 0.3);
  box-shadow: none !important;
  height: 64px;

  .wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    @media (min-width: 640px) { padding: 0 1.5rem; }
    @media (min-width: 1024px) { padding: 0 2rem; }
  }

  .contents {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    gap: 0.5rem;
  }
}

/* Push page content down by the extra 3px of accent */
#main-outlet-wrapper { padding-top: 3px; }

/* ---- Sidebar toggle (left of logo) — restyle to icon-button ---- */
.header-sidebar-toggle .btn-sidebar-toggle {
  width: 36px;
  height: 36px;
  border: 1px solid var(--f256-border-dark) !important;
  border-radius: 0 !important;
  color: var(--f256-text) !important;
  background: transparent !important;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover, &:focus {
    border-color: var(--f256-purple-500) !important;
    background: rgba(59, 20, 69, 0.1) !important;
    color: #fff !important;
  }
  svg { width: 16px; height: 16px; }
}

/* ---- Logo ---- */
.title #site-logo,
.title .logo-big,
.title .logo-small {
  height: 44px !important;
  width: auto !important;
  opacity: 0.9;
  transition: opacity 0.2s;
}
.title a:hover #site-logo { opacity: 1; }

/* ---- Custom nav (#f256-nav) ---- */
#f256-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1 1 auto;
  margin-left: 0.75rem;
}

#f256-nav .f256-links {
  display: none;                       /* desktop-only */
  align-items: center;
  gap: 0.25rem;
  flex: 1 1 auto;
  justify-content: center;

  @media (min-width: 1024px) { display: flex; }
}

#f256-nav .f256-link,
#f256-nav .f256-dd-trigger {
  font-family: var(--f256-font-display);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0;
  text-transform: uppercase;
  color: var(--f256-text-muted);
  background: transparent;
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  transition: color .2s, background .2s;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  line-height: 1;

  &:hover, &:focus {
    color: #fff;
    background: rgba(59, 20, 69, 0.1);
  }
}
#f256-nav .f256-caret { font-size: 0.7em; opacity: 0.8; }

/* Dropdown panels */
#f256-nav .f256-dd { position: relative; }
#f256-nav .f256-dd-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  background: #1a0f22;
  border: 1px solid rgba(59, 20, 69, 0.6);
  padding: 0.5rem 0;
  display: none;
  z-index: 1002;
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);

  a {
    display: block;
    padding: 0.5rem 1rem;
    font-family: var(--f256-font-display);
    font-size: 0.875rem;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--f256-text);
    text-decoration: none;

    &:hover { background: rgba(59, 20, 69, 0.4); color: #fff; }
  }
}
#f256-nav .f256-dd.is-open > .f256-dd-panel,
#f256-nav .f256-dd:hover > .f256-dd-panel { display: block; }

/* ---- Right-side actions (GitHub + Donate) ---- */
#f256-nav .f256-actions {
  display: none;                       /* desktop-only */
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  @media (min-width: 1024px) { display: inline-flex; }
}

#f256-nav .f256-btn-github {
  width: 36px; height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--f256-border-dark);
  color: var(--f256-text);
  border-radius: 0;
  background: transparent;
  transition: all .2s;
  text-decoration: none;
  /* If you keep the "GitHub" label instead of icon-only, add padding: */
  &:has(span),
  &:not(:empty):not(:has(svg:only-child)) {
    width: auto;
    padding: 0 0.75rem;
    gap: 0.4rem;
    font-family: var(--f256-font-mono);
    font-size: 0.875rem;
    height: 36px;
  }
  svg { width: 16px; height: 16px; }
  &:hover {
    border-color: var(--f256-purple-500);
    background: rgba(59, 20, 69, 0.1);
    color: #fff;
  }
}

#f256-nav .f256-btn-donate {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.5rem 1rem;
  height: 36px;
  background: var(--f256-purple-700);
  color: #fff;
  font-family: var(--f256-font-mono);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 0;
  text-decoration: none;
  white-space: nowrap;
  transition: background .2s;
  &:hover { background: var(--f256-purple-900); color: #fff; }
}

/* ---- Custom mobile hamburger (site nav trigger) ---- */
#f256-nav .f256-mob-trigger {
  display: inline-flex;                /* mobile/tablet */
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 36px; height: 36px;
  background: transparent;
  border: 0;
  padding: 8px;
  margin-left: auto;
  cursor: pointer;

  span {
    display: block;
    height: 1.5px;
    background: var(--f256-text);
    border-radius: 0;
  }
  &:hover span { background: #fff; }

  @media (min-width: 1024px) { display: none; }
}

/* ---- Discourse right-panel (.panel) ---- */
.d-header .panel {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Hide Chat icon in header */
.d-header .chat-header-icon,
.d-header li.chat-header-icon { display: none !important; }

/* Hide Sign Up button */
.d-header .sign-up-button { display: none !important; }

/* Style remaining d-header-icons (search, discourse hamburger) as icon-buttons */
.d-header .d-header-icons > li > a.btn,
.d-header .d-header-icons > li > button.btn {
  width: 36px; height: 36px;
  border: 1px solid var(--f256-border-dark) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--f256-text) !important;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: var(--f256-purple-500) !important;
    background: rgba(59, 20, 69, 0.1) !important;
    color: #fff !important;
  }
  svg { width: 16px; height: 16px; }
}

/* Avatar: strip the border frame, keep the image */
.d-header #current-user .btn {
  border: 0 !important;
  background: transparent !important;
  padding: 0;
  width: 36px; height: 36px;

  .avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(59,20,69,0.6);
    transition: border-color .2s;
  }
  &:hover .avatar { border-color: var(--f256-purple-accent); }
}

/* Log In button — outline style matching site's Contact button */
.d-header .login-button {
  height: 36px !important;
  padding: 0 0.75rem !important;
  font-family: var(--f256-font-mono) !important;
  font-weight: 400 !important;
  font-size: 0.875rem !important;
  background: transparent !important;
  color: var(--f256-text) !important;
  border: 1px solid var(--f256-border-dark) !important;
  border-radius: 0 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;

  .d-button-label { font-family: inherit; }
  svg { display: none; }               /* drop the user icon, match site */

  &:hover {
    border-color: var(--f256-purple-500) !important;
    background: rgba(59, 20, 69, 0.1) !important;
    color: #fff !important;
  }
}

/* ---- Hide the Discourse-native "wrench/edit admin" shortcut pill
       that currently floats over the banner — it does not exist on the
       main site so leave it out of the "match" scope. If the admin
       wants it, remove this block. ---- */
/* .d-header ~ * .admin-menu-toggle { display:none !important; } */
```

### C. Header HTML connector — verify / update

The component already injects `#f256-nav` via a connector (likely `javascripts/discourse/connectors/before-header-panel/f256-nav.hbs` or similar). **Keep the existing structure** — the CSS above targets the class names already in use (`.f256-links`, `.f256-actions`, `.f256-btn-github`, `.f256-btn-donate`, `.f256-mob-trigger`, `.f256-dd`, `.f256-dd-trigger`, `.f256-dd-panel`, `.f256-link`, `.f256-caret`).

Two small HTML edits needed inside that connector template:

1. **Remove the Forum button** (if present) — on the forum, we don't link back to the forum.
2. **Nav items** must match this exact list (mirrors `data/navigation.ts` in `website-256F`):

   - HOME → `https://256foundation.org`
   - MISSION → `https://256foundation.org/mission`
   - GRANTS → `https://256foundation.org/grants`
   - PROJECTS ▾
     - Ember One → `https://256foundation.org/projects/ember-one`
     - Mujina → `https://256foundation.org/projects/mujina`
     - Libre Board → `https://256foundation.org/projects/libre-board`
     - Hydrapool → `https://256foundation.org/projects/hydrapool`
     - Funded Project Log → `https://256foundation.org/projects#log`
   - COMMUNITY ▾
     - Telehash → `https://256foundation.org/telehash`
     - Events Calendar → `https://forum.256foundation.org/upcoming-events/`
     - Hashdash → `https://dash.256f.org`
     - POD256 → `https://www.pod256.org`
     - NEWS256 → `https://256foundation.substack.com`
     - Group Chat → `https://t.me/the256foundation`
     - X / Twitter → `https://x.com/256FOUNDATION`
     - Nostr → `https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq`
   - ECOSYSTEM ▾
     - Bitaxe → `https://bitaxe.org`
     - OSMU → `https://osmu.wiki`
     - Hashrate Heatpunks → `https://heatpunks.org`
     - Jua Kali → `https://github.com/GridlessCompute/Jua-Kali-Miner`

3. **GitHub button**: icon-only (no "GitHub" label text) to match the main site. Inside `.f256-btn-github`, render only the SVG, no sibling text node.

### D. Dropdown interaction JS

If the component already has JS that toggles `.is-open` on `.f256-dd` for touch devices, keep it. If not, add this init script inside the component's `<head>` tab (runs once per page):

```html
<script>
  (function () {
    if (window.__f256NavInit) return;
    window.__f256NavInit = true;

    // Open dropdowns on click (for touch / keyboard)
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('.f256-dd-trigger');
      if (trigger) {
        const dd = trigger.closest('.f256-dd');
        const wasOpen = dd.classList.contains('is-open');
        document.querySelectorAll('.f256-dd.is-open').forEach(d => d.classList.remove('is-open'));
        if (!wasOpen) {
          dd.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          trigger.setAttribute('aria-expanded', 'false');
        }
        e.preventDefault();
        return;
      }
      if (!e.target.closest('.f256-dd')) {
        document.querySelectorAll('.f256-dd.is-open').forEach(d => {
          d.classList.remove('is-open');
          const t = d.querySelector('.f256-dd-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Mobile site-nav toggle — opens a full-screen overlay
    document.addEventListener('click', function (e) {
      const t = e.target.closest('#f256-mob-trigger');
      if (!t) return;
      document.body.classList.toggle('f256-mob-open');
      t.setAttribute('aria-expanded', document.body.classList.contains('f256-mob-open'));
    });
  })();
</script>
```

Append to the SCSS for the mobile overlay:

```scss
body.f256-mob-open #f256-nav .f256-links,
body.f256-mob-open #f256-nav .f256-actions {
  display: flex !important;
  position: fixed;
  top: calc(64px + 3px);
  left: 0; right: 0;
  background: var(--f256-bg-dark);
  padding: 1rem;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;
  border-bottom: 1px solid rgba(59,20,69,0.4);
  z-index: 1000;
}
body.f256-mob-open #f256-nav .f256-actions { top: auto; bottom: 0; position: static; border-top: 1px solid rgba(59,20,69,0.4); border-bottom: none; }
```

(A full-fidelity port of `components/layout/MobileNav.tsx` is out of scope for v1 — this gives a working dropdown that looks on-brand. If you want true parity later, I'll port that component.)

---

## Verification checklist — run after saving

Use Claude-in-Chrome to verify. The forum URL is `https://forum.256foundation.org/`.

1. **Hard refresh** (`Cmd-Shift-R`). Confirm no console errors from the theme.
2. **Desktop, logged-out, ≥1280px viewport.** Header should show:
   `[3px purple bar on top] [sidebar toggle] [logo] HOME MISSION GRANTS PROJECTS▾ COMMUNITY▾ ECOSYSTEM▾ [GitHub icon] [Donate purple button] [Log In outline button]`
   — **No Sign Up, no Chat icon, no Forum button.**
3. **Desktop, logged-in, ≥1280px.** Identical to #2 but Log In replaced by circular avatar (32px, subtle purple ring, brighter ring on hover).
4. **Tablet, 768px.** Hamburgers only: `[sidebar toggle] [logo] ........ [site hamburger] [discourse hamburger + search icon] [avatar OR log in]`. No desktop nav links visible.
5. **Mobile, 390px.** Same as #4; tap the custom site hamburger — overlay opens with all site nav links. Tap Discourse hamburger — forum sidebar slides in. Confirm they do not collide.
6. **Hover a PROJECTS / COMMUNITY / ECOSYSTEM trigger.** Panel opens with correct links and they open in new tabs (confirm `target="_blank" rel="noopener"` in the template).
7. **Click a trigger on touch.** Same panel opens; click outside closes it.
8. **Scroll the page.** Header stays fixed, stays at 64px + 3px top bar, content doesn't slide under it awkwardly (check `#main-outlet-wrapper` padding).
9. **Compare side-by-side with `https://256foundation.org`** — open both at 1440px; take screenshots at the header region; they should match in type, spacing, colors, and button styles. The only expected differences: (a) the sidebar toggle on the left of the logo (forum-only), (b) avatar instead of a Contact button on the right when logged in.
10. **Check logged-out mobile.** Confirm the search icon (if Discourse renders it) picks up the icon-button style, and Log In picks up the outline style.

---

## Things NOT to do

- Do not touch the Horizon theme.
- Do not remove or disable the Chat plugin globally — only hide its header icon via CSS.
- Do not merge the two mobile hamburgers into one.
- Do not change the Discourse color palette — we are only overriding header chrome.
- Do not change the max-width of the main content area (`.full-width-enabled` should stay); we only constrain `.d-header .wrap`.
- Do not add `@import` for Barlow Condensed a second time — check it's not already in the component before the Space Mono change.

---

## Deliverable back to me

After applying and verifying, send back:

1. Two screenshots: main-site header at 1440px, forum header at 1440px (same page width). I want to diff them visually.
2. One screenshot: forum header at 390px (logged-in) showing the two hamburgers + avatar.
3. The full final SCSS of the component after your edits (in case you adjusted anything to accommodate Horizon specifics).
4. Any Discourse console warnings you saw during the edit/save cycle.
