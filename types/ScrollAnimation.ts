/**
 * ScrollAnimation Component Types
 * TypeScript interfaces and types for the ScrollAnimation component
 */

/**
 * Props for the ScrollAnimation component
 */
export interface ScrollAnimationProps {
  /**
   * Total number of animation frames to load
   * @default 50
   * @example 39 for a 39-frame animation
   */
  frameCount?: number

  /**
   * Base path to the animation frames (without frame number and extension)
   * @default '/animation/ezgif-frame-'
   * @example '/animation/ezgif-frame-' will load '/animation/ezgif-frame-001.png', etc.
   * @remarks The component automatically appends zero-padded frame numbers (001, 002, etc.)
   */
  imagePath?: string

  /**
   * Height of the canvas in pixels
   * @default 800
   * @remarks Width is automatically calculated to match container width
   */
  height?: number

  /**
   * Whether to display the progress indicator
   * Shows a progress bar and percentage text
   * @default true
   */
  showProgress?: boolean

  /**
   * Whether to use lazy loading for images
   * When true, images are loaded on-demand during scroll
   * When false, all images are preloaded before animation starts
   * @default true
   * @remarks Use false for better performance with small image sets
   * @remarks Use true for better initial load time with 100+ frames
   */
  lazy?: boolean
}

/**
 * Internal component state (for reference, not meant to be modified)
 */
export interface ScrollAnimationState {
  /** Current animation progress from 0 to 100 */
  progress: number

  /** Whether images are currently loading */
  isLoading: boolean

  /** Error message if loading fails, null otherwise */
  error: string | null
}

/**
 * Canvas rendering context configuration
 */
export interface CanvasRenderConfig {
  /** Canvas element */
  canvas: HTMLCanvasElement

  /** Rendering context */
  ctx: CanvasRenderingContext2D

  /** Image to draw */
  image: HTMLImageElement

  /** Canvas width in pixels */
  width: number

  /** Canvas height in pixels */
  height: number

  /** Image width in pixels */
  imageWidth: number

  /** Image height in pixels */
  imageHeight: number
}

/**
 * GSAP ScrollTrigger configuration options for this component
 */
export interface ScrollTriggerConfig {
  /** Trigger element */
  trigger: HTMLElement

  /** When animation starts (relative to viewport) */
  start: string // 'top center'

  /** When animation ends (relative to viewport) */
  end: string // 'bottom center'

  /** Smooth scrubbing value (1 = smooth, 0 = snap to frame) */
  scrub: number // 1

  /** Whether to pin the element during animation */
  pin: boolean // true

  /** Show markers for debugging */
  markers: boolean // false
}

/**
 * Performance configuration
 */
export interface PerformanceConfig {
  /** Maximum number of frames to preload at once */
  maxPreloadBatch: number

  /** Delay between batch loads (milliseconds) */
  batchLoadDelay: number

  /** Whether to use image smoothing on canvas */
  imageSmoothing: boolean

  /** Canvas rendering quality */
  quality: 'low' | 'medium' | 'high'
}

/**
 * Image loading configuration
 */
export interface ImageLoadConfig {
  /** Whether to use lazy loading */
  lazy: boolean

  /** Total number of images to load */
  frameCount: number

  /** Base path to images */
  imagePath: string

  /** Timeout for image loading (milliseconds) */
  loadTimeout: number

  /** Whether to use CORS for images */
  crossOrigin: 'anonymous' | 'use-credentials'
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
  frameCount: 50,
  imagePath: '/animation/ezgif-frame-',
  height: 800,
  showProgress: true,
  lazy: true,
} as const

/**
 * Image naming pattern information
 * @example
 * // Frame 1 -> '001'
 * // Frame 2 -> '002'
 * // Frame 10 -> '010'
 * // Frame 100 -> '100'
 */
export const IMAGE_NAMING = {
  /** Frames are zero-padded to 3 digits */
  padding: 3,
  /** File extension for animation frames */
  extension: '.png',
  /** Example format: 'ezgif-frame-001.png' */
  example: 'ezgif-frame-001.png',
} as const

/**
 * Typical performance benchmarks
 */
export const PERFORMANCE_BENCHMARKS = {
  /** Small animation set (39 frames) */
  small: {
    frameCount: 39,
    approximateMemory: '15-20MB preloaded',
    expectedFPS: 60,
    loadTime: '1-2 seconds',
  },
  /** Medium animation set (100 frames) */
  medium: {
    frameCount: 100,
    approximateMemory: '5-10MB with lazy loading',
    expectedFPS: '50-60',
    loadTime: '< 500ms',
  },
  /** Large animation set (200+ frames) */
  large: {
    frameCount: 200,
    approximateMemory: '2-5MB with lazy loading',
    expectedFPS: '50-60',
    loadTime: '< 200ms',
    recommendation: 'Use lazy loading',
  },
} as const

/**
 * CSS class names for styling
 */
export const STYLE_CLASSES = {
  container: 'relative w-full bg-black overflow-hidden',
  canvas: 'w-full block',
  loadingOverlay: 'absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm',
  loadingSpinner: 'w-12 h-12 border-3 border-slate-600 border-t-white rounded-full animate-spin',
  progressContainer: 'absolute bottom-8 left-1/2 -translate-x-1/2 z-10',
  progressBar: 'w-48 h-1 bg-white/20 rounded-full overflow-hidden',
  progressFill: 'h-full bg-gradient-to-r from-cyan-500 to-purple-500',
  progressText: 'text-white/60 text-sm font-medium',
  scrollHint: 'absolute top-8 left-1/2 -translate-x-1/2 z-10 text-white/40 text-sm animate-pulse',
} as const

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  failedToLoad: 'Failed to load animation frames',
  invalidFrameCount: 'Frame count must be greater than 0',
  invalidHeight: 'Height must be greater than 0',
  canvasNotFound: 'Canvas element not found',
  imageLoadTimeout: 'Image loading timed out',
} as const

/**
 * Browser compatibility information
 */
export const BROWSER_SUPPORT = {
  chrome: '90+',
  firefox: '88+',
  safari: '15+',
  edge: '90+',
  mobile: {
    ios: 'Safari 15+',
    android: 'Chrome 90+',
  },
} as const

/**
 * Utility type for frame index
 */
export type FrameIndex = number & { readonly __brand: 'FrameIndex' }

/**
 * Utility function to create valid frame index
 */
export function createFrameIndex(index: number): FrameIndex {
  if (index < 0 || !Number.isInteger(index)) {
    throw new Error('Frame index must be a non-negative integer')
  }
  return index as FrameIndex
}

/**
 * Event emitted during animation progress
 */
export interface AnimationProgressEvent {
  /** Current frame index */
  frame: FrameIndex

  /** Animation progress from 0 to 1 */
  progress: number

  /** Total number of frames */
  totalFrames: number

  /** Scroll velocity */
  velocity: number

  /** Timestamp of the update */
  timestamp: number
}
