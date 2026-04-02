import ScrollReveal from './ScrollReveal'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Spruce Assist',
    description:
      'A conversational AI assistant concept that brings personalised financial guidance directly into ChatGPT via a secure MCP server. Users can ask natural language questions about their finances and receive instant, data-driven answers.',
    tech: ['Angular', 'ChatGPT API', 'MCP', 'C#', '.NET', 'Azure'],
    live: 'https://shagun24.github.io/SpruceAssist/',
    featured: true,
  },
  {
    title: 'SPRUCE',
    description:
      'Short description of what this project does and the problem it solves. Keep it concise but impactful.',
    tech: ['Angular', 'C#', '.NET', 'Azure'],
    live: 'https://www.sprucemoney.com/',
    featured: true,
  },

]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8 md:px-20">
      <div className="max-w-4xl">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-black mb-12" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-[#6b8ebf] font-mono text-xl">02.</span> Projects
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`bg-white border rounded-lg p-7 hover:border-[#6b8ebf]/40 transition-all duration-300 group ${
                project.featured ? 'border-[#6b8ebf]/20' : 'border-gray-300'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {project.featured && (
                      <span className="text-[#6b8ebf] font-mono text-xs tracking-widest uppercase mb-2 block">
                        ★ Featured Project
                      </span>
                    )}
                    <h3 className="text-black text-xl font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-3 ml-4">
                    {project.live && (
                      <a href={project.live} className="text-gray-600 hover:text-[#6b8ebf] transition">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-black text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[#6b8ebf] font-mono text-xs bg-[#6b8ebf]/10 px-2.5 py-1 rounded">
                      {t}
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
