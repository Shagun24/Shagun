'use client'

import ScrollAnimation from '@/components/ScrollAnimation'

export default function AdvancedExamplesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-white/5" />
        <div className="relative text-center space-y-6 px-4">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
            Scroll Animation Examples
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore different configurations of the high-performance canvas-based scroll animation component
          </p>
          <div className="text-sm text-slate-500 mt-12 animate-bounce">↓ Scroll to see examples ↓</div>
        </div>
      </section>

      {/* Example 1: Standard Animation */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Example 1: Standard Animation</h2>
            <p className="text-slate-400">Default configuration with progress indicator</p>
          </div>
          <ScrollAnimation
            frameCount={39}
            imagePath="/animation/ezgif-frame-"
            height={500}
            showProgress={true}
            lazy={false}
          />
          <div className="text-center text-slate-300 text-sm space-y-2 mt-8">
            <p><strong>Configuration:</strong></p>
            <p className="font-mono bg-slate-800 p-3 rounded text-left">
              &lt;ScrollAnimation frameCount={'{'}39{'}'} height={'{'}500{'}'} /&gt;
            </p>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-20 bg-black" />

      {/* Example 2: Tall Animation */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Example 2: Full-Height Animation</h2>
            <p className="text-slate-400">Larger viewport for immersive experience</p>
          </div>
          <ScrollAnimation
            frameCount={39}
            imagePath="/animation/ezgif-frame-"
            height={700}
            showProgress={true}
            lazy={false}
          />
          <div className="text-center text-slate-300 text-sm space-y-2 mt-8">
            <p><strong>Configuration:</strong></p>
            <p className="font-mono bg-slate-800 p-3 rounded text-left">
              &lt;ScrollAnimation frameCount={'{'}39{'}'} height={'{'}700{'}'} /&gt;
            </p>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-20 bg-black" />

      {/* Example 3: Without Progress */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-white">Example 3: Clean Animation</h2>
            <p className="text-slate-400">Without progress indicator for minimal UI</p>
          </div>
          <ScrollAnimation
            frameCount={39}
            imagePath="/animation/ezgif-frame-"
            height={500}
            showProgress={false}
          />
          <div className="text-center text-slate-300 text-sm space-y-2 mt-8">
            <p><strong>Configuration:</strong></p>
            <p className="font-mono bg-slate-800 p-3 rounded text-left">
              &lt;ScrollAnimation frameCount={'{'}39{'}'} showProgress={'{'}false{'}'} /&gt;
            </p>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-20 bg-black" />

      {/* Features Section */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Tips */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Performance Tips</h2>
          <div className="space-y-6">
            {performanceTips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-slate-900/50 rounded-lg border border-slate-800">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-cyan-500/20">
                    <span className="text-cyan-400 font-bold">{idx + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{tip.title}</h3>
                  <p className="text-slate-300 text-sm">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Usage Example</h2>
          <div className="bg-slate-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-slate-200 font-mono">
              {`import ScrollAnimation from '@/components/ScrollAnimation'

export default function Page() {
  return (
    <main>
      {/* Header Section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold">Welcome</h1>
      </section>

      {/* Scroll Animation */}
      <section className="bg-black py-20">
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
        <h2 className="text-3xl font-bold">That was amazing!</h2>
      </section>
    </main>
  )
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="h-96 bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Ready to integrate?</h2>
          <p className="text-slate-300">Check the documentation or copy the component to your project</p>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    icon: '⚡',
    title: 'High Performance',
    description: 'Canvas-based rendering for smooth 60fps animations with 100+ frames',
  },
  {
    icon: '🎬',
    title: 'Frame Scrubbing',
    description: 'Animation perfectly synchronized with scroll position',
  },
  {
    icon: '📌',
    title: 'Auto Pinning',
    description: 'Section automatically pins while animation plays',
  },
  {
    icon: '📊',
    title: 'Progress Indicator',
    description: 'Optional progress bar showing animation completion',
  },
  {
    icon: '⚙️',
    title: 'Lazy Loading',
    description: 'Load images on-demand for better initial performance',
  },
  {
    icon: '📱',
    title: 'Responsive',
    description: 'Automatically adapts to different screen sizes',
  },
]

const performanceTips = [
  {
    title: 'Optimize Image Sizes',
    description:
      'Compress images using TinyPNG or ImageOptim. Smaller files load faster and use less memory. Aim for 50-100KB per frame.',
  },
  {
    title: 'Use Lazy Loading for Large Sets',
    description:
      'Enable lazy={true} when you have 100+ frames to reduce initial load time and memory usage.',
  },
  {
    title: 'Adjust Canvas Height',
    description:
      "Higher resolution = more performance cost. Start with height={600} and increase only if needed.",
  },
  {
    title: 'Preload Before Heavy Interactions',
    description:
      'Consider showing a splash screen or hero section before the animation to give images time to load.',
  },
]
