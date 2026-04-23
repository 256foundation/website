import type { Milestone } from '@/types'

interface Props {
  milestones: Milestone[]
}

function dotClass(status: Milestone['status']) {
  if (status === 'completed') return 'bg-[#3b1445] border-[#3b1445]'
  if (status === 'active') return 'bg-transparent border-[#3b1445] animate-pulse-ring'
  return 'bg-transparent border-gray-400 dark:border-gray-600'
}

function labelClass(status: Milestone['status']) {
  if (status === 'completed') return 'text-[#3b1445] dark:text-[#c084d8]'
  if (status === 'active') return 'text-gray-900 dark:text-white'
  return 'text-gray-500'
}

export default function MilestoneTracker({ milestones }: Props) {
  return (
    <div className="w-full">

      {/* ── Mobile: vertical timeline (hidden on sm+) ── */}
      <div className="flex flex-col sm:hidden">
        {milestones.map((milestone, idx) => {
          const isLast = idx === milestones.length - 1
          return (
            <div key={idx} className="flex gap-4">
              {/* Left rail: dot + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5 ${dotClass(milestone.status)}`} />
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 min-h-[28px] mt-1 ${
                      milestone.status === 'completed' ? 'bg-[#3b1445]' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
              {/* Content */}
              <div className={`pb-5 ${isLast ? 'pb-0' : ''}`}>
                <p className={`font-mono text-xs leading-tight ${labelClass(milestone.status)}`}>
                  {milestone.label}
                </p>
                {milestone.date && (
                  <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {milestone.date}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Desktop: horizontal scrollable timeline (hidden on mobile) ── */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="flex items-start min-w-max">
          {milestones.map((milestone, idx) => {
            const isLast = idx === milestones.length - 1
            return (
              <div key={idx} className="flex items-start">
                {/* Step */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${dotClass(milestone.status)}`} />
                  <div className="mt-3 text-center max-w-[100px]">
                    <p className={`font-mono text-xs leading-tight ${labelClass(milestone.status)}`}>
                      {milestone.label}
                    </p>
                    {milestone.date && (
                      <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {milestone.date}
                      </p>
                    )}
                  </div>
                </div>
                {/* Connector */}
                {!isLast && (
                  <div className="flex items-center mt-[7px] mx-1">
                    <div
                      className={`h-[2px] w-8 sm:w-12 ${
                        milestone.status === 'completed' ? 'bg-[#3b1445]' : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
