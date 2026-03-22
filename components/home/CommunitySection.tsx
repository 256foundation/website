import ExternalLink from '@/components/ui/ExternalLink'

const communities = [
  {
    label: 'Forum',
    description: 'Technical discussion & support',
    href: 'https://forum.256foundation.org',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    description: 'Real-time community chat',
    href: 'https://t.me/the256foundation',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    description: 'News & announcements',
    href: 'https://x.com/256FOUNDATION',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Nostr',
    description: 'Censorship-resistant feed',
    href: 'https://primal.net/p/nprofile1qqsqhk42dz0exfcsln4yqmdkjys0nvd7dqndgacpsa7w7pt7njq2uuss2u9cq',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    description: 'Source code & contributions',
    href: 'https://github.com/256foundation',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
]

export default function CommunitySection() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-4 bg-[#7C3AED]" />
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.2em] uppercase">Community</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3">
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl leading-tight uppercase">
            Join the<br />Network
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Connect with builders, miners, and advocates worldwide.
          </p>
        </div>

        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {communities.map((c) => (
              <ExternalLink
                key={c.label}
                href={c.href}
                className="group flex items-start gap-4 p-5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-none hover:border-[#7C3AED]/40 hover:bg-[#111111] transition-all duration-200"
              >
                <div className="text-gray-500 group-hover:text-[#7C3AED] transition-colors mt-0.5 flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-sm group-hover:text-[#7C3AED] transition-colors">
                    {c.label}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{c.description}</div>
                </div>
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
