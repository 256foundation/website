/**
 * First-pass copy for /our-work. Deliberately light: every section of the
 * agreed outline is present, tightened, and can be deepened later. Claim
 * discipline applies: only claims canon supports, project achievements belong
 * to the projects, no amounts, and exact program names.
 */

export const ourWorkHero = {
  kicker: 'Our Work',
  headline: 'We are commoditizing the Bitcoin mining stack.',
  line:
    'The 256 Foundation is a 501(c)(3) nonprofit funding the open-source stack, because a company is not incentivized to do this and a closed industry will not.',
}

export const ourWorkThesis = {
  kicker: 'The Thesis',
  quote: 'Bitcoin mining will be open-source, or Bitcoin remains permissioned.',
  body: [
    'Every mature industry eventually runs on commoditized inputs: recipes anyone can read, use, and improve. Open source is the final form of a mature industry. Aluminum has its process, servers have Linux, and the web runs on TCP and HTTP.',
    'Bitcoin mining has not arrived there yet. A company is the wrong vehicle to take it there, because a company has an edge to protect. As a nonprofit, we have nothing to protect: success means anyone can use, fork, build upon and compete with our work.',
  ],
}

export const ourWorkStatusQuo = {
  kicker: 'The Status Quo',
  intro: 'A modern miner is four unique building blocks, and each one is closed or concentrated.',
  blocks: [
    {
      title: 'Hash board',
      body: 'Mining chips ship in systems with no datasheets, no pinouts, and no way to buy them on their own. The hashboard is a mystery.',
    },
    {
      title: 'Control board',
      body: 'The board that runs the machine silently decides what a miner is allowed to be, with locked bootloaders and limited I/O.',
    },
    {
      title: 'Firmware',
      body: 'Firmware is unauditable, so you cannot verify it is not skimming hashrate or holding a kill switch. Antbleed proved it.',
    },
    {
      title: 'Pool',
      body: 'The server side of mining is concentrated and opaque, and trusting an operator is the only way to aggregate hashrate.',
    },
  ],
  ending:
    'The Mining Stack page sells the projects. This is the problem they answer.',
}

export const ourWorkVision = {
  kicker: 'The Future',
  lead: 'The future of mining should be decided by miners.',
  body:
    'A miner can be more than a data center black box. It can be a water heater, a solar and battery rig, an off-grid machine. Miners should come in every shape.',
}

export const ourWorkProof = {
  kicker: 'Proof of Work',
  body: [
    'The first TeleHash event found a Bitcoin block, raising the initial BTC that seeded the core projects.',
    'We reverse-engineered recipes that had never been open-source. Nine months later, early versions of everything ran together in a single working system.',
  ],
  kitLine:
    'Four independent projects that combine into one open-source mining development kit, free for anyone to study, fork, and build a business on.',
}

export const ourWorkPrograms = {
  kicker: 'Beyond the Kit',
  intro: 'The Development Kit is the start. The programs are what comes next.',
  programs: [
    {
      name: 'Red Team Program',
      body: 'Reverse engineering closed firmware and other mining software, followed by responsible disclosure.',
    },
    {
      name: 'Working Group Program',
      body: 'Convening the industry around standards, specifications, form factors, connectors, api endpoints and more. We bring the industry together to advance and mature it.',
    },
    {
      name: 'Stewardship',
      body: 'A neutral nonprofit home for the dependencies the industry relies on, such as ASIC-rs. We will not transfer the repo, will not take exclusive rights, and will not accept funding conditioned on ceding control.',
    },
    {
      name: 'Community Program',
      body: 'Fiscal sponsorship for OSMU and Hashrate Heatpunks: two restricted funds, community-directed, with the board approving every allocation. Never Core Projects Program money, never operating costs.',
    },
    {
      name: 'Education',
      body: 'Developer calls, the forum, the podcast, and the newsletter, plus teaching the stack in person with hands on workshops.',
    },
  ],
}

export const ourWorkClose = {
  kicker: 'The Long Game',
  line: [
    'The best one-line description of our role:',
    'the Linux Foundation of Bitcoin Mining.',
  ],
  body:
    'Commoditizing an industry is long and expensive, and core contributors deserve multi-year funding to see it through.',
}
