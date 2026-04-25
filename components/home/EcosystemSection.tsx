type EcosystemProject = {
  name: string
  abbr: string
  logo?: string
  logoDark?: string
  logoLight?: string
  logoClass: string
  url: string
  githubUrl?: string
  tagline: string
  mission: string
  why: string
}

const projects: EcosystemProject[] = [
  {
    name: 'Bitaxe',
    abbr: 'BITAXE',
    logo: '/ecosystem/bitaxe.png',
    logoClass: 'transition-all duration-500',
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
    logoClass: 'transition-all duration-500',
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
    logoClass: 'transition-all duration-500',
    url: 'https://heatpunks.org',
    tagline: 'Mining heat is a product, not a problem.',
    mission:
      'Hashrate Heatpunks marry the Bitcoin mining and heating sectors to accelerate adoption of hashrate heating — building the standards, education, and infrastructure needed to bring mining back to homes and businesses.',
    why: 'Distributed, utility-based hashrate is one of the most powerful forces for Bitcoin decentralization. Heatpunks tackle the biggest barriers to home mining — wasted heat & profitability — by reframing it as a feature.',
  },
  {
    name: 'Jua Kali',
    abbr: 'JUA KALI',
    logo: '/ecosystem/jua-kali.jpg',
    logoClass: 'transition-all duration-500',
    url: 'https://github.com/GridlessCompute/Jua-Kali-Miner',
    tagline: 'Open-source mining for direct DC power.',
    mission:
      'Jua Kali — Kiswahili for "hot sun," used in Kenya to mean blue-collar, hard-working craftsmanship — is an open-source project that runs Bitcoin ASIC hashboards directly from DC power sources like solar panels and batteries, no AC grid required.',
    why: 'Most of the world lacks reliable grid power. Jua Kali unlocks stranded energy for Bitcoin mining — enabling off-grid communities to participate in securing the network using direct solar or battery power.',
  },
  {
    name: 'ASIC-rs',
    abbr: 'ASIC-RS',
    logoDark: '/ecosystem/ASIC_RS_square_dark.png',
    logoLight: '/ecosystem/ASIC_RS_square_light.png',
    logoClass: 'transition-all duration-500',
    url: 'https://docs.rs/asic-rs/latest/asic_rs/index.html',
    tagline: 'Open-source Rust library for Bitcoin ASIC communication.',
    mission:
      'ASIC-rs is an open-source Rust library for communicating with Bitcoin mining ASICs. It standardizes the low-level protocol interface so firmware developers can build miner software without reverse-engineering proprietary hardware layers.',
    why: 'A well-documented, openly licensed library for speaking to ASICs is a critical missing piece in the open mining stack. ASIC-rs fills that gap — enabling Mujina and future open firmware projects to run without closed dependencies.',
  },
  {
    name: 'HashScope',
    abbr: 'HASHSCOPE',
    logoDark: '/ecosystem/Hashscope_square_dark.png',
    logoLight: '/ecosystem/Hashscope_square_light.png',
    logoClass: 'transition-all duration-500',
    url: 'https://github.com/256foundation/HashScope',
    tagline: 'Open-source Bitcoin mining protocol analyzer and pool testing platform.',
    mission:
      'HashScope sits transparently between miners and pools, capturing every Stratum v1 message in real time. It parses JSON-RPC traffic, tracks sessions, and distributes share events to a scalable agent fleet via Nostr — providing a complete picture of how mining pools actually behave.',
    why: 'You cannot improve what you cannot measure. HashScope gives the open-source mining community a dedicated tool for auditing pool behavior and exposing protocol-level issues — without depending on proprietary observability software.',
  },
]

export default function EcosystemSection() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-[#3b1445]" />
        <span className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs tracking-[0.2em] uppercase">Ecosystem</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl sm:text-3xl uppercase leading-tight">
          Community Projects Under Our Umbrella
        </h2>
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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
            className="group block bg-gray-50 dark:bg-[#242424] border border-gray-200 dark:border-[#1f1f1f] rounded-none hover:border-[#3b1445]/50 dark:hover:border-[#5c2070]/50 hover:shadow-[0_0_24px_rgba(59,20,69,0.1)] transition-all duration-300"
          >
            {/* Top accent bar */}
            <div className="h-0.5 w-full bg-gray-200 dark:bg-[#1f1f1f] group-hover:bg-[#3b1445]/60 transition-colors duration-300" />

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6">
              {/* Logo — top on mobile, left column on sm+ */}
              <div className="flex items-center sm:items-start justify-start sm:justify-center shrink-0 sm:w-28 sm:pt-1">
                {project.logoDark && project.logoLight ? (
                  <picture className={project.logoClass}>
                    <source media="(prefers-color-scheme: dark)" srcSet={project.logoDark} />
                    <img
                      src={project.logoLight}
                      alt={project.name}
                      className="w-16 h-16 sm:w-28 sm:h-auto object-contain"
                      style={{ background: 'transparent' }}
                    />
                  </picture>
                ) : (
                  <img
                    src={project.logo}
                    alt={project.name}
                    className={`w-16 h-16 sm:w-28 sm:h-auto object-contain transition-all duration-500 ${project.logoClass}`}
                    style={{ background: 'transparent' }}
                  />
                )}
              </div>

              {/* Content — full width on mobile, right column on sm+ */}
              <div className="flex-1 min-w-0">
                {/* Title + arrow */}
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-display font-bold text-gray-800 dark:text-gray-100 text-lg uppercase leading-tight group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors">
                      {project.name}
                    </h3>
                    <p className="font-mono text-[#3b1445] dark:text-[#c084d8] text-xs mt-0.5">{project.tagline}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-600 group-hover:text-[#3b1445] dark:group-hover:text-[#c084d8] transition-colors mt-1 shrink-0 ml-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                <div className="border-t border-gray-200 dark:border-[#1f1f1f] my-3" />

                {/* Mission */}
                <div className="mb-2">
                  <span className="font-mono text-gray-500 dark:text-gray-500 text-xs uppercase tracking-widest block mb-1">Mission</span>
                  <p className="text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 text-xs leading-relaxed transition-colors duration-200">{project.mission}</p>
                </div>

                {/* Why we support it */}
                <div className="mb-4">
                  <span className="font-mono text-gray-500 dark:text-gray-500 text-xs uppercase tracking-widest block mb-1">Why We Support It</span>
                  <p className="text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 text-xs leading-relaxed transition-colors duration-200">{project.why}</p>
                </div>

                {/* GitHub link (only for projects with a separate repo URL) */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 border border-gray-300 dark:border-[#3f3f3f] text-gray-600 dark:text-gray-400 rounded-none hover:border-[#3b1445] dark:hover:border-[#5c2070] hover:text-[#3b1445] dark:hover:text-[#c084d8] transition-all duration-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
