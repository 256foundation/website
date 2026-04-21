import type { Milestone } from '@/types'

interface Props {
  milestones: Milestone[]
}

export default function MilestoneTracker({ milestones }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start min-w-max">
        {milestones.map((milestone, idx) => {
          const isLast = idx === milestones.length - 1
          const isCompleted = milestone.status === 'completed'
          const isActive = milestone.status === 'active'

          return (
            <div key={idx} className="flex items-start">
              {/* Step */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={[
                    'w-4 h-4 rounded-full border-2 flex-shrink-0',
                    isCompleted
                      ? 'bg-[#3b1445] border-[#3b1445]'
                      : isActive
                        ? 'bg-transparent border-[#3b1445] animate-pulse-ring'
                        : 'bg-transparent border-gray-400 dark:border-gray-600',
                  ].join(' ')}
                />
                {/* Label */}
                <div className="mt-3 text-center max-w-[100px]">
                  <p className={[
                    'font-mono text-xs leading-tight',
                    isCompleted ? 'text-[#3b1445] dark:text-[#c084d8]' : isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500',
                  ].join(' ')}>
                    {milestone.label}
                  </p>
                  {milestone.date && (
                    <p className="font-mono text-[10px] text-gray-500 dark:text-gray-600 mt-0.5">{milestone.date}</p>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex items-center mt-[7px] mx-1">
                  <div
                    className={[
                      'h-[2px] w-8 sm:w-12',
                      isCompleted ? 'bg-[#3b1445]' : 'bg-gray-300 dark:bg-gray-700',
                    ].join(' ')}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
