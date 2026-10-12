import type { NewsroomPost } from '@/types'
import { getGrantAnnouncements } from '@/lib/newsroom'

/**
 * One row in the grants funding log. Usually a 1:1 projection of a
 * `grant-announcement` newsroom post, but a single announcement may fund
 * several grants at once, in which case it expands into one entry per project
 * (see ANNOUNCEMENT_SPLITS). Every entry links into the newsroom; the log
 * never renders a dollar amount.
 */
export interface GrantLogEntry {
  /** Stable React key: the post slug, suffixed when one post splits into many. */
  key: string
  /** Slug of the newsroom article this entry announces. */
  slug: string
  date: string
  /** Card heading. Always present: the card is never headless. */
  project: string
  program?: NewsroomPost['program']
  term?: string
  excerpt?: string
}

/**
 * Per-project card copy for announcements that fund several grants in one
 * article. Keyed by newsroom slug; each entry inherits the article's date and
 * links to the same post. Keep the excerpts in step with the article body:
 * plain declarative lines, no amounts, no em dashes, no banned vocabulary
 * ("cycle", "wave", "round", "pillar").
 */
const ANNOUNCEMENT_SPLITS: Record<string, Array<Omit<GrantLogEntry, 'key' | 'slug' | 'date'>>> = {
  '2026-cycle-opens': [
    {
      project: 'Mujina',
      program: 'core',
      term: 'Six months, April 2026 to September 2026',
      excerpt:
        'The open firmware takes on its 2026 roadmap in priority order: continued Ember One and Libre Board support, first support for an industrial miner, and the start of flashable OS images.',
    },
    {
      project: 'Libre Board',
      program: 'core',
      term: 'Three months, April 2026 to June 2026',
      excerpt:
        'The open control board heads for revision three: revisions one and two fully tested, voltage regulation fixed, power validated across 12 to 24 volts, and the design readied for fabrication.',
    },
    {
      project: 'Hydrapool',
      program: 'core',
      term: 'Three months, April 2026 to June 2026',
      excerpt:
        'The open pool gets easier to run: payouts become a plugin interface, Umbrel and Start9 packages make a pool a one-click install, and Stratum v1.5 gets its specification.',
    },
  ],
  'community-block-funded-the-stack': [
    {
      project: 'Mujina',
      program: 'core',
      term: 'Nine months, April 2025 to January 2026',
      excerpt:
        'The open operating system of a miner: fully open GPLv3 firmware, the Linux kernel of Bitcoin mining, built to run on any miner.',
    },
    {
      project: 'Libre Board',
      program: 'core',
      term: 'Six months, April 2025 to October 2025',
      excerpt:
        'The open motherboard: an open control board reference design with every interface, an unlocked bootloader, and a copyleft hardware license.',
    },
    {
      project: 'Hydrapool',
      program: 'core',
      term: 'Six months, April 2025 to October 2025',
      excerpt:
        'The open pool: stand it up in one command, with payouts written into the coinbase so the operator never touches the money.',
    },
  ],
}

/**
 * The funding log's entries, newest first. Split announcements expand in the
 * article's own position, in declared order, so the log reads as one grant
 * per row without inventing dates the announcement never made.
 */
export function getGrantLogEntries(): GrantLogEntry[] {
  return getGrantAnnouncements().flatMap((post: NewsroomPost) => {
    const split = ANNOUNCEMENT_SPLITS[post.slug]
    if (!split) {
      return [
        {
          key: post.slug,
          slug: post.slug,
          date: post.date,
          project: post.project ?? post.title,
          program: post.program,
          term: post.term,
          excerpt: post.excerpt,
        },
      ]
    }
    return split.map((entry, index) => ({
      ...entry,
      key: `${post.slug}-${index}`,
      slug: post.slug,
      date: post.date,
    }))
  })
}
