import ExternalLink from '@/components/ui/ExternalLink'

interface Props {
  name: string
  description: string
  url: string
  tags: string[]
}

export default function EcosystemCard({ name, description, url, tags }: Props) {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-none p-5 hover:border-[#7C3AED]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-display font-bold text-white uppercase">{name}</h3>
        <ExternalLink href={url} className="text-gray-500 hover:text-[#7C3AED] transition-colors ml-2 flex-shrink-0" aria-label={`Visit ${name}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </ExternalLink>
      </div>
      <p className="text-gray-400 text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded-none bg-[#0a0a0a] border border-[#1f1f1f] text-gray-500">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
