const NAMED: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
}

/**
 * Decode the HTML entities that survive tag-stripping a feed.
 *
 * RSS descriptions are escaped HTML, so stripping `<[^>]+>` leaves the entities
 * behind — "HydraPool&#8217;s" rendered literally on the page. React escapes on
 * output, so this has to happen at parse time, not in the markup.
 */
export function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeFromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => safeFromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED[name.toLowerCase()] ?? match)
}

function safeFromCodePoint(code: number): string {
  if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return ''
  try {
    return String.fromCodePoint(code)
  } catch {
    return ''
  }
}

/** Strip tags and decode entities — the usual pairing for feed text. */
export function feedText(raw: string, maxLength?: number): string {
  const text = decodeEntities(raw.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
  return maxLength != null ? text.slice(0, maxLength) : text
}
