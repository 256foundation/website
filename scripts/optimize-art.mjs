// Re-encode oversized brand/community/project raster art to right-sized WebP.
//
// The newsroom pass (scripts/optimize-images.mjs) covers article art. This one
// covers the art served raw through <img>/<picture> (project marks, ecosystem
// and supporter logos), where every original megabyte is shipped to the browser
// at a render size of ~48-80px.
//
// For each raster under the dirs below larger than THRESHOLD, this writes a
// sibling `.webp` (longest side MAX_PX, quality 82), points every reference at
// it, and removes the original. Files already small enough are left untouched.
// Safe to re-run.
//
//   node scripts/optimize-art.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TARGET_DIRS = ['public/projects', 'public/ecosystem', 'public/supporters']
const REFERENCE_DIRS = ['content', 'data', 'components', 'app', 'lib']
const RASTER = new Set(['.png', '.jpg', '.jpeg'])

const MAX_PX = 800
const QUALITY = 82
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

function publicPath(abs) {
  return '/' + path.relative(path.join(root, 'public'), abs).split(path.sep).join('/')
}

async function process(abs) {
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
    .resize({ width: MAX_PX, height: MAX_PX, withoutEnlargement: true, fit: 'inside' })
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
  const files = TARGET_DIRS.flatMap((d) => [...walk(path.join(root, d))])
  const before = files.reduce((n, f) => n + fs.statSync(f).size, 0)
  for (const file of files) await process(file)
  const edited = rewriteReferences()
  const after = TARGET_DIRS.flatMap((d) => [...walk(path.join(root, d))])
    .reduce((n, f) => n + fs.statSync(f).size, 0)

  console.log(
    `\n${rewrites.size} images converted, ${edited} reference files updated.\n` +
      `target dirs: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
