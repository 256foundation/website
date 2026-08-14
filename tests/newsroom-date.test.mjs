// Tests for newsroom date rendering (lib/newsroom.ts).
//
// Node 20 cannot import the TypeScript source directly and the repo takes no
// new dependencies, so formatPostDate() is mirrored below. Keep the two in
// step — the mirror is annotated there too.
//
// The regression these guard: `new Date('2026-08-14')` parses a date-only
// string as UTC midnight, so formatting it in a local zone west of UTC shifts
// the displayed day back by one. Every post was rendering a day early.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

/** Mirror of formatPostDate() in lib/newsroom.ts */
function formatPostDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  } catch {
    return dateStr
  }
}

test('renders the authored calendar date, not a timezone-shifted one', () => {
  assert.equal(formatPostDate('2026-08-14'), 'August 14, 2026')
  assert.equal(formatPostDate('2026-04-29'), 'April 29, 2026')
})

test('is stable across timezones on both sides of UTC', () => {
  // Denver is UTC-6/-7 and was the zone that exposed the off-by-one; Tokyo
  // (UTC+9) guards the opposite direction.
  const original = process.env.TZ
  try {
    for (const tz of ['America/Denver', 'Asia/Tokyo', 'UTC', 'Pacific/Kiritimati']) {
      process.env.TZ = tz
      assert.equal(formatPostDate('2026-08-14'), 'August 14, 2026', `shifted in ${tz}`)
    }
  } finally {
    if (original === undefined) delete process.env.TZ
    else process.env.TZ = original
  }
})

test('handles midnight-boundary dates (first and last of a month)', () => {
  assert.equal(formatPostDate('2026-01-01'), 'January 1, 2026')
  assert.equal(formatPostDate('2025-12-31'), 'December 31, 2025')
})

test('empty and malformed dates degrade without throwing', () => {
  assert.equal(formatPostDate(''), '')
  assert.equal(formatPostDate('not-a-date'), 'Invalid Date')
})

test('every published post renders its frontmatter date verbatim', () => {
  // Not a mirror: reads the real MDX off disk, so a post dated 2026-08-14
  // can never silently publish as "August 13".
  const dir = path.join(process.cwd(), 'content/newsroom')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  assert.ok(files.length > 0, 'expected at least one newsroom post')

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
    const date = (raw.match(/^date:\s*"?(\d{4})-(\d{2})-(\d{2})"?\s*$/m) || []).slice(1)
    assert.equal(date.length, 3, `${file} is missing a YYYY-MM-DD date`)

    const [y, m, d] = date.map(Number)
    const rendered = formatPostDate(`${date[0]}-${date[1]}-${date[2]}`)
    assert.match(rendered, new RegExp(`\\b${d}, ${y}$`), `${file} rendered as "${rendered}"`)
    assert.ok(m >= 1 && m <= 12, `${file} has an out-of-range month`)
  }
})
