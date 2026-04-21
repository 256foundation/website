type BadgeStatus = 'active' | 'completed' | 'paused' | 'in-progress' | 'upcoming'

interface BadgeProps {
  status: BadgeStatus
  className?: string
}

const styles: Record<BadgeStatus, string> = {
  active: 'text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10',
  completed: 'text-gray-400 border-gray-600 bg-gray-800/50',
  paused: 'text-gray-400 border-gray-600 bg-gray-800/50',
  'in-progress': 'text-[#3b1445] dark:text-[#c084d8] border-[#3b1445]/50 dark:border-[#5c2070]/50 bg-[#3b1445]/15 dark:bg-[#5c2070]/20',
  upcoming: 'text-gray-400 border-gray-600/40 bg-gray-800/30',
}

const labels: Record<BadgeStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  paused: 'Paused',
  'in-progress': 'In Progress',
  upcoming: 'Upcoming',
}

export default function Badge({ status, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-mono border',
        styles[status],
        className,
      ].join(' ')}
    >
      {labels[status]}
    </span>
  )
}
