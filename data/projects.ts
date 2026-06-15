import type { PillarProject } from '@/types'

export const pillarProjects: PillarProject[] = [
  {
    slug: 'ember-one',
    type: 'hardware',
    name: 'Ember One',
    tagline: 'Open-source Bitcoin mining hash board reference design',
    description:
      'Ember One is a fully open-source hardware reference design for a Bitcoin mining hash board. It provides the foundational blueprint that individual miners, researchers, and companies can build upon — breaking the dependency on proprietary designs.',
    whyCoreGrant:
      'The 256 Foundation identified the absence of any open-source Bitcoin mining hash board design as a critical gap in the ecosystem. Without an open hardware foundation, every other layer of the mining stack remains dependent on closed, proprietary hardware. Ember One fills this gap by creating a reference design that is freely available under an open hardware license.',
    whyNecessary:
      'A single hardware company has maintained near-total control over Bitcoin mining hash board designs for years, blocking innovation and preventing the development of a competitive, diverse hardware ecosystem. Ember One disrupts this by providing a fully documented, CERN-OHL-S-2.0 licensed reference design that anyone can manufacture, modify, or build upon — democratizing access to mining hardware at the most fundamental level.',
    context: {
      sectionTitle: 'Why Not Just Use Bitaxe?',
      intro:
        'The Bitaxe — created by Ember One\'s own lead engineer, Skot — is the first open-source Bitcoin ASIC miner and a landmark achievement. But it was designed to teach one-chip mining, not to model how a production Bitcoin miner is built. Ember One exists because those are two fundamentally different problems.',
      points: [
        {
          heading: 'Hash boards and control boards are separate',
          body: 'In every commercial Bitcoin miner, the hash board — the PCB packed with ASIC chips — is a distinct component from the control board that manages it. The Bitaxe integrates both onto a single board, which is perfect for learning but not representative of how real miners are designed, repaired, or upgraded. Ember One is a standalone hash board, just like those in production hardware.',
        },
        {
          heading: 'Real miners have hundreds of chips in series',
          body: 'Most Bitaxe models run a single ASIC chip. Production Bitcoin miners run dozens to hundreds of chips in series across one or more hash boards. Learning to reliably chain chips, balance power, and handle failures at that scale requires a different reference design entirely — and that\'s exactly what Ember One provides.',
        },
        {
          heading: 'Hash boards are the component that changes',
          body: 'When a new ASIC generation arrives, it\'s the hash board that gets swapped out. Hash boards are also the part most likely to fail, be repaired, or be upgraded independently. If you\'re building a miner with a long service life, you need to know how to design, source, and maintain a hash board — not just interface with a single chip.',
        },
        {
          heading: 'A true reference design includes all the real-world components',
          body: 'Ember One is designed with the full complement of hardware you\'d find on a production hash board: wide voltage input range, USB-C data interface, integrated temperature sensors, and a standard form factor. It\'s the reference a hardware engineer actually needs — not a simplified teaching tool, but a production-grade open blueprint.',
        },
      ],
    },
    technicalDetails:
      'Ember One 00 is built around the Bitmain BM1362 ASIC, with an open PCB layout, full bill of materials, and firmware interface specification published under the CERN-OHL-S-2.0 open hardware license. The board draws approximately 100W at 12–24V DC input, communicates via USB-C, and integrates onboard temperature sensors for thermal management. Its standardized 125×125mm form factor and 6-month release cadence make it a stable, iterative foundation for the open mining stack. Natively compatible with Libre Board and Mujina firmware.',
    keySpecs: [
      { label: 'Power', value: '~100W' },
      { label: 'Input Voltage', value: '12–24V DC' },
      { label: 'Dimensions', value: '125×125mm' },
      { label: 'Current ASIC', value: 'BM1362 (v00)' },
      { label: 'Data Interface', value: 'USB-C' },
      { label: 'Temp Sensors', value: 'Integrated' },
      { label: 'License', value: 'CERN-OHL-S-2.0' },
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
    context: {
      sectionTitle: 'The Stakes Are Different. The Answer Is the Same.',
      intro:
        'Whether you are running a hundred thousand machines in an industrial data center or a single hashboard heating your home office, closed-source firmware is working against you. The specific problem changes with scale — but the solution is always the same: firmware whose source code you can read, verify, modify, and trust.',
      points: [
        {
          heading: 'Institutional miners: the risk surface you cannot audit',
          body: 'In 2017, Bitmain\'s stock Antminer firmware was found to contain a hardcoded remote shutdown capability — Antbleed — that pinged an unauthenticated server every 1–11 minutes. If the server returned false, the miner stopped hashing. No announcement. No opt-out. Just a kill switch embedded in firmware running on an estimated 70% of global hashrate. Separately, Bitmain was accused of using covert AsicBoost — a ~10–20% efficiency advantage withheld from customers and competitors. For publicly traded mining companies, closed firmware also creates a direct audit problem: the software controlling your primary revenue-generating process is a black box. You cannot verify to your auditors that hashrate is being directed correctly, that all valid shares are being submitted, or that a silent dev fee isn\'t being taken. Firmware you can read and build from source is the only technical path to firmware-level assurance.',
        },
        {
          heading: 'Mid-size operators: customization without the tax',
          body: 'Closed-source aftermarket firmware typically charges 2–2.8% of hashrate as a dev fee — and most waive it only if you direct your machines to the firmware vendor\'s own pool. At scale, 2.8% is not a rounding error. It is a mandatory revenue transfer to a vendor who also operates a competing pool. Open-source firmware has no dev fee, no pool lock, and no vendor who can push a silent update that changes the terms. If Mujina doesn\'t do exactly what your operation needs, you fork it, make the change, and run your own build. That option does not exist with closed firmware.',
        },
        {
          heading: 'Home and specialty miners: control over every watt',
          body: 'A hashrate heater running three hashboards does not have the same control requirements as a data center rack. You might want to honor a 1,000W heating request by stepping all three boards down proportionally — or by optimizing one board for maximum heat output and parking the other two. You might want to ramp hashrate up as the room cools and back down as it warms. You might want temperature-targeted fan curves that protect hardware in an unventilated garage. Closed firmware gives you a handful of presets tuned for data center ambient conditions. Open firmware gives you the actual controls: per-chip power targeting, watt-level budgets, temperature thresholds, and the ability to write custom logic for whatever system you are building — whether that is a pool heater, a solar monetization rig, or a desktop miner.',
        },
        {
          heading: 'The guarantee that makes everything else possible',
          body: 'The specific benefits above — no backdoors, no dev fee, full customization — all depend on one thing: the ability to read and verify the source code. With closed firmware, you cannot confirm it is not redirecting shares to a shadow pool, not phoning home with your operational data, not running a hidden efficiency mode that benefits the manufacturer. With Mujina, the source code is public, the build is reproducible, and every change is visible in the commit history. Trust is not granted to a vendor. It is earned by the code.',
        },
      ],
    },
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
          'Ember One hash board (native)',
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
      'A miner control board is the brain of any Bitcoin mining operation, handling the connection between the hash board, power supply, network, and user interface. All existing control boards are proprietary black boxes. Libre Board provides an open, hackable alternative that enables an entirely new class of mining applications.',
    whyNecessary:
      'Open control board hardware is the bridge between open firmware (Mujina) and open hash board hardware (Ember One). Without it, even an open firmware runs on a closed hardware stack. Libre Board completes the open-source mining stack, enabling use cases like hashrate heating integration, solar mining controllers, Home Assistant integration, and fully custom mining appliances.',
    context: {
      sectionTitle: 'Build What You Need — Strip What You Don\'t',
      intro:
        'Libre Board is a reference design, not a prescribed product. It is intentionally comprehensive — every interface it exposes is something a real mining system builder might need. You take the full design, remove what does not apply to your use case, compact the form factor if you want, and build from there. The richness is the point: it teaches you everything a control board can do, so you can make informed choices about what yours should do.',
      points: [
        {
          heading: 'Building for an industrial data center',
          body: 'You probably don\'t need a display, GPIO sensors, or a Bitcoin node on your control board. Strip those components, tighten the form factor, finalize your BOM, and manufacture at scale. Libre Board gives you a fully documented open starting point so you\'re not reverse-engineering a proprietary black box to get there.',
        },
        {
          heading: 'Building a hashrate heating system',
          body: 'A pool heater that happens to mine Bitcoin is a system — not just a miner. You may want to wire temperature sensors, water flow meters, and pump controls directly to the control board. Libre Board\'s GPIO pins and Linux environment make the miner the brain of the entire heating system, not just one component in it.',
        },
        {
          heading: 'Building an off-grid or solar mining system',
          body: 'Managing variable DC input from solar panels or batteries requires custom logic and real-time sensor data. Libre Board\'s compute versatility, NVME storage, and open Linux environment give you the foundation to build and run that logic directly on the control board — no separate controller needed.',
        },
        {
          heading: 'It\'s a Linux computer, not just a control board',
          body: 'Because Libre Board runs full Linux, the hash board is just one of the things it can talk to. It can simultaneously run a Bitcoin full node, serve as a local Stratum server, display a system dashboard, run Home Assistant, or manage any custom application you write. What you build on top of it is up to you.',
        },
      ],
    },
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
    context: {
      sectionTitle: 'Why the World Needs Easy-to-Deploy Pool Software',
      intro:
        'Your miner can run open hardware. Your miner can run open firmware. But if every pool that accepts your hashrate is a closed, centralized operator that can be pressured, regulated, or compromised — the last mile of Bitcoin\'s censorship resistance is broken. Hydrapool exists because mining pool software needs to be as open, documented, and deployable as the rest of the stack.',
      points: [
        {
          heading: 'Pools are the last chokepoint',
          body: 'Mining pools decide which transactions get included in the blocks they build. The top four pools control roughly 75% of Bitcoin\'s hashrate, and the effective concentration is higher when organizational relationships between pools are factored in. This level of concentration means that a small number of entities — each subject to the laws and pressures of their respective jurisdictions — have substantial influence over which transactions get mined. Pool-level transaction filtering has already occurred in practice. Open-source pool software that anyone can spin up is the mechanism that lets hashrate route around that pressure. If a pool starts filtering transactions, miners can redirect to an independently operated pool within minutes — but only if independently operated pools exist and are easy to stand up.',
        },
        {
          heading: 'The existing options are hard or limited',
          body: 'The open-source pool software that exists today was built for different eras and different audiences. CKPool is written in C with sparse documentation and requires expert Linux administration to deploy — there is no official Docker path, and the primary support channel is IRC. Public Pool is easier to run but is solo-mining only: it has no shared reward mechanism, making it unsuitable for anyone who wants to operate a community pool or run PPLNS payouts. Neither was built with the goal of being approachable documentation-first software that a technically curious Bitcoiner could spin up in an afternoon. Hydrapool was.',
        },
        {
          heading: 'Open firmware needs an open pool to develop against',
          body: 'Testing new firmware features requires a pool you control. Production pools cannot be used — they have rate limits, minimum share difficulties that reject low-hashrate development hardware, and no debugging interfaces. When the Mujina firmware team implements a new protocol feature, they need a local pool instance they can inspect, break, and run in a controlled environment. Hydrapool fills that role for the entire open-source mining stack. Every advance in Mujina and every new Ember One bring-up happens against a Hydrapool instance. The four pillar projects are not independent — they are a system, and Hydrapool is the component that makes the others testable.',
        },
        {
          heading: 'A building block for fully decentralized pooling',
          body: 'Hydrapool\'s roadmap includes interoperability with P2Pool V2 — a ground-up Rust rewrite of the original P2Pool concept, actively developed by Jungly, who is also Hydrapool\'s lead engineer. P2Pool V2 aims to remove the pool operator entirely: miners collectively maintain a share chain and receive non-custodial payouts directly in the coinbase transaction, with no central server to shut down or coerce. Hydrapool is the well-documented, production-capable foundation that makes experimenting with and contributing to that future possible. The path from "one-click pool" to "fully decentralized pooling infrastructure" runs through the same codebase.',
        },
      ],
    },
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
