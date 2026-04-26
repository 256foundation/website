export interface GitHubCommit {
  sha: string
  shortSha: string
  message: string
  author: string
  date: string
  url: string
}

export interface GitHubRepoMeta {
  stars: number
  forks: number
  openIssues: number
  latestTag: string | null
  lastPushedAt: string
}

function parseOwnerRepo(githubUrl: string): string | null {
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/?#]+)/)
  return match ? match[1].replace(/\.git$/, '') : null
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': '256Foundation-website',
  }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

const REVALIDATE = { next: { revalidate: 3600 } }

export async function fetchRepoMeta(githubUrl: string): Promise<GitHubRepoMeta | null> {
  const ownerRepo = parseOwnerRepo(githubUrl)
  if (!ownerRepo) return null

  try {
    const headers = buildHeaders()
    const [repoRes, releaseRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${ownerRepo}`, { ...REVALIDATE, headers }),
      fetch(`https://api.github.com/repos/${ownerRepo}/releases/latest`, { ...REVALIDATE, headers }),
    ])

    if (!repoRes.ok) return null
    const repo = await repoRes.json()

    let latestTag: string | null = null
    if (releaseRes.ok) {
      const release = await releaseRes.json()
      latestTag = (release as Record<string, unknown>).tag_name as string ?? null
    }

    return {
      stars: repo.stargazers_count as number,
      forks: repo.forks_count as number,
      openIssues: repo.open_issues_count as number,
      latestTag,
      lastPushedAt: repo.pushed_at as string,
    }
  } catch {
    return null
  }
}

export interface GitHubOrgRepo {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
  updatedAt: string
  topics: string[]
  isArchived: boolean
}

export interface GitHubEvent {
  id: string
  type: string
  actor: string
  repo: string        // short name, org prefix stripped
  repoUrl: string
  description: string
  createdAt: string
}

export async function fetchOrgEvents(org: string, count = 8): Promise<GitHubEvent[]> {
  try {
    // Match the home page's revalidate (3600). The page-level revalidate
    // already caps how often the data fetcher runs, so a shorter value here
    // is wasted — it would never actually run more often than 1 hour.
    const res = await fetch(
      `https://api.github.com/orgs/${org}/events?per_page=30`,
      { ...REVALIDATE, headers: buildHeaders() },
    )
    if (!res.ok) return []
    const data = await res.json() as Record<string, unknown>[]

    const events: GitHubEvent[] = []

    for (const e of data) {
      if (events.length >= count) break
      const type = e.type as string
      const actor = (e.actor as Record<string, unknown>).login as string
      const repoFull = (e.repo as Record<string, unknown>).name as string
      const repo = repoFull.replace(`${org}/`, '')
      const repoUrl = `https://github.com/${repoFull}`
      const payload = e.payload as Record<string, unknown>
      const createdAt = e.created_at as string

      let description = ''

      // Note: unauthenticated org events API returns minimal payloads —
      // no commit messages, no PR titles. Build descriptions from what's available.
      if (type === 'PushEvent') {
        const ref = (payload.ref as string | undefined)?.replace('refs/heads/', '') ?? 'main'
        const commits = payload.commits as Record<string, unknown>[] | undefined
        const msg = (commits?.[0]?.message as string | undefined)?.split('\n')[0]
        description = msg ? msg.slice(0, 80) : `Pushed to ${ref}`
      } else if (type === 'PullRequestEvent') {
        const action = payload.action as string
        if (!action) continue
        const pr = payload.pull_request as Record<string, unknown> | undefined
        const num = (pr?.number ?? payload.number) as number | undefined
        const title = pr?.title as string | undefined
        const verb = action === 'closed' && (pr?.merged as boolean) ? 'merged' : action
        description = title ? `PR ${verb}: ${title.slice(0, 65)}` : `PR #${num ?? '?'} ${verb}`
      } else if (type === 'PullRequestReviewEvent') {
        const pr = payload.pull_request as Record<string, unknown> | undefined
        const num = (pr?.number ?? payload.number) as number | undefined
        description = `Review submitted on PR #${num ?? '?'}`
      } else if (type === 'IssuesEvent') {
        const action = payload.action as string
        const issue = payload.issue as Record<string, unknown> | undefined
        const title = issue?.title as string | undefined
        const num = issue?.number as number | undefined
        description = title ? `Issue ${action}: ${title.slice(0, 65)}` : `Issue #${num ?? '?'} ${action}`
      } else if (type === 'ReleaseEvent') {
        const release = payload.release as Record<string, unknown> | undefined
        description = `Released ${(release?.tag_name as string | undefined) ?? 'new version'}`
      } else if (type === 'CreateEvent') {
        const refType = payload.ref_type as string | undefined
        const ref = payload.ref as string | undefined
        description = ref ? `Created ${refType ?? 'ref'} "${ref}"` : `Created ${refType ?? 'branch'}`
      } else {
        continue // skip WatchEvent, MemberEvent, ForkEvent, etc.
      }

      events.push({ id: `${e.id}`, type, actor, repo, repoUrl, description, createdAt })
    }

    return events
  } catch {
    return []
  }
}

export async function fetchOrgRepos(org: string): Promise<GitHubOrgRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/orgs/${org}/repos?sort=updated&per_page=100&type=public`,
      { ...REVALIDATE, headers: buildHeaders() },
    )
    if (!res.ok) return []
    const data = await res.json() as Record<string, unknown>[]

    return data
      .filter((r) => !r.fork) // exclude forks — only repos owned by the org
      .map((r) => ({
        name: r.name as string,
        description: (r.description as string | null) ?? null,
        url: r.html_url as string,
        stars: r.stargazers_count as number,
        forks: r.forks_count as number,
        language: (r.language as string | null) ?? null,
        updatedAt: r.updated_at as string,
        topics: (r.topics as string[]) ?? [],
        isArchived: r.archived as boolean,
      }))
      .sort((a, b) => b.stars - a.stars || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  } catch {
    return []
  }
}

export interface GitHubOrgStats {
  repoCount: number
  totalStars: number
  followers: number
}

export async function fetchOrgStats(org: string): Promise<GitHubOrgStats> {
  try {
    const headers = buildHeaders()
    const [orgRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/orgs/${org}`, { ...REVALIDATE, headers }),
      fetch(`https://api.github.com/orgs/${org}/repos?sort=updated&per_page=100&type=public`, { ...REVALIDATE, headers }),
    ])

    let repoCount = 0
    let followers = 0
    let totalStars = 0

    if (orgRes.ok) {
      const orgData = await orgRes.json() as Record<string, unknown>
      repoCount = (orgData.public_repos as number) ?? 0
      followers = (orgData.followers as number) ?? 0
    }

    if (reposRes.ok) {
      const repos = await reposRes.json() as Record<string, unknown>[]
      totalStars = repos
        .filter(r => !r.fork)
        .reduce((sum, r) => sum + ((r.stargazers_count as number) ?? 0), 0)
    }

    return { repoCount, totalStars, followers }
  } catch {
    return { repoCount: 0, totalStars: 0, followers: 0 }
  }
}

export async function fetchRecentCommits(githubUrl: string, count = 6): Promise<GitHubCommit[]> {
  const ownerRepo = parseOwnerRepo(githubUrl)
  if (!ownerRepo) return []

  try {
    const res = await fetch(
      `https://api.github.com/repos/${ownerRepo}/commits?per_page=${count}`,
      { ...REVALIDATE, headers: buildHeaders() },
    )
    if (!res.ok) return []
    const data = await res.json() as Record<string, unknown>[]

    return data.map((c) => {
      const commit = c.commit as Record<string, unknown>
      const commitAuthor = commit.author as Record<string, unknown>
      const ghAuthor = c.author as Record<string, unknown> | null
      return {
        sha: c.sha as string,
        shortSha: (c.sha as string).slice(0, 7),
        message: (commit.message as string).split('\n')[0].slice(0, 90),
        author: (commitAuthor?.name as string) ?? (ghAuthor?.login as string) ?? 'unknown',
        date: (commitAuthor?.date as string) ?? '',
        url: c.html_url as string,
      }
    })
  } catch {
    return []
  }
}
