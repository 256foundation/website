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
  }
}

export function getAllPosts(): NewsroomPost[] {
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

export function getLatestPost(): NewsroomPost | null {
  const posts = getAllPosts()
  return posts[0] ?? null
}

export function formatPostDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
