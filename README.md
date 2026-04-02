# Portfolio — Next.js + Framer Motion

A dark, techy personal portfolio with scroll animations.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the dev server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Personalise It

- **Your name** → `components/Hero.tsx` and `components/About.tsx`
- **Your projects** → `components/Projects.tsx` (edit the `projects` array)
- **Your skills** → `components/Skills.tsx` (edit the `skills` array)
- **Social links** → `components/Contact.tsx`
- **Page title** → `app/layout.tsx`
- **Contact form** → Sign up at https://formspree.io, replace `YOUR_FORM_ID` in `components/Contact.tsx`

## Stack

- [Next.js 14](https://nextjs.org)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Typewriter Effect](https://www.npmjs.com/package/typewriter-effect)
- [Lucide Icons](https://lucide.dev)

## Deploy

```bash
npm run build
```

Or push to GitHub and deploy instantly on [Vercel](https://vercel.com).
