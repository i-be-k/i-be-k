# Ibukun Obideyi – Portfolio Build Journey 🚀

Welcome to the source code of my personal portfolio website! This document narrates the thought process, technology choices, and step-by-step build journey of creating this modern, highly responsive web presence from scratch to finish.

## 🛠️ The Tech Stack

I chose a modern, performance-oriented stack to ensure a snappy user experience and fantastic developer ergonomics:
- **React + Vite**: For a lightning-fast development environment and optimized production builds.
- **Tailwind CSS**: For utility-first styling, enabling rapid prototyping and seamless responsive design.
- **JavaScript (ES6+)**: Component logic, DOM manipulation, and state management.

---

## 🏗️ The Build Process: From Scratch to Finish

### 1. Bootstrapping the Project
The journey began with initializing a standard environment using Vite's React template. This provided a minimal, lightning-fast foundation with Hot Module Replacement (HMR). I immediately configured Tailwind CSS (`tailwind.config.js`) to handle the heavy lifting for my unified design system.

### 2. Structuring the Layout and Core Sections
I modularized the application by breaking it down into focused React components. The primary UI consists of:
- **Header & Navbar**: A dynamic navigation bar that tracks the user's scroll position and folds neatly into a custom hamburger menu (`menu-btn`) on mobile devices.
- **Hero & About**: High-impact introduction sections to immediately capture visitor attention and communicate my identity as a developer.
- **Skills**: A meticulously mapped grid showcasing my favorite tech stack using the `SkillCard` component.
- **Projects**: The core of the portfolio, leveraging a `ProjectCard` component to display my recent works, tech tags, and live links.
- **Reviews & Contact**: Providing social proof via client testimonials and tying it off with a robust contact form matrix for engagement.

### 3. Implementing Dynamic Backgrounds (The Evolution)
Initially, I experimented with a highly interactive, weather-based `<BackgroundTheme />` utilizing HTML5 Canvas animations. While visually complex, I eventually decided to prioritize clean aesthetics and performance. I pivoted away from the canvas heavy-lifting toward a sleek, modern, static background pairing: a soft off-white (`#faf9f6`) and a deep slate (`slate-900`).

### 4. Advanced Theming: Light, Dark, and System Mode
To truly make the portfolio feel premium, I implemented a robust, full-scale theme toggling system:
- Configured Tailwind to use `darkMode: "class"`.
- Built the custom `<ThemeSelector />` dropdown component with `useState` and `useEffect`.
- Engineered it to automatically listen to `localStorage` for returning visitors, while falling back gracefully to the OS `prefers-color-scheme` media queries.
- Refactored the entire global CSS configuration (`index.css`) and individual components (like `SkillCard`, `ReviewCard`, etc.) using Tailwind's `dark:` utility modifier, guaranteeing perfect contrast, text legibility, and refined shadow aesthetics regardless of the active theme.

### 5. Final Polish & Mobile Optimization
The final phase was dedicated to layout edge cases and strict mobile refinements. I adjusted the structural grid in the `<Header />`, ensuring the Theme Selector intelligently aligns **beside the "Contact Me" button on desktop** and beautifully **before the hamburger menu on mobile**. I eliminated all layout overlaps and utilized matching `menu-btn` utility aesthetics to guarantee identical pixel-perfect icon alignments.

Additionally, to ensure a fluid mobile experience, I implemented auto-close logic (`onClick={closeNav}`) so that once a user selects a link from the active mobile menu, the drop-down intelligently folds back away, immediately focusing them on the section they anchored toward.

---

## 🚀 Running Locally

To clone and run this project on your own machine:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## 🤝 Connect with Me!
Thank you for checking out my build process. Feel free to explore the code, draw inspiration, or reach out to collaborate!
