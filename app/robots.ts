import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://256foundation.org'

/**
 * AI crawlers are named explicitly even though the wildcard already allows
 * them: the tokens are independent (allowing one says nothing about the
 * others), and a pile of AI-visibility scanners treat "explicitly allowed"
 * as the readiness signal. Nothing on this site is gated, so everything is
 * allowed. See also /llms.txt and /llms-full.txt.
 */
const AI_CRAWLERS = [
  // OpenAI: training, search index, user-triggered fetches
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google / Gemini
  'Google-Extended',
  'GoogleOther',
  // Apple, Meta, Amazon, Common Crawl, and the rest
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'CCBot',
  'cohere-ai',
  'MistralAI-User',
  'YouBot',
  'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
