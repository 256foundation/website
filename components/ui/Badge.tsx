import type { ReactNode } from 'react'

type BadgeStatus =
  | 'active'
  | 'completed'
  | 'paused'
  | 'in-progress'
  | 'upcoming'
  | 'online'
  | 'in-person'
  | 'block-found'
  | 'closed'

interface BadgeProps {
  status: BadgeStatus
  className?: string
  /** Override the default label. */
  children?: ReactNode
}

const styles: Record<BadgeStatus, string> = {
  active: 'text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10',
  completed: 'text-gray-400 border-gray-600 bg-gray-800/50',
  paused: 'text-gray-400 border-gray-600 bg-gray-800/50',
  'in-progress': 'text-[#3b1445] dark:text-[#c084d8] border-[#3b1445]/50 dark:border-[#5c2070]/50 bg-[#3b1445]/15 dark:bg-[#5c2070]/20',
  upcoming: 'text-gray-400 border-gray-600/40 bg-gray-800/30',
  online: 'text-[#3b1445] dark:text-[#c084d8] border-[#3b1445]/50 dark:border-[#5c2070]/50 bg-[#3b1445]/10 dark:bg-[#5c2070]/20',
  'in-person': 'text-[#3b1445] dark:text-[#c084d8] border-[#3b1445]/50 dark:border-[#5c2070]/50 bg-[#3b1445]/10 dark:bg-[#5c2070]/20',
  'block-found': 'text-[#3b1445] dark:text-[#c084d8] border-[#3b1445]/50 dark:border-[#5c2070]/50 bg-[#3b1445]/10 dark:bg-[#5c2070]/20',
  closed: 'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-[#3f3f3f] bg-transparent',
}

const labels: Record<BadgeStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  paused: 'Paused',
  'in-progress': 'In Progress',
  upcoming: 'Upcoming',
  online: 'Online',
  'in-person': 'In Person',
  'block-found': 'Block Found!',
  closed: 'Closed',
}

export default function Badge({ status, className = '', children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border',
        styles[status],
        className,
      ].join(' ')}
    >
      {children ?? labels[status]}
    </span>
  )
}
