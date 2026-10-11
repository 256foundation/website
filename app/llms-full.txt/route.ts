import { buildLlmsFullTxt } from '@/lib/agentSeo'

/**
 * The whole site's content in one markdown document, for agents that want a
 * single fetch: project narratives, the funding log, the FAQ, and every
 * newsroom post in full. Generated from the same data the pages render.
 */
export const dynamic = 'force-static'

export function GET(): Response {
  return new Response(buildLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
