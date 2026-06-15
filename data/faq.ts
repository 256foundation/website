import type { FAQItem } from '@/types'

export const faqItems: FAQItem[] = [
  // ── About the Foundation ─────────────────────────────────────
  {
    category: 'foundation',
    question: 'What does the 256 Foundation do?',
    answer:
      '256 Foundation (EIN: 99-1662333) is a 501(c)(3) public charity which funds free and open-source Bitcoin mining related initiatives and provides education resources to demystify Bitcoin and freedom tech.\n\nWe believe Bitcoin mining has become dangerously centralized in several aspects: hardware and firmware centralization controlled by one Chinese company with ~90% market dominance, mining pool centralization with ~90% of global hashrate controlled by four mining pool operators and their proxies, and mining reward centralization with ~40% of bitcoin mining rewards going to a single custodian. Our mission is to dismantle the proprietary mining empire and that starts with open-sourcing the whole Bitcoin mining stack. Our first four grant initiatives were for a standardized open-source hash board, an open-source control board, open-source firmware, and an open-source one-click deployable mining pool. The development will not stop until Bitcoin mining is free and open.',
  },
  {
    category: 'foundation',
    question: 'Who founded the 256 Foundation and when?',
    answer:
      'The 256 Foundation was founded in February 2024 by @bitkite and @econoalchemist — two longtime Bitcoin advocates with deep roots in the open-source and self-sovereignty communities.',
  },
  {
    category: 'foundation',
    question: 'How much of my donation goes towards open-source contributors?',
    answer:
      '100% of the donations made to the General Fund go to support the individuals working directly on the open-source Bitcoin mining related initiatives. There is no cut taken for administrative costs nor for board members.',
  },
  {
    category: 'foundation',
    question: 'What is the best way to communicate with 256 Foundation?',
    answer: 'Email is the best way to reach us: admin@256foundation.org',
  },

  // ── Donations ─────────────────────────────────────────────────
  {
    category: 'donations',
    question: 'Are donations tax deductible?',
    answer:
      'Yes, all donations to the 256 Foundation are tax-deductible as allowed by law. Our Tax ID number is 99-1662333. No products or services are exchanged in return for donations. We recommend consulting with a tax professional to determine the exact deductibility of your contribution and to ensure compliance with all relevant laws and guidelines.',
  },
  {
    category: 'donations',
    question: 'How can I donate to the 256 Foundation?',
    answer:
      'You can donate in two ways: financially (Bitcoin on-chain, Lightning, or credit/debit card via our Zaprite donation page) or by donating your mining hashrate (point your Bitcoin miner to our Hydrapool instance at pool.256foundation.org:3333).',
  },
  {
    category: 'donations',
    question: 'What payment methods do you accept?',
    answer:
      'We accept Bitcoin (on-chain and Lightning Network), as well as credit and debit card payments via our Zaprite-powered donation page. We do not accept other cryptocurrencies at this time.',
  },
  {
    category: 'donations',
    question: 'What is a hashrate donation?',
    answer:
      'A hashrate donation means pointing your Bitcoin mining hardware to the foundation\'s Hydrapool mining pool instance (pool.256foundation.org:3333). Your miner contributes to the pool\'s total hashrate, and in the event a Bitcoin block is found, all of the block reward goes directly to the foundation. You can monitor your contribution in real time on Hashdash (dash.256f.org).',
  },
  {
    category: 'donations',
    question: 'What is TeleHash and how does it relate to donations?',
    answer:
      'TeleHash is the 256 Foundation\'s semi-annual fundraising event — an 8-hour livestream where we run our Hydrapool instance in solo mining mode and invite the global community to point their hashrate to our pool. The first TeleHash event resulted in finding a Bitcoin block, raising the initial BTC that seeded the four core pillar grants.',
  },

  // ── Grants ────────────────────────────────────────────────────
  {
    category: 'grants',
    question: 'How are funds distributed?',
    answer:
      'Donations to the General Fund are currently prioritized toward the four core pillar projects — Ember One, Mujina, Libre Board, and Hydrapool. These are foundation-defined initiatives we are fully committed to funding. When excess funding is available beyond those commitments, the board opens grant cycles for community-submitted projects. During active cycles, recipients are selected through an evaluation and interview process and awarded fair-market value for their work. You can find a record of all funded projects on the Projects page.',
  },
  {
    category: 'grants',
    question: 'Are grant awards given in bitcoin or fiat?',
    answer:
      'Grant awards are given to recipients based on their preferred method, either bitcoin or fiat. We accept donations in fiat or bitcoin. For security reasons, the exact dollar (or sat) amounts awarded to individual recipients are kept confidential. In accordance with IRS requirements, annual tax disclosures are available for public inspection.',
  },
  {
    category: 'grants',
    question: 'Can I receive a grant as a nym?',
    answer:
      'The 256 Foundation respects your privacy and ability to operate as a nym. At the same time, as a 501(c)(3) public charity, the 256 Foundation is obligated to file taxes. This means taxpayer information will be required from grant recipients. To balance your privacy with the foundation\'s obligations, one solution is for you to start a Wyoming LLC so you can share that entity\'s information instead of your personal taxpayer information.',
  },
  {
    category: 'grants',
    question: 'Who can apply for a grant?',
    answer:
      'Open grant applications are currently closed. The 256 Foundation is focused on funding and facilitating our four core pillar projects, which we consider the essential building blocks for open-source Bitcoin mining hardware and software. When funding allows beyond those commitments, we open grant cycles for community developers and researchers. Any developer, hardware engineer, or researcher working on open-source Bitcoin mining can apply during an open cycle. All funded projects must be released under a recognized open-source license (OSI for software, OSHWA for hardware). Follow POD256, our newsletter, or social channels to be notified when the next cycle opens.',
  },
  {
    category: 'grants',
    question: 'What kinds of projects does the foundation fund?',
    answer:
      'We fund open-source Bitcoin mining hardware designs (OSHWA-compliant), mining firmware and software (OSI-compliant), mining pool software, education and documentation resources, and any tools or infrastructure that advance the open-source Bitcoin mining ecosystem.',
  },
  {
    category: 'grants',
    question: 'What is the difference between a Core Pillar Grant and an Open Grant?',
    answer:
      'Core Pillar Grants are grants where the foundation identifies a critical missing piece of infrastructure, defines the scope and deliverables, and selects qualified developers to build it. Open Grants are community-driven: developers submit their own project proposals, which are reviewed and funded during grant cycles.',
  },
  {
    category: 'grants',
    question: 'How does the grant application process work?',
    answer:
      'Open grant applications are not currently being accepted. When a grant cycle opens, applicants submit a proposal including project description, technical approach, requested funding amount, timeline, milestone plan, and links to relevant prior work. The foundation board reviews submissions and interviews qualified candidates. Approved grantees work with the foundation to finalize scope, milestones, and payment structure, and all funded work is developed in public under an approved open-source license. Follow our channels to be notified when the next cycle opens.',
  },

  // ── Projects & Ecosystem ──────────────────────────────────────
  {
    category: 'projects',
    question: 'What are the four pillar projects?',
    answer:
      'The four pillar projects are: Ember One (open-source mining hash board hardware), Mujina (open-source mining firmware), Libre Board (open-source miner control board hardware), and Hydrapool (open-source mining pool software). Together they form a complete open-source Bitcoin mining stack.',
  },
  {
    category: 'projects',
    question: 'How do the four pillar projects relate to each other?',
    answer:
      'They are designed as complementary layers of the same stack: Ember One provides the hash board (the compute layer), Libre Board provides the control board that connects the hash board to the network, Mujina runs on Libre Board and manages the mining operation, and Hydrapool provides the pool that the miner connects to. Any combination can be used independently, but together they form a fully open-source mining system.',
  },
  {
    category: 'projects',
    question: 'What is Open Source Miners United (OSMU)?',
    answer:
      'OSMU (osmu.wiki) is a community of developers, engineers, and builders creating open-source Bitcoin mining hardware and software — including well-known projects like Bitaxe, NerdAxe, AxeOS, and others. OSMU is a community project supported by the 256 Foundation ecosystem.',
  },
  {
    category: 'projects',
    question: 'What is Hashrate Heatpunks?',
    answer:
      'Hashrate Heatpunks (heatpunks.org) is a community united by the idea that Bitcoin mining heat is a product, not a problem. Their mission is to marry the Bitcoin mining and heating sectors — bringing mining back into homes and businesses as a source of productive heat. They are part of the broader ecosystem supported by the 256 Foundation.',
  },

  // ── Technical ─────────────────────────────────────────────────
  {
    category: 'technical',
    question: 'What does "open-source" mean for hardware?',
    answer:
      'For hardware, the 256 Foundation follows the Open Source Hardware Association (OSHWA) definition: all design files (schematics, PCB layouts, BOMs, firmware) must be publicly available under a license that permits study, modification, distribution, and manufacture. See oshwa.org/definition for the full definition.',
  },
  {
    category: 'technical',
    question: 'Why does open-source Bitcoin mining matter?',
    answer:
      'Bitcoin\'s security model depends on decentralized mining. When mining hardware and software is controlled by a single proprietary vendor, that vendor gains enormous leverage over the network — they can block miners from certain pools, enforce software updates, or deny competitors access to hardware. Open-source mining removes these single points of control and ensures that anyone can participate in securing Bitcoin without permission from a hardware monopoly.',
  },
  {
    category: 'technical',
    question: 'What problem is the 256 Foundation solving?',
    answer:
      'One large, antagonistic Bitcoin mining hardware company has achieved dominant market share in both hardware and firmware, blocking innovation and collaboration. This centralization is a long-term threat to Bitcoin\'s decentralization. The 256 Foundation funds the open-source alternatives that dismantle this monopoly — making the entire Bitcoin mining stack accessible, auditable, and free.',
  },
]
