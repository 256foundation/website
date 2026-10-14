import { NextRequest, NextResponse } from 'next/server'

/**
 * Markdown content negotiation for AI agents.
 *
 * A client that sends `Accept: text/markdown` gets the machine-readable twin of
 * the page instead of HTML where one exists:
 *
 *   /                 -> /llms.txt              (the curated agent brief)
 *   /newsroom/<slug>  -> /newsroom/<slug>/llms.txt (the raw post)
 *
 * `Vary: Accept` is set on every HTML response so shared caches keep the two
 * representations apart, and a `rel="llms"` Link header advertises the index
 * to any crawler that reads response headers.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const accept = req.headers.get('accept') ?? ''
  const wantsMarkdown = accept.includes('text/markdown')

  let res: NextResponse

  if (wantsMarkdown) {
    const postMatch = pathname.match(/^\/newsroom\/([^/]+)$/)
    if (postMatch) {
      const url = req.nextUrl.clone()
      url.pathname = `/newsroom/${postMatch[1]}/llms.txt`
      res = NextResponse.rewrite(url)
    } else if (pathname === '/') {
      const url = req.nextUrl.clone()
      url.pathname = '/llms.txt'
      res = NextResponse.rewrite(url)
    } else {
      res = NextResponse.next()
    }
  } else {
    res = NextResponse.next()
  }

  res.headers.append(
    'Link',
    '</llms.txt>; rel="llms"; type="text/markdown", </llms-full.txt>; rel="alternate"; type="text/markdown"',
  )
  return res
}

export const config = {
  // HTML routes only; skip build assets and files with an extension.
  matcher: ['/', '/newsroom/:path*'],
}
