'use client'

import { useEffect, useRef } from 'react'

export default function ScrollAnimationBackground({
  frameCount = 217,
  imagePath = '/animation/frame_',
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('❌ Canvas ref not found')
      return
    }

    console.log('✅ Canvas initialized')

    // Load images
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      const num = String(i).padStart(3, '0')
      img.src = `${imagePath}${num}_delay-0.04s.gif`
      img.onload = () => {
        loadedCount++
        console.log(`Loaded frame ${i}/${frameCount}`)
      }
      img.onerror = () => {
        console.error(`Failed to load ${imagePath}${num}_delay-0.04s.gif`)
      }
      images.push(img)
    }

    console.log(`📦 Queued ${frameCount} images for loading`)

    // Resize canvas with proper DPI handling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
      
      console.log(`📐 Canvas resized to ${window.innerWidth}x${window.innerHeight} (DPR: ${dpr})`)
    }

    resizeCanvas()

    // Draw frame
    let lastFrame = -1
    const drawFrame = (index: number) => {
      const img = images[index]
      if (!img || !img.complete) {
        return
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        console.error('❌ Canvas context failed')
        return
      }

      // Clear with white
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Calculate fit to cover entire screen (like background-size: cover)
      const screenRatio = window.innerWidth / window.innerHeight
      const imgRatio = img.width / img.height

      let w, h
      
      // Cover approach: image covers full screen, may overflow
      if (screenRatio > imgRatio) {
        // Screen is wider comparatively, fit by width
        w = window.innerWidth
        h = w / imgRatio
      } else {
        // Screen is taller comparatively, fit by height
        h = window.innerHeight
        w = h * imgRatio
      }

      // Center the image
      const x = (window.innerWidth - w) / 2
      const y = (window.innerHeight - h) / 2

      ctx.drawImage(img, x, y, w, h)
      console.log(`🎬 Drew frame ${index}`)
    }

    // Scroll listener
    const handleScroll = () => {
      if (images.length === 0) return

      const scrollMax = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollMax > 0 ? scrolled / scrollMax : 0
      const frameIndex = Math.floor(progress * (images.length - 1))

      if (frameIndex !== lastFrame) {
        lastFrame = frameIndex
        drawFrame(frameIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Resize listener
    const handleResize = () => {
      resizeCanvas()
      if (lastFrame >= 0) {
        drawFrame(lastFrame)
      }
    }

    window.addEventListener('resize', handleResize)

    // Initial draw after images load
    const drawInterval = setInterval(() => {
      if (loadedCount > 0) {
        clearInterval(drawInterval)
        drawFrame(0)
        console.log('✅ Initial frame drawn')
      }
    }, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearInterval(drawInterval)
    }
  }, [frameCount, imagePath])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen -z-10"
      style={{ display: 'block', background: '#fff' }}
    />
  )
}
