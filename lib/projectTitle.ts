import type { PillarProject } from '@/types'

/**
 * Font + case utilities for a project's displayed name.
 *
 * Projects with a `titleFont` use their own brand typeface. The Bridge Officer
 * webfont is a lowercase-only subset (glyphs: a i j m n u), so those titles must
 * render lowercase — `uppercase` would silently fall back to font-display for
 * every character. Everything else keeps the standard uppercase display face.
 */
export function projectTitleFontClasses(project: Pick<PillarProject, 'titleFont'>): string {
  return project.titleFont === 'bridge-officer'
    ? 'font-bridge-officer lowercase'
    : 'font-display uppercase'
}
