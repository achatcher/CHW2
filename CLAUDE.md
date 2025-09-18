# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### SCSS Compilation
```bash
sass styles/main.scss styles/main.css --watch
```
Use this command to compile SCSS to CSS with watch mode for development.

### Local Development
- Use a local server (like Live Server extension) to serve the website
- Open index.html in a browser for testing
- No build process required - this is a static HTML/CSS/JS website

### Performance Testing
- Test on multiple devices and screen sizes
- Check accessibility with screen readers
- Validate HTML and CSS
- Test form submissions and interactions

## Architecture Overview

This is a static website for CHW (Community Heart & Wellness), a women's health organization. The site uses a traditional multi-page HTML structure with modern SCSS styling and vanilla JavaScript.

### File Structure
- **HTML Pages**: 6 main pages (index.html, about.html, services.html, circles.html, resources.html, contact.html)
- **Styles**: SCSS-based architecture with modular organization
  - `main.scss`: Main stylesheet importing all partials
  - `_variables.scss`: Color palette, typography, and design tokens
  - `_mixins.scss`: Reusable SCSS mixins and utilities
  - `_components.scss`: Component-specific styles
- **JavaScript**: Single `main.js` file with CHWWebsite class handling all interactions
- **Images**: Static assets directory (currently empty)

### Design System

**Color Palette**:
- Primary: Deep Pomegranate (#7A2B3A)
- Secondary: Sage Green variants
- Neutrals: Cream, linen, pearl, stone tones
- Background: Pure cream (#FDFBF9)

**Typography**:
- Headings: Cormorant Garamond (serif)
- Body: Inter (sans-serif)
- Accent: Dancing Script (cursive)

### JavaScript Architecture

The site uses a single `CHWWebsite` class that handles:
- Navigation and mobile menu functionality
- Scroll animations and effects
- Form handling and validation
- Smooth scrolling between sections
- Active navigation state management

### Key Features

- **Professional Design**: Sophisticated color palette with pomegranate and sage tones
- **Responsive Design**: Mobile-first with fluid typography and spacing
- **Interactive Navigation**: Smart header hide/show, animated mobile menu
- **Advanced Form Handling**: Real-time validation, floating labels, custom radio buttons
- **Smooth Animations**: Parallax effects, scroll-triggered animations with stagger delays
- **Accessibility**: Skip links, ARIA attributes, keyboard navigation, screen reader support
- **Performance Optimized**: Font preloading, efficient scroll handlers, image lazy loading
- **Professional Notifications**: Toast-style notifications with proper UX patterns
- **SEO Optimized**: Meta tags, structured data, semantic HTML

### Enhanced JavaScript Features

- **Performance Optimized Scrolling**: RequestAnimationFrame for smooth performance
- **Advanced Form Validation**: Debounced validation, regex patterns, accessibility
- **Professional Notification System**: Multiple notification types with auto-dismiss
- **Accessibility Features**: Skip links, focus management, keyboard navigation
- **Responsive Behavior**: Auto-close mobile menu on resize, smart header behavior
- **Loading States**: Professional loading spinners and state management

### Development Notes

- All styling uses SCSS with a professional component-based architecture
- JavaScript is modern ES6+ with comprehensive class-based organization
- Forms include professional validation patterns and UX best practices
- Images are optimized with lazy loading and error handling
- Accessibility follows WCAG guidelines with proper ARIA implementation
- Performance optimized with preloading and efficient event handling