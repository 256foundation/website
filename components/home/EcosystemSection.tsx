const projects = [
  {
    name: 'Open Source Miners United',
    abbr: 'OSMU',
    url: 'https://osmu.wiki',
    tagline: 'The open-source hardware & firmware community.',
    mission:
      'OSMU is a global community of developers and builders creating open-source Bitcoin mining hardware and software. Projects under the OSMU umbrella include Bitaxe, NerdAxe, Bitcrane, AxeOS, Piaxe, Qaxe, and more — a growing ecosystem of fully open designs that anyone can build, modify, and improve.',
    why: 'OSMU represents exactly what the 256 Foundation exists to support: a decentralized, permissionless community that puts the tools of Bitcoin mining back in the hands of individuals. Bringing OSMU under our umbrella gives the community access to organizational infrastructure, funding pathways, and coordination support while keeping it fully community-led.',
    tags: ['Hardware', 'Firmware', 'Community'],
    accent: '#7C3AED',
  },
  {
    name: 'Hashrate Heatpunks',
    abbr: 'HEATPUNKS',
    url: 'https://heatpunks.org',
    tagline: 'Mining heat is a product, not a problem.',
    mission:
      'Hashrate Heatpunks unites the Bitcoin mining community with the heating sector. Their mission is to normalize home and small-scale mining by pairing hashrate with heat recapture — turning energy that would be wasted into something useful. They build tools, share knowledge, and grow the community of people running miners in homes, garages, and small businesses.',
    why: 'Mining at home is one of the most powerful forces for Bitcoin decentralization. Heatpunks tackles the biggest barrier to home mining — wasted heat — by reframing it as a feature. The 256 Foundation supports this mission because distributed, home-based hashrate is exactly what the open mining stack we fund is built for.',
    tags: ['Home Mining', 'Heat Recapture', 'Decentralization'],
    accent: '#00FF41',
  },
]

export default function EcosystemSection() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#7C3AED]" />
        <span className="font-mono text-[#7C3AED] text-xs tracking-[0.2em] uppercase">Ecosystem</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <h2 className="font-display font-bold text-white text-2xl sm:text-3xl uppercase leading-tight">
          Community Projects Under Our Umbrella
        </h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed">
            The 256 Foundation doesn&apos;t just fund development — it serves as a connective layer
            for the broader open-source Bitcoin mining ecosystem. We&apos;ve brought two community-led
            projects under our organizational umbrella so they have the infrastructure, visibility,
            and support to grow — while remaining fully community-owned and community-led.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            These projects share our conviction that Bitcoin&apos;s mining layer must be open,
            distributed, and accessible to anyone. Together, we&apos;re building the full stack —
            from the chips and boards, to the firmware and pool software, to the homes and
            businesses running miners around the world.
          </p>
        </div>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.abbr}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#111111] border border-[#1f1f1f] rounded-none hover:border-[#7C3AED]/50 hover:shadow-[0_0_24px_rgba(124,58,237,0.1)] transition-all duration-200"
          >
            {/* Top bar */}
            <div className="h-0.5 w-full bg-[#1f1f1f] group-hover:bg-[#7C3AED]/60 transition-colors duration-300" />

            <div className="p-6">
              {/* Name + external arrow */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-1">
                    {project.abbr}
                  </span>
                  <h3 className="font-display font-bold text-white text-xl uppercase leading-tight group-hover:text-[#7C3AED] transition-colors">
                    {project.name}
                  </h3>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-[#7C3AED] transition-colors mt-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              {/* Tagline */}
              <p className="font-mono text-[#7C3AED] text-xs mb-4">{project.tagline}</p>

              {/* Divider */}
              <div className="border-t border-[#1f1f1f] mb-4" />

              {/* Mission */}
              <div className="mb-4">
                <span className="font-mono text-gray-600 text-xs uppercase tracking-widest block mb-1.5">Mission</span>
                <p className="text-gray-400 text-sm leading-relaxed">{project.mission}</p>
              </div>

              {/* Why we support it */}
              <div className="mb-5">
                <span className="font-mono text-gray-600 text-xs uppercase tracking-widest block mb-1.5">Why We Support It</span>
                <p className="text-gray-500 text-sm leading-relaxed">{project.why}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 bg-[#0a0a0a] border border-[#1f1f1f] text-gray-500 group-hover:border-[#7C3AED]/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
