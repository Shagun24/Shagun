# ScrollAnimation Component - Documentation

## Overview

The `ScrollAnimation` component uses GSAP ScrollTrigger and HTML Canvas to create high-performance, scroll-synchronized frame-by-frame animations. It's optimized for smooth playback with 50+ images.

## Features

- ✨ **Canvas-based rendering** - Significantly better performance than DOM-based animations
- 🎬 **Frame scrubbing** - Animation synchronized with scroll position
- 📌 **Auto-pinning** - Section stays pinned during animation
- 📊 **Progress indicator** - Visual feedback of animation progress
- ⚡ **Lazy loading support** - Load images on-demand for large image sets
- 📱 **Responsive** - Auto-adjusts to container and window resizing
- 🧹 **Automatic cleanup** - Proper GSAP ScrollTrigger cleanup on unmount

## Installation

The component requires GSAP already installed:

```bash
npm install gsap @gsap/react
```

## Basic Usage

```tsx
import ScrollAnimation from '@/components/ScrollAnimation'

export default function Page() {
  return (
    <ScrollAnimation
      frameCount={39}
      imagePath="/animation/ezgif-frame-"
      height={600}
      showProgress={true}
      lazy={false}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frameCount` | number | 50 | Total number of animation frames |
| `imagePath` | string | `/animation/ezgif-frame-` | Base path to frame images (without frame number and extension) |
| `height` | number | 800 | Height of the animation container in pixels |
| `showProgress` | boolean | true | Display progress bar and percentage |
| `lazy` | boolean | true | Enable lazy loading of images |

## Image Naming Convention

Images must follow this naming pattern:
- Frame 1: `ezgif-frame-001.png`
- Frame 2: `ezgif-frame-002.png`
- Frame 3: `ezgif-frame-003.png`
- etc.

Numbers are **zero-padded to 3 digits**. The component will automatically calculate frame numbers.

## Advanced Examples

### Example 1: Custom Height with Lazy Loading

```tsx
<ScrollAnimation
  frameCount={100}
  imagePath="/animations/product-showcase-"
  height={1000}
  showProgress={true}
  lazy={true}
/>
```

### Example 2: Minimal Configuration

```tsx
<ScrollAnimation frameCount={39} />
```

### Example 3: Integrated in Layout

```tsx
export default function PortfolioPage() {
  return (
    <main className="bg-black">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-5xl text-white">Welcome</h1>
      </section>

      {/* Animation Section */}
      <section className="bg-slate-900 py-20">
        <ScrollAnimation
          frameCount={39}
          imagePath="/animation/ezgif-frame-"
          height={600}
          showProgress={true}
          lazy={false}
        />
      </section>

      {/* Content After */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-3xl text-white">That was amazing!</h2>
      </section>
    </main>
  )
}
```

## Performance Optimization Tips

### 1. Lazy Loading for Large Image Sets
Use lazy loading when you have 100+ frames:

```tsx
<ScrollAnimation
  frameCount={150}
  lazy={true}
  height={800}
/>
```

**Pros:** Lower initial load time, lower memory usage
**Cons:** Slight delay when lazy-loading images

### 2. Image Size Optimization
- Compress images using tools like TinyPNG or ImageOptim
- Use WebP format for smaller file sizes (requires server support)
- Resize images to match your expected display size

### 3. Progressive Caching
For very large sequences, consider splitting into sections:

```tsx
{/* Section 1: Frames 1-50 */}
<ScrollAnimation frameCount={50} imagePath="/part1/frame-" />

{/* Section 2: Frames 1-50 */}
<ScrollAnimation frameCount={50} imagePath="/part2/frame-" />
```

## Troubleshooting

### Images Not Loading

**Problem:** Canvas shows black or error message
**Solutions:**
1. Verify image paths are correct
2. Check image naming follows the 3-digit zero-padded format (`001`, `002`, etc.)
3. Ensure images are in the public folder
4. Check browser console for CORS errors

### Choppy Animation

**Problem:** Animation feels stuttery or has frame drops
**Solutions:**
1. Disable lazy loading: `lazy={false}`
2. Reduce height for faster rendering
3. Compress images to smaller file sizes
4. Check for other heavy animations on the page

### Memory Issues

**Problem:** Browser tab uses excessive memory
**Solutions:**
1. Enable lazy loading: `lazy={true}`
2. Reduce frameCount
3. Reduce image dimensions
4. Use image compression

### Canvas Blurry on High DPI Displays

**Problem:** Canvas appears pixelated
**Solution:** The component handles DPI automatically. If issues persist, check image resolution.

## Advanced Customization

### Custom Canvas Context Settings

To modify canvas rendering (e.g., for different blending modes):

Edit the `drawFrame` function in ScrollAnimation.tsx:

```tsx
const ctx = canvas.getContext('2d', {
  willReadFrequently: false,
  // Add other context attributes here
})

ctx.globalCompositeOperation = 'screen' // Custom blending
ctx.imageSmoothingEnabled = true // Adjust quality
```

### Custom Progress Indicator

To customize the progress display, modify the progress section in the component:

```tsx
{/* Custom Progress */}
{showProgress && !isLoading && (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <CustomProgressComponent progress={progress} />
  </div>
)}
```

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ Mobile browsers (iOS Safari 15+, Chrome Mobile)

## Performance Metrics

Typical performance with optimized images:

- **39 frames (1920x1080):** ~60fps, 15-20MB preloaded
- **100 frames (1920x1080):** ~50-60fps with lazy loading
- **Memory usage:** ~0.5MB per uncompressed frame

## Common Patterns

### Fade-in Introduction

```tsx
export default function Page() {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Welcome</h1>
      </motion.div>
      <ScrollAnimation frameCount={39} />
    </>
  )
}
```

### Multiple Animations

```tsx
<>
  <ScrollAnimation
    frameCount={50}
    imagePath="/intro/"
    height={600}
  />
  <ScrollAnimation
    frameCount={50}
    imagePath="/main/"
    height={800}
  />
</>
```

## API Reference

### Component State

The component manages internally:
- `progress`: Current animation progress (0-100)
- `isLoading`: Whether images are currently loading
- `error`: Error message if loading fails

### Refs (Internal Use Only)

- `containerRef`: Main container element
- `canvasRef`: Canvas element
- `imageArrayRef`: Array of preloaded images
- `currentFrameRef`: Current frame index
- `animationFrameRef`: RequestAnimationFrame ID

## License

This component is part of your portfolio project and can be freely customized for your needs.
