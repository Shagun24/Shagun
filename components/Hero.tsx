'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Typewriter from 'typewriter-effect'

export default function Hero() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 bg-transparent overflow-hidden pt-20">
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/0 to-transparent pointer-events-none z-0" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(107,142,191,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(107,142,191,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl">
        <motion.p
          className="text-[#6b8ebf] font-mono text-sm mb-4 tracking-widest"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          &gt; Hello, world. My name is Shagun
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl font-bold text-black mb-3 leading-none"
          style={{ fontFamily: 'Syne, sans-serif' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Shagun
        </motion.h1>

        <motion.div
          className="text-3xl md:text-5xl font-bold text-black mb-8 h-16"
          style={{ fontFamily: 'Syne, sans-serif' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <Typewriter
            options={{
              strings: [
                'I build scalable systems.',
                'I solve complex problems.',
                'I craft clean code.',
                'I ship great products.',
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </motion.div>

        <motion.p
          className="text-black max-w-xl text-lg leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          Hi, Im a Frontend Engineer with around 2 years of experience at H&R Block. I mainly work with Angular,
TypeScript, and RxJS, building user interfaces that are clean, scalable, and easy to maintain. In my day-to-day
work, I focus a lot on improving performance and making sure the user experience is smooth. I also enjoy
collaborating with designers and product teams to bring ideas to life in a way thats both functional and visually
polished. Outside of work, I like exploring newer technologiesIve built a few portfolio projects using Next.js,
which helped me understand things like server-side rendering and overall performance better.

        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <a href="#projects" className="border border-[#6b8ebf] text-[#6b8ebf] font-mono px-6 py-3 rounded hover:bg-[#6b8ebf]/10 transition-all duration-300 text-sm">
            View my work →
          </a>
          <a href="#contact" className="border border-gray-700 text-black font-mono px-6 py-3 rounded hover:border-gray-500 hover:text-black transition-all duration-300 text-sm">
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-black font-mono text-xs tracking-widest">scroll</span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-green-400 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  )
}
