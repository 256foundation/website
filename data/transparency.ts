import type { TransparencyCategory } from '@/types'

/**
 * /transparency content. Deliberately plain: a short intro and a handful of
 * categories, each a list of links. Nothing is listed that is not already
 * public or already obtainable on request.
 *
 * Only include a policy if it actually exists. A category with nothing to show
 * stays as a heading with a `note` rather than being dropped.
 *
 * Copy rules: no em dashes, no per-project grant amounts, no retired vocabulary
 * ("cycle", "wave", "round", "pillar"), no "passthrough".
 */

/** The single EIN the whole site already uses (also in data/faq.ts and JSON-LD). */
export const EIN = '99-1662333'

export const PROPUBLICA_URL = `https://projects.propublica.org/nonprofits/organizations/${EIN.replace('-', '')}`

/** The IRS-hosted copy of the Foundation's determination letter (501(c)(3) grant). */
export const IRS_DETERMINATION_LETTER_URL =
  'https://apps.irs.gov/pub/epostcard/dl/FinalLetter_99-1662333_THE256FOUNDATION_04232024_00.pdf'

export const transparencyIntro = {
  eyebrow: 'Transparency',
  title: 'Transparency',
  body: 'The 256 Foundation is a 501(c)(3) public charity, EIN 99-1662333.',
  note: 'See our transparency documents below.',
}

export const transparencyCategories: TransparencyCategory[] = [
  {
    title: 'Foundation',
    items: [
      { label: 'Mission', href: '/mission' },
      { label: 'Board of Directors', href: '/mission#board' },
      { label: 'IRS determination letter', href: IRS_DETERMINATION_LETTER_URL, external: true },
      { label: 'Form 990 lookup', href: PROPUBLICA_URL, external: true },
    ],
  },
  {
    title: 'Grants',
    items: [
      { label: 'Grant programs', href: '/grants' },
      { label: 'Grants timeline', href: '/grants/announcements' },
    ],
  },
  {
    title: 'Policies',
    items: [],
    note: 'Not published yet.',
  },
  {
    title: 'Reports',
    items: [],
    note: 'Transparency report, first edition in progress.',
  },
]
