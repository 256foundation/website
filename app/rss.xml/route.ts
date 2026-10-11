import { buildRssXml } from '@/lib/agentSeo'

/** RSS 2.0 feed of the newsroom. Declared in the layout's alternates. */
export const dynamic = 'force-static'

export function GET(): Response {
  return new Response(buildRssXml(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
