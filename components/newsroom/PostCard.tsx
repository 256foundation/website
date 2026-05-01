import Link from 'next/link'
import Image from 'next/image'
import type { NewsroomPost } from '@/types'
import { formatPostDate } from '@/lib/newsroom'

const categoryLabels: Record<NewsroomPost['category'], string> = {
  announcement: 'Announcement',
  mission: 'Mission',
  industry: 'Industry',
  partner: 'Partner',
}

interface PostCardProps {
  post: NewsroomPost
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link
      href={`/newsroom/${post.slug}`}
      className="group flex flex-col bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_24px_rgba(59,20,69,0.1)] transition-all duration-200"
    >
      {post.coverImage && (
        <div className={`relative w-full flex-shrink-0 overflow-hidden ${featured ? 'h-56' : 'h-36'}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-all duration-500"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#242424] via-transparent to-transparent" />
        </div>
      )}
      <div className={`flex flex-col flex-1 ${featured ? 'p-6' : 'p-4'}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs uppercase tracking-widest">
            {categoryLabels[post.category]}
          </span>
          {post.date && (
            <time className="font-mono text-gray-400 text-xs">
              {formatPostDate(post.date)}
            </time>
          )}
        </div>
        <h3 className={`font-display font-bold text-gray-900 dark:text-white uppercase leading-tight group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors ${featured ? 'text-xl mb-3' : 'text-base mb-2'}`}>
          {post.title}
        </h3>
        <p className={`text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mt-auto ${featured ? 'text-sm' : 'text-xs'}`}>
          {post.excerpt}
        </p>
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs mt-3 group-hover:underline">
          Read more →
        </span>
      </div>
    </Link>
  )
}
