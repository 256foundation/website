import type { TransparencyItem } from '@/types'

/**
 * /transparency content. Two sets: records that are already public or already
 * obtainable on request, and the key public policies governing how outsiders
 * interact. The transparency report (the narrative) is defined on the page but
 * lives elsewhere until its first edition lands.
 *
 * Copy rules: no em dashes, no per-project grant amounts, no retired vocabulary
 * ("cycle", "wave", "round", "pillar"), no "passthrough".
 */

/** The single EIN the whole site already uses (also in data/faq.ts and JSON-LD). */
export const EIN = '99-1662333'

export const PROPUBLICA_URL = `https://projects.propublica.org/nonprofits/organizations/${EIN.replace('-', '')}`

export const transparencyIntro = {
  eyebrow: 'Transparency',
  title: 'Public by default.',
  /** Why the page exists: each item is already public or obtainable on request. */
  lead:
    'Every item on this page is already public, or already available on request. Gathering them here removes a step rather than disclosing anything new.',
  /** The money framing point: the 990 owns the numbers. */
  money:
    'On money, the answer is the Form 990 itself. We link the public filing rather than restate figures, so nothing here can drift from what was filed.',
}

/** Already public, or already obtainable on request. */
export const transparencyRecords: TransparencyItem[] = [
  {
    title: 'Mission',
    description: 'What the Foundation is for, stated plainly on one page.',
    href: '/mission',
  },
  {
    title: 'Articles of Incorporation',
    description: 'Filed with the Tennessee Secretary of State, where the record is public.',
    href: 'https://tncab.tnsos.gov/',
    external: true,
    note: 'Search the Tennessee business registry',
  },
  {
    title: 'IRS determination letter',
    description: `The letter recognizing the Foundation as a 501(c)(3), EIN ${EIN}.`,
    href: PROPUBLICA_URL,
    external: true,
    note: 'Original available on request',
  },
  {
    title: 'Form 990 lookup',
    description:
      'Every annual information return the Foundation files, through ProPublica Nonprofit Explorer.',
    href: PROPUBLICA_URL,
    external: true,
    note: 'The filed 990 is the source of truth for all figures',
  },
  {
    title: 'Project grants timeline',
    description:
      'Every grant announced, newest first: the project, the program, and the term. No amounts.',
    href: '/grants/announcements',
    note: 'Amounts live in the 990, never per project',
  },
]

/**
 * Key public policies only, not the full set. Canon lives in the Foundation's
 * published policy collection; each row links its document rather than
 * duplicating the text, so the policy stays single-source.
 */
export const transparencyPolicies: TransparencyItem[] = [
  {
    title: 'Conflicts of Interest',
    description: 'How directors and officers disclose and step aside from a decision.',
    href: 'https://docs.256foundation.org/doc/conflicts-of-interest-policy-gQ1dmH2N9B',
    external: true,
  },
  {
    title: 'Privacy Policy',
    description: 'What the site collects, and what it does not.',
    href: 'https://docs.256foundation.org/doc/privacy-policy-1IHWpfXC4v',
    external: true,
  },
  {
    title: 'Responsible Disclosure',
    description: 'How to report a security issue, and what happens next.',
    href: 'https://docs.256foundation.org/doc/responsible-disclosure-policy-PCfyFQb2N7',
    external: true,
  },
  {
    title: 'Code of Conduct',
    description: 'The rules for the forum, the chat, and the developer calls.',
    href: 'https://docs.256foundation.org/doc/code-of-conduct-policy-SMD9JitR6V',
    external: true,
  },
  {
    title: 'Whistleblower',
    description: 'How to raise a concern without reprisal.',
    href: 'https://docs.256foundation.org/doc/whistleblower-policy-i5kwa0Hibd',
    external: true,
  },
  {
    title: 'Gift Acceptance and Restricted Funds',
    description: 'What the Foundation accepts, and how a designated gift is honored.',
    href: 'https://docs.256foundation.org/doc/gift-acceptance-and-restricted-funds-policy-JVf1JC73SN',
    external: true,
  },
]

/** The report is defined on the page and is distinct from it. */
export const transparencyReport = {
  eyebrow: 'Transparency Report',
  title: 'The narrative, published separately.',
  body:
    'The transparency report is the counterpart to this page: an annual account of what the Foundation and its grantees did, and how money moved. This page indexes standing documents; the report tells the story around them.',
  points: [
    'One fixed structure across every year, fund by fund, so years can be read side by side.',
    'No individual donor or grantee is ever named or amounted. Disclosure stops at the fund and program level.',
    'Bitcoin is valued at cost basis, and any unverified figure is marked as such.',
  ],
  status: 'First edition in progress',
}
