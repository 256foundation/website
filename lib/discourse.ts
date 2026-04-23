export interface ForumTopic {
  id: number
  title: string
  slug: string
  postsCount: number
  replyCount: number
  lastPostedAt: string
}

const FORUM_BASE = 'https://forum.256foundation.org'

export async function fetchForumTopics(count = 6): Promise<ForumTopic[]> {
  try {
    const res = await fetch(`${FORUM_BASE}/latest.json`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return []
    const data = await res.json()
    const topics: unknown[] = data?.topic_list?.topics ?? []

    return (topics as Record<string, unknown>[])
      .filter(
        (t) =>
          !t.pinned &&
          !t.pinned_globally &&
          !(t.slug as string).includes('about-the-'),
      )
      .slice(0, count)
      .map((t) => ({
        id: t.id as number,
        title: t.title as string,
        slug: t.slug as string,
        postsCount: t.posts_count as number,
        replyCount: t.reply_count as number,
        lastPostedAt: t.last_posted_at as string,
      }))
  } catch {
    return []
  }
}

export function forumTopicUrl(slug: string, id: number): string {
  return `${FORUM_BASE}/t/${slug}/${id}`
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}
