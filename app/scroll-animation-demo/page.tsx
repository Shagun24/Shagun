'use client'

import ScrollAnimation from '@/components/ScrollAnimation'

export default function ScrollAnimationDemo() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">Scroll Animation Demo</h1>
          <p className="text-xl text-slate-400">Scroll down to see the frame-by-frame animation</p>
          <div className="text-sm text-slate-500 mt-8">↓ Scroll down ↓</div>
        </div>
      </section>

      {/* Main scroll animation section */}
      <section className="bg-black py-20">
        <ScrollAnimation
          frameCount={39} // Adjust based on actual frame count in your animation folder
          imagePath="/animation/ezgif-frame-"
          height={600}
          showProgress={true}
          lazy={false} // Set to true for lazy loading if you have 100+ frames
        />
      </section>

      {/* Content after animation */}
      <section className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="max-w-2xl text-center space-y-6 px-4">
          <h2 className="text-4xl font-bold text-white">Animation Complete</h2>
          <p className="text-lg text-slate-300">
            This component uses GSAP ScrollTrigger with canvas rendering for optimal performance.
            The animation is synchronized with your scroll position and supports:
          </p>
          <ul className="text-left space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold">✓</span>
              <span>High-performance canvas rendering</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold">✓</span>
              <span>Smooth frame scrubbing with scroll</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold">✓</span>
              <span>Section pinning during playback</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold">✓</span>
              <span>Progress indicator</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold">✓</span>
              <span>Lazy loading support</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-500 font-bold">✓</span>
              <span>Responsive canvas sizing</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
