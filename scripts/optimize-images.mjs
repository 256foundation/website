// Re-encode newsroom raster images to right-sized WebP.
//
// Newsroom art is authored as whatever came out of the camera/deck (PNGs up to
// 3 MB, photos up to 5712px wide). Every one is displayed at most ~1600px, so
// shipping the originals makes next/image transcode megabytes on every cache
// miss and makes raw in-article <img> tags fetch megabytes directly.
//
// For each raster file under public/newsroom this writes a sibling `.webp` (max
// 1600px, quality 82), points every reference at it, and removes the original.
// Already-`.webp` files are recompressed in place. Safe to re-run.
//
//   node scripts/optimize-images.mjs
//
// sharp is an optional dependency of next; it is pinned explicitly in
// package.json so this script and the production optimizer behave identically.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public/newsroom')
const REFERENCE_DIRS = ['content', 'data', 'components', 'app', 'lib']
const RASTER = new Set(['.png', '.jpg', '.jpeg'])

const MAX_WIDTH = 1600
const QUALITY = 82

/** Every file we touched: `/newsroom/...` before, and the `/newsroom/...webp` after. */
const rewrites = new Map()

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

function publicPath(abs) {
  return '/' + path.relative(path.join(root, 'public'), abs).split(path.sep).join('/')
}

async function process(abs) {
  const ext = path.extname(abs).toLowerCase()
  const isWebp = ext === '.webp'
  if (!RASTER.has(ext) && !isWebp) return

  const target = isWebp ? abs : abs.slice(0, -ext.length) + '.webp'
  const before = publicPath(abs)
  const after = publicPath(target)
  const stat = fs.statSync(abs)
  const meta = await sharp(abs).metadata()

  const pipeline = sharp(abs)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: QUALITY, effort: 6 })

  const tmp = target + '.tmp'
  const { width, height, size } = await pipeline.toFile(tmp)

  // In-place webp: swap via tmp so we never read and write the same path.
  fs.renameSync(tmp, target)
  if (!isWebp) fs.rmSync(abs)

  rewrites.set(before, after)
  const pct = Math.round((1 - size / stat.size) * 100)
  console.log(
    `${before} -> ${after}  ${meta.width}x${meta.height} -> ${width}x${height}  ` +
      `${(stat.size / 1024).toFixed(0)}KB -> ${(size / 1024).toFixed(0)}KB (${pct}%)`,
  )
}

function rewriteReferences() {
  const files = REFERENCE_DIRS.flatMap((dir) => {
    const abs = path.join(root, dir)
    return fs.existsSync(abs) ? [...walk(abs)] : []
  }).filter((f) => /\.(mdx?|tsx?|ts|json)$/.test(f))

  let edited = 0
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8')
    let next = original
    for (const [from, to] of rewrites) {
      if (from === to) continue
      next = next.split(from).join(to)
    }
    if (next !== original) {
      fs.writeFileSync(file, next)
      edited++
      console.log(`refs updated: ${path.relative(root, file)}`)
    }
  }
  return edited
}

async function main() {
  if (!fs.existsSync(publicDir)) throw new Error(`missing ${publicDir}`)

  const beforeBytes = [...walk(publicDir)].reduce((n, f) => n + fs.statSync(f).size, 0)
  for (const file of [...walk(publicDir)]) await process(file)

  const edited = rewriteReferences()
  const afterBytes = [...walk(publicDir)].reduce((n, f) => n + fs.statSync(f).size, 0)

  console.log(
    `\n${rewrites.size} images processed, ${edited} reference files updated.` +
      `\npublic/newsroom: ${(beforeBytes / 1024 / 1024).toFixed(1)}MB -> ` +
      `${(afterBytes / 1024 / 1024).toFixed(1)}MB`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
