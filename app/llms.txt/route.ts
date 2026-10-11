import { buildLlmsTxt } from '@/lib/agentSeo'

/**
 * The site's agent index, per https://llmstxt.org (v2). A curated markdown
 * brief, not a second sitemap: what the Foundation is, which pages matter,
 * and where the machine-readable full text lives.
 */
export const dynamic = 'force-static'

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
