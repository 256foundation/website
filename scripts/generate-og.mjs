/**
 * Generates the OpenGraph share cards in public/og/.
 *
 * Every card follows one template: the 256 mark, a faint purple PCB grid,
 * a soft purple glow, and the page name set in Barlow Condensed. The home
 * card swaps the title for the oversized mark.
 *
 * Text is rendered by librsvg, which resolves fonts through the system, so
 * the brand TTFs in assets/fonts are copied into ~/Library/Fonts when missing.
 *
 *   node scripts/generate-og.mjs
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fontsDir = path.join(root, 'assets/fonts')
const outDir = path.join(root, 'public/og')

// librsvg only sees fonts installed on the system, so mirror the brand fonts
// into the user font directory before rendering.
const userFonts = path.join(os.homedir(), 'Library/Fonts')
fs.mkdirSync(userFonts, { recursive: true })
for (const font of fs.readdirSync(fontsDir)) {
  const dest = path.join(userFonts, font)
  const src = path.join(fontsDir, font)
  if (!fs.existsSync(dest) || fs.statSync(dest).size !== fs.statSync(src).size) {
    fs.copyFileSync(src, dest)
  }
}

const W = 1200
const H = 630

const INK = '#1a1a1a'
const PURPLE = '#3b1445'
const PURPLE_MID = '#5c2070'
const ACCENT = '#c084d8'
const BG = '#f7f5f8'

const logoData = fs
  .readFileSync(path.join(root, 'public/logos/256-logo-secondary-dark.png'))
  .toString('base64')

/** Faint PCB-style grid + purple glow + vignette, matching the site's hero treatment. */
function backdrop() {
  return `
  <defs>
    <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <line x1="0" y1="30" x2="60" y2="30" stroke="${PURPLE}" stroke-width="0.5" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="${PURPLE}" stroke-width="0.5" />
      <line x1="0" y1="0" x2="15" y2="0" stroke="${PURPLE_MID}" stroke-width="0.4" />
      <line x1="0" y1="0" x2="0" y2="15" stroke="${PURPLE_MID}" stroke-width="0.4" />
      <line x1="60" y1="60" x2="45" y2="60" stroke="${PURPLE_MID}" stroke-width="0.4" />
      <line x1="60" y1="60" x2="60" y2="45" stroke="${PURPLE_MID}" stroke-width="0.4" />
    </pattern>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.16" />
      <stop offset="60%" stop-color="${PURPLE}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="iconFade" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PURPLE}" />
      <stop offset="100%" stop-color="${ACCENT}" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}" />
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.5" />
  <rect width="${W}" height="${H}" fill="url(#glow)" />
  <rect x="0" y="0" width="6" height="${H}" fill="url(#edge)" />`
}

/** Casing guard so configs can be written naturally. */
const up = (s) => s.toUpperCase()

function shell(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${backdrop()}${inner}</svg>`
}

function home() {
  const logoW = 600
  const logoH = Math.round((logoW * 257) / 800)
  const x = (W - logoW) / 2
  const y = 150
  return shell(`
    <ellipse cx="${W / 2}" cy="${y + logoH / 2}" rx="400" ry="220" fill="url(#iconFade)" />
    <image xlink:href="data:image/png;base64,${logoData}" href="data:image/png;base64,${logoData}" x="${x}" y="${y}" width="${logoW}" height="${logoH}" />
    <line x1="${W / 2 - 26}" y1="418" x2="${W / 2 + 26}" y2="418" stroke="${ACCENT}" stroke-width="3" />
    <text x="${W / 2}" y="482" text-anchor="middle" font-family="Space Mono" font-size="26" letter-spacing="9" fill="${PURPLE}">OPEN-SOURCE BITCOIN MINING</text>
    <text x="${W / 2}" y="536" text-anchor="middle" font-family="Space Mono" font-size="19" letter-spacing="4" fill="${PURPLE_MID}" opacity="0.7">256FOUNDATION.ORG</text>
  `)
}

function page({ kicker, title, subtitle }) {
  // Barlow Condensed bold runs ~0.68em per character; shrink long titles so
  // they never run past the right margin.
  const titleSize = Math.min(112, Math.floor(1020 / (0.68 * title.length)))
  const titleY = 410
  return shell(`
    <ellipse cx="178" cy="98" rx="200" ry="90" fill="url(#iconFade)" />
    <image xlink:href="data:image/png;base64,${logoData}" href="data:image/png;base64,${logoData}" x="80" y="66" width="196" height="63" />
    <text x="80" y="266" font-family="Space Mono" font-size="23" letter-spacing="7" fill="${PURPLE_MID}">${up(kicker)}</text>
    <line x1="80" y1="296" x2="152" y2="296" stroke="${ACCENT}" stroke-width="3" />
    <text x="80" y="${titleY}" font-family="Barlow Condensed" font-weight="bold" font-size="${titleSize}" fill="${INK}">${up(title)}</text>
    <text x="80" y="${titleY + 58}" font-family="Barlow Condensed" font-weight="600" font-size="36" fill="${PURPLE_MID}">${subtitle}</text>
    <text x="${W - 80}" y="${H - 62}" text-anchor="end" font-family="Space Mono" font-size="19" letter-spacing="4" fill="${PURPLE_MID}" opacity="0.7">256FOUNDATION.ORG</text>
  `)
}

const configs = [
  { file: 'og-home.png', render: home },
  { file: 'og-mission.png', render: () => page({ kicker: '256 Foundation', title: 'Mission', subtitle: 'Decentralize, open-source, and steward Bitcoin mining.' }) },
  { file: 'og-our-work.png', render: () => page({ kicker: '256 Foundation', title: 'Our Work', subtitle: 'Commoditizing the Bitcoin mining stack.' }) },
  { file: 'og-mining-stack.png', render: () => page({ kicker: '256 Foundation', title: 'Mining Stack', subtitle: 'The open-source Bitcoin mining stack.' }) },
  { file: 'og-grants.png', render: () => page({ kicker: '256 Foundation', title: 'Grants', subtitle: 'Funding open-source Bitcoin mining.' }) },
  { file: 'og-community.png', render: () => page({ kicker: '256 Foundation', title: 'Community', subtitle: 'Come build the stack with us.' }) },
  { file: 'og-newsroom.png', render: () => page({ kicker: '256 Foundation', title: 'Newsroom', subtitle: 'Announcements, updates, and progress.' }) },
  { file: 'og-grant-announcements.png', render: () => page({ kicker: 'Newsroom', title: 'Grant Announcements', subtitle: 'What the Foundation has funded.' }) },
  { file: 'og-telehash.png', render: () => page({ kicker: '256 Foundation', title: 'Telehash', subtitle: 'Mine for the mission.' }) },
  { file: 'og-faq.png', render: () => page({ kicker: '256 Foundation', title: 'FAQ', subtitle: 'How the Foundation works.' }) },
]

fs.mkdirSync(outDir, { recursive: true })

for (const { file, render } of configs) {
  const svg = render()
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outDir, file))
  console.log(`  ${file}`)
}
console.log(`\nWrote ${configs.length} OpenGraph cards to public/og/`)
