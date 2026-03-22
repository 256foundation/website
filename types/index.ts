// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  external?: boolean
  divider?: boolean
  children?: NavItem[]
}

// ── Site stats ────────────────────────────────────────────────
export interface SiteStats {
  btcAllocated: number
  usdAllocated: number
  blocksFound: number
  totalGrantees: number
}

// ── Team ──────────────────────────────────────────────────────
export interface SocialLinks {
  x?: string
  nostr?: string
  github?: string
  website?: string
  telegram?: string
}

export interface TeamMember {
  name: string
  handle?: string
  role: string
  bio: string
  headshot: string
  links: SocialLinks
}

// ── Projects ──────────────────────────────────────────────────
export type ProjectSlug = 'ember-one' | 'mujina' | 'libre-board' | 'hydrapool'
export type ProjectType = 'hardware' | 'software'

export interface Milestone {
  label: string
  status: 'completed' | 'active' | 'upcoming'
  date?: string
  description?: string
}

export interface PillarProject {
  slug: ProjectSlug
  type: ProjectType
  name: string
  tagline: string
  description: string
  whyCoreGrant: string
  whyNecessary: string
  technicalDetails: string
  status: 'active' | 'completed' | 'paused'
  externalUrl: string
  githubUrl: string
  forumCategory: string
  ogImage: string
  milestones: Milestone[]
  team: {
    leadEngineer: TeamMember
    projectManager: TeamMember
  }
}

// ── Supporters ────────────────────────────────────────────────
export interface Supporter {
  name: string
  image: string
  link: string
  tier: 1 | 2 | 3
}

// ── Grants ────────────────────────────────────────────────────
export interface Grant {
  name: string
  grantee: string
  category: 'hardware' | 'software' | 'research' | 'education'
  amountBTC: number
  status: 'active' | 'completed'
  dateFunded: string
  description?: string
}

// ── TeleHash ──────────────────────────────────────────────────
export interface TeleHashEvent {
  number: number
  date: string
  blockFound: boolean
  btcRaised?: number
  videoUrl?: string
  summary?: string
}

// ── FAQ ───────────────────────────────────────────────────────
export interface FAQItem {
  question: string
  answer: string
  category: 'foundation' | 'donations' | 'grants' | 'projects' | 'technical'
}

// ── Substack ──────────────────────────────────────────────────
export interface SubstackPost {
  title: string
  link: string
  pubDate: string
  description?: string
  image?: string
}
