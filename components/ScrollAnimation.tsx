'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationProps {
  frameCount?: number
  imagePath?: string
  height?: number
  showProgress?: boolean
  lazy?: boolean
}

export default function ScrollAnimation({
  frameCount = 50,
  imagePath = '/animation/ezgif-frame-',
  height = 800,
  showProgress = true,
  lazy = true,
}: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageArrayRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const isLoadingRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Preload images with lazy loading support
  const preloadImages = useCallback(async () => {
    try {
      isLoadingRef.current = true
      setIsLoading(true)

      const images: HTMLImageElement[] = []
      const imagePromises: Promise<void>[] = []

      // Determine total frames by checking which images exist
      let totalFrames = frameCount
      if (lazy) {
        // For lazy loading, we'll load on-demand but still prepare the array
        totalFrames = frameCount
      }

      // Create image elements with proper numbering
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image()
        const frameNum = String(i).padStart(3, '0')
        img.src = `${imagePath}${frameNum}.png`
        img.crossOrigin = 'anonymous'

        if (!lazy) {
          // Load all images upfront
          const loadPromise = new Promise<void>((resolve, reject) => {
            img.onload = () => resolve()
            img.onerror = reject
          })
          imagePromises.push(loadPromise)
        }

        images.push(img)
      }

      // Wait for all images to load if not lazy loading
      if (!lazy && imagePromises.length > 0) {
        await Promise.all(imagePromises)
      }

      imageArrayRef.current = images
      isLoadingRef.current = false
      setIsLoading(false)
    } catch (err) {
      console.error('Error preloading images:', err)
      setError('Failed to load animation frames')
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }, [frameCount, imagePath, lazy])

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const frameNum = frameIndex % imageArrayRef.current.length
    const image = imageArrayRef.current[frameNum]

    if (!image || !image.complete) return

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate aspect ratio and draw image
    const canvasAspect = canvas.width / canvas.height
    const imageAspect = image.width / image.height

    let drawWidth = canvas.width
    let drawHeight = canvas.height

    if (canvasAspect > imageAspect) {
      drawWidth = canvas.height * imageAspect
    } else {
      drawHeight = canvas.width / imageAspect
    }

    const x = (canvas.width - drawWidth) / 2
    const y = (canvas.height - drawHeight) / 2

    ctx.drawImage(image, x, y, drawWidth, drawHeight)
  }, [])

  // Setup GSAP ScrollTrigger animation
  useGSAP(() => {
    if (!containerRef.current || !canvasRef.current || imageArrayRef.current.length === 0) {
      return
    }

    const totalFrames = imageArrayRef.current.length

    // Create timeline for smooth frame scrubbing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Smooth scrubbing
        pin: true, // Pin the section
        pinSpacing: true,
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Update current frame based on scroll progress
          const frame = Math.floor(self.progress * (totalFrames - 1))
          if (currentFrameRef.current !== frame) {
            currentFrameRef.current = frame
            drawFrame(frame)

            // Update progress indicator
            if (showProgress) {
              setProgress(Math.round(self.progress * 100))
            }
          }
        },
      },
    })

    // Add dummy animation to trigger the timeline
    tl.to({}, { duration: 1 })

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [drawFrame, showProgress])

  // Initialize canvas and preload images
  useEffect(() => {
    const initializeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Set canvas size to match container
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width || window.innerWidth
      canvas.height = height

      // Handle window resize
      const handleResize = () => {
        const newRect = canvas.getBoundingClientRect()
        if (newRect.width > 0) {
          canvas.width = newRect.width
          canvas.height = height
          // Redraw current frame
          if (currentFrameRef.current < imageArrayRef.current.length) {
            drawFrame(currentFrameRef.current)
          }
        }
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    preloadImages().then(() => {
      // Draw first frame after images are loaded
      if (imageArrayRef.current.length > 0) {
        drawFrame(0)
      }
    })

    const cleanup = initializeCanvas()
    return cleanup
  }, [preloadImages, drawFrame, height])

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-900/20 rounded-lg">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: `${height}px` }}
    >
      {/* Canvas for frame rendering */}
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height: `${height}px`, display: 'block' }}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-slate-600 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/80">Loading animation frames...</p>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {showProgress && !isLoading && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-3">
            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Progress text */}
            <p className="text-white/60 text-sm font-medium">{progress}%</p>
          </div>
        </div>
      )}

      {/* Scroll hint */}
      {!isLoading && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-white/40 text-sm animate-pulse">
          Scroll to animate
        </div>
      )}
    </div>
  )
}
