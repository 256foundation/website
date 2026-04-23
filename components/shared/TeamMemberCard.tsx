'use client'

import type { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const profileUrl = member.links.x ?? member.links.nostr ?? member.links.website

  const inner = (
    <>
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="relative w-14 h-14 shrink-0">
          <img
            src={member.headshot}
            alt={member.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-[#1f1f1f] transition-all duration-300"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const sibling = target.nextElementSibling as HTMLElement
              if (sibling) sibling.style.display = 'flex'
            }}
          />
          <div
            className="w-14 h-14 rounded-full bg-gray-200 dark:bg-[#1f1f1f] border border-[#3b1445]/30 dark:border-[#5c2070]/30 items-center justify-center font-mono font-bold text-[#3b1445] dark:text-[#c084d8] text-lg absolute inset-0"
            style={{ display: 'none' }}
          >
            {getInitials(member.name)}
          </div>
        </div>

        {/* Name + role */}
        <div>
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-base uppercase">{member.name}</h3>
          {member.handle && (
            <p className="text-[#3b1445] dark:text-[#c084d8] text-xs font-mono">{member.handle}</p>
          )}
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">{member.role}</p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
    </>
  )

  if (profileUrl) {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6 hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_20px_rgba(59,20,69,0.1)] transition-all duration-200 cursor-pointer"
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="group bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-6">
      {inner}
    </div>
  )
}
