import { XMLParser } from 'fast-xml-parser'
import type { SubstackPost } from '@/types'

const FEED_URL = 'https://256foundation.substack.com/feed'

export async function fetchSubstackPosts(count = 3): Promise<SubstackPost[]> {
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

      // Extract cover image — try enclosure first, then parse first <img> from content
      let image: string | undefined
      const enclosure = i['enclosure'] as Record<string, string> | undefined
      if (enclosure?.['@_url']) {
        image = enclosure['@_url']
      } else {
        const content = String(i['content:encoded'] ?? i['description'] ?? '')
        const match = content.match(/<img[^>]+src=["']([^"']+)["']/)
        if (match?.[1]) image = match[1]
      }

      return {
        title: String(i.title ?? 'Untitled'),
        link: String(i.link ?? FEED_URL),
        pubDate: String(i.pubDate ?? ''),
        description: i.description
          ? String(i.description).replace(/<[^>]+>/g, '').slice(0, 200)
          : undefined,
        image,
      }
    })
  } catch {
    return []
  }
}

export function formatPostDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
