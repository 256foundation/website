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
      'Ember One is designed around state-of-the-art ASIC chips with an open PCB layout, bill of materials (BOM), and firmware interface specification. The design is compatible with standard mining control interfaces and is architected to work natively with the Libre Board control board and Mujina firmware. All design files are published under an open hardware license.', // TODO: Expand with real technical specs
    status: 'active',
    externalUrl: 'https://emberone.org',
    githubUrl: 'https://github.com/256foundation/ember-one',
    forumCategory: 'https://forum.256foundation.org/c/ember-one',
    ogImage: '/og/og-ember-one.png',
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
        bio: 'Decades of hardware engineering experience. Lead designer of the Ember One hashboard.', // TODO
        headshot: '/team/placeholder.png',
        links: { x: 'https://x.com/skot9000', github: 'https://github.com/skot' },
      },
      projectManager: {
        name: 'Tyler Stevens',
        handle: '@tylerkstevens',
        role: 'Project Manager',
        bio: 'Board member managing project coordination and deliverables.', // TODO
        headshot: '/team/placeholder.png',
        links: { x: 'https://x.com/tylerkstevens' },
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
      'Mujina is built on a Linux-based embedded OS and supports the Stratum V2 mining protocol. It provides a web-based configuration interface, supports multiple pool configurations with failover, and exposes a REST API for monitoring and management. Designed for compatibility with both open hardware (Libre Board, Ember One) and select existing commercial hardware.', // TODO: Expand
    status: 'active',
    externalUrl: 'https://mujina.org',
    githubUrl: 'https://github.com/256foundation/mujina',
    forumCategory: 'https://forum.256foundation.org/c/mujina',
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
        name: 'Mujina Dev',
        handle: '@mujinadev',
        role: 'Lead Engineer',
        bio: 'Core firmware developer specializing in embedded Linux and Bitcoin mining protocols.', // TODO
        headshot: '/team/placeholder.png',
        links: { github: 'https://github.com/256foundation/mujina' },
      },
      projectManager: {
        name: 'Tyler Stevens',
        handle: '@tylerkstevens',
        role: 'Project Manager',
        bio: 'Board member managing project coordination.', // TODO
        headshot: '/team/placeholder.png',
        links: { x: 'https://x.com/tylerkstevens' },
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
      'Libre Board is designed around a single-board-computer (SBC) form factor running full Linux, with dedicated interfaces for hashboard connection, power management, and network connectivity. It exposes GPIO and expansion headers for hardware customization. Compatible with Mujina firmware out of the box, and can also run standard Linux applications including Home Assistant, monitoring dashboards, and custom control software.', // TODO: Expand
    status: 'active',
    externalUrl: 'https://libreboard.org',
    githubUrl: 'https://github.com/256foundation/libre-board',
    forumCategory: 'https://forum.256foundation.org/c/libre-board',
    ogImage: '/og/og-libre-board.png',
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
        name: 'Libre Board Dev',
        handle: '@libreboarddev',
        role: 'Lead Engineer',
        bio: 'Hardware engineer specializing in embedded systems and open hardware design.', // TODO
        headshot: '/team/placeholder.png',
        links: { github: 'https://github.com/256foundation/libre-board' },
      },
      projectManager: {
        name: 'Tyler Stevens',
        handle: '@tylerkstevens',
        role: 'Project Manager',
        bio: 'Board member managing project coordination.', // TODO
        headshot: '/team/placeholder.png',
        links: { x: 'https://x.com/tylerkstevens' },
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
      'Hydrapool is built on a containerized architecture (Docker Compose) and includes a Stratum server, job manager, database backend, and web dashboard out of the box. It supports PPLNS and solo mining payout modes, with configurable difficulty and fee settings. The 256 Foundation runs its own Hydrapool instance for hashrate donations at pool.256foundation.org.', // TODO: Expand
    status: 'active',
    externalUrl: 'https://hydrapool.org',
    githubUrl: 'https://github.com/256foundation/hydrapool',
    forumCategory: 'https://forum.256foundation.org/c/hydrapool',
    ogImage: '/og/og-hydrapool.png',
    logo: {
      icon: '/projects/hydrapool-logo.png',
    },
    milestones: [
      { label: 'Core pool architecture designed', status: 'completed', date: '2024-04-01' },
      { label: 'Stratum V1 support and job management', status: 'completed', date: '2024-07-01' },
      { label: 'Docker Compose deployment packaging', status: 'completed', date: '2024-09-01' },
      { label: 'Web dashboard (HasHDash integration)', status: 'active' },
      { label: 'Stratum V2 support', status: 'upcoming' },
      { label: 'Stable v1.0 public release', status: 'upcoming' },
    ],
    team: {
      leadEngineer: {
        name: 'Hydrapool Dev',
        handle: '@hydrapooldev',
        role: 'Lead Engineer',
        bio: 'Full-stack developer specializing in Bitcoin protocol and distributed systems.', // TODO
        headshot: '/team/placeholder.png',
        links: { github: 'https://github.com/256foundation/hydrapool' },
      },
      projectManager: {
        name: 'Tyler Stevens',
        handle: '@tylerkstevens',
        role: 'Project Manager',
        bio: 'Board member managing project coordination.', // TODO
        headshot: '/team/placeholder.png',
        links: { x: 'https://x.com/tylerkstevens' },
      },
    },
  },
]
