/**
 * Renders public/policies/responsible-disclosure-policy.pdf from
 * data/disclosurePolicy.ts. The body text is the policy verbatim.
 *
 *   node --experimental-strip-types scripts/generate-disclosure-pdf.mjs
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { disclosurePolicy } from '../data/disclosurePolicy.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outPath = path.join(root, 'public/policies/responsible-disclosure-policy.pdf')
const logoPath = path.join(root, 'public/logos/256-logo-horizontal-dark.png')
const fontsDir = path.join(root, 'assets/fonts')

function esc(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function withEmail(text) {
  const email = disclosurePolicy.contact
  const index = text.indexOf(email)
  if (index === -1) return esc(text)
  return `${esc(text.slice(0, index))}<a href="mailto:${email}">${esc(email)}</a>${esc(text.slice(index + email.length))}`
}

function sectionHtml(section) {
  const paragraphs = (section.paragraphs ?? [])
    .map((paragraph) => `<p>${withEmail(paragraph)}</p>`)
    .join('')
  const list = section.list
    ? `<ul>${section.list.map((item) => `<li>${withEmail(item)}</li>`).join('')}</ul>`
    : ''
  return `<section><h2>${esc(section.heading)}</h2>${paragraphs}${list}</section>`
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${esc(disclosurePolicy.title)}</title>
  <style>
    @font-face {
      font-family: "Barlow Condensed";
      src: url("${pathToFileURL(path.join(fontsDir, 'BarlowCondensed-Bold.ttf')).href}") format("truetype");
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: "Space Mono";
      src: url("${pathToFileURL(path.join(fontsDir, 'SpaceMono-Regular.ttf')).href}") format("truetype");
      font-weight: 400;
      font-style: normal;
    }
    @page { size: letter; margin: 0.62in 0.7in 0.62in 0.74in; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: Inter, "Liberation Sans", sans-serif;
      color: #1a1a1a;
      font-size: 10.75pt;
      line-height: 1.42;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    header {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      margin-bottom: 16px;
      border-bottom: 3px solid #3b1445;
    }
    header img { height: 34px; width: auto; }
    h1 {
      font-family: "Barlow Condensed", sans-serif;
      font-weight: 700;
      font-size: 28pt;
      line-height: 0.95;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      margin: 0 0 10px;
      color: #1a1a1a;
    }
    .adopted {
      font-family: "Space Mono", ui-monospace, monospace;
      font-size: 8.5pt;
      letter-spacing: 0.01em;
      color: #3b1445;
      margin: 0 0 8px;
    }
    h2 {
      font-family: "Barlow Condensed", sans-serif;
      font-weight: 700;
      font-size: 14pt;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #3b1445;
      margin: 13px 0 4px;
      break-after: avoid;
    }
    p { margin: 0 0 6px; }
    ul { margin: 2px 0 0; padding: 0; list-style: none; }
    li {
      position: relative;
      padding-left: 14px;
      margin: 0 0 2px;
      break-inside: avoid;
    }
    li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.48em;
      width: 5px;
      height: 5px;
      background: #3b1445;
    }
    a { color: #3b1445; text-decoration: none; }
    .doc-footer {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-top: 18px;
      border-top: 1px solid #e4d5ea;
      padding-top: 8px;
      font-family: "Space Mono", ui-monospace, monospace;
      font-size: 8pt;
      letter-spacing: 0.02em;
      color: #5c2070;
      break-before: avoid;
    }
  </style>
</head>
<body>
  <header>
    <img src="${pathToFileURL(logoPath).href}" alt="256 Foundation" />
  </header>
  <h1>${esc(disclosurePolicy.title)}</h1>
  <p class="adopted">${esc(disclosurePolicy.adopted)}</p>
  ${disclosurePolicy.sections.map(sectionHtml).join('\n')}
  <div class="doc-footer">
    <span>256foundation.org${esc(disclosurePolicy.path)}</span>
    <span>256 Foundation</span>
  </div>
</body>
</html>
`

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'disclosure-pdf-'))
const htmlPath = path.join(tmpDir, 'policy.html')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(htmlPath, html)

const chrome = process.env.CHROME_PATH || 'google-chrome'
const profile = path.join(tmpDir, 'chrome-profile')
// Headless Chrome writes the PDF and then sometimes never exits in this environment.
const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    `--print-to-pdf=${outPath}`,
    pathToFileURL(htmlPath).href,
  ],
  { timeout: 20000, stdio: 'ignore' },
)

try {
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
} catch (err) {
  console.error(`cleanup warning: ${err.message}`)
}

if (result.error && result.error.code !== 'ETIMEDOUT') {
  console.error(result.error)
  process.exit(1)
}

const bytes = fs.statSync(outPath).size
if (bytes < 8000 || !fs.readFileSync(outPath).subarray(0, 5).equals(Buffer.from('%PDF-'))) {
  console.error('PDF was not written')
  process.exit(1)
}
console.log(`Wrote ${path.relative(root, outPath)} (${bytes} bytes)`)
