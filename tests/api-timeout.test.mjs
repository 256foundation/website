// Verifies AbortSignal.timeout — used in app/api/hashdash/route.ts to fail
// fast when the upstream pool/Primal APIs hang. Catches the case where the
// runtime/Node version doesn't support the API.
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('AbortSignal.timeout is available in this runtime', () => {
  assert.equal(typeof AbortSignal.timeout, 'function')
  const sig = AbortSignal.timeout(100)
  assert.equal(sig.aborted, false)
})

test('AbortSignal.timeout aborts after the configured delay', async () => {
  const sig = AbortSignal.timeout(50)
  await new Promise((r) => setTimeout(r, 80))
  assert.equal(sig.aborted, true)
  assert.equal(sig.reason?.name, 'TimeoutError')
})

test('a fetch wrapped with AbortSignal.timeout rejects when the upstream hangs', async () => {
  // Spin up a tiny TCP-like server inside Node that accepts but never responds.
  const { createServer } = await import('node:http')
  const server = createServer(() => {
    /* never reply — simulates a hung upstream */
  })
  await new Promise((r) => server.listen(0, r))
  const { port } = server.address()
  const url = `http://127.0.0.1:${port}/`

  const start = Date.now()
  await assert.rejects(
    fetch(url, { signal: AbortSignal.timeout(150) }),
    /aborted|timeout/i,
  )
  const elapsed = Date.now() - start
  assert.ok(
    elapsed < 1000,
    `fetch should abort fast (got ${elapsed}ms — timeout not honored)`,
  )

  server.close()
})
