import type { NewsroomCategory } from '@/types'

/**
 * Client-safe half of the newsroom module: the category vocabulary, its display
 * labels, and date formatting. None of it touches `fs`, so client components
 * (the newsroom filter, PostCard) can import it without pulling Node built-ins
 * into the browser bundle. `lib/newsroom.ts` re-exports these for server code.
 */

/**
 * The frontmatter category vocabulary, the runtime twin of the
 * `NewsroomCategory` union, used to validate authored values. Mirrored by
 * tests/newsroom-featured.test.mjs, which reads it off the real posts.
 */
export const NEWSROOM_CATEGORIES: readonly NewsroomCategory[] = [
  'perspective',
  'foundation-news',
  'project-update',
  'highlight',
  'grant-announcement',
]

/**
 * Categories that feed the grants-page funding log. Today that is exactly one:
 * grants the Foundation funds out. Grants received from third parties (HRF,
 * MARA) are Foundation News, not announcements, and stay out of the log.
 */
export const GRANT_ANNOUNCEMENT_CATEGORY: NewsroomCategory = 'grant-announcement'

export function isNewsroomCategory(value: unknown): value is NewsroomCategory {
  return typeof value === 'string' && (NEWSROOM_CATEGORIES as readonly string[]).includes(value)
}

/** Display names for the category slugs, shared by the cards and article page. */
const categoryLabels: Record<NewsroomCategory, string> = {
  perspective: 'Perspective',
  'foundation-news': 'Foundation News',
  'project-update': 'Project Update',
  highlight: 'Highlight',
  'grant-announcement': 'Grant Announcement',
}

export function categoryLabel(category: NewsroomCategory): string {
  return categoryLabels[category] ?? category
}

/**
 * Renders a frontmatter date exactly as written, in every timezone.
 *
 * `new Date('2026-08-14')` parses a date-only string as UTC midnight, so
 * formatting it in the viewer's local zone shifts it a day earlier anywhere
 * west of UTC. Formatting in UTC pins it back to the authored calendar date.
 *
 * Mirrored by tests/newsroom-date.test.mjs, keep the two in step.
 */
export function formatPostDate(dateStr: string): string {
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
