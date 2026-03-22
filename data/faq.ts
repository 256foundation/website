import type { FAQItem } from '@/types'

export const faqItems: FAQItem[] = [
  // ── About the Foundation ─────────────────────────────────────
  {
    category: 'foundation',
    question: 'What is the 256 Foundation?',
    answer:
      'The 256 Foundation is a 501(c)(3) nonprofit organization that raises money to fund developers building open-source Bitcoin mining hardware and software. Our mission is to build the open-source Bitcoin mining ecosystem and dismantle the proprietary mining empire that has centralized Bitcoin mining around closed-source hardware and software.',
  },
  {
    category: 'foundation',
    question: 'Who founded the 256 Foundation and when?',
    answer:
      'The 256 Foundation was founded in February 2024 by @bitkite and @econoalchemist — two longtime Bitcoin advocates with deep roots in the open-source and self-sovereignty communities.',
  },
  {
    category: 'foundation',
    question: 'What is the foundation\'s legal status?',
    answer:
      'The 256 Foundation is a fully approved 501(c)(3) nonprofit organization. All qualifying donations are tax-deductible to the extent permitted by law.',
  },
  {
    category: 'foundation',
    question: 'How does the foundation decide what to fund?',
    answer:
      'The foundation focuses on two types of grants: Core Pillar Grants, where the foundation defines the scope and deliverables for critical infrastructure projects and selects developers to build them; and Open Rolling Grants, where developers and researchers can submit their own proposals for projects that advance the open-source Bitcoin mining ecosystem.',
  },
  {
    category: 'foundation',
    question: 'What is the 100% passthrough policy?',
    answer:
      'The 256 Foundation operates as a 100% passthrough organization, meaning every dollar donated goes directly to the developers and projects we fund. We do not take a percentage for overhead or administrative costs.',
  },

  // ── Donations ─────────────────────────────────────────────────
  {
    category: 'donations',
    question: 'How can I donate to the 256 Foundation?',
    answer:
      'You can donate in two ways: financially (Bitcoin on-chain, Lightning, or credit/debit card via our Zaprite donation page) or by donating your mining hashrate (point your Bitcoin miner to our Hydrapool instance at pool.256foundation.org:3333).',
  },
  {
    category: 'donations',
    question: 'Is my donation tax-deductible?',
    answer:
      'Yes. The 256 Foundation is a fully approved 501(c)(3) nonprofit organization. Qualifying financial donations are tax-deductible to the extent permitted by US law. Please consult your tax advisor for specifics.',
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
      'A hashrate donation means pointing your Bitcoin mining hardware to the foundation\'s Hydrapool mining pool instance (pool.256foundation.org:3333). Your miner contributes to the pool\'s total hashrate, and in the event a Bitcoin block is found, all of the block reward goes directly to the foundation. You can monitor your contribution in real time on HasHDash (dash.256f.org).',
  },
  {
    category: 'donations',
    question: 'What is TeleHash and how does it relate to donations?',
    answer:
      'TeleHash is the 256 Foundation\'s semi-annual fundraising event — an 8-hour livestream where we run our Hydrapool instance in solo mining mode and invite the global community to point their hashrate to our pool. The first TeleHash event resulted in finding a Bitcoin block, raising the initial ~$300,000 that funded the four core pillar grants.',
  },

  // ── Grants ────────────────────────────────────────────────────
  {
    category: 'grants',
    question: 'Who can apply for a grant?',
    answer:
      'Any developer, hardware engineer, or researcher working on open-source Bitcoin mining hardware or software can apply for an open rolling grant. All funded projects must be released under a recognized open-source license (OSI for software, OSHWA for hardware).',
  },
  {
    category: 'grants',
    question: 'What kinds of projects does the foundation fund?',
    answer:
      'We fund open-source Bitcoin mining hardware designs (OSHWA-compliant), mining firmware and software (OSI-compliant), mining pool software, education and documentation resources, and any tools or infrastructure that advance the open-source Bitcoin mining ecosystem.',
  },
  {
    category: 'grants',
    question: 'What is the difference between a Core Pillar Grant and an Open Rolling Grant?',
    answer:
      'Core Pillar Grants are grants where the foundation identifies a critical missing piece of infrastructure, defines the scope and deliverables, and selects qualified developers to build it. Open Rolling Grants are community-driven: developers submit their own project proposals for review and funding.',
  },
  {
    category: 'grants',
    question: 'How does the grant application process work?',
    answer:
      'Submit your application through our Typeform application page. Include your project description, technical approach, requested funding amount, timeline, milestone plan, and links to your relevant prior work. Applications are reviewed by the foundation board on a rolling basis.',
  },

  // ── Projects & Ecosystem ──────────────────────────────────────
  {
    category: 'projects',
    question: 'What are the four pillar projects?',
    answer:
      'The four pillar projects are: Ember One (open-source mining hashboard hardware), Mujina (open-source mining firmware), Libre Board (open-source miner control board hardware), and Hydrapool (open-source mining pool software). Together they form a complete open-source Bitcoin mining stack.',
  },
  {
    category: 'projects',
    question: 'How do the four pillar projects relate to each other?',
    answer:
      'They are designed as complementary layers of the same stack: Ember One provides the hashboard (the compute layer), Libre Board provides the control board that connects the hashboard to the network, Mujina runs on Libre Board and manages the mining operation, and Hydrapool provides the pool that the miner connects to. Any combination can be used independently, but together they form a fully open-source mining system.',
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
