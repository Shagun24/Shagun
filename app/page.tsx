import Navbar                    from '@/components/Navbar'
import Hero                     from '@/components/Hero'
import About                    from '@/components/About'
import Skills                   from '@/components/Skills'
import Projects                 from '@/components/Projects'
import Contact                  from '@/components/Contact'
import ScrollAnimationBackground from '@/components/ScrollAnimationBackground'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Scroll animation background — tracks global page scroll */}
      <ScrollAnimationBackground frameCount={217} imagePath="/animation/frame_" />

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div className="relative z-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <footer className="py-8 px-8 text-center border-t border-gray-300">
          <p className="text-black font-mono text-xs">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </footer>
      </div>
    </main>
  )
}
