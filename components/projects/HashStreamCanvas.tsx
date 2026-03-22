'use client'

import { useEffect, useRef } from 'react'

export default function HashStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastFrame = 0
    const FPS_INTERVAL = 1000 / 30 // cap at 30fps

    const hexChars = '0123456789abcdef'
    const columns: number[] = []
    let fontSize = 14
    let columnCount = 0

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      fontSize = 14
      columnCount = Math.floor(canvas.width / fontSize)
      columns.length = 0
      for (let i = 0; i < columnCount; i++) {
        columns[i] = Math.random() * canvas.height
      }
    }

    resize()
    window.addEventListener('resize', resize)

    function draw(timestamp: number) {
      if (!ctx || !canvas) return

      const elapsed = timestamp - lastFrame
      if (elapsed < FPS_INTERVAL) {
        animRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrame = timestamp

      // Fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00FF41'
      ctx.font = `${fontSize}px monospace`
      ctx.globalAlpha = 0.1

      for (let i = 0; i < columnCount; i++) {
        const char = hexChars[Math.floor(Math.random() * hexChars.length)]
        const x = i * fontSize
        const y = columns[i]

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i] += fontSize
      }

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
      role="presentation"
    />
  )
}
