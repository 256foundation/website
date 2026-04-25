# 256 Foundation — Website

Official website for the [256 Foundation](https://256foundation.org), a 501(c)(3) nonprofit building the open-source Bitcoin mining ecosystem. Built with Next.js 15 and Tailwind CSS v4.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Deployment](#deployment) — Vercel · Proxmox (LXC + Nginx + PM2) · Coolify · Netlify · Railway
6. [Site Architecture — Pages & Navigation](#site-architecture--pages--navigation)
7. [External Integrations & Links](#external-integrations--links)
8. [Design System](#design-system)
9. [Data Layer](#data-layer)
10. [API Routes](#api-routes)
11. [Content Updates](#content-updates)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | ^15.x |
| UI Library | React | ^19.x |
| Language | TypeScript | ^5.x |
| Styling | Tailwind CSS v4 | ^4.x |
| XML Parsing | fast-xml-parser (Substack feed) | ^5.x |
| Analytics | Umami (self-hosted, optional) | — |

**Key architectural decisions:**
- **App Router** — all pages use Next.js 15 App Router with server components by default
- **Tailwind CSS v4** — CSS-first config via `@theme` and `@custom-variant` in `globals.css` (no `tailwind.config.js`)
- **Dark mode** — driven by `@media (prefers-color-scheme: dark)` OS preference, not a toggle; Tailwind `dark:` prefix maps to this media query
- **ISR** — project pages (`/projects`, `/projects/[slug]`) use `export const revalidate = 3600` for hourly ISR so live GitHub and forum data stays fresh without blocking builds
- **Static-first** — all other pages are statically generated at build time; only the Hashdash proxy is server-rendered on demand

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
│   │   ├── page.tsx            # /projects — all projects + live org repos
│   │   └── [slug]/page.tsx     # /projects/[slug] — individual project (ISR)
│   └── api/
│       ├── hashdash/route.ts   # Prometheus proxy for live hashrate leaderboard
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
│   │   ├── StayUpdated.tsx     # Forum topics + GitHub activity strips
│   │   ├── ProjectsSection.tsx # Live GitHub org activity feed
│   │   ├── ApplySection.tsx
│   │   ├── CommunitySection.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── FAQSection.tsx      # Curated 4-question accordion from data/faq.ts
│   │   ├── SupporterShowcase.tsx
│   │   ├── HashrateLeaderboard.tsx  # Live Prometheus hashrate data
│   │   └── ContactForm.tsx     # Formspree-powered contact form
│   ├── projects/               # Project detail components
│   │   ├── PillarProjectCard.tsx       # Card with live GitHub stars/forks/issues
│   │   ├── MilestoneTracker.tsx
│   │   ├── GrantLogTable.tsx
│   │   ├── HardwareProjectViewer.tsx
│   │   ├── EcosystemCard.tsx
│   │   ├── ProjectForumSection.tsx     # Per-project Discourse category topics
│   │   ├── GitHubActivitySection.tsx   # Per-project GitHub repo activity feed
│   │   └── OrgReposSection.tsx         # Live grid of all 256foundation org repos
│   ├── shared/                 # Cross-page shared components
│   │   ├── TeamMemberCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── NewsletterSignup.tsx
│   │   └── SubstackEmbed.tsx
│   └── telehash/               # TeleHash-specific components
│       ├── CountdownTimer.tsx
│       ├── TeleHashEventCard.tsx
│       └── PhotoCarousel.tsx   # Client-side photo carousel for event photos
│
├── data/                       # Static data — edit these to update site content
│   ├── navigation.ts           # All nav links (top nav + footer)
│   ├── projects.ts             # Pillar project definitions (Ember One, Mujina, etc.)
│   ├── grants.ts               # Grant recipient log
│   ├── supporters.ts           # Donor tiers
│   ├── team.ts                 # Team member profiles
│   ├── stats.ts                # Foundation statistics (BTC raised, blocks found)
│   ├── telehash.ts             # TeleHash event history, next event, photos
│   └── faq.ts                  # FAQ entries by category
│
├── lib/
│   ├── metadata.ts             # SEO metadata generation helper
│   ├── substack.ts             # Substack RSS fetch + parse
│   ├── discourse.ts            # Discourse forum API — latest topics + per-category topics
│   └── github.ts               # GitHub REST API — repo meta, org repos, org events
│
├── types/
│   └── index.ts                # All TypeScript interfaces
│
├── public/
│   ├── logos/                  # Logo variants
│   ├── projects/               # Project images
│   ├── team/                   # Team headshots
│   ├── supporters/             # Supporter tier logos (tier1/, tier2/, tier3/)
│   ├── ecosystem/              # Ecosystem partner logos
│   ├── telehash/               # TeleHash event photos (th3-*.jpg, etc.)
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

Create a `.env.local` file in the project root:

```env
# ─── Public (exposed to browser) ─────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://256foundation.org

# Zaprite donation link (used on /donate page and home donate cards)
NEXT_PUBLIC_ZAPRITE_URL=https://pay.zaprite.com/pl_...

# Typeform grant application URL (used on /grants page)
NEXT_PUBLIC_TYPEFORM_URL=https://form.typeform.com/to/...

# Umami analytics (optional — only injected in production)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
NEXT_PUBLIC_UMAMI_URL=

# ─── Private (server-only) ────────────────────────────────────────────────────
# GitHub personal access token (optional — increases API rate limit from 60 to 5000 req/hr)
# Without this, GitHub data still loads but may hit rate limits under heavy traffic
GITHUB_TOKEN=ghp_...
```

> **Note:** The site builds and runs without any env vars — all pages fall back gracefully. Donation and grant form buttons link to `#` without their respective env vars. GitHub and forum data are fetched unauthenticated and cached via ISR.

### Removed dependencies
The contact form now posts **directly to Formspree** from the client (`components/home/ContactForm.tsx`) — no server-side email API is needed. The Resend integration and `/api/contact` route have been removed.

The Hashdash leaderboard now calls the **Prometheus API** at `pool.256foundation.org/api/v1/query` directly from the `/api/hashdash` server route — no external API key required.

---

## Deployment

Three hosting paths are documented below: **Vercel** (easiest), **self-hosted Proxmox** (full control), and **other platform hosts** (Coolify, Netlify, Railway).

---

### Option 1 — Vercel (recommended for simplicity)

No config file needed. Vercel detects Next.js automatically.

1. Push repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables under **Project → Settings → Environment Variables** (see [Environment Variables](#environment-variables))
4. Deploy — every push to `main` triggers a production deploy; PRs get preview URLs automatically

**Custom domain:** add it under **Project → Settings → Domains**. Vercel provisions an SSL certificate automatically.

---

### Option 2 — Self-hosted on Proxmox

Run the site on your own Proxmox server using a lightweight LXC container and Nginx as a reverse proxy.

#### 2a. Create the LXC container

In the Proxmox web UI or shell:

```bash
# Download Ubuntu 22.04 template if not already present
pveam download local ubuntu-22.04-standard_22.04-1_amd64.tar.zst

# Create the container (adjust storage, cores, memory as needed)
pct create 200 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname website-256f \
  --cores 2 \
  --memory 1024 \
  --swap 512 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --storage local-lvm \
  --rootfs local-lvm:8 \
  --unprivileged 1 \
  --start 1
```

SSH into the container:

```bash
pct enter 200
```

#### 2b. Install Node.js and PM2

```bash
apt update && apt upgrade -y
apt install -y curl git build-essential

# Install Node.js 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 globally (process manager — keeps the app alive and restarts on crash)
npm install -g pm2
```

Verify:

```bash
node -v   # should be v20.x
npm -v
pm2 -v
```

#### 2c. Clone and build the site

```bash
# Create a dedicated user (optional but recommended)
useradd -m -s /bin/bash website
su - website

# Clone the repo
git clone https://github.com/tylerkstevens/website-256F.git
cd website-256F

# Install dependencies
npm install

# Create the env file
cp .env.example .env.local
nano .env.local   # fill in your values (see Environment Variables section)

# Build for production
npm run build
```

#### 2d. Start with PM2

```bash
# Start the Next.js production server on port 3000
pm2 start npm --name "website-256f" -- start

# Save the process list so it survives reboots
pm2 save

# Set PM2 to start on system boot
pm2 startup
# → copy and run the command PM2 prints
```

Check it's running:

```bash
pm2 status
pm2 logs website-256f
```

The site is now running at `http://<container-ip>:3000`. Next, put Nginx in front of it.

#### 2e. Install and configure Nginx

```bash
apt install -y nginx
```

Create the site config:

```bash
nano /etc/nginx/sites-available/256foundation
```

Paste:

```nginx
server {
    listen 80;
    server_name 256foundation.org www.256foundation.org;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache Next.js static assets aggressively
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /public/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

Enable the site and reload:

```bash
ln -s /etc/nginx/sites-available/256foundation /etc/nginx/sites-enabled/
nginx -t   # verify config is valid
systemctl reload nginx
```

#### 2f. SSL with Certbot (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d 256foundation.org -d www.256foundation.org
```

Certbot edits your Nginx config to redirect HTTP → HTTPS and auto-renews the certificate.

#### 2g. Updating the site

To pull new changes and rebuild:

```bash
cd ~/website-256F
git pull origin main
npm install          # only needed if package.json changed
npm run build
pm2 restart website-256f
```

Optionally script this as a deploy hook or cron job.

#### 2h. Proxmox networking tips

- Assign the container a **static IP** in `pct set 200 --net0 name=eth0,bridge=vmbr0,ip=192.168.1.x/24,gw=192.168.1.1`
- Point your domain's A record to your Proxmox host's **public IP**
- Forward ports 80 and 443 from your router/firewall to the container IP
- If you run multiple containers, put Nginx **Proxy Manager** in its own LXC and use it to route by hostname — it has a GUI for managing SSL certs across containers

---

### Option 3 — Platform hosts (Coolify, Netlify, Railway)

#### Coolify (self-hosted PaaS — runs on Proxmox too)

[Coolify](https://coolify.io) is an open-source Heroku alternative you can run inside its own Proxmox LXC. It handles builds, deployments, SSL, and environment variables through a web UI — no manual Nginx config.

```bash
# Install Coolify on a fresh Ubuntu server / LXC
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Once running at `http://<server-ip>:8000`:

1. Add your GitHub repo as a **New Resource → Application**
2. Select **Nixpacks** (auto-detects Next.js) or **Dockerfile** if you add one
3. Set environment variables in the Coolify UI
4. Assign a domain — Coolify provisions SSL via Let's Encrypt automatically
5. Push to `main` → Coolify auto-deploys via webhook

#### Netlify

1. Connect your GitHub repo at [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Install the **Netlify Next.js Runtime** plugin (added automatically when it detects Next.js)
5. Add environment variables under **Site Settings → Environment Variables**

> **Note:** Netlify supports Next.js App Router and ISR but may lag behind the latest Next.js releases. Verify your Next.js version is in their [supported versions list](https://docs.netlify.com/frameworks/next-js/overview/).

#### Railway

1. New project → **Deploy from GitHub repo**
2. Railway auto-detects Next.js — no config needed
3. Add environment variables in the Railway dashboard
4. Set a custom domain under **Settings → Networking**

---

### Remote Image Domains

Configured in `next.config.ts` for `next/image` optimization. Required on all hosting platforms:

| Domain | Used For |
|--------|---------|
| `substackcdn.com` | Substack post thumbnails |
| `substack-post-media.s3.amazonaws.com` | Substack post images |
| `avatars.githubusercontent.com` | GitHub user avatars |

---

## Site Architecture — Pages & Navigation

### Page Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, donate CTAs, why section, stats, blocks found, forum + GitHub activity, FAQ, supporters, contact form |
| `/mission` | Mission | Foundation story, team, timeline, values |
| `/projects` | Projects | Pillar project cards with live GitHub stats, grant log, live org repo grid |
| `/projects/ember-one` | Ember One | Project detail with live forum topics and GitHub activity |
| `/projects/mujina` | Mujina | Project detail |
| `/projects/libre-board` | Libre Board | Project detail |
| `/projects/hydrapool` | Hydrapool | Project detail |
| `/grants` | Grants | Grant program overview + application |
| `/donate` | Donate | BTC/Lightning/card + hashrate donation with participation steps |
| `/telehash` | TeleHash | Countdown, participation guide, event history with photo carousels |
| `/faq` | FAQ | Categorized Q&A accordion (sourced from old site + expanded) |

### Top Navigation

```
Logo (→ /)     Home     Mission     Grants     Projects ▾     Community ▾     Ecosystem ▾     [GitHub]  [Forum]  [Donate]

Projects dropdown:
  • Ember One          → /projects/ember-one
  • Mujina             → /projects/mujina
  • Libre Board        → /projects/libre-board
  • Hydrapool          → /projects/hydrapool
  ─────────────────
  • Funded Project Log → /projects

Community dropdown:
  • Forum              → https://forum.256foundation.org  (external)
  • Events Calendar    → https://forum.256foundation.org/upcoming-events/ (external)
  • Telegram           → https://t.me/the256foundation    (external)
  • X / Twitter        → https://x.com/256FOUNDATION      (external)
  • Nostr              → https://primal.net/p/nprofile1... (external)
  • POD256             → https://www.pod256.org           (external)
  • NEWS256            → https://256foundation.substack.com (external)
  • TeleHash           → /telehash
  • Hashdash           → https://dash.256f.org            (external)

Ecosystem dropdown:
  • Bitaxe             → https://bitaxe.org               (external)
  • OSMU               → https://osmu.wiki                (external)
  • Heatpunks          → https://heatpunks.org            (external)
  • Jua Kali           → https://juakali.io               (external)
```

### Responsive Behavior

| Breakpoint | Nav |
|-----------|-----|
| < 1024px (mobile/tablet) | Hamburger → full-screen `MobileNav` overlay |
| ≥ 1024px (desktop) | Full horizontal nav with dropdown menus |

---

## External Integrations & Links

### Payment & Donation
| Service | URL | Used In |
|---------|-----|---------|
| Zaprite | `NEXT_PUBLIC_ZAPRITE_URL` (env var) | `/donate`, home donate cards |
| Formspree | `https://formspree.io/f/xkndjepy` | Contact form (client-side POST) |

### Mining & Pool
| Service | URL | Used In |
|---------|-----|---------|
| Hydrapool (mining pool) | `stratum+tcp://pool.256foundation.org:3333` | `/donate`, `/telehash` |
| Hashdash (pool dashboard) | `https://dash.256f.org` | Footer, donate, nav |
| Prometheus API | `https://pool.256foundation.org/api/v1/query` | `/api/hashdash` — live hashrate leaderboard |

### Forum (Discourse)
| Endpoint | Used In |
|----------|---------|
| `https://forum.256foundation.org/latest.json` | Home page live forum activity strip |
| `https://forum.256foundation.org/c/ember-one/5.json` | Ember One project page forum section |
| `https://forum.256foundation.org/c/mujina/7.json` | Mujina project page forum section |
| `https://forum.256foundation.org/c/fibre-board/6.json` | Libre Board project page forum section |
| `https://forum.256foundation.org/c/hydrapool/8.json` | Hydrapool project page forum section |

> Note: Libre Board's Discourse category uses the slug `fibre-board` (legacy typo) not `libre-board`.

### GitHub
| Endpoint | Used In |
|----------|---------|
| `https://api.github.com/repos/256foundation/{repo}` | Live stars/forks/issues on project cards |
| `https://api.github.com/orgs/256foundation/repos` | Live org repo grid on `/projects` |
| `https://api.github.com/orgs/256foundation/events` | GitHub activity strip on home page |
| `https://api.github.com/repos/{owner}/{repo}/events` | Per-project GitHub activity on project pages |

GitHub API is called unauthenticated by default (60 req/hr limit). Set `GITHUB_TOKEN` in env to raise the limit to 5,000 req/hr.

### Community Platforms
| Platform | URL |
|----------|-----|
| X / Twitter | `https://x.com/256FOUNDATION` |
| GitHub (org) | `https://github.com/256foundation` |
| Telegram | `https://t.me/the256foundation` |
| Nostr | `https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq` |
| Forum | `https://forum.256foundation.org` |
| Events Calendar | `https://forum.256foundation.org/upcoming-events/` |
| Newsletter (Substack) | `https://256foundation.substack.com` |
| POD256 Podcast | `https://www.pod256.org` |

### Project GitHub Repos
| Project | GitHub |
|---------|--------|
| Ember One | `github.com/256foundation/emberone00-pcb` |
| Mujina | `github.com/256foundation/mujina` |
| Libre Board | `github.com/256foundation/libre-board` |
| Hydrapool | `github.com/256foundation/hydrapool` |

### Third-party Content
| Service | Purpose |
|---------|---------|
| Substack RSS | Blog post feed (`https://256foundation.substack.com/feed`) |
| Typeform | Grant application form (env var) |

---

## Design System

### Colors

#### Brand Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Purple Dark** | `#3b1445` | Primary accent — buttons, links, hover states, labels, borders (light mode) |
| **Purple Mid** | `#5c2070` | Border accents in dark mode |
| **Purple Light** | `#c084d8` | Links, labels, hover states (dark mode) |
| **Terminal Green** | `#00FF41` | Live status indicators, code block text |
| **Code Block BG** | `#2d0f36` | Background for stratum/code blocks |

#### Dark Mode

| Role | Value |
|------|-------|
| Page background | `#1a1a1a` |
| Card / elevated surface | `#242424` |
| Border | `#1f1f1f` |
| Primary text | `#ffffff` |
| Secondary text | `text-gray-400` |

#### Light Mode

| Role | Value |
|------|-------|
| Page background | `#ffffff` |
| Elevated surface | `bg-gray-50` |
| Border | `border-gray-200` |
| Primary text | `text-gray-900` |
| Secondary text | `text-gray-600` |

### Typography

| Font | CSS Class | Role |
|------|-----------|------|
| **Barlow Condensed** | `font-display` | Headings, uppercase UI text |
| **Space Mono** | `font-mono` | Code, labels, buttons, nav links, tags, stats |
| **Inter** | `font-sans` | Body text (default) |

### Design Rules

1. **No border-radius** — all cards, buttons, inputs use `rounded-none`
2. **Uppercase headings** — all H1 and H2 use `.uppercase` with Barlow Condensed
3. **Purple is the only accent** — `#3b1445` (light) / `#c084d8` (dark) for all interactive states
4. **Terminal green = live/success only** — `#00FF41` for status indicators and code text only
5. **Dark mode is the primary experience** — optimize dark first, light is fully supported
6. **Borders over shadows** — depth via `#1f1f1f` borders, not box shadows
7. **Arrow symbols** — use `→` (`&rarr;`) for directional UI, not chevrons

### Decorative Elements

- **PCBBackground** — SVG circuit board tile pattern, always subtle (opacity 0.05–0.12)
- **DecorativeBg** — composes PCBBackground + purple radial glow + vignette. Use inside `<SectionWrapper decorative>`
- **Purple radial glow** — `radial-gradient(ellipse at {position}, rgba(124,58,237,0.08) 0%, transparent 60%)`
- **Live indicator dot** — `w-1.5 h-1.5 rounded-full bg-[#00FF41]` with `box-shadow: 0 0 6px #00FF41`

---

## Data Layer

All site content lives in `data/`. Edit these files to update content without touching components.

### `data/stats.ts`
Foundation statistics shown on the home page: BTC raised, blocks found, active grantees.

### `data/projects.ts`
Each pillar project: slug, name, description, status, GitHub URL, forum category URL, team members, milestones, key specs, tech features. The `forumCategoryApiUrl` field points to the Discourse category JSON endpoint for the live forum section on each project page.

### `data/telehash.ts`
- `teleHashEvents[]` — event history. Each event can have `blockFound`, `btcRaised`, `blockUrl`, `videoUrl`, `summary`, and `photos[]` (paths relative to `/public`).
- `nextEventDate` — ISO date string for the countdown timer (`null` if unannounced).
- `nextEventDetails` — display name, date, time, location, links for the next event.

### `data/faq.ts`
FAQ entries with `question`, `answer` (multi-paragraph answers separated by `\n\n`), and `category`.

### `data/navigation.ts`
All nav links for the header dropdowns and footer. Add/remove/reorder without touching layout components.

### `data/grants.ts`
Grant recipient log with grantee, category, BTC amount, status, dates, license, duration.

### `data/supporters.ts`
Supporter logos by tier (1, 2, 3) with name, image path, and link.

---

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/hashdash` | GET | Calls 3 Prometheus queries in parallel: top 5 donors, total hashrate, active donor count. Returns normalized JSON for the leaderboard. |
| `/api/posts` | GET | Fetches and parses Substack RSS feed, returns 3 most recent posts. |

### Contact Form
The contact form (`components/home/ContactForm.tsx`) posts **directly to Formspree** (`https://formspree.io/f/xkndjepy`) from the browser — no server route needed. Fields: `name`, `_replyto` (email), `message`.

---

## Content Updates

### Add a TeleHash event
Add an entry to `teleHashEvents[]` in `data/telehash.ts`. For photos, drop images into `public/telehash/` and add the paths to the `photos[]` array on the event object.

### Update the next TeleHash
Set `nextEventDate` to an ISO date string and fill in `nextEventDetails` in `data/telehash.ts`.

### Add a supporter logo
1. Drop the logo into `public/supporters/tier1/` (or tier2, tier3)
2. Add an entry to `data/supporters.ts`

### Add a team member
1. Add headshot to `public/team/`
2. Add entry to `data/team.ts`

### Update donation/grant form links
Set `NEXT_PUBLIC_ZAPRITE_URL` and `NEXT_PUBLIC_TYPEFORM_URL` in `.env.local` or Vercel environment variables.

### Update mining pool address
Search for `pool.256foundation.org` — it appears as static strings in `app/donate/page.tsx` and `app/telehash/page.tsx`.

### Update live GitHub data
GitHub data is fetched at build time and revalidated every hour via ISR. To change which repos are featured, update `githubUrl` and `forumCategoryApiUrl` fields in `data/projects.ts`. Org repos are auto-discovered from the `256foundation` GitHub organization.
