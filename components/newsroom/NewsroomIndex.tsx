'use client'

import { useState } from 'react'
import type { NewsroomPost } from '@/types'
import { NEWSROOM_CATEGORIES, categoryLabel } from '@/lib/newsroomMeta'
import PostCard from '@/components/newsroom/PostCard'

interface NewsroomIndexProps {
  posts: NewsroomPost[]
}

type Filter = NewsroomPost['category'] | 'all'

/**
 * Client-side category filter over the newsroom list. Posts arrive already
 * sorted newest-first from the server, so filtering preserves that order. Only
 * categories that actually have posts get a chip, so the bar stays honest as
 * the taxonomy grows.
 */
export default function NewsroomIndex({ posts }: NewsroomIndexProps) {
  const [active, setActive] = useState<Filter>('all')

  const categories = NEWSROOM_CATEGORIES.filter((category) =>
    posts.some((post) => post.category === category),
  )
  const visible = active === 'all' ? posts : posts.filter((post) => post.category === active)

  if (posts.length === 0) {
    return <p className="text-gray-500 text-sm">No posts yet. Check back soon.</p>
  }

  const chipClass = (isActive: boolean) =>
    [
      'px-3 py-1.5 rounded-none font-mono text-xs uppercase tracking-wider border transition-colors',
      isActive
        ? 'bg-[#3b1445] text-white border-[#3b1445] dark:bg-[#c084d8] dark:text-[#1a1a1a] dark:border-[#c084d8]'
        : 'border-gray-300 dark:border-[#3f3f3f] text-gray-500 dark:text-gray-400 hover:border-[#3b1445] dark:hover:border-[#c084d8] hover:text-[#3b1445] dark:hover:text-[#c084d8]',
    ].join(' ')

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
          className={chipClass(active === 'all')}
        >
          All <span className="opacity-60">{posts.length}</span>
        </button>
        {categories.map((category) => {
          const count = posts.filter((post) => post.category === category).length
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={chipClass(active === category)}
            >
              {categoryLabel(category)} <span className="opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
