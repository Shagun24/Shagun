import ScrollReveal from './ScrollReveal'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'Spruce Assist',
    description:
      'A conversational AI assistant concept that brings personalised financial guidance directly into ChatGPT via a secure MCP server. Users can ask natural language questions about their finances and receive instant, data-driven answers.',
    tech: ['Angular', 'ChatGPT API', 'MCP', 'C#', '.NET', 'Azure'],
    live: 'https://shagun24.github.io/SpruceAssist/',
    video: '/demo.mp4',
    featured: true,
  },
  {
    title: 'SPRUCE',
    description:
      'Contributed as a frontend engineer to Spruce, H&R; Block’s digital banking product, serving to almost a million users ,building and maintaining key UI features using Angular and TypeScript. Developed responsive, accessible components aligned with product and design specifications, ensuring a seamless user experience across devices. Worked closely with cross-functional teams to integrate RESTful APIs and handle real-time data flows using RxJS observables.',
    tech: ['Angular', 'C#', '.NET', 'Azure'],
    live: 'https://www.sprucemoney.com/',
    featured: true,
    noDemoNote: 'No demo available - Company Project',
  },  {
    title: 'Disaster Predictor',
    description:
      'An intelligent early warning system for Himachal Pradesh that predicts and alerts citizens about potential disasters including landslides and cloudbursts. The app integrates with government meteorological APIs and geological data to provide real-time risk assessments. Citizens receive location-based alerts with severity levels and actionable safety recommendations. Built with a focus on accessibility and rapid information dissemination to save lives during extreme weather events.',
    tech: ['Next.js', 'TypeScript', 'Mapbox', 'Python', 'ML', 'PostgreSQL', 'Government APIs', 'Socket.io'],
    live: '#',
    featured: false,
    inProgress: true,
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
                {/* Video preview if available */}
                {project.video && (
                  <div className="mb-5 rounded-lg overflow-hidden bg-black">
                    <video 
                      width="100%" 
                      height="300" 
                      controls 
                      className="w-full h-auto"
                      poster={project.featured ? '#f3f4f6' : undefined}
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* No demo available message */}
                {project.noDemoNote && (
                  <div className="mb-5 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                    <p className="text-gray-600 text-sm font-mono">{project.noDemoNote}</p>
                  </div>
                )}

                <div className="flex justify-between items-start mb-3">
                  <div>
                    {project.featured && (
                      <span className="text-[#6b8ebf] font-mono text-xs tracking-widest uppercase mb-2 block">
                        ★ Featured Project
                      </span>
                    )}
                    {project.inProgress && (
                      <span className="text-orange-600 font-mono text-xs tracking-widest uppercase mb-2 block">
                        ⚡ In Progress
                      </span>
                    )}
                    <h3 className="text-black text-xl font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-3 ml-4">
                    {project.live && project.live !== '#' && (
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
