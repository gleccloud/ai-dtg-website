# Multi-Page Website Architecture Plan

## 📋 Overview

Converting the single-page website into a structured multi-page website with 5 main pages.

## 🗂️ Page Structure

### 1. **HOME** (`index.html`)
**Purpose:** Landing page with overview and call-to-action

**Sections to include:**
- Hero Section (video background)
- Brief company introduction (summary)
- Featured solutions (cards linking to solutions page)
- Quick stats/highlights
- CTA buttons to other pages

**Navigation:** Links to all other pages

---

### 2. **OUR SOLUTIONS** (`solutions.html`)
**Purpose:** Showcase all product offerings and technology

**Sections to include:**
- AI Transformation (#transformation)
- AI DTG Hardware (#ai-dtg)
- AI Dashboard (#ai-dashboard)
- Core Technology (#technology)
- Solutions & Development Status (#solutions)

**Sub-navigation:** Internal anchor links to each solution section

---

### 3. **WHO WE ARE** (`about.html`)
**Purpose:** Company information and team details

**Sections to include:**
- Company Overview (#company-overview)
- Our Team (#team)
- Development Timeline (#timeline)
- Government Support & Certifications (#certifications)
- Technical Differentiation (#tech-differentiation)

**Sub-navigation:** Internal anchor links to each section

---

### 4. **CES 2026** (`ces2026.html`)
**Purpose:** CES exhibition information and invitation

**Sections to include:**
- CES 2026 Event Details (#ces2026)
- CES Invitation Form
- Location and booth information
- Exhibition highlights
- Contact form for meeting requests

**Features:** Email collection form, event calendar

---

### 5. **CONTACT** (`contact.html`)
**Purpose:** Contact information and inquiry forms

**Sections to include:**
- Contact Form
- Company location/address
- Email and phone information
- Map (optional)
- Social media links
- CTA for demos and consultations

**Features:** Contact form with validation

---

## 📁 Directory Structure

```
ai-dtg-premium-website/
├── index.html              # HOME page
├── solutions.html          # OUR SOLUTIONS page
├── about.html             # WHO WE ARE page
├── ces2026.html           # CES 2026 page
├── contact.html           # CONTACT page
├── assets/
│   ├── videos/
│   ├── hardware/
│   └── images/
├── css/
│   └── shared-styles.css  # Common styles for all pages
└── js/
    └── navigation.js      # Shared navigation component
```

## 🎨 Design Consistency

### Common Elements (all pages):
1. **Navigation Bar**
   - Logo (links to home)
   - Dropdown menus (Our Solutions, Who We Are)
   - Language selector
   - Same styling and behavior

2. **Footer**
   - Company info
   - Quick links
   - Social media
   - Copyright

3. **Styling**
   - Same cyberpunk theme
   - Same color palette
   - Same fonts and spacing
   - Consistent animations

## 🔗 Navigation Updates

### Current (Single-Page):
```html
<a href="#section">Link</a>
```

### New (Multi-Page):
```html
<!-- From any page to Home -->
<a href="index.html">Home</a>

<!-- From any page to Solutions -->
<a href="solutions.html">Our Solutions</a>
<a href="solutions.html#ai-dtg">AI DTG</a>

<!-- From any page to About -->
<a href="about.html">Who We Are</a>
<a href="about.html#team">Our Team</a>

<!-- Within same page -->
<a href="#section">Section</a>
```

## 🌐 Multilingual Support

Each page will have:
- Language selector in navigation
- Full translation support
- URL parameters for language (optional): `?lang=ko`
- LocalStorage to remember user's language preference

## 📝 Implementation Steps

### Phase 1: Setup
1. Create directory structure
2. Extract shared CSS into separate file
3. Extract shared JavaScript (navigation, translations)

### Phase 2: Create Pages
1. Create HOME page (index.html) - simplified from current
2. Create SOLUTIONS page - extract solution sections
3. Create ABOUT page - extract company sections
4. Create CES 2026 page - extract CES sections
5. Create CONTACT page - new page with forms

### Phase 3: Update Navigation
1. Update all navigation links to page URLs
2. Add sub-navigation for sections within pages
3. Test all cross-page navigation

### Phase 4: Testing
1. Test all pages load correctly
2. Test navigation between pages
3. Test language switching on each page
4. Test mobile responsiveness
5. Test all anchor links

### Phase 5: Optimization
1. Ensure consistent styling
2. Optimize page load times
3. Add breadcrumbs (optional)
4. Add meta tags for each page (SEO)

## 🎯 Benefits

1. **Better SEO** - Each page can be optimized for specific keywords
2. **Faster Load Times** - Smaller page sizes
3. **Better UX** - Focused content per page
4. **Easier Maintenance** - Modular structure
5. **Better Analytics** - Track page-specific metrics

## ⚠️ Considerations

1. **Shared Assets** - Videos and images must be accessible from all pages
2. **Relative Paths** - All asset paths must be correct from each page
3. **Language Persistence** - Language selection should persist across pages
4. **Back Button** - Ensure browser back button works properly
5. **404 Handling** - Create 404 page for missing routes

## 🔄 Migration Strategy

1. Keep current `index.html` as backup
2. Create new pages in parallel
3. Test thoroughly before deployment
4. Update all internal links
5. Deploy all pages together

---

**Estimated Time:** 2-3 hours
**Priority:** High
**Complexity:** Medium
