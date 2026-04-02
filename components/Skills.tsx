import ScrollReveal from './ScrollReveal'

const skills = [
  { category: 'Languages',  items: ['Angular', 'TypeScript', 'JavaScript', 'HTML' , 'CSS'] },
  { category: 'Frontend',   items: ['Angular', 'Next.js', 'Bootstrap', 'Framer Motion'] },
  { category: 'Backend',    items: ['.NET', 'C#', 'REST APIs'] },
  { category: 'Tools',      items: ['Azure', 'Vercel', 'Git', 'Postman', 'Figma'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 md:px-20">
      <div className="max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-black mb-12" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-[#6b8ebf] font-mono text-xl">01.</span> Skills
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white border border-gray-300 rounded-lg p-6 hover:border-[#6b8ebf]/40 transition-all duration-300 group">
                <h3 className="text-[#6b8ebf] font-mono text-xs tracking-widest uppercase mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-black text-sm bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-full hover:bg-[#6b8ebf]/10 hover:text-[#6b8ebf] hover:border-[#6b8ebf]/30 transition-all duration-200 cursor-default font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
