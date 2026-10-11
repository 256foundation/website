/**
 * Renders one schema.org JSON-LD block. Server-only: the data comes from
 * lib/agentSeo.ts builders, which read the filesystem and must never reach
 * a client bundle.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
