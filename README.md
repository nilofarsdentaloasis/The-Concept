# The Concept

> **Minimalist Interior Architecture & Luxury Design Studio**

An international interior architecture and high-end design website featuring 4 core pages, immersive 30fps cinematic canvas scroll interactions, 3D transparent glass navigation, and dynamic dark-mode scroll transitions.

---

## 🏛️ Website Architecture

The project consists of 4 bespoke pages:

1. **Studio / Home (`index.html`)**:
   - 367-frame 30fps canvas scroll animation with GPU acceleration and progressive scrubbing.
   - 3D transparent glass navigation with seamless 1.2s smooth color fade on scroll.
   - Selected works archive, design philosophy, process methodology, client reflections, and consultation call-to-action.

2. **Signature Spaces (`spaces.html`)**:
   - Curated architectural project portfolio gallery with category filters, fluid aspect ratios, and hover interactions.

3. **Our Philosophy (`philosophy.html`)**:
   - Architectural ethos, core design pillars (Essentiality, Materiality, Light Orchestration), leadership profiles, and interactive FAQ.

4. **Begin Your Journey (`contact.html`)**:
   - Bespoke project inquiry form with interactive service selector, budget selection, studio contact details, and office hours.

---

## ✨ Design & Technology Stack

- **HTML5 & Vanilla JavaScript**: High-performance canvas frame rendering engine with retina / HiDPI support.
- **Tailwind CSS & Vanilla CSS**: Custom 3D glassmorphism (`glass-3d`), bespoke luxury typography (`Playfair Display`, `Montserrat`), and fluid micro-animations.
- **Brand Identity**: Custom transparent high-resolution typography & monogram logo assets (`assets/the_concept_logo_dark.png`, `assets/the_concept_logo_white.png`, `assets/the_concept_icon.png`, `assets/the_concept_icon_black.png`).
- **Strict Logo Contrast Rule**: The logo strictly and dynamically displays in **Black** when over white/light backgrounds, and **White** when over black/dark backgrounds across all pages.

---

## 🚀 Running Locally

You can serve the website locally with any HTTP server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js / npx
npx serve .
```

Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## 📄 License & Rights

© 2024 The Concept Studio. All rights reserved.
