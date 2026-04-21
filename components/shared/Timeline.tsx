interface TimelineItem {
  date: string
  title: string
  description?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative border-l-2 border-[#3b1445]/30 dark:border-[#5c2070]/30 ml-4 space-y-0">
      {items.map((item, i) => (
        <li key={i} className="mb-10 ml-6">
          {/* Dot */}
          <span className="absolute flex items-center justify-center w-4 h-4 rounded-full bg-[#3b1445] -left-[9px] ring-4 ring-white dark:ring-[#1a1a1a]" />

          <div className="bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none p-4 hover:border-[#3b1445]/20 dark:hover:border-[#5c2070]/20 transition-colors">
            <time className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs mb-1 block">{item.date}</time>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm uppercase">{item.title}</h3>
            {item.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1.5 leading-relaxed">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
