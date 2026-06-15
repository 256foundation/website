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
  btcRaised: number
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

export interface ProjectLogo {
  /** Wide/banner image (e.g. social card with text) */
  banner?: string
  /** Portrait or square character/mascot image */
  character?: string
  /** Square icon/logomark */
  icon?: string
}

export interface KeySpec {
  label: string
  value: string
}

export interface TechFeatureGroup {
  category: string
  items: string[]
}

export interface ProjectContextPoint {
  heading: string
  body: string
}

export interface ProjectContext {
  sectionTitle: string
  intro: string
  points: ProjectContextPoint[]
}

export interface PillarProject {
  slug: ProjectSlug
  type: ProjectType
  name: string
  tagline: string
  description: string
  whyCoreGrant: string
  whyNecessary: string
  context?: ProjectContext
  technicalDetails: string
  keySpecs?: KeySpec[]
  techFeatures?: TechFeatureGroup[]
  status: 'active' | 'completed' | 'paused'
  externalUrl: string
  githubUrl: string
  forumCategory: string
  forumCategoryApiUrl: string
  ogImage?: string
  logo?: ProjectLogo
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
  startDate?: string
  duration?: string
  license?: string
  description?: string
}

// ── TeleHash ──────────────────────────────────────────────────
export interface TeleHashEventStats {
  peakHashrate: string
  avgHashrate: string
  totalHashes: string
  uniqueWorkers: number
  uniqueUsers: number
  acceptedShares: number
  rejectRate: string
  bestShare: string
}

export interface TeleHashLeaderboardEntry {
  rank: number
  user: string    // npub, @handle, or plain name
  name?: string   // resolved display name (from Nostr profile, if known)
  hashes: string  // human-readable e.g. "22.67 ZH"
  share: string   // "73.60%"
}

export interface TeleHashEvent {
  number: number
  date: string
  blockFound: boolean
  btcRaised?: number
  blockUrl?: string
  videoUrl?: string
  summary?: string
  photos?: string[]   // paths relative to /public, e.g. '/telehash/th3-01.jpg'
  stats?: TeleHashEventStats
  leaderboard?: TeleHashLeaderboardEntry[]
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

// ── Newsroom ──────────────────────────────────────────────────
export interface NewsroomPost {
  slug: string
  title: string
  date: string
  author: string
  category: 'announcement' | 'mission' | 'industry' | 'partner'
  excerpt: string
  coverImage?: string
  ogImage?: string
}
