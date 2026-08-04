// Tests for newsroom featured-post pinning (lib/newsroom.ts).
//
// Node 20 cannot import the TypeScript source directly and the repo takes no
// new dependencies, so the comparator below mirrors comparePosts() in
// lib/newsroom.ts. Keep the two in step — the mirror is annotated there too.
//
// The final test does not mirror anything: it reads the real MDX frontmatter
// off disk and guards the category union that item 6a widened, which is the
// one failure mode a mirror cannot catch (a typo'd category silently falls
// back to 'announcement' in toPost()).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

/** Mirror of comparePosts() in lib/newsroom.ts */
function comparePosts(a, b) {
  const aFeatured = a.featured === true
  const bFeatured = b.featured === true
  if (aFeatured !== bFeatured) return aFeatured ? -1 : 1
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

/** Mirror of getAllPosts()'s ordering step */
const sortPosts = (posts) => [...posts].sort(comparePosts)

/** Mirror of getLatestPost() */
function pickLatest(posts) {
  const sorted = sortPosts(posts)
  return sorted.find((p) => p.featured === true) ?? sorted[0] ?? null
}

const post = (slug, date, featured) => ({ slug, date, ...(featured === undefined ? {} : { featured }) })

test('with no featured post, ordering is plain date descending (today\'s behavior)', () => {
  const posts = [post('old', '2025-01-01'), post('new', '2026-06-01'), post('mid', '2025-08-01')]
  assert.deepEqual(
    sortPosts(posts).map((p) => p.slug),
    ['new', 'mid', 'old'],
  )
})

test('a featured post sorts first even when it is the oldest', () => {
  const posts = [
    post('newest', '2026-07-01'),
    post('manifesto', '2024-02-01', true),
    post('middle', '2026-01-01'),
  ]
  assert.deepEqual(
    sortPosts(posts).map((p) => p.slug),
    ['manifesto', 'newest', 'middle'],
  )
})

test('multiple featured posts stay date-descending among themselves, above the rest', () => {
  const posts = [
    post('plain-new', '2026-07-01'),
    post('feat-old', '2025-01-01', true),
    post('feat-new', '2026-03-01', true),
    post('plain-old', '2024-01-01'),
  ]
  assert.deepEqual(
    sortPosts(posts).map((p) => p.slug),
    ['feat-new', 'feat-old', 'plain-new', 'plain-old'],
  )
})

test('featured: false is treated the same as an absent flag', () => {
  const explicit = sortPosts([post('a', '2026-01-01', false), post('b', '2026-02-01', false)])
  const absent = sortPosts([post('a', '2026-01-01'), post('b', '2026-02-01')])
  assert.deepEqual(explicit.map((p) => p.slug), absent.map((p) => p.slug))
  assert.deepEqual(explicit.map((p) => p.slug), ['b', 'a'])
})

test('getLatestPost prefers a featured post over a newer plain one', () => {
  const posts = [post('newest', '2026-07-01'), post('pinned', '2024-02-01', true)]
  assert.equal(pickLatest(posts).slug, 'pinned')
})

test('getLatestPost falls back to the newest when nothing is featured', () => {
  const posts = [post('old', '2025-01-01'), post('newest', '2026-07-01')]
  assert.equal(pickLatest(posts).slug, 'newest')
})

test('getLatestPost returns null for an empty newsroom', () => {
  assert.equal(pickLatest([]), null)
})

test('removing the featured flag restores the pre-item-6 result exactly', () => {
  const withFlag = [post('a', '2026-01-01'), post('b', '2025-01-01', true), post('c', '2026-06-01')]
  const withoutFlag = withFlag.map(({ slug, date }) => ({ slug, date }))
  assert.equal(pickLatest(withFlag).slug, 'b', 'featured wins while the flag is set')
  assert.equal(pickLatest(withoutFlag).slug, 'c', 'newest wins once it is removed')
})

// ── Real content, not a mirror ────────────────────────────────────────────────

const CATEGORIES = ['announcement', 'mission', 'industry', 'partner', 'grant', 'manifesto']

test('every newsroom post declares a category in the union and a valid featured flag', () => {
  const dir = path.join(process.cwd(), 'content/newsroom')
  if (!fs.existsSync(dir)) return
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  assert.ok(files.length > 0, 'expected at least one newsroom post')

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
    const frontmatter = raw.split('---')[1] ?? ''

    const category = frontmatter.match(/^category:\s*["']?([\w-]+)["']?\s*$/m)?.[1]
    assert.ok(
      category && CATEGORIES.includes(category),
      `${file}: category ${JSON.stringify(category)} is not one of ${CATEGORIES.join(', ')}`,
    )

    const featured = frontmatter.match(/^featured:\s*(\S+)\s*$/m)?.[1]
    if (featured !== undefined) {
      assert.ok(
        featured === 'true' || featured === 'false',
        `${file}: featured must be true or false, got ${JSON.stringify(featured)}`,
      )
    }
  }
})

test('at most one post is featured at a time', () => {
  const dir = path.join(process.cwd(), 'content/newsroom')
  if (!fs.existsSync(dir)) return
  const featuredCount = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => /^featured:\s*true\s*$/m.test(fs.readFileSync(path.join(dir, f), 'utf8')))
    .length
  assert.ok(
    featuredCount <= 1,
    `${featuredCount} posts are featured; the /newsroom FEATURED slot and the home-page slot each show one`,
  )
})
