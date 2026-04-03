'use client'

import { useState, useEffect } from 'react'
import InteractiveBackground from '@/components/InteractiveBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function HomeClient() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / documentHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Interactive background */}
      <InteractiveBackground scrollProgress={scrollProgress} />

      {/* Content on top */}
      <main className="relative overflow-x-hidden z-10">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="relative">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <footer className="py-8 px-8 text-center border-t border-gray-300">
            <p className="text-black font-mono text-xs">
              Built By Shagun | &copy; {new Date().getFullYear()} |{' '}
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
