/**
 * Shared RSS fetch for the Substack and POD256 feeds.
 *
 * Both pages that use these feeds are statically prerendered, so a fetch that
 * fails during the Docker build bakes an empty column into the image and it
 * stays empty until the next hourly revalidation. That happened in production:
 * Substack sits behind Cloudflare, which intermittently challenges the GitHub
 * Actions runner's datacenter IP, and the home page shipped claiming there were
 * no newsletter issues.
 *
 * So: identify ourselves like a normal client, bound each attempt, and retry a
 * couple of times before giving up.
 */

const USER_AGENT =
  'Mozilla/5.0 (compatible; 256FoundationBot/1.0; +https://256foundation.org)'

const ACCEPT = 'application/rss+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.5'

const ATTEMPT_TIMEOUT_MS = 8000

/** Returns the feed body, or null when every attempt failed. */
export async function fetchFeedXml(url: string, attempts = 3): Promise<string | null> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': USER_AGENT, Accept: ACCEPT },
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      })

      if (res.ok) return await res.text()

      // 404/410 and friends will not fix themselves; 429 and 5xx might.
      if (res.status < 500 && res.status !== 429) return null
    } catch {
      // Timeout or network error — worth another go.
    }

    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 500))
    }
  }

  return null
}
