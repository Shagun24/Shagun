'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.18, 0.12, 0.08, 0.05])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <motion.div
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <img
          src="/image.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'sepia(20%) hue-rotate(60deg) saturate(0)' }}
        />
      </motion.div>

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]/70" />
    </motion.div>
  )
}
