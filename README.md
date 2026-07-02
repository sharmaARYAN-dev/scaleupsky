# ScaleUpSky — Enterprise AI Agents & Business Automation

> **Stop doing repetitive work. Let AI run it.**

A production-ready single-page marketing website for ScaleUpSky, built with React + Vite + Tailwind CSS v4.

---

## 🚀 Tech Stack

| Technology | Version |
|---|---|
| React | 19.2.6 |
| Vite | 8.0.12 |
| Tailwind CSS | 4.3.0 |
| Framer Motion | 12.40.0 |
| Lucide React | 1.17.0 |

---

## 📁 Project Structure

```
scaleupsky/
├── public/
│   ├── favicon.png        # Browser tab icon
│   ├── logo.png           # Brand logo
│   ├── robots.txt         # SEO crawler rules
│   └── sitemap.xml        # XML sitemap
├── src/
│   ├── App.jsx            # All components & page logic
│   ├── index.css          # Tailwind + WAI accessibility styles
│   └── main.jsx           # React entry point
├── index.html             # SEO meta, OG tags, JSON-LD schema
├── netlify.toml           # Deployment config + security headers
├── .env.example           # Environment variable template
├── vite.config.js         # Vite + Tailwind plugin config
└── eslint.config.js       # ESLint flat config
```

---

## ⚙️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your [Formspree](https://formspree.io) form ID:
```env
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production
```bash
npm run build
```
Output goes to `dist/`

### 5. Preview production build locally
```bash
npm run preview
```

---

## 🌐 Deployment (Netlify)

The `netlify.toml` is pre-configured. Just connect the GitHub repo to Netlify:

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Select `sharmaARYAN-dev/scaleupsky`
3. Netlify auto-detects the build settings from `netlify.toml`
4. Add your environment variable: `VITE_FORM_ENDPOINT`
5. Click **Deploy**

Security headers applied automatically on deploy:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy`
- `Strict-Transport-Security` (HSTS)
- `Referrer-Policy`
- `Permissions-Policy`

---

## 🔧 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_FORM_ENDPOINT` | Formspree endpoint URL for the contact form | Yes |

> ⚠️ Never commit `.env` — it is gitignored. Only `.env.example` is tracked.

---

## ♿ Accessibility (WAI / WCAG 2.1 AA)

The site includes a floating **Accessibility Widget** (bottom-left button) with:
- **High Contrast Mode** — dark background, yellow borders
- **Enlarged Text** — increases base font size
- **Text Spacing** — wider letter/word/line spacing (WCAG 1.4.12)
- **Highlight Links** — outlines all interactive links

Additional compliance:
- Skip navigation link (Tab key to reveal)
- ARIA roles, labels, `aria-expanded`, `aria-controls`, `aria-pressed`
- Screen-reader-only content for animated elements
- Keyboard-navigable FAQ accordion

---

## 📄 Key Scripts

```bash
npm run dev      # Start dev server with HMR
npm run build    # Production build → dist/
npm run preview  # Serve the production build locally
npm run lint     # Run ESLint
```

---

## 📬 Contact Form

The contact form uses [Formspree](https://formspree.io):
1. Sign up at formspree.io and create a new form
2. Copy the form ID (e.g. `mbdenkjk`)
3. Set `VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID` in `.env`
4. First submission sends a one-time email confirmation to activate the form

---

## 📝 License

© 2026 ScaleUpSky. All rights reserved.
