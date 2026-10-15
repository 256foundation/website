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

/** Tennessee Secretary of State business registry, where the Articles are filed. */
export const TN_SOS_URL = 'https://tncab.tnsos.gov/'

export const transparencyIntro = {
  eyebrow: 'Transparency',
  title: 'Transparency',
  body:
    'The 256 Foundation is a 501(c)(3) public charity, EIN 99-1662333. Everything below is already public, or already available on request, gathered in one place. On money, the filed Form 990 is the source of truth.',
}

export const transparencyCategories: TransparencyCategory[] = [
  {
    title: 'Foundation',
    items: [
      { label: 'Mission', href: '/mission' },
      { label: 'Board of Directors', href: '/mission#board' },
      { label: 'Articles of Incorporation', href: TN_SOS_URL, external: true },
      { label: 'IRS determination letter', href: PROPUBLICA_URL, external: true },
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
    items: [
      {
        label: 'Conflicts of Interest',
        href: 'https://docs.256foundation.org/doc/conflicts-of-interest-policy-gQ1dmH2N9B',
        external: true,
      },
      {
        label: 'Privacy Policy',
        href: 'https://docs.256foundation.org/doc/privacy-policy-1IHWpfXC4v',
        external: true,
      },
      {
        label: 'Responsible Disclosure',
        href: 'https://docs.256foundation.org/doc/responsible-disclosure-policy-PCfyFQb2N7',
        external: true,
      },
      {
        label: 'Code of Conduct',
        href: 'https://docs.256foundation.org/doc/code-of-conduct-policy-SMD9JitR6V',
        external: true,
      },
      {
        label: 'Whistleblower',
        href: 'https://docs.256foundation.org/doc/whistleblower-policy-i5kwa0Hibd',
        external: true,
      },
      {
        label: 'Gift Acceptance and Restricted Funds',
        href: 'https://docs.256foundation.org/doc/gift-acceptance-and-restricted-funds-policy-JVf1JC73SN',
        external: true,
      },
    ],
  },
  {
    title: 'Reports',
    items: [],
    note: 'Transparency report, first edition in progress.',
  },
]
