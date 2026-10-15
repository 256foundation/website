// Tests for the /transparency page: the page and data file exist, every record
// and policy has an href, the footer/sitemap wire-up is present, security.txt
// points at the responsible-disclosure policy, and the copy rules hold.
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

const POLICY_TITLES = [
  'Conflicts of Interest',
  'Privacy Policy',
  'Responsible Disclosure',
  'Code of Conduct',
  'Whistleblower',
  'Gift Acceptance and Restricted Funds',
]

const RECORD_TITLES = [
  'Mission',
  'Articles of Incorporation',
  'IRS determination letter',
  'Form 990 lookup',
  'Project grants timeline',
]

test('the transparency page and data file exist', () => {
  assert.ok(exists(PAGE), `${PAGE} is missing`)
  assert.ok(exists(DATA), `${DATA} is missing`)
})

test('footer Resources links /transparency', () => {
  const nav = read(NAV)
  assert.ok(/label: 'Transparency', href: '\/transparency'/.test(nav))
})

test('sitemap lists /transparency', () => {
  assert.ok(read(SITEMAP).includes('${baseUrl}/transparency'))
})

test('every public-record item is present and has an href', () => {
  const source = read(DATA)
  const records = source.split('transparencyRecords')[1].split('transparencyPolicies')[0]
  for (const title of RECORD_TITLES) {
    assert.ok(records.includes(`title: '${title}'`), `missing record ${title}`)
  }
  const hrefs = records.match(/href:/g) ?? []
  const titles = records.match(/title:/g) ?? []
  assert.equal(hrefs.length, titles.length, 'a record title has no href')
})

test('exactly the six key policies, each with an href', () => {
  const source = read(DATA)
  const policies = source.split('transparencyPolicies')[1].split('transparencyReport')[0]
  for (const title of POLICY_TITLES) {
    assert.ok(policies.includes(`title: '${title}'`), `missing policy ${title}`)
  }
  const hrefs = policies.match(/href:/g) ?? []
  const titles = policies.match(/title:/g) ?? []
  assert.equal(hrefs.length, titles.length, 'a policy title has no href')
  assert.equal(titles.length, 6, 'policy list should be exactly the six key policies')
})

test('the money link is the Form 990 lookup, not a restated figure', () => {
  const source = read(DATA)
  assert.ok(source.includes('projects.propublica.org/nonprofits/organizations/'))
  assert.ok(source.includes("'99-1662333'") || source.includes('991662333'))
  assert.ok(/Form 990 lookup/.test(source))
})

test('the transparency report is defined on the page', () => {
  const source = read(DATA)
  assert.ok(/transparencyReport/.test(source))
  assert.ok(/in progress/i.test(source), 'report should carry an in-progress status')
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
