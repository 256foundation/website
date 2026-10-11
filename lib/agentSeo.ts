import { getAllPostsByDate, getPostBySlug, categoryLabel, formatPostDate } from '@/lib/newsroom'
import { getGrantLogEntries } from '@/lib/grantLog'
import { pillarProjects } from '@/data/projects'
import { faqItems } from '@/data/faq'
import { teleHashEvents } from '@/data/telehash'
import { founders, board } from '@/data/team'
import { supporters } from '@/data/supporters'
import { siteStats } from '@/data/stats'
import { BITCOIN_ADDRESS, LIGHTNING_ADDRESS, ZAPRITE_URL } from '@/data/donate'
import type { NewsroomPost } from '@/types'

/**
 * Machine-readable surfaces for AI agents, generated from the same data the
 * site renders:
 *
 * - /llms.txt        curated markdown index (https://llmstxt.org, v2)
 * - /llms-full.txt   the whole site's content in one markdown document
 * - /rss.xml         RSS 2.0 feed of the newsroom
 * - /newsroom/<slug>/llms.txt   raw markdown of a single post
 * - JSON-LD on the layout (Organization), post pages (NewsArticle) and /faq
 *   (FAQPage), built here so schema markup and prose stay in step.
 *
 * Copy rules shared with the newsroom: plain declarative lines, no em dashes,
 * no per-project grant amounts, no retired vocabulary ("cycle", "wave",
 * "round", "pillar").
 */

const SITE_NAME = '256 Foundation'

/** Canonical site origin, matching metadataBase and the sitemap. */
export function siteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://256foundation.org').replace(/\/$/, '')
}

const SITE_BLURB =
  'The 256 Foundation is a 501(c)(3) nonprofit that funds and publishes free and open-source Bitcoin mining. ' +
  'It launched by having its community solo-mine Bitcoin block 881423 live on stream, and funds four core projects that ' +
  'together form a complete open mining stack: Ember One (open hashboard), Libre Board (open control board), ' +
  'Mujina (open mining firmware) and Hydrapool (open mining pool). Every design and codebase is published under ' +
  'copyleft licenses so anyone can build, audit, and modify a miner of any size.'

function absolute(path: string): string {
  return `${siteBaseUrl()}${path}`
}

function postUrl(post: Pick<NewsroomPost, 'slug'>): string {
  return `${siteBaseUrl()}/newsroom/${post.slug}`
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function postDate(post: Pick<NewsroomPost, 'date'>): Date {
  // Dates are bare YYYY-MM-DD; pin to UTC so builds are reproducible.
  return new Date(`${post.date}T00:00:00Z`)
}

// ── /llms.txt ────────────────────────────────────────────────────────────────

/** Curated agent index. Kept short by design: this is a brief, not a sitemap. */
export function buildLlmsTxt(): string {
  const base = siteBaseUrl()
  const lines: string[] = []

  lines.push(`# ${SITE_NAME}`)
  lines.push('')
  lines.push(`> ${SITE_SUMMARY}`)
  lines.push('')

  lines.push('## About')
  lines.push(`- [Home](${base}/): The mission in one page, with live stats and the latest announcement.`)
  lines.push(`- [Mission](${base}/mission): Why Bitcoin mining must be open-sourced, and the Foundation's principles.`)
  lines.push(`- [Our Work](${base}/our-work): The closed status quo, the open stack thesis, and proof it works.`)
  lines.push(`- [Projects](${base}/projects): The four core projects with full technical narratives.`)
  lines.push(`- [Grants](${base}/grants): The two grant programs and how a grant runs.`)
  lines.push(`- [Funding log](${base}/grants/announcements): Every grant announcement, newest first.`)
  lines.push(`- [FAQ](${base}/faq): Who we are, how donations and grants work, and technical questions.`)
  lines.push(`- [Telehash](${base}/telehash): Our livestream mining fundraiser. Telehash #1 found block 881423.`)
  lines.push(`- [Community](${base}/community): Forum, events, and ecosystem projects.`)
  lines.push(`- [Donate](${base}/donate): Bitcoin address, Lightning address, and card payments.`)
  lines.push(`- [Contact](${base}/contact): How to reach the team.`)
  lines.push('')

  lines.push('## Core projects (each links to its own site)')
  for (const project of pillarProjects) {
    lines.push(`- [${project.name}](${project.externalUrl}): ${project.tagline} (${project.githubUrl})`)
  }
  lines.push('')

  lines.push('## Newsroom')
  lines.push(`The announcements feed is ${base}/rss.xml. Every post below is also available as raw markdown at ${base}/newsroom/<slug>/llms.txt, and all posts together are in ${base}/llms-full.txt.`)
  lines.push('')
  for (const post of getAllPostsByDate()) {
    lines.push(`- [${post.title}](${postUrl(post)}): ${formatPostDate(post.date)}, ${categoryLabel(post.category)}. ${post.excerpt}`)
  }
  lines.push('')

  lines.push('## Machine-readable')
  lines.push(`- [Full site content, one file](${base}/llms-full.txt): every project narrative, the funding log, the FAQ, and all newsroom posts as markdown.`)
  lines.push(`- [RSS feed](${base}/rss.xml): the newsroom.`)

  return lines.join('\n')
}

const SITE_SUMMARY =
  'The 256 Foundation is a 501(c)(3) nonprofit that funds and publishes free and open-source Bitcoin mining. ' +
  'Its community solo-mined Bitcoin block 881423 on a livestream to seed the work, and the Foundation now funds four core ' +
  'projects, one per layer of the mining stack: Ember One (open hashboard reference design), Libre Board (open control board), ' +
  'Mujina (open mining firmware) and Hydrapool (open mining pool). All designs and code are published under copyleft licenses, ' +
  'so anyone can build, audit, and modify a Bitcoin miner of any size.'

// ── /llms-full.txt ───────────────────────────────────────────────────────────

/** The entire site's prose content in one markdown document. */
export function buildLlmsFullTxt(): string {
  const base = siteBaseUrl()
  const out: string[] = []

  out.push(`# ${SITE_NAME}: complete site content for AI agents`)
  out.push('')
  out.push(`> ${SITE_SUMMARY}`)
  out.push('')
  out.push(`Machine-readable index: ${base}/llms.txt. Newsroom feed: ${base}/rss.xml. This document covers the Foundation, its four core projects, its funding log, its FAQ, and every newsroom post in full.`)
  out.push('')

  // About
  out.push('## About the Foundation')
  out.push('')
  out.push('The 256 Foundation (EIN: 99-1662333) is a 501(c)(3) public charity. Its mission: to decentralize Bitcoin mining by building, funding and stewarding open-source alternatives to every closed layer of the mining stack.')
  out.push('')
  out.push(`Founders and board:`)
  out.push('')
  for (const member of [...founders, ...board]) {
    out.push(`- ${member.name} (${member.handle}), ${member.role}.`)
  }
  out.push('')
  out.push('Live totals:')
  out.push('')
  out.push(`- Bitcoin raised: ${siteStats.btcRaised} BTC`)
  out.push(`- Blocks found: ${siteStats.blocksFound}`)
  out.push(`- Grantees supported: ${siteStats.totalGrantees}`)
  out.push('')
  out.push('Supporters:')
  out.push('')
  for (const tier of [1, 2, 3] as const) {
    const names = supporters.filter((s) => s.tier === tier).map((s) => s.name)
    if (names.length > 0) out.push(`- Tier ${tier}: ${names.join(', ')}`)
  }
  out.push('')

  // Projects
  out.push('## Core projects')
  out.push('')
  for (const project of pillarProjects) {
    out.push(`### ${project.name}`)
    out.push('')
    out.push(project.tagline)
    out.push('')
    out.push(project.description)
    out.push('')
    out.push(`Why it is necessary: ${project.whyNecessary}`)
    out.push('')
    out.push(`What it does: ${project.whatItDoes}`)
    out.push('')
    out.push('Key specs:')
    out.push('')
    for (const spec of project.keySpecs) {
      out.push(`- ${spec.label}: ${spec.value}`)
    }
    out.push('')
    out.push('Key features:')
    out.push('')
    for (const feature of project.keyFeatures) {
      out.push(`- ${feature}`)
    }
    out.push('')
    out.push(`Status: ${project.status}. Lead: ${project.architect.name} (${project.architect.handle}).`)
    out.push(`Site: ${project.externalUrl}. Code and design files: ${project.githubUrl}.`)
    out.push('')
  }

  // Funding log
  out.push('## Funding log')
  out.push('')
  out.push('Every grant announcement, newest first. Grant amounts are not published; the public record is each announcement itself.')
  out.push('')
  for (const entry of getGrantLogEntries()) {
    out.push(`- ${formatPostDate(entry.date)}: ${entry.project}, ${entry.program === 'general' ? 'General Grant Program' : 'Core Projects Program'}${entry.term ? `, ${entry.term}` : ''}. Announcement: ${siteBaseUrl()}/newsroom/${entry.slug}. ${entry.excerpt ?? ''}`)
  }
  out.push('')

  // FAQ
  out.push('## FAQ')
  out.push('')
  for (const item of faqItems) {
    out.push(`### ${item.question}`)
    out.push('')
    out.push(item.answer)
    out.push('')
  }

  // Telehash
  out.push('## Telehash fundraising events')
  out.push('')
  out.push('Telehash is the Foundation\'s occasional livestream mining fundraiser: participants point their own hashrate at a solo pool for the length of the stream, and if a block is found the whole reward funds the mission.')
  out.push('')
  for (const event of teleHashEvents) {
    const found = event.blockFound ? `A block was found (coinbase ${event.btcRaised} BTC).` : 'No block was found.'
    out.push(`- Telehash ${event.number}, ${event.date}: ${found} ${event.summary}`)
  }
  out.push('')

  // Donate
  out.push('## Donate')
  out.push('')
  out.push('The Foundation does not sell anything; it is funded by donations.')
  out.push('')
  out.push(`- On-chain bitcoin: ${BITCOIN_ADDRESS}`)
  out.push(`- Lightning: ${LIGHTNING_ADDRESS}`)
  out.push(`- Card and other payments: ${ZAPRITE_URL}`)
  out.push(`- Donate page: ${siteBaseUrl()}/donate`)
  out.push('')

  // Newsroom, full text
  out.push('## Newsroom, full text')
  out.push('')
  for (const post of getAllPostsByDate()) {
    const full = getPostBySlug(post.slug)
    if (!full) continue
    out.push(`### ${post.title}`)
    out.push('')
    out.push(`${formatPostDate(post.date)} | ${categoryLabel(post.category)} | By ${post.author} | ${postUrl(post)}`)
    out.push('')
    if (post.excerpt) {
      out.push(post.excerpt)
      out.push('')
    }
    out.push(full.content.trim())
    out.push('')
    out.push('---')
    out.push('')
  }

  return out.join('\n').replace(/\n{4,}/g, '\n\n\n')
}

// ── /rss.xml ─────────────────────────────────────────────────────────────────

/** RSS 2.0 feed of the newsroom, newest first. */
export function buildRssXml(): string {
  const base = siteBaseUrl()
  const posts = getAllPostsByDate()

  const items = posts.map((post) => {
    const url = postUrl(post)
    return [
      '    <item>',
      `        <title>${escapeXml(post.title)}</title>`,
      `        <link>${url}</link>`,
      `        <guid isPermaLink="true">${url}</guid>`,
      `        <pubDate>${postDate(post).toUTCString()}</pubDate>`,
      `        <description>${escapeXml(post.excerpt)}</description>`,
      `        <category>${escapeXml(categoryLabel(post.category))}</category>`,
      '    </item>',
    ].join('\n')
  })

  const newest = posts.reduce((latest, post) => (postDate(post) > postDate(latest) ? post : latest), posts[0])

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '    <channel>',
    `        <title>${escapeXml(`${SITE_NAME} Newsroom`)}</title>`,
    `        <link>${siteBaseUrl()}/newsroom</link>`,
    `        <description>${escapeXml('Announcements, perspectives, and updates from the 256 Foundation, funding free and open-source Bitcoin mining.')}</description>`,
    '        <language>en-us</language>',
    `        <lastBuildDate>${newest ? postDate(newest).toUTCString() : new Date().toUTCString()}</lastBuildDate>`,
    `        <atom:link href="${siteBaseUrl()}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items.join('\n'),
    '    </channel>',
    '</rss>',
  ].join('\n')
}

// ── Raw markdown for a single post ───────────────────────────────────────────

/** One post as a standalone markdown document, for /newsroom/<slug>/llms.txt. */
export function buildPostMarkdown(post: NewsroomPost, content: string): string {
  return [
    `# ${post.title}`,
    '',
    `${formatPostDate(post.date)} | ${categoryLabel(post.category)} | By ${post.author}`,
    `Permanent page: ${postUrl(post)}`,
    '',
    post.excerpt,
    '',
    content.trim(),
    '',
    '---',
    '',
    'The 256 Foundation is a 501(c)(3) nonprofit funding open-source Bitcoin mining. [Become a supporter →](/donate)',
  ].join('\n')
}

// ── JSON-LD ──────────────────────────────────────────────────────────────────

/** Organization schema for the site layout. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: SITE_NAME,
    url: siteBaseUrl(),
    logo: `${siteBaseUrl()}/logos/256-logo-horizontal-light.png`,
    description: SITE_SUMMARY,
    foundingDate: '2024-02',
    nonprofitStatus: '501c3',
    sameAs: [
      'https://github.com/256foundation',
      'https://x.com/256FOUNDATION',
      'https://forum.256foundation.org',
      'https://256foundation.substack.com',
    ],
  }
}

/** NewsArticle schema for a newsroom post page. */
export function postJsonLd(post: NewsroomPost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: post.author, url: siteBaseUrl() },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteBaseUrl(),
      logo: { '@type': 'ImageObject', url: `${siteBaseUrl()}/logos/256-logo-horizontal-light.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post) },
    ...(post.ogImage ?? post.coverImage
      ? { image: `${siteBaseUrl()}${post.ogImage ?? post.coverImage}` }
      : {}),
  }
}

/** FAQPage schema for /faq. */
export function faqJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
