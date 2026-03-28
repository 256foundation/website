const projects = [
  {
    name: 'Bitaxe',
    abbr: 'BITAXE',
    logo: '/ecosystem/bitaxe.png',
    logoClass: 'grayscale group-hover:grayscale-0 transition-all duration-500',
    url: 'https://bitaxe.org',
    tagline: 'The first open-source Bitcoin ASIC miner.',
    mission:
      'Bitaxe is the world\'s first fully open-source Bitcoin ASIC miner — open hardware, open firmware, open everything. Anyone can build one, modify it, or manufacture it. Bitaxe devices bring solo Bitcoin mining back to individuals with a device that fits in your hand.',
    why: 'Bitaxe is the embodiment of what the 256 Foundation supports: open-source hardware and software that breaks the proprietary mining monopoly and puts ASIC mining back in the hands of individuals.',
  },
  {
    name: 'Open Source Miners United',
    abbr: 'OSMU',
    logo: '/ecosystem/osmu.png',
    logoClass: 'grayscale group-hover:grayscale-0 transition-all duration-500',
    url: 'https://osmu.wiki',
    tagline: 'The open-source hardware & firmware community.',
    mission:
      'OSMU is a global community of developers and builders creating and modifying open-source Bitcoin mining hardware and software. Projects include Bitaxe, NerdAxe, Bitcrane, AxeOS, Piaxe, Qaxe, and more — fully open designs that anyone can build, change, and improve.',
    why: 'OSMU represents exactly what the 256 Foundation exists to encourage: a decentralized, permissionless community that puts the tools of Bitcoin mining back in the hands of individuals.',
  },
  {
    name: 'Hashrate Heatpunks',
    abbr: 'HEATPUNKS',
    logo: '/ecosystem/heatpunks.png',
    logoClass: 'grayscale group-hover:grayscale-0 transition-all duration-500',
    url: 'https://heatpunks.org',
    tagline: 'Mining heat is a product, not a problem.',
    mission:
      'Hashrate Heatpunks marry the Bitcoin mining and heating sectors to accelerate adoption of hashrate heating — building the standards, education, and infrastructure needed to bring mining back to homes and businesses.',
    why: 'Distributed, utility-based hashrate is one of the most powerful forces for Bitcoin decentralization. Heatpunks tackle the biggest barriers to home mining — wasted heat & profitability — by reframing it as a feature.',
  },
  {
    name: 'Jua Kali Miner',
    abbr: 'JUA KALI',
    logo: '/ecosystem/jua-kali.jpg',
    logoClass: 'grayscale group-hover:grayscale-0 transition-all duration-500',
    url: 'https://github.com/GridlessCompute/Jua-Kali-Miner',
    tagline: 'Open-source mining for direct DC power.',
    mission:
      'Jua Kali — Kiswahili for "hot sun," used in Kenya to mean blue-collar, hard-working craftsmanship — is an open-source project that runs Bitcoin ASIC hashboards directly from DC power sources like solar panels and batteries, no AC grid required.',
    why: 'Most of the world lacks reliable grid power. Jua Kali unlocks stranded energy for Bitcoin mining — enabling off-grid communities to participate in securing the network using direct solar or battery power.',
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
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase leading-tight">
          Community Projects Under Our Umbrella
        </h2>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed">
            The 256 Foundation doesn&apos;t just fund development — it serves as a connective layer
            for the broader open-source Bitcoin mining ecosystem. We&apos;ve brought several community-led
            projects under our organizational umbrella so they have the infrastructure, visibility,
            and support to grow — while remaining fully and community-led.
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.abbr}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#111111] border border-[#1f1f1f] rounded-none hover:border-[#7C3AED]/50 hover:shadow-[0_0_24px_rgba(124,58,237,0.1)] transition-all duration-300"
          >
            {/* Top accent bar */}
            <div className="h-0.5 w-full bg-[#1f1f1f] group-hover:bg-[#7C3AED]/60 transition-colors duration-300" />

            <div className="flex gap-6 p-6">
              {/* Logo — left column */}
              <div className="flex items-start justify-center shrink-0 w-28 pt-1 bg-[#111111]">
                <img
                  src={project.logo}
                  alt={project.name}
                  className={`w-28 h-auto object-contain transition-all duration-500 ${project.logoClass}`}
                  style={{ background: 'transparent' }}
                />
              </div>

              {/* Content — right column */}
              <div className="flex-1 min-w-0">
                {/* Title + arrow */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-display font-bold text-gray-100 text-lg uppercase leading-tight group-hover:text-[#7C3AED] transition-colors">
                      {project.name}
                    </h3>
                    <p className="font-mono text-[#7C3AED] text-xs mt-0.5">{project.tagline}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-[#7C3AED] transition-colors mt-1 shrink-0 ml-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                <div className="border-t border-[#1f1f1f] my-3" />

                {/* Mission */}
                <div className="mb-2">
                  <span className="font-mono text-gray-600 text-xs uppercase tracking-widest block mb-1">Mission</span>
                  <p className="text-gray-500 group-hover:text-gray-300 text-xs leading-relaxed transition-colors duration-200">{project.mission}</p>
                </div>

                {/* Why we support it */}
                <div className="mb-4">
                  <span className="font-mono text-gray-600 text-xs uppercase tracking-widest block mb-1">Why We Support It</span>
                  <p className="text-gray-600 group-hover:text-gray-400 text-xs leading-relaxed transition-colors duration-200">{project.why}</p>
                </div>

              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
