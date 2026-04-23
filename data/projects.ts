import type { PillarProject } from '@/types'

export const pillarProjects: PillarProject[] = [
  {
    slug: 'ember-one',
    type: 'hardware',
    name: 'Ember One',
    tagline: 'Open-source Bitcoin mining hashboard reference design',
    description:
      'Ember One is a fully open-source hardware reference design for a Bitcoin mining hashboard. It provides the foundational blueprint that individual miners, researchers, and companies can build upon — breaking the dependency on proprietary designs.',
    whyCoreGrant:
      'The 256 Foundation identified the absence of any open-source Bitcoin mining hashboard design as a critical gap in the ecosystem. Without an open hardware foundation, every other layer of the mining stack remains dependent on closed, proprietary hardware. Ember One fills this gap by creating a reference design that is freely available under an open hardware license.',
    whyNecessary:
      'A single hardware company has maintained near-total control over Bitcoin mining hashboard designs for years, blocking innovation and preventing the development of a competitive, diverse hardware ecosystem. Ember One disrupts this by providing a fully documented, OSHWA-compliant reference design that anyone can manufacture, modify, or build upon — democratizing access to mining hardware at the most fundamental level.',
    technicalDetails:
      'Ember One 00 is built around the Bitmain BM1362 ASIC, with an open PCB layout, full bill of materials, and firmware interface specification published under an OSHWA-compliant open hardware license. The board draws approximately 100W at 12–24V DC input, communicates via USB-C, and integrates onboard temperature sensors for thermal management. Its standardized 125×125mm form factor and 6-month release cadence make it a stable, iterative foundation for the open mining stack. Natively compatible with Libre Board and Mujina firmware.',
    keySpecs: [
      { label: 'Power', value: '~100W' },
      { label: 'Input Voltage', value: '12–24V DC' },
      { label: 'Dimensions', value: '125×125mm' },
      { label: 'Current ASIC', value: 'BM1362 (v00)' },
      { label: 'Data Interface', value: 'USB-C' },
      { label: 'Temp Sensors', value: 'Integrated' },
      { label: 'License', value: 'OSHWA' },
      { label: 'Release Cycle', value: '6 months' },
    ],
    techFeatures: [
      {
        category: 'Current Hardware',
        items: [
          'Bitmain BM1362 ASIC',
          'USB-C data interface',
          'Integrated temperature sensors',
          'PiAxe/Pyminer firmware (initial)',
        ],
      },
      {
        category: 'Upcoming ASIC Support',
        items: [
          'Intel BZM2',
          'Auradine',
          'Proto Mining',
        ],
      },
      {
        category: 'Stack Integration',
        items: [
          'Mujina firmware (native)',
          'Libre Board control board',
          'Standard mining control interfaces',
          'Open PCB design files',
        ],
      },
    ],
    status: 'active',
    externalUrl: 'https://emberone.org',
    githubUrl: 'https://github.com/256foundation/emberone00-pcb',
    forumCategory: 'https://forum.256foundation.org/c/ember-one',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/ember-one/5.json',
    ogImage: '/og/og-ember-one.png',
    logo: {
      icon: '/projects/ember-one-hashboard.png',
    },
    milestones: [
      { label: 'Project specification finalized', status: 'completed', date: '2024-06-01' },
      { label: 'Lead engineer onboarded (Skot)', status: 'completed', date: '2024-07-01' },
      { label: 'Initial schematic and PCB layout', status: 'completed', date: '2024-10-01' },
      { label: 'First prototype fabricated', status: 'active' },
      { label: 'Prototype testing and validation', status: 'upcoming' },
      { label: 'Public design release v1.0', status: 'upcoming' },
    ],
    team: {
      leadEngineer: {
        name: 'Skot',
        handle: '@skot9000',
        role: 'Lead Engineer',
        bio: 'Electrical engineer with years of embedded systems experience, Skot instigated the Bitaxe project — the first open-source Bitcoin ASIC miner — and brings that same hands-on hardware conviction to Ember One. He is one of the most prolific forces in open-source Bitcoin mining hardware.',
        headshot: '/team/skot.jpg',
        links: { x: 'https://x.com/skot9000', github: 'https://github.com/skot' },
      },
      projectManager: {
        name: 'Econoalchemist',
        handle: '@econoalchemist',
        role: 'Project Manager',
        bio: 'Bitcoin educator, technical writer, and co-host of the POD256 podcast. Co-founder of the 256 Foundation and project manager across all four pillar grants.',
        headshot: '/team/econoalchemist.jpg',
        links: { x: 'https://x.com/econoalchemist' },
      },
    },
  },
  {
    slug: 'mujina',
    type: 'software',
    name: 'Mujina',
    tagline: 'The Linux kernel of Bitcoin mining firmware',
    description:
      'Mujina is an actively maintained, open-source Bitcoin mining firmware designed to be a drop-in replacement for proprietary firmware on existing hardware — while also serving as the standard for new open hardware designs.',
    whyCoreGrant:
      'Mining firmware controls every aspect of how a mining device operates: pool connections, power management, performance tuning, and more. The entire ecosystem currently runs on closed-source proprietary firmware, giving hardware manufacturers an additional lever of control over miners. Mujina breaks this dependency by providing a community-maintained open-source alternative.',
    whyNecessary:
      'The proprietary firmware ecosystem creates multiple points of centralized control and censorship risk. Closed firmware can be silently updated to enforce pool restrictions, change performance profiles, or phone home with operational data. Mujina eliminates these risks by making the firmware fully auditable, forkable, and community-governed — analogous to what the Linux kernel is for operating systems.',
    technicalDetails:
      'Mujina is written in Rust on a Linux-based embedded OS, licensed under GPLv3. It supports Stratum V1 (with DATUM compatibility) and Stratum V2, and is designed to run on Ember One and Libre Board natively — while also providing best-effort compatibility with existing commercial hardware including Antminer, Whatsminer, and Avalon. Management interfaces include a web dashboard, HTTP REST API, CLI, and structured config files. The long-term vision is for Mujina to evolve into a complete, flashable Linux-based OS for Bitcoin mining hardware.',
    keySpecs: [
      { label: 'Language', value: 'Rust' },
      { label: 'License', value: 'GPLv3' },
      { label: 'Base OS', value: 'Linux' },
      { label: 'Protocol', value: 'Stratum V1 + V2' },
    ],
    techFeatures: [
      {
        category: 'Protocol Support',
        items: [
          'Stratum V1',
          'Stratum V2',
          'DATUM compatibility',
          'Multiple pool configs with failover',
        ],
      },
      {
        category: 'Hardware Compatibility',
        items: [
          'Ember One hashboard (native)',
          'Libre Board (native)',
          'Antminer drivers',
          'Whatsminer drivers',
          'Avalon drivers',
        ],
      },
      {
        category: 'Management Interfaces',
        items: [
          'Web dashboard',
          'HTTP REST API',
          'Command-line interface (CLI)',
          'Structured text file configuration',
          'Continuous integration framework',
        ],
      },
    ],
    status: 'active',
    externalUrl: 'https://mujina.org',
    githubUrl: 'https://github.com/256foundation/mujina',
    forumCategory: 'https://forum.256foundation.org/c/mujina',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/mujina/7.json',
    ogImage: '/og/og-mujina.png',
    logo: {
      character: '/projects/mujina-character.png',
    },
    milestones: [
      { label: 'Core architecture designed', status: 'completed', date: '2024-05-01' },
      { label: 'Stratum V1/V2 support implemented', status: 'completed', date: '2024-09-01' },
      { label: 'Web UI for configuration', status: 'active' },
      { label: 'Hardware compatibility testing (Bitaxe, Ember One)', status: 'upcoming' },
      { label: 'Beta release to community testers', status: 'upcoming' },
      { label: 'Stable v1.0 release', status: 'upcoming' },
    ],
    team: {
      leadEngineer: {
        name: 'Ryan Kuester',
        handle: '@ryankuester',
        role: 'Lead Engineer',
        bio: 'Firmware engineer with decades of Linux and embedded systems experience. Ryan brings deep low-level expertise to Mujina, building the open-source firmware foundation that the entire Bitcoin mining stack runs on.',
        headshot: '/team/ryan.jpg',
        links: { x: 'https://x.com/ryankuester' },
      },
      projectManager: {
        name: 'Econoalchemist',
        handle: '@econoalchemist',
        role: 'Project Manager',
        bio: 'Bitcoin educator, technical writer, and co-host of the POD256 podcast. Co-founder of the 256 Foundation and project manager across all four pillar grants.',
        headshot: '/team/econoalchemist.jpg',
        links: { x: 'https://x.com/econoalchemist' },
      },
    },
  },
  {
    slug: 'libre-board',
    type: 'hardware',
    name: 'Libre Board',
    tagline: 'Open-source hardware Bitcoin miner control board',
    description:
      'Libre Board is an open-source hardware control board for Bitcoin miners, designed to run Mujina firmware and Linux-based tools. It enables hardware hackers to build custom mining setups — from standard pool mining to hashrate heating and solar-powered mining.',
    whyCoreGrant:
      'A miner control board is the brain of any Bitcoin mining operation, handling the connection between the hashboard, power supply, network, and user interface. All existing control boards are proprietary black boxes. Libre Board provides an open, hackable alternative that enables an entirely new class of mining applications.',
    whyNecessary:
      'Open control board hardware is the bridge between open firmware (Mujina) and open hashboard hardware (Ember One). Without it, even an open firmware runs on a closed hardware stack. Libre Board completes the open-source mining stack, enabling use cases like hashrate heating integration, solar mining controllers, Home Assistant integration, and fully custom mining appliances.',
    technicalDetails:
      'Libre Board is an SBC-form-factor control board running full Linux, licensed under CERN-OHL-S. It accepts 12–24V DC input and exposes a comprehensive I/O set: USB hub, Ethernet, HDMI, NVME, WiFi, MIPI (touchscreen), RPi 40-pin header, fan connectors, and two 100-pin compute module connectors. The dual 100-pin CM design supports swappable compute modules across architectures including Raspberry Pi CM5, RISC-V, and ARM — making it adaptable as compute technology evolves. Out of the box it runs Mujina firmware, but its full Linux environment also supports Bitcoin full node operation, a Stratum server, Home Assistant, and any custom Linux application.',
    keySpecs: [
      { label: 'Input Voltage', value: '12–24V DC' },
      { label: 'License', value: 'CERN-OHL-S' },
      { label: 'Compute', value: 'CM5 / RISC-V / ARM' },
      { label: 'CM Connectors', value: '2× 100-pin' },
      { label: 'Storage', value: 'NVME' },
      { label: 'Display', value: 'HDMI + MIPI' },
      { label: 'Networking', value: 'Ethernet + WiFi' },
    ],
    techFeatures: [
      {
        category: 'I/O Interfaces',
        items: [
          'USB hub',
          'Ethernet',
          'WiFi',
          'HDMI',
          'NVME expansion',
          'MIPI (touchscreen)',
          'RPi 40-pin header',
          'Fan connectors',
          '2× 100-pin compute module connectors',
        ],
      },
      {
        category: 'Compute Compatibility',
        items: [
          'Raspberry Pi CM5',
          'RISC-V modules',
          'ARM modules',
          'Swappable architecture design',
        ],
      },
      {
        category: 'Capabilities',
        items: [
          'Mujina firmware (native)',
          'Bitcoin full node',
          'Stratum server',
          'Home Assistant integration',
          'Custom Linux applications',
        ],
      },
    ],
    status: 'active',
    externalUrl: 'https://libreboard.org',
    githubUrl: 'https://github.com/256foundation/libre-board',
    forumCategory: 'https://forum.256foundation.org/c/libre-board',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/fibre-board/6.json',
    ogImage: '/og/og-libre-board.png',
    logo: {
      icon: '/projects/libre-board.png',
    },
    milestones: [
      { label: 'Hardware requirements specification', status: 'completed', date: '2024-06-01' },
      { label: 'Initial board design and schematic', status: 'completed', date: '2024-11-01' },
      { label: 'PCB layout and design review', status: 'active' },
      { label: 'Prototype fabrication and bring-up', status: 'upcoming' },
      { label: 'Mujina firmware integration testing', status: 'upcoming' },
      { label: 'Open hardware release v1.0', status: 'upcoming' },
    ],
    team: {
      leadEngineer: {
        name: 'Schnitzel',
        handle: '@Schnitzel',
        role: 'Lead Engineer',
        bio: 'Open-source infrastructure builder and Bitcoin home miner. Founder of Nakamoto Heating and Amazee.io, Schnitzel brings deep systems engineering experience and a passion for sovereign Bitcoin mining to the Libre Board project.',
        headshot: '/team/schnitzel.jpg',
        links: { x: 'https://x.com/Schnitzel' },
      },
      projectManager: {
        name: 'Econoalchemist',
        handle: '@econoalchemist',
        role: 'Project Manager',
        bio: 'Bitcoin educator, technical writer, and co-host of the POD256 podcast. Co-founder of the 256 Foundation and project manager across all four pillar grants.',
        headshot: '/team/econoalchemist.jpg',
        links: { x: 'https://x.com/econoalchemist' },
      },
    },
  },
  {
    slug: 'hydrapool',
    type: 'software',
    name: 'Hydrapool',
    tagline: 'One-click deployable open-source Bitcoin mining pool',
    description:
      'Hydrapool is a fully open-source Bitcoin mining pool software package that can be deployed with a single command. It supports multiple payout structures, Stratum V1/V2 protocols, and is designed to make running a mining pool accessible to individuals, communities, and organizations.',
    whyCoreGrant:
      'Mining pool software is critical infrastructure for Bitcoin mining, yet all major pools run closed-source software. This creates centralization risk and prevents community-governed pools from forming. Hydrapool makes it easy for anyone to run a pool — whether for personal use, community mining, or foundation fundraising events like TeleHash.',
    whyNecessary:
      'The ability to spin up a Bitcoin mining pool has historically required significant technical expertise and proprietary software licenses. Hydrapool removes both barriers: it is fully open-source and designed for one-click deployment via Docker. This enables new use cases including community pools, hashrate donation platforms, and research pools — directly supporting the foundation\'s TeleHash fundraising events.',
    technicalDetails:
      'Hydrapool is written in Rust and licensed under AGPLv3. It deploys via Docker Compose and ships with a Stratum server, job manager, database backend, Prometheus metrics, and Grafana dashboards out of the box. Payouts are made directly from the coinbase transaction — the pool operator never custodies funds. The system supports up to 100 unique users per coinbase transaction by default, with zero-downtime rolling upgrades. The 256 Foundation runs a live Hydrapool instance at pool.256foundation.org:3333 — anyone can point hashrate there using any username or Nostr npub.',
    keySpecs: [
      { label: 'Language', value: 'Rust' },
      { label: 'License', value: 'AGPLv3' },
      { label: 'Deployment', value: 'Docker Compose' },
      { label: 'Payouts', value: 'Direct from coinbase' },
      { label: 'Max Users', value: '100 / coinbase tx' },
      { label: 'Upgrades', value: 'Zero-downtime' },
    ],
    techFeatures: [
      {
        category: 'Payout Modes',
        items: [
          'Solo mining',
          'PPLNS share accounting',
          'Direct coinbase payouts',
          'No operator fund custody',
          'Up to 100 users per coinbase tx',
        ],
      },
      {
        category: 'Protocol & Connectivity',
        items: [
          'Stratum V1',
          'Stratum V2 (planned)',
          'Bitcoin Core RPC',
          'Nostr npub as username',
          'pool.256foundation.org:3333 (live)',
        ],
      },
      {
        category: 'Monitoring & Ops',
        items: [
          'Prometheus metrics',
          'Grafana dashboards',
          'Hashdash web interface',
          'Share validation & database',
          'Zero-downtime rolling upgrades',
        ],
      },
    ],
    status: 'active',
    externalUrl: 'https://hydrapool.org',
    githubUrl: 'https://github.com/256foundation/hydrapool',
    forumCategory: 'https://forum.256foundation.org/c/hydrapool',
    forumCategoryApiUrl: 'https://forum.256foundation.org/c/hydrapool/8.json',
    ogImage: '/og/og-hydrapool.png',
    logo: {
      icon: '/projects/hydrapool-logo.png',
    },
    milestones: [
      { label: 'Core pool architecture designed', status: 'completed', date: '2024-04-01' },
      { label: 'Stratum V1 support and job management', status: 'completed', date: '2024-07-01' },
      { label: 'Docker Compose deployment packaging', status: 'completed', date: '2024-09-01' },
      { label: 'Web dashboard (Hashdash integration)', status: 'active' },
      { label: 'Stratum V2 support', status: 'upcoming' },
      { label: 'Stable v1.0 public release', status: 'upcoming' },
    ],
    team: {
      leadEngineer: {
        name: 'Jungly',
        handle: '@jungly',
        role: 'Lead Engineer',
        bio: 'Distributed systems researcher with a PhD and the developer behind P2Pool v2. Jungly brings rigorous academic and hands-on protocol engineering to Hydrapool, building the open-source mining pool infrastructure the ecosystem needs.',
        headshot: '/team/jungly.jpg',
        links: { x: 'https://x.com/jungly' },
      },
      projectManager: {
        name: 'Econoalchemist',
        handle: '@econoalchemist',
        role: 'Project Manager',
        bio: 'Bitcoin educator, technical writer, and co-host of the POD256 podcast. Co-founder of the 256 Foundation and project manager across all four pillar grants.',
        headshot: '/team/econoalchemist.jpg',
        links: { x: 'https://x.com/econoalchemist' },
      },
    },
  },
]
