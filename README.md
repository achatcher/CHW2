# CHW - Community Heart & Wellness Website

A responsive, professional website for CHW (Community Heart & Wellness), supporting women from menarche to menopause and beyond.

## Features

- **Fully Responsive Design** - Mobile-first approach with tablet and desktop breakpoints
- **Modern SCSS Architecture** - Organized with variables, mixins, and components
- **Interactive Navigation** - Smooth scrolling with active section highlighting
- **Mobile Menu** - Animated hamburger menu for mobile devices
- **Contact Form** - Functional form with validation and success/error messaging
- **Newsletter Signup** - Integrated subscription functionality
- **Animations** - Scroll-triggered animations and hover effects
- **Accessibility** - Semantic HTML and keyboard navigation support

## Color Palette

- **Primary**: Deep Pomegranate (#8B1538)
- **Secondary**: Forest Green (#2D5016)
- **Accent**: Warm Gold (#D4A574)
- **Background**: Cream (#FDF8F5)

## Typography

- **Headings**: Playfair Display (Serif)
- **Body Text**: Source Sans Pro (Sans-serif)

## File Structure
chw-website/
├── index.html
├── styles/
│   ├── main.scss (compiled to main.css)
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _components.scss
├── js/
│   └── main.js
├── images/
│   └── (logo and graphics)
└── README.md

## Setup Instructions

1. **Compile SCSS**: Use a SCSS compiler (like Sass, Live Server with SCSS extension, or build tools like Webpack/Vite)
   ```bash
   sass styles/main.scss styles/main.css --watch