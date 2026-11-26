// The disclosure policy page publishes the board-adopted text verbatim,
// links a static PDF, and is listed from /transparency and the sitemap.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (rel) => fs.readFileSync(path.join(process.cwd(), rel), 'utf8')
const exists = (rel) => fs.existsSync(path.join(process.cwd(), rel))

const DATA = 'data/disclosurePolicy.ts'
const PAGE = 'app/security/disclosure-policy/page.tsx'
const PDF = 'public/policies/responsible-disclosure-policy.pdf'

const EXPECTED = [
  'Responsible Disclosure Policy',
  'Adopted by the Board of Directors on November 24, 2026',
  'Who we are and why',
  'The 256 Foundation (256F) is a 501(c)(3) nonprofit that builds and stewards open-source alternatives to closed layers of the Bitcoin mining ecosystem. Our 256 Red Team researches the security of mining firmware and software. We are white-hat researchers. We practice responsible disclosure in line with general industry best practice, and we act for the mining industry and the people who use its products. When disclosure drags on, users carry the risk without knowing it.',
  'Scope',
  'This policy covers vulnerabilities we find in mining firmware, software and pool services, open or closed source. Our own projects follow the same principles. We test only hardware and systems we own or are authorized to test, and we never exploit other people\'s live systems.',
  'How we disclose',
  'We report each vulnerability privately to the vendor or maintainer first. We then give the vendor reasonable time to fix it before publishing, consistent with industry best practice for coordinated disclosure. We decide timing case by case, weighing factors such as:',
  'Severity and ease of exploitation',
  'Whether it is actively exploited',
  'How many users are affected',
  'Whether a fix or mitigation is available',
  'How likely others are to find the same issue',
  'How responsive the vendor has been',
  'Whether a fix was released silently or did not work',
  'Whether the product is still maintained',
  'Unresponsive vendors',
  'We try to reach vendors through more than one channel, and we may ask a neutral coordinator for help. If a vendor does not engage, we may publish after a reasonable time.',
  'Extensions',
  'We may give more time to a vendor that is working on a fix in good faith. Extensions are at our discretion and are never guaranteed.',
  'Notifying users',
  'Where it helps them protect themselves, we may notify users of affected products, from individual miners to large operators, before we publish. We make reasonable efforts but cannot promise to reach everyone.',
  'What we publish',
  'If the issue is fixed, we publish a full advisory that notes the vendor\'s fix.',
  'If the issue is not fixed, we publish a limited advisory covering affected versions, impact and mitigations, with no details that would let someone reproduce the exploit.',
  'We publish exploit details only after users have had a reasonable time to update, if at all.',
  'We may publish a summary of our contact attempts with the vendor.',
  'We may share a draft with the vendor to check facts, but vendors cannot block, delay or change publication.',
  'Our advisories stick to the facts.',
  'Independence',
  'The same rules apply to every vendor and user, including 256F funders and partners. Donations never buy a review, its outcome or special treatment.',
  'Ethics',
  'We never ask for money or anything else in exchange for silence or delay. We never sell findings. A person verifies every AI-assisted finding before it goes to a vendor.',
  'Reporting a vulnerability to us',
  'Report vulnerabilities in 256F projects to security@256foundation.org. We will not pursue legal action against anyone who reports in good faith and follows this policy.',
  'CVE identifiers',
  'We may request CVE IDs where useful.',
  'Governance',
  'The Board of Directors adopts this policy. The Executive Director applies it case by case, and the board reviews it periodically.',
]

test('the policy page and PDF exist', () => {
  assert.ok(exists(PAGE))
  assert.ok(exists(PDF))
  const pdf = fs.readFileSync(path.join(process.cwd(), PDF))
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-')
  assert.ok(pdf.length > 8000)
})

test('the page renders the policy data and links the PDF', () => {
  const page = read(PAGE)
  assert.ok(page.includes("path: disclosurePolicy.path") || page.includes('disclosurePolicy.path'))
  assert.ok(page.includes('disclosurePolicy.sections.map'))
  assert.ok(page.includes('disclosurePolicy.pdfPath'))
  assert.ok(page.includes('disclosurePolicy.adopted'))
  assert.ok(page.includes('mailto:'))
})

test('the data file is the board text, word for word', () => {
  // The data file escapes apostrophes inside single-quoted strings.
  const source = read(DATA).replace(/\\'/g, "'")
  assert.equal((read(DATA).match(/heading: '/g) ?? []).length, 12)
  for (const text of EXPECTED) {
    assert.ok(source.includes(text), `missing: ${text.slice(0, 80)}`)
  }
  assert.ok(!source.includes('\u2022'), 'list markers belong in the markup, not doubled in the text')
  assert.ok(!source.includes('DRAFT'))
  assert.ok(!source.includes('1iswQRcdDsXIT'))
})

test('sitemap lists the policy page', () => {
  assert.ok(read('app/sitemap.ts').includes('/security/disclosure-policy'))
})

test('the agent index points at the published policy', () => {
  const seo = read('lib/agentSeo.ts')
  const data = read(DATA)
  assert.ok(seo.includes('disclosurePolicy.path'))
  assert.ok(seo.includes('disclosurePolicy.pdfPath'))
  assert.ok(data.includes("'/security/disclosure-policy'"))
  assert.ok(data.includes("'/policies/responsible-disclosure-policy.pdf'"))
  assert.ok(!seo.includes('not yet published'))
  assert.ok(!seo.includes('docs.256foundation.org'))
})

test('no em dashes in the policy page, data, or security.txt', () => {
  for (const rel of [DATA, PAGE, 'public/.well-known/security.txt', 'data/transparency.ts']) {
    assert.ok(!/\u2014/.test(read(rel)), `${rel} contains an em dash`)
  }
})
