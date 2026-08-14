import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NewsroomPost } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content/newsroom')

function readAllFiles(): { slug: string; data: Record<string, unknown>; content: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug, data, content }
    })
}

function toPost(slug: string, data: Record<string, unknown>): NewsroomPost {
  return {
    slug,
    title: String(data.title ?? ''),
    date: String(data.date ?? ''),
    author: String(data.author ?? '256 Foundation'),
    category: (data.category as NewsroomPost['category']) ?? 'announcement',
    excerpt: String(data.excerpt ?? ''),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    featured: data.featured === true,
  }
}

/**
 * Featured posts sort first, then everything by date descending. Without a
 * featured post this is identical to plain date-descending order.
 *
 * Mirrored by tests/newsroom-featured.test.mjs — keep the two in step.
 */
export function comparePosts(a: NewsroomPost, b: NewsroomPost): number {
  const aFeatured = a.featured === true
  const bFeatured = b.featured === true
  if (aFeatured !== bFeatured) return aFeatured ? -1 : 1
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

export function getAllPosts(): NewsroomPost[] {
  return readAllFiles()
    .map(({ slug, data }) => toPost(slug, data))
    .sort(comparePosts)
}

export function getPostBySlug(slug: string): { meta: NewsroomPost; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { meta: toPost(slug, data), content }
}

/** Prefers a featured post so it holds the home-page slot; otherwise the newest. */
export function getLatestPost(): NewsroomPost | null {
  const posts = getAllPosts()
  return posts.find((post) => post.featured === true) ?? posts[0] ?? null
}

/**
 * Renders a frontmatter date exactly as written, in every timezone.
 *
 * `new Date('2026-08-14')` parses a date-only string as UTC midnight, so
 * formatting it in the viewer's local zone shifts it a day earlier anywhere
 * west of UTC. Formatting in UTC pins it back to the authored calendar date.
 *
 * Mirrored by tests/newsroom-date.test.mjs — keep the two in step.
 */
export function formatPostDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  } catch {
    return dateStr
  }
}
