// Tests for the /transparency page: it exists, is a handful of categories of
// links, every link has a destination, nothing is invented, the footer/sitemap
// wires are present, and the cross-links and copy rules hold.
//
// Node 20 cannot import the TypeScript source, so these read the real files off
// disk (same approach as tests/community.test.mjs).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (rel) => fs.readFileSync(path.join(process.cwd(), rel), 'utf8')
const exists = (rel) => fs.existsSync(path.join(process.cwd(), rel))

const PAGE = 'app/transparency/page.tsx'
const DATA = 'data/transparency.ts'
const NAV = 'data/navigation.ts'
const SITEMAP = 'app/sitemap.ts'
const SECURITY = 'public/.well-known/security.txt'

const CATEGORIES = ['Foundation', 'Grants', 'Policies', 'Reports']

const POLICY_TITLES = [
  'Conflicts of Interest',
  'Privacy Policy',
  'Responsible Disclosure',
  'Code of Conduct',
  'Whistleblower',
  'Gift Acceptance and Restricted Funds',
]

test('the transparency page and data file exist', () => {
  assert.ok(exists(PAGE), `${PAGE} is missing`)
  assert.ok(exists(DATA), `${DATA} is missing`)
})

test('footer Resources links /transparency', () => {
  assert.ok(/label: 'Transparency', href: '\/transparency'/.test(read(NAV)))
})

test('sitemap lists /transparency', () => {
  assert.ok(read(SITEMAP).includes('${baseUrl}/transparency'))
})

test('the page is categories with the expected headings', () => {
  const source = read(DATA)
  for (const title of CATEGORIES) {
    assert.ok(source.includes(`title: '${title}'`), `missing category ${title}`)
  }
})

test('every transparency link has an href', () => {
  const source = read(DATA)
  const hrefs = source.match(/href:/g) ?? []
  const labels = source.match(/label:/g) ?? []
  assert.equal(hrefs.length, labels.length, 'a link label has no href')
})

test('the Policies category is exactly the six key policies', () => {
  const source = read(DATA)
  const policies = source.split("title: 'Policies'")[1].split("title: 'Reports'")[0]
  for (const title of POLICY_TITLES) {
    assert.ok(policies.includes(`label: '${title}'`), `missing policy ${title}`)
  }
  assert.equal((policies.match(/label:/g) ?? []).length, 6)
})

test('the money link is the Form 990 lookup, not a restated figure', () => {
  const source = read(DATA)
  assert.ok(source.includes('projects.propublica.org/nonprofits/organizations/'))
  assert.ok(/Form 990 lookup/.test(source))
})

test('the Reports category is present but empty', () => {
  const source = read(DATA)
  const reports = source.split("title: 'Reports'")[1]
  assert.ok(/items: \[\]/.test(reports), 'Reports should have no links yet')
  assert.ok(/in progress/i.test(reports), 'Reports should carry an in-progress note')
})

test('security.txt points at the responsible-disclosure policy, not the FAQ', () => {
  const source = read(SECURITY)
  assert.ok(source.includes('responsible-disclosure-policy'))
  assert.ok(!/^Policy: .*\/faq/m.test(source))
})

test('no em dashes in the transparency copy or page', () => {
  for (const rel of [DATA, PAGE]) {
    assert.ok(!/\u2014/.test(read(rel)), `${rel} contains an em dash`)
  }
})

test('no retired vocabulary in the transparency copy', () => {
  // Strip comments: the data file names the banned words in its header.
  const source = read(DATA)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
  for (const pattern of [/grant cycle/i, /\bwave\b/i, /\bpillar\b/i, /passthrough/i]) {
    assert.ok(!pattern.test(source), `${DATA}: matches retired ${pattern}`)
  }
})

// ── Cross-links from the rest of the site ─────────────────────────────────────

test('the footer 501(c)(3) line links the public record', () => {
  assert.ok(read('components/layout/Footer.tsx').includes('href="/transparency"'))
})

test('the FAQ points at the public record from the tax and disclosure answers', () => {
  const faq = read('data/faq.ts')
  const links = faq.match(/href: '\/transparency'/g) ?? []
  assert.ok(links.length >= 3, 'expected the tax, disclosure, and EIN answers to link /transparency')
})

test('the donate, grants and mission touches link the public record', () => {
  for (const rel of [
    'app/donate/page.tsx',
    'components/grants/FundingAnnouncements.tsx',
    'app/mission/page.tsx',
  ]) {
    assert.ok(read(rel).includes('/transparency'), `${rel} does not link /transparency`)
  }
})
