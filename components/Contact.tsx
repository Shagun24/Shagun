'use client'
import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Replace YOUR_FORM_ID with your Formspree form ID
    // Sign up free at https://formspree.io
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: new FormData(e.currentTarget),
      headers: { Accept: 'application/json' },
    })
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contact" className="py-32 px-8 md:px-20">
      <div className="max-w-2xl">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-[#6b8ebf] font-mono text-xl">03.</span> Contact
          </h2>
          <p className="text-black mb-10 leading-relaxed">
            Have a project in mind, want to collaborate, or just want to say hi?
            My inbox is always open.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {sent ? (
            <div className="border border-[#6b8ebf]/30 bg-[#6b8ebf]/5 rounded-lg p-8 text-center">
              <p className="text-[#6b8ebf] font-mono text-lg mb-2">Message sent!</p>
              <p className="text-gray-600 text-sm">I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-[#6b8ebf]/60 transition font-mono text-sm"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6b8ebf]/60 transition font-mono text-sm"
                />
              </div>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-[#6b8ebf]/60 transition font-mono text-sm"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                required
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-[#6b8ebf]/60 transition resize-none font-mono text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="border border-[#6b8ebf] text-[#6b8ebf] font-mono px-8 py-3 rounded-lg hover:bg-[#6b8ebf]/10 transition-all duration-300 w-fit text-sm disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.2}>
          <div className="flex gap-6 mt-12 pt-12 border-t border-gray-300">
            <a href="https://github.com/Shagun24/" className="text-gray-600 hover:text-[#6b8ebf] transition font-mono text-sm">GitHub</a>
            <a href="https://www.linkedin.com/in/shagun-sharma-48b083219" className="text-gray-600 hover:text-[#6b8ebf] transition font-mono text-sm">LinkedIn</a>
            <a href="mailto:shaguns2407@email.com" className="text-gray-600 hover:text-[#6b8ebf] transition font-mono text-sm">Email</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
