// Tests for the grants-page funding log (lib/newsroom.ts getGrantAnnouncements,
// components/grants/*) and its newsroom category plumbing.
//
// Node 20 cannot import the TypeScript source directly, so the query and label
// logic is mirrored below, the same way tests/newsroom-featured.test.mjs mirrors
// comparePosts(). The last three tests do not mirror: they read the real files
// off disk and guard the copy rules the feature is specified against.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

/** Mirror of getGrantAnnouncements() in lib/newsroom.ts */
function getGrantAnnouncements(posts, limit) {
  const filtered = posts
    .filter((post) => post.category === 'grant-announcement')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
}

/** Mirror of PROGRAM_LABELS in components/grants/GrantAnnouncementCard.tsx */
const PROGRAM_LABELS = {
  core: 'Core Projects Program',
  general: 'General Grant Program',
}

const post = (slug, date, extra = {}) => ({ slug, date, category: 'grant-announcement', ...extra })

test('the log keeps only grant announcements', () => {
  const posts = [
    post('a', '2026-01-01'),
    { slug: 'b', date: '2026-02-01', category: 'foundation-news' },
    post('c', '2026-03-01'),
  ]
  assert.deepEqual(getGrantAnnouncements(posts).map((p) => p.slug), ['c', 'a'])
})

test('the log sorts newest first regardless of the featured flag', () => {
  const posts = [
    post('old', '2026-01-01'),
    post('new', '2026-06-01'),
    post('middle', '2026-03-01', { featured: true }),
  ]
  assert.deepEqual(getGrantAnnouncements(posts).map((p) => p.slug), ['new', 'middle', 'old'])
})

test('the log honours an optional limit', () => {
  const posts = [post('a', '2026-01-01'), post('b', '2026-02-01'), post('c', '2026-03-01')]
  assert.deepEqual(getGrantAnnouncements(posts, 2).map((p) => p.slug), ['c', 'b'])
})

test('an empty log stays empty (drives the empty state)', () => {
  assert.deepEqual(getGrantAnnouncements([]), [])
  assert.deepEqual(getGrantAnnouncements([{ slug: 'x', date: '2026-01-01', category: 'highlight' }]), [])
})

test('program chips render the exact program names', () => {
  assert.equal(PROGRAM_LABELS.core, 'Core Projects Program')
  assert.equal(PROGRAM_LABELS.general, 'General Grant Program')
})

// ── Real content, not a mirror ────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), 'content/newsroom')
const FEATURE_FILES = [
  'app/grants/page.tsx',
  'app/grants/announcements/page.tsx',
  'components/grants/FundingAnnouncements.tsx',
  'components/grants/GrantAnnouncementCard.tsx',
  'content/newsroom/libre-board-funding.mdx',
]

function readFrontmatter(file) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  return raw.split('---')[1] ?? ''
}

function field(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))
  return match?.[1].replace(/^["']|["']$/g, '')
}

test('every grant announcement declares a valid program and supported fields', () => {
  if (!fs.existsSync(CONTENT_DIR)) return
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  for (const file of files) {
    const fm = readFrontmatter(file)
    if (field(fm, 'category') !== 'grant-announcement') continue

    const program = field(fm, 'program')
    if (program !== undefined) {
      assert.ok(
        program === 'core' || program === 'general',
        `${file}: program ${JSON.stringify(program)} is not core or general`,
      )
    }
    // A missing project/program/term must not break rendering: each is optional.
    assert.ok(field(fm, 'date'), `${file}: a grant announcement needs a date`)
    assert.ok(field(fm, 'title'), `${file}: a grant announcement needs a title`)
  }
})

test('the Libre Board announcement carries the agreed frontmatter', () => {
  const fm = readFrontmatter('libre-board-funding.mdx')
  assert.equal(field(fm, 'category'), 'grant-announcement')
  assert.equal(field(fm, 'project'), 'Libre Board')
  assert.equal(field(fm, 'program'), 'core')
  assert.equal(field(fm, 'term'), 'Four months, September 2026 to December 2026')
})

// The funding-timeline framework every grant announcement's `term` must follow:
// "<Duration>, <Month Year> to <Month Year>". Keeps the grants log's timeline
// uniform across posts instead of each author formatting the span their own way.
const TERM_FORMAT = /^[A-Z][a-z]+ months?, [A-Z][a-z]+ \d{4} to [A-Z][a-z]+ \d{4}$/

test('every grant-announcement term follows the funding-timeline format', () => {
  if (!fs.existsSync(CONTENT_DIR)) return
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

  for (const file of files) {
    const fm = readFrontmatter(file)
    if (field(fm, 'category') !== 'grant-announcement') continue

    const term = field(fm, 'term')
    if (term === undefined) continue
    assert.match(
      term,
      TERM_FORMAT,
      `${file}: term ${JSON.stringify(term)} must read "<Duration>, <Month Year> to <Month Year>"`,
    )
  }
})

test('feature copy carries no banned vocabulary, amounts, or em dashes', () => {
  const banned = [
    /\bcycle\b/i,
    /\bwave\b/i,
    /\bround\b/i,
    /\bpillar\b/i,
    /maintainer retainer/i,
    /adoption phase/i,
    /Core Pillar/i,
    /Open Grant/i,
    /General Fund/i,
  ]

  for (const rel of FEATURE_FILES) {
    // Strip block and JSX comments so explanatory prose (which names the
    // retired vocabulary on purpose) does not trip the scan.
    const source = fs
      .readFileSync(path.join(process.cwd(), rel), 'utf8')
      .replace(/\{\/\*[\s\S]*?\*\/\}|\/\*[\s\S]*?\*\//g, '')

    for (const pattern of banned) {
      assert.ok(!pattern.test(source), `${rel}: matches banned ${pattern}`)
    }
    assert.ok(!/\$[0-9]/.test(source), `${rel}: contains a dollar amount`)
    assert.ok(!/—/.test(source), `${rel}: contains an em dash`)
  }
})
