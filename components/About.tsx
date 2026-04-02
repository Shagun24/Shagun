import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-20">
      <div className="max-w-4xl grid md:grid-cols-2 gap-16 items-center">
        <div>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-black mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="text-[#6b8ebf] font-mono text-xl">00.</span> About Me
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-black leading-relaxed mb-4">
              Hi! I'm a software engineer who loves building things that live on the internet.
              I care deeply about writing clean, maintainable code and creating experiences
              that are both functional and delightful.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-black leading-relaxed mb-4">
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open source, or thinking about how AI can make products smarter.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-black leading-relaxed">
              Most recently, I've been working on{' '}
              <span className="text-[#6b8ebf]">Spruce Assist</span> — a conversational
              AI assistant that brings financial guidance directly into ChatGPT.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div className="w-64 h-64 mx-auto rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center relative overflow-hidden">
              <img src="/shagun.jpg" alt="Shagun" className="w-full h-full object-cover rounded-lg" />
              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#6b8ebf]/30 rounded-lg" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
