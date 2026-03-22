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
    <ol className="relative border-l-2 border-[#7C3AED]/30 ml-4 space-y-0">
      {items.map((item, i) => (
        <li key={i} className="mb-10 ml-6">
          {/* Dot */}
          <span className="absolute flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] -left-[9px] ring-4 ring-[#0a0a0a]" />

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-none p-4 hover:border-[#7C3AED]/20 transition-colors">
            <time className="font-mono text-[#7C3AED] text-xs mb-1 block">{item.date}</time>
            <h3 className="font-display font-bold text-white text-sm uppercase">{item.title}</h3>
            {item.description && (
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
