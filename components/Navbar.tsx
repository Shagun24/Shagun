'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: '01. About',    href: '#about'    },
  { label: '02. Skills',   href: '#skills'   },
  { label: '03. Projects', href: '#projects' },
  { label: '04. Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['about', 'skills', 'projects', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200/50' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <a href="#" className="text-[#6b8ebf] font-mono font-bold text-xl tracking-tight">
       Shagun
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => {
          const id = link.href.replace('#', '')
          return (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-sm transition-all duration-200 ${
                active === id
                  ? 'text-[#6b8ebf]'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {link.label}
            </a>
          )
        })}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-black hover:text-[#6b8ebf] transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 py-6 flex flex-col items-center gap-6 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-gray-600 hover:text-[#6b8ebf] transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
