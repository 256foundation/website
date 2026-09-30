import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NewsroomPost } from '@/types'
import {
  GRANT_ANNOUNCEMENT_CATEGORY,
  isNewsroomCategory,
} from '@/lib/newsroomMeta'

// Re-exported so server code can keep importing everything from this one module.
export {
  NEWSROOM_CATEGORIES,
  GRANT_ANNOUNCEMENT_CATEGORY,
  categoryLabel,
  formatPostDate,
} from '@/lib/newsroomMeta'

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
    // Validated, not cast — a typo'd category used to fall through silently.
    // An unrecognized value lands in the neutral news bucket rather than
    // misfiling a grant announcement into the grants log.
    category: isNewsroomCategory(data.category) ? data.category : 'foundation-news',
    excerpt: String(data.excerpt ?? ''),
    project: data.project ? String(data.project) : undefined,
    program: data.program === 'core' || data.program === 'general' ? data.program : undefined,
    term: data.term ? String(data.term) : undefined,
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

/**
 * Every post, newest first, ignoring the `featured` pin. The newsroom index
 * uses this so a featured post does not jump ahead of a newer one there:
 * `featured` is a home-page-slot concern only.
 */
export function getAllPostsByDate(): NewsroomPost[] {
  return readAllFiles()
    .map(({ slug, data }) => toPost(slug, data))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
 * Funding announcements, newest first, for the grants-page log and its
 * archive. Sorted by date alone rather than reusing `getAllPosts()`, whose
 * order pins `featured` posts to the top — a featured announcement should not
 * jump ahead of a newer one in the log.
 */
export function getGrantAnnouncements(limit?: number): NewsroomPost[] {
  const posts = getAllPosts()
    .filter((post) => post.category === GRANT_ANNOUNCEMENT_CATEGORY)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return typeof limit === 'number' ? posts.slice(0, limit) : posts
}
