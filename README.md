# GLEC AI DTG Website

> Premium AI Transformation Platform for Freight Trucks

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/glec-inc/ai-dtg-website)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

## 🚀 Overview

GLEC AI DTG is a comprehensive website showcasing world-class AI transformation solutions for aging freight trucks. The platform demonstrates cutting-edge technology including:

- **AI-Based Safety Enhancement** - Real-time driver monitoring and cargo safety
- **ISO-14083 Carbon Measurement** - International standard carbon emission tracking
- **20B Parameter LLM** - Advanced AI inference engine
- **Real-time Data Integration** - Cloud-connected fleet management

## 🌟 Features

### Complete Website Sections (14 Total)

1. **Hero Section** - Main landing with animated background
2. **Company Overview** - Company founding, vision, mission, core values
3. **Solutions Portfolio** - eFuel, GLEC DTG, Carbon API Console
4. **Government Support & Certifications** - Awards, patents, funding programs
5. **Development Timeline** - Company roadmap (2023-2026)
6. **Technical Differentiation** - 6 competitive advantages
7. **Team Composition** - Team expertise and roles
8. **AI Transformation** - AX (AI Transformation) for old freight trucks
9. **GLEC AI DTG Hardware** - Next-gen digital tachograph
10. **GLEC AI Dashboard** - Real-time data visualization
11. **Core Technology** - GLEC AI & GLEC API deep dive
12. **CES 2026 Section** - Event information
13. **CES Invitation Form** - Email collection with mailto integration
14. **Call to Action** - Contact and demo requests

### Multilingual Support

- 🇺🇸 English
- 🇰🇷 Korean (한국어)
- 🇨🇳 Chinese (中文)

**150+ translation keys** covering all sections with seamless language switching.

### Advanced Features

- ✅ **Responsive Design** - Mobile, tablet, desktop optimized
- ✅ **Video Integration** - 6 autoplay videos with lazy loading
- ✅ **Smooth Animations** - Intersection observers for scroll effects
- ✅ **Cyberpunk Theme** - Neon gradients, glassmorphism, glow effects
- ✅ **SEO Optimized** - Meta tags, OG images, structured data
- ✅ **Form Handling** - CES invitation with popup confirmation
- ✅ **Accessibility** - ARIA labels, keyboard navigation

## 📁 Project Structure

```
ai-dtg-website/
├── ai-dtg-premium-website/      # Main production website
│   ├── index.html                # Complete 4,300+ line website
│   └── assets/
│       ├── videos/               # 6 demonstration videos
│       │   ├── GLEC_AI_video.mov
│       │   ├── GLEC_API_video.mov
│       │   ├── dtg1.mp4
│       │   ├── dtg2.mp4
│       │   └── ...
│       └── hardware/
│           ├── og-thumbnail.png
│           ├── beetle_x31_1080.jpg
│           └── beetle_x31_B_1080.jpg
├── ai-dtg-final-stable-version/  # Previous stable version
├── screenshots/                  # Documentation screenshots
├── verify-all-sections.js        # Automated testing script
├── final-test.js                 # Language switching tests
├── package.json                  # Project configuration
└── README.md                     # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/glec-inc/ai-dtg-website.git
cd ai-dtg-website

# Install dependencies
npm install

# Start development server
npm start
```

The website will be available at `http://localhost:8093`

## 📜 Available Scripts

```bash
# Development
npm start              # Start local server on port 8093
npm run dev            # Same as start (development mode)
npm run preview        # Preview on port 8080

# Testing
npm test               # Run comprehensive section verification
npm run test:language  # Test language switching (EN/KO/ZH)

# Deployment
npm run build          # Static site - no build needed
npm run deploy         # Ready for deployment
```

## 🧪 Testing

### Automated Testing with Playwright

```bash
# Verify all 14 sections
npm test

# Test language switching
npm run test:language
```

### Manual Testing Checklist

- [ ] All 14 sections render correctly
- [ ] Language selector switches between EN/KO/ZH
- [ ] All 6 videos autoplay (muted)
- [ ] CES invitation form submits
- [ ] Navigation scrolls smoothly
- [ ] Mobile responsive layout works
- [ ] No console errors
- [ ] Animations trigger on scroll

## 🌐 Deployment

### Static Hosting (Recommended)

Deploy to any static hosting platform:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag & drop `ai-dtg-premium-website/` folder
- **GitHub Pages** - Push to `gh-pages` branch
- **AWS S3** - Upload to S3 bucket

### Build Output

The `ai-dtg-premium-website/` directory contains the complete production-ready website:

- Single `index.html` file (self-contained CSS/JS)
- Assets in `assets/` subdirectory
- No build process required

## 📊 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, gradients, animations
- **JavaScript (Vanilla)** - No frameworks, pure ES6+
- **SVG** - Custom logos and graphics
- **Video** - MP4, MOV formats with autoplay

### Browser Support

- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14
- Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Design System

### Color Palette

```css
--glec-cyan: #00FFFF        /* Primary accent */
--glec-magenta: #FF00FF     /* Secondary accent */
--glec-yellow: #FFFF00      /* Tertiary accent */
--glec-dark: #0A0E1A        /* Background dark */
--glec-darker: #050810      /* Background darker */
```

### Typography

- **Headings**: Orbitron (Google Fonts)
- **Body**: -apple-system, BlinkMacSystemFont, "Segoe UI"

### Spacing Scale

```css
--space-xs: 0.5rem    (8px)
--space-sm: 1rem      (16px)
--space-md: 1.5rem    (24px)
--space-lg: 2rem      (32px)
--space-xl: 3rem      (48px)
--space-2xl: 4rem     (64px)
--space-3xl: 6rem     (96px)
```

## 📝 Version History

### Version 2.0.0 (Current - 2025-10-01)

**Major Updates:**
- ✅ Integrated 6 new business sections
- ✅ Added GLEC AI & API technology sections
- ✅ Implemented CES 2026 invitation form
- ✅ Fixed language selector (duplicate variable bug)
- ✅ Added 4 new video assets
- ✅ Complete 3-language support (150+ keys)
- ✅ Comprehensive testing suite
- ✅ Production-ready deployment

**Sections Added:**
1. Company Overview
2. Solutions & Development Status
3. Government Support & Certifications
4. Development Timeline
5. Technical Differentiation
6. Team Composition

**Bug Fixes:**
- Fixed duplicate `videoObserver` variable causing script failure
- Resolved language dropdown click issues
- Improved video autoplay reliability

### Version 1.0.0 (2025-08-19)

**Initial Features:**
- Basic 8-section website
- Hero, Transformation, DTG, Dashboard, CTA, Footer
- English + Korean translations
- Video integration

## 🤝 Contributing

This is a private project for GLEC Inc. For internal team members:

1. Create a feature branch
2. Make your changes
3. Test thoroughly (run `npm test`)
4. Submit pull request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 📞 Contact

**GLEC Inc.**
- Website: https://dtg.glec.io
- Email: contact@glec.io
- Location: Seoul, South Korea

## 🙏 Acknowledgments

- **Claude Code** - AI-assisted development
- **Playwright** - Automated testing
- **Google Fonts** - Orbitron typeface

---

**Built with ❤️ by GLEC Inc.**

*Transforming the future of green logistics through AI innovation*
