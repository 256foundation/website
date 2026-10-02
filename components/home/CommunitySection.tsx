import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'
import HeroScrim from '@/components/ui/HeroScrim'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import { forumTopicUrl, timeAgo } from '@/lib/discourse'
import type { ForumTopic } from '@/lib/discourse'
import type { GitHubEvent } from '@/lib/github'

const eventTypeLabel: Record<string, string> = {
  PushEvent: 'push',
  PullRequestEvent: 'PR',
  PullRequestReviewEvent: 'review',
  IssuesEvent: 'issue',
  ReleaseEvent: 'release',
  CreateEvent: 'create',
}

interface CommunitySectionProps {
  forumTopics: ForumTopic[]
  orgEvents?: GitHubEvent[]
}

/**
 * Community beat: a full-bleed photo making the group real, then the live
 * forum + GitHub strips that show it working. One primary destination,
 * /community.
 */
export default function CommunitySection({ forumTopics, orgEvents = [] }: CommunitySectionProps) {
  return (
    <>
      {/* Photo strip */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <Image
          src="/community/hero-01.webp"
          alt="The 256 Foundation community at work"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <HeroScrim />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow onDark className="mb-5">
              Community
            </Eyebrow>
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl lg:text-4xl uppercase leading-tight">
              A community, in code and out of it.
            </h2>
            <p className="mt-4 text-gray-200 text-base sm:text-lg leading-relaxed max-w-xl">
              The forum is where the work gets argued out. The group chat is where it starts.
              Builders, miners, and advocates, worldwide.
            </p>
            <div className="mt-7">
              <Button variant="onDark" size="lg" href="/community">
                Join the community →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live activity strips */}
      <SectionWrapper size="tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forum */}
          <div className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#1a1a1a]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-[#1f1f1f]">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"
                  style={{ boxShadow: '0 0 6px #00FF41' }}
                />
                <span className="font-mono text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest">
                  Live Forum Activity
                </span>
              </div>
              <a
                href="https://forum.256foundation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline transition-colors"
              >
                Visit Forum →
              </a>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-[#141414]">
              {forumTopics.length === 0 ? (
                <div className="px-5 py-3">
                  <span className="font-mono text-gray-400 dark:text-gray-600 text-xs">
                    No recent topics.
                  </span>
                </div>
              ) : (
                forumTopics.map((topic) => (
                  <a
                    key={topic.id}
                    href={forumTopicUrl(topic.slug, topic.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-2.5 hover:bg-white dark:hover:bg-[#111] transition-colors group"
                  >
                    <span className="flex-1 font-mono text-gray-700 dark:text-gray-300 text-xs truncate group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors min-w-0">
                      {topic.title}
                    </span>
                    <span className="font-mono text-gray-400 dark:text-gray-600 text-xs whitespace-nowrap shrink-0">
                      {topic.replyCount} {topic.replyCount === 1 ? 'reply' : 'replies'}
                    </span>
                    <span className="font-mono text-gray-400 dark:text-gray-600 text-xs whitespace-nowrap shrink-0 w-14 text-right">
                      {timeAgo(topic.lastPostedAt)}
                    </span>
                  </a>
                ))
              )}
            </div>
          </div>

          {/* GitHub */}
          <div className="border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#1a1a1a]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-[#1f1f1f]">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#00FF41]"
                  style={{ boxShadow: '0 0 6px #00FF41' }}
                />
                <span className="font-mono text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest">
                  Live GitHub Activity
                </span>
              </div>
              <a
                href="https://github.com/256foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs hover:underline transition-colors"
              >
                View org →
              </a>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-[#141414]">
              {orgEvents.length === 0 ? (
                <div className="px-5 py-3">
                  <span className="font-mono text-gray-400 dark:text-gray-600 text-xs">
                    No recent activity.{' '}
                    <a
                      href="https://github.com/256foundation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b1445] dark:text-[#c084d8] hover:underline"
                    >
                      View on GitHub →
                    </a>
                  </span>
                </div>
              ) : (
                orgEvents.map((event) => (
                  <a
                    key={event.id}
                    href={event.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-white dark:hover:bg-[#111] transition-colors group"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border border-[#3b1445]/30 dark:border-[#5c2070]/40 text-[#3b1445] dark:text-[#c084d8] shrink-0">
                      {eventTypeLabel[event.type] ?? event.type}
                    </span>
                    <span className="font-mono text-gray-400 dark:text-gray-600 text-xs shrink-0">
                      {event.repo}
                    </span>
                    <span className="flex-1 font-mono text-gray-700 dark:text-gray-300 text-xs truncate group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors min-w-0">
                      {event.description}
                    </span>
                    <span className="font-mono text-gray-400 dark:text-gray-600 text-xs whitespace-nowrap shrink-0 w-14 text-right">
                      {timeAgo(event.createdAt)}
                    </span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
