export interface Announcement {
  /** Unique key — change this whenever you cycle to a new announcement so previously-dismissed users see the new one */
  id: string
  /** Short badge label — e.g. "EVENT", "NEW", "GRANT" */
  label: string
  /** Main banner copy */
  message: string
  /** Link destination — internal path ("/telehash") or full external URL */
  href: string
  /** Set true for external URLs — opens in new tab */
  external?: boolean
  /** ISO date string — banner auto-hides after this date/time */
  expiresAt?: string
}

/**
 * Set to an Announcement object to show the banner, or null to hide it everywhere.
 *
 * To manage announcements:
 *   Show new event  → update this object with a new unique `id`
 *   Hide banner     → set to null
 *   Auto-expire     → set `expiresAt` to the event end date/time
 */
export const activeAnnouncement: Announcement | null = null
