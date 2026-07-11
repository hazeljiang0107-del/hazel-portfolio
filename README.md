# Hazel Jiang — UX / Product Design Portfolio

A responsive portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no extra config needed

### Netlify

```bash
npm run build
```

Set publish directory to `dist` and build command to `npm run build`.

## Customize content

Edit **`src/data/projects.js`** to update:

- Project titles, summaries, and case study sections
- Skills, tools, and contact info
- Featured project order

## Add your resume

Place your resume PDF at **`public/resume.pdf`** (or update `RESUME_URL` in `projects.js`).

## Image assets

Portfolio images were extracted from your PDF into `public/assets/`. To replace individual images, swap files in:

- `public/assets/echoes/`
- `public/assets/still-here/`
- `public/assets/fractal-oasis/`
- `public/assets/yeastguard/`

Hero thumbnails: `public/assets/*-hero.jpg`

## Project structure

```
src/
  components/     Reusable UI (Navbar, ProjectCard, ImageGallery, etc.)
  data/projects.js  All portfolio content — edit here
  pages/          Home, About, Projects, CaseStudy
```
