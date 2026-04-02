import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shagun | Software Engineer',
  description: 'Software Engineer portfolio — building scalable systems and clean code.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="m-0 p-0 bg-[#0a0a0a]">
        {children}
      </body>
    </html>
  )
}
