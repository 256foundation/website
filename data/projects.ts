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
      'Mining chips ship with no datasheets, no pinouts, no voltages or frequencies, and no way to buy the chips on their own. To build on competitive silicon you buy a full machine, desolder the chips, and reverse-engineer how to talk to them.',
    whatItDoes:
      'Ember One publishes the whole recipe — open PCB files, bill of materials, and firmware interface spec. It teaches the industry how ASICs chain in series and how a standalone hash board pairs with a separate control board, then lets you scale one design from a bench build to a rack.',
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
      icon: '/projects/ember-one-hashboard.webp',
    },
  },
  {
    slug: 'libre-board',
    type: 'hardware',
    name: 'Libre Board',
    tagline: 'Open-source Bitcoin miner control board',
    description:
      'An open-source hardware control board that runs Linux, supporting Mujina natively, plus anything else you need alongside it. Swappable compute scales across system complexity, so one board can run your system with no extra controllers.',
    whyNecessary:
      'A control board silently decides what a “miner” is allowed to be. Want your own firmware, a display, Wi-Fi on a remote site, or a flow sensor wired into a heat system? The closed board says no.',
    whatItDoes:
      'Libre Board exposes every interface a mining system might need and runs full Linux. It teaches builders how to wire anything into a miner, then strip the design down to their own parts list and form factor.',
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
      icon: '/projects/libre-board.webp',
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
      'Firmware is the operating system of a miner, and it is unauditable. You cannot verify it is not skimming hashrate, phoning home, or holding a remote kill switch.',
    whatItDoes:
      'Mujina is the Linux-kernel project of mining firmware: open, reproducible, and forkable, with per-chip power control and no dev fee. It standardizes the layer everything else depends on, and gives operators source they can actually trust.',
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
      character: '/projects/mujina-character.webp',
    },
  },
  {
    slug: 'hydrapool',
    type: 'software',
    name: 'Hydrapool',
    tagline: 'One-click deployable open-source Bitcoin mining pool',
    description:
      'A fully open-source mining pool built as a platform: payout and accounting logic are plug-ins, not hard-coded — deployed with a single command.',
    whyNecessary:
      'The pool is the server side of mining, and it is concentrated. Pools can filter which transactions get mined, custody your payouts, and hide the accounting — and there’s no permissionless way to aggregate hashrate without trusting an operator.',
    whatItDoes:
      'Like WordPress for pools: the core is a platform and payouts are plug-ins — solo, PPLNS, and more (Lightning, Ark) on the same core, all non-custodial from the coinbase. A P2Pool V2 path goes further, to pooling with no operator to trust at all.',
    keySpecs: [
      { label: 'Language', value: 'Rust' },
      { label: 'License', value: 'AGPLv3' },
      { label: 'Deployment', value: 'Docker Compose' },
      { label: 'Payouts', value: 'Direct from coinbase' },
    ],
    keyFeatures: [
      'One-command Docker deploy',
      'Plugin payout logic — solo, PPLNS, more',
      'Non-custodial coinbase payouts',
      'P2Pool V2 path (pool without an operator)',
      'Prometheus + Grafana monitoring',
      'Live at pool.256foundation.org:3333',
    ],
    architect: { name: 'Jungly', handle: '@jungly', x: 'https://x.com/jungly' },
    status: 'active',
    externalUrl: 'https://hydrapool.org',
    githubUrl: 'https://github.com/256foundation/hydrapool',
    forumCategory: 'https://forum.256foundation.org/c/hydrapool',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/hydrapool/8.json',
    logo: {
      icon: '/projects/hydrapool-logo.webp',
    },
  },
]
