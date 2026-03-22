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
            className="w-14 h-14 rounded-full object-cover border border-[#1f1f1f] grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const sibling = target.nextElementSibling as HTMLElement
              if (sibling) sibling.style.display = 'flex'
            }}
          />
          <div
            className="w-14 h-14 rounded-full bg-[#1f1f1f] border border-[#7C3AED]/30 items-center justify-center font-mono font-bold text-[#7C3AED] text-lg absolute inset-0"
            style={{ display: 'none' }}
          >
            {getInitials(member.name)}
          </div>
        </div>

        {/* Name + role */}
        <div>
          <h3 className="font-display font-bold text-white text-base uppercase">{member.name}</h3>
          {member.handle && (
            <p className="text-[#7C3AED] text-xs font-mono">{member.handle}</p>
          )}
          <p className="text-gray-400 text-xs mt-0.5">{member.role}</p>
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
    </>
  )

  if (profileUrl) {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-[#111111] border border-[#1f1f1f] rounded-none p-6 hover:border-[#7C3AED]/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-200 cursor-pointer"
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="group bg-[#111111] border border-[#1f1f1f] rounded-none p-6">
      {inner}
    </div>
  )
}
