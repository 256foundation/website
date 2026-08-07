import fs from 'fs'
import path from 'path'

/**
 * Intrinsic pixel dimensions of an image in `public/`, read from its header.
 *
 * Newsroom cover images arrive as arbitrary frontmatter paths with no declared
 * size, and their aspect ratios differ widely (a 3:1 banner next to a 3:2
 * photo). Rendering them in one fixed-height box letterboxes or crops
 * whichever image does not match, so the post page needs real dimensions to
 * size each cover to its own ratio.
 *
 * Parses PNG/JPEG/WebP headers directly — the repo takes no new dependencies,
 * and only the first few dozen bytes are needed. Returns null for anything
 * unreadable or unrecognized; callers fall back to a fixed box.
 */
export interface ImageSize {
  width: number
  height: number
}

export function getLocalImageSize(publicPath: string): ImageSize | null {
  if (!publicPath.startsWith('/')) return null

  const file = path.join(process.cwd(), 'public', publicPath)
  let buf: Buffer
  try {
    const fd = fs.openSync(file, 'r')
    // Enough for a PNG/WebP header and a typical JPEG's leading marker run.
    buf = Buffer.alloc(65536)
    const read = fs.readSync(fd, buf, 0, 65536, 0)
    fs.closeSync(fd)
    buf = buf.subarray(0, read)
  } catch {
    return null
  }

  return parsePng(buf) ?? parseWebp(buf) ?? parseJpeg(buf)
}

function parsePng(b: Buffer): ImageSize | null {
  // 8-byte signature, then an IHDR chunk whose width/height are at 16/20.
  if (b.length < 24) return null
  if (b.readUInt32BE(0) !== 0x89504e47) return null
  if (b.toString('ascii', 12, 16) !== 'IHDR') return null
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

function parseWebp(b: Buffer): ImageSize | null {
  if (b.length < 30) return null
  if (b.toString('ascii', 0, 4) !== 'RIFF') return null
  if (b.toString('ascii', 8, 12) !== 'WEBP') return null

  const chunk = b.toString('ascii', 12, 16)

  if (chunk === 'VP8X') {
    // Canvas size is stored minus one, as 24-bit little-endian.
    const w = b.readUIntLE(24, 3) + 1
    const h = b.readUIntLE(27, 3) + 1
    return { width: w, height: h }
  }

  if (chunk === 'VP8 ') {
    // Lossy: 3-byte frame tag, 3-byte sync code, then 14-bit dimensions.
    if (b[23] !== 0x9d || b[24] !== 0x01 || b[25] !== 0x2a) return null
    return {
      width: b.readUInt16LE(26) & 0x3fff,
      height: b.readUInt16LE(28) & 0x3fff,
    }
  }

  if (chunk === 'VP8L') {
    // Lossless: 0x2f signature, then two 14-bit values packed across 4 bytes.
    if (b[20] !== 0x2f) return null
    const bits = b.readUInt32LE(21)
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    }
  }

  return null
}

function parseJpeg(b: Buffer): ImageSize | null {
  if (b.length < 4) return null
  if (b[0] !== 0xff || b[1] !== 0xd8) return null

  let off = 2
  while (off + 9 < b.length) {
    if (b[off] !== 0xff) {
      off++
      continue
    }
    const marker = b[off + 1]
    // SOF0-SOF15 carry the frame size; C4/C8/CC are tables, not frames.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: b.readUInt16BE(off + 7), height: b.readUInt16BE(off + 5) }
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      off += 2
      continue
    }
    off += 2 + b.readUInt16BE(off + 2)
  }
  return null
}
