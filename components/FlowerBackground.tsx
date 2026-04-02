'use client'
import { useEffect, useRef } from 'react'

export default function FlowerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let scrollProgress = 0
    let animFrame: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scrollProgress = Math.min(window.scrollY / maxScroll, 1)
    }
    window.addEventListener('scroll', onScroll)

    // Draw a single petal using bezier curves
    const drawPetal = (
      cx: number,
      cy: number,
      angle: number,
      length: number,
      width: number,
      alpha: number,
      color: string
    ) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      ctx.globalAlpha = alpha

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(
        width, -length * 0.3,
        width, -length * 0.7,
        0, -length
      )
      ctx.bezierCurveTo(
        -width, -length * 0.7,
        -width, -length * 0.3,
        0, 0
      )

      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }

    // Draw a full flower
    const drawFlower = (
      x: number,
      y: number,
      progress: number, // 0 = closed, 1 = fully open
      size: number,
      hue: number,
      delay: number
    ) => {
      const p = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)))
      if (p <= 0) return

      const petalCount = 6
      const petalLength = size * p
      const petalWidth = (size * 0.35) * p

      // Outer petals
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2
        const alpha = 0.15 * p
        drawPetal(x, y, angle, petalLength, petalWidth, alpha, `hsl(${hue}, 80%, 55%)`)
      }

      // Inner petals (rotated)
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2 + Math.PI / petalCount
        const alpha = 0.2 * p
        drawPetal(x, y, angle, petalLength * 0.7, petalWidth * 0.8, alpha, `hsl(${hue + 20}, 90%, 65%)`)
      }

      // Stem
      if (p > 0.2) {
        const stemAlpha = Math.min(1, (p - 0.2) / 0.3) * 0.25
        ctx.save()
        ctx.globalAlpha = stemAlpha
        ctx.strokeStyle = `hsl(${hue}, 70%, 40%)`
        ctx.lineWidth = 1.5 * p
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + size * 0.1, y + size * 1.2)
        ctx.stroke()
        ctx.restore()
      }

      // Center glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 0.3 * p)
      gradient.addColorStop(0, `hsla(${hue + 40}, 100%, 80%, ${0.6 * p})`)
      gradient.addColorStop(1, `hsla(${hue}, 80%, 50%, 0)`)
      ctx.beginPath()
      ctx.arc(x, y, size * 0.3 * p, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Leaf shape
    const drawLeaf = (
      x: number,
      y: number,
      angle: number,
      size: number,
      progress: number,
      hue: number
    ) => {
      if (progress <= 0) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.globalAlpha = 0.18 * progress
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(size * 0.4, -size * 0.5, size * 0.4, -size, 0, -size * 1.2)
      ctx.bezierCurveTo(-size * 0.4, -size, -size * 0.4, -size * 0.5, 0, 0)
      ctx.fillStyle = `hsl(${hue}, 70%, 35%)`
      ctx.fill()
      ctx.restore()
    }

    // Define flowers: [x%, y%, size, hue, delay]
    const flowers: [number, number, number, number, number][] = [
      [0.12, 0.25, 90,  130, 0.00],
      [0.88, 0.18, 75,  145, 0.05],
      [0.05, 0.60, 60,  120, 0.10],
      [0.92, 0.55, 80,  155, 0.08],
      [0.25, 0.85, 55,  135, 0.15],
      [0.75, 0.80, 65,  125, 0.12],
      [0.50, 0.10, 50,  140, 0.18],
      [0.18, 0.45, 45,  150, 0.20],
      [0.82, 0.38, 50,  130, 0.22],
      [0.40, 0.70, 40,  145, 0.25],
      [0.60, 0.65, 42,  135, 0.28],
      [0.03, 0.88, 35,  120, 0.30],
      [0.97, 0.78, 38,  155, 0.25],
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      flowers.forEach(([xPct, yPct, size, hue, delay]) => {
        const x = xPct * canvas.width
        const y = yPct * canvas.height

        // Leaves under the flower
        drawLeaf(x - size * 0.6, y + size * 0.3, -0.5, size * 0.5,
          Math.max(0, (scrollProgress - delay) / (1 - delay)), hue)
        drawLeaf(x + size * 0.6, y + size * 0.3, 0.5, size * 0.5,
          Math.max(0, (scrollProgress - delay) / (1 - delay)), hue)

        drawFlower(x, y, scrollProgress, size, hue, delay)
      })

      animFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen', opacity: 0.6 }}
    />
  )
}
