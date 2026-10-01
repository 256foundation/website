// Tests for the /community and /our-work pages: the channel/project sets, the
// navigation consolidation, sitemap coverage, and the retired-vocabulary sweep.
//
// Node 20 cannot import the TypeScript source directly, and data/community.ts
// holds no logic worth mirroring, so these read the real files off disk.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (rel) => fs.readFileSync(path.join(process.cwd(), rel), 'utf8')

const NAV = 'data/navigation.ts'
const COMMUNITY_DATA = 'data/community.ts'
const SITEMAP = 'app/sitemap.ts'

const COMMUNITY_FEATURE_FILES = [
  'data/community.ts',
  'app/community/page.tsx',
  'components/community/ConnectGrid.tsx',
  'components/community/CommunityProjects.tsx',
  'components/community/GetInvolved.tsx',
]

test('top nav drops the dropdowns and adds Our Work + Community', () => {
  const nav = read(NAV)
  const topNav = nav.split('export const topNav')[1].split('export const footerFoundationLinks')[0]

  assert.ok(!/children:/.test(topNav), 'topNav should have no dropdown children')
  assert.ok(!/label: 'Ecosystem'/.test(topNav), 'Ecosystem dropdown should be gone')
  assert.ok(/label: 'Our Work', href: '\/our-work'/.test(topNav))
  assert.ok(/label: 'Community', href: '\/community'/.test(topNav))
})

test('footer links include Our Work and Community', () => {
  const nav = read(NAV)
  assert.ok(/label: 'Our Work', href: '\/our-work'/.test(nav))
  assert.ok(/label: 'Community', href: '\/community'/.test(nav))
})

test('sitemap lists /community and /our-work', () => {
  const sitemap = read(SITEMAP)
  assert.ok(sitemap.includes('${baseUrl}/community'))
  assert.ok(sitemap.includes('${baseUrl}/our-work'))
})

test('connect grid is exactly the six agreed channels', () => {
  const source = read(COMMUNITY_DATA)
  for (const label of ['Forum', 'Developer Calls', 'Group Chat', 'Nostr', 'X / Twitter', 'Hashdash']) {
    assert.ok(source.includes(`label: '${label}'`), `missing channel ${label}`)
  }
})

test('community-directed projects are OSMU and Hashrate Heatpunks', () => {
  const source = read(COMMUNITY_DATA)
  const directed = source
    .split('communityDirectedProjects')[1]
    .split('export const ecosystemProjects')[0]
  assert.ok(/abbr: 'OSMU'/.test(directed))
  assert.ok(/abbr: 'HEATPUNKS'/.test(directed))
})

test('ecosystem projects we serve are the four agreed projects', () => {
  const source = read(COMMUNITY_DATA)
  const served = source.split('export const ecosystemProjects')[1]
  for (const abbr of ['BITAXE', 'JUA KALI', 'ASIC-RS', 'HASHSCOPE']) {
    assert.ok(served.includes(`abbr: '${abbr}'`), `missing served project ${abbr}`)
  }
})

test('the fund line links to /our-work', () => {
  const source = read('components/community/CommunityProjects.tsx')
  assert.ok(source.includes('href="/our-work"'))
  assert.ok(/community directs the work/.test(source))
})

// ── Retired-vocabulary sweep ──────────────────────────────────────────────────

const RETIRED = [
  /Core Pillar/i,
  /Open Grant\b/i,
  /General Fund/i,
  /under our umbrella/i,
  /grant cycle/i,
  /core pillar project/i,
]

test('community feature copy carries no retired vocabulary', () => {
  for (const rel of COMMUNITY_FEATURE_FILES) {
    const source = read(rel)
    for (const pattern of RETIRED) {
      assert.ok(!pattern.test(source), `${rel}: matches retired ${pattern}`)
    }
  }
})

test('faq no longer says "pillar projects" or "Core Pillar Grant"', () => {
  const faq = read('data/faq.ts')
  assert.ok(!/pillar projects/i.test(faq), 'faq still mentions pillar projects')
  assert.ok(!/Core Pillar Grant/i.test(faq), 'faq still mentions Core Pillar Grant')
  assert.ok(!/grant cycle/i.test(faq), 'faq still mentions grant cycle')
})
