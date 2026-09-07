import { XMLParser } from 'fast-xml-parser'
import type { PodcastEpisode } from '@/types'
import { decodeEntities, feedText } from '@/lib/html'

// POD256 publishes through Podhome; pod256.org only links to this feed, so the
// feed URL is the canonical source rather than anything scraped off the site.
const FEED_URL = 'https://serve.podhome.fm/rss/c0be02f5-0e88-59a3-84cb-b76041a83264'

/** Site to send listeners to when an episode has no page of its own. */
export const POD256_URL = 'https://www.pod256.org'

export async function fetchPodcastEpisodes(count = 3): Promise<PodcastEpisode[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const xml = await res.text()
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
    const result = parser.parse(xml)

    const channel = result?.rss?.channel
    if (!channel) return []

    const rawItems = channel.item
    if (!rawItems) return []

    // fast-xml-parser returns an object (not array) when there is only one item
    const items: unknown[] = Array.isArray(rawItems) ? rawItems : [rawItems]

    return items.slice(0, count).map((item: unknown) => {
      const i = item as Record<string, unknown>

      // Titles arrive as "124. Mining Forks, ..." — the number is already in
      // itunes:episode, so strip the duplicate prefix rather than print it twice.
      const rawTitle = decodeEntities(String(i.title ?? 'Untitled'))
      const title = rawTitle.replace(/^\s*\d+\.\s*/, '')

      const episode = i['itunes:episode']
      const duration = i['itunes:duration']

      return {
        title,
        link: String(i.link ?? POD256_URL),
        pubDate: String(i.pubDate ?? ''),
        description: i.description ? feedText(String(i.description), 200) : undefined,
        episode: episode != null ? Number(episode) : undefined,
        duration: duration != null ? formatDuration(String(duration)) : undefined,
      }
    })
  } catch {
    return []
  }
}

/**
 * "01:05:48" -> "1h 05m". Feeds also use bare seconds and "MM:SS", so anything
 * that does not parse is passed through untouched rather than mangled.
 */
export function formatDuration(raw: string): string {
  const trimmed = raw.trim()

  if (/^\d+$/.test(trimmed)) {
    const total = Number(trimmed)
    const h = Math.floor(total / 3600)
    const m = Math.round((total % 3600) / 60)
    return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`
  }

  const parts = trimmed.split(':').map(Number)
  if (parts.some(Number.isNaN)) return trimmed

  if (parts.length === 3) {
    const [h, m] = parts
    return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`
  }
  if (parts.length === 2) {
    const [m] = parts
    return `${m}m`
  }
  return trimmed
}
