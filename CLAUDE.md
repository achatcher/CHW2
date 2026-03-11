# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### SCSS Compilation
```bash
sass styles/main.scss styles/main.css --watch
```

### Local Development
Use a local server (e.g. VS Code Live Server) to serve the site — open `index.html` as the entry point. No build process is required.

## Architecture Overview

Static website for CHW (Chicago Holistic Women), a women's health organization. Multi-page HTML with SCSS styling and vanilla JavaScript.

### HTML Pages

**Main site pages** (share `styles/main.css` and `js/main.js`):
- `index.html`, `about.html`, `services.html`, `circles.html`, `resources.html`, `contact.html`

**Standalone print/promo pages** (each has its own flat CSS file, no shared JS):
- `flyer.html` → `flyer-styles.css`
- `handout.html`, `handout2.html` → `handout-styles.css`
- `newsletter.html` → `newsletter-styles.css`
- `promo.html` → `notecard-styles.css`
- `handout.html` also references `selfcare-handout-styles.css`

### SCSS Structure

`styles/main.scss` uses `@use` to import partials in this order:
- `_variables.scss` — design tokens (colors, fonts, breakpoints, spacing, shadows)
- `base/` — reset, typography, utilities
- `layout/` — header, footer, grid
- `components/` — buttons, cards, forms, notifications
- `pages/` — hero, nav-grid, philosophy, about, services, contact, resources, circles, community-cta
- `vendors/` — animations, mixins

### Design Tokens (`_variables.scss`)

**Colors**: Primary `#1D3D4D` (dark teal), Secondary `#5C95A7`, Background `#FDFBF9`
**Fonts**: Playfair Display (headings), Inter (body), Dancing Script (accent/script)
**Breakpoints**: sm 640px, md 768px, lg 1024px, xl 1200px

### JavaScript (`js/main.js`)

Single `CHWWebsite` class instantiated on page load. Key methods:
- `setupNavigation()` — scroll-based header hide/show using `requestAnimationFrame`
- `setupMobileMenu()` — hamburger toggle
- `setupScrollAnimations()` — IntersectionObserver-based reveal animations
- `setupFormHandling()` — debounced validation with floating labels
- `setupSmoothScrolling()` — anchor link smooth scroll
- `setupAccessibility()` — skip links, focus management
