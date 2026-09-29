import type { PillarProject } from '@/types'

/**
 * The four layers of the open mining stack, ordered silicon → pool:
 * hash board, control board, firmware, pool. Each entry backs one section of
 * /projects ("Open Mining Stack"). Kept intentionally lean — the standalone
 * deep-dive pages were retired in favor of each project's dedicated site.
 */
export const pillarProjects: PillarProject[] = [
  {
    slug: 'ember-one',
    type: 'hardware',
    name: 'Ember One',
    tagline: 'Open-source Bitcoin mining hash board reference design',
    description:
      'A fully open-source hardware reference design for a Bitcoin mining hash board — the foundational blueprint that miners, researchers, and companies can build upon.',
    whyNecessary:
      'A single hardware company has held near-total control over mining hash board designs for years, blocking innovation and keeping every other layer dependent on closed hardware. Ember One breaks that grip with a fully documented, CERN-OHL-S-2.0 reference design that anyone can manufacture, modify, or build on.',
    keySpecs: [
      { label: 'Power', value: '~100W' },
      { label: 'Input Voltage', value: '12–24V DC' },
      { label: 'Form Factor', value: '125×125mm' },
      { label: 'License', value: 'CERN-OHL-S-2.0' },
    ],
    keyFeatures: [
      'Bitmain BM1362 ASIC',
      'USB-C data interface',
      'Integrated temperature sensors',
      'Native Libre Board + Mujina compatibility',
      'Open PCB design files',
    ],
    architect: { name: 'Skot', handle: '@skot9000', x: 'https://x.com/skot9000' },
    status: 'active',
    externalUrl: 'https://emberone.org',
    githubUrl: 'https://github.com/256foundation/emberone00-pcb',
    forumCategory: 'https://forum.256foundation.org/c/ember-one',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/ember-one/5.json',
    logo: {
      icon: '/projects/ember-one-hashboard.png',
    },
  },
  {
    slug: 'libre-board',
    type: 'hardware',
    name: 'Libre Board',
    tagline: 'Open-source Bitcoin miner control board',
    description:
      'An open-source hardware control board that runs full Linux and Mujina firmware — enabling custom mining setups from pool mining to hashrate heating and solar-powered mining.',
    whyNecessary:
      'Control boards are the brain of any miner, and every existing one is a proprietary black box. Libre Board is the open bridge between open firmware and open hash board hardware, unlocking hashrate heating rigs, solar controllers, Home Assistant integration, and fully custom mining appliances.',
    keySpecs: [
      { label: 'Input Voltage', value: '12–24V DC' },
      { label: 'Compute', value: 'CM5 / RISC-V / ARM' },
      { label: 'Storage', value: 'NVME' },
      { label: 'License', value: 'CERN-OHL-S' },
    ],
    keyFeatures: [
      'Runs full Linux, not just firmware',
      'Bitcoin full node + local Stratum server',
      'RPi 40-pin header, GPIO, fan connectors',
      'Ethernet, WiFi, HDMI, NVME',
      'Native Mujina firmware',
    ],
    architect: { name: 'Schnitzel', handle: '@Schnitzel', x: 'https://x.com/Schnitzel' },
    status: 'active',
    externalUrl: 'https://libreboard.org',
    githubUrl: 'https://github.com/256foundation/libre-board',
    forumCategory: 'https://forum.256foundation.org/c/libre-board',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/fibre-board/6.json',
    logo: {
      icon: '/projects/libre-board.png',
    },
  },
  {
    slug: 'mujina',
    type: 'software',
    name: 'Mujina',
    titleFont: 'bridge-officer',
    tagline: 'The Linux kernel project of Bitcoin mining firmware',
    description:
      'Actively maintained open-source mining firmware, a drop-in replacement for proprietary firmware on existing hardware and a standard for new open designs.',
    whyNecessary:
      'The entire ecosystem runs on closed firmware that can silently enforce pool restrictions, add dev fees, or phone home. Mujina makes mining firmware auditable, forkable, and community-governed — the Linux kernel equivalent for Bitcoin miners.',
    keySpecs: [
      { label: 'Language', value: 'Rust' },
      { label: 'License', value: 'GPLv3' },
      { label: 'Protocol', value: 'Stratum V1 + V2' },
      { label: 'Base OS', value: 'Linux' },
    ],
    keyFeatures: [
      'No dev fee, no pool lock',
      'Per-chip power targeting and watt budgets',
      'Stratum V1/V2 with DATUM compatibility',
      'Drivers for Antminer, Whatsminer, Avalon',
      'Web dashboard, REST API, CLI',
    ],
    architect: { name: 'Ryan Kuester', handle: '@ryankuester', x: 'https://x.com/ryankuester' },
    status: 'active',
    externalUrl: 'https://mujina.org',
    githubUrl: 'https://github.com/256foundation/mujina',
    forumCategory: 'https://forum.256foundation.org/c/mujina',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/mujina/7.json',
    logo: {
      character: '/projects/mujina-character.png',
    },
  },
  {
    slug: 'hydrapool',
    type: 'software',
    name: 'Hydrapool',
    tagline: 'One-click deployable open-source Bitcoin mining pool',
    description:
      'A fully open-source mining pool software package deployed with a single command, supporting multiple payout structures and Stratum V1/V2.',
    whyNecessary:
      'Mining pools decide which transactions get mined, and the largest ones run closed software — a chokepoint on Bitcoin\u2019s censorship resistance. Hydrapool makes it trivial to stand up an independent, open-source pool anyone can deploy in one command.',
    keySpecs: [
      { label: 'Language', value: 'Rust' },
      { label: 'License', value: 'AGPLv3' },
      { label: 'Deployment', value: 'Docker Compose' },
      { label: 'Payouts', value: 'Direct from coinbase' },
    ],
    keyFeatures: [
      'One-command deploy',
      'Solo + PPLNS payouts, no custody',
      'Stratum V1 (V2 planned)',
      'Prometheus metrics + Grafana dashboards',
      'Live at pool.256foundation.org:3333',
    ],
    architect: { name: 'Jungly', handle: '@jungly', x: 'https://x.com/jungly' },
    status: 'active',
    externalUrl: 'https://hydrapool.org',
    githubUrl: 'https://github.com/256foundation/hydrapool',
    forumCategory: 'https://forum.256foundation.org/c/hydrapool',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/hydrapool/8.json',
    logo: {
      icon: '/projects/hydrapool-logo.png',
    },
  },
]
