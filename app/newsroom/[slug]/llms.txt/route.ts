import { getAllPosts, getPostBySlug } from '@/lib/newsroom'
import { buildPostMarkdown } from '@/lib/agentSeo'

/**
 * Raw markdown of one newsroom post, the llms.txt v2 per-page mirror:
 * /newsroom/<slug>/llms.txt. Prerendered with the page itself.
 */
export const dynamic = 'force-static'

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return new Response('Not found', { status: 404 })
  }
  return new Response(buildPostMarkdown(post.meta, post.content), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
