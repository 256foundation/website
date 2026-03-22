type BadgeStatus = 'active' | 'completed' | 'paused' | 'in-progress' | 'upcoming'

interface BadgeProps {
  status: BadgeStatus
  className?: string
}

const styles: Record<BadgeStatus, string> = {
  active: 'text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10',
  completed: 'text-gray-400 border-gray-600 bg-gray-800/50',
  paused: 'text-gray-400 border-gray-600 bg-gray-800/50',
  'in-progress': 'text-[#7C3AED] border-[#7C3AED]/40 bg-[#7C3AED]/10',
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
