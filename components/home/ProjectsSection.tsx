import Link from 'next/link'
import { pillarProjects } from '@/data/projects'
import { forumTopicUrl, timeAgo } from '@/lib/discourse'
import type { ForumTopic } from '@/lib/discourse'

interface ProjectsSectionProps {
  forumTopics: ForumTopic[]
}

const typeConfig: Record<string, { label: string; color: string }> = {
  hardware: { label: 'Hardware', color: 'text-[#00FF41] border-[#00FF41]/40' },
  software: { label: 'Software', color: 'text-[#c084d8] border-[#c084d8]/40' },
}

export default function ProjectsSection({ forumTopics }: ProjectsSectionProps) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">
          Funded Projects
        </span>
      </div>
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase">
            The Open-Source Stack
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xl">
            Four core grants building every layer — from silicon to pool software.
          </p>
        </div>
        <Link
          href="/projects"
          className="font-mono text-[#3b1445] dark:text-[#c084d8] text-sm hover:underline whitespace-nowrap transition-colors"
        >
          View all projects →
        </Link>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#1f1f1f]">
        {pillarProjects.map((project) => {
          const logoSrc = project.logo?.icon ?? project.logo?.character
          const type = typeConfig[project.type] ?? typeConfig.software

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group bg-white dark:bg-[#0d0d0d] p-6 flex flex-col gap-4 hover:bg-gray-50 dark:hover:bg-[#161616] transition-colors duration-200 relative overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-10 h-[1px] bg-[#3b1445]/0 group-hover:bg-[#3b1445]/60 dark:group-hover:bg-[#c084d8]/40 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-[1px] h-10 bg-[#3b1445]/0 group-hover:bg-[#3b1445]/60 dark:group-hover:bg-[#c084d8]/40 transition-colors duration-300" />

              {/* Type badge */}
              <span
                className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 self-start ${type.color}`}
              >
                {type.label}
              </span>

              {/* Logo */}
              <div className="h-20 flex items-center justify-center py-2">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={project.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <div className="w-14 h-14 bg-[#3b1445]/10 flex items-center justify-center font-mono text-[#3b1445] dark:text-[#c084d8] font-bold text-xl">
                    {project.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name + tagline */}
              <div className="flex-1">
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors duration-200">
                  {project.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#00FF41]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
                  Active
                </span>
                <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View →
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Forum activity strip */}
      {forumTopics.length > 0 && (
        <div className="border border-t-0 border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#0a0a0a]">
          {/* Strip header */}
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

          {/* Topic rows */}
          <div className="divide-y divide-gray-100 dark:divide-[#141414]">
            {forumTopics.map((topic) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
