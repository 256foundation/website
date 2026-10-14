// Re-encode oversized brand/community/project raster art to right-sized WebP.
//
// The newsroom pass (scripts/optimize-images.mjs) covers article art. This one
// covers art served raw through <img>/<picture> (project marks, ecosystem
// and supporter logos), the full-bleed hero photos, the community carousel,
// and team headshots, where every original megabyte is shipped to the browser
// at a render size far below the source.
//
// For each raster under the dirs below larger than THRESHOLD, this writes a
// sibling `.webp` (longest side MAX_PX, quality 80), points every reference at
// it, and removes the original. Directories marked `webp: true` also re-encode
// their already-WebP files in place so hero art authored at a higher quality is
// brought down too. Files already small enough are left untouched. Safe to
// re-run.
//
//   node scripts/optimize-art.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
// dir -> longest-side cap. Marks/logos render tiny; heroes fill the viewport.
// `webp: true` re-encodes existing .webp in that dir in place as well.
// `filesOnly: true` handles just the immediate files (the root hero art).
const TARGET_DIRS = [
  { dir: 'public/projects', max: 800 },
  { dir: 'public/ecosystem', max: 800 },
  { dir: 'public/supporters', max: 800 },
  { dir: 'public/telehash', max: 1024, webp: true },
  { dir: 'public/community', max: 1600, webp: true },
  { dir: 'public/team', max: 800, webp: true },
  { dir: 'public', max: 1920, webp: true, filesOnly: true },
]
const REFERENCE_DIRS = ['content', 'data', 'components', 'app', 'lib']
const RASTER = new Set(['.png', '.jpg', '.jpeg'])

const QUALITY = 80
const THRESHOLD = 40 * 1024

const rewrites = new Map()

function* walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

/** Immediate files of a directory, skipping subdirectories. */
function* walkFlat(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) yield path.join(dir, entry.name)
  }
}

function publicPath(abs) {
  return '/' + path.relative(publicDir, abs).split(path.sep).join('/')
}

/** Raster (.png/.jpg) -> sibling .webp, then delete the original. */
async function processRaster(abs, maxPx) {
  const ext = path.extname(abs).toLowerCase()
  if (!RASTER.has(ext)) return
  const stat = fs.statSync(abs)
  if (stat.size < THRESHOLD) return

  const target = abs.slice(0, -ext.length) + '.webp'
  const before = publicPath(abs)
  const after = publicPath(target)
  const meta = await sharp(abs).metadata()

  const tmp = target + '.tmp'
  const { width, height, size } = await sharp(abs)
    .resize({ width: maxPx, height: maxPx, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(tmp)

  fs.renameSync(tmp, target)
  fs.rmSync(abs)

  rewrites.set(before, after)
  const pct = Math.round((1 - size / stat.size) * 100)
  console.log(
    `${before} -> ${after}  ${meta.width}x${meta.height} -> ${width}x${height}  ` +
      `${(stat.size / 1024).toFixed(0)}KB -> ${(size / 1024).toFixed(0)}KB (${pct}%)`,
  )
}

/** Existing .webp -> recompressed in place at the same dimensions. */
async function processWebp(abs, maxPx) {
  if (path.extname(abs).toLowerCase() !== '.webp') return
  const stat = fs.statSync(abs)
  if (stat.size < THRESHOLD) return

  const meta = await sharp(abs).metadata()
  const tmp = abs + '.tmp'
  const { width, height, size } = await sharp(abs)
    .resize({ width: maxPx, height: maxPx, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(tmp)
  // Only keep the re-encode if it actually helped.
  if (size >= stat.size) {
    fs.rmSync(tmp)
    return
  }
  fs.renameSync(tmp, abs)
  const pct = Math.round((1 - size / stat.size) * 100)
  console.log(
    `${publicPath(abs)}  ${meta.width}x${meta.height} -> ${width}x${height}  ` +
      `${(stat.size / 1024).toFixed(0)}KB -> ${(size / 1024).toFixed(0)}KB (${pct}%)`,
  )
}

function rewriteReferences() {
  const files = REFERENCE_DIRS.flatMap((dir) => {
    const abs = path.join(root, dir)
    return [...walk(abs)]
  }).filter((f) => /\.(mdx?|tsx?|ts|json)$/.test(f))

  let edited = 0
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8')
    let next = original
    for (const [from, to] of rewrites) next = next.split(from).join(to)
    if (next !== original) {
      fs.writeFileSync(file, next)
      edited++
      console.log(`refs updated: ${path.relative(root, file)}`)
    }
  }
  return edited
}

async function main() {
  const allFiles = [...walk(publicDir)]
  const before = allFiles.reduce((n, f) => n + fs.statSync(f).size, 0)

  for (const { dir, max, webp, filesOnly } of TARGET_DIRS) {
    const absDir = path.join(root, dir)
    for (const file of filesOnly ? walkFlat(absDir) : walk(absDir)) {
      await processRaster(file, max)
      if (webp) await processWebp(file, max)
    }
  }

  const edited = rewriteReferences()
  const after = [...walk(publicDir)].reduce((n, f) => n + fs.statSync(f).size, 0)

  console.log(
    `\n${rewrites.size} images converted, ${edited} reference files updated.\n` +
      `public: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
