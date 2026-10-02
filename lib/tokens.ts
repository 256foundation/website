/**
 * Shared surface tokens. The site previously drifted across six dark card
 * values; these are the only approved surfaces. Use via `Card` (or the
 * `surface()` helper for the rare block that isn't a Card).
 */

export type SurfaceLevel = 'default' | 'raised' | 'tinted'

/** Base surface (most cards). */
const surfaceBase: Record<SurfaceLevel, string> = {
  default: 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#1f1f1f]',
  raised: 'bg-white dark:bg-[#0d0d0d] border-gray-200 dark:border-[#1f1f1f]',
  tinted: 'bg-[#f8f2fc] dark:bg-[#1e1028] border-[#3b1445]/15 dark:border-[#5c2070]/25',
}

/** Returns the full class string for a surface level. */
export function surface(level: SurfaceLevel = 'default'): string {
  return surfaceBase[level]
}
