# Personal Portfolio — Aarav Mehta

A responsive personal portfolio website built with plain HTML, CSS, and JavaScript. No frameworks,
no build step — open `index.html` and it works.

**Live sections:** Header · Hero · About · Projects · Skills · Contact · Footer

---

## Folder structure

```
Personal-Portfolio/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── images/
│   └── avatar.svg
│
└── projects/
    ├── project1.svg
    ├── project2.svg
    └── project3.svg
```

## Tech stack

- **HTML5** — semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** — custom properties (design tokens), Flexbox, CSS Grid, `clamp()` for fluid type, media queries
- **JavaScript (vanilla)** — DOM interactivity, form validation, no dependencies

## Features

- Fully responsive layout (desktop / tablet / mobile) with a hamburger menu below 640px
- Sticky header with smooth-scrolling navigation
- "Hire me" button with a confirmation alert
- Show / hide "More about me" panel (education, experience, goals, interests)
- Client-side contact form validation (required fields + email format) with inline error messages
- Scroll-to-top button that appears after scrolling
- Accessible: skip link, visible focus states, `aria-expanded`/`aria-controls` on toggles, `prefers-reduced-motion` respected
- All project/avatar imagery is self-contained SVG — no external image dependencies

## Getting started

1. Clone or download this folder.
2. Open `index.html` directly in a browser, **or** serve it locally:
   ```bash
   npx serve .
   ```
3. Edit content directly in `index.html`; colors and type scale live in the `:root` variables at
   the top of `style.css`.

## Customizing

- **Content:** replace the placeholder name, bio, project details, and contact links in `index.html`.
- **Images:** swap `images/avatar.svg` and the files in `projects/` for real photos/screenshots
  (any image format works — just update the `src` paths).
- **Colors/fonts:** all design tokens are defined once at the top of `style.css` under `:root`.
- **Contact form:** this form is front-end only (no backend). Wire it up to a service like
  Formspree, EmailJS, or your own API endpoint inside the `submit` handler in `script.js`.

## Browser support

Tested in the latest Chrome, Firefox, Safari, and Edge. Uses standard CSS Grid/Flexbox and vanilla
JS — no polyfills required for modern browsers.

## Deployment

Works out of the box on any static host: GitHub Pages, Netlify, or Vercel.

**GitHub Pages:**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Then enable GitHub Pages in the repo settings, pointing at the `main` branch root.

## License

Free to use and adapt for your own portfolio.
