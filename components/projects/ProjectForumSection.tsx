import type { ForumTopic } from '@/lib/discourse'
import { forumTopicUrl, timeAgo } from '@/lib/discourse'

interface Props {
  topics: ForumTopic[]
  categoryUrl: string
}

export default function ProjectForumSection({ topics, categoryUrl }: Props) {
  return (
    <section className="bg-gray-50 dark:bg-[#242424] border-y border-gray-200 dark:border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full bg-[#00FF41] shrink-0"
              style={{ boxShadow: '0 0 6px #00FF41' }}
            />
            <span className="font-mono text-xs tracking-widest uppercase text-gray-600 dark:text-gray-400">
              Community Discussions
            </span>
          </div>
          <a
            href={categoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#3b1445] dark:text-[#c084d8] hover:underline transition-colors"
          >
            View all on Forum →
          </a>
        </div>

        {/* Topic list */}
        {topics.length === 0 ? (
          <div className="border border-gray-200 dark:border-[#1f1f1f] p-6 text-center">
            <p className="font-mono text-xs text-gray-400 dark:text-gray-600">
              No discussions yet —{' '}
              <a
                href={categoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
              >
                be the first to post →
              </a>
            </p>
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-[#1f1f1f] divide-y divide-gray-200 dark:divide-[#1f1f1f]">
            {topics.map((topic) => (
              <a
                key={topic.id}
                href={forumTopicUrl(topic.slug, topic.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 sm:p-5 hover:bg-white dark:hover:bg-[#2a2a2a] transition-colors group"
              >
                {/* Thumbnail — shown when image is available */}
                {topic.imageUrl && (
                  <img
                    src={topic.imageUrl}
                    alt=""
                    className="w-16 h-16 object-cover shrink-0 border border-gray-200 dark:border-[#1f1f1f]"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase leading-snug group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors mb-1.5">
                    {topic.title}
                  </h3>
                  {topic.excerpt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-2">
                      {topic.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 font-mono text-xs text-gray-400 dark:text-gray-600">
                    <span>{topic.replyCount} {topic.replyCount === 1 ? 'reply' : 'replies'}</span>
                    <span>&middot;</span>
                    <span>{timeAgo(topic.lastPostedAt)}</span>
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  className="w-3.5 h-3.5 shrink-0 mt-1 text-gray-300 dark:text-gray-700 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
